"use client";

import { motion } from "motion/react";

import { useLanguage } from "@/lib/locale/hooks/useLanguage";
import { SectionHeader } from "@/app/components/ui/SectionHeader";


interface ProductsSectionProps {
  onSelectProduct: (productName: string) => void;
}

export function ProductsSection({ onSelectProduct }: ProductsSectionProps) {
  const { t } = useLanguage();
  return (
    <section id="products" className="bg-axentra-mist py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        <SectionHeader
          eyebrow={t("products:eyebrow")}
          title={t("products:title")}
          description={t("products:description")}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          <motion.a
            href={process.env.NEXT_PUBLIC_AMAUTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0 }}
            className="group relative bg-white rounded-[16px] border border-axentra-mist p-6 md:p-8 shadow-[0_1px_3px_rgba(10,29,58,0.06)] hover:shadow-[0_6px_20px_rgba(10,29,58,0.10)] transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="absolute right-0 bottom-0 w-3/5 h-full pointer-events-none opacity-40 group-hover:opacity-60 transition-opacity">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <g stroke="#2563EB" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.25">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <path key={`grid-h-${i}`} d={`M 0 ${i * 25} Q 100 ${i * 28 + 10} 200 ${i * 32}`} />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <path key={`grid-v-${i}`} d={`M ${i * 25} 0 Q ${i * 28 + 10} 100 ${i * 32} 200`} />
                  ))}
                </g>
              </svg>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 shrink-0 p-1 flex items-center justify-center">
                <img
                  src="/amauta-mascot.png"
                  alt={t("products:amauta.mascotAlt")}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-5xl sm:text-6xl font-extrabold tracking-tight leading-none bg-clip-text text-transparent"
                  style={{
                    backgroundImage: "linear-gradient(to right, #0A1D3A 0%, #2563EB 16%, #2563EB 33%, #F5A623 45%, #F4701F 60%)",
                    WebkitBackgroundClip: "text",
                  }}>
                  Amauta
                </h3>
                <p className="font-body text-axentra-gray text-lg font-medium">
                  {t("products:amauta.tagline")}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-axentra-mist flex items-center relative z-10">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-md border border-axentra-blue text-axentra-blue text-xs font-semibold font-body bg-white shadow-xs">
                {t("products:amauta.badge")}
              </span>
            </div>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 }}
            onClick={() => onSelectProduct("Kallap")}
            onKeyDown={(e) => { if (e.key === 'Enter') onSelectProduct("Kallap"); }}
            role="button"
            tabIndex={0}
            className="group relative bg-white rounded-[16px] border border-axentra-mist p-6 sm:p-8 md:p-10 shadow-[0_1px_3px_rgba(10,29,58,0.06)] hover:shadow-[0_6px_20px_rgba(10,29,58,0.10)] transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden flex flex-col"
          >
            <div className="absolute right-0 bottom-0 w-3/5 h-full pointer-events-none opacity-35 group-hover:opacity-55 transition-opacity">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <g fill="#2563EB" opacity="0.3">
                  {Array.from({ length: 9 }).map((_, r) =>
                    Array.from({ length: 9 }).map((_, c) => (
                      <circle
                        key={`dot-${r}-${c}`}
                        cx={40 + c * 20 + r * 2}
                        cy={30  + r * 20}
                        r={1 + (r + c) * 0.35}
                      />
                    ))
                  )}
                </g>
              </svg>
            </div>

            <div className="space-y-3 relative z-10">
              <h3 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-axentra-navy tracking-tight">
                Kallap
              </h3>
              <p className="font-body text-axentra-gray text-lg font-normal">
                {t("products:kallap.tagline")}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-axentra-mist flex items-center relative z-10">
              <span className="inline-flex items-center px-3.5 py-1.5 rounded-md border border-axentra-blue text-axentra-blue text-xs font-semibold font-body bg-white shadow-xs">
                {t("products:kallap.badge")}
              </span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}