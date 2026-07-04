"use client";

import { useState } from "react";
import { submitOnboarding, type OnboardingFields, type PlayerProfile } from "@/lib/api";

interface Props {
  email: string;
  onComplete: (profile: PlayerProfile) => void;
}

const fieldLabels: Record<keyof OnboardingFields, string> = {
  displayName: "Display name",
  birthDate: "Birth date",
  country: "Country",
  state: "State / Province",
  city: "City",
};

export default function OnboardingForm({ email, onComplete }: Props) {
  const [fields, setFields] = useState<OnboardingFields>({
    displayName: "",
    birthDate: "",
    country: "",
    state: "",
    city: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof OnboardingFields>(key: K, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const profile = await submitOnboarding(fields);
      onComplete(profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg border p-6 sm:p-8"
        style={{ borderColor: "var(--console-line)", background: "var(--console)" }}
      >
        <div
          className="mb-1 font-[family-name:var(--font-mono)] text-[11px] tracking-[0.16em]"
          style={{ color: "var(--dossier)" }}
        >
          CLEARANCE INTAKE FORM
        </div>
        <h1 className="mb-1 font-[family-name:var(--font-display)] text-xl font-semibold">
          Confirm your identity
        </h1>
        <p className="mb-6 text-xs" style={{ color: "var(--text-lo)" }}>
          Signed in as {email}
        </p>

        <div className="space-y-4">
          <Field
            label={fieldLabels.displayName}
            type="text"
            value={fields.displayName}
            onChange={(v) => update("displayName", v)}
            required
          />
          <Field
            label={fieldLabels.birthDate}
            type="date"
            value={fields.birthDate}
            onChange={(v) => update("birthDate", v)}
            required
          />
          <Field
            label={fieldLabels.country}
            type="text"
            value={fields.country}
            onChange={(v) => update("country", v)}
            required
          />
          <Field
            label={fieldLabels.state}
            type="text"
            value={fields.state}
            onChange={(v) => update("state", v)}
            required
          />
          <Field
            label={fieldLabels.city}
            type="text"
            value={fields.city}
            onChange={(v) => update("city", v)}
            required
          />
        </div>

        {error && (
          <p
            className="mt-4 font-[family-name:var(--font-mono)] text-xs"
            style={{ color: "var(--danger)" }}
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="mt-6 w-full rounded-md px-4 py-2.5 font-[family-name:var(--font-display)] text-sm font-semibold tracking-wide transition-opacity hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--terminal)", color: "var(--void)" }}
        >
          {submitting ? "CONFIRMING..." : "CONFIRM IDENTITY"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span
        className="mb-1 block font-[family-name:var(--font-mono)] text-[11px] tracking-[0.1em]"
        style={{ color: "var(--text-lo)" }}
      >
        {label.toUpperCase()}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border px-3 py-2 text-sm outline-none"
        style={{
          borderColor: "var(--console-line)",
          background: "var(--console-raised)",
          color: "var(--text-hi)",
        }}
      />
    </label>
  );
}