"use client";

import { useEffect, useRef, useState } from "react";
import { useGameStore } from "@/store/useGameStore";
import { logout } from "@/lib/api";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const resetProgress = useGameStore((s) => s.resetProgress);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Account menu"
        aria-expanded={open}
        className="flex h-8 w-8 items-center justify-center rounded-full border transition-colors hover:border-[var(--clearance)]"
        style={{ borderColor: "var(--console-line)", background: "var(--console)" }}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ color: "var(--text-lo)" }}
        >
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
        </svg>
      </button>

      {open && (
        <div
          className="console-card absolute right-0 top-10 z-50 w-48 overflow-hidden py-1"
          role="menu"
        >
          <button
            role="menuitem"
            onClick={() => {
              setOpen(false);
              if (confirm("Reset all saved progress? This cannot be undone.")) {
                resetProgress();
              }
            }}
            className="block w-full px-4 py-2.5 text-left font-[family-name:var(--font-mono)] text-xs transition-colors hover:bg-white/5"
            style={{ color: "var(--danger)" }}
          >
            Reset progress
          </button>
          <div
            className="mx-4 my-1 h-px"
            style={{ background: "var(--console-line)" }}
          />
          <button
            role="menuitem"
            onClick={async () => {
              setOpen(false);
              await logout();
              window.location.href = "/";
            }}
            className="block w-full px-4 py-2.5 text-left font-[family-name:var(--font-mono)] text-xs transition-colors hover:bg-white/5"
            style={{ color: "var(--text-hi)" }}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}