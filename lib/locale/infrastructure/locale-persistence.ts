import type { LocaleId } from "../domain/locale.types";
import { COOKIE_KEY } from "../domain/locale.constants";
import { SUPPORTED_LOCALES } from "../domain/locale.config";

const SUPPORTED_IDS = new Set<string>(
  SUPPORTED_LOCALES.map((locale) => locale.id)
);

function isSupportedLocale(value: string | null | undefined): value is LocaleId {
  return value !== undefined && value !== null && SUPPORTED_IDS.has(value);
}

export function readLocaleCookie(): LocaleId | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_KEY}=([^;]*)`)
  );
  if (!match || !match[1]) return null;

  const value = decodeURIComponent(match[1]);
  return isSupportedLocale(value) ? value : null;
}

export function writeLocaleCookie(locale: LocaleId): void {
  if (typeof document === "undefined") return;

  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(
    locale
  )}; path=/; max-age=31536000; sameSite=lax`;
}

export function resetLocaleCookie(): void {
  if (typeof document === "undefined") return;

  document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; sameSite=lax`;
}