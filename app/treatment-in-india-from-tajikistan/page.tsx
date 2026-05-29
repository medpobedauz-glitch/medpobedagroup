import {
  createLocationPageMetadata,
  LocationServicePage,
} from "@/components/marketing/location-service-page";

export function generateMetadata() {
  return createLocationPageMetadata("treatmentInIndiaFromTajikistan");
}

export default function TreatmentInIndiaFromTajikistanPage() {
  return <LocationServicePage pageId="treatmentInIndiaFromTajikistan" />;
}
