import { motion } from "motion/react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.5 },
};

export function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <motion.div
      {...fadeUp}
      className="text-center mb-12 md:mb-16 space-y-2"
    >
      <span className="font-body text-[var(--color-axentra-blue)] font-semibold tracking-[0.1em] text-sm uppercase">
        {eyebrow}
      </span>
      <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-axentra-navy)]">
        {title}
      </h2>
      {description && (
        <p className="font-body text-[var(--color-axentra-gray)] max-w-xl mx-auto text-base">
          {description}
        </p>
      )}
    </motion.div>
  );
}