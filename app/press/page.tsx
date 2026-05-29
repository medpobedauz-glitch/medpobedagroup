import {
  Building2,
  FileText,
  Globe2,
  Handshake,
  Mail,
  Megaphone,
  Newspaper,
  ShieldCheck,
} from "lucide-react";

import { BlogCard } from "@/components/blog/blog-card";
import { PremiumCard } from "@/components/marketing/premium-card";
import { PremiumCtaBanner } from "@/components/marketing/premium-cta-banner";
import {
  PremiumFeatureCardsSection,
  type PremiumFeatureCardItem,
} from "@/components/marketing/premium-feature-cards-section";
import { PremiumImageStorySection } from "@/components/marketing/premium-image-story-section";
import { PremiumPageHero } from "@/components/marketing/premium-page-hero";
import { PremiumSplitTrustSection } from "@/components/marketing/premium-split-trust-section";
import { SectionHeader } from "@/components/marketing/section-header";
import { PublicLink } from "@/components/shared/public-link";
import { FAQAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { getPublishedBlogPosts } from "@/lib/data/blog";
import { getMessages } from "@/lib/i18n";
import { getRequestLocale } from "@/lib/i18n/request";
import { createMetadata } from "@/lib/metadata";
import { createPremiumVisual } from "@/lib/premium-visuals";
import { createBreadcrumbSchema, createFaqSchema, createWebPageSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export function generateMetadata() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  return createMetadata({
    title: messages.routes.press.title,
    description: messages.routes.press.description,
    path: "/press",
    locale,
    keywords: messages.routes.press.keywords,
    ogTitle: messages.routes.press.openGraphTitle,
    ogDescription: messages.routes.press.openGraphDescription,
  });
}

export default async function PressPage() {
  const locale = getRequestLocale();
  const messages = getMessages(locale);
  const page = messages.pages.press;
  const latestPosts = (await getPublishedBlogPosts()).slice(0, 3);

  const resourceItems: PremiumFeatureCardItem[] = page.resources.items.map((item, index) => ({
    ...item,
    href: [
      "/company-profile",
      "/about",
      "/kims-hospitals-india",
      "/hospital-partnerships",
      "/blog",
      "/contact",
    ][index],
    icon: [Building2, Globe2, Handshake, ShieldCheck, Newspaper, Mail][index] ?? Building2,
    image: createPremiumVisual(
      "gallery",
      [
        "uzbekistan-healthcare-bridge",
        "hospital-lobby",
        "india-specialist-access",
        "executive-partnership-meeting",
        "conference-networking",
        "family-consultation",
      ][index] ?? "uzbekistan-healthcare-bridge",
      item.title,
    ),
  }));

  return (
    <>
      <JsonLd
        data={[
          createWebPageSchema({
            name: page.schemaName,
            description: page.schemaDescription,
            path: "/press",
            type: "CollectionPage",
            locale,
          }),
          createBreadcrumbSchema(
            [
              { name: messages.chrome.navigation.home, path: "/" },
              { name: messages.chrome.navigation.press, path: "/press" },
            ],
            locale,
          ),
          createFaqSchema(page.faq.items),
        ]}
      />

      <PremiumPageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        highlights={page.hero.highlights}
        primaryCta={{ href: "/contact", label: page.hero.primaryCta }}
        secondaryCta={{ href: "/blog", label: page.hero.secondaryCta }}
        images={[
          createPremiumVisual(
            "contact-hero",
            "premium-contact-desk",
            page.hero.imageAlts[0],
          ),
          createPremiumVisual(
            "about-hero",
            "leadership-meeting",
            page.hero.imageAlts[1],
          ),
          createPremiumVisual(
            "contact-hero",
            "international-support",
            page.hero.imageAlts[2],
          ),
        ]}
        floatingCards={page.hero.floatingCards}
        accentLabel={page.hero.accentLabel}
      />

      <PremiumImageStorySection
        eyebrow={page.story.eyebrow}
        title={page.story.title}
        description={page.story.description}
        body={page.story.body}
        badges={page.story.badges}
        images={[
          createPremiumVisual(
            "contact-story",
            "hospital-leadership-contact",
            page.story.imageAlts[0],
          ),
          createPremiumVisual(
            "contact-story",
            "care-coordinator-workspace",
            page.story.imageAlts[1],
          ),
          createPremiumVisual(
            "about-story",
            "clinical-networking",
            page.story.imageAlts[2],
          ),
          createPremiumVisual(
            "contact-story",
            "institutional-briefing-call",
            page.story.imageAlts[3],
          ),
        ]}
      />

      <PremiumFeatureCardsSection
        eyebrow={page.resources.eyebrow}
        title={page.resources.title}
        description={page.resources.description}
        items={resourceItems}
        columns={3}
      />

      <PremiumSplitTrustSection
        eyebrow={page.signals.eyebrow}
        title={page.signals.title}
        description={page.signals.description}
        image={createPremiumVisual(
          "contact-trust",
          "tashkent-coordination-base",
          page.signals.imageAlt,
        )}
        items={page.signals.items.map((item, index) => ({
          ...item,
          icon: [ShieldCheck, FileText, Megaphone, Globe2][index] ?? ShieldCheck,
        }))}
      />

      <section className="section-shell pt-0">
        <div className="container-wide">
          <SectionHeader
            eyebrow={page.updates.eyebrow}
            title={page.updates.title}
            description={page.updates.description}
            align="center"
          />
          {latestPosts.length > 0 ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {latestPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="mt-12">
              <PremiumCard className="mx-auto max-w-3xl p-6 text-center sm:p-8" hover={false}>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                  {siteConfig.legalName}
                </p>
                <h3 className="mt-4 font-display text-3xl font-semibold tracking-[-0.04em] text-[#071B3A]">
                  {page.updates.emptyTitle}
                </h3>
                <p className="mt-5 text-base leading-8 text-slate-600">
                  {page.updates.emptyDescription}
                </p>
                <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                  <PublicLink
                    href="/blog"
                    className="inline-flex items-center justify-center rounded-full bg-[linear-gradient(135deg,#0B1F4D,#1D4ED8)] px-6 py-3 text-sm font-semibold text-white shadow-[0_20px_50px_rgba(29,78,216,0.24)] transition hover:-translate-y-0.5"
                  >
                    {page.updates.viewBlog}
                  </PublicLink>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="inline-flex items-center justify-center rounded-full border border-[#D6E8FF] bg-white px-6 py-3 text-sm font-semibold text-[#071B3A] transition hover:border-[#9CC8FF]"
                  >
                    {page.updates.contactLabel}
                  </a>
                </div>
              </PremiumCard>
            </div>
          )}
        </div>
      </section>

      <FAQAccordion
        eyebrow={page.faq.eyebrow}
        title={page.faq.title}
        description={page.faq.description}
        items={page.faq.items}
      />

      <PremiumCtaBanner
        eyebrow={page.cta.eyebrow}
        title={page.cta.title}
        description={page.cta.description}
        image={createPremiumVisual(
          "contact-cta",
          "healthcare-guidance-conversation",
          page.cta.imageAlt,
        )}
        primary={{ href: "/contact", label: page.cta.primary }}
        secondary={{ href: "/company-profile", label: page.cta.secondary }}
      />
    </>
  );
}
