"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Cpu, Layers, Target } from "lucide-react";

import { useLanguage } from "@/lib/locale/hooks/useLanguage";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"mission" | "values" | "architecture">("mission");
  const { t } = useLanguage();

  const stats = t("about:stats", { returnObjects: true }) as unknown as {
    label: string;
    value: string;
  }[];

  const pillars = t("about:pillars", { returnObjects: true }) as unknown as {
    title: string;
    desc: string;
  }[];

  const pillarIcons = [
    <Layers key="layers" size={24} className="text-[var(--color-axentra-blue)]" />,
    <Cpu key="cpu" size={24} className="text-[var(--color-axentra-blue)]" />,
    <ShieldCheck key="shield" size={24} className="text-[var(--color-axentra-blue)]" />,
    <Target key="target" size={24} className="text-[var(--color-axentra-blue)]" />,
  ];

  return (
    <section id="about" className="bg-[var(--color-axentra-mist)] py-16 md:py-24 border-t border-[var(--color-axentra-mist)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow={t("about:eyebrow")}
          title={t("about:title")}
          description={t("about:description")}
        />

        <div className="max-w-4xl mx-auto mb-12">
          <div role="tablist" aria-label={t("about:tabs.label")} className="flex justify-center space-x-2 p-1.5 bg-[var(--color-axentra-mist)] rounded-[10px] max-w-full sm:max-w-md mx-auto">
            {(["mission", "values", "architecture"] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-[8px] text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-[var(--color-axentra-blue)] shadow-[0_1px_3px_rgba(10,29,58,0.06)]"
                    : "text-[var(--color-axentra-gray)] hover:text-[var(--color-axentra-navy)]"
                }`}
              >
                {t(`about:tabs.${tab}`)}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-6 sm:p-8 bg-[var(--color-axentra-mist)]/40 rounded-[16px] border border-[var(--color-axentra-mist)] text-center"
          >
            {activeTab === "mission" && (
              <div className="space-y-3 max-w-2xl mx-auto">
                <h3 className="font-display font-semibold text-xl text-[var(--color-axentra-navy)]">
                  {t("about:mission.title")}
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] text-sm sm:text-base leading-relaxed">
                  {t("about:mission.description")}
                </p>
              </div>
            )}
            {activeTab === "values" && (
              <div className="space-y-3 max-w-2xl mx-auto">
                <h3 className="font-display font-semibold text-xl text-[var(--color-axentra-navy)]">
                  {t("about:values.title")}
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] text-sm sm:text-base leading-relaxed">
                  {t("about:values.description")}
                </p>
              </div>
            )}
            {activeTab === "architecture" && (
              <div className="space-y-3 max-w-2xl mx-auto">
                <h3 className="font-display font-semibold text-xl text-[var(--color-axentra-navy)]">
                  {t("about:architecture.title")}
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] text-sm sm:text-base leading-relaxed">
                  {t("about:architecture.description")}
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[16px] p-6 border border-[var(--color-axentra-mist)] shadow-[0_1px_3px_rgba(10,29,58,0.06)] hover:shadow-[0_6px_20px_rgba(10,29,58,0.10)] transition-all"
            >
              <div className="w-12 h-12 rounded-[10px] bg-[var(--color-axentra-mist)] flex items-center justify-center mb-4">
                {pillarIcons[idx]}
              </div>
              <h4 className="font-display font-semibold text-lg text-[var(--color-axentra-navy)] mb-2">
                {pillar.title}
              </h4>
              <p className="font-body text-[var(--color-axentra-gray)] text-sm">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--color-axentra-navy)] rounded-[16px] p-8 md:p-10 text-white grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-lg"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="space-y-1"
            >
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-axentra-sky)]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-body text-[var(--color-axentra-mist)]/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
