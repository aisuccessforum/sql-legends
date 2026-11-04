// Access, code redemption, admin and (stubbed) payment routes.
// Wire into worker/index.ts — see README_PHASE2.md.
import { SITE } from "../content/site";

export interface AccessEnv {
  DB: any;
  ADMIN_EMAILS?: string;
  CASHFREE_APP_ID?: string;
  CASHFREE_SECRET_KEY?: string;
  CASHFREE_ENV?: string; // "sandbox" (default) | "production"
}
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


const PAY_UNAVAILABLE = "Payment gateway is currently not available. Please try again after some time.";
const CF_API_VERSION = "2025-01-01";
const cfBase = (env: AccessEnv) => (env.CASHFREE_ENV === "production" ? "https://api.cashfree.com/pg" : "https://sandbox.cashfree.com/pg");
const cfHeaders = (env: AccessEnv) => ({
  "content-type": "application/json",
  "x-api-version": CF_API_VERSION,
  "x-client-id": env.CASHFREE_APP_ID ?? "",
  "x-client-secret": env.CASHFREE_SECRET_KEY ?? "",
});
const gatewayConfigured = (env: AccessEnv) => !!(env.CASHFREE_APP_ID && env.CASHFREE_SECRET_KEY);

async function hmacBase64(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message));
  let s = ""; new Uint8Array(sig).forEach((b) => (s += String.fromCharCode(b)));
  return btoa(s);
}


/** Price after a discount code. Returns an error string if the code can't be used. */
async function priceWithCode(db: any, rawCode: string): Promise<{ ok: true; code: string; pct: number; amount: number } | { ok: false; error: string }> {
  const code = rawCode.trim().toUpperCase();
  const row = await db.prepare(
    "SELECT code, discount_pct FROM access_codes WHERE code = ? AND active = 1 AND uses < max_uses AND (expires_at IS NULL OR expires_at > datetime('now'))"
  ).bind(code).first();
  if (!row) return { ok: false, error: "This code is invalid, expired, or fully used." };
  const pct = Number(row.discount_pct);
  if (pct >= 100) return { ok: false, error: "This is a free-access code. Use the access code box instead." };
  const amount = Math.max(1, Math.round((SITE.priceInr * (100 - pct)) / 100));
  return { ok: true, code, pct, amount };
}

/** Ask Cashfree for the real order status (never trust the browser or the webhook body alone) and unlock on PAID. */
async function settleOrder(env: AccessEnv, orderId: string): Promise<{ found: boolean; status: string; userId?: string }> {
  const db = env.DB;
  const row = await db.prepare("SELECT order_id, user_id, email, amount_inr, status, discount_code FROM payments WHERE order_id = ?").bind(orderId).first();
  if (!row) return { found: false, status: "UNKNOWN" };
  if (row.status === "PAID") return { found: true, status: "PAID", userId: row.user_id };
  const r = await fetch(`${cfBase(env)}/orders/${encodeURIComponent(orderId)}`, { headers: cfHeaders(env) });
  if (!r.ok) return { found: true, status: "PENDING", userId: row.user_id };
  const d = (await r.json()) as { order_status?: string; order_amount?: number; cf_order_id?: string | number };
  if (d.order_status === "PAID" && Number(d.order_amount) === Number(row.amount_inr)) {
    // Claim the order first so a webhook + browser return racing each other only count once.
    const claim = await db.prepare("UPDATE payments SET status = 'PAID', paid_at = datetime('now'), cf_order_id = ? WHERE order_id = ? AND status != 'PAID'").bind(String(d.cf_order_id ?? ""), orderId).run();
    if (claim.meta?.changes) {
      await db.prepare("INSERT OR IGNORE INTO enrollments (user_id, email, source, code, payment_id, amount_inr) VALUES (?, ?, 'payment', ?, ?, ?)").bind(row.user_id, row.email, row.discount_code ?? null, String(d.cf_order_id ?? orderId), row.amount_inr).run();
      if (row.discount_code) await db.prepare("UPDATE access_codes SET uses = uses + 1 WHERE code = ?").bind(row.discount_code).run();
    }
    return { found: true, status: "PAID", userId: row.user_id };
  }
  return { found: true, status: d.order_status ?? "PENDING", userId: row.user_id };
}

