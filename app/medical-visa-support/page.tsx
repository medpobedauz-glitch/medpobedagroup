import {
  AuthorityServicePage,
  createAuthorityPageMetadata,
} from "@/components/marketing/authority-service-page";

export function generateMetadata() {
  return createAuthorityPageMetadata("medicalVisaSupport");
}

export default function MedicalVisaSupportPage() {
  return <AuthorityServicePage pageId="medicalVisaSupport" />;
}
