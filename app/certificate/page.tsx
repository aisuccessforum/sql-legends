"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCertificate, type PublicCertificate } from "@/lib/api";

function programLabelForRank(rankName: string): string {
  if (rankName === "Intern") return "Data Analytics Internship Program";
  return `${rankName} Certification Program`;
}

export default function CertificatePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--void)]" />}>
      <CertificateContent />
    </Suspense>
  );
}

function CertificateContent() {
  const searchParams = useSearchParams();
  const number = searchParams.get("number");

  const [status, setStatus] = useState<"loading" | "found" | "not-found" | "no-number">(
    number ? "loading" : "no-number"
  );
  const [certificate, setCertificate] = useState<PublicCertificate | null>(null);

  useEffect(() => {
    if (!number) {
      setStatus("no-number");
      return;
    }
    let cancelled = false;
    getCertificate(number)
      .then((cert) => {
        if (cancelled) return;
        if (cert) {
          setCertificate(cert);
          setStatus("found");
        } else {
          setStatus("not-found");
        }
      })
      .catch(() => {
        if (!cancelled) setStatus("not-found");
      });
    return () => {
      cancelled = true;
    };
  }, [number]);

  if (status === "loading") {
    return <div className="min-h-screen bg-[var(--void)]" />;
  }

  if (status === "no-number" || status === "not-found") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
        <div className="console-card max-w-md px-8 py-10">
          <div
            className="mb-2 font-[family-name:var(--font-mono)] text-xs tracking-[0.16em]"
            style={{ color: "var(--danger)" }}
          >
            CERTIFICATE NOT FOUND
          </div>
          <p className="text-sm" style={{ color: "var(--text-lo)" }}>
            {status === "no-number"
              ? "This link is missing a certificate number."
              : "No certificate exists with this number. Double-check the link."}
          </p>
        </div>
      </div>
    );
  }

  return <CertificateDisplay certificate={certificate!} />;
}

const BINARY_RAIN = [
  { top: "4%", left: "10%", char: "1", op: 0.5 },
  { top: "10%", left: "28%", char: "0", op: 0.3 },
  { top: "16%", left: "6%", char: "0", op: 0.4 },
  { top: "22%", left: "34%", char: "1", op: 0.25 },
  { top: "27%", left: "16%", char: "1", op: 0.45 },
  { top: "33%", left: "30%", char: "0", op: 0.3 },
  { top: "40%", left: "8%", char: "0", op: 0.4 },
  { top: "46%", left: "24%", char: "1", op: 0.3 },
  { top: "6%", left: "20%", char: "0", op: 0.35 },
  { top: "50%", left: "12%", char: "1", op: 0.5 },
];

