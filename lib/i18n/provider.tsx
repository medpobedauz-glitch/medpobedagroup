"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

import type { AppLocale } from "@/lib/i18n/config";
import type { Messages } from "@/lib/i18n/messages";

type I18nContextValue = {
  locale: AppLocale;
  messages: Messages;
};

const I18nContext = createContext<I18nContextValue | null>(null);

type I18nProviderProps = I18nContextValue & {
  children: ReactNode;
};

export function I18nProvider({
  locale,
  messages,
  children,
}: I18nProviderProps) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

function useI18nContext() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18nContext must be used within an I18nProvider.");
  }

  return context;
}

export function useLocale() {
  return useI18nContext().locale;
}

export function useMessages() {
  return useI18nContext().messages;
}
