import {
  AuthorityServicePage,
  createAuthorityPageMetadata,
} from "@/components/marketing/authority-service-page";

export function generateMetadata() {
  return createAuthorityPageMetadata("airAmbulanceCoordination");
}

export default function AirAmbulanceCoordinationPage() {
  return <AuthorityServicePage pageId="airAmbulanceCoordination" />;
}
