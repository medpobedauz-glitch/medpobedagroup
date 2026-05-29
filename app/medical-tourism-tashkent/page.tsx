import {
  createLocationPageMetadata,
  LocationServicePage,
} from "@/components/marketing/location-service-page";

export function generateMetadata() {
  return createLocationPageMetadata("medicalTourismTashkent");
}

export default function MedicalTourismTashkentPage() {
  return <LocationServicePage pageId="medicalTourismTashkent" />;
}
