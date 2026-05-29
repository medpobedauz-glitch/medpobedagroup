import {
  TreatmentServicePage,
  createTreatmentPageMetadata,
} from "@/components/marketing/treatment-service-page";

export function generateMetadata() {
  return createTreatmentPageMetadata("oncologyTreatmentIndia");
}

export default function OncologyTreatmentIndiaPage() {
  return <TreatmentServicePage pageId="oncologyTreatmentIndia" />;
}
