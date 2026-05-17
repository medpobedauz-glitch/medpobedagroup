"use client";

import { MessageCircle, PhoneCall, Send } from "lucide-react";

import { useMessages } from "@/lib/i18n";
import { PublicLink } from "@/components/shared/public-link";
import { getTelegramUrl, getWhatsAppUrl } from "@/lib/site";

export function StickyMobileContactBar() {
  const messages = useMessages();
  const whatsappHref = getWhatsAppUrl(
    messages.chrome.stickyMobileBar.directMessage,
  );
  const telegramHref = getTelegramUrl(
    messages.chrome.stickyMobileBar.directMessage,
  );

  return (
    <div className="sticky-safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/96 px-4 py-3 backdrop-blur-3xl md:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3">
        <PublicLink
          href="/contact"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-sky-100 bg-sky-50 text-sm font-semibold text-slate-950"
        >
          <PhoneCall className="h-4 w-4 text-sky-700" />
          {messages.chrome.stickyMobileBar.contact}
        </PublicLink>
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700"
          >
            <MessageCircle className="h-4 w-4 text-sky-700" />
            {messages.chrome.stickyMobileBar.whatsApp}
          </a>
        ) : (
          <div className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-400">
            <MessageCircle className="h-4 w-4 text-sky-700" />
            {messages.chrome.stickyMobileBar.whatsApp}
          </div>
        )}
        {telegramHref ? (
          <a
            href={telegramHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-700"
          >
            <Send className="h-4 w-4 text-sky-700" />
            {messages.chrome.stickyMobileBar.telegram}
          </a>
        ) : (
          <div className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white text-sm font-semibold text-slate-400">
            <Send className="h-4 w-4 text-sky-700" />
            {messages.chrome.stickyMobileBar.telegram}
          </div>
        )}
      </div>
    </div>
  );
}