function CertificateDisplay({ certificate }: { certificate: PublicCertificate }) {
  const dateIssued = new Date(certificate.certifiedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const locationParts = [certificate.city, certificate.state, certificate.country].filter(
    Boolean
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <style>{`
        @media print {
          body { background: #ffffff !important; }
          .no-print { display: none !important; }
          .certificate-print { box-shadow: none !important; }
        }
        .cert-corner { position: absolute; width: 46px; height: 46px; pointer-events: none; }
      `}</style>

      <div className="w-full overflow-x-auto">
        <div
          className="certificate-print relative mx-auto min-w-[880px] max-w-4xl overflow-hidden rounded-2xl border-2 px-10 py-10 sm:px-14 sm:py-12"
          style={{
            borderColor: "var(--clearance)",
            background:
              "radial-gradient(ellipse 90% 70% at 15% 10%, rgba(124,140,248,0.10), transparent 55%), radial-gradient(ellipse 70% 60% at 90% 100%, rgba(67,242,160,0.08), transparent 55%), var(--void)",
            boxShadow: "0 40px 100px -30px rgba(124, 140, 248, 0.35)",
          }}
        >
          {/* Corner brackets */}
          <svg className="cert-corner left-3 top-3" viewBox="0 0 46 46" fill="none">
            <path d="M2 20V2H20" stroke="var(--dossier)" strokeWidth="2.5" />
          </svg>
          <svg className="cert-corner right-3 top-3" viewBox="0 0 46 46" fill="none">
            <path d="M44 20V2H26" stroke="var(--dossier)" strokeWidth="2.5" />
          </svg>
          <svg className="cert-corner bottom-3 left-3" viewBox="0 0 46 46" fill="none">
            <path d="M2 26V44H20" stroke="var(--clearance)" strokeWidth="2.5" />
          </svg>
          <svg className="cert-corner bottom-3 right-3" viewBox="0 0 46 46" fill="none">
            <path d="M44 26V44H26" stroke="var(--clearance)" strokeWidth="2.5" />
          </svg>

          {/* Achievement medallion */}
          <div className="absolute right-8 top-8 sm:right-12 sm:top-10">
            <svg width="92" height="92" viewBox="0 0 92 92">
              <defs>
                <radialGradient id="medallion" cx="50%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#f9d879" />
                  <stop offset="100%" stopColor="#c78a2e" />
                </radialGradient>
              </defs>
              <circle
                cx="46"
                cy="46"
                r="43"
                fill="none"
                stroke="#e8b94f"
                strokeWidth="2"
                strokeDasharray="4 3"
                opacity="0.8"
              />
              <circle cx="46" cy="46" r="36" fill="url(#medallion)" />
              <circle cx="46" cy="46" r="36" fill="none" stroke="#7a5416" strokeWidth="1.5" />
              <text
                x="46"
                y="38"
                textAnchor="middle"
                fontSize="11"
                fontWeight="700"
                fill="#2b1c04"
                fontFamily="var(--font-mono)"
              >
                SQL
              </text>
              <text
                x="46"
                y="58"
                textAnchor="middle"
                fontSize="12"
                fill="#3a2608"
              >
                {"\u2605\u2605\u2605\u2605\u2605"}
              </text>
            </svg>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row">
            {/* Left decorative panel */}
            <div className="relative hidden w-40 shrink-0 sm:block">
              {BINARY_RAIN.map((b, i) => (
                <span
                  key={i}
                  className="absolute font-[family-name:var(--font-mono)] text-xs"
                  style={{ top: b.top, left: b.left, color: "var(--clearance)", opacity: b.op }}
                >
                  {b.char}
                </span>
              ))}

              <div className="mt-24 flex flex-col items-center">
                <svg width="120" height="140" viewBox="0 0 120 140">
                  <defs>
                    <linearGradient id="cylTop" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#9fb4ff" />
                      <stop offset="100%" stopColor="#43f2a0" />
                    </linearGradient>
                    <linearGradient id="cylBody" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgba(124,140,248,0.35)" />
                      <stop offset="100%" stopColor="rgba(67,242,160,0.25)" />
                    </linearGradient>
                  </defs>
                  <rect x="15" y="30" width="90" height="60" fill="url(#cylBody)" stroke="var(--clearance)" strokeWidth="1.5" />
                  <ellipse cx="60" cy="30" rx="45" ry="14" fill="url(#cylTop)" stroke="var(--clearance)" strokeWidth="1.5" />
                  <ellipse cx="60" cy="90" rx="45" ry="14" fill="none" stroke="var(--terminal)" strokeWidth="1.5" />
                  <text
                    x="60"
                    y="65"
                    textAnchor="middle"
                    fontSize="18"
                    fontWeight="800"
                    fill="#ffffff"
                    fontFamily="var(--font-display)"
                  >
                    SQL
                  </text>
                  <ellipse cx="60" cy="112" rx="50" ry="8" fill="none" stroke="var(--clearance)" strokeWidth="1" opacity="0.5" />
                  <ellipse cx="60" cy="124" rx="58" ry="9" fill="none" stroke="var(--clearance)" strokeWidth="1" opacity="0.3" />
                </svg>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 text-center sm:text-left">
              <div
                className="mb-1 font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.3em]"
                style={{ color: "var(--clearance)" }}
              >
                ASTRAMIND ANALYTICS
              </div>
              <div
                className="mb-6 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em]"
                style={{ color: "var(--text-lo)" }}
              >
                TRANSFORMING DATA INTO DECISIONS USING ARTIFICIAL INTELLIGENCE
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold leading-none sm:text-5xl">
                CERTIFICATE
              </h1>
              <div
                className="mb-6 mt-1 font-[family-name:var(--font-mono)] text-sm tracking-[0.35em]"
                style={{ color: "var(--dossier)" }}
              >
                OF COMPLETION
              </div>

              <div
                className="mb-2 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em]"
                style={{ color: "var(--clearance)" }}
              >
                PROUDLY PRESENTED TO
              </div>
              <div className="mb-1 font-[family-name:var(--font-display)] text-3xl font-bold italic sm:text-4xl">
                {certificate.displayName ?? `Certified ${certificate.rankName}`}
              </div>
              {locationParts.length > 0 && (
                <p className="mb-6 text-sm" style={{ color: "var(--text-lo)" }}>
                  {locationParts.join(", ")}
                </p>
              )}

              <div
                className="mx-auto mb-6 h-px w-full sm:mx-0"
                style={{ background: "var(--console-line)" }}
              />

              <p className="mb-8 text-sm leading-relaxed sm:text-base">
                has successfully completed the AstraMind Analytics{" "}
                <strong style={{ color: "var(--dossier)" }}>
                  {programLabelForRank(certificate.rankName)}
                </strong>
                , demonstrating proficiency in SQL-based data analysis across
                real client scenarios, and is hereby recognized as a{" "}
                <strong style={{ color: "var(--dossier)" }}>
                  Certified {certificate.rankName}
                </strong>
                .
              </p>

              <div className="grid grid-cols-1 gap-6 border-t pt-6 sm:grid-cols-3" style={{ borderColor: "var(--console-line)" }}>
                <FooterItem
                  icon={<CalendarIcon />}
                  label="Date Issued"
                  value={dateIssued}
                />
                <FooterItem
                  icon={<BadgeIcon />}
                  label="Certificate Number"
                  value={certificate.certificateNumber}
                  mono
                  valueColor="var(--terminal)"
                />
                <FooterItem
                  icon={<CheckShieldIcon />}
                  label="Verified Certificate"
                  value="sql.aisuccessforum.online"
                  mono
                  valueColor="var(--clearance)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => window.print()} className="no-print btn-chunky mt-6">
        Print / Save as PDF
      </button>
    </div>
  );
}

function FooterItem({
  icon,
  label,
  value,
  mono,
  valueColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
  valueColor?: string;
}) {
  return (
    <div className="flex items-start justify-center gap-2.5 sm:justify-start">
      <div className="mt-0.5" style={{ color: "var(--clearance)" }}>
        {icon}
      </div>
      <div>
        <div
          className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.1em]"
          style={{ color: "var(--text-lo)" }}
        >
          {label.toUpperCase()}
        </div>
        <div
          className={
            mono
              ? "font-[family-name:var(--font-mono)] text-xs font-semibold tracking-[0.06em]"
              : "font-[family-name:var(--font-display)] text-sm font-semibold"
          }
          style={{ color: valueColor ?? "var(--text-hi)" }}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 15l-5.5 5 1.5-6.5L3 9l6.5-.5L12 3l2.5 5.5L21 9l-5 4.5 1.5 6.5z" />
    </svg>
  );
}

function CheckShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}
