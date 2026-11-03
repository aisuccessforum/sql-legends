"use client";
import "@/app/spatial.css";
import { useRef } from "react";
/** Shimmering AstraMind seal that tracks the pointer. */
export default function HoloSeal({ size = 180 }: { size?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.PointerEvent) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--sx", `${x * 40}deg`);
    el.style.setProperty("--sy", `${-y * 40}deg`);
    el.style.setProperty("--ang", `${(x + y) * 360}deg`);
    el.style.setProperty("--sh", `${50 + x * 100}%`);
  }
  function leave() { ref.current?.removeAttribute("style"); }
  return (
    <div onPointerMove={move} onPointerLeave={leave} style={{ padding: 30 }}>
      <div ref={ref} className="holo-seal" style={{ width: size, height: size }}>
        <div style={{ textAlign: "center", color: "#0b0a22", fontFamily: "var(--font-display)", fontWeight: 700, lineHeight: 1.1, zIndex: 1 }}>
          <div style={{ fontSize: size * 0.2 }}>✦</div>
          <div style={{ fontSize: size * 0.1, letterSpacing: ".12em" }}>ASTRAMIND</div>
          <div style={{ fontSize: size * 0.07, letterSpacing: ".2em" }}>ANALYTICS</div>
        </div>
      </div>
    </div>
  );
}
