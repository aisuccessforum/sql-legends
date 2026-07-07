"use client";

export default function ComingSoon({ onBack }: { onBack?: () => void }) {
  return (
    <div className="w-full max-w-md px-6 text-center">
      <div className="console-card px-8 py-10">
        <MascotSVG />

        <div
          className="mb-2 mt-6 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.18em]"
          style={{ color: "var(--dossier)" }}
        >
          NEXT ASSIGNMENT IN PROGRESS
        </div>
        <h1 className="mb-3 font-[family-name:var(--font-display)] text-xl font-semibold sm:text-2xl">
          Your Team Lead is preparing the next client.
        </h1>
        <p className="mb-8 text-sm" style={{ color: "var(--text-lo)" }}>
          This ticket queue hasn&apos;t opened yet. Come back soon — the next
          engagement is being finalized.
        </p>

        {onBack && (
          <button
            onClick={onBack}
            className="rounded-md px-5 py-2.5 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide transition-opacity hover:opacity-90"
            style={{ background: "var(--terminal)", color: "var(--void)" }}
          >
            Back to my desk
          </button>
        )}
      </div>
    </div>
  );
}

function MascotSVG() {
  return (
    <div className="relative mx-auto flex h-40 w-40 items-center justify-center">
      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float-gear {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-6px) rotate(20deg); opacity: 1; }
        }
        .mascot-bob { animation: bob 3s ease-in-out infinite; transform-origin: center; }
        .mascot-eye { animation: blink 4s ease-in-out infinite; transform-origin: center; }
        .mascot-gear-1 { animation: float-gear 2.6s ease-in-out infinite; transform-origin: center; }
        .mascot-gear-2 { animation: float-gear 3.2s ease-in-out infinite 0.4s; transform-origin: center; }
        .mascot-spin { animation: spin-slow 6s linear infinite; transform-origin: 100px 60px; }
        @media (prefers-reduced-motion: reduce) {
          .mascot-bob, .mascot-eye, .mascot-gear-1, .mascot-gear-2, .mascot-spin {
            animation: none;
          }
        }
      `}</style>

      <svg viewBox="0 0 200 200" width="160" height="160">
        {/* floating gears */}
        <g className="mascot-gear-1">
          <circle cx="38" cy="60" r="10" fill="none" stroke="var(--clearance)" strokeWidth="3" />
          <circle cx="38" cy="60" r="3" fill="var(--clearance)" />
        </g>
        <g className="mascot-gear-2">
          <circle cx="164" cy="48" r="7" fill="none" stroke="var(--dossier)" strokeWidth="3" />
          <circle cx="164" cy="48" r="2.5" fill="var(--dossier)" />
        </g>

        {/* robot body, bobbing gently */}
        <g className="mascot-bob">
          {/* antenna */}
          <line x1="100" y1="38" x2="100" y2="20" stroke="var(--text-lo)" strokeWidth="3" />
          <circle className="mascot-spin" cx="100" cy="16" r="5" fill="var(--terminal)" />

          {/* head */}
          <rect x="62" y="38" width="76" height="58" rx="18" fill="var(--console-raised)" stroke="var(--console-line)" strokeWidth="2" />

          {/* eyes */}
          <g className="mascot-eye">
            <rect x="80" y="60" width="10" height="14" rx="5" fill="var(--terminal)" />
            <rect x="110" y="60" width="10" height="14" rx="5" fill="var(--terminal)" />
          </g>

          {/* body */}
          <rect x="70" y="100" width="60" height="50" rx="14" fill="var(--console)" stroke="var(--console-line)" strokeWidth="2" />

          {/* clipboard in "hand" */}
          <rect x="118" y="108" width="26" height="32" rx="4" fill="var(--dossier)" opacity="0.9" />
          <rect x="123" y="114" width="16" height="3" rx="1.5" fill="var(--void)" opacity="0.6" />
          <rect x="123" y="120" width="16" height="3" rx="1.5" fill="var(--void)" opacity="0.6" />
          <rect x="123" y="126" width="10" height="3" rx="1.5" fill="var(--void)" opacity="0.6" />

          {/* arm holding clipboard */}
          <rect x="108" y="108" width="14" height="10" rx="5" fill="var(--console-raised)" stroke="var(--console-line)" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}
