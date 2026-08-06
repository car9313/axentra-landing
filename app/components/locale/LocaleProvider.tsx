"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "motion/react";

import type { LocaleId } from "@/lib/locale/domain/locale.types";
import {
  DEFAULT_LOCALE,
  LOCALE_NAMESPACES,
} from "@/lib/locale/domain/locale.constants";
import i18next from "@/lib/locale/infrastructure/i18n";
import { detectLocaleFromGeo } from "@/lib/locale/infrastructure/geo-detection.service";
import {
  readLocaleCookie,
  writeLocaleCookie,
} from "@/lib/locale/infrastructure/locale-persistence";
import {
  getLocaleFromNavigator,
  isLocaleSupported,
} from "@/lib/locale/utils/locale-utils";
import { LocaleSplash } from "@/app/components/locale/LocaleSplash";

const IS_DEV = process.env.NODE_ENV === "development";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

function devLog(...args: unknown[]): void {
  if (!IS_DEV) return;
  console.log("[i18n]", ...args);
}

const EMBEDDED_LOCALES = new Set<LocaleId>([DEFAULT_LOCALE, "en"]);

interface LocaleContextValue {
  resolvedLocale: LocaleId;
  isReady: boolean;
  setPreference: (locale: LocaleId) => Promise<void>;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

async function loadRegionalBundle(locale: LocaleId): Promise<boolean> {
  if (EMBEDDED_LOCALES.has(locale)) {
    devLog("bundle embebido para", locale, "- sin fetch");
    return true;
  }

  try {
    const response = await fetch(`/locales/${locale}/translation.json`);
    devLog("fetch /locales/", locale, "/translation.json -> HTTP", response.status);
    if (!response.ok) return false;

    const data = (await response.json()) as Record<
      string,
      Record<string, unknown>
    >;
    for (const ns of LOCALE_NAMESPACES) {
      if (data[ns]) {
        i18next.addResourceBundle(locale, ns, data[ns], true, true);
      }
    }
    return true;
  } catch {
    return false;
  }
}

function applyLocale(locale: LocaleId) {
  document.documentElement.lang = locale;
  devLog("changeLanguage(", locale, ") | html lang =", locale);
  void i18next.changeLanguage(locale);
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [resolvedLocale, setResolvedLocale] = useState<LocaleId>(DEFAULT_LOCALE);
  const [isReady, setIsReady] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const initializedRef = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const applyTarget = async (target: LocaleId, persist: boolean) => {
      if (target !== DEFAULT_LOCALE) {
        const loaded = await loadRegionalBundle(target);
        if (!loaded) {
          devLog("bundle no disponible -> default", DEFAULT_LOCALE);
          target = DEFAULT_LOCALE;
        }
      }
      if (persist) {
        const cookieLocale = readLocaleCookie();
        if (target !== cookieLocale) {
          writeLocaleCookie(target);
          devLog("cookie", target, "persistida");
        }
      }
      applyLocale(target);
      setResolvedLocale(target);
      setIsReady(true);
      setDetecting(false);
      devLog("language final =", target);
    };

    const override = new URLSearchParams(window.location.search).get("locale");
    if (isLocaleSupported(override)) {
      devLog("override ?locale =", override);
      void applyTarget(override, false);
      return;
    }

    const htmlLang = document.documentElement.lang;
    if (
      htmlLang &&
      htmlLang !== DEFAULT_LOCALE &&
      isLocaleSupported(htmlLang)
    ) {
      devLog("ssr lang =", htmlLang);
      void applyTarget(htmlLang, true);
      return;
    }

    const cookieLocale = readLocaleCookie();
    if (cookieLocale) {
      devLog("cookie locale =", cookieLocale);
      void applyTarget(cookieLocale, true);
      return;
    }

    devLog("sin ssr/cookie -> geo-detección");
    setDetecting(true);

    const init = async () => {
      let resolved: LocaleId = DEFAULT_LOCALE;

      const geoResult = await detectLocaleFromGeo();
      if (geoResult.success) {
        resolved = geoResult.localeId;
        devLog("geo éxito ->", geoResult.localeId);
      } else {
        devLog("geo fallo ->", geoResult.reason);
        const navigatorLocale = getLocaleFromNavigator();
        if (navigatorLocale) {
          resolved = navigatorLocale;
          devLog("navigator.language ->", navigatorLocale);
        } else {
          devLog("navigator no resolvió -> default");
        }
      }

      await applyTarget(resolved, true);
    };

    void init();

    if (IS_DEV) {
      (window as unknown as Record<string, unknown>).__i18nDebug = {
        i18next,
      };
    }
  }, []);

  const setPreference = useCallback(
    async (locale: LocaleId) => {
      if (locale !== DEFAULT_LOCALE) {
        const loaded = await loadRegionalBundle(locale);
        if (!loaded) return;
      }
      writeLocaleCookie(locale);
      applyLocale(locale);
      setResolvedLocale(locale);
      router.refresh();
    },
    [router]
  );

  const value = useMemo(
    () => ({ resolvedLocale, isReady, setPreference }),
    [resolvedLocale, isReady, setPreference]
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
      <AnimatePresence>
        {detecting && !isReady && <LocaleSplash key="splash" />}
      </AnimatePresence>
    </LocaleContext.Provider>
  );
}

export function useLocaleContext(): LocaleContextValue {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within a LocaleProvider");
  }
  return context;
}

export default LocaleProvider;