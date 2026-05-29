import { env } from "@/lib/env";
import { MedicalTourismInquiryFunnel } from "@/components/forms/medical-tourism-funnel";

type MedicalTourismInquiryFormProps = {
  submitted?: boolean;
  hasError?: boolean;
};

export function MedicalTourismInquiryForm({
  submitted = false,
  hasError = false,
}: MedicalTourismInquiryFormProps) {
  return (
    <MedicalTourismInquiryFunnel
      redirectPath="/international-patient-care"
      honeypotField={env.SPAM_HONEYPOT_FIELD}
      submitted={submitted}
      hasError={hasError}
    />
  );
}
