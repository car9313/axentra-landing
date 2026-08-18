# Replicar cambios de i18n por geolocalización (delta)

**Objetivo:** portar a otro proyecto Next.js (16+) los cambios de internacionalización hechos en esta landing. Es el **delta** respecto a la guía general [`GUIDE.md`](../GUIDE.md) — la guía explica el diseño completo; este documento lista qué archivos tocar y qué código usar.

---

## Contexto: qué se corrigió

1. **La geo client-side nunca corría si existía cookie/SSR** → un visitante que viajó de EE.UU. (cookie `en`) a Colombia quedaba en inglés para siempre: el servidor leía la cookie antes que la geo y el cliente re-persistía la cookie vieja (bucle).
2. **El SSR prefería la cookie sobre la decisión fresca del proxy** → primer paint con idioma viejo al cambiar de país.
3. **Países sin traducción regional** (CU, VE, NG…) caían al idioma del navegador en vez del idioma de su país.

## Resultado esperado

- La geo **siempre** se ejecuta en el navegador y **gana** sobre cookie/SSR/navegador (independiente del hosting).
- Solo se re-traduce si la geo difiere del idioma actual (no-op si coincide).
- País sin traducción regional → `es-LA`/`en` según el idioma de su país; la traducción propia de un país (p. ej. `es-CO`) nunca se degrada al default.
- Logs de decisión en consola (solo dev).

---

## Archivos a tocar (6)

### 1. NUEVO `lib/locale/domain/locale-languages.ts`

```ts
import type { LocaleId } from "./locale.types";
import { DEFAULT_LOCALE } from "./locale.constants";

/** Países sin traducción regional pero con español oficial/dominante. ISO 3166-1 alpha-2. */
export const SPANISH_COUNTRIES: ReadonlySet<string> = new Set([
  "ES", "MX", "CO", "AR", "PE", "VE", "CL", "EC", "GT", "CU",
  "BO", "DO", "HN", "PY", "SV", "NI", "CR", "PA", "UY", "PR", "GQ",
]);

/** Países sin traducción regional pero con inglés oficial/dominante. */
export const ENGLISH_COUNTRIES: ReadonlySet<string> = new Set([
  "US", "GB", "CA", "AU", "NZ", "IE", "IN", "ZA",
  "NG", "GH", "KE", "PH", "SG", "JM", "TT", "BS", "BB", "GY",
  "PK", "LK", "ZM", "ZW", "UG", "TZ",
]);

/**
 * Idioma de respaldo para un país SIN traducción regional.
 * Solo se consulta tras fallar `LOCALE_MAP`: nunca reemplaza la traducción propia.
 */
export function fallbackLocaleForCountry(countryCode: string | null | undefined): LocaleId | null {
  if (!countryCode) return null;
  const normalized = countryCode.trim().toUpperCase();
  if (SPANISH_COUNTRIES.has(normalized)) return DEFAULT_LOCALE;
  if (ENGLISH_COUNTRIES.has(normalized)) return "en";
  return null;
}
```

> Ajusta las listas al público de tu landing (agrega `BR`, `PT` si soportas portugués, etc.).

### 2. `lib/locale/domain/locale.config.ts` — `LOCALE_MAP` solo regional

Los países hispanohablantes que estaban en el mapa apuntando a `es-LA` (CU, VE, BO, EC, PY, UY, CR, GT, HN, SV, NI, PA, DO, PR…) ahora los cubre `locale-languages.ts`. Resultado idéntico, una sola fuente de verdad:

```ts
export const LOCALE_MAP: Record<string, LocaleInfo["id"]> = {
  MX: "es-MX",
  AR: "es-AR",
  CL: "es-CL",
  CO: "es-CO",
  PE: "es-PE",
  US: "en",
};
```

### 3. `lib/locale/domain/locale.types.ts` — `GeoResult` con país

```ts
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
```

### 4. `lib/locale/infrastructure/geo-detection.service.ts` — fallback por idioma + logs

Dentro del loop de fuentes de `detectLocaleFromGeo`, reemplaza la resolución:

```ts
const countryCode = await fetchCountryFromSource(source);
devLog("fuente:", source, "-> country_code:", countryCode);
lastCountryCode = countryCode;

// 1. Traducción regional del país (su propia traducción)
const localeId = LOCALE_MAP[countryCode];
if (localeId) {
  devLog("LOCALE_MAP[", countryCode, "] ->", localeId);
  return { success: true, localeId, countryCode };
}

// 2. País sin traducción regional pero con idioma conocido → default por idioma
const fallbackLocale = fallbackLocaleForCountry(countryCode);
if (fallbackLocale) {
  const language = fallbackLocale === "en" ? "habla inglesa" : "habla hispana";
  devLog("país sin traducción regional:", countryCode, "->", language, "->", fallbackLocale);
  return { success: true, localeId: fallbackLocale, countryCode };
}

// 3. País sin traducción ni idioma conocido → fallback navegador/default
devLog("país sin traducción ni idioma conocido:", countryCode);
lastReason = "unmapped_country";
```

Y en el retorno de fallo incluye el país (para los logs del provider):

