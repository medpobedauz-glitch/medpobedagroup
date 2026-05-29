import {
  AuthorityServicePage,
  createAuthorityPageMetadata,
} from "@/components/marketing/authority-service-page";

export function generateMetadata() {
  return createAuthorityPageMetadata("organTransplantCoordination");
}

export default function OrganTransplantCoordinationPage() {
  return <AuthorityServicePage pageId="organTransplantCoordination" />;
}
