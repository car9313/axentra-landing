import type { LocaleId, LocaleNamespace } from "./locale.types";

export const DEFAULT_LOCALE: LocaleId = "es-LA";

export const COOKIE_KEY = "locale";

export const I18N_LOCALE_HEADER = "x-i18n-locale";

export const GEO_SOURCES: readonly string[] = [
  "https://www.cloudflare.com/cdn-cgi/trace",
  "https://ipwho.is/",
];

export const GEO_TIMEOUT_MS = 5_000;

export const LOCALE_NAMESPACES: readonly LocaleNamespace[] = [
  "common",
  "navigation",
  "hero",
  "services",
  "products",
  "caseStudies",
  "about",
  "insights",
  "contact",
  "footer",
  "modals",
];