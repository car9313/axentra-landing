import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { useLocaleContext } from "@/app/components/locale/LocaleProvider";
import { SUPPORTED_LOCALES } from "@/lib/locale/domain/locale.config";
import { DEFAULT_LOCALE } from "@/lib/locale/domain/locale.constants";
import type { LocaleId } from "@/lib/locale/domain/locale.types";
import { resetLocaleCookie } from "@/lib/locale/infrastructure/locale-persistence";

export function useLanguage() {
  const { t, i18n } = useTranslation();
  const { resolvedLocale, isReady, setPreference } = useLocaleContext();

  const resetLocale = useCallback(() => {
    resetLocaleCookie();
    void i18n.changeLanguage(DEFAULT_LOCALE);
  }, [i18n]);

  return {
    t,
    i18n,
    locale: resolvedLocale as LocaleId,
    availableLocales: SUPPORTED_LOCALES,
    isReady,
    setPreference,
    resetLocale,
  };
}