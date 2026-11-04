export interface AccessStatus { hasAccess: boolean; source: string | null; isAdmin: boolean }

export async function getAccess(): Promise<AccessStatus> {
  try {
    const r = await fetch("/api/access/status", { cache: "no-store" });
    if (!r.ok) return { hasAccess: false, source: null, isAdmin: false };
    return (await r.json()) as AccessStatus;
  } catch {
    return { hasAccess: false, source: null, isAdmin: false };
  }
}

export async function redeemCode(code: string): Promise<{ ok: boolean; error?: string }> {
  try {
    const r = await fetch("/api/access/redeem", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code }) });
    const d = await r.json().catch(() => ({}));
    return r.ok ? { ok: true } : { ok: false, error: d.error ?? "Could not redeem this code." };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}

const UNAVAILABLE = "Payment gateway is currently not available. Please try again after some time.";

function loadCashfreeSdk(): Promise<void> {
  return new Promise((resolve, reject) => {
    if ((window as any).Cashfree) { resolve(); return; }
    const el = document.createElement("script");
    el.src = "https://sdk.cashfree.com/js/v3/cashfree.js";
    el.onload = () => resolve();
    el.onerror = () => reject(new Error("sdk"));
    document.head.appendChild(el);
  });
}

/** Creates an order on our server, then opens Cashfree's hosted checkout. */
export async function startPayment(phone: string, code = ""): Promise<{ ok: boolean; message?: string }> {
  try {
    const r = await fetch("/api/pay/create", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ phone, code }) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok || !d.sessionId) return { ok: false, message: d.message ?? UNAVAILABLE };
    await loadCashfreeSdk();
    const cashfree = (window as any).Cashfree({ mode: d.mode === "production" ? "production" : "sandbox" });
    await cashfree.checkout({ paymentSessionId: d.sessionId, redirectTarget: "_self" });
    return { ok: true };
  } catch {
    return { ok: false, message: UNAVAILABLE };
  }
}

/** Called after Cashfree sends the user back to the site. */
export async function verifyPayment(orderId: string): Promise<{ status: string; hasAccess: boolean }> {
  try {
    const r = await fetch(`/api/pay/verify?order_id=${encodeURIComponent(orderId)}`, { cache: "no-store" });
    if (!r.ok) return { status: "UNKNOWN", hasAccess: false };
    return await r.json();
  } catch {
    return { status: "UNKNOWN", hasAccess: false };
  }
}

/** Preview the price with an optional discount code. */
export async function quotePrice(code: string): Promise<{ ok: boolean; amount?: number; pct?: number; error?: string }> {
  try {
    const r = await fetch("/api/pay/quote", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code }) });
    const d = await r.json().catch(() => ({}));
    return r.ok ? { ok: true, amount: d.amount, pct: d.pct } : { ok: false, error: d.error ?? "Could not apply this code." };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
