import {
  AuthorityServicePage,
  createAuthorityPageMetadata,
} from "@/components/marketing/authority-service-page";

export function generateMetadata() {
  return createAuthorityPageMetadata("cardiologyReferrals");
}

export default function CardiologyReferralsPage() {
  return <AuthorityServicePage pageId="cardiologyReferrals" />;
}
