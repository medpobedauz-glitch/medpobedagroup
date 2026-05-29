"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { InquiryType, type InquiryType as InquiryTypeValue } from "@/lib/client-enums";

const SESSION_STORAGE_KEY = "medpobeda-analytics-session";
const SUCCESS_STORAGE_PREFIX = "medpobeda-success";

function getSessionId() {
  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
  if (existing) {
    return existing;
  }

  const next = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, next);
  return next;
}

function sendAnalyticsEvent(payload: {
  eventType: "PAGE_VIEW" | "FORM_SUCCESS";
  path: string;
  inquiryType?: InquiryTypeValue;
  metadata?: Record<string, unknown>;
}) {
  const body = JSON.stringify({
    ...payload,
    sessionId: getSessionId(),
  });

  if (navigator.sendBeacon) {
    const blob = new Blob([body], { type: "application/json" });
    navigator.sendBeacon("/api/analytics-events", blob);
    return;
  }

  void fetch("/api/analytics-events", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body,
    keepalive: true,
  });
}

function resolveInquiryType(pathname: string, submitted: string | null) {
  if (!submitted) {
    return undefined;
  }

  if (pathname === "/medical-tourism" || pathname === "/international-patient-care") {
    return InquiryType.MEDICAL_TOURISM;
  }
  if (pathname === "/hospital-partnerships") return InquiryType.PARTNERSHIP;
  if (pathname === "/student-mobility") return InquiryType.STUDENT_MOBILITY;
  if (pathname === "/international-patients") return InquiryType.INTERNATIONAL_PATIENT;
  if (pathname === "/contact") {
    if (submitted === InquiryType.PARTNERSHIP.toLowerCase()) {
      return InquiryType.PARTNERSHIP;
    }
    if (submitted === InquiryType.STUDENT_MOBILITY.toLowerCase()) {
      return InquiryType.STUDENT_MOBILITY;
    }
    if (submitted === InquiryType.INTERNATIONAL_PATIENT.toLowerCase()) {
      return InquiryType.INTERNATIONAL_PATIENT;
    }
    return InquiryType.CONTACT;
  }

  return undefined;
}

export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    sendAnalyticsEvent({
      eventType: "PAGE_VIEW",
      path: pathname,
    });
  }, [pathname]);

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin") || pathname.startsWith("/api")) {
      return;
    }

    const submitted = searchParams.get("submitted");
    const inquiryId = searchParams.get("id");
    if (!submitted || !inquiryId) {
      return;
    }

    const successKey = `${SUCCESS_STORAGE_PREFIX}:${pathname}:${submitted}:${inquiryId}`;
    if (window.sessionStorage.getItem(successKey)) {
      return;
    }

    const inquiryType = resolveInquiryType(pathname, submitted);
    sendAnalyticsEvent({
      eventType: "FORM_SUCCESS",
      path: pathname,
      inquiryType,
      metadata: {
        inquiryId,
      },
    });

    window.sessionStorage.setItem(successKey, "1");
  }, [pathname, searchParams]);

  return null;
}