```ts
let lastCountryCode: string | undefined;
// ...en cada fuente: lastCountryCode = countryCode;
return { success: false, reason: lastReason, countryCode: lastCountryCode };
```

Import necesario:

```ts
import { fallbackLocaleForCountry } from "../domain/locale-languages";
```

### 5. `app/components/locale/LocaleProvider.tsx` — geo siempre gana

Sustituye el boot de `useIsomorphicLayoutEffect` por este flujo (conservando `applyTarget`):

```ts
// 1. ?locale= override (dev/testing) — sin geo ni persistencia
const override = new URLSearchParams(window.location.search).get("locale");
if (isLocaleSupported(override)) {
  void applyTarget(override, false);
  return;
}

// 2. Provisional de primer paint: SSR → cookie → navigator
let provisional: LocaleId = DEFAULT_LOCALE;
let provisionalSource = "default";
const hasCookie = readLocaleCookie() !== null;

const htmlLang = document.documentElement.lang;
if (htmlLang && htmlLang !== DEFAULT_LOCALE && isLocaleSupported(htmlLang)) {
  provisional = htmlLang;
  provisionalSource = "ssr";
} else {
  const cookieLocale = readLocaleCookie();
  if (cookieLocale) {
    provisional = cookieLocale;
    provisionalSource = "cookie";
  } else {
    const navigatorLocale = getLocaleFromNavigator();
    if (navigatorLocale) {
      provisional = navigatorLocale;
      provisionalSource = "navegador";
    }
  }
}

// 3. Geo client-side: SIEMPRE se ejecuta, en paralelo al primer paint
const geoPromise = detectLocaleFromGeo();

const init = async () => {
  await applyTarget(provisional, !hasCookie);

  const geoResult = await geoPromise;
  if (geoResult.success) {
    if (geoResult.localeId !== provisional) {
      setDetecting(true);                       // splash cubre el cambio
      await applyTarget(geoResult.localeId, true);
      router.refresh();                         // <html lang> + metadata SSR
    } else if (
      geoResult.localeId !== DEFAULT_LOCALE &&
      readLocaleCookie() !== geoResult.localeId
    ) {
      writeLocaleCookie(geoResult.localeId);    // sincroniza cookie sin re-traducir
    }
  } else {
    devLog("geo fallo ->", geoResult.reason, "(se mantiene provisional)");
    if (geoResult.countryCode) {
      devLog(geoResult.countryCode, "sin traducción ni idioma conocido → se usará", provisional, `(${provisionalSource})`);
    }
  }
};

void init();
```

Además:
- `applyTarget` debe hacer `setDetecting(false)` al final (ya lo hace).
- Splash: `{detecting && <LocaleSplash key="splash" />}` (sin `!isReady`, para que cubra también el cambio de idioma).
- Claves de persistencia: el provisional solo se persiste si **no había cookie**; la geo persiste con `persist: true` cuando difiere.
- Se respeta la API existente del provider (`resolvedLocale`, `setPreference`, contexto en el mismo archivo, default export).

### 6. `proxy.ts` — normalizar país + mismo fallback por idioma en el SSR

```ts
import { fallbackLocaleForCountry } from "@/lib/locale/domain/locale-languages";

function detectCountryLocale(request: NextRequest): LocaleId | null {
  for (const header of COUNTRY_HEADERS) {
    const country = request.headers.get(header);
    if (!country) continue;
    const normalized = country.trim().toUpperCase();
    const localeId = LOCALE_MAP[normalized] ?? fallbackLocaleForCountry(normalized);
    if (localeId) return localeId;
  }
  return null;
}
```

> El proxy sigue siendo una optimización: si el hosting no manda headers de país, el paso 5 lo corrige en el cliente.

---

## Sin cambios necesarios

- **`app/layout.tsx`** — ya lee el header del proxy antes que la cookie (SSR correcto).
- **`server/server-metadata.ts`** — solo metadata por locale.
- **`infrastructure/i18n.ts`**, **`locale-persistence.ts`**, **`locale-utils.ts`**, hooks, LanguageSwitcher, Splash.

---

## Comportamiento antes/después

| Escenario | Antes | Después |
|---|---|---|
| Cookie `en` (viajó de EE.UU.) + geo CO | inglés para siempre (bucle) | geo gana → `es-CO`, cookie reescrita |
| Recarga en el mismo país | re-evalúa todo | no-op (sin splash, sin re-traducir) |
| País sin regional hispano (CU) | navegador decide | `es-LA` (español neutro) |
| País sin regional anglófono (NG) | navegador decide | `en` |
| País sin regional ni idioma (XK) | navegador/default | igual + log de decisión |
| SSR en hosting con headers de país | cookie vieja ganaba | header fresco del proxy gana |

## Verificación

```bash
npm run lint
npx tsc --noEmit
```

Prueba manual (dev, incógnito):
1. Crear cookie `locale=en` → recargar → debe aparecer el splash y pasar a tu idioma regional (logs `provisional (cookie) = en` → `geo éxito -> XX` → `geo difiere -> traducción`).
2. Recargar → no-op (sin splash).
3. VPN con salida en un país hispano sin regional (p. ej. Cuba) → log `país sin traducción regional: CU -> habla hispana -> es-LA`.
4. `?locale=en` → inglés sin persistir.