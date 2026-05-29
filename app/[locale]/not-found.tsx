import { notFound } from "next/navigation";
import Link from "next/link";

import { isSupportedLocale, localizePath } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl } from "@/lib/site";

type LocalePageProps = {
  params: {
    locale: string;
  };
};

export function generateMetadata({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    return {};
  }

  const messages = getMessages(params.locale);
  return {
    title: `404 - ${messages.routes.home.title}`,
    description: "The page you are looking for does not exist.",
  };
}

export default function NotFoundPage({ params }: LocalePageProps) {
  if (!isSupportedLocale(params.locale)) {
    notFound();
  }

  const messages = getMessages(params.locale);
  const locale = params.locale;
  const whatsappHref = getWhatsAppUrl(messages.chrome.footer.whatsAppMessage);

  const notFoundLabels: Record<string, { title: string; description: string; home: string; contact: string }> = {
    en: {
      title: "Page Not Found",
      description: "The page you are looking for does not exist. It may have been moved or deleted.",
      home: "Back to Home",
      contact: "Contact Us",
    },
    uz: {
      title: "Sahifa topilmadi",
      description: "Siz qidirayotgan sahifa mavjud emas. U ko'chirilgan yoki o'chirilgan bo'lishi mumkin.",
      home: "Bosh sahifaga qaytish",
      contact: "Biz bilan bog'lanish",
    },
    ru: {
      title: "Страница не найдена",
      description: "Страница, которую вы ищете, не существует. Она могла быть перемещена или удалена.",
      home: "На главную",
      contact: "Связаться с нами",
    },
    ky: {
      title: "Страница табылган жок",
      description: "Сиз издеген страница жок. Ал жылжытылгана же өчүрүлгөн болушу мүмкүн.",
      home: "Башкы бетке",
      contact: "Биз менен байланышыңыз",
    },
    kk: {
      title: "Бет табылмады",
      description: "Сіз іздеген бет табылмады. Ол ойдағыланған немесе жойылған болуы мүмкін.",
      home: "Басты беттеңіз",
      contact: "Бізбен байланысыңыз",
    },
    tg: {
      title: "Саҳифа ёфт нашуд",
      description: "Саҳифаеи, ки шумо ҷустуҷӯ мекунед, вуҷуд надорад. Он мумкин аст, ки гузариш дода шуда ё нобуд карда шуда бошад.",
      home: "Ба саҳифаи асосӣ",
      contact: "Бо мо тамос гиред",
    },
    tk: {
      title: "Sahypa tapylmady",
      description: "Siz gözleýän sahypa ýok. Ol gözden geçirilip bolup, ýa-da öçürülüp bolup bilner.",
      home: "Basyja sahypaya",
      contact: "Biz bilen habarlaşyň",
    },
  };

  const labels = notFoundLabels[locale] || notFoundLabels.en;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,47,73,0.4)_0%,rgba(12,43,97,0.6)_100%)]" />

      <div className="relative max-w-2xl w-full space-y-8 text-center">
        {/* 404 Large Number */}
        <div className="space-y-4">
          <div className="text-9xl font-black bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
            404
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            {labels.title}
          </h1>

          <p className="text-lg text-slate-300">
            {labels.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button asChild variant="hero" className="h-12">
            <Link href={localizePath("/", locale)}>
              {labels.home}
            </Link>
          </Button>
          {whatsappHref ? (
            <Button
              asChild
              variant="outline"
              className="h-12 border-white/20 bg-white/10 text-white hover:bg-white/16"
            >
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                {messages.chrome.actions.messageUsOnWhatsApp}
              </a>
            </Button>
          ) : (
            <Button asChild variant="outline" className="h-12 border-white/20 bg-white/10 text-white hover:bg-white/16">
              <Link href={localizePath("/contact", locale)}>
                {labels.contact}
              </Link>
            </Button>
          )}
        </div>

        {/* Quick Links */}
        <div className="pt-12 border-t border-white/10">
          <p className="text-sm text-slate-400 mb-4">
            {locale === "en"
              ? "You might be looking for:"
              : locale === "uz"
                ? "Siz qidurayotgan bo'lishingiz mumkin:"
                : locale === "ru"
                  ? "Вы можете ищете:"
                  : "Siz izlep oturgandary bolup bilersiniz:"}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { href: "/medical-tourism", label: messages.chrome.navigation.medicalTourism },
              { href: "/hospital-partnerships", label: messages.chrome.navigation.partnerships },
              { href: "/international-patients", label: messages.chrome.navigation.internationalPatients },
              { href: "/student-mobility", label: messages.chrome.navigation.studentMobility },
              { href: "/about", label: messages.chrome.navigation.about },
              { href: "/contact", label: messages.chrome.navigation.contact },
            ].map((link) => (
              <Link
                key={link.href}
                href={localizePath(link.href, locale)}
                className="text-sm text-blue-400 hover:text-blue-300 transition underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
