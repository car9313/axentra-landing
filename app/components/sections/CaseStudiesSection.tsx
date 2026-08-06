"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/lib/locale/hooks/useLanguage";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

interface CaseStudyItem {
  id: string;
  title: string;
  stat: string;
  clientCategory: string;
  impactDetail: string;
}

interface CaseStudiesSectionProps {
  onSelectCaseStudy: (study: CaseStudyItem) => void;
}

export function CaseStudiesSection({ onSelectCaseStudy }: CaseStudiesSectionProps) {
  const { t } = useLanguage();

  const caseStudies = t("caseStudies:items", {
    returnObjects: true,
  }) as unknown as CaseStudyItem[];

  return (
    <section id="case-studies" className="bg-[var(--color-axentra-mist)] py-16 md:py-24 border-t border-[var(--color-axentra-mist)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow={t("caseStudies:eyebrow")}
          title={t("caseStudies:title")}
          description={t("caseStudies:description")}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => onSelectCaseStudy(study)}
              onKeyDown={(e) => { if (e.key === 'Enter') onSelectCaseStudy(study); }}
              role="button"
              tabIndex={0}
              className="group bg-white rounded-[16px] p-6 sm:p-8 flex flex-col justify-between shadow-[0_1px_3px_rgba(10,29,58,0.06)] hover:shadow-[0_6px_20px_rgba(10,29,58,0.10)] transition-all duration-300 hover:-translate-y-1 cursor-pointer min-h-[220px] sm:min-h-[240px]"
            >
              <div className="space-y-4">
                <h3 className="font-display font-semibold text-xl text-[var(--color-axentra-navy)] leading-snug group-hover:text-[var(--color-axentra-blue)] transition-colors">
                  {study.title}
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] font-normal leading-relaxed">
                  {study.stat}
                </p>
              </div>
              <div className="mt-6 flex items-center">
                <span className="inline-flex items-center gap-1.5 font-body font-medium text-sm text-[var(--color-axentra-blue)] group-hover:text-[#1D4ED8] transition-colors">
                  <span>{t("caseStudies:readCaseStudy")}</span>
                  <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
