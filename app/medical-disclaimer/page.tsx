import { createMetadata } from "@/lib/metadata";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createBreadcrumbSchema, createWebPageSchema } from "@/lib/schema";
import { JsonLd } from "@/components/shared/json-ld";
import { PageHero } from "@/components/shared/page-hero";
import { Card } from "@/components/ui/card";

export function generateMetadata() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  return createMetadata({
    title: messages.routes["medical-disclaimer"].title,
    description: messages.routes["medical-disclaimer"].description,
    path: "/medical-disclaimer",
    locale,
    keywords: messages.routes["medical-disclaimer"].keywords,
    ogTitle: messages.routes["medical-disclaimer"].openGraphTitle,
    ogDescription: messages.routes["medical-disclaimer"].openGraphDescription,
  });
}

export default function MedicalDisclaimerPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.medicalDisclaimer;
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.schemaName,
            description: page.schemaDescription,
            path: "/medical-disclaimer",
            locale,
          }),
          createBreadcrumbSchema([
            { name: messages.chrome.navigation.home, path: "/" },
            { name: messages.routes["medical-disclaimer"].title, path: "/medical-disclaimer" },
          ], locale),
        ]}
      />
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        points={page.hero.points}
      />
      <section className="px-6 py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-5">
          {page.sections.map((section) => (
            <Card key={section.title} className="border-white/12 p-7">
              <h2 className="font-display text-2xl font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-300">{section.body}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
