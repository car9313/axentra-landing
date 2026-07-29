"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, Clock, Tag } from "lucide-react";

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
  const [filter, setFilter] = useState<"All" | "AI & ML" | "Cloud & Security" | "Strategy">("All");

  const articles: InsightArticle[] = [
    {
      id: "rag-financial",
      category: "AI & ML",
      title: "Scaling RAG & Autonomous AI in Regulatory Environments",
      excerpt: "How enterprise financial institutions integrate retrieval-augmented generation without breaching data compliance or exposing internal models.",
      readTime: "6 min read",
      date: "July 2026",
      tag: "Whitepaper",
    },
    {
      id: "zero-trust-cloud",
      category: "Cloud & Security",
      title: "Zero-Trust Cloud Architecture Blueprints for 2026",
      excerpt: "A practical framework for implementing micro-perimeters, dynamic IAM policies, and encrypted data streams across multi-cloud infrastructure.",
      readTime: "8 min read",
      date: "June 2026",
      tag: "Architecture Guide",
    },
    {
      id: "event-microservices",
      category: "Strategy",
      title: "Sub-10ms Latency: Event-Driven Microservices in Practice",
      excerpt: "Decoupling monoliths into high-throughput Kafka and WebSockets streams to achieve near-instantaneous global state synchronization.",
      readTime: "5 min read",
      date: "May 2026",
      tag: "Technical Case Study",
    },
    {
      id: "automation-roi",
      category: "AI & ML",
      title: "Calculating the True ROI of Enterprise Automation",
      excerpt: "Key metrics and financial models executive teams use to evaluate robotic process automation investments before full deployment.",
      readTime: "7 min read",
      date: "May 2026",
      tag: "Executive Brief",
    },
  ];

  const filteredArticles = filter === "All" ? articles : articles.filter((a) => a.category === filter);

  return (
    <section id="insights" className="bg-[var(--color-axentra-mist)] py-16 md:py-24 border-t border-[var(--color-axentra-mist)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10 space-y-2">
          <span className="font-body text-[var(--color-axentra-blue)] font-semibold tracking-[0.1em] text-sm uppercase">
            INSIGHTS & THOUGHT LEADERSHIP
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-axentra-navy)]">
            Architectural Whitepapers & Technical Guides
          </h2>
          <p className="font-body text-[var(--color-axentra-gray)] max-w-xl mx-auto text-base">
            Expert analysis and technical blueprints curated by Axentra Systems lead systems engineers.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {(["All", "AI & ML", "Cloud & Security", "Strategy"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                filter === cat
                  ? "bg-[var(--color-axentra-blue)] text-white shadow-sm"
                  : "bg-white text-[var(--color-axentra-gray)] hover:text-[var(--color-axentra-navy)] border border-[var(--color-axentra-mist)]"
              }`}
            >
              {cat}
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
                <span>Read Full Article</span>
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
