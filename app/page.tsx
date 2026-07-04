"use client";

import { useEffect, useState } from "react";
import BootSequence from "@/components/boot/BootSequence";
import StatusBar from "@/components/hud/StatusBar";
import XpToast from "@/components/hud/XpToast";
import Dossier from "@/components/dossier/Dossier";
import SqlTerminal from "@/components/terminal/SqlTerminal";
import LandingPage from "@/components/auth/LandingPage";
import OnboardingForm from "@/components/auth/OnboardingForm";
import ProgressSync from "@/components/game/ProgressSync";
import { level001 } from "@/content/missions/level001";
import { useGameStore } from "@/store/useGameStore";
import { getProfile, type PlayerProfile } from "@/lib/api";

type AuthState = "loading" | "signed-out" | "onboarding" | "ready";

export default function Home() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [email, setEmail] = useState("");
  const [booted, setBooted] = useState(false);
  const seedFromProfile = useGameStore((s) => s.seedFromProfile);
  const ready = useGameStore((s) => s.ready);

  useEffect(() => {
    let cancelled = false;
    getProfile()
      .then((profile) => {
        if (cancelled) return;
        if (!profile) {
          setAuthState("signed-out");
          return;
        }
        setEmail(profile.email);
        if (!profile.onboardingComplete) {
          setAuthState("onboarding");
          return;
        }
        seedFromProfile({
          rank: profile.rank,
          xp: profile.xp,
          completedMissions: profile.completedMissions,
        });
        setAuthState("ready");
      })
      .catch(() => setAuthState("signed-out"));
    return () => {
      cancelled = true;
    };
  }, [seedFromProfile]);

  function handleOnboardingComplete(profile: PlayerProfile) {
    seedFromProfile({
      rank: profile.rank,
      xp: profile.xp,
      completedMissions: profile.completedMissions,
    });
    setAuthState("ready");
  }

  if (authState === "loading") {
    return <div className="min-h-screen bg-[var(--void)]" />;
  }

  if (authState === "signed-out") {
    return <LandingPage />;
  }

  if (authState === "onboarding") {
    return <OnboardingForm email={email} onComplete={handleOnboardingComplete} />;
  }

  if (!ready) {
    return <div className="min-h-screen bg-[var(--void)]" />;
  }

  if (!booted) {
    return <BootSequence onDone={() => setBooted(true)} />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <StatusBar world={level001.world} />

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-6xl">
          <div className="console-card grid min-h-[560px] grid-cols-1 overflow-hidden md:grid-cols-2">
            <div
              className="border-b md:border-b-0 md:border-r"
              style={{ borderColor: "var(--console-line)" }}
            >
              <Dossier mission={level001} />
            </div>
            <SqlTerminal mission={level001} />
          </div>

          <p
            className="mt-6 text-center font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em]"
            style={{ color: "var(--text-lo)" }}
          >
            GLOBAL DATA ACADEMY // SECURE CONNECTION ESTABLISHED
          </p>
        </div>
      </main>

      <XpToast />
      <ProgressSync />
    </div>
  );
}