"use client";

import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

import { useMessages } from "@/lib/i18n";
import { PublicLink } from "@/components/shared/public-link";
import { Badge } from "@/components/ui/badge";
import { FloatingTelegramButton } from "@/components/shared/floating-telegram-button";
import { FloatingWhatsAppButton } from "@/components/shared/floating-whatsapp-button";

export function FloatingButtons() {
  const messages = useMessages();

  return (
    <motion.div
      className="fixed bottom-20 right-4 z-40 hidden max-w-[18rem] flex-col gap-3 sm:bottom-6 sm:right-6 lg:flex"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <div className="surface-panel-strong rounded-[1.6rem] border border-slate-200/80 p-4">
        <Badge variant="solid">{messages.chrome.floatingButtons.badge}</Badge>
        <p className="mt-3 text-sm font-semibold text-slate-950">
          {messages.chrome.floatingButtons.title}
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {messages.chrome.floatingButtons.description}
        </p>
      </div>
      <PublicLink
        href="/contact"
        className="surface-panel-strong flex items-center gap-3 rounded-full border border-slate-200/80 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-1 hover:border-cyan-300/35"
      >
        <ShieldCheck className="h-4 w-4 text-sky-700" />
        {messages.chrome.actions.contactDesk}
      </PublicLink>
      <FloatingWhatsAppButton />
      <FloatingTelegramButton />
    </motion.div>
  );
}
