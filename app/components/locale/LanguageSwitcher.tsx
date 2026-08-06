"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check } from "lucide-react";

import { useLanguage } from "@/lib/locale/hooks/useLanguage";
import type { LocaleId } from "@/lib/locale/domain/locale.types";

const FLAGS: Record<string, string> = {
  us: "🇺🇸",
  latam: "🌎",
  mx: "🇲🇽",
  ar: "🇦🇷",
  cl: "🇨🇱",
  co: "🇨🇴",
  pe: "🇵🇪",
};

interface LanguageSwitcherProps {
  dark?: boolean;
}

export function LanguageSwitcher({ dark = false }: LanguageSwitcherProps) {
  const { locale, availableLocales, setPreference, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = availableLocales.find((entry) => entry.id === locale);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("navigation:changeLanguage")}
        className={`inline-flex items-center gap-1.5 text-sm font-medium rounded-[10px] px-2.5 py-2 transition-colors cursor-pointer ${
          dark
            ? "text-white/80 hover:text-white hover:bg-white/10"
            : "text-[var(--color-axentra-navy)] hover:text-[var(--color-axentra-blue)] hover:bg-[var(--color-axentra-mist)]/50"
        }`}
      >
        <span aria-hidden="true">{FLAGS[current?.flag ?? "us"]}</span>
        <span className="uppercase tracking-wide text-xs font-semibold">
          {locale}
        </span>
        <ChevronDown
          size={14}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("navigation:availableLanguages")}
          className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-[var(--color-axentra-mist)] bg-white shadow-lg overflow-hidden py-1.5 z-[60]"
        >
          {availableLocales.map((entry) => {
            const selected = entry.id === locale;
            return (
              <li key={entry.id} role="option" aria-selected={selected}>
                <button
                  onClick={() => {
                    setOpen(false);
                    void setPreference(entry.id as LocaleId);
                  }}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                    selected
                      ? "bg-[var(--color-axentra-mist)]/60 text-[var(--color-axentra-blue)] font-semibold"
                      : "text-[var(--color-axentra-navy)] hover:bg-[var(--color-axentra-mist)]/40"
                  }`}
                >
                  <span aria-hidden="true">{FLAGS[entry.flag]}</span>
                  <span className="flex-1 truncate">{entry.label}</span>
                  {selected && <Check size={15} className="shrink-0" />}
                  </button>
                </li>
              );
            })}
        </ul>
      )}
    </div>
  );
}