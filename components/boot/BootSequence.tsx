"use client";

import { useTypewriter } from "@/lib/useTypewriter";
import { useEffect } from "react";

const BOOT_LINES = [
  "GLOBAL DATA ACADEMY // SECURE TERMINAL",
  "AUTHENTICATING BOARDING PASS...",
  "IDENTITY CONFIRMED.",
  "CLEARANCE LEVEL: INTERN",
  "LOADING WORLD: DATA ACADEMY...",
];

export default function BootSequence({ onDone }: { onDone: () => void }) {
  const { doneLines, currentPartial, isComplete } = useTypewriter(BOOT_LINES, {
    charDelayMs: 12,
    lineDelayMs: 220,
  });

  useEffect(() => {
    if (!isComplete) return;
    const t = setTimeout(onDone, 500);
    return () => clearTimeout(t);
  }, [isComplete, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--void)]">
      <div
        className="w-full max-w-xl px-8 font-[family-name:var(--font-mono)] text-sm sm:text-base"
        style={{ color: "var(--terminal)" }}
      >
        {doneLines.map((line, i) => (
          <div key={i} className="mb-2 opacity-80">
            &gt; {line}
          </div>
        ))}
        {!isComplete && (
          <div className="mb-2 blink-cursor">&gt; {currentPartial}</div>
        )}
      </div>
    </div>
  );
}
