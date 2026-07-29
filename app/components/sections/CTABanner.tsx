"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface CTABannerProps {
  onOpenContact: () => void;
}

export function CTABanner({ onOpenContact }: CTABannerProps) {
  return (
    <section className="bg-[var(--color-axentra-mist)] py-12 md:py-16 border-t border-[var(--color-axentra-mist)]/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-[16px] p-8 sm:p-10 md:p-12 shadow-[0_1px_3px_rgba(10,29,58,0.06)] border border-[var(--color-axentra-mist)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8"
        >

          <div className="space-y-2 max-w-2xl">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-[var(--color-axentra-navy)] leading-tight">
              Let&apos;s architect what&apos;s next—together.
            </h2>
            <p className="font-body text-[var(--color-axentra-gray)] text-base sm:text-lg font-normal">
              Book a consultation with our experts.
            </p>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto">
            <button
              onClick={onOpenContact}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[var(--color-axentra-blue)] hover:bg-[#1D4ED8] text-white font-semibold text-base px-8 py-3.5 rounded-[10px] shadow-[0_1px_3px_rgba(10,29,58,0.06)] transition-all duration-200 hover:shadow-[0_4px_14px_rgba(37,99,235,0.3)] active:scale-[0.98] cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight size={18} />
            </button>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
