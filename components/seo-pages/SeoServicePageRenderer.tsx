import { Lightbulb, Users, MessageSquare, AlertCircle, HelpCircle, Link as LinkIcon } from "lucide-react";
import type { SeoServicePageData } from "@/lib/seo-service-pages";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getTelegramUrl, getWhatsAppUrl } from "@/lib/site";

interface SeoServicePageProps {
  page: SeoServicePageData;
  locale: string;
  messages: {
    chrome: {
      footer: {
        whatsAppMessage: string;
      };
    };
  };
}

export function SeoServicePageRenderer({ page, locale, messages }: SeoServicePageProps) {
  const whatsappHref = getWhatsAppUrl(messages.chrome.footer.whatsAppMessage);
  const telegramHref = getTelegramUrl(messages.chrome.footer.whatsAppMessage);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Professional Healthcare Coordination
            </p>
            <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">{page.heroTitle}</h1>
            <p className="text-xl text-slate-600">{page.heroSubtitle}</p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">Request Assistance</Button>
            {whatsappHref && (
              <Button variant="outline" asChild>
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  Message on WhatsApp
                </a>
              </Button>
            )}
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700">
              <Lightbulb className="h-4 w-4" />
              Tashkent-Based Team
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700">
              <Users className="h-4 w-4" />
              Multilingual Support
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm text-blue-700">
              <MessageSquare className="h-4 w-4" />
              Patient Focused
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">{page.introTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">{page.introText}</p>
          </div>

          {page.introPoints.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {page.introPoints.map((point) => (
                <Card key={point} className="border-blue-100 bg-blue-50 p-4">
                  <p className="text-sm font-medium text-slate-900">{point}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Who This Is For */}
      {page.whoThisIsFor.length > 0 && (
        <section className="bg-slate-50 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Who This Service Is For</h2>
              <p className="mt-2 text-slate-600">We serve patients, families, and institutions with different needs.</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {page.whoThisIsFor.map((item) => (
                <Card key={item.title} className="border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Services Included */}
      {page.servicesIncluded.length > 0 && (
        <section className="px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Services Included</h2>
              <p className="mt-2 text-slate-600">Our comprehensive support includes:</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {page.servicesIncluded.map((service) => (
                <Card key={service.title} className="border-slate-200 p-6">
                  <h3 className="font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Process Timeline */}
      {page.processSteps.length > 0 && (
        <section className="bg-blue-50 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Our Process</h2>
              <p className="mt-2 text-slate-600">A structured approach to your healthcare coordination needs.</p>
            </div>

            <div className="space-y-4">
              {page.processSteps.map((step) => (
                <Card key={step.number} className="border-blue-200 bg-white p-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-semibold">
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ethical Disclaimer */}
      <section className="border-t border-slate-200 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
            <div className="flex gap-3">
              <AlertCircle className="h-6 w-6 flex-shrink-0 text-amber-600" />
              <div>
                <h3 className="font-semibold text-slate-900">Important Healthcare Information</h3>
                <p className="mt-2 text-sm text-slate-700">
                  MedPobeda Group does not provide emergency medical services and does not guarantee treatment outcomes. Final diagnosis, treatment advice, and medical decisions are made exclusively by licensed healthcare professionals and hospitals. We facilitate coordination and communication only.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {page.faqs.length > 0 && (
        <section className="bg-slate-50 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
              <p className="mt-2 text-slate-600">Common questions about our services.</p>
            </div>

            <div className="space-y-4">
              {page.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-lg border border-slate-200 bg-white p-6">
                  <summary className="flex cursor-pointer items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{faq.question}</h3>
                    <HelpCircle className="h-5 w-5 text-slate-400 group-open:hidden" />
                  </summary>
                  <p className="mt-4 text-sm text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="border-t border-slate-200 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6 text-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Ready to Get Started?</h2>
            <p className="mt-2 text-lg text-slate-600">
              Contact MedPobeda Group to discuss your healthcare needs.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700">Request Assistance</Button>
            {whatsappHref && (
              <Button variant="outline" asChild>
                <a href={whatsappHref} target="_blank" rel="noreferrer">
                  Message on WhatsApp
                </a>
              </Button>
            )}
            {telegramHref && (
              <Button variant="outline" asChild>
                <a href={telegramHref} target="_blank" rel="noreferrer">
                  Message on Telegram
                </a>
              </Button>
            )}
          </div>

          <div className="text-sm text-slate-600">
            <p>
              Email: <a href="mailto:info@medpobedagroup.uz" className="text-blue-600 hover:underline">info@medpobedagroup.uz</a>
            </p>
          </div>
        </div>
      </section>

      {/* Related Services */}
      {page.relatedPages.length > 0 && (
        <section className="bg-slate-50 px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Related Services</h2>
              <p className="mt-2 text-slate-600">Explore other services that might interest you.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {page.relatedPages.map((related) => (
                <a
                  key={related.slug}
                  href={`/${locale}/services/${related.slug}`}
                  className="rounded-lg border border-slate-200 bg-white p-6 transition hover:border-blue-300 hover:bg-blue-50"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-slate-900">{related.title}</h3>
                    <LinkIcon className="h-4 w-4 text-slate-400" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
