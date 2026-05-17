"use client";

import { usePathname } from "next/navigation";

import { MedicalTourismInquiryFunnel } from "@/components/forms/medical-tourism-funnel";

type RouteAwareMedicalTourismFormProps = {
  honeypotField: string;
  submitted?: boolean;
  hasError?: boolean;
};

export function RouteAwareMedicalTourismForm({
  honeypotField,
  submitted = false,
  hasError = false,
}: RouteAwareMedicalTourismFormProps) {
  const pathname = usePathname();

  return (
    <MedicalTourismInquiryFunnel
      redirectPath={pathname}
      honeypotField={honeypotField}
      submitted={submitted}
      hasError={hasError}
    />
  );
}
