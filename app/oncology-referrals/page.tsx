import {
  AuthorityServicePage,
  createAuthorityPageMetadata,
} from "@/components/marketing/authority-service-page";

export function generateMetadata() {
  return createAuthorityPageMetadata("oncologyReferrals");
}

export default function OncologyReferralsPage() {
  return <AuthorityServicePage pageId="oncologyReferrals" />;
}
