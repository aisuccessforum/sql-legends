"use client";

import { useEffect, useState } from "react";
import BootSequence from "@/components/boot/BootSequence";
import StatusBar from "@/components/hud/StatusBar";
import XpToast from "@/components/hud/XpToast";
import Dossier from "@/components/dossier/Dossier";
import SqlTerminal from "@/components/terminal/SqlTerminal";
import { level001 } from "@/content/missions/level001";
import { useGameStore } from "@/store/useGameStore";

export default function Home() {
  const [booted, setBooted] = useState(false);
  const hydrated = useGameStore((s) => s.hydrated);
  const hydrate = useGameStore((s) => s.hydrate);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  // Blank frame while we read the save file — IndexedDB reads are near
  // instant, so this is imperceptible, and it guarantees the boot
  // sequence and HUD render with the correct saved XP from frame one.
  if (!hydrated) {
    return <div className="min-h-screen bg-[var(--void)]" />;
  }

  if (!booted) {
    return <BootSequence onDone={() => setBooted(true)} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <StatusBar world={level001.world} />

      <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 md:grid-cols-2">
        <div
          className="border-b md:border-b-0 md:border-r"
          style={{ borderColor: "var(--console-line)" }}
        >
          <Dossier mission={level001} />
        </div>
        <SqlTerminal mission={level001} />
      </main>

      <XpToast />
    </div>
  );
}