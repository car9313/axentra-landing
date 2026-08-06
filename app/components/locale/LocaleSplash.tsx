"use client";

import { motion } from "motion/react";

export function LocaleSplash() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    >
      <span className="flex flex-col items-start leading-none">
        <span className="font-display text-3xl font-extrabold tracking-[0.18em] text-axentra-navy">
          AXENTRA
        </span>
        <span className="mt-1 flex w-full items-center gap-1.5 text-[0.65rem] font-semibold tracking-[0.42em] text-axentra-gray">
          <span aria-hidden="true" className="h-px flex-1 bg-axentra-navy/30" />
          SYSTEMS
          <span aria-hidden="true" className="h-px flex-1 bg-axentra-navy/30" />
        </span>
      </span>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        className="mt-6 h-1 w-10 rounded-full bg-[var(--color-axentra-blue)]"
      />
    </motion.div>
  );
}