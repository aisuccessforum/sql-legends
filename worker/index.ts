import { clearCookie, parseCookies, serializeCookie } from "./cookies";
import {
  completeOnboarding,
  ensurePlayerExists,
  getPlayer,
  rowToProfile,
  syncProgress,
} from "./db";
import { buildGoogleAuthUrl, exchangeCodeForTokens, verifyGoogleIdToken } from "./google";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
  verifySessionToken,
} from "./session";

export interface Env {
  DB: D1Database;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  SESSION_SECRET: string;
}

const STATE_COOKIE_NAME = "sl_oauth_state";

function json(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

async function requirePlayerId(
  request: Request,
  env: Env
): Promise<string | null> {
  const cookies = parseCookies(request);
  const token = cookies[SESSION_COOKIE_NAME];
  if (!token) return null;
  return verifySessionToken(token, env.SESSION_SECRET);
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    // --- Start Google sign-in ---
    if (path === "/api/auth/google/start" && request.method === "GET") {
      const state = crypto.randomUUID();
      const redirectUri = `${url.origin}/api/auth/google/callback`;
      const authUrl = buildGoogleAuthUrl(env.GOOGLE_CLIENT_ID, redirectUri, state);

      const headers = new Headers({ Location: authUrl });
      headers.append(
        "Set-Cookie",
        serializeCookie(STATE_COOKIE_NAME, state, { maxAgeSeconds: 600 })
      );
      return new Response(null, { status: 302, headers });
    }

    // --- Google OAuth callback ---
    if (path === "/api/auth/google/callback" && request.method === "GET") {
      const code = url.searchParams.get("code");
      const state = url.searchParams.get("state");
      const cookies = parseCookies(request);
      const expectedState = cookies[STATE_COOKIE_NAME];

      if (!code || !state || !expectedState || state !== expectedState) {
        return json({ error: "Invalid OAuth state" }, { status: 400 });
      }

      try {
        const redirectUri = `${url.origin}/api/auth/google/callback`;
        const tokens = await exchangeCodeForTokens(
          code,
          env.GOOGLE_CLIENT_ID,
          env.GOOGLE_CLIENT_SECRET,
          redirectUri
        );
        const profile = await verifyGoogleIdToken(
          tokens.id_token,
          env.GOOGLE_CLIENT_ID
        );

        await ensurePlayerExists(env.DB, profile.sub, profile.email, profile.name);
        const sessionToken = await createSessionToken(profile.sub, env.SESSION_SECRET);

        const headers = new Headers({ Location: "/" });
        headers.append(
          "Set-Cookie",
          serializeCookie(SESSION_COOKIE_NAME, sessionToken, {
            maxAgeSeconds: SESSION_MAX_AGE,
          })
        );
        headers.append("Set-Cookie", clearCookie(STATE_COOKIE_NAME));
        return new Response(null, { status: 302, headers });
      } catch (err) {
        return json(
          { error: `Sign-in failed: ${(err as Error).message}` },
          { status: 500 }
        );
      }
    }

    // --- Logout ---
    if (path === "/api/auth/logout" && request.method === "POST") {
      const headers = new Headers();
      headers.append("Set-Cookie", clearCookie(SESSION_COOKIE_NAME));
      return json({ ok: true }, { headers });
    }

    // --- Current player profile ---
    if (path === "/api/player" && request.method === "GET") {
      const playerId = await requirePlayerId(request, env);
      if (!playerId) return json({ error: "Not signed in" }, { status: 401 });

      const row = await getPlayer(env.DB, playerId);
      if (!row) return json({ error: "Player not found" }, { status: 404 });
      return json(rowToProfile(row));
    }

    // --- Complete onboarding ---
    if (path === "/api/player/onboarding" && request.method === "POST") {
      const playerId = await requirePlayerId(request, env);
      if (!playerId) return json({ error: "Not signed in" }, { status: 401 });

      const body = await request.json<{
        displayName?: string;
        birthDate?: string;
        country?: string;
        state?: string;
        city?: string;
      }>();

      if (
        !body.displayName?.trim() ||
        !body.birthDate?.trim() ||
        !body.country?.trim() ||
        !body.state?.trim() ||
        !body.city?.trim()
      ) {
        return json({ error: "All fields are required" }, { status: 400 });
      }

      await completeOnboarding(env.DB, playerId, {
        displayName: body.displayName.trim(),
        birthDate: body.birthDate.trim(),
        country: body.country.trim(),
        state: body.state.trim(),
        city: body.city.trim(),
      });

      const row = await getPlayer(env.DB, playerId);
      return json(rowToProfile(row!));
    }

    // --- Sync in-game progress (debounced calls + sendBeacon on tab close) ---
    if (path === "/api/player/sync" && request.method === "POST") {
      const playerId = await requirePlayerId(request, env);
      if (!playerId) return json({ error: "Not signed in" }, { status: 401 });

      const body = await request.json<{
        xp?: number;
        rank?: string;
        completedMissions?: string[];
      }>();

      if (
        typeof body.xp !== "number" ||
        typeof body.rank !== "string" ||
        !Array.isArray(body.completedMissions)
      ) {
        return json({ error: "Invalid progress payload" }, { status: 400 });
      }

      await syncProgress(env.DB, playerId, {
        xp: body.xp,
        rank: body.rank,
        completedMissions: body.completedMissions,
      });
      return json({ ok: true });
    }

    return json({ error: "Not found" }, { status: 404 });
  },
};

export default worker;