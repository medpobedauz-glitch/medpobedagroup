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
    title: messages.routes["privacy-policy"].title,
    description: messages.routes["privacy-policy"].description,
    path: "/privacy-policy",
    locale,
    keywords: messages.routes["privacy-policy"].keywords,
    ogTitle: messages.routes["privacy-policy"].openGraphTitle,
    ogDescription: messages.routes["privacy-policy"].openGraphDescription,
  });
}

export default function PrivacyPolicyPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.privacyPolicy;
  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.schemaName,
            description: page.schemaDescription,
            path: "/privacy-policy",
            locale,
          }),
          createBreadcrumbSchema([
            { name: messages.chrome.navigation.home, path: "/" },
            { name: messages.routes["privacy-policy"].title, path: "/privacy-policy" },
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
