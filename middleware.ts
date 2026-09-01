import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  defaultLocale,
  getPathLocale,
  isPublicAssetPath,
  isSupportedLocale,
  localizePath,
  LOCALE_COOKIE_NAME,
  LOCALE_HEADER_NAME,
  LOCALE_SOURCE_COOKIE_NAME,
  resolveLocaleFromAcceptLanguage,
  resolveLocaleFromCountry,
  type AppLocale,
} from "./lib/i18n/config";

const ONE_YEAR_IN_SECONDS = 60 * 60 * 24 * 365;
const SESSION_COOKIE_NAME = "medpobeda_admin_session";

function decodeBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  return Uint8Array.from(atob(padded), (character) => character.charCodeAt(0));
}

async function verifySessionToken(token: string) {
  const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");

  if (!encodedHeader || !encodedPayload || !encodedSignature) {
    throw new Error("Invalid session token");
  }

  const header = JSON.parse(
    new TextDecoder().decode(decodeBase64Url(encodedHeader)),
  ) as { alg?: string };

  if (header.alg !== "HS256") {
    throw new Error("Unsupported session token algorithm");
  }

  const secret = new TextEncoder().encode(
    process.env.AUTH_SECRET ?? "change-this-to-a-long-random-secret-key",
  );
  const key = await crypto.subtle.importKey(
    "raw",
    secret,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"],
  );
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    decodeBase64Url(encodedSignature),
    new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`),
  );

  if (!valid) {
    throw new Error("Invalid session token signature");
  }

  const payload = JSON.parse(
    new TextDecoder().decode(decodeBase64Url(encodedPayload)),
  ) as { exp?: number };

  if (typeof payload.exp !== "number" || payload.exp <= Date.now() / 1000) {
    throw new Error("Expired session token");
  }
}

function isAdminRoute(pathname: string) {
  if (pathname === "/admin/login") {
    return false;
  }

  return pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
}

function isBypassedRoute(pathname: string) {
  return pathname.startsWith("/api/") || isPublicAssetPath(pathname);
}

function setLocaleCookies(
  response: NextResponse,
  locale: AppLocale,
  source: "auto" | "manual",
) {
  response.cookies.set(LOCALE_COOKIE_NAME, locale, {
    path: "/",
    sameSite: "lax",
    maxAge: ONE_YEAR_IN_SECONDS,
  });
  response.cookies.set(LOCALE_SOURCE_COOKIE_NAME, source, {
    path: "/",
    sameSite: "lax",
    maxAge: ONE_YEAR_IN_SECONDS,
  });
}

function getPersistedLocale(request: NextRequest) {
  const locale = request.cookies.get(LOCALE_COOKIE_NAME)?.value;
  const source = request.cookies.get(LOCALE_SOURCE_COOKIE_NAME)?.value;

  return {
    locale: locale && isSupportedLocale(locale) ? locale : null,
    source: source === "manual" ? "manual" : "auto",
  } as const;
}

function detectLocale(request: NextRequest) {
  // Country detection order:
  // 1. Vercel's country header when deployed behind Vercel edge
  // 2. request.geo?.country when the platform exposes it
  // 3. Accept-Language as a language preference fallback
  // 4. English when no stronger signal is available
  const vercelCountry = request.headers.get("x-vercel-ip-country");
  const geoCountry = (
    request as NextRequest & { geo?: { country?: string | null } }
  ).geo?.country;
  const acceptLanguage = request.headers.get("accept-language");

  return (
    resolveLocaleFromCountry(vercelCountry) ||
    resolveLocaleFromCountry(geoCountry) ||
    resolveLocaleFromAcceptLanguage(acceptLanguage) ||
    defaultLocale
  );
}

function createLocalizedNextResponse(request: NextRequest, locale: AppLocale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(LOCALE_HEADER_NAME, locale);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

async function handleAdminAuth(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  if (!token) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  try {
    await verifySessionToken(token);
    return NextResponse.next();
  } catch {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (isAdminRoute(pathname)) {
    return handleAdminAuth(request);
  }

  if (isBypassedRoute(pathname)) {
    return NextResponse.next();
  }

  const pathLocale = getPathLocale(pathname);
  const persisted = getPersistedLocale(request);

  if (pathLocale) {
    const response = createLocalizedNextResponse(request, pathLocale);

    if (!persisted.locale) {
      setLocaleCookies(response, pathLocale, "auto");
      return response;
    }

    // Manual selection must always win for future unprefixed visits.
    // If a user picked a language explicitly, we keep that cookie even if
    // they temporarily open another locale-specific URL directly.
    if (persisted.source !== "manual" && persisted.locale !== pathLocale) {
      setLocaleCookies(response, pathLocale, "auto");
    }

    return response;
  }

  const locale = persisted.locale ?? detectLocale(request);
  const source = persisted.locale ? persisted.source : "auto";
  const targetPath = localizePath(pathname, locale);
  const targetUrl = new URL(`${targetPath}${search}`, request.url);
  const response = NextResponse.redirect(targetUrl);

  // Auto detection runs only for the first public visit without a saved
  // preference. After that, the stored locale is reused and manual changes
  // from the switcher will override future auto redirects.
  setLocaleCookies(response, locale, source);

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
