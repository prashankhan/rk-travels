"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { track, type AnalyticsEvent } from "@/lib/analytics";

const STORAGE_KEY = "rk-analytics-consent";
type Choice = "granted" | "denied";

function readChoice(): Choice | null {
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function saveChoice(choice: Choice) {
  try {
    window.localStorage.setItem(STORAGE_KEY, choice);
  } catch {
    /* storage unavailable: the choice applies to this visit only */
  }
}

const noopSubscribe = () => () => {};
const TRACKED = new Set<AnalyticsEvent>(["whatsapp_click", "phone_click"]);

/**
 * GA4 with Consent Mode v2. Nothing loads unless NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 * Analytics storage stays denied until the visitor accepts.
 */
export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const stored = useSyncExternalStore(noopSubscribe, readChoice, () => "pending" as const);
  const [decided, setDecided] = useState<Choice | null>(null);
  const choice = decided ?? (stored === "pending" ? null : stored);
  const ready = stored !== "pending";

  // Click events for WhatsApp and phone links, wherever they are on the page.
  useEffect(() => {
    if (!measurementId) return;
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      const name = el?.getAttribute("data-track") as AnalyticsEvent | null;
      if (name && TRACKED.has(name)) track(name, { link_url: el?.getAttribute("href") ?? undefined, page_path: window.location.pathname });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, [measurementId]);

  if (!measurementId) return null;

  function decide(next: Choice) {
    saveChoice(next);
    setDecided(next);
    updateConsent(next);
  }

  return (
    <>
      <Script id="ga-consent-default" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c='denied';try{if(localStorage.getItem(${JSON.stringify(STORAGE_KEY)})==='granted')c='granted'}catch(e){}
gtag('consent','default',{analytics_storage:c,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500});
gtag('js',new Date());gtag('config',${JSON.stringify(measurementId)},{anonymize_ip:true});`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`} strategy="afterInteractive" />
      {ready && choice === null ? (
        <div role="region" aria-label="Analytics preferences" className="fixed inset-x-4 bottom-20 z-40 max-w-[440px] rounded-menu border border-border bg-white p-5 shadow-menu md:right-auto md:bottom-5 md:left-5">
          <p className="font-heading text-[15px] leading-[22px] font-semibold text-navy">Help us improve this site</p>
          <p className="mt-1 text-sm leading-[22px] text-charcoal">
            May we use analytics cookies to understand how visitors use the site? You can change this at any time by clearing your browser data.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button size="sm" onClick={() => decide("granted")}>Accept analytics</Button>
            <Button size="sm" variant="outline" onClick={() => decide("denied")}>Decline</Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

function updateConsent(choice: Choice) {
  const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
  w.dataLayer = w.dataLayer || [];
  if (!w.gtag) {
    // Same shape as the official snippet, so calls queue until gtag.js loads.
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
  }
  w.gtag("consent", "update", { analytics_storage: choice, ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied" });
}
