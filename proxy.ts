import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import {
  LOCALE_MAP,
  SUPPORTED_LOCALES,
} from "@/lib/locale/domain/locale.config";
import {
  COOKIE_KEY,
  DEFAULT_LOCALE,
  I18N_LOCALE_HEADER,
} from "@/lib/locale/domain/locale.constants";
import type { LocaleId } from "@/lib/locale/domain/locale.types";

const SUPPORTED_IDS = new Set<string>(
  SUPPORTED_LOCALES.map((locale) => locale.id)
);

const COUNTRY_HEADERS = [
  "cf-ipcountry",
  "x-country",
  "cloudfront-viewer-country",
  "cdn-viewer-country",
] as const;

function isSupportedLocale(value: string | null | undefined): value is LocaleId {
  return value !== undefined && value !== null && SUPPORTED_IDS.has(value);
}

function detectCountryLocale(request: NextRequest): LocaleId | null {
  for (const header of COUNTRY_HEADERS) {
    const country = request.headers.get(header);
    if (!country) continue;
    const localeId = LOCALE_MAP[country];
    if (localeId) return localeId;
  }
  return null;
}

export function proxy(request: NextRequest) {
  const existing = request.cookies.get(COOKIE_KEY)?.value;
  const current = isSupportedLocale(existing) ? existing : null;

  let resolved: LocaleId | null = null;

  const queryLocale = request.nextUrl.searchParams.get("locale");
  if (isSupportedLocale(queryLocale)) {
    resolved = queryLocale;
  }

  if (!resolved) {
    resolved = detectCountryLocale(request);
  }

  if (!resolved && current) {
    resolved = current;
  }

  const requestHeaders = new Headers(request.headers);
  if (resolved) {
    requestHeaders.set(I18N_LOCALE_HEADER, resolved);
  } else {
    requestHeaders.delete(I18N_LOCALE_HEADER);
  }

  const response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  if (resolved && resolved !== current) {
    const isChangeFromStoredPreference =
      resolved !== DEFAULT_LOCALE || current !== null;
    if (isChangeFromStoredPreference) {
      response.cookies.set(COOKIE_KEY, resolved, {
        path: "/",
        maxAge: 31536000,
        sameSite: "lax",
      });
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|locales).*)",
  ],
};