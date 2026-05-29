import {
  createLocationPageMetadata,
  LocationServicePage,
} from "@/components/marketing/location-service-page";

export function generateMetadata() {
  return createLocationPageMetadata("treatmentInIndiaFromUzbekistan");
}

export default function TreatmentInIndiaFromUzbekistanPage() {
  return <LocationServicePage pageId="treatmentInIndiaFromUzbekistan" />;
}
