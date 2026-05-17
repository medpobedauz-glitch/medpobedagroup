"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { MessageCircle, ShieldCheck } from "lucide-react";

import { getWhatsAppUrl } from "@/lib/site";
import { Button } from "@/components/ui/button";

const message =
  "Hello MedPobeda Group, I would like to start a conversation about your patient support services.";

export function ServiceCoverageCta() {
  const whatsappHref = getWhatsAppUrl(message);

  return (
    <m.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
      className="mt-12 flex flex-col items-center text-center"
    >
      <m.div whileHover={{ y: -3 }} whileTap={{ scale: 0.99 }}>
        <Button asChild variant="hero" size="2xl" className="min-w-[15rem] shadow-[0_22px_70px_rgba(14,116,144,0.18)]">
          {whatsappHref ? (
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Start Conversation
            </a>
          ) : (
            <Link href="/contact">
              <MessageCircle className="h-4 w-4" />
              Start Conversation
            </Link>
          )}
        </Button>
      </m.div>
      <div className="mt-5 inline-flex max-w-3xl items-start gap-3 rounded-full border border-slate-200 bg-white/84 px-5 py-3 text-left shadow-[0_14px_34px_rgba(8,22,52,0.08)] backdrop-blur-xl">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
        <p className="text-sm leading-6 text-slate-600">
          Our services are FREE and your hospital bill will not increase by using our services.
        </p>
      </div>
    </m.div>
  );
}
