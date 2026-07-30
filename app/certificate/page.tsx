"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCertificate, type PublicCertificate } from "@/lib/api";

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
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <style>{`
        @media print {
          body { background: #ffffff !important; }
          .no-print { display: none !important; }
          .certificate-print {
            background: #ffffff !important;
            color: #0a0d14 !important;
            border-color: #0a0d14 !important;
            box-shadow: none !important;
          }
          .certificate-print * {
            color: #0a0d14 !important;
          }
        }
      `}</style>

      <div
        className="certificate-print console-card w-full max-w-2xl px-8 py-12 text-center sm:px-14 sm:py-16"
        style={{ borderColor: "var(--dossier)", borderWidth: 2 }}
      >
        <div
          className="mb-1 font-[family-name:var(--font-display)] text-sm font-bold tracking-[0.3em]"
          style={{ color: "var(--clearance)" }}
        >
          ASTRAMIND ANALYTICS
        </div>
        <div
          className="mb-8 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.14em]"
          style={{ color: "var(--text-lo)" }}
        >
          TRANSFORMING DATA INTO DECISIONS USING ARTIFICIAL INTELLIGENCE
        </div>

        <div
          className="mb-3 font-[family-name:var(--font-mono)] text-xs tracking-[0.2em]"
          style={{ color: "var(--dossier)" }}
        >
          CERTIFICATE OF COMPLETION
        </div>

        <h1 className="mb-2 font-[family-name:var(--font-display)] text-3xl font-bold sm:text-4xl">
          {certificate.displayName ?? "Certified Intern"}
        </h1>

        {locationParts.length > 0 && (
          <p className="mb-6 text-sm" style={{ color: "var(--text-lo)" }}>
            {locationParts.join(", ")}
          </p>
        )}

        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed sm:text-base">
          has successfully completed the AstraMind Analytics{" "}
          <strong>Data Analytics Internship Program</strong>, demonstrating
          proficiency in SQL-based data analysis across real client scenarios,
          and is hereby recognized as a{" "}
          <strong>Certified Intern</strong>.
        </p>

        <div
          className="mx-auto mb-8 h-px w-24"
          style={{ background: "var(--console-line)" }}
        />

        <div className="mb-1 font-[family-name:var(--font-mono)] text-xs" style={{ color: "var(--text-lo)" }}>
          Date Issued
        </div>
        <div className="mb-6 font-[family-name:var(--font-display)] text-base font-semibold">
          {dateIssued}
        </div>

        <div className="font-[family-name:var(--font-mono)] text-xs" style={{ color: "var(--text-lo)" }}>
          Certificate Number
        </div>
        <div
          className="mb-2 font-[family-name:var(--font-mono)] text-sm font-semibold tracking-[0.15em]"
          style={{ color: "var(--terminal)" }}
        >
          {certificate.certificateNumber}
        </div>
      </div>

      <button
        onClick={() => window.print()}
        className="no-print btn-chunky mt-6"
      >
        Print / Save as PDF
      </button>
    </div>
  );
}
