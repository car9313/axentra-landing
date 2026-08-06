import type { LocaleId } from "../domain/locale.types";
import { SUPPORTED_LOCALES, mapLanguageToLocale } from "../domain/locale.config";

export function isLocaleSupported(
  locale: string | null | undefined
): locale is LocaleId {
  if (!locale) return false;
  return SUPPORTED_LOCALES.some((entry) => entry.id === locale);
}

export function getLocaleFromNavigator(
  navigatorLang?: string | null
): LocaleId | null {
  const lang =
    navigatorLang ??
    (typeof navigator !== "undefined" ? navigator.language : null);
  if (!lang) return null;
  return mapLanguageToLocale(lang);
}