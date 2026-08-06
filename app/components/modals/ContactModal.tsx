"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X, Send, CheckCircle2 } from "lucide-react";

import { useLanguage } from "@/lib/locale/hooks/useLanguage";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledSubject?: string;
}

export function ContactModal({
  isOpen,
  onClose,
  prefilledSubject = "",
}: ContactModalProps) {
  const { t, i18n } = useLanguage();
  const capabilities = t("modals:contactModal.capabilities", {
    returnObjects: true,
  }) as unknown as string[];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    serviceInterest: prefilledSubject || (capabilities[0] ?? "Technology Consulting"),
    message: "",
  });

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.activeElement as HTMLElement | null;
    const timeout = setTimeout(() => {
      dialogRef.current?.focus();
    }, 50);
    return () => {
      clearTimeout(timeout);
      prev?.focus();
    };
  }, [isOpen]);

  useEffect(() => {
    const onLanguageChanged = () => {
      setFormData((prev) => {
        const list = t("modals:contactModal.capabilities", {
          returnObjects: true,
        }) as unknown as string[];
        if (list.includes(prev.serviceInterest)) return prev;
        return { ...prev, serviceInterest: list[0] ?? prev.serviceInterest };
      });
    };
    i18n.on("languageChanged", onLanguageChanged);
    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, [i18n, t]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
    >
      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={t("modals:contactModal.ariaLabel")}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-[16px] max-w-lg w-full p-4 sm:p-8 relative shadow-2xl border border-axentra-mist max-h-[90vh] overflow-y-auto outline-none"
      >

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-(--color-axentra-gray) hover:text-axentra-navy rounded-full hover:bg-[var(--color-axentra-mist)] transition-colors"
          aria-label={t("modals:contactModal.close")}
        >
          <X size={20} />
        </button>

        {!submitted ? (
          <div>
            <div className="space-y-1 mb-6">
              <span className="font-body text-axentra-blue text-xs uppercase font-semibold">
                {t("modals:contactModal.eyebrow")}
              </span>
              <h3 className="font-display font-bold text-2xl text-axentra-navy">
                {t("modals:contactModal.title")}
              </h3>
              <p className="text-sm text-(--color-axentra-gray) font-body">
                {t("modals:contactModal.description")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                  {t("modals:contactModal.nameLabel")}
                </label>
                <input
                  type="text"
                  required
                  aria-required="true"
                  placeholder={t("modals:contactModal.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                  {t("modals:contactModal.emailLabel")}
                </label>
                <input
                  type="email"
                  required
                  aria-required="true"
                  placeholder={t("modals:contactModal.emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                  {t("modals:contactModal.companyLabel")}
                </label>
                <input
                  type="text"
                  placeholder={t("modals:contactModal.companyPlaceholder")}
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                  {t("modals:contactModal.capabilityLabel")}
                </label>
                <select
                  value={formData.serviceInterest}
                  onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body bg-white transition-all"
                >
                  {capabilities.map((cap) => (
                    <option key={cap} value={cap}>
                      {cap}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                  {t("modals:contactModal.messageLabel")}
                </label>
                <textarea
                  rows={3}
                  placeholder={t("modals:contactModal.messagePlaceholder")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[var(--color-axentra-blue)] hover:bg-[#1D4ED8] text-white font-semibold py-3 px-6 rounded-[10px] text-sm shadow-[0_1px_3px_rgba(10,29,58,0.06)] transition-all cursor-pointer"
                >
                  <span>{t("modals:contactModal.submit")}</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-[var(--color-axentra-mist)] text-[var(--color-axentra-blue)] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="font-display font-bold text-2xl text-[var(--color-axentra-navy)]">
              {t("modals:contactModal.thankYouTitle", {
                name: formData.name || t("modals:contactModal.friend"),
              })}
            </h3>
            <p className="text-sm text-[var(--color-axentra-gray)] font-body max-w-xs mx-auto">
              {t("modals:contactModal.successMessage", {
                interest: formData.serviceInterest,
              })}
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="bg-[var(--color-axentra-blue)] text-white text-sm font-semibold px-6 py-2.5 rounded-[10px] hover:bg-[#1D4ED8] transition-colors cursor-pointer"
              >
                {t("modals:contactModal.backToSite")}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
