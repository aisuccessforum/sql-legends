"use client";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div
        className="mb-3 font-[family-name:var(--font-display)] text-sm font-semibold tracking-[0.3em]"
        style={{ color: "var(--clearance)" }}
      >
        ASTRAMIND ANALYTICS
      </div>
      <div
        className="mb-8 font-[family-name:var(--font-mono)] text-xs tracking-[0.14em]"
        style={{ color: "var(--text-lo)" }}
      >
        TRANSFORMING DATA INTO DECISIONS USING ARTIFICIAL INTELLIGENCE
      </div>

      <h1 className="mb-4 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold sm:text-4xl">
        Before AI touches a client&apos;s data, someone has to understand it.
      </h1>

      <p
        className="mb-4 max-w-md text-sm sm:text-base"
        style={{ color: "var(--text-lo)" }}
      >
        You&apos;ve been hired as an Intern. No one trusts interns with AI yet —
        your job is to manually verify and query client data, one ticket
        at a time, until your Team Lead trusts you with more.
      </p>

      <p
        className="mb-10 max-w-md text-sm sm:text-base"
        style={{ color: "var(--text-lo)" }}
      >
        No dashboards. No AI shortcuts. Just SQL, real client requests, and
        a performance review waiting at the end of the internship.
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
