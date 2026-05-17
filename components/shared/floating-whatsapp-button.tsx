"use client";

import { MessageCircle } from "lucide-react";

import { useMessages } from "@/lib/i18n";
import { getWhatsAppUrl } from "@/lib/site";

type FloatingWhatsAppButtonProps = {
  message?: string;
  label?: string;
  className?: string;
};

export function FloatingWhatsAppButton({
  message,
  label,
  className = "",
}: FloatingWhatsAppButtonProps) {
  const messages = useMessages();
  const resolvedMessage = message ?? messages.chrome.floatingButtons.directMessage;
  const resolvedLabel = label ?? messages.chrome.floatingButtons.whatsAppLabel;
  const href = getWhatsAppUrl(resolvedMessage);

  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`surface-panel flex items-center gap-3 rounded-full border border-slate-200/80 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-1 hover:border-cyan-300/35 ${className}`}
    >
      <MessageCircle className="h-4 w-4 text-sky-700" />
      {resolvedLabel}
    </a>
  );
}
