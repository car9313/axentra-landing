"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Mail, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from "lucide-react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    capability: "Technology Consulting",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="bg-[var(--color-axentra-mist)] py-16 md:py-24 border-t border-[var(--color-axentra-mist)] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 space-y-2">
          <span className="font-body text-[var(--color-axentra-blue)] font-semibold tracking-[0.1em] text-sm uppercase">
            DIRECT CONTACT & ENGAGEMENT
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[var(--color-axentra-navy)]">
            Architecting Your Future Starts Here
          </h2>
          <p className="font-body text-[var(--color-axentra-gray)] max-w-xl mx-auto text-base">
            Reach out directly to connect with an Axentra Systems principal technology consultant.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 bg-[var(--color-axentra-mist)]/40 rounded-[16px] p-6 sm:p-8 border border-[var(--color-axentra-mist)] space-y-8"
          >
            <div className="space-y-3">
              <h3 className="font-display font-bold text-2xl text-[var(--color-axentra-navy)]">
                Enterprise Contact Hub
              </h3>
              <p className="font-body text-[var(--color-axentra-gray)] text-sm leading-relaxed">
                Whether you need a full enterprise architecture audit, custom AI integration, or high-scale platform engineering, our specialists respond within 24 hours.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[8px] bg-white border border-[var(--color-axentra-mist)] flex items-center justify-center text-[var(--color-axentra-blue)] flex-shrink-0 shadow-xs">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-axentra-gray)] uppercase tracking-wider font-body">Email Inquiry</div>
                  <a href="mailto:info@axentra.systems" className="text-sm font-semibold text-[var(--color-axentra-navy)] hover:text-[var(--color-axentra-blue)] transition-colors">
                    info@axentra.systems
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[8px] bg-white border border-[var(--color-axentra-mist)] flex items-center justify-center text-[var(--color-axentra-blue)] flex-shrink-0 shadow-xs">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-axentra-gray)] uppercase tracking-wider font-body">Global Footprint</div>
                  <div className="text-sm font-semibold text-[var(--color-axentra-navy)]">
                    Axentra Systems LLC
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-[8px] bg-white border border-[var(--color-axentra-mist)] flex items-center justify-center text-[var(--color-axentra-blue)] flex-shrink-0 shadow-xs">
                  <Clock size={18} />
                </div>
                <div>
                  <div className="text-xs font-semibold text-[var(--color-axentra-gray)] uppercase tracking-wider font-body">Response SLA</div>
                  <div className="text-sm font-semibold text-[var(--color-axentra-navy)]">
                    Guaranteed 24-Hour Business Turnaround
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--color-axentra-mist)] flex items-center gap-2 text-xs text-[var(--color-axentra-gray)]">
              <ShieldCheck size={16} className="text-[var(--color-axentra-blue)]" />
              <span>All communications strictly bound by NDA & SOC2 Privacy</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-white rounded-[16px] p-6 sm:p-8 border border-[var(--color-axentra-mist)] shadow-[0_1px_3px_rgba(10,29,58,0.06)]"
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      aria-required="true"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                      Business Email *
                    </label>
                    <input
                      type="email"
                      required
                      aria-required="true"
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                      Organization / Enterprise
                    </label>
                    <input
                      type="text"
                      placeholder="Acme Global Inc."
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                      Primary Capability Focus
                    </label>
                    <select
                      value={formData.capability}
                      onChange={(e) => setFormData({ ...formData, capability: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body bg-white transition-all"
                    >
                      <option value="Technology Consulting">Technology Consulting</option>
                      <option value="Intelligent Software">Intelligent Software</option>
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Cloud, Data & Platforms">Cloud, Data & Platforms</option>
                      <option value="Amauta Learning Platform">Amauta Adaptive Learning</option>
                      <option value="Kallap Career Platform">Kallap Career Opportunity</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--color-axentra-navy)] uppercase tracking-wider mb-1 font-body">
                    Project Scope or Inquiry Details
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your current system architecture, objectives, or timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-[6px] border border-[var(--color-axentra-mist)] focus:border-[var(--color-axentra-blue)] focus:ring-2 focus:ring-[var(--color-axentra-blue)]/20 text-sm text-[var(--color-axentra-navy)] outline-none font-body transition-all resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[var(--color-axentra-blue)] hover:bg-[#1D4ED8] text-white font-semibold py-3.5 px-6 rounded-[10px] text-sm shadow-[0_4px_14px_rgba(37,99,235,0.25)] transition-all cursor-pointer"
                  >
                    <span>Submit Strategic Inquiry</span>
                    <Send size={16} />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[var(--color-axentra-mist)] text-[var(--color-axentra-blue)] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display font-bold text-2xl text-[var(--color-axentra-navy)]">
                  Inquiry Successfully Received
                </h3>
                <p className="font-body text-[var(--color-axentra-gray)] text-sm max-w-sm mx-auto">
                  Thank you, <strong className="text-[var(--color-axentra-navy)]">{formData.name || "valued partner"}</strong>. An Axentra Systems lead architect will review your project brief and reply within 24 business hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-[var(--color-axentra-mist)] text-[var(--color-axentra-blue)] text-xs font-semibold px-5 py-2 rounded-[8px] hover:bg-[var(--color-axentra-blue)] hover:text-white transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
