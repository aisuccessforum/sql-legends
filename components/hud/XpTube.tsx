"use client";
import "@/app/spatial.css";
import { useEffect, useRef, useState } from "react";
/** Glass tube progress bar. Gel spheres drop in whenever `xp` increases. */
export default function XpTube({ xp, pct, width = 260 }: { xp: number; pct: number; width?: number }) {
  const prev = useRef(xp);
  const [gels, setGels] = useState<number[]>([]);
  useEffect(() => {
    if (xp > prev.current) {
      const ids = Array.from({ length: 4 }, (_, i) => Date.now() + i);
      ids.forEach((id, i) => setTimeout(() => setGels((g) => [...g, id]), i * 160));
      setTimeout(() => setGels((g) => g.filter((x) => !ids.includes(x))), 2200);
    }
    prev.current = xp;
  }, [xp]);
  return (
    <div style={{ width, maxWidth: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-lo)", marginBottom: 6 }}>
        <span>XP</span><span style={{ color: "var(--neon-cyan)" }}>{xp.toLocaleString()}</span>
      </div>
      <div className="glass" style={{ position: "relative", height: 26, borderRadius: 999, overflow: "visible", padding: 3 }}>
        <div style={{ height: "100%", width: `${Math.max(pct, 3)}%`, borderRadius: 999, transition: "width .9s cubic-bezier(.34,1.56,.64,1)",
          background: "linear-gradient(180deg,#9ffcff,#3df0ff 50%,#00a7c4)", boxShadow: "0 0 18px rgba(61,240,255,.7), inset 0 2px 3px rgba(255,255,255,.8)" }} />
        {gels.map((id) => <span key={id} className="gel" style={{ left: `${Math.min(pct, 96)}%` }} />)}
      </div>
    </div>
  );
}
