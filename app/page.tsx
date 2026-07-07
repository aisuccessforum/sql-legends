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
import TicketDashboard from "@/components/game/TicketDashboard";
import ComingSoon from "@/components/game/ComingSoon";
import type { Mission } from "@/content/missions/level001";
import { useGameStore } from "@/store/useGameStore";
import { getProfile, type PlayerProfile } from "@/lib/api";

type AuthState = "loading" | "signed-out" | "onboarding" | "ready";
type View = "dashboard" | "mission" | "coming-soon";

export default function Home() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [email, setEmail] = useState("");
  const [booted, setBooted] = useState(false);
  const [view, setView] = useState<View>("dashboard");
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
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

  const hudWorld =
    view === "mission" && activeMission
      ? activeMission.world
      : view === "coming-soon"
        ? "Upcoming Modules"
        : "Ticket Dashboard";

  return (
    <div className="flex min-h-screen flex-col">
      <StatusBar world={hudWorld} />

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        {view === "dashboard" && (
          <TicketDashboard
            onSelectMission={(mission) => {
              setActiveMission(mission);
              setView("mission");
            }}
            onSelectComingSoon={() => setView("coming-soon")}
          />
        )}

        {view === "mission" && activeMission && (
          <div className="w-full max-w-6xl">
            <button onClick={() => setView("dashboard")} className="btn-chunky mb-5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Ticket Queue
            </button>

            <div className="console-card grid min-h-[560px] grid-cols-1 overflow-hidden md:grid-cols-2">
              <div
                className="border-b md:border-b-0 md:border-r"
                style={{ borderColor: "var(--console-line)" }}
              >
                <Dossier mission={activeMission} />
              </div>
              <SqlTerminal mission={activeMission} />
            </div>

            <p
              className="mt-6 text-center font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em]"
              style={{ color: "var(--text-lo)" }}
            >
              ASTRAMIND ANALYTICS // SECURE CONNECTION ESTABLISHED
            </p>
          </div>
        )}

        {view === "coming-soon" && (
          <ComingSoon onBack={() => setView("dashboard")} />
        )}
      </main>

      <XpToast />
      <ProgressSync />
    </div>
  );
}
