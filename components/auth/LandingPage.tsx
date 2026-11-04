"use client";
import "@/app/spatial.css";
import { useRef } from "react";
import { SITE, CURRICULUM, PAID_RANK_COUNT } from "@/content/site";
import { SiteFooter } from "@/components/site/SiteShell";

const G = (
  <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.2 5.5-4.7 7.2l7.6 5.9c4.4-4.1 6.9-10.1 6.9-17.6z"/><path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/><path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/></svg>
);

const FAQ = [
  ["Do I need to know SQL already?", "No. The Intern rank starts at SELECT and builds up one concept per ticket. Each module has a study guide, and hints are built into every ticket."],
  ["What does free include?", "The whole Intern rank — 80 tickets with study guides, XP, and your progress saved to your account."],
  ["What do I get when I pay?", `All ${PAID_RANK_COUNT} remaining ranks (350 tickets), lifetime access, and your certificates. One payment of ₹${SITE.priceInr.toLocaleString("en-IN")}, no GST and no subscription.`],
  ["I have an access code.", "Sign in with Google, finish the Intern rank (or open any paid rank), and enter the code on the unlock screen."],
  ["Do I need to install anything?", "No. SQL runs in your browser. It works on phone and desktop."],
  ["Is the certificate a qualification?", "It is a completion certificate for this simulation. It is not an accredited qualification, but it shows exactly what you have practised."],
];

