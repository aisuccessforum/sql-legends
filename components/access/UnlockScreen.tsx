"use client";
import "@/app/spatial.css";
import { useState } from "react";
import { SITE, PAID_RANK_COUNT } from "@/content/site";
import { redeemCode, startPayment } from "@/lib/access";

export default function UnlockScreen({ onBack, onUnlocked }: { onBack: () => void; onUnlocked: () => void }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState<"" | "pay" | "code">("");
  const [payMsg, setPayMsg] = useState("");
  const [codeMsg, setCodeMsg] = useState("");

  async function pay() {
    setBusy("pay"); setPayMsg("");
    const r = await startPayment();
    if (!r.ok) setPayMsg(r.message ?? "Payment gateway is currently not available. Please try again after some time.");
    setBusy("");
  }
  async function redeem(e: React.FormEvent) {
    e.preventDefault(); setBusy("code"); setCodeMsg("");
    const r = await redeemCode(code);
    setBusy("");
    if (r.ok) onUnlocked(); else setCodeMsg(r.error ?? "Could not redeem this code.");
  }

  const card: React.CSSProperties = { borderRadius: 28, padding: 30 };
  return (
    <div className="zoom-out" style={{ width: "100%", maxWidth: 980, margin: "0 auto", padding: "0 8px" }}>
      <button onClick={onBack} style={{ background: "none", border: "none", color: "var(--text-lo)", fontFamily: "var(--font-mono)", fontSize: 13, cursor: "pointer", marginBottom: 24 }}>← Career hub</button>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: ".2em", color: "var(--neon-magenta)", textTransform: "uppercase", marginBottom: 12 }}>Promotion locked</p>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(34px,4.6vw,52px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.08, color: "var(--text-hi)", marginBottom: 14 }}>
        Unlock the full career track
      </h1>
      <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--text-lo)", maxWidth: 640, marginBottom: 36 }}>
        The Intern rank is free. The next {PAID_RANK_COUNT} ranks — Junior Data Analyst through Staff Analyst, 350 more tickets — unlock with a one-time payment or an access code.
      </p>
      <div style={{ display: "grid", gap: 24, gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
        <section className="glass" style={card}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-hi)", marginBottom: 6 }}>Enroll</h2>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 46, fontWeight: 700, color: "var(--neon-cyan)", lineHeight: 1 }}>₹{SITE.priceInr.toLocaleString("en-IN")}</p>
          <p style={{ color: "var(--text-lo)", fontSize: 14, margin: "8px 0 22px" }}>One-time · all {PAID_RANK_COUNT} paid ranks · lifetime access · no GST</p>
          <button className="pill-3d" style={{ width: "100%", justifyContent: "center", fontSize: 17, padding: "15px 24px" }} onClick={pay} disabled={busy === "pay"}>
            {busy === "pay" ? "Please wait…" : "Proceed to payment"}
          </button>
          {payMsg && <p role="alert" style={{ marginTop: 16, padding: "12px 14px", borderRadius: 14, background: "rgba(242,84,91,0.12)", border: "1px solid rgba(242,84,91,0.4)", color: "#ffb4b8", fontSize: 14, lineHeight: 1.5 }}>{payMsg}</p>}
        </section>
        <section className="glass" style={card}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-hi)", marginBottom: 6 }}>Have an access code?</h2>
          <p style={{ color: "var(--text-lo)", fontSize: 14, marginBottom: 22, lineHeight: 1.6 }}>Codes are issued by AstraMind or our referral partners. Enter yours to unlock every rank.</p>
          <form onSubmit={redeem}>
            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="ASTRA-XXXX-XXXX" autoCapitalize="characters" spellCheck={false}
              style={{ width: "100%", padding: "15px 18px", borderRadius: 16, border: "1px solid var(--glass-line)", background: "rgba(0,0,0,0.45)", color: "var(--text-hi)", fontFamily: "var(--font-mono)", fontSize: 16, letterSpacing: ".08em", marginBottom: 14 }} />
            <button type="submit" disabled={busy === "code" || !code.trim()} className="pill-3d" style={{ width: "100%", justifyContent: "center", fontSize: 17, padding: "15px 24px", opacity: code.trim() ? 1 : 0.6 }}>
              {busy === "code" ? "Checking…" : "Redeem code"}
            </button>
          </form>
          {codeMsg && <p role="alert" style={{ marginTop: 16, color: "#ffb4b8", fontSize: 14 }}>{codeMsg}</p>}
        </section>
      </div>
    </div>
  );
}
