import "@/app/spatial.css";
import Link from "next/link";
import { SITE } from "@/content/site";

export function SiteFooter() {
  const l: React.CSSProperties = { color: "var(--text-lo)", textDecoration: "none", fontSize: 14 };
  return (
    <footer style={{ borderTop: "1px solid var(--glass-line)", marginTop: 64, padding: "32px 16px", textAlign: "center" }}>
      <nav style={{ display: "flex", gap: 22, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
        <Link href="/about" style={l}>About us</Link><Link href="/contact" style={l}>Contact us</Link>
        <Link href="/terms" style={l}>Terms &amp; Conditions</Link><Link href="/privacy" style={l}>Privacy Policy</Link>
        <Link href="/refund" style={l}>Refund Policy</Link>
      </nav>
      <p style={{ color: "var(--text-lo)", fontSize: 13, lineHeight: 1.7 }}>
        © {new Date().getFullYear()} {SITE.product} by {SITE.seller}. {SITE.brand} is the fictional company in the {SITE.product} learning simulation.
      </p>
    </footer>
  );
}

export default function SiteShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh" }}>
      <header style={{ padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1000, margin: "0 auto" }}>
        <Link href="/" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, color: "var(--text-hi)", textDecoration: "none" }}>✦ {SITE.product}</Link>
        <Link href="/" style={{ color: "var(--neon-cyan)", fontSize: 14, textDecoration: "none" }}>← Back to home</Link>
      </header>
      <main className="glass" style={{ maxWidth: 860, margin: "16px auto 0", padding: "clamp(24px,5vw,56px)", borderRadius: 32 }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px,4vw,44px)", fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-hi)", marginBottom: 8 }}>{title}</h1>
        <p style={{ color: "var(--text-lo)", fontSize: 13, marginBottom: 28 }}>Last updated: {SITE.updated}</p>
        <div className="legal">{children}</div>
        <style>{`.legal h2{font-family:var(--font-display);font-size:22px;color:var(--text-hi);margin:30px 0 10px}.legal p,.legal li{color:#c3cbdc;font-size:16px;line-height:1.8;margin-bottom:10px}.legal ul{padding-left:22px}.legal a{color:var(--neon-cyan)}`}</style>
      </main>
      <SiteFooter />
    </div>
  );
}
