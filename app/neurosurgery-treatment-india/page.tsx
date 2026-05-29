import {
  TreatmentServicePage,
  createTreatmentPageMetadata,
} from "@/components/marketing/treatment-service-page";

export function generateMetadata() {
  return createTreatmentPageMetadata("neurosurgeryTreatmentIndia");
}

export default function NeurosurgeryTreatmentIndiaPage() {
  return <TreatmentServicePage pageId="neurosurgeryTreatmentIndia" />;
}
