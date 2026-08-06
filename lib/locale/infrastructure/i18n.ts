import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import { DEFAULT_LOCALE } from "../domain/locale.constants";
import esLACommon from "./resources/es-LA/common.json";
import esLANavigation from "./resources/es-LA/navigation.json";
import esLAHero from "./resources/es-LA/hero.json";
import esLAServices from "./resources/es-LA/services.json";
import esLAProducts from "./resources/es-LA/products.json";
import esLACaseStudies from "./resources/es-LA/caseStudies.json";
import esLAAbout from "./resources/es-LA/about.json";
import esLAInsights from "./resources/es-LA/insights.json";
import esLAContact from "./resources/es-LA/contact.json";
import esLAFooter from "./resources/es-LA/footer.json";
import esLAModals from "./resources/es-LA/modals.json";
import enCommon from "./resources/en/common.json";
import enNavigation from "./resources/en/navigation.json";
import enHero from "./resources/en/hero.json";
import enServices from "./resources/en/services.json";
import enProducts from "./resources/en/products.json";
import enCaseStudies from "./resources/en/caseStudies.json";
import enAbout from "./resources/en/about.json";
import enInsights from "./resources/en/insights.json";
import enContact from "./resources/en/contact.json";
import enFooter from "./resources/en/footer.json";
import enModals from "./resources/en/modals.json";

const esLAResources = {
  common: esLACommon,
  navigation: esLANavigation,
  hero: esLAHero,
  services: esLAServices,
  products: esLAProducts,
  caseStudies: esLACaseStudies,
  about: esLAAbout,
  insights: esLAInsights,
  contact: esLAContact,
  footer: esLAFooter,
  modals: esLAModals,
};

const enResources = {
  common: enCommon,
  navigation: enNavigation,
  hero: enHero,
  services: enServices,
  products: enProducts,
  caseStudies: enCaseStudies,
  about: enAbout,
  insights: enInsights,
  contact: enContact,
  footer: enFooter,
  modals: enModals,
};

const initPromise = i18next.use(initReactI18next).init({
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  resources: {
    [DEFAULT_LOCALE]: esLAResources,
    en: enResources,
  },
  interpolation: {
    escapeValue: false,
  },
  ns: Object.keys(enResources),
  defaultNS: "common",
  returnObjects: true,
});

void initPromise;

export { esLAResources, enResources };
export type EsLAResources = typeof esLAResources;
export type EnResources = typeof enResources;
export default i18next;
