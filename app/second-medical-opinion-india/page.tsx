import {
  TreatmentServicePage,
  createTreatmentPageMetadata,
} from "@/components/marketing/treatment-service-page";

export function generateMetadata() {
  return createTreatmentPageMetadata("secondMedicalOpinionIndia");
}

export default function SecondMedicalOpinionIndiaPage() {
  return <TreatmentServicePage pageId="secondMedicalOpinionIndia" />;
}
