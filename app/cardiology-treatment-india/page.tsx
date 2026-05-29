import {
  TreatmentServicePage,
  createTreatmentPageMetadata,
} from "@/components/marketing/treatment-service-page";

export function generateMetadata() {
  return createTreatmentPageMetadata("cardiologyTreatmentIndia");
}

export default function CardiologyTreatmentIndiaPage() {
  return <TreatmentServicePage pageId="cardiologyTreatmentIndia" />;
}
