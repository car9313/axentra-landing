import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type ButtonVariant = "primary" | "link";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-3 py-1.5",
  md: "text-base px-5 py-2.5",
  lg: "text-lg px-6 py-3",
};

/**
 * Botón base de Axentra Systems.
 * variant="primary" → fondo axentra-blue, para CTAs principales (Hero, Contact).
 * variant="link"    → texto azul + flecha, para "Explore all services", "Read case study".
 */
export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  if (variant === "link") {
    return (
      <button
        className={`inline-flex items-center gap-1.5 font-medium text-[var(--color-axentra-blue)] hover:underline underline-offset-4 ${sizeClasses[size]} ${className}`}
        {...props}
      >
        {children}
        <ArrowRight className="icon-axentra size-4" strokeWidth={2} />
      </button>
    );
  }

  return (
    <button
      className={`inline-flex items-center justify-center rounded-[var(--radius-button)] bg-[var(--color-axentra-blue)] font-medium text-white transition-colors hover:bg-[var(--color-axentra-sky)] ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
