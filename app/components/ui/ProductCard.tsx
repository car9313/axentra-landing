import { type ReactNode } from "react";

interface ProductCardProps {
  productName: string;
  tagline: string;
  badgeLabel: string;
  theme: "light" | "dark";
  href: string;
  illustration?: ReactNode;
  badgeAccent?: string;
}

export function ProductCard({
  productName,
  tagline,
  badgeLabel,
  theme,
  href,
  illustration,
  badgeAccent = "bg-[var(--color-axentra-mist)] text-[var(--color-axentra-blue)]",
}: ProductCardProps) {
  const isDark = theme === "dark";

  return (
    <a
      href={href}
      className={`group relative overflow-hidden rounded-[var(--radius-card)] p-6 shadow-[var(--shadow-axentra-card)] transition-transform hover:-translate-y-1 ${
        isDark
          ? "bg-[var(--color-axentra-navy)] text-white"
          : "bg-white text-[var(--color-axentra-navy)]"
      }`}
    >
      {illustration && <div className="mb-4">{illustration}</div>}

      <h3 className="font-[var(--font-display)] text-2xl font-bold">
        {productName}
      </h3>

      <p
        className={`mt-1 text-sm ${
          isDark ? "text-white/70" : "text-[var(--color-axentra-gray)]"
        }`}
      >
        {tagline}
      </p>

      <span
        className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium ${badgeAccent}`}
      >
        {badgeLabel}
      </span>
    </a>
  );
}
