import { useCallback } from "react";

import { useLocaleContext } from "@/app/components/locale/LocaleProvider";

export function useLocale() {
  const { resolvedLocale } = useLocaleContext();

  const formatNumber = useCallback(
    (value: number, options?: Intl.NumberFormatOptions): string => {
      try {
        return new Intl.NumberFormat(resolvedLocale, options).format(value);
      } catch {
        return value.toLocaleString(resolvedLocale, options);
      }
    },
    [resolvedLocale]
  );

  const formatDate = useCallback(
    (
      value: Date | number | string,
      options?: Intl.DateTimeFormatOptions
    ): string => {
      const date =
        typeof value === "string" || typeof value === "number"
          ? new Date(value)
          : value;
      try {
        return new Intl.DateTimeFormat(resolvedLocale, options).format(date);
      } catch {
        return date.toLocaleDateString(resolvedLocale, options);
      }
    },
    [resolvedLocale]
  );

  return { formatNumber, formatDate };
}