"use client";

import { usePathname } from "next/navigation";

import { ContactInquiryFunnel } from "@/components/forms/contact-inquiry-funnel";

type RouteAwareContactInquiryFunnelProps = {
  variant: "general" | "partnership" | "international-patient" | "student-mobility";
  honeypotField: string;
  submittedType?: string;
  hasError?: boolean;
};

export function RouteAwareContactInquiryFunnel({
  variant,
  honeypotField,
  submittedType,
  hasError = false,
}: RouteAwareContactInquiryFunnelProps) {
  const pathname = usePathname();

  return (
    <ContactInquiryFunnel
      variant={variant}
      redirectPath={pathname}
      honeypotField={honeypotField}
      submittedType={submittedType}
      hasError={hasError}
    />
  );
}
