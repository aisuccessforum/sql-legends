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

export async function startPayment(): Promise<{ ok: boolean; message?: string }> {
  try {
    const r = await fetch("/api/pay/create", { method: "POST" });
    const d = await r.json().catch(() => ({}));
    if (r.ok && d.url) { window.location.href = d.url; return { ok: true }; }
    return { ok: false, message: d.message ?? "Payment gateway is currently not available. Please try again after some time." };
  } catch {
    return { ok: false, message: "Payment gateway is currently not available. Please try again after some time." };
  }
}
