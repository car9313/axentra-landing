export type LocaleId =
  | "en"
  | "es-LA"
  | "es-MX"
  | "es-AR"
  | "es-CL"
  | "es-CO"
  | "es-PE";

export interface LocaleInfo {
  id: LocaleId;
  label: string;
  flag: string;
  country: string;
  isDefault: boolean;
}

export type GeoResult =
  | { success: true; localeId: LocaleId; countryCode?: string }
  | {
      success: false;
      reason:
        | "timeout"
        | "rate_limited"
        | "network_error"
        | "unmapped_country"
        | "parse_error";
      /** País detectado (ISO alpha-2) para logs de decisión. */
      countryCode?: string;
    };

export type LocaleNamespace =
  | "common"
  | "navigation"
  | "hero"
  | "services"
  | "products"
  | "caseStudies"
  | "about"
  | "insights"
  | "contact"
  | "footer"
  | "modals";