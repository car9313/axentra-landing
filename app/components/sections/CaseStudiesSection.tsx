"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

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
  const caseStudies: CaseStudyItem[] = [
    {
      id: "financial-automation",
      title: "Enterprise Automation for Financial Services",
      stat: "Reduced manual effort by 60%.",
      clientCategory: "Fintech & Banking",
      impactDetail:
        "Automated complex compliance workflows, data aggregation pipelines, and customer auditing tasks while boosting operational accuracy to 99.8%.",
    },
    {
      id: "cloud-modernization",
      title: "Cloud Platform Modernization",
      stat: "Improved scalability and reliability.",
      clientCategory: "Global Logistics",
      impactDetail:
        "Migrated legacy monoliths to modern microservices architecture with zero downtime, lowering infrastructure costs by 35% and improving uptime to 99.99%.",
    },
    {
      id: "ai-operations",
      title: "AI-Driven Insights for Operations",
      stat: "Delivered actionable insights at scale.",
      clientCategory: "Industrial Manufacturing",
      impactDetail:
        "Deployed predictive maintenance algorithms and real-time telemetry dashboards, reducing unexpected equipment downtime by over 45%.",
    },
  ];

  return (
    <section id="case-studies" className="bg-[var(--color-axentra-mist)] py-16 md:py-24 border-t border-[var(--color-axentra-mist)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 md:mb-16">
          <span className="font-body text-[var(--color-axentra-section-title)] font-semibold tracking-[0.1em] text-sm uppercase">
            CASE STUDIES
          </span>
        </div>

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
                  <span>Read case study</span>
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
