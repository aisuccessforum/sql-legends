"use client";
import "@/app/spatial.css";
import { useRef } from "react";

export default function LandingPage() {
  const btn = useRef<HTMLAnchorElement>(null);
  function tilt(e: React.PointerEvent) {
    const el = btn.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 16}deg`);
    el.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 16}deg`);
  }
  function reset() { btn.current?.style.removeProperty("--ry"); btn.current?.style.removeProperty("--rx"); }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: "32px 16px" }}>
      <section className="glass zoom-out" style={{ width: "100%", maxWidth: 1040, borderRadius: "64px 120px 64px 120px / 64px 90px 64px 90px", padding: "clamp(28px, 5vw, 72px)",
        display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", alignItems: "center" }}>
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: ".2em", color: "var(--neon-cyan)", textTransform: "uppercase", marginBottom: 18 }}>AstraMind Analytics</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(38px, 5.4vw, 68px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--text-hi)", marginBottom: 20 }}>
            Real client tickets, real SQL, zero fluff.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--text-lo)", marginBottom: 36, maxWidth: 480 }}>
            You&apos;ve been admitted as an Intern. 430 tickets, eight career ranks, one certificate at the end.
          </p>
          <a ref={btn} href="/api/auth/google/start" className="pill-3d" onPointerMove={tilt} onPointerLeave={reset}>
            <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.6z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>
            Continue with Google
          </a>
        </div>

        {/* 3D clay Intern ID badge */}
        <div style={{ display: "grid", placeItems: "center", perspective: 900, minHeight: 360 }}>
          <div className="float"><div className="badge-spin" style={{ width: 230, height: 330, borderRadius: 30, position: "relative",
            background: "linear-gradient(160deg, #f4efe6, #d9d2c3 60%, #bdb4a2)",
            boxShadow: "0 40px 60px -20px rgba(0,0,0,.7), inset 0 6px 10px rgba(255,255,255,.8), inset 0 -10px 18px rgba(0,0,0,.18)", padding: 22, color: "#2a2540" }}>
            <div style={{ width: 54, height: 12, borderRadius: 8, background: "#2a2540", margin: "0 auto 22px", boxShadow: "inset 0 2px 3px rgba(0,0,0,.5)" }} />
            <div style={{ width: 110, height: 110, borderRadius: "50%", margin: "0 auto 16px", background: "linear-gradient(160deg,#7c8cf8,#4b3fd1)", display: "grid", placeItems: "center", fontSize: 44, color: "#fff", boxShadow: "inset 0 5px 8px rgba(255,255,255,.4), 0 8px 14px rgba(0,0,0,.25)" }}>✦</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, textAlign: "center", letterSpacing: ".05em" }}>INTERN</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "center", marginTop: 6, opacity: .7 }}>AMA-INT-0001</div>
            <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, height: 36, borderRadius: 10, background: "repeating-linear-gradient(90deg,#2a2540 0 3px,transparent 3px 7px)", opacity: .75 }} />
          </div></div>
        </div>
      </section>
    </main>
  );
}
