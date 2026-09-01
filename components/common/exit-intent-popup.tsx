"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Send, Phone, ShieldCheck, Clock, Gift } from "lucide-react";

import { getWhatsAppUrl, getTelegramUrl, siteConfig } from "@/lib/site";
import { useLocale } from "@/lib/i18n/provider";
import { cn } from "@/lib/utils";

const copyByLocale = {
  en: {
    close: "Close popup", offer: "Free Consultation Offer",
    title: "Get a Free Medical Consultation",
    description: "Talk to our medical coordinators for a personalized treatment plan and cost estimate for India.",
    reply: "Reply within 2 hours", free: "100% Free", whatsapp: "Chat on WhatsApp",
    telegram: "Chat on Telegram", call: "Call Now", dismiss: "No thanks, I will come back later",
    message: "Hello! I am interested in medical treatment in India. Can you provide me with a free consultation?",
  },
  uz: {
    close: "Oynani yopish", offer: "Bepul konsultatsiya taklifi",
    title: "Bepul tibbiy konsultatsiya oling",
    description: "Hindistonda individual davolash rejasi va narx smetasi uchun tibbiy koordinatorlarimiz bilan bog‘laning.",
    reply: "2 soat ichida javob", free: "100% bepul", whatsapp: "WhatsApp orqali yozish",
    telegram: "Telegram orqali yozish", call: "Hozir qo‘ng‘iroq qilish", dismiss: "Yo‘q, rahmat. Keyinroq qaytaman",
    message: "Salom! Men Hindistonda davolanishga qiziqyapman. Bepul tibbiy konsultatsiya bera olasizmi?",
  },
  ru: {
    close: "Закрыть окно", offer: "Бесплатная консультация",
    title: "Получите бесплатную медицинскую консультацию",
    description: "Свяжитесь с нашими координаторами, чтобы получить индивидуальный план лечения и расчёт стоимости в Индии.",
    reply: "Ответ в течение 2 часов", free: "100% бесплатно", whatsapp: "Написать в WhatsApp",
    telegram: "Написать в Telegram", call: "Позвонить сейчас", dismiss: "Нет, спасибо. Я вернусь позже",
    message: "Здравствуйте! Меня интересует лечение в Индии. Могу ли я получить бесплатную медицинскую консультацию?",
  },
  kk: {
    close: "Терезені жабу", offer: "Тегін кеңес ұсынысы",
    title: "Тегін медициналық кеңес алыңыз",
    description: "Үндістандағы жеке емдеу жоспары мен құн есебін алу үшін координаторларымызбен хабарласыңыз.",
    reply: "2 сағат ішінде жауап", free: "100% тегін", whatsapp: "WhatsApp арқылы жазу",
    telegram: "Telegram арқылы жазу", call: "Қазір қоңырау шалу", dismiss: "Жоқ, рақмет. Кейінірек ораламын",
    message: "Сәлеметсіз бе! Мені Үндістандағы емдеу қызықтырады. Тегін медициналық кеңес бере аласыз ба?",
  },
  ky: {
    close: "Терезени жабуу", offer: "Акысыз кеңеш сунушу",
    title: "Акысыз медициналык кеңеш алыңыз",
    description: "Индиядагы жеке дарылоо планын жана баа эсебин алуу үчүн координаторлорубуз менен байланышыңыз.",
    reply: "2 саат ичинде жооп", free: "100% акысыз", whatsapp: "WhatsApp аркылуу жазуу",
    telegram: "Telegram аркылуу жазуу", call: "Азыр чалуу", dismiss: "Жок, рахмат. Кийинчерээк кайтам",
    message: "Саламатсызбы! Мени Индиядагы дарылоо кызыктырат. Акысыз медициналык кеңеш бере аласызбы?",
  },
  tg: {
    close: "Пӯшидани равзана", offer: "Пешниҳоди машварати ройгон",
    title: "Машварати ройгони тиббӣ гиред",
    description: "Барои нақшаи инфиродии табобат ва ҳисоби арзиш дар Ҳиндустон бо ҳамоҳангсозони мо тамос гиред.",
    reply: "Ҷавоб дар давоми 2 соат", free: "100% ройгон", whatsapp: "Навиштан дар WhatsApp",
    telegram: "Навиштан дар Telegram", call: "Ҳозир занг занед", dismiss: "Не, ташаккур. Баъдтар бармегардам",
    message: "Салом! Ман ба табобат дар Ҳиндустон шавқ дорам. Метавонам машварати ройгони тиббӣ гирам?",
  },
  tk: {
    close: "Penjiräni ýapmak", offer: "Mugt maslahat teklibi",
    title: "Mugt lukmançylyk maslahatyny alyň",
    description: "Hindistandaky şahsy bejergi meýilnamasy we çykdajy hasaby üçin koordinatorlarymyz bilen habarlaşyň.",
    reply: "2 sagadyň dowamynda jogap", free: "100% mugt", whatsapp: "WhatsApp arkaly ýazmak",
    telegram: "Telegram arkaly ýazmak", call: "Häzir jaň etmek", dismiss: "Ýok, sag boluň. Soň dolanaryn",
    message: "Salam! Men Hindistanda bejergi bilen gyzyklanýaryn. Mugt lukmançylyk maslahatyny alyp bilerinmi?",
  },
} as const;

