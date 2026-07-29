"use client";

interface FooterProps {
  onOpenContact: () => void;
  onSelectNav: (sectionId: string) => void;
}

export function Footer({ onOpenContact, onSelectNav }: FooterProps) {
  return (
    <footer className="relative bg-[var(--color-axentra-navy)] text-white pt-16 pb-8 overflow-hidden select-none border-t border-white/10">

      <div
        className="absolute right-0 bottom-0 w-40 sm:w-80 md:w-[480px] h-40 sm:h-80 md:h-[420px] pointer-events-none opacity-10 sm:opacity-25"
        aria-hidden="true"
      >
        <svg viewBox="0 0 300 280" className="w-full h-full object-contain">
          <g id="footer-perspective-squares">
            {Array.from({ length: 12 }).map((_, r) => {
              const rowProgress = r / 11;
              const y = 40 + rowProgress * rowProgress * 200;
              return Array.from({ length: 12 }).map((_, c) => {
                const colProgress = c / 11;
                const x = 50 + colProgress * 220 + rowProgress * (colProgress - 0.5) * 80;
                const size = 5 + rowProgress * 10;
                const opacity = 0.1 + rowProgress * 0.7;
                return (
                  <rect
                    key={`ft-sq-${r}-${c}`}
                    x={x - size / 2}
                    y={y - size / 2}
                    width={size}
                    height={size}
                    fill="#5DA9FF"
                    stroke="#2563EB"
                    strokeWidth={0.5}
                    opacity={opacity}
                    transform={`rotate(${45 + r * 2} ${x} ${y})`}
                  />
                );
              });
            })}
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 pb-12">

          <div className="space-y-4">
            <a href="#" className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-6 bg-[var(--color-axentra-blue)] rounded-[2px]" />
                <span className="font-display font-black text-2xl tracking-tight text-white leading-none">
                  AXENTRA <span className="font-light text-[var(--color-axentra-sky)]">SYSTEMS</span>
                </span>
              </div>
              <span className="text-xs font-normal text-[var(--color-axentra-mist)]/70 tracking-normal mt-1 font-body">
                Where Intelligence Becomes Architecture
              </span>
            </a>
            <p className="text-xs text-[var(--color-axentra-mist)]/60 font-body leading-relaxed max-w-xs">
              Empowering enterprises with intelligent architecture, automated systems, and scalable cloud platforms.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-[var(--color-axentra-sky)] mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-[var(--color-axentra-mist)]/80">
              <li>
                <button onClick={() => onSelectNav("about")} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNav("careers")} className="hover:text-white transition-colors cursor-pointer">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNav("partners")} className="hover:text-white transition-colors cursor-pointer">
                  Partners
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-[var(--color-axentra-sky)] mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-[var(--color-axentra-mist)]/80">
              <li>
                <button onClick={() => onSelectNav("insights")} className="hover:text-white transition-colors cursor-pointer">
                  Insights
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNav("case-studies")} className="hover:text-white transition-colors cursor-pointer">
                  Case Studies
                </button>
              </li>
              <li>
                <button onClick={() => onSelectNav("blog")} className="hover:text-white transition-colors cursor-pointer">
                  Blog
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-sm uppercase tracking-wider text-[var(--color-axentra-sky)] mb-4">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm font-body text-[var(--color-axentra-mist)]/80">
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <a href="mailto:info@axentra.systems" className="hover:text-white transition-colors">
                  info@axentra.systems
                </a>
              </li>
              <li>
                <a href="https://axentra.systems" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  axentra.systems
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--color-axentra-mist)]/50 font-body gap-4">
          <p>© 2025 Axentra Systems LLC. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <button onClick={() => onSelectNav("privacy")} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => onSelectNav("terms")} className="hover:text-white transition-colors cursor-pointer">
              Terms of Service
            </button>
            <button onClick={() => onSelectNav("security")} className="hover:text-white transition-colors cursor-pointer">
              Security
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
