import {
  AuthorityServicePage,
  createAuthorityPageMetadata,
} from "@/components/marketing/authority-service-page";

export function generateMetadata() {
  return createAuthorityPageMetadata("secondMedicalOpinion");
}

export default function SecondMedicalOpinionPage() {
  return <AuthorityServicePage pageId="secondMedicalOpinion" />;
}
