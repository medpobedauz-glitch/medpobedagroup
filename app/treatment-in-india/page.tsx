import {
  AuthorityServicePage,
  createAuthorityPageMetadata,
} from "@/components/marketing/authority-service-page";

export function generateMetadata() {
  return createAuthorityPageMetadata("treatmentInIndia");
}

export default function TreatmentInIndiaPage() {
  return <AuthorityServicePage pageId="treatmentInIndia" />;
}
