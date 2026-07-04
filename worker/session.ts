import { jwtVerify, SignJWT } from "jose";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30; // 30 days

export async function createSessionToken(
  playerId: string,
  secret: string
): Promise<string> {
  const key = new TextEncoder().encode(secret);
  return new SignJWT({ sub: playerId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(key);
}

export async function verifySessionToken(
  token: string,
  secret: string
): Promise<string | null> {
  try {
    const key = new TextEncoder().encode(secret);
    const { payload } = await jwtVerify(token, key);
    return typeof payload.sub === "string" ? payload.sub : null;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE_NAME = "sl_session";
export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;