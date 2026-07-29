"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

interface HeroSectionProps {
  onOpenContact: () => void;
}

export function HeroSection({ onOpenContact }: HeroSectionProps) {
  return (
    <section className="relative bg-white pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-28 overflow-hidden border-b border-[var(--color-axentra-mist)]/60">

      {/* Ilustración: en desktop se posiciona absoluta respecto a TODO el section (no al contenedor con padding),
          para que pueda "salirse" del borde derecho de la pantalla y verse más grande */}
      <div className="hidden lg:flex absolute inset-y-0 right-0 w-[48%] xl:w-[44%] items-center justify-end pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-axentra-mist)] to-transparent -z-10 opacity-60 blur-2xl transform scale-95" />
        <motion.img
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          src="/hero-illustration.png"
          alt="Axentra network illustration"
          loading="eager"
          decoding="async"
          className="w-[135%] max-w-none object-contain translate-x-[6%] select-none"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">

          {/* Columna Izquierda: Texto y Llamada a la Acción */}
          <motion.div
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 space-y-6 md:space-y-8 text-left z-10"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="font-body text-[var(--color-axentra-blue)] tracking-[0.1em] font-semibold text-sm sm:text-base uppercase leading-snug">
                WHERE INTELLIGENCE<br />
                BECOMES ARCHITECTURE
              </span>
            </motion.div>

            <motion.h1
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-display text-[28px] sm:text-[44px] md:text-[52px] lg:text-[56px] font-extrabold text-[var(--color-axentra-navy)] leading-[1.12] tracking-tight"
            >
              Technology Consulting.<br />
              Intelligent Solutions.<br />
              <span className="text-[var(--color-axentra-navy)]">Measurable Impact.</span>
            </motion.h1>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-body text-[var(--color-axentra-gray)] max-w-2xl text-base sm:text-lg md:text-xl font-normal leading-relaxed"
            >
              We help organizations architect the future with intelligence, automation, and scalable platforms.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="pt-2"
            >
              <button
                onClick={onOpenContact}
                className="inline-flex items-center justify-center gap-3 bg-[var(--color-axentra-blue)] hover:bg-[#1D4ED8] text-white font-semibold text-base px-7 py-3.5 rounded-[10px] shadow-[0_4px_14px_rgba(37,99,235,0.25)] transition-all duration-200 hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>Let&apos;s Build Your Advantage</span>
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>

          {/* Columna Derecha en mobile/tablet: imagen normal, contenida (sin bleed, no hay espacio de sobra) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:hidden relative flex items-center justify-center min-h-[220px] sm:min-h-[320px] md:min-h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-axentra-mist)] to-transparent rounded-3xl -z-10 opacity-60 blur-2xl transform scale-95" />
            <img
              src="/hero-illustration.png"
              alt="Axentra network illustration"
              loading="eager"
              decoding="async"
              className="w-full h-full max-w-[420px] object-contain pointer-events-none select-none"
            />
          </motion.div>

          {/* Columna Derecha en desktop: espacio reservado vacío para mantener el grid de 12 columnas
              (la imagen real vive en el div absoluto de arriba, fuera del grid) */}
          <div className="hidden lg:block lg:col-span-5" aria-hidden="true" />

        </div>
      </div>
    </section>
  );
}