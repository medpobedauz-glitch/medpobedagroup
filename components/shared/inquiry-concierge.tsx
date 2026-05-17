"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { Building2, Headphones, HeartPulse, MessageCircleMore, Send } from "lucide-react";

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

  const dismiss = () => {
    window.localStorage.setItem(
      messages.chrome.inquiryConcierge.storageKey,
      String(Date.now()),
    );
    setOpen(false);
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

      <Modal open={open} onOpenChange={setOpen}>
        <ModalContent>
          <ModalHeader>
            <Badge variant="solid" className="w-fit">
              {messages.chrome.inquiryConcierge.modalBadge}
            </Badge>
            <ModalTitle>{messages.chrome.inquiryConcierge.modalTitle}</ModalTitle>
            <ModalDescription>
              {messages.chrome.inquiryConcierge.modalDescription}
            </ModalDescription>
          </ModalHeader>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {messages.chrome.inquiryConcierge.routes.map((item, index) => {
              const Icon =
                index === 0 ? Headphones : index === 1 ? HeartPulse : Building2;

              return (
                <Link
                  key={item.title}
                  href={localizePath(item.href, locale)}
                  onClick={dismiss}
                  className="group rounded-[1.6rem] border border-slate-200/80 bg-white p-5 transition hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-slate-50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-100 bg-sky-50 text-sky-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold text-slate-950">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.description}</p>
                </Link>
              );
            })}
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {whatsappHref ? (
              <Button asChild variant="outline" className="flex-1">
                <a href={whatsappHref} target="_blank" rel="noreferrer" onClick={dismiss}>
                  <MessageCircleMore className="h-4 w-4" />
                  {messages.chrome.inquiryConcierge.whatsAppLabel}
                </a>
              </Button>
            ) : null}
            {telegramHref ? (
              <Button asChild variant="outline" className="flex-1">
                <a href={telegramHref} target="_blank" rel="noreferrer" onClick={dismiss}>
                  <Send className="h-4 w-4" />
                  {messages.chrome.inquiryConcierge.telegramLabel}
                </a>
              </Button>
            ) : null}
            <Button variant="subtle" className="sm:w-auto" onClick={dismiss}>
              {messages.chrome.actions.continueBrowsing}
            </Button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
}
