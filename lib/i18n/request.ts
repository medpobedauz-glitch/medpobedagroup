import { cookies, headers } from "next/headers";

import {
  defaultLocale,
  isSupportedLocale,
  LOCALE_COOKIE_NAME,
  LOCALE_HEADER_NAME,
} from "@/lib/i18n/config";

export function getRequestLocale() {
  const requestLocale = headers().get(LOCALE_HEADER_NAME);

  if (requestLocale && isSupportedLocale(requestLocale)) {
    return requestLocale;
  }

  const cookieLocale = cookies().get(LOCALE_COOKIE_NAME)?.value;

  if (cookieLocale && isSupportedLocale(cookieLocale)) {
    return cookieLocale;
  }

  return defaultLocale;
}
