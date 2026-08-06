"use client";

import { useLanguage } from "@/lib/locale/hooks/useLanguage";

export function SkipLink() {
  const { t } = useLanguage();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[var(--color-axentra-blue)] focus:text-white focus:rounded-[8px] focus:text-sm focus:font-semibold focus:outline-none"
    >
      {t("common:skipToContent")}
    </a>
  );
}
