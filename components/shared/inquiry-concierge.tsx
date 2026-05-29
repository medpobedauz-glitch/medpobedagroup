"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircleMore, Send } from "lucide-react";

import { getLocaleFromPathname, localizePath, stripLocaleFromPath } from "@/lib/i18n/config";
import { useMessages } from "@/lib/i18n";
import { getTelegramUrl, getWhatsAppUrl } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalHeader,
  ModalTitle,
} from "@/components/ui/modal";

export function InquiryConcierge() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const routePath = stripLocaleFromPath(pathname);
  const messages = useMessages();
  const [open, setOpen] = useState(false);
  const supportedPaths = new Set(messages.chrome.inquiryConcierge.supportedPaths);

  const enabled = supportedPaths.has(routePath);
  const whatsappHref = useMemo(
    () =>
      getWhatsAppUrl(
        messages.chrome.inquiryConcierge.routeMessage,
      ),
    [messages.chrome.inquiryConcierge.routeMessage],
  );
  const telegramHref = useMemo(
    () =>
      getTelegramUrl(
        messages.chrome.inquiryConcierge.routeMessage,
      ),
    [messages.chrome.inquiryConcierge.routeMessage],
  );

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const storageKey = messages.chrome.inquiryConcierge.storageKey;
    const lastDismissed = window.localStorage.getItem(storageKey);
    if (lastDismissed && Date.now() - Number(lastDismissed) < 1000 * 60 * 60 * 18) {
      return;
    }

    const openPrompt = () => setOpen(true);
    const timer = window.setTimeout(openPrompt, 16000);

    function handleExitIntent(event: MouseEvent) {
      if (window.innerWidth < 1024 || event.clientY > 32) {
        return;
      }

      window.clearTimeout(timer);
      openPrompt();
      window.removeEventListener("mouseout", handleExitIntent);
    }

    function handleScroll() {
      const current = window.scrollY + window.innerHeight;
      const total = document.body.scrollHeight;
      if (current / total > 0.5) {
        window.clearTimeout(timer);
        openPrompt();
        window.removeEventListener("scroll", handleScroll);
      }
    }

    window.addEventListener("mouseout", handleExitIntent);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mouseout", handleExitIntent);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [enabled, messages.chrome.inquiryConcierge.storageKey]);

  if (!enabled) {
    return null;
  }

  const persistDismiss = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(messages.chrome.inquiryConcierge.storageKey, String(Date.now()));
  };

  const dismiss = () => {
    persistDismiss();
    setOpen(false);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && open) {
      persistDismiss();
    }

    setOpen(nextOpen);
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-5 z-40 hidden justify-center px-6 xl:flex">
        <div className="pointer-events-auto flex items-center gap-4 rounded-full border border-slate-200/80 bg-white/96 px-5 py-3 shadow-panel backdrop-blur-3xl">
          <div className="flex items-center gap-3">
            <Badge variant="solid">{messages.chrome.inquiryConcierge.badge}</Badge>
            <p className="text-sm text-slate-600">
              {messages.chrome.inquiryConcierge.inlineDescription}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button asChild size="sm" variant="hero">
              <Link href={localizePath("/contact", locale)}>
                {messages.chrome.actions.openContactDesk}
              </Link>
            </Button>
            <Button size="sm" variant="surface" onClick={() => setOpen(true)}>
              {messages.chrome.actions.chooseBestRoute}
            </Button>
          </div>
        </div>
      </div>

      <Modal open={open} onOpenChange={handleOpenChange}>
        <ModalContent closeLabel={messages.chrome.inquiryConcierge.closeAriaLabel}>
          <ModalHeader>
            <Badge variant="solid" className="w-fit">
              {messages.chrome.inquiryConcierge.modalBadge}
            </Badge>
            <ModalTitle className="text-2xl sm:text-[1.9rem]">
              {messages.chrome.inquiryConcierge.modalTitle}
            </ModalTitle>
            <ModalDescription>
              {messages.chrome.inquiryConcierge.modalDescription}
            </ModalDescription>
          </ModalHeader>
          <div className="mt-6 rounded-[1.5rem] border border-[#D6E8FF] bg-[linear-gradient(180deg,rgba(248,251,255,0.98),rgba(255,255,255,0.96))] p-4 text-sm leading-7 text-slate-600">
            <p>{messages.chrome.inquiryConcierge.inlineDescription}</p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            {whatsappHref ? (
              <Button asChild variant="hero" className="w-full justify-center">
                <a href={whatsappHref} target="_blank" rel="noreferrer" onClick={dismiss}>
                  <MessageCircleMore className="h-4 w-4" />
                  {messages.chrome.inquiryConcierge.whatsAppLabel}
                </a>
              </Button>
            ) : null}
            {telegramHref ? (
              <Button asChild variant="outline" className="w-full justify-center">
                <a href={telegramHref} target="_blank" rel="noreferrer" onClick={dismiss}>
                  <Send className="h-4 w-4" />
                  {messages.chrome.inquiryConcierge.telegramLabel}
                </a>
              </Button>
            ) : null}
            <Button
              asChild
              variant="surface"
              className="w-full justify-center border-[#C7DCF9] bg-white/92 text-[#071B3A]"
            >
              <Link href={localizePath("/contact", locale)} onClick={dismiss}>
                {messages.chrome.actions.openContactDesk}
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-center" onClick={dismiss}>
              {messages.chrome.actions.continueBrowsing}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
