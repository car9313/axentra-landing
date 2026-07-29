"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Cpu, Layers, Target } from "lucide-react";

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<"mission" | "values" | "architecture">("mission");

  const stats = [
    { label: "Enterprise Architectures", value: "180+" },
    { label: "System Uptime SLA", value: "99.99%" },
    { label: "Global Markets Served", value: "14" },
    { label: "Client Retention Rate", value: "98%" },
  ];

  const pillars = [
    {
      icon: <Layers size={24} className="text-[var(--color-axentra-blue)]" />,
      title: "Scalable Systems",
      desc: "Resilient event-driven microservices engineered for zero downtime.",
    },
    {
      icon: <Cpu size={24} className="text-[var(--color-axentra-blue)]" />,
      title: "Applied Intelligence",
      desc: "Enterprise AI & autonomous workflows integrated safely into core business logic.",
    },
    {
      icon: <ShieldCheck size={24} className="text-[var(--color-axentra-blue)]" />,
      title: "Zero-Trust Governance",
      desc: "SOC2 compliant security frameworks safeguarding confidential corporate assets.",
    },
    {
      icon: <Target size={24} className="text-[var(--color-axentra-blue)]" />,
      title: "Measurable Impact",
      desc: "Direct alignment between technical investments and quantifiable ROI.",
    },
  ];

  return (
    <section id="about" className="bg-[var(--color-axentra-mist)] py-16 md:py-24 border-t border-[var(--color-axentra-mist)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 md:mb-16 space-y-2"
        >
          <span className="font-body text-[var(--color-axentra-blue)] font-semibold tracking-[0.1em] text-sm uppercase">
            ABOUT AXENTRA SYSTEMS
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-axentra-navy)]">
            Where Intelligence Becomes Architecture
          </h2>
          <p className="font-body text-[var(--color-axentra-gray)] max-w-2xl mx-auto text-base sm:text-lg">
            Axentra Systems is a B2B technology consulting and platform engineering partner. We transform complex technical challenges into competitive, intelligent assets.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto mb-12">
          <div role="tablist" aria-label="About Axentra" className="flex justify-center space-x-2 p-1.5 bg-[var(--color-axentra-mist)] rounded-[10px] max-w-full sm:max-w-md mx-auto">
            {(["mission", "values", "architecture"] as const).map((tab) => (
              <button
                key={tab}
                role="tab"
                aria-selected={activeTab === tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-[8px] text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-white text-[var(--color-axentra-blue)] shadow-[0_1px_3px_rgba(10,29,58,0.06)]"
                    : "text-[var(--color-axentra-gray)] hover:text-[var(--color-axentra-navy)]"
                }`}
              >
                {tab === "mission" && "Our Mission"}
                {tab === "values" && "Core Principles"}
                {tab === "architecture" && "Methodology"}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            role="tabpanel"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-6 sm:p-8 bg-[var(--color-axentra-mist)]/40 rounded-[16px] border border-[var(--color-axentra-mist)] text-center"
          >
            {activeTab === "mission" && (
              <div className="space-y-3 max-w-2xl mx-auto">
                <h3 className="font-display font-semibold text-xl text-[var(--color-axentra-navy)]">
                  Engineering the Enterprise Infrastructure of Tomorrow
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] text-sm sm:text-base leading-relaxed">
                  We believe true enterprise intelligence isn&apos;t just about adopting isolated tools — it&apos;s about building harmonious, resilient system architectures where data flows seamlessly, processes automate intelligently, and platforms scale infinitely.
                </p>
              </div>
            )}
            {activeTab === "values" && (
              <div className="space-y-3 max-w-2xl mx-auto">
                <h3 className="font-display font-semibold text-xl text-[var(--color-axentra-navy)]">
                  Precision, Reliability, and Absolute Transparency
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] text-sm sm:text-base leading-relaxed">
                  Every line of code and architectural blueprint we produce adheres to rigorous zero-trust benchmarks. We value engineering rigor over hype, delivering platforms built for long-term operational durability.
                </p>
              </div>
            )}
            {activeTab === "architecture" && (
              <div className="space-y-3 max-w-2xl mx-auto">
                <h3 className="font-display font-semibold text-xl text-[var(--color-axentra-navy)]">
                  The Axentra Systems Lifecycle
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] text-sm sm:text-base leading-relaxed">
                  1. Strategic Architectural Audit → 2. Domain & Data Modeling → 3. High-Throughput Engineering → 4. Automated CI/CD & AI Workflow Integration → 5. Continuous Optimization.
                </p>
              </div>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-[16px] p-6 border border-[var(--color-axentra-mist)] shadow-[0_1px_3px_rgba(10,29,58,0.06)] hover:shadow-[0_6px_20px_rgba(10,29,58,0.10)] transition-all"
            >
              <div className="w-12 h-12 rounded-[10px] bg-[var(--color-axentra-mist)] flex items-center justify-center mb-4">
                {pillar.icon}
              </div>
              <h4 className="font-display font-semibold text-lg text-[var(--color-axentra-navy)] mb-2">
                {pillar.title}
              </h4>
              <p className="font-body text-[var(--color-axentra-gray)] text-sm">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="bg-[var(--color-axentra-navy)] rounded-[16px] p-8 md:p-10 text-white grid grid-cols-2 lg:grid-cols-4 gap-8 text-center shadow-lg"
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.12 }}
              className="space-y-1"
            >
              <div className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-axentra-sky)]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-body text-[var(--color-axentra-mist)]/80">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
