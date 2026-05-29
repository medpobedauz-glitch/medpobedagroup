import {
  TreatmentServicePage,
  createTreatmentPageMetadata,
} from "@/components/marketing/treatment-service-page";

export function generateMetadata() {
  return createTreatmentPageMetadata("orthopedicTreatmentIndia");
}

export default function OrthopedicTreatmentIndiaPage() {
  return <TreatmentServicePage pageId="orthopedicTreatmentIndia" />;
}
