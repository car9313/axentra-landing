import type { LocaleId, LocaleInfo } from "./locale.types";

export const SUPPORTED_LOCALES: LocaleInfo[] = [
  {
    id: "en",
    label: "English",
    flag: "us",
    country: "United States",
    isDefault: false,
  },
  {
    id: "es-LA",
    label: "Español latino neutro",
    flag: "latam",
    country: "Latinoamérica",
    isDefault: true,
  },
  {
    id: "es-MX",
    label: "Español (México)",
    flag: "mx",
    country: "México",
    isDefault: false,
  },
  {
    id: "es-AR",
    label: "Español (Argentina)",
    flag: "ar",
    country: "Argentina",
    isDefault: false,
  },
  {
    id: "es-CL",
    label: "Español (Chile)",
    flag: "cl",
    country: "Chile",
    isDefault: false,
  },
  {
    id: "es-CO",
    label: "Español (Colombia)",
    flag: "co",
    country: "Colombia",
    isDefault: false,
  },
  {
    id: "es-PE",
    label: "Español (Perú)",
    flag: "pe",
    country: "Perú",
    isDefault: false,
  },
];

/**
 * Traducción regional por país. Los países sin traducción regional pero con
 * idioma conocido (hispano/anglófono) los resuelve `fallbackLocaleForCountry`
 * en `locale-languages.ts`.
 */
export const LOCALE_MAP: Record<string, LocaleInfo["id"]> = {
  MX: "es-MX",
  AR: "es-AR",
  CL: "es-CL",
  CO: "es-CO",
  PE: "es-PE",
  US: "en",
};

export const REGION_TO_LOCALE: Record<string, LocaleInfo["id"]> = {
  MX: "es-MX",
  AR: "es-AR",
  CL: "es-CL",
  CO: "es-CO",
  PE: "es-PE",
  "419": "es-LA",
  ES: "es-LA",
};

export function mapLanguageToLocale(language: string): LocaleId | null {
  const normalized = language.toLowerCase();
  if (normalized.startsWith("es")) {
    const region = normalized.split("-")[1]?.toUpperCase();
    return REGION_TO_LOCALE[region] ?? "es-LA";
  }
  if (normalized.startsWith("en")) {
    return "en";
  }
  return null;
}