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
import CareerHub from "@/components/game/CareerHub";
import StudyHub from "@/components/study/StudyHub";
import ModuleDetail from "@/components/study/ModuleDetail";
import { allRankStudy, type StudyModule } from "@/content/study/studyData";
import type { Mission } from "@/content/missions/level001";
import { missions } from "@/content/missions";
import { juniorMissions } from "@/content/junior-missions";
import { dataAnalystMissions } from "@/content/data-analyst-missions";
import { seniorAnalystMissions } from "@/content/senior-analyst-missions";
import { biDeveloperMissions } from "@/content/bi-developer-missions";
import { analyticsEngineerMissions } from "@/content/analytics-engineer-missions";
import { dataEngineerMissions } from "@/content/data-engineer-missions";
import { staffAnalystMissions } from "@/content/staff-analyst-missions";
import { useGameStore } from "@/store/useGameStore";
import { getProfile, type PlayerProfile } from "@/lib/api";

type AuthState = "loading" | "signed-out" | "onboarding" | "ready";
type View = "hub" | "study" | "module" | "dashboard" | "mission" | "coming-soon";

export default function Home() {
  const [authState, setAuthState] = useState<AuthState>("loading");
  const [email, setEmail] = useState("");
  const [booted, setBooted] = useState(false);
  const [view, setView] = useState<View>("hub");
  const [activeMission, setActiveMission] = useState<Mission | null>(null);
  const [studyRank, setStudyRank] = useState<string>("");
  const [studyModule, setStudyModule] = useState<StudyModule | null>(null);
  const [missionFilter, setMissionFilter] = useState<{ start: number; end: number } | null>(null);

  const seedFromProfile = useGameStore((s) => s.seedFromProfile);
  const ready = useGameStore((s) => s.ready);
  const completedMissions = useGameStore((s) => s.completedMissions);
  const rank = useGameStore((s) => s.rank);

  useEffect(() => {
    let cancelled = false;
    getProfile()
      .then((profile) => {
        if (cancelled) return;
        if (!profile) { setAuthState("signed-out"); return; }
        setEmail(profile.email);
        if (!profile.onboardingComplete) { setAuthState("onboarding"); return; }
        seedFromProfile({
          rank: profile.rank, xp: profile.xp,
          completedMissions: profile.completedMissions,
          certificateNumber: profile.certificateNumber,
          certifiedAt: profile.certifiedAt,
          certificates: profile.certificates,
        });
        setAuthState("ready");
      })
      .catch(() => setAuthState("signed-out"));
    return () => { cancelled = true; };
  }, [seedFromProfile]);

  function handleOnboardingComplete(profile: PlayerProfile) {
    seedFromProfile({
      rank: profile.rank, xp: profile.xp,
      completedMissions: profile.completedMissions,
      certificateNumber: profile.certificateNumber,
      certifiedAt: profile.certifiedAt,
      certificates: profile.certificates,
    });
    setAuthState("ready");
  }

  if (authState === "loading") return <div className="min-h-screen bg-[var(--void)]" />;
  if (authState === "signed-out") return <LandingPage />;
  if (authState === "onboarding") return <OnboardingForm email={email} onComplete={handleOnboardingComplete} />;
  if (!ready) return <div className="min-h-screen bg-[var(--void)]" />;
  if (!booted) return <BootSequence onDone={() => setBooted(true)} />;

  const hudWorld =
    view === "mission" && activeMission ? activeMission.world
    : view === "coming-soon" ? "Upcoming Modules"
    : view === "hub" ? "Career Hub"
    : view === "study" ? `Study — ${studyRank}`
    : view === "module" && studyModule ? studyModule.title
    : "Ticket Dashboard";

  const currentRankStudy = allRankStudy.find((r) => r.rank === rank);

  return (
    <div className="flex min-h-screen flex-col">
      <StatusBar world={hudWorld} />

      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">

        {/* ── Career Hub ── */}
        {view === "hub" && (
          <CareerHub
            onEnterRank={() => { setMissionFilter(null); setView("dashboard"); }}
            onStudyRank={(r) => { setStudyRank(r); setView("study"); }}
          />
        )}

        {/* ── Study Hub ── */}
        {view === "study" && (
          <StudyHub
            rank={studyRank}
            onSelectModule={(mod) => { setStudyModule(mod); setView("module"); }}
            onBack={() => setView("hub")}
            onEnterTickets={() => { setMissionFilter(null); setView("dashboard"); }}
          />
        )}

        {/* ── Module Detail ── */}
        {view === "module" && studyModule && (
          <ModuleDetail
            mod={studyModule}
            rankName={studyRank}
            totalModules={currentRankStudy?.modules.length ?? 7}
            onBack={() => setView("study")}
            onPractice={(start, end) => {
              setMissionFilter({ start, end });
              setView("dashboard");
            }}
          />
        )}

        {/* ── Ticket Dashboard ── */}
        {view === "dashboard" && (
          <TicketDashboard
            missionFilter={missionFilter}
            onSelectMission={(mission) => { setActiveMission(mission); setView("mission"); }}
            onSelectComingSoon={() => setView("coming-soon")}
            onBack={() => setView("hub")}
          />
        )}

        {/* ── Mission / SQL Terminal ── */}
        {view === "mission" && activeMission && (
          <div className="w-full max-w-6xl">
            {(() => {
              const isDone = completedMissions.includes(activeMission.id);
              const allTracks = [
                missions, juniorMissions, dataAnalystMissions, seniorAnalystMissions,
                biDeveloperMissions, analyticsEngineerMissions, dataEngineerMissions, staffAnalystMissions,
              ];
              const track = allTracks.find((t) => t.some((m) => m.id === activeMission.id)) ?? missions;
              const activeIndex = track.findIndex((m) => m.id === activeMission.id);
              const nextMission = activeIndex >= 0 && activeIndex < track.length - 1 ? track[activeIndex + 1] : null;
              const isFilteredLast = missionFilter && activeIndex === missionFilter.end;

              return (
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <button onClick={() => setView("dashboard")} className="btn-chunky">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Ticket Queue
                  </button>

                  {isDone && nextMission && !isFilteredLast && (
                    <button
                      onClick={() => setActiveMission(nextMission)}
                      className="btn-chunky"
                    >
                      Next Ticket
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  )}
                </div>
              );
            })()}

            <ProgressSync />
            <XpToast />
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.6fr]">
              <Dossier mission={activeMission} />
              <SqlTerminal mission={activeMission} />
            </div>
          </div>
        )}

        {/* ── Coming Soon ── */}
        {view === "coming-soon" && (
          <div>
            <button onClick={() => setView("dashboard")} className="btn-chunky mb-5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Ticket Queue
            </button>
            <ComingSoon />
          </div>
        )}
      </main>
    </div>
  );
}
