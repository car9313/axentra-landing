"use client";

import { useState, useEffect } from "react";
import { Navbar } from "./components/sections/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { ServicesSection } from "./components/sections/ServicesSection";
import { ProductsSection } from "./components/sections/ProductsSection";
import { CaseStudiesSection } from "./components/sections/CaseStudiesSection";
import { AboutSection } from "./components/sections/AboutSection";
import { InsightsSection } from "./components/sections/InsightsSection";
import { ContactSection } from "./components/sections/ContactSection";
import { CTABanner } from "./components/sections/CTABanner";
import { Footer } from "./components/sections/Footer";
import { ContactModal } from "./components/modals/ContactModal";
import { DetailModal, type DetailContent } from "./components/modals/DetailModal";

export default function Home() {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [prefilledSubject, setPrefilledSubject] = useState("");
  const [detailModalContent, setDetailModalContent] = useState<DetailContent | null>(null);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["services", "products", "case-studies", "about", "insights", "contact"];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        setActiveSection("contact");
        return;
      }

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
      if (window.scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleOpenContact = (subject = "") => {
    setPrefilledSubject(subject);
    setContactModalOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    const serviceMap: Record<string, DetailContent> = {
      consulting: {
        category: "Our Services",
        title: "Technology Consulting",
        subtitle: "Strategy, Architecture, and Digital Transformation",
        description:
          "We partner with enterprise executive teams to define clear, high-impact technology roadmaps. From technical debt reduction to modern cloud governance, we align system architecture with core business outcomes.",
        bullets: [
          "Enterprise Architecture Audits & Modernization",
          "Cloud Governance & Multi-Cloud Strategy",
          "AI Feasibility & Integration Roadmaps",
          "Legacy System Refactoring & Decoupling",
        ],
        metrics: [
          { label: "Avg Efficiency Boost", value: "40%" },
          { label: "ROI Timeline", value: "< 6 Mos" },
        ],
        primaryActionLabel: "Consult with Experts",
        onPrimaryAction: () => handleOpenContact("Technology Consulting"),
      },
      software: {
        category: "Our Services",
        title: "Intelligent Software",
        subtitle: "Custom Software Engineered for High-Scale Outcomes",
        description:
          "Our engineering teams craft mission-critical software solutions designed for security, ultra-low latency, and effortless horizontal scalability.",
        bullets: [
          "Event-Driven Microservices Architecture",
          "High-Throughput API Gateway Engineering",
          "Real-time Data Processing & Analytics",
          "End-to-End Enterprise System Integration",
        ],
        metrics: [
          { label: "System Uptime SLA", value: "99.99%" },
          { label: "Response Latency", value: "< 50ms" },
        ],
        primaryActionLabel: "Build Custom Software",
        onPrimaryAction: () => handleOpenContact("Intelligent Software"),
      },
      "ai-automation": {
        category: "Our Services",
        title: "AI & Automation",
        subtitle: "AI-Powered Process Automation & Autonomous Intelligence",
        description:
          "Unlock trapped productivity across your organization. We deploy custom machine learning models, retrieval-augmented generation (RAG) engines, and robotic process automation (RPA) workflows.",
        bullets: [
          "Custom LLM Fine-Tuning & RAG Pipelines",
          "Intelligent Document & Data Extraction",
          "Automated Predictive Workflow Engines",
          "Autonomous Agent Swarm Integration",
        ],
        metrics: [
          { label: "Manual Effort Saved", value: "60%+" },
          { label: "Accuracy Improvement", value: "99.5%" },
        ],
        primaryActionLabel: "Deploy AI Workflows",
        onPrimaryAction: () => handleOpenContact("AI & Automation"),
      },
      "cloud-data": {
        category: "Our Services",
        title: "Cloud, Data & Platforms",
        subtitle: "Modern Cloud Infrastructure & High-Performance Data Warehousing",
        description:
          "Streamline your data stack and modernize cloud infrastructure. We build automated CI/CD pipelines, zero-trust cloud perimeters, and real-time streaming data lakes.",
        bullets: [
          "Infrastructure-as-Code (Terraform, Pulumi)",
          "Distributed Streaming (Kafka, Flink, BigQuery)",
          "Zero-Trust Security & SOC2 Compliance",
          "Kubernetes & Serverless Deployment Pipelines",
        ],
        metrics: [
          { label: "Cost Reduction", value: "35%" },
          { label: "Deployment Speed", value: "10x" },
        ],
        primaryActionLabel: "Modernize Cloud Platform",
        onPrimaryAction: () => handleOpenContact("Cloud, Data & Platforms"),
      },
    };

    if (serviceMap[serviceId]) {
      setDetailModalContent(serviceMap[serviceId]);
    }
  };

  const handleSelectProduct = (productName: string) => {
    if (productName === "Amauta") {
      setDetailModalContent({
        category: "Product Suite",
        title: "Amauta",
        subtitle: "A Smarter Way to Grow — Adaptive Learning Product",
        description:
          "Amauta is Axentra Systems flagship adaptive learning platform engineered for enterprise upskilling and organizational knowledge synthesis. Powered by cognitive ML models, Amauta dynamically adjusts skill pathways based on employee performance data.",
        bullets: [
          "Adaptive Competency Mapping & Skill Graphs",
          "Generative AI Tutor & Contextual Practice Scenarios",
          "Enterprise HRIS & LMS Integration API",
          "Real-time Skill Gap Analytics for Executive Teams",
        ],
        metrics: [
          { label: "Retention Rate", value: "3.2x" },
          { label: "Time to Competency", value: "-45%" },
        ],
        primaryActionLabel: "Request Amauta Demo",
        onPrimaryAction: () => handleOpenContact("Amauta Product Demo"),
      });
    } else if (productName === "Kallap") {
      setDetailModalContent({
        category: "Product Suite",
        title: "Kallap",
        subtitle: "Dreams Become Direction — Career Opportunity Product",
        description:
          "Kallap bridges talent potential with enterprise opportunities. Using intelligent matching algorithms and career path trajectory mapping, Kallap connects professionals with high-impact roles and growth trajectories inside leading enterprises.",
        bullets: [
          "AI-Powered Talent Vector Matching Engine",
          "Predictive Career Trajectory & Promotion Analytics",
          "Internal Mobility & Cross-Functional Project Staffing",
          "Diversity & Equitable Skills Assessment Metrics",
        ],
        metrics: [
          { label: "Match Precision", value: "94%" },
          { label: "Internal Mobility", value: "+50%" },
        ],
        primaryActionLabel: "Request Kallap Briefing",
        onPrimaryAction: () => handleOpenContact("Kallap Product Briefing"),
      });
    }
  };

  const handleSelectCaseStudy = (study: {
    title: string;
    stat: string;
    impactDetail: string;
    clientCategory: string;
  }) => {
    setDetailModalContent({
      category: `Case Study \u2022 ${study.clientCategory}`,
      title: study.title,
      subtitle: study.stat,
      description: study.impactDetail,
      bullets: [
        "Architectured custom, scalable enterprise platform",
        "Eliminated manual bottlenecks and data silos",
        "Delivered transparent real-time metrics and executive dashboarding",
        "Ensured full compliance and zero-downtime migration",
      ],
      primaryActionLabel: "Discuss Similar Solution",
      onPrimaryAction: () => handleOpenContact(`Case Study Inquiry: ${study.title}`),
    });
  };

  const handleExploreAllServices = () => {
    setDetailModalContent({
      category: "Capabilities Overview",
      title: "Axentra Systems Service Matrix",
      subtitle: "End-to-End B2B Architecture Capabilities",
      description:
        "Axentra Systems delivers end-to-end consulting and engineering services spanning initial strategic assessment to cloud platform implementation and ongoing continuous intelligence.",
      bullets: [
        "Strategic Technology Consulting & Roadmap Planning",
        "Custom Intelligent Software Development",
        "Enterprise AI & Robotic Process Automation",
        "Cloud Infrastructure Modernization & Migration",
        "Data Engineering, ETL Pipelines & Real-time Analytics",
        "DevOps, Infrastructure as Code & Continuous Security",
      ],
      primaryActionLabel: "Schedule Full Capabilities Briefing",
      onPrimaryAction: () => handleOpenContact("Full Capabilities Briefing"),
    });
  };

  const handleSelectInsight = (article: { title: string; category: string; excerpt: string; tag: string }) => {
    setDetailModalContent({
      category: `Thought Leadership \u2022 ${article.category}`,
      title: article.title,
      subtitle: article.tag,
      description: article.excerpt,
      bullets: [
        "Comprehensive analysis of enterprise architectural impacts",
        "Practical implementation blueprints and code references",
        "Risk mitigation strategies for high-scale cloud platforms",
        "Benchmarked metrics from real enterprise deployments",
      ],
      primaryActionLabel: "Discuss Article with Architect",
      onPrimaryAction: () => handleOpenContact(`Insight Discussion: ${article.title}`),
    });
  };

  const handleSelectFooterNav = (sectionKey: string) => {
    const scrollableSections = ["about", "services", "products", "case-studies", "insights", "contact"];
    if (scrollableSections.includes(sectionKey)) {
      const el = document.getElementById(sectionKey);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }

    const sectionInfoMap: Record<string, DetailContent> = {
      careers: {
        category: "Join Our Team",
        title: "Careers at Axentra Systems",
        subtitle: "Build the Future of Enterprise Technology",
        description:
          "We are always looking for exceptional software architects, AI engineers, cloud infrastructure specialists, and technical strategists.",
        bullets: [
          "Principal Cloud Architect (Remote)",
          "Senior Machine Learning / RAG Specialist",
          "Lead Full-Stack Systems Engineer (TypeScript/React/Node)",
        ],
        primaryActionLabel: "Submit Candidate Profile",
        onPrimaryAction: () => handleOpenContact("Career Application"),
      },
      partners: {
        category: "Ecosystem",
        title: "Axentra Systems Partner Network",
        subtitle: "Strategic Technology Alliance Partners",
        description:
          "We collaborate closely with leading cloud providers and AI research institutions to deliver cutting-edge solutions.",
        bullets: ["Google Cloud Premier Partner", "AWS Advanced Consulting Partner", "Enterprise AI Alliance"],
      },
      blog: {
        category: "Publications",
        title: "Engineering Blog",
        subtitle: "Technical Articles & Case Breakdown",
        description:
          "Deep dives written directly by our lead software architects and data engineers on building resilient platforms.",
        bullets: ["Building Performant React & Node Architectures", "Optimizing Microservice Latency to < 10ms"],
      },
      privacy: {
        category: "Legal & Compliance",
        title: "Privacy Policy",
        description:
          "Axentra Systems LLC is committed to protecting user and client data. We adhere strictly to global data protection laws including GDPR and CCPA.",
      },
      terms: {
        category: "Legal & Compliance",
        title: "Terms of Service",
        description:
          "By accessing Axentra Systems services or websites, you agree to comply with our enterprise service terms and conditions.",
      },
      security: {
        category: "Trust & Governance",
        title: "Security & Compliance",
        subtitle: "SOC 2 Type II Certified Architecture",
        description:
          "We incorporate zero-trust architectural principles into every engineering deliverable. All code and infrastructure configurations undergo rigorous static analysis and penetration testing.",
      },
    };

    if (sectionInfoMap[sectionKey]) {
      setDetailModalContent(sectionInfoMap[sectionKey]);
    }
  };

  return (
    <div className="min-h-screen bg-white text-[var(--color-axentra-navy)] flex flex-col font-body selection:bg-[var(--color-axentra-blue)] selection:text-white">
      <Navbar onOpenContact={() => handleOpenContact()} activeSection={activeSection} />

      <main id="main-content" className="flex-grow">
        <HeroSection onOpenContact={() => handleOpenContact()} />
        <ServicesSection
          onSelectService={handleSelectService}
          onExploreAll={handleExploreAllServices}
        />
        <ProductsSection onSelectProduct={handleSelectProduct} />
        <CaseStudiesSection onSelectCaseStudy={handleSelectCaseStudy} />
        <AboutSection />
        <InsightsSection onSelectInsight={handleSelectInsight} />
        <ContactSection />
        <CTABanner onOpenContact={() => handleOpenContact()} />
      </main>

      <Footer
        onOpenContact={() => handleOpenContact()}
        onSelectNav={handleSelectFooterNav}
      />

      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        prefilledSubject={prefilledSubject}
      />

      <DetailModal
        content={detailModalContent}
        onClose={() => setDetailModalContent(null)}
      />
    </div>
  );
}
