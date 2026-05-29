import {
  createLocationPageMetadata,
  LocationServicePage,
} from "@/components/marketing/location-service-page";

export function generateMetadata() {
  return createLocationPageMetadata("treatmentInIndiaFromKyrgyzstan");
}

export default function TreatmentInIndiaFromKyrgyzstanPage() {
  return <LocationServicePage pageId="treatmentInIndiaFromKyrgyzstan" />;
}
