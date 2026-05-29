import {
  createLocationPageMetadata,
  LocationServicePage,
} from "@/components/marketing/location-service-page";

export function generateMetadata() {
  return createLocationPageMetadata("treatmentInIndiaFromKazakhstan");
}

export default function TreatmentInIndiaFromKazakhstanPage() {
  return <LocationServicePage pageId="treatmentInIndiaFromKazakhstan" />;
}