/** Returns a Response for /api/access*, /api/pay*, /api/admin*; null if the path isn't ours. */
export async function handleAccess(request: Request, env: AccessEnv, user: AccessUser | null): Promise<Response | null> {
  const url = new URL(request.url);
  const p = url.pathname;
  if (!(p.startsWith("/api/access") || p.startsWith("/api/pay") || p.startsWith("/api/admin"))) return null;
  const db = env.DB;

  // ── Cashfree webhook (no user session; authenticated by signature) ──
  if (p === "/api/pay/webhook" && request.method === "POST") {
    if (!gatewayConfigured(env)) return json({ ok: false }, 503);
    const raw = await request.text();
    const ts = request.headers.get("x-webhook-timestamp") ?? "";
    const sig = request.headers.get("x-webhook-signature") ?? "";
    const a = await hmacBase64(env.CASHFREE_SECRET_KEY!, ts + raw);
    const b = await hmacBase64(env.CASHFREE_SECRET_KEY!, ts + "." + raw);
    if (!sig || (sig !== a && sig !== b)) return json({ error: "bad_signature" }, 401);
    let orderId = "";
    try { orderId = JSON.parse(raw)?.data?.order?.order_id ?? ""; } catch { /* ignore */ }
    if (orderId) await settleOrder(env, orderId);
    return json({ ok: true });
  }

  if (!user) return json({ error: "unauthorized" }, 401);

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
    const kind = await db.prepare("SELECT discount_pct FROM access_codes WHERE code = ?").bind(code).first();
    if (kind && Number(kind.discount_pct) < 100) return json({ error: "This is a discount code. Enter it in the payment box above the Pay button." }, 400);
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

  // ── payment: preview price with a discount code ──
  if (p === "/api/pay/quote" && request.method === "POST") {
    const b = (await request.json().catch(() => ({}))) as { code?: string };
    if (!(b.code ?? "").trim()) return json({ ok: true, pct: 0, amount: SITE.priceInr });
    const q = await priceWithCode(db, b.code!);
    if (!q.ok) return json({ error: q.error }, 400);
    return json({ ok: true, pct: q.pct, amount: q.amount });
  }

  // ── payment: create a Cashfree order ──
  if (p === "/api/pay/create" && request.method === "POST") {
    if (!gatewayConfigured(env)) return json({ error: "payment_unavailable", message: PAY_UNAVAILABLE }, 503);
    const existing = await db.prepare("SELECT 1 AS x FROM enrollments WHERE user_id = ?").bind(user.id).first();
    if (existing) return json({ error: "already_enrolled", message: "You already have full access." }, 409);
    const body = (await request.json().catch(() => ({}))) as { phone?: string; code?: string };
    const phone = (body.phone ?? "").replace(/\s|-/g, "");
    if (!/^[6-9]\d{9}$/.test(phone)) return json({ error: "bad_phone", message: "Enter a valid 10-digit mobile number." }, 400);

    const orderId = `SL${Date.now()}${Array.from(crypto.getRandomValues(new Uint8Array(4)), (x) => x.toString(16).padStart(2, "0")).join("")}`;
    let amount = SITE.priceInr;
    let discountCode: string | null = null;
    if ((body.code ?? "").trim()) {
      const q = await priceWithCode(db, body.code!);
      if (!q.ok) return json({ error: "bad_code", message: q.error }, 400);
      amount = q.amount; discountCode = q.code;
    }
    try {
      const r = await fetch(`${cfBase(env)}/orders`, {
        method: "POST",
        headers: cfHeaders(env),
        body: JSON.stringify({
          order_id: orderId,
          order_amount: amount,
          order_currency: "INR",
          customer_details: { customer_id: `u${user.id}`.replace(/[^a-zA-Z0-9]/g, "").slice(0, 50), customer_email: user.email, customer_phone: phone },
          order_meta: { return_url: `${url.origin}/?pay_order=${orderId}`, notify_url: `${url.origin}/api/pay/webhook` },
          order_note: `${SITE.product} full access${discountCode ? " (discount)" : ""}`,
        }),
      });
      const d = (await r.json().catch(() => ({}))) as { payment_session_id?: string; message?: string };
      if (!r.ok || !d.payment_session_id) {
        console.error("cashfree create order failed", r.status, JSON.stringify(d));
        return json({ error: "payment_unavailable", message: PAY_UNAVAILABLE }, 503);
      }
      await db.prepare("INSERT INTO payments (order_id, user_id, email, amount_inr, discount_code) VALUES (?, ?, ?, ?, ?)").bind(orderId, user.id, user.email, amount, discountCode).run();
      return json({ ok: true, orderId, sessionId: d.payment_session_id, mode: env.CASHFREE_ENV === "production" ? "production" : "sandbox" });
    } catch (e) {
      console.error("cashfree create order error", e);
      return json({ error: "payment_unavailable", message: PAY_UNAVAILABLE }, 503);
    }
  }

  // ── payment: confirm after returning from checkout ──
  if (p === "/api/pay/verify" && request.method === "GET") {
    const orderId = url.searchParams.get("order_id") ?? "";
    const own = await db.prepare("SELECT user_id FROM payments WHERE order_id = ?").bind(orderId).first();
    if (!own || own.user_id !== user.id) return json({ error: "not_found" }, 404);
    if (!gatewayConfigured(env)) return json({ error: "payment_unavailable", message: PAY_UNAVAILABLE }, 503);
    const res = await settleOrder(env, orderId);
    const enrolled = await db.prepare("SELECT 1 AS x FROM enrollments WHERE user_id = ?").bind(user.id).first();
    return json({ status: res.status, hasAccess: !!enrolled });
  }

  // ── admin ──
  if (p.startsWith("/api/admin")) {
    if (!isAdmin(env, user)) return json({ error: "forbidden" }, 403);

    if (p === "/api/admin/codes" && request.method === "GET") {
      const { results } = await db.prepare("SELECT code, owner, max_uses, uses, expires_at, active, created_at, discount_pct FROM access_codes ORDER BY created_at DESC LIMIT 500").all();
      return json({ codes: results });
    }
    if (p === "/api/admin/codes" && request.method === "POST") {
      const b = (await request.json().catch(() => ({}))) as { owner?: string; maxUses?: number; expiryDays?: number | null; count?: number; code?: string; discountPct?: number };
      const owner = (b.owner ?? "").trim();
      if (!owner) return json({ error: "Owner is required." }, 400);
      const maxUses = Math.min(Math.max(Math.floor(b.maxUses ?? 1), 1), 100000);
      const count = Math.min(Math.max(Math.floor(b.count ?? 1), 1), 100);
      const pct = Math.min(Math.max(Math.floor(b.discountPct ?? 100), 1), 100);
      const expires = b.expiryDays && b.expiryDays > 0 ? `datetime('now', '+${Math.floor(b.expiryDays)} days')` : "NULL";
      const made: string[] = [];
      for (let i = 0; i < count; i++) {
        const code = (count === 1 && b.code ? b.code.trim().toUpperCase() : genCode());
        await db.prepare(`INSERT INTO access_codes (code, owner, max_uses, expires_at, discount_pct) VALUES (?, ?, ?, ${expires}, ?)`).bind(code, owner, maxUses, pct).run();
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
