"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Menu, X, ArrowRight } from "lucide-react";

import { LanguageSwitcher } from "@/app/components/locale/LanguageSwitcher";
import { useLanguage } from "@/lib/locale/hooks/useLanguage";

interface NavbarProps {
  onOpenContact: () => void;
  activeSection?: string;
}


function Wordmark({ dark = false }: { dark?: boolean }) {
  return (
    <span className="flex flex-col items-start leading-none">
      <span
        className={`font-display text-xl font-extrabold tracking-[0.18em] ${
          dark ? 'text-white' : 'text-axentra-navy'
        }`}
      >
        AXENTRA
      </span>
      <span
        className={`mt-0.5 flex w-full items-center gap-1.5 text-[0.55rem] font-semibold tracking-[0.42em] ${
          dark ? 'text-white/70' : 'text-axentra-gray'
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-px flex-1 ${dark ? 'bg-white/50' : 'bg-axentra-navy/30'}`}
        />
        SYSTEMS
        <span
          aria-hidden="true"
          className={`h-px flex-1 ${dark ? 'bg-white/50' : 'bg-axentra-navy/30'}`}
        />
      </span>
    </span>
  )
}


export function Navbar({ onOpenContact, activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { label: t("navigation:services"), href: "#services" },
    { label: t("navigation:products"), href: "#products" },
    { label: t("navigation:caseStudies"), href: "#case-studies" },
    { label: t("navigation:about"), href: "#about" },
    { label: t("navigation:insights"), href: "#insights" },
    { label: t("navigation:contact"), href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[var(--color-axentra-mist)] transition-all duration-200 shadow-[0_1px_3px_rgba(10,29,58,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
        <a href="#" className="group flex flex-col justify-center focus:outline-none focus:ring-2 focus:ring-[var(--color-axentra-blue)] rounded-md p-1">
         
          {/* <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-6 bg-[var(--color-axentra-blue)] rounded-[2px] transition-transform duration-300 group-hover:scale-y-110" />
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-[var(--color-axentra-navy)] leading-none">
              AXENTRA <span className="font-light text-[var(--color-axentra-blue)]">SYSTEMS</span>
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-normal text-[var(--color-axentra-gray)] tracking-normal mt-0.5 font-body">
            Where Intelligence Becomes Architecture
          </span> */}

          <Wordmark />
        </a>

        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? true : undefined}
                className={`font-body text-sm font-medium transition-colors duration-200 relative py-2.5 px-1 ${
                  isActive
                    ? "text-[var(--color-axentra-blue)] font-semibold"
                    : "text-[var(--color-axentra-navy)] hover:text-[var(--color-axentra-blue)]"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[var(--color-axentra-blue)] rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center space-x-3">
          <LanguageSwitcher />
          <button
            onClick={onOpenContact}
            className="inline-flex items-center justify-center bg-[var(--color-axentra-blue)] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-5 py-2.5 rounded-[10px] shadow-[0_1px_3px_rgba(10,29,58,0.06)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            {t("common:getInTouch")}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--color-axentra-navy)] hover:text-[var(--color-axentra-blue)] rounded-lg border border-[var(--color-axentra-mist)] hover:bg-[var(--color-axentra-mist)]/50 transition-colors"
            aria-label={t("navigation:toggleMenu")}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[var(--color-axentra-mist)] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          {navLinks.map((link) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive ? true : undefined}
                className={`block font-body text-base font-medium py-2 px-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-[var(--color-axentra-mist)] text-[var(--color-axentra-blue)] font-semibold"
                    : "text-[var(--color-axentra-navy)] hover:text-[var(--color-axentra-blue)] hover:bg-[var(--color-axentra-mist)]/50"
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="pt-2 border-t border-[var(--color-axentra-mist)]">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[var(--color-axentra-blue)] text-white font-semibold py-3 px-4 rounded-[10px] text-center cursor-pointer"
            >
              {t("common:getInTouch")} <ArrowRight size={16} />
            </button>
            <div className="flex justify-center pt-1">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
