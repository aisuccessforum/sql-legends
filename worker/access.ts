// Access, code redemption, admin and (stubbed) payment routes.
// Wire into worker/index.ts — see README_PHASE2.md.
export interface AccessEnv { DB: any; ADMIN_EMAILS?: string }
export interface AccessUser { id: string; email: string }

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

function genCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  const c = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
  return `ASTRA-${c.slice(0, 4)}-${c.slice(4)}`;
}
const isAdmin = (env: AccessEnv, u: AccessUser) =>
  (env.ADMIN_EMAILS ?? "").toLowerCase().split(",").map((s) => s.trim()).filter(Boolean).includes(u.email.toLowerCase());

/** Returns a Response for /api/access*, /api/pay*, /api/admin*; null if the path isn't ours. */
export async function handleAccess(request: Request, env: AccessEnv, user: AccessUser | null): Promise<Response | null> {
  const url = new URL(request.url);
  const p = url.pathname;
  if (!(p.startsWith("/api/access") || p.startsWith("/api/pay") || p.startsWith("/api/admin"))) return null;
  if (!user) return json({ error: "unauthorized" }, 401);
  const db = env.DB;

  // ── status ──
  if (p === "/api/access/status" && request.method === "GET") {
    const row = await db.prepare("SELECT source FROM enrollments WHERE user_id = ?").bind(user.id).first();
    return json({ hasAccess: !!row, source: row?.source ?? null, isAdmin: isAdmin(env, user) });
  }

  // ── redeem ──
  if (p === "/api/access/redeem" && request.method === "POST") {
    const body = (await request.json().catch(() => ({}))) as { code?: string };
    const code = (body.code ?? "").trim().toUpperCase();
    if (!code) return json({ error: "Enter an access code." }, 400);
    const existing = await db.prepare("SELECT 1 AS x FROM enrollments WHERE user_id = ?").bind(user.id).first();
    if (existing) return json({ ok: true, already: true });
    const upd = await db.prepare(
      "UPDATE access_codes SET uses = uses + 1 WHERE code = ? AND active = 1 AND uses < max_uses AND (expires_at IS NULL OR expires_at > datetime('now'))"
    ).bind(code).run();
    if (!upd.meta?.changes) return json({ error: "This code is invalid, expired, or fully used." }, 400);
    try {
      await db.prepare("INSERT INTO enrollments (user_id, email, source, code) VALUES (?, ?, 'code', ?)").bind(user.id, user.email, code).run();
    } catch {
      await db.prepare("UPDATE access_codes SET uses = uses - 1 WHERE code = ?").bind(code).run();
      return json({ error: "Could not activate access. Please try again." }, 500);
    }
    return json({ ok: true });
  }

  // ── payment (gateway not connected yet) ──
  if (p === "/api/pay/create" && request.method === "POST") {
    return json({ error: "payment_unavailable", message: "Payment gateway is currently not available. Please try again after some time." }, 503);
  }

  // ── admin ──
  if (p.startsWith("/api/admin")) {
    if (!isAdmin(env, user)) return json({ error: "forbidden" }, 403);

    if (p === "/api/admin/codes" && request.method === "GET") {
      const { results } = await db.prepare("SELECT code, owner, max_uses, uses, expires_at, active, created_at FROM access_codes ORDER BY created_at DESC LIMIT 500").all();
      return json({ codes: results });
    }
    if (p === "/api/admin/codes" && request.method === "POST") {
      const b = (await request.json().catch(() => ({}))) as { owner?: string; maxUses?: number; expiryDays?: number | null; count?: number; code?: string };
      const owner = (b.owner ?? "").trim();
      if (!owner) return json({ error: "Owner is required." }, 400);
      const maxUses = Math.min(Math.max(Math.floor(b.maxUses ?? 1), 1), 100000);
      const count = Math.min(Math.max(Math.floor(b.count ?? 1), 1), 100);
      const expires = b.expiryDays && b.expiryDays > 0 ? `datetime('now', '+${Math.floor(b.expiryDays)} days')` : "NULL";
      const made: string[] = [];
      for (let i = 0; i < count; i++) {
        const code = (count === 1 && b.code ? b.code.trim().toUpperCase() : genCode());
        await db.prepare(`INSERT INTO access_codes (code, owner, max_uses, expires_at) VALUES (?, ?, ?, ${expires})`).bind(code, owner, maxUses).run();
        made.push(code);
      }
      return json({ ok: true, codes: made });
    }
    if (p === "/api/admin/codes/toggle" && request.method === "POST") {
      const b = (await request.json().catch(() => ({}))) as { code?: string; active?: boolean };
      await db.prepare("UPDATE access_codes SET active = ? WHERE code = ?").bind(b.active ? 1 : 0, (b.code ?? "").toUpperCase()).run();
      return json({ ok: true });
    }
    if (p === "/api/admin/enrollments" && request.method === "GET") {
      const { results } = await db.prepare("SELECT email, source, code, amount_inr, created_at FROM enrollments ORDER BY created_at DESC LIMIT 500").all();
      return json({ enrollments: results });
    }
  }
  return json({ error: "not_found" }, 404);
}
