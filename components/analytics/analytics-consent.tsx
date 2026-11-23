"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
const CONSENT_KEY = "velnaro-analytics-consent";
type Consent = "unknown" | "granted" | "denied";

declare global {
  interface Window {
    dataLayer: IArguments[] | unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function validMeasurementId(value: string): boolean {
  return /^G-[A-Z0-9]+$/i.test(value);
}

export function AnalyticsConsent() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent>("unknown");
  const [loadAnalytics, setLoadAnalytics] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);

  const initializeAnalytics = useCallback(() => {
    if (!validMeasurementId(GA_ID) || loadAnalytics) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = (...args: unknown[]) => {
      window.dataLayer.push(args);
    };
    window.gtag("consent", "default", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });
    setLoadAnalytics(true);
  }, [loadAnalytics]);

  useEffect(() => {
    if (!validMeasurementId(GA_ID)) return;
    try {
      const saved = window.localStorage.getItem(CONSENT_KEY);
      if (saved === "granted") {
        setConsent("granted");
        initializeAnalytics();
      } else if (saved === "denied") {
        setConsent("denied");
      }
    } catch {
      setConsent("unknown");
    }
  }, [initializeAnalytics]);

  useEffect(() => {
    if (consent === "granted") initializeAnalytics();
  }, [consent, initializeAnalytics]);

  useEffect(() => {
    if (!scriptReady || consent !== "granted" || !pathname) return;
    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, consent, scriptReady]);

  const chooseConsent = (next: "granted" | "denied") => {
    try {
      window.localStorage.setItem(CONSENT_KEY, next);
    } catch {
      // If storage is unavailable, do not enable analytics without a saved choice.
      if (next === "granted") return;
    }
    setConsent(next);
    if (next === "granted") initializeAnalytics();
    else {
      setLoadAnalytics(false);
      setScriptReady(false);
    }
  };

  if (!validMeasurementId(GA_ID)) return null;

  return (
    <>
      {loadAnalytics && (
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
        />
      )}
      {consent === "unknown" ? (
        <aside
          aria-label="Analytics consent"
          className="fixed inset-x-4 bottom-4 z-[100] mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-slate/20 bg-ivory p-5 text-graphite shadow-2xl sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            VELNARO can use Google Analytics to understand aggregate website visits. Analytics stays off unless you choose to allow it. You can change this choice later in Privacy settings.
          </p>
          <div className="flex shrink-0 flex-wrap gap-2">
            <button type="button" onClick={() => chooseConsent("denied")} className="rounded-full border border-slate/30 px-4 py-2 text-sm font-semibold">Reject</button>
            <button type="button" onClick={() => chooseConsent("granted")} className="rounded-full bg-deep-teal px-4 py-2 text-sm font-semibold text-white">Allow analytics</button>
          </div>
        </aside>
      ) : (
        <button
          type="button"
          onClick={() => setConsent("unknown")}
          className="fixed bottom-3 left-3 z-[90] rounded-full border border-slate/20 bg-ivory/95 px-3 py-2 text-xs text-muted shadow-lg"
          aria-label="Open privacy settings"
        >
          Privacy settings
        </button>
      )}
    </>
  );
}
