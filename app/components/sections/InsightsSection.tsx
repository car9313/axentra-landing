"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

import { useLanguage } from "@/lib/locale/hooks/useLanguage";
import { SectionHeader } from "@/app/components/ui/SectionHeader";

interface InsightArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  tag: string;
}

interface InsightsSectionProps {
  onSelectInsight: (article: InsightArticle) => void;
}

export function InsightsSection({ onSelectInsight }: InsightsSectionProps) {
  const { t } = useLanguage();

  const filters = t("insights:filters", {
    returnObjects: true,
  }) as unknown as Record<string, string>;

  const [filter, setFilter] = useState<string>(filters.All);

  const articles = t("insights:articles", {
    returnObjects: true,
  }) as unknown as InsightArticle[];

  const filteredArticles = filter === filters.All ? articles : articles.filter((a) => a.category === filter);

  return (
    <section id="insights" className="bg-[var(--color-axentra-mist)] py-16 md:py-24 border-t border-[var(--color-axentra-mist)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow={t("insights:eyebrow")}
          title={t("insights:title")}
          description={t("insights:description")}
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {Object.entries(filters).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(label)}
              aria-pressed={filter === label}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === label
                  ? "bg-[var(--color-axentra-blue)] text-white shadow-sm"
                  : "bg-white text-[var(--color-axentra-gray)] hover:text-[var(--color-axentra-navy)] border border-[var(--color-axentra-mist)]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
          {filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              onClick={() => onSelectInsight(article)}
              onKeyDown={(e) => { if (e.key === 'Enter') onSelectInsight(article); }}
              role="button"
              tabIndex={0}
              className="group bg-white rounded-[16px] p-6 sm:p-8 border border-[var(--color-axentra-mist)] shadow-[0_1px_3px_rgba(10,29,58,0.06)] hover:shadow-[0_6px_20px_rgba(10,29,58,0.10)] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-body text-[var(--color-axentra-gray)]">
                  <span className="inline-flex items-center gap-1 bg-[var(--color-axentra-mist)] text-[var(--color-axentra-blue)] px-2.5 py-1 rounded-[6px] font-semibold">
                    <Tag size={12} />
                    {article.tag}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-display font-semibold text-xl text-[var(--color-axentra-navy)] group-hover:text-[var(--color-axentra-blue)] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="font-body text-[var(--color-axentra-gray)] text-sm line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--color-axentra-mist)] flex items-center justify-between text-xs font-semibold text-[var(--color-axentra-blue)]">
                <span>{t("insights:readFullArticle")}</span>
                <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
