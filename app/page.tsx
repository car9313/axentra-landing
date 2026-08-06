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
import { useLanguage } from "@/lib/locale/hooks/useLanguage";

interface RawDetail {
  category: string;
  title: string;
  subtitle?: string;
  description: string;
  bullets?: string[];
  metrics?: { label: string; value: string }[];
  primaryAction?: string;
}

export default function Home() {
  const { t } = useLanguage();
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
    const data = t(`services:detail.${serviceId}`, {
      returnObjects: true,
    }) as unknown as RawDetail;

    setDetailModalContent({
      category: data.category,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      bullets: data.bullets,
      metrics: data.metrics,
      primaryActionLabel: data.primaryAction,
      onPrimaryAction: () => handleOpenContact(t(`services:detail.${serviceId}.title`)),
    });
  };

  const handleSelectProduct = (productName: string) => {
    if (productName === "Kallap") {
      const data = t("products:details.kallap", {
        returnObjects: true,
      }) as unknown as RawDetail;
      setDetailModalContent({
        category: data.category,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        bullets: data.bullets,
        metrics: data.metrics,
        primaryActionLabel: data.primaryAction,
        primaryActionHref: process.env.NEXT_PUBLIC_KALLAP_URL,
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
      category: t("modals:caseStudyCategory", { category: study.clientCategory }),
      title: study.title,
      subtitle: study.stat,
      description: study.impactDetail,
      bullets: t("caseStudies:detailBullets", { returnObjects: true }) as string[],
      primaryActionLabel: t("caseStudies:primaryAction"),
      onPrimaryAction: () =>
        handleOpenContact(t("modals:caseStudySubject", { title: study.title })),
    });
  };

  const handleExploreAllServices = () => {
    const data = t("services:exploreAllDetail", {
      returnObjects: true,
    }) as unknown as RawDetail;
    setDetailModalContent({
      category: data.category,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      bullets: data.bullets,
      primaryActionLabel: data.primaryAction,
      onPrimaryAction: () => handleOpenContact(t("modals:subjectFullCapabilities")),
    });
  };

  const handleSelectInsight = (article: { title: string; category: string; excerpt: string; tag: string }) => {
    setDetailModalContent({
      category: t("modals:insightCategory", { category: article.category }),
      title: article.title,
      subtitle: article.tag,
      description: article.excerpt,
      bullets: t("insights:detailBullets", { returnObjects: true }) as string[],
      primaryActionLabel: t("insights:primaryAction"),
      onPrimaryAction: () =>
        handleOpenContact(t("modals:insightSubject", { title: article.title })),
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

    const data = t(`modals:footerSections.${sectionKey}`, {
      returnObjects: true,
    }) as unknown as RawDetail;

    setDetailModalContent({
      category: data.category,
      title: data.title,
      subtitle: data.subtitle,
      description: data.description,
      bullets: data.bullets,
      primaryActionLabel: data.primaryAction,
      onPrimaryAction:
        sectionKey === "careers"
          ? () => handleOpenContact(t("modals:subjectCareer"))
          : undefined,
    });
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
