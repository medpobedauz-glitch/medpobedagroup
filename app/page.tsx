import { PremiumHomePage } from "@/components/marketing/premium-homepage";
import { JsonLd } from "@/components/shared/json-ld";
import { env } from "@/lib/env";
import { createMetadata } from "@/lib/metadata";
import { createWebPageSchema } from "@/lib/schema";

const homeMetadata = createMetadata({
  title: "Medical Tourism & Healthcare Partnerships",
  description:
    "MedPobeda Group connects international patients, hospitals, and healthcare institutions through medical tourism coordination, hospital partnerships, student mobility, and India–Uzbekistan healthcare collaboration.",
  path: "/",
  keywords: [
    "medical tourism and healthcare partnerships",
    "international patient support Uzbekistan",
    "hospital collaboration India Uzbekistan",
    "student mobility healthcare",
    "international healthcare facilitation",
  ],
});

export const metadata = {
  ...homeMetadata,
  title: {
    absolute: "MedPobeda Group | Medical Tourism & Healthcare Partnerships",
  },
  openGraph: {
    ...homeMetadata.openGraph,
    title: "MedPobeda Group | Medical Tourism & Healthcare Partnerships",
    description:
      "MedPobeda Group connects international patients, hospitals, and healthcare institutions through medical tourism coordination, hospital partnerships, student mobility, and India–Uzbekistan healthcare collaboration.",
  },
  twitter: {
    ...homeMetadata.twitter,
    title: "MedPobeda Group | Medical Tourism & Healthcare Partnerships",
    description:
      "MedPobeda Group connects international patients, hospitals, and healthcare institutions through medical tourism coordination, hospital partnerships, student mobility, and India–Uzbekistan healthcare collaboration.",
  },
};

type HomePageProps = {
  searchParams?: {
    submitted?: string;
    error?: string;
  };
};

export default function HomePage({ searchParams }: HomePageProps) {
  const homeSchema = createWebPageSchema({
    name: "MedPobeda Group Home",
    description:
      "MedPobeda Group facilitates medical tourism, international patient support, hospital partnerships, student mobility, and healthcare collaboration between Uzbekistan, India, and global institutions.",
    path: "/",
  });

  return (
    <>
      <JsonLd data={homeSchema} />
      <PremiumHomePage
        honeypotField={env.SPAM_HONEYPOT_FIELD}
        submittedType={searchParams?.submitted}
        hasError={searchParams?.error === "validation"}
      />
    </>
  );
}
