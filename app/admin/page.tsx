"use client";
import "@/app/spatial.css";
import { useCallback, useEffect, useState } from "react";

interface Code { code: string; owner: string; max_uses: number; uses: number; expires_at: string | null; active: number; created_at: string }
interface Enr { email: string; source: string; code: string | null; created_at: string }

export default function AdminPage() {
  const [state, setState] = useState<"loading" | "denied" | "ok">("loading");
  const [codes, setCodes] = useState<Code[]>([]);
  const [enr, setEnr] = useState<Enr[]>([]);
  const [owner, setOwner] = useState(""); const [maxUses, setMaxUses] = useState(1);
  const [expiryDays, setExpiryDays] = useState(0); const [count, setCount] = useState(1);
  const [made, setMade] = useState<string[]>([]); const [err, setErr] = useState("");

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/codes", { cache: "no-store" });
    if (!r.ok) { setState("denied"); return; }
    setCodes((await r.json()).codes);
    const e = await fetch("/api/admin/enrollments", { cache: "no-store" });
    if (e.ok) setEnr((await e.json()).enrollments);
    setState("ok");
  }, []);
  useEffect(() => { load(); }, [load]);

  async function create(e: React.FormEvent) {
    e.preventDefault(); setErr(""); setMade([]);
    const r = await fetch("/api/admin/codes", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ owner, maxUses, expiryDays: expiryDays || null, count }) });
    const d = await r.json();
    if (!r.ok) { setErr(d.error ?? "Failed"); return; }
    setMade(d.codes); load();
  }
  async function toggle(c: Code) {
    await fetch("/api/admin/codes/toggle", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ code: c.code, active: !c.active }) });
    load();
  }

  const inp: React.CSSProperties = { padding: "11px 14px", borderRadius: 12, border: "1px solid var(--glass-line)", background: "rgba(0,0,0,.45)", color: "var(--text-hi)", fontSize: 15, width: "100%" };
  const th: React.CSSProperties = { textAlign: "left", padding: "10px 12px", color: "var(--text-lo)", fontFamily: "var(--font-mono)", fontSize: 12, textTransform: "uppercase", letterSpacing: ".1em" };
  const td: React.CSSProperties = { padding: "10px 12px", color: "var(--text-hi)", fontSize: 14, borderTop: "1px solid var(--glass-line)" };

  if (state === "loading") return <div style={{ padding: 40, color: "var(--text-lo)" }}>Loading…</div>;
  if (state === "denied") return <div style={{ padding: 40, color: "var(--text-hi)" }}>Not authorized. Sign in with an admin account at <a href="/" style={{ color: "var(--neon-cyan)" }}>the home page</a> first.</div>;

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 16px" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, color: "var(--text-hi)", marginBottom: 24 }}>Access codes</h1>
      <form onSubmit={create} className="glass" style={{ borderRadius: 24, padding: 24, display: "grid", gap: 14, gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", alignItems: "end", marginBottom: 20 }}>
        <label style={{ color: "var(--text-lo)", fontSize: 13 }}>Owner (you / partner)<input style={inp} value={owner} onChange={(e) => setOwner(e.target.value)} required placeholder="e.g. Partner – Rahul" /></label>
        <label style={{ color: "var(--text-lo)", fontSize: 13 }}>Uses per code<input style={inp} type="number" min={1} value={maxUses} onChange={(e) => setMaxUses(+e.target.value)} /></label>
        <label style={{ color: "var(--text-lo)", fontSize: 13 }}>Expires in days (0 = never)<input style={inp} type="number" min={0} value={expiryDays} onChange={(e) => setExpiryDays(+e.target.value)} /></label>
        <label style={{ color: "var(--text-lo)", fontSize: 13 }}>How many codes<input style={inp} type="number" min={1} max={100} value={count} onChange={(e) => setCount(+e.target.value)} /></label>
        <button className="pill-3d" type="submit" style={{ justifyContent: "center", padding: "12px 20px", fontSize: 16 }}>Generate</button>
      </form>
      {err && <p style={{ color: "#ffb4b8", marginBottom: 12 }}>{err}</p>}
      {made.length > 0 && (
        <pre className="glass" style={{ borderRadius: 18, padding: 18, color: "var(--terminal)", fontFamily: "var(--font-mono)", fontSize: 15, marginBottom: 20, whiteSpace: "pre-wrap" }}>{made.join("\n")}</pre>
      )}
      <div className="glass" style={{ borderRadius: 24, padding: 8, overflowX: "auto", marginBottom: 28 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={th}>Code</th><th style={th}>Owner</th><th style={th}>Used</th><th style={th}>Expires</th><th style={th}>Status</th><th style={th}></th></tr></thead>
          <tbody>{codes.map((c) => (
            <tr key={c.code}><td style={{ ...td, fontFamily: "var(--font-mono)" }}>{c.code}</td><td style={td}>{c.owner}</td><td style={td}>{c.uses}/{c.max_uses}</td>
              <td style={td}>{c.expires_at ?? "never"}</td><td style={td}>{c.active ? "active" : "disabled"}</td>
              <td style={td}><button onClick={() => toggle(c)} style={{ background: "none", border: "1px solid var(--glass-line)", color: "var(--text-hi)", borderRadius: 10, padding: "5px 12px", cursor: "pointer" }}>{c.active ? "Disable" : "Enable"}</button></td></tr>
          ))}</tbody>
        </table>
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontSize: 26, color: "var(--text-hi)", marginBottom: 12 }}>Enrollments ({enr.length})</h2>
      <div className="glass" style={{ borderRadius: 24, padding: 8, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr><th style={th}>Email</th><th style={th}>Source</th><th style={th}>Code</th><th style={th}>Date</th></tr></thead>
          <tbody>{enr.map((x, i) => (<tr key={i}><td style={td}>{x.email}</td><td style={td}>{x.source}</td><td style={{ ...td, fontFamily: "var(--font-mono)" }}>{x.code ?? "—"}</td><td style={td}>{x.created_at}</td></tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
