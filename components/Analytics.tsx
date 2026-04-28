"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "consent";

export function Analytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const check = () => {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return setEnabled(false);
        const parsed = JSON.parse(raw) as { value?: string };
        setEnabled(parsed.value === "all");
      } catch {
        setEnabled(false);
      }
    };
    check();
    const onConsent = () => check();
    window.addEventListener("consent:all", onConsent);
    return () => window.removeEventListener("consent:all", onConsent);
  }, []);

  if (!enabled) return null;
  // Vercel Analytics placeholder — wire @vercel/analytics package after consent gating verified.
  return null;
}
