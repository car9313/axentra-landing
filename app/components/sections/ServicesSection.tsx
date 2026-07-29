"use client";

import { motion } from "motion/react";
import { Users, Code, Cpu, Cloud, ArrowRight } from "lucide-react";

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
  onExploreAll?: () => void;
}

export function ServicesSection({ onSelectService, onExploreAll }: ServicesSectionProps) {
  const services = [
    {
      id: "consulting",
      title: "Technology Consulting",
      description: "Strategy, architecture and digital transformation.",
      icon: <Users size={32} className="text-[var(--color-axentra-blue)]" strokeWidth={1.8} />,
    },
    {
      id: "software",
      title: "Intelligent Software",
      description: "Custom software engineered for outcomes.",
      icon: <Code size={30} className="text-[var(--color-axentra-blue)]" strokeWidth={2} />,
    },
    {
      id: "ai-automation",
      title: "AI & Automation",
      description: "AI-powered solutions and process automation.",
      icon: (
        <div className="relative flex items-center justify-center">
          <Cpu size={32} className="text-[var(--color-axentra-blue)]" strokeWidth={1.8} />
          <span className="absolute -top-1 -right-1 bg-[var(--color-axentra-blue)] text-white text-[9px] font-bold px-1 rounded">
            AI
          </span>
        </div>
      ),
    },
    {
      id: "cloud-data",
      title: "Cloud, Data & Platforms",
      description: "Modern-cloud, data platforms, and integration.",
      icon: <Cloud size={32} className="text-[var(--color-axentra-blue)]" strokeWidth={1.8} />,
    },
  ];

  return (
    <section id="services" className="bg-[var(--color-axentra-mist)] py-16 md:py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 md:mb-16">
          <span className="font-body text-[var(--color-axentra-section-title)] font-semibold tracking-[0.1em] text-sm uppercase">
            OUR SERVICES
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => onSelectService(service.id)}
              onKeyDown={(e) => { if (e.key === 'Enter') onSelectService(service.id); }}
              role="button"
              tabIndex={0}
              className="group bg-white rounded-[16px] p-6 text-center flex flex-col items-center justify-between shadow-[0_1px_3px_rgba(10,29,58,0.06)] hover:shadow-[0_6px_20px_rgba(10,29,58,0.10)] transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-transparent hover:border-[var(--color-axentra-blue)]/20 min-h-[220px] sm:min-h-[260px]"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--color-axentra-mist)] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-[var(--color-axentra-blue)]/10">
                  {service.icon}
                </div>
                <h3 className="font-display font-semibold text-xl text-[var(--color-axentra-navy)] leading-snug group-hover:text-[var(--color-axentra-blue)] transition-colors">
                  {service.title}
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] text-sm md:text-base line-clamp-2 max-w-[220px]">
                  {service.description}
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-[var(--color-axentra-blue)] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                Learn more <ArrowRight size={12} />
              </div>
            </motion.div>
          ))}
        </div>

        {onExploreAll && (
          <div className="mt-8 md:mt-10 flex justify-end">
            <button
              onClick={onExploreAll}
              className="inline-flex items-center gap-1.5 font-body font-medium text-sm md:text-base text-[var(--color-axentra-blue)] hover:text-[#1D4ED8] hover:underline transition-all cursor-pointer group"
            >
              <span>Explore all services</span>
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
