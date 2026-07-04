"use client";

import { useEffect, useState } from "react";

/**
 * Types out `lines` sequentially. Returns the lines revealed so far
 * (fully typed lines as plain strings) plus the in-progress partial
 * line, so callers can render past lines statically and only animate
 * the current one.
 */
export function useTypewriter(
  lines: string[],
  options?: { charDelayMs?: number; lineDelayMs?: number }
) {
  const charDelay = options?.charDelayMs ?? 14;
  const lineDelay = options?.lineDelayMs ?? 280;

  const [doneLines, setDoneLines] = useState<string[]>([]);
  const [currentPartial, setCurrentPartial] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- this effect drives
     * an imperative character-by-character animation loop (via setTimeout),
     * which is exactly the kind of external-timer synchronization effects
     * are for; it cannot be expressed as derived render-time state. */
    setDoneLines([]);
    setCurrentPartial("");
    setIsComplete(false);
    /* eslint-enable react-hooks/set-state-in-effect */

    let cancelled = false;
    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    function tick() {
      if (cancelled) return;
      if (lineIndex >= lines.length) {
        setIsComplete(true);
        return;
      }
      const line = lines[lineIndex];
      charIndex += 1;
      setCurrentPartial(line.slice(0, charIndex));

      if (charIndex >= line.length) {
        timeoutId = setTimeout(() => {
          if (cancelled) return;
          setDoneLines((prev) => [...prev, line]);
          setCurrentPartial("");
          lineIndex += 1;
          charIndex = 0;
          tick();
        }, lineDelay);
      } else {
        timeoutId = setTimeout(tick, charDelay);
      }
    }

    tick();
    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("\u0000")]);

  return { doneLines, currentPartial, isComplete };
}
