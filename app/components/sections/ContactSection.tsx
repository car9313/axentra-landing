"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

import { useLanguage } from "@/lib/locale/hooks/useLanguage";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

export function ContactSection() {
  const { t, i18n } = useLanguage();
  const capabilities = t("contact:capabilities", {
    returnObjects: true,
  }) as unknown as string[];
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    capability: capabilities[0] ?? "Technology Consulting",
    message: "",
  });

  useEffect(() => {
    const onLanguageChanged = () => {
      setFormData((prev) => {
        const list = t("contact:capabilities", {
          returnObjects: true,
        }) as unknown as string[];
        if (list.includes(prev.capability)) return prev;
        return { ...prev, capability: list[0] ?? prev.capability };
      });
    };
    i18n.on("languageChanged", onLanguageChanged);
    return () => {
      i18n.off("languageChanged", onLanguageChanged);
    };
  }, [i18n, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[var(--color-axentra-mist)] py-16 md:py-24 border-t border-[var(--color-axentra-mist)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow={t("contact:eyebrow")}
          title={t("contact:title")}
          description={t("contact:description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-[var(--color-axentra-mist)]/40 rounded-[16px] p-6 sm:p-8 border border-[var(--color-axentra-mist)] space-y-8"
          >
            <div className="space-y-3">
              <h3 className="font-display font-bold text-2xl text-[var(--color-axentra-navy)]">
                {t("contact:hubTitle")}
              </h3>
              <p className="font-body text-[var(--color-axentra-gray)] text-sm leading-relaxed">
                {t("contact:hubDescription")}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[8px] bg-white border border-[var(--color-axentra-mist)] flex items-center justify-center text-[var(--color-axentra-blue)] flex-shrink-0 shadow-xs">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-axentra-gray)] uppercase tracking-wider font-body">{t("contact:emailLabel")}</div>
                  <a href="mailto:info@axentra.systems" className="text-sm font-semibold text-[var(--color-axentra-navy)] hover:text-[var(--color-axentra-blue)] transition-colors">
                    {t("contact:email")}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[8px] bg-white border border-[var(--color-axentra-mist)] flex items-center justify-center text-[var(--color-axentra-blue)] flex-shrink-0 shadow-xs">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-axentra-gray)] uppercase tracking-wider font-body">{t("contact:footprintLabel")}</div>
                  <div className="text-sm font-semibold text-[var(--color-axentra-navy)]">
                    {t("contact:company")}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[8px] bg-white border border-[var(--color-axentra-mist)] flex items-center justify-center text-[var(--color-axentra-blue)] flex-shrink-0 shadow-xs">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-axentra-gray)] uppercase tracking-wider font-body">{t("contact:responseLabel")}</div>
                  <div className="text-sm font-semibold text-[var(--color-axentra-navy)]">
                    {t("contact:responseValue")}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-axentra-mist)] flex items-center gap-2 text-xs text-[var(--color-axentra-gray)]">
              <ShieldCheck size={16} className="text-[var(--color-axentra-blue)]" />
              <span>{t("contact:nda")}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white rounded-[16px] p-6 sm:p-8 border border-[var(--color-axentra-mist)] shadow-[0_1px_3px_rgba(10,29,58,0.06)]"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                      {t("contact:nameLabel")}
                    </label>
                    <input
                      type="text"
                      required
                      aria-required="true"
                      placeholder={t("contact:namePlaceholder")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                      {t("contact:emailLabel2")}
                    </label>
                    <input
                      type="email"
                      required
                      aria-required="true"
                      placeholder={t("contact:emailPlaceholder")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                      {t("contact:organizationLabel")}
                    </label>
                    <input
                      type="text"
                      placeholder={t("contact:organizationPlaceholder")}
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                      {t("contact:capabilityLabel")}
                    </label>
                    <select
                      value={formData.capability}
                      onChange={(e) => setFormData({ ...formData, capability: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body bg-white transition-all"
                    >
                      {capabilities.map((cap) => (
                        <option key={cap} value={cap}>
                          {cap}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                    {t("contact:messageLabel")}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t("contact:messagePlaceholder")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[var(--color-axentra-blue)] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 px-6 rounded-[10px] text-sm shadow-[0_4px_14px_rgba(37,99,235,0.25)] transition-all cursor-pointer"
                  >
                    <span>{t("contact:submit")}</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[var(--color-axentra-mist)] text-[var(--color-axentra-blue)] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display font-bold text-2xl text-[var(--color-axentra-navy)]">
                  {t("contact:successTitle")}
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] text-sm max-w-sm mx-auto">
                  {t("contact:successMessage", {
                    name: formData.name || t("contact:valuedPartner"),
                  })}
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[var(--color-axentra-mist)] text-[var(--color-axentra-blue)] text-xs font-semibold px-5 py-2 rounded-[8px] hover:bg-[var(--color-axentra-blue)] hover:text-white transition-colors cursor-pointer"
                  >
                    {t("contact:sendAnother")}
                  </button>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
