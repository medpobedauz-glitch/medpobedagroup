import { Metadata } from "next";
import { TeamPageContent } from "@/components/pages/team-page";
import { JsonLd } from "@/components/shared/json-ld";
import { createMetadata } from "@/lib/metadata";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";

export function generateMetadata(): Metadata {
  return createMetadata({
    title: "Our Team | MedPobeda Group | Medical Tourism Experts",
    description:
      "Meet the MedPobeda Group team — experienced medical coordinators, patient advisors, and international healthcare specialists serving Central Asia.",
    path: "/team",
    keywords: [
      "MedPobeda team",
      "medical tourism team",
      "patient coordinators",
      "healthcare specialists Central Asia",
    ],
  });
}

export default function TeamPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Our Team", path: "/team" },
  ]);

  const pageSchema = createWebPageSchema({
    name: "Our Team",
    description: "Meet the dedicated team behind MedPobeda Group's medical tourism services.",
    path: "/team",
    type: "AboutPage",
  });

  return (
    <>
      <JsonLd data={[breadcrumbSchema, pageSchema]} />
      <TeamPageContent />
    </>
  );
}