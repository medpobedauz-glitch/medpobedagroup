import {
  createLocationPageMetadata,
  LocationServicePage,
} from "@/components/marketing/location-service-page";

export function generateMetadata() {
  return createLocationPageMetadata("medicalTourismUzbekistan");
}

export default function MedicalTourismUzbekistanPage() {
  return <LocationServicePage pageId="medicalTourismUzbekistan" />;
}
