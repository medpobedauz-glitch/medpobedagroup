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
    <div className="sticky-safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-slate-200/80 bg-white/96 px-3 py-3 backdrop-blur-3xl md:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-2">
        <PublicLink
          href="/contact"
          className="inline-flex min-h-[44px] min-w-0 flex-col items-center justify-center gap-1 rounded-full border border-sky-100 bg-sky-50 px-1.5 py-2 text-[10px] font-semibold text-slate-950 min-[360px]:px-2 min-[380px]:flex-row min-[380px]:gap-2 min-[380px]:text-xs"
        >
          <PhoneCall className="h-4 w-4 text-sky-700" />
          {messages.chrome.stickyMobileBar.contact}
        </PublicLink>
        {whatsappHref ? (
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] min-w-0 flex-col items-center justify-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-2 text-[10px] font-semibold text-slate-700 min-[360px]:px-2 min-[380px]:flex-row min-[380px]:gap-2 min-[380px]:text-xs"
          >
            <MessageCircle className="h-4 w-4 text-sky-700" />
            {messages.chrome.stickyMobileBar.whatsApp}
          </a>
        ) : (
          <div className="inline-flex min-h-[44px] min-w-0 flex-col items-center justify-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-2 text-[10px] font-semibold text-slate-400 min-[360px]:px-2 min-[380px]:flex-row min-[380px]:gap-2 min-[380px]:text-xs">
            <MessageCircle className="h-4 w-4 text-sky-700" />
            {messages.chrome.stickyMobileBar.whatsApp}
          </div>
        )}
        {telegramHref ? (
          <a
            href={telegramHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-[44px] min-w-0 flex-col items-center justify-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-2 text-[10px] font-semibold text-slate-700 min-[360px]:px-2 min-[380px]:flex-row min-[380px]:gap-2 min-[380px]:text-xs"
          >
            <Send className="h-4 w-4 text-sky-700" />
            {messages.chrome.stickyMobileBar.telegram}
          </a>
        ) : (
          <div className="inline-flex min-h-[44px] min-w-0 flex-col items-center justify-center gap-1 rounded-full border border-slate-200 bg-white px-1.5 py-2 text-[10px] font-semibold text-slate-400 min-[360px]:px-2 min-[380px]:flex-row min-[380px]:gap-2 min-[380px]:text-xs">
            <Send className="h-4 w-4 text-sky-700" />
            {messages.chrome.stickyMobileBar.telegram}
          </div>
        )}
      </div>
    </div>
  );
}
