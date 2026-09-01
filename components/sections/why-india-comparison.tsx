"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Globe2 } from "lucide-react";

import { easeOutExpo } from "@/lib/motion";
import { localizePath } from "@/lib/i18n/config";
import { useLocale } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

type CountryComparison = {
  country: string;
  flag: string;
  costLevel: string;
  accreditation: string;
  waitingTime: string;
  flightHours: string;
  languageSupport: string;
  specialtyRange: string;
  isRecommended?: boolean;
};

const comparisons: CountryComparison[] = [
  {
    country: "India",
    flag: "🇮🇳",
    costLevel: "30-70% lower",
    accreditation: "JCI, NABH, NABL",
    waitingTime: "1-3 days",
    flightHours: "3-5 hours",
    languageSupport: "English + Translators",
    specialtyRange: "All specialties",
    isRecommended: true,
  },
  {
    country: "Turkey",
    flag: "🇹🇷",
    costLevel: "20-50% lower",
    accreditation: "JCI (limited)",
    waitingTime: "3-7 days",
    flightHours: "4-6 hours",
    languageSupport: "Limited",
    specialtyRange: "Select specialties",
  },
  {
    country: "Thailand",
    flag: "🇹🇭",
    costLevel: "30-60% lower",
    accreditation: "JCI (some)",
    waitingTime: "5-10 days",
    flightHours: "6-9 hours",
    languageSupport: "Limited",
    specialtyRange: "Cosmetic focus",
  },
  {
    country: "UAE",
    flag: "🇦🇪",
    costLevel: "10-30% lower",
    accreditation: "JCI",
    waitingTime: "3-7 days",
    flightHours: "3-5 hours",
    languageSupport: "English + Arabic",
    specialtyRange: "Premium only",
  },
];

type WhyIndiaComparisonProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

