import {
  TreatmentServicePage,
  createTreatmentPageMetadata,
} from "@/components/marketing/treatment-service-page";

export function generateMetadata() {
  return createTreatmentPageMetadata("organTransplantIndia");
}

export default function OrganTransplantIndiaPage() {
  return <TreatmentServicePage pageId="organTransplantIndia" />;
}
