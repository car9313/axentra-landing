"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { X, CheckCircle2, ArrowRight } from "lucide-react";

export interface DetailContent {
  title: string;
  category: string;
  subtitle?: string;
  description: string;
  bullets?: string[];
  metrics?: { label: string; value: string }[];
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
}

interface DetailModalProps {
  content: DetailContent | null;
  onClose: () => void;
}

export function DetailModal({ content, onClose }: DetailModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!content) return;
    const prev = document.activeElement as HTMLElement | null;
    const timeout = setTimeout(() => {
      dialogRef.current?.focus();
    }, 50);
    return () => {
      clearTimeout(timeout);
      prev?.focus();
    };
  }, [content]);

  if (!content) return null;

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
        aria-label={content.title}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-[16px] max-w-xl w-full p-4 sm:p-8 relative shadow-2xl border border-[var(--color-axentra-mist)] max-h-[90vh] overflow-y-auto outline-none"
      >

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[var(--color-axentra-gray)] hover:text-[var(--color-axentra-navy)] rounded-full hover:bg-[var(--color-axentra-mist)] transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="space-y-5">
          <div className="space-y-1 pr-6">
            <span className="font-body text-[var(--color-axentra-blue)] text-xs font-semibold uppercase">
              {content.category}
            </span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-axentra-navy)]">
              {content.title}
            </h3>
            {content.subtitle && (
              <p className="text-base font-medium text-[var(--color-axentra-blue)] font-body">
                {content.subtitle}
              </p>
            )}
          </div>

          <p className="font-body text-[var(--color-axentra-gray)] text-sm sm:text-base leading-relaxed">
            {content.description}
          </p>

          {content.metrics && content.metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-3 p-4 bg-[var(--color-axentra-mist)]/50 rounded-[10px] border border-[var(--color-axentra-mist)]">
              {content.metrics.map((m, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="font-display font-extrabold text-2xl text-[var(--color-axentra-navy)]">
                    {m.value}
                  </div>
                  <div className="text-xs text-[var(--color-axentra-gray)] font-body">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {content.bullets && content.bullets.length > 0 && (
            <div className="space-y-2 pt-1">
              <h4 className="text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider font-body">
                Key Features & Architectural Deliverables
              </h4>
              <ul className="space-y-2">
                {content.bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[var(--color-axentra-navy)] font-body">
                    <CheckCircle2 size={16} className="text-[var(--color-axentra-blue)] flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="pt-4 border-t border-[var(--color-axentra-mist)] flex items-center justify-between">
            <button
              onClick={onClose}
              className="text-sm font-medium text-[var(--color-axentra-gray)] hover:text-[var(--color-axentra-navy)] transition-colors cursor-pointer"
            >
              Close
            </button>
            {content.primaryActionLabel && content.onPrimaryAction && (
              <button
                onClick={() => {
                  onClose();
                  content.onPrimaryAction?.();
                }}
                className="inline-flex items-center gap-2 bg-[var(--color-axentra-blue)] hover:bg-[#1D4ED8] text-white text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-all cursor-pointer"
              >
                <span>{content.primaryActionLabel}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