const comparisonCopy = {
  en: { eyebrow: "Why Choose India", title: "India vs Other Destinations", description: "Compare medical tourism destinations to see why India is the preferred choice for Central Asian patients.", feature: "Feature", recommended: "Recommended", rows: ["Cost Savings", "Accreditation", "Waiting Time", "Flight from Central Asia", "Language Support", "Specialty Range"], cost: "Cost", flight: "Flight", lower: "lower", days: "days", hours: "hours", limited: "Limited", all: "All specialties", selected: "Select specialties", cosmetic: "Cosmetic focus", premium: "Premium only", englishTranslators: "English + translators", englishArabic: "English + Arabic", cta: "Learn Why India Is the Best Choice" },
  uz: { eyebrow: "Nega Hindistonni tanlash kerak?", title: "Hindiston va boshqa yo‘nalishlar", description: "Markaziy Osiyolik bemorlar nega Hindistonni tanlashini tushunish uchun tibbiy turizm yo‘nalishlarini solishtiring.", feature: "Mezon", recommended: "Tavsiya etiladi", rows: ["Xarajat tejalishi", "Akkreditatsiya", "Kutish vaqti", "Markaziy Osiyodan parvoz", "Til yordami", "Mutaxassisliklar ko‘lami"], cost: "Narx", flight: "Parvoz", lower: "arzonroq", days: "kun", hours: "soat", limited: "Cheklangan", all: "Barcha yo‘nalishlar", selected: "Ayrim yo‘nalishlar", cosmetic: "Kosmetik yo‘nalish", premium: "Faqat premium", englishTranslators: "Ingliz tili + tarjimonlar", englishArabic: "Ingliz + arab tillari", cta: "Nega Hindiston eng maqbul tanlov ekanini biling" },
  ru: { eyebrow: "Почему выбирают Индию?", title: "Индия и другие направления", description: "Сравните направления медицинского туризма и узнайте, почему пациенты из Центральной Азии выбирают Индию.", feature: "Критерий", recommended: "Рекомендуется", rows: ["Экономия", "Аккредитация", "Время ожидания", "Перелёт из Центральной Азии", "Языковая поддержка", "Спектр специальностей"], cost: "Стоимость", flight: "Перелёт", lower: "ниже", days: "дн.", hours: "ч.", limited: "Ограниченная", all: "Все специальности", selected: "Отдельные специальности", cosmetic: "Косметология", premium: "Только премиум", englishTranslators: "Английский + переводчики", englishArabic: "Английский + арабский", cta: "Узнайте, почему Индия — лучший выбор" },
  kk: { eyebrow: "Неліктен Үндістанды таңдайды?", title: "Үндістан және басқа бағыттар", description: "Орталық Азия пациенттері неліктен Үндістанды таңдайтынын білу үшін медициналық туризм бағыттарын салыстырыңыз.", feature: "Критерий", recommended: "Ұсынылады", rows: ["Шығынды үнемдеу", "Аккредитация", "Күту уақыты", "Орталық Азиядан ұшу", "Тілдік қолдау", "Мамандықтар ауқымы"], cost: "Құны", flight: "Ұшу", lower: "төмен", days: "күн", hours: "сағат", limited: "Шектеулі", all: "Барлық мамандықтар", selected: "Таңдаулы мамандықтар", cosmetic: "Косметикалық бағыт", premium: "Тек премиум", englishTranslators: "Ағылшын + аудармашылар", englishArabic: "Ағылшын + араб", cta: "Үндістанның неліктен тиімді таңдау екенін біліңіз" },
  ky: { eyebrow: "Эмне үчүн Индияны тандашат?", title: "Индия жана башка багыттар", description: "Борбор Азиядагы бейтаптар эмне үчүн Индияны тандаарын билүү үчүн медициналык туризм багыттарын салыштырыңыз.", feature: "Критерий", recommended: "Сунушталат", rows: ["Чыгымды үнөмдөө", "Аккредитация", "Күтүү убактысы", "Борбор Азиядан учуу", "Тил колдоосу", "Адистиктердин чөйрөсү"], cost: "Баасы", flight: "Учуу", lower: "төмөн", days: "күн", hours: "саат", limited: "Чектелген", all: "Бардык адистиктер", selected: "Айрым адистиктер", cosmetic: "Косметикалык багыт", premium: "Премиум гана", englishTranslators: "Англис тили + котормочулар", englishArabic: "Англис + араб тилдери", cta: "Индия эмне үчүн мыкты тандоо экенин билиңиз" },
  tg: { eyebrow: "Чаро Ҳиндустонро интихоб мекунанд?", title: "Ҳиндустон ва дигар самтҳо", description: "Самтҳои сайёҳии тиббиро муқоиса кунед ва бифаҳмед, ки чаро беморони Осиёи Марказӣ Ҳиндустонро интихоб мекунанд.", feature: "Меъёр", recommended: "Тавсия мешавад", rows: ["Сарфаи хароҷот", "Аккредитатсия", "Вақти интизорӣ", "Парвоз аз Осиёи Марказӣ", "Дастгирии забонӣ", "Доираи ихтисосҳо"], cost: "Арзиш", flight: "Парвоз", lower: "камтар", days: "рӯз", hours: "соат", limited: "Маҳдуд", all: "Ҳамаи ихтисосҳо", selected: "Ихтисосҳои интихобӣ", cosmetic: "Самти косметикӣ", premium: "Танҳо премиум", englishTranslators: "Англисӣ + тарҷумонҳо", englishArabic: "Англисӣ + арабӣ", cta: "Бифаҳмед, ки чаро Ҳиндустон интихоби беҳтарин аст" },
  tk: { eyebrow: "Näme üçin Hindistany saýlamaly?", title: "Hindistan we beýleki ugurlar", description: "Merkezi Aziýaly hassalaryň näme üçin Hindistany saýlaýandygyny görmek üçin lukmançylyk syýahatçylyk ugurlaryny deňeşdiriň.", feature: "Ölçeg", recommended: "Maslahat berilýär", rows: ["Çykdajy tygşytlamak", "Akkreditasiýa", "Garaşmak wagty", "Merkezi Aziýadan uçuş", "Dil goldawy", "Hünär ugurlary"], cost: "Bahasy", flight: "Uçuş", lower: "arzan", days: "gün", hours: "sagat", limited: "Çäkli", all: "Ähli ugurlar", selected: "Saýlanan ugurlar", cosmetic: "Kosmetiki ugur", premium: "Diňe premium", englishTranslators: "Iňlis dili + terjimeçiler", englishArabic: "Iňlis + arap dilleri", cta: "Hindistanyň näme üçin iň gowy saýlawdygyny biliň" },
} as const;

export function WhyIndiaComparison({
  eyebrow,
  title,
  description,
}: WhyIndiaComparisonProps) {
  const locale = useLocale();
  const copy = comparisonCopy[locale];
  const localizedComparisons = comparisons.map((item, index) => ({
    ...item,
    country: new Intl.DisplayNames([locale], { type: "region" }).of(["IN", "TR", "TH", "AE"][index]) ?? item.country,
    costLevel: `${item.costLevel.replace(" lower", "")} ${copy.lower}`,
    waitingTime: `${item.waitingTime.replace(" days", "")} ${copy.days}`,
    flightHours: `${item.flightHours.replace(" hours", "")} ${copy.hours}`,
    languageSupport: index === 0 ? copy.englishTranslators : index === 3 ? copy.englishArabic : copy.limited,
    specialtyRange: [copy.all, copy.selected, copy.cosmetic, copy.premium][index],
  }));
  const rowLabels = copy.rows;

  return (
    <section className="section-shell">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="text-center"
        >
          <span className="section-kicker">{eyebrow ?? copy.eyebrow}</span>
          <h2 className="mt-5 heading-section">{title ?? copy.title}</h2>
          <p className="mt-4 body-lg mx-auto">{description ?? copy.description}</p>
        </motion.div>

        {/* Desktop Table */}
        <div className="mt-12 hidden overflow-x-auto lg:block">
          <div className="min-w-[800px] overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-white/90 shadow-[0_24px_80px_rgba(7,27,58,0.08)] backdrop-blur-xl">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#D6E8FF] bg-gradient-to-r from-blue-50 to-sky-50">
                  <th className="p-5 text-left text-sm font-semibold text-[#0B1F4D]">
                    {copy.feature}
                  </th>
                  {localizedComparisons.map((c) => (
                    <th
                      key={c.country}
                      className={cn(
                        "p-5 text-center text-sm font-semibold",
                        c.isRecommended
                          ? "bg-blue-600 text-white"
                          : "text-[#0B1F4D]"
                      )}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-2xl">{c.flag}</span>
                        <span>{c.country}</span>
                        {c.isRecommended && (
                          <span className="mt-1 rounded-full bg-white/20 px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider">
                            {copy.recommended}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { label: rowLabels[0], key: "costLevel" as const },
                  { label: rowLabels[1], key: "accreditation" as const },
                  { label: rowLabels[2], key: "waitingTime" as const },
                  { label: rowLabels[3], key: "flightHours" as const },
                  { label: rowLabels[4], key: "languageSupport" as const },
                  { label: rowLabels[5], key: "specialtyRange" as const },
                ].map((row, i) => (
                  <tr
                    key={row.key}
                    className={cn(
                      "border-b border-slate-100",
                      i % 2 === 0 ? "bg-white/60" : "bg-slate-50/40"
                    )}
                  >
                    <td className="p-4 text-sm font-medium text-slate-700">
                      {row.label}
                    </td>
                    {localizedComparisons.map((c) => (
                      <td
                        key={c.country}
                        className={cn(
                          "p-4 text-center text-sm",
                          c.isRecommended
                            ? "font-semibold text-blue-700"
                            : "text-slate-600"
                        )}
                      >
                        {c[row.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="mt-12 grid gap-4 lg:hidden">
          {localizedComparisons.map((c, index) => (
            <motion.div
              key={c.country}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={cn(
                "overflow-hidden rounded-[1.5rem] border bg-white/90 p-5 shadow-[0_18px_48px_rgba(7,27,58,0.06)] backdrop-blur-xl",
                c.isRecommended
                  ? "border-blue-300 ring-2 ring-blue-100"
                  : "border-[#D6E8FF]"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{c.flag}</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#0B1F4D]">
                    {c.country}
                  </h3>
                  {c.isRecommended && (
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-blue-700">
                      {copy.recommended}
                    </span>
                  )}
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-slate-400">{copy.cost}</p>
                  <p className="mt-0.5 font-medium text-slate-700">{c.costLevel}</p>
                </div>
                <div>
                  <p className="text-slate-400">{rowLabels[1]}</p>
                  <p className="mt-0.5 font-medium text-slate-700">{c.accreditation}</p>
                </div>
                <div>
                  <p className="text-slate-400">{rowLabels[2]}</p>
                  <p className="mt-0.5 font-medium text-slate-700">{c.waitingTime}</p>
                </div>
                <div>
                  <p className="text-slate-400">{copy.flight}</p>
                  <p className="mt-0.5 font-medium text-slate-700">{c.flightHours}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Link
            href={localizePath("/treatment-in-india", locale)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-700 to-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-[0_18px_48px_rgba(29,78,216,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_64px_rgba(29,78,216,0.32)]"
          >
            <Globe2 className="h-4 w-4" />
            {copy.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