export function ExitIntentPopup() {
  const locale = useLocale();
  const copy = copyByLocale[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (
        !hasShown &&
        event.clientY <= 0 &&
        event.clientX <= 0
      ) {
        timeoutRef.current = setTimeout(() => {
          setIsOpen(true);
          setHasShown(true);
        }, 500);
      }
    };

    const handleBeforeUnload = (_event: BeforeUnloadEvent) => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasShown]);

  // Auto-show after 45 seconds if not triggered by exit intent
  useEffect(() => {
    if (hasShown) return;
    const autoShowTimer = setTimeout(() => {
      setIsOpen(true);
      setHasShown(true);
    }, 45000);

    return () => clearTimeout(autoShowTimer);
  }, [hasShown]);

  const whatsappHref = getWhatsAppUrl(copy.message);
  const telegramHref = getTelegramUrl(copy.message);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#0B1F4D]/40 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-4 z-[61] flex items-center justify-center p-4 sm:inset-0"
          >
            <div className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-[#D6E8FF] bg-white shadow-[0_40px_100px_rgba(7,27,58,0.2)]">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-400 shadow-md transition hover:text-slate-700"
                aria-label={copy.close}
              >
                <X className="h-4 w-4" />
              </button>

              {/* Header */}
              <div className="bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-8 text-white sm:px-8">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-100">
                  <Gift className="h-4 w-4" />
                  <span>{copy.offer}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-[-0.03em] sm:text-3xl">
                  {copy.title}
                </h2>
                <p className="mt-3 text-sm text-blue-100/90">
                  {copy.description}
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 border-b border-slate-100 px-6 py-4 sm:px-8">
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <Clock className="h-3.5 w-3.5 text-blue-500" />
                  <span>{copy.reply}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{copy.free}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid gap-3 px-6 py-6 sm:px-8">
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "flex items-center justify-center gap-3 rounded-2xl bg-emerald-500 px-6 py-4 text-sm font-bold text-white",
                      "shadow-[0_12px_32px_rgba(34,197,94,0.3)] transition-all duration-200",
                      "hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-[0_18px_48px_rgba(34,197,94,0.4)]"
                    )}
                  >
                    <MessageCircle className="h-5 w-5" />
                    {copy.whatsapp}
                  </a>
                ) : null}

                {telegramHref ? (
                  <a
                    href={telegramHref}
                    target="_blank"
                    rel="noreferrer"
                    className={cn(
                      "flex items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-4 text-sm font-bold text-white",
                      "shadow-[0_12px_32px_rgba(14,165,233,0.3)] transition-all duration-200",
                      "hover:-translate-y-0.5 hover:bg-sky-600 hover:shadow-[0_18px_48px_rgba(14,165,233,0.4)]"
                    )}
                  >
                    <Send className="h-5 w-5" />
                    {copy.telegram}
                  </a>
                ) : null}

                <a
                  href={`tel:${siteConfig.contactPhone.replace(/\s+/g, "")}`}
                  className={cn(
                    "flex items-center justify-center gap-3 rounded-2xl border border-[#D6E8FF] bg-white px-6 py-4 text-sm font-bold text-[#0B1F4D]",
                    "shadow-[0_8px_24px_rgba(7,27,58,0.06)] transition-all duration-200",
                    "hover:-translate-y-0.5 hover:shadow-[0_14px_36px_rgba(7,27,58,0.1)]"
                  )}
                >
                  <Phone className="h-5 w-5 text-[#1D4ED8]" />
                  {copy.call}: {siteConfig.contactPhone}
                </a>

                <button
                  onClick={handleClose}
                  className="mt-2 text-center text-xs text-slate-400 transition hover:text-slate-600"
                >
                  {copy.dismiss}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
