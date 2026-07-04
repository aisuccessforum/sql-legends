"use client";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div
        className="mb-6 font-[family-name:var(--font-mono)] text-xs tracking-[0.2em]"
        style={{ color: "var(--dossier)" }}
      >
        CLASSIFIED TRANSMISSION
      </div>

      <h1 className="mb-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl">
        You have been selected for admission into the Global Data Academy.
      </h1>

      <p
        className="mb-10 max-w-md text-sm sm:text-base"
        style={{ color: "var(--text-lo)" }}
      >
        Your training begins the moment you confirm your identity.
        Rank assigned: Intern. No further explanation.
      </p>

      <a
        href="/api/auth/google/start"
        className="rounded-md px-6 py-3 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
        style={{ background: "var(--terminal)", color: "var(--void)" }}
      >
        Continue with Google
      </a>

      <p
        className="mt-6 max-w-xs font-[family-name:var(--font-mono)] text-[11px]"
        style={{ color: "var(--text-lo)" }}
      >
        Used only to confirm your identity and save your career progress.
      </p>
    </div>
  );
}