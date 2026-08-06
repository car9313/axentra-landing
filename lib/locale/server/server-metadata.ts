import type { LocaleId } from "../domain/locale.types";

interface ServerMetadata {
  title: string;
  description: string;
}

const METADATA_BY_LOCALE: Record<LocaleId, ServerMetadata> = {
  en: {
    title: "Axentra Systems — Where Intelligence Becomes Architecture",
    description:
      "Technology consulting, intelligent software, AI & automation, and cloud platforms for enterprises.",
  },
  "es-LA": {
    title: "Axentra Systems — Donde la inteligencia se convierte en arquitectura",
    description:
      "Consultoría tecnológica, software inteligente, IA y automatización, y plataformas cloud para empresas.",
  },
  "es-MX": {
    title: "Axentra Systems — Donde la inteligencia se convierte en arquitectura",
    description:
      "Consultoría tecnológica, software inteligente, IA y automatización, y plataformas cloud para empresas.",
  },
  "es-AR": {
    title: "Axentra Systems — Donde la inteligencia se convierte en arquitectura",
    description:
      "Consultoría tecnológica, software inteligente, IA y automatización, y plataformas cloud para empresas.",
  },
  "es-CL": {
    title: "Axentra Systems — Donde la inteligencia se convierte en arquitectura",
    description:
      "Consultoría tecnológica, software inteligente, IA y automatización, y plataformas cloud para empresas.",
  },
  "es-CO": {
    title: "Axentra Systems — Donde la inteligencia se convierte en arquitectura",
    description:
      "Consultoría tecnológica, software inteligente, IA y automatización, y plataformas cloud para empresas.",
  },
  "es-PE": {
    title: "Axentra Systems — Donde la inteligencia se convierte en arquitectura",
    description:
      "Consultoría tecnológica, software inteligente, IA y automatización, y plataformas cloud para empresas.",
  },
};

export function getMetadataForLocale(locale: LocaleId): ServerMetadata {
  return METADATA_BY_LOCALE[locale];
}