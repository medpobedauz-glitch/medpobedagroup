import {
  AuthorityServicePage,
  createAuthorityPageMetadata,
} from "@/components/marketing/authority-service-page";

export function generateMetadata() {
  return createAuthorityPageMetadata("kimsHospitalsIndia");
}

export default function KimsHospitalsIndiaPage() {
  return <AuthorityServicePage pageId="kimsHospitalsIndia" />;
}
