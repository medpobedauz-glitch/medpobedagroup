"use client";

import { Send } from "lucide-react";

import { useMessages } from "@/lib/i18n";
import { getTelegramUrl } from "@/lib/site";

type FloatingTelegramButtonProps = {
  message?: string;
  label?: string;
  className?: string;
};

export function FloatingTelegramButton({
  message,
  label,
  className = "",
}: FloatingTelegramButtonProps) {
  const messages = useMessages();
  const resolvedMessage = message ?? messages.chrome.floatingButtons.directMessage;
  const resolvedLabel = label ?? messages.chrome.floatingButtons.telegramLabel;
  const href = getTelegramUrl(resolvedMessage);

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
      <Send className="h-4 w-4 text-sky-700" />
      {resolvedLabel}
    </a>
  );
}