export default function LandingPage() {
  const btn = useRef<HTMLAnchorElement>(null);
  function tilt(e: React.PointerEvent) {
    const el = btn.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 16}deg`);
    el.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 16}deg`);
  }
  function reset() { btn.current?.style.removeProperty("--ry"); btn.current?.style.removeProperty("--rx"); }

  const eyebrow: React.CSSProperties = { fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: ".2em", color: "var(--neon-cyan)", textTransform: "uppercase", marginBottom: 14 };
  const h2: React.CSSProperties = { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(30px,4vw,44px)", letterSpacing: "-0.03em", color: "var(--text-hi)", marginBottom: 14, lineHeight: 1.1 };
  const sect: React.CSSProperties = { maxWidth: 1100, margin: "0 auto", padding: "72px 20px 0" };
  const lead: React.CSSProperties = { fontSize: 18, lineHeight: 1.7, color: "var(--text-lo)", maxWidth: 680 };

  return (
    <div>
      <header style={{ maxWidth: 1100, margin: "0 auto", padding: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-hi)" }}>✦ {SITE.product}</span>
        <nav style={{ display: "flex", gap: 22, alignItems: "center", flexWrap: "wrap" }}>
          {[["#how", "How it works"], ["#curriculum", "Curriculum"], ["#pricing", "Pricing"], ["#faq", "FAQ"]].map(([h, t]) => (
            <a key={h} href={h} style={{ color: "var(--text-lo)", textDecoration: "none", fontSize: 15 }}>{t}</a>
          ))}
          <a href="/api/auth/google/start" style={{ color: "var(--neon-cyan)", textDecoration: "none", fontSize: 15, fontWeight: 600 }}>Sign in</a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ padding: "24px 16px 0" }}>
        <div className="glass zoom-out" style={{ maxWidth: 1100, margin: "0 auto", borderRadius: "64px 120px 64px 120px / 64px 90px 64px 90px", padding: "clamp(28px,5vw,72px)", display: "grid", gap: 40, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", alignItems: "center" }}>
          <div>
            <p style={eyebrow}>{SITE.brand}</p>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(38px,5.4vw,68px)", lineHeight: 1.05, letterSpacing: "-0.03em", color: "var(--text-hi)", marginBottom: 20 }}>Real client tickets, real SQL, zero fluff.</h1>
            <p style={{ ...lead, marginBottom: 32 }}>Join {SITE.brand} as an Intern and work your way up through 8 career ranks and 430 client tickets. Write real SQL in your browser, earn XP, and finish with a certificate. The first rank is free.</p>
            <a ref={btn} href="/api/auth/google/start" className="pill-3d" onPointerMove={tilt} onPointerLeave={reset}>{G} Continue with Google</a>
            <p style={{ color: "var(--text-lo)", fontSize: 14, marginTop: 16 }}>Free to start · no card needed</p>
          </div>
          <div style={{ display: "grid", placeItems: "center", perspective: 900, minHeight: 360 }}>
            <div className="float"><div className="badge-spin" style={{ width: 230, height: 330, borderRadius: 30, position: "relative", background: "linear-gradient(160deg,#f4efe6,#d9d2c3 60%,#bdb4a2)", boxShadow: "0 40px 60px -20px rgba(0,0,0,.7), inset 0 6px 10px rgba(255,255,255,.8), inset 0 -10px 18px rgba(0,0,0,.18)", padding: 22, color: "#2a2540" }}>
              <div style={{ width: 54, height: 12, borderRadius: 8, background: "#2a2540", margin: "0 auto 22px", boxShadow: "inset 0 2px 3px rgba(0,0,0,.5)" }} />
              <div style={{ width: 110, height: 110, borderRadius: "50%", margin: "0 auto 16px", background: "linear-gradient(160deg,#7c8cf8,#4b3fd1)", display: "grid", placeItems: "center", fontSize: 44, color: "#fff", boxShadow: "inset 0 5px 8px rgba(255,255,255,.4), 0 8px 14px rgba(0,0,0,.25)" }}>✦</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 30, textAlign: "center", letterSpacing: ".05em" }}>INTERN</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, textAlign: "center", marginTop: 6, opacity: .7 }}>AMA-INT-0001</div>
              <div style={{ position: "absolute", left: 22, right: 22, bottom: 22, height: 36, borderRadius: 10, background: "repeating-linear-gradient(90deg,#2a2540 0 3px,transparent 3px 7px)", opacity: .75 }} />
            </div></div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" style={sect}>
        <p style={eyebrow}>How it works</p>
        <h2 style={h2}>Learn SQL the way analysts actually work</h2>
        <p style={{ ...lead, marginBottom: 32 }}>No toy examples. Every ticket is a morning briefing from a manager with a real client problem and a real database.</p>
        <div style={{ display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))" }}>
          {[["1", "Read the ticket", "A manager briefs you on a client request, with the business context and the exact ask."],
            ["2", "Write the SQL", "Query the client’s database right in your browser. Hints escalate if you get stuck."],
            ["3", "Get cleared", "Your result is checked instantly. Pass to earn XP and unlock the next ticket."],
            ["4", "Get promoted", "Clear a whole rank to be promoted, up to Staff Analyst, and collect your certificate."]].map(([n, t, d]) => (
            <div key={n} className="glass" style={{ borderRadius: 28, padding: 26 }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 700, color: "var(--neon-magenta)", marginBottom: 6 }}>{n}</div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--text-hi)", marginBottom: 8 }}>{t}</h3>
              <p style={{ color: "var(--text-lo)", fontSize: 16, lineHeight: 1.65 }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SAMPLE TICKET */}
      <section style={sect}>
        <p style={eyebrow}>A taste of a ticket</p>
        <div className="glass" style={{ borderRadius: 32, padding: "clamp(22px,4vw,40px)", display: "grid", gap: 28, gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--neon-cyan)", marginBottom: 10 }}>08:45 AM · Client: Nova Retail Pvt Ltd · Priority: High</p>
            <p style={{ fontSize: 17, lineHeight: 1.75, color: "var(--text-hi)" }}>“Good morning. Nova Retail has sent us their employee database. Before our AI pipeline begins, they need a quick verification report. Never trust incoming client data. Verify it yourself.”</p>
          </div>
          <pre className="holo-term" style={{ padding: 22, fontFamily: "var(--font-mono)", fontSize: 15, lineHeight: 1.7, color: "#7dfbd0", textShadow: "0 0 8px rgba(67,242,160,.55)", overflowX: "auto", margin: 0 }}>{`SELECT *
FROM employees
WHERE status = 'active';`}</pre>
        </div>
      </section>

      {/* CURRICULUM */}
      <section id="curriculum" style={sect}>
        <p style={eyebrow}>Curriculum</p>
        <h2 style={h2}>8 ranks · 430 tickets</h2>
        <p style={{ ...lead, marginBottom: 32 }}>Each rank has study modules and a ticket queue. Every ticket introduces one new idea, building toward a final assessment.</p>
        <div style={{ display: "grid", gap: 18, gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))" }}>
          {CURRICULUM.map((r, i) => (
            <div key={r.rank} className="glass" style={{ borderRadius: 24, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-lo)" }}>TIER {i + 1}</span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, padding: "3px 10px", borderRadius: 999, border: "1px solid", color: r.free ? "#43f2a0" : "var(--neon-magenta)", borderColor: r.free ? "rgba(67,242,160,.5)" : "rgba(255,79,216,.4)" }}>{r.free ? "FREE" : "PAID"}</span>
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: 21, color: "var(--text-hi)", marginBottom: 6 }}>{r.rank}</h3>
              <p style={{ color: "var(--text-lo)", fontSize: 14, lineHeight: 1.55, marginBottom: 10 }}>{r.focus}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--neon-cyan)" }}>{r.tickets} tickets</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={sect}>
        <p style={eyebrow}>Pricing</p>
        <h2 style={h2}>Start free. Unlock the rest once.</h2>
        <div style={{ display: "grid", gap: 22, gridTemplateColumns: "repeat(auto-fit,minmax(290px,1fr))", marginTop: 28, maxWidth: 860 }}>
          <div className="glass" style={{ borderRadius: 30, padding: 30 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-hi)" }}>Intern</h3>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: "#43f2a0", lineHeight: 1.1, margin: "8px 0 14px" }}>Free</p>
            <ul style={{ color: "var(--text-lo)", fontSize: 16, lineHeight: 2, paddingLeft: 20, marginBottom: 22 }}><li>80 tickets</li><li>Study guides for every module</li><li>XP and saved progress</li></ul>
            <a href="/api/auth/google/start" className="pill-3d" style={{ justifyContent: "center", width: "100%", fontSize: 17, padding: "14px 20px" }}>Start free</a>
          </div>
          <div className="glass tier-active" style={{ ["--neon" as string]: "#3df0ff", borderRadius: 30, padding: 30 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 24, color: "var(--text-hi)" }}>Full career track</h3>
            <p style={{ fontFamily: "var(--font-display)", fontSize: 48, fontWeight: 700, color: "var(--neon-cyan)", lineHeight: 1.1, margin: "8px 0 4px" }}>₹{SITE.priceInr.toLocaleString("en-IN")}</p>
            <p style={{ color: "var(--text-lo)", fontSize: 14, marginBottom: 14 }}>one-time · no GST · no subscription</p>
            <ul style={{ color: "var(--text-lo)", fontSize: 16, lineHeight: 2, paddingLeft: 20, marginBottom: 22 }}><li>All {PAID_RANK_COUNT} paid ranks, 350 tickets</li><li>Lifetime access</li><li>Certificates for completed ranks</li><li>Have an access code? Redeem it after sign-in</li></ul>
            <a href="/api/auth/google/start" className="pill-3d" style={{ justifyContent: "center", width: "100%", fontSize: 17, padding: "14px 20px" }}>Sign in to enroll</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={sect}>
        <p style={eyebrow}>FAQ</p>
        <h2 style={{ ...h2, marginBottom: 24 }}>Questions, answered</h2>
        <div style={{ display: "grid", gap: 12, maxWidth: 820 }}>
          {FAQ.map(([q, a]) => (
            <details key={q} className="glass" style={{ borderRadius: 20, padding: "18px 22px" }}>
              <summary style={{ cursor: "pointer", fontFamily: "var(--font-display)", fontSize: 18, color: "var(--text-hi)" }}>{q}</summary>
              <p style={{ color: "var(--text-lo)", fontSize: 16, lineHeight: 1.7, marginTop: 12 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
