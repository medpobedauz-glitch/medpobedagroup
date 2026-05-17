import { env } from "@/lib/env";
import { ContactInquiryFunnel } from "@/components/forms/contact-inquiry-funnel";

type ContactFormProps = {
  submittedType?: string;
  hasError?: boolean;
};

export function ContactForm({ submittedType, hasError = false }: ContactFormProps) {
  return (
    <ContactInquiryFunnel
      variant="general"
      redirectPath="/contact"
      honeypotField={env.SPAM_HONEYPOT_FIELD}
      submittedType={submittedType}
      hasError={hasError}
    />
  );
}
