"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type DiseaseAnalyticsLinkProps = {
  href: string;
  diseaseSlug: string;
  event:
    | "treatment_click"
    | "hospital_referral"
    | "doctor_profile_visit"
    | "cost_calculator_visit"
    | "consultation_lead";
  target?: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  external?: boolean;
};

function getSessionId() {
  const key = "medpobeda-analytics-session";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;

  const next = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  window.sessionStorage.setItem(key, next);
  return next;
}

function trackDiseaseClick({
  diseaseSlug,
  event,
  target,
}: Pick<DiseaseAnalyticsLinkProps, "diseaseSlug" | "event" | "target">) {
  const body = JSON.stringify({
    eventType: "CTA_CLICK",
    path: window.location.pathname,
    sessionId: getSessionId(),
    metadata: {
      contentType: "disease",
      diseaseSlug,
      diseaseEvent: event,
      target,
    },
  });

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      "/api/analytics-events",
      new Blob([body], { type: "application/json" }),
    );
    return;
  }

  void fetch("/api/analytics-events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    keepalive: true,
  });
}

export function DiseaseAnalyticsLink({
  href,
  diseaseSlug,
  event,
  target,
  children,
  className,
  ariaLabel,
  external = false,
}: DiseaseAnalyticsLinkProps) {
  const onClick = () => trackDiseaseClick({ diseaseSlug, event, target });

  if (external) {
    const opensNewWindow = /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        target={opensNewWindow ? "_blank" : undefined}
        rel={opensNewWindow ? "noreferrer" : undefined}
        className={className}
        aria-label={ariaLabel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
