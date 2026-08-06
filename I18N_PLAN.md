# Plan de implementación — Internacionalización con geolocalización en Axentra

**Proyecto:** `D:\Proyectos\Next\axentra` (Next.js 16.2.12, App Router, landing page "use client")
**Referencia analizada:** `D:\Proyectos\React\personal\amauta-frontend` (SPA + PWA con i18next/react-i18next + geo por ipapi.co)
**Fecha:** 2026-08-03

---

## 1. Decisiones de diseño (ya confirmadas)

| Tema | Decisión |
|---|---|
| Librerías | `i18next` + `react-i18next` (mismas que amauta). **No** zustand (se usa React Context) |
| Locales | `en` (default, embebido en bundle) + `es-LA`, `es-MX`, `es-AR`, `es-CL`, `es-CO`, `es-PE` |
| Variantes regionales | Bundles JSON en `public/locales/{id}/translation.json` descargados en runtime (1 archivo por locale), cacheados por el HTTP del navegador |
| Geo | **Proxy best-effort + ipapi.co cliente como fallback**. El header `x-vercel-ip-country` es un bonus que se activa solo si algún día se despliega en Vercel (queda, no cuesta nada). Sin Vercel, la geo real la hace ipapi.co client-side, como en amauta |
| Persistencia | **1 sola cookie** `locale` (maxAge 1 año, path=/). No se guardan bundles en localStorage ni en IndexedDB. No hay `LOCALE_VERSIONS` (no hay caché cliente que pueda quedar obsoleta) |
| Ruteo | Cookie-only, **sin prefijo `/en`/`/es-MX` en la URL** (se descartó `/[lang]` de la guía oficial) |
| SSR | `app/layout.tsx` (Server Component) lee la cookie con `await cookies()` → `<html lang>` + metadata localizada correctas en el primer render |
| Inicialización | Sin bloqueo de render: se pinta `en` al instante y se hace upgrade al regional cuando llega el bundle |
| Cambio de idioma | `changeLanguage` + cookie + `router.refresh()` para que el SSR html lang/metadata reaccionen |
| Alcance | Traducción completa del sitio (todos los componentes + mapas de datos de `page.tsx`) |

## Cadena de resolución de locale

```
1. Cookie "locale" (ya resuelta)                      ← prioridad máxima (servidor + cliente)
2. ?locale=es-MX  (override para testing/desarrollo)
3. proxy.ts: header x-vercel-ip-country → LOCALE_MAP  ← SOLO si hay header (Vercel); si no, se ignora
4. proxy.ts: Accept-Language → locale                 ← funciona en cualquier hosting
5. Cliente: navigator.language → locale               ← usa getLocaleFromNavigator
6. Cliente: ipapi.co (detectLocaleFromGeo)            ← 1 única llamada, solo si no hay cookie
7. en (default embebido en el bundle)
```

Mitigación de límite ipapi.co (Gratis: ~1.000 req/día): se llama **una vez por navegador**, solo cuando no existe cookie (la cookie dura 1 año).

## Matriz: hosting

| | En Vercel | Otro hosting |
|---|---|---|
| Primer render SSR | Español regional correcto (cookie puesta por proxy) | `en` o `Accept-Language`, luego upgrade a regional en cliente (~1 s) |
| Geo | Header gratuito, sin límite | 1 llamada a ipapi.co por visitante nuevo |
| Variantes regionales | Sí | Sí |
| Cambio de código | Ninguno | Ninguno |

## Arquitectura de archivos

```
D:\Proyectos\Next\axentra\
├── proxy.ts                                        [NUEVO, raíz]  best-effort geo + cookie
├── app\
│   ├── layout.tsx                                  [MODIFICAR]   lang SSR + metadata + LocaleProvider
│   ├── components\
│   │   ├── locale\LocaleProvider.tsx              [NUEVO] Context cliente + init i18next
│   │   └── locale\LanguageSwitcher.tsx            [NUEVO] menú de idiomas
│   └── components\sections\Navbar.tsx, Footer.tsx [MODIFICAR]   switcher + t()
├── lib\locale\
│   ├── domain\
│   │   ├── locale.types.ts           [NUEVO]
│   │   ├── locale.config.ts          [NUEVO]  SUPPORTED_LOCALES + LOCALE_MAP
│   │   ├── locale.constants.ts       [NUEVO]  DEFAULT_LOCALE, IPAPI_URL, LOCALE_NAMESPACES
│   │   └── locale.errors.ts          [NUEVO]
│   ├── infrastructure\
│   │   ├── i18n.ts                   [NUEVO]  init i18next (en embebido, 11 namespaces)
│   │   ├── geo-detection.service.ts  [NUEVO]  port de amauta (ipapi.co + AbortController)
│   │   └── locale-persistence.ts     [NUEVO]  SOLO read/write cookie
│   ├── hooks\
│   │   ├── useLanguage.ts            [NUEVO]
│   │   └── useLocale.ts              [NUEVO]  formatNumber/formatDate (Intl)
│   ├── utils\locale-utils.ts         [NUEVO]
│   └── server\server-metadata.ts     [NUEVO]  título/descripción por locale (solo server)
├── lib\locale\infrastructure\resources\en\
│   ├── common.json / navigation.json / hero.json / services.json / products.json /
│   ├── caseStudies.json / about.json / insights.json / contact.json / footer.json / modals.json
└── public\locales\{es-LA,es-MX,es-AR,es-CL,es-CO,es-PE}\translation.json  [NUEVO]
```

Namespaces (11): `common`, `navigation`, `hero`, `services`, `products`, `caseStudies`, `about`, `insights`, `contact`, `footer`, `modals`.

---

## Fases de ejecución

### Fase 1 — Prerrequisitos  ✅ FINALIZADA (2026-08-03)
- Leer `AGENTS.md`: indica que **esta versión de Next.js tiene breaking changes** y que antes de escribir código hay que leer `node_modules/next/dist/docs/` (especialmente `internationalization.md`, `proxy.md`, `cookies.md`).
- Verificar en `node_modules/next/dist/server/web/spec-extension/request.d.ts` que **`request.geo` ya no existe** en Next 16 (se usa el header `x-vercel-ip-country`).
- Confirmar tsconfig: `resolveJsonModule` ya está habilitado (JSON imports OK).

### Fase 2 — Dependencias  ✅ FINALIZADA (2026-08-03)
- `npm i i18next react-i18next`
- (NO instalar zustand)

### Fase 3 — `proxy.ts` (raíz)  ✅ FINALIZADA (2026-08-03)
- Exportar `export function proxy(request: NextRequest)` (Next 16: middleware renombrado a proxy; ve el doc `03-file-conventions/proxy.md`).
- Matcher que excluya `_next/static`, `_next/image`, favicon, `robots.txt`, `sitemap.xml` y `/locales/*`.
- Lógica:
  1. cookie `locale` válida (verificada contra `SUPPORTED_LOCALES`) → no tocar.
  2. `?locale=` → setear cookie y continuar.
  3. `request.headers.get("x-vercel-ip-country")` → `LOCALE_MAP` → setear cookie.
  4. `Accept-Language` (con un parser simple de la cabecera) → locale (si es soportado) → setear cookie.
  5. Si nada → setear cookie default `en` (o no setear; ver nota). Solo persistir si ha cambiado.
- Usar `NextResponse.next()` y `response.cookies.set("locale", value, { path: "/", maxAge: 31536000, sameSite: "lax" })`.
- Sin redirects (cookie-only).

### Fase 4 — `lib/locale/domain` (port desde amauta-frontend, adaptado)  ✅ FINALIZADA (2026-08-03)
- `locale.types.ts`: `LocaleId`, `LocaleInfo {id,label,flag,country,isDefault}`, `GeoResult` (success/reason), `LocaleNamespace`.
- `locale.config.ts`: `SUPPORTED_LOCALES` (en + es variantes, con bandera, `isDefault: true` para `en`); `LOCALE_MAP` (MX→es-MX, AR→es-AR, CL→es-CL, CO→es-CO, PE→es-PE, US→en, resto de LatAm → es-LA, resto del mundo → no mapeado → default `en`).
- `locale.constants.ts`: `DEFAULT_LOCALE = "en"`, `IPAPI_URL = "https://ipapi.co/json/"`, `IPAPI_TIMEOUT_MS = 5000`, `LOCALE_NAMESPACES` (11), quizá `COOKIE_KEY = "locale"`.
- `locale.errors.ts`: códigos de error (GEO_DETECTION_FAILED, LOCALE_NOT_SUPPORTED, LOCALE_DOWNLOAD_FAILED, etc.) — para logging.

### Fase 5 — `lib/locale/infrastructure`  ✅ FINALIZADA (2026-08-03)
- `geo-detection.service.ts`: port de amauta (`fetch(ipapi.co/json/)`, `AbortController` + timeout 5s, `AbortSignal.any`, maneja 429/timeout/network/parse/unmapped → `GeoResult`). Limpiar los `console.log` de amauta.
- `locale-persistence.ts` (reducido): solo `readLocaleCookie(): LocaleId | null` y `writeLocaleCookie(locale)` vía `document.cookie` (client-only). Sin bundles, sin Dexie.
- `i18n.ts`: init de i18next con `lng: DEFAULT_LOCALE`, `fallbackLng: DEFAULT_LOCALE`, `resources` con `en` + las 11 namespaces (imports de JSON), `defaultNS: "common"`, `returnObjects: true`, `interpolation: { escapeValue: false }`.

### Fase 6 — `app/components/locale/LocaleProvider.tsx` (cliente)  ✅ FINALIZADA (2026-08-03)
- React Context que expone `{ resolvedLocale, isReady, setPreference }`.
- `useEffect` de init:
  1. Leer override `?locale=` (URLSearchParams).
  2. Leer cookie → si es válida, usarla.
  3. Sino `getLocaleFromNavigator()`.
  4. Sino `detectLocaleFromGeo()` (ipapi, un call, con timeout).
  5. Si `resolved !== "en"` → `fetch("/locales/{resolved}.json")` → `i18next.addResourceBundle(...)` → `i18next.changeLanguage`.
  6. Si el locale viene de geo/navigator y no hay cookie → `writeLocaleCookie()`.
- Sincronizar `document.documentElement.lang = resolved` en cada cambio.
- Render sin bloquear: `{children}`.

### Fase 7 — `app/layout.tsx` (server)  ✅ FINALIZADA (2026-08-03)
- `await cookies()` → leer cookie `locale`, validar contra `SUPPORTED_LOCALES`, sino default.
- `<html lang={locale}>`.
- `generateMetadata` → título/descripción por locale desde `lib/locale/server/server-metadata.ts`.
- Envolver `{children}` dentro de `<LocaleProvider>` (import del client component).

### Fase 8 — Hooks  ✅ FINALIZADA (2026-08-03)
- `useLanguage.ts`: devuelve `{ t, i18n, locale, availableLocales, isReady, setPreference, resetLocale }` (usa `useTranslation` + context).
- `useLocale.ts`: `{ formatNumber, formatDate }` con `Intl.NumberFormat`/`DateTimeFormat` según `resolvedLocale` (igual que amauta).

### Fase 9 — `LanguageSwitcher`  ✅ FINALIZADA (2026-08-03)
- Select o dropdown con las banderas/labels de `SUPPORTED_LOCALES`, llama `setPreference(locale)`.
- `setPreference` = `writeLocaleCookie` + `i18next.changeLanguage` + `router.refresh()` + set state del context.
- Integrar en `Navbar.tsx` (desktop y menú móvil) y en `Footer.tsx`.

### Fase 10 — Recursos de traducción  ✅ FINALIZADA (2026-08-03)
- `resources/en/*.json`: extraer **todos** los strings actuales del sitio en las 11 namespaces (inglés).
- `public/locales/{id}.json`: traducción completa al español (neutro LatAm + variantes regionales donde aplique). Estructura = mismo árbol de namespaces que `en`.

### Fase 11 — Extracción de strings (reemplazar ingles hardcodeado por `t("ns:key")`)
- `app/page.tsx` (mapas `serviceMap`, `sectionInfoMap`, productos Amauta/Kallap, case studies, insights, explore-all ~40 strings) usando interpolación (`t("modals:thankYou", { name })`).
- `Navbar`, `HeroSection`, `ServicesSection`, `ProductsSection`, `CaseStudiesSection`, `AboutSection`, `InsightsSection`, `ContactSection`, `ContactSection`, `CTABanner`, `Footer`, `ContactModal`, `DetailModal`.
- Usar `returnObjects` para arrays (bullets, métricas, case studies).
- Mantener `aria-label`s traducidos.

### Fase 12 — Verificación
- `npm run lint` y `npm run build`.
- `npm run dev -p 3002`:
  - `/?locale=es-MX` → ver el regional en español + cookie puesta.
  - Sin cookie en browser español (usar `?locale=` o cambiar `navigator.language`) → fallback correcto.
  - Fallback a `en` con navigator en inglés / geo no mapeada.
  - Persistencia: recargar conserva idioma (cookie).
  - `html lang` y `<title>` correctos en SSR y tras cambiar en vivo.
  - LanguageSwitcher cambia idioma + persiste + `router.refresh()`.
- Geo real (Vercel o no) no es simulable local: verificable con curl simulando header `x-vercel-ip-country: MX` o en deploy.

---

## Prompt para ejecutar en otra sesión

> **COPIA TODO LO QUE ESTÁ DENTRO DE ESTE BLOQUE**
>
> ```text
> Rol: Implementar la internacionalización con el plan que está en `D:\Proyectos\Next\axentra\I18N_PLAN.md`.
>
> 1. Primero lee `AGENTS.md` y el archivo `I18N_PLAN.md` completo (trae las decisiones de diseño y las fases).
> 2. Antes de escribir cualquier código de Next.js, consulta la documentación incluida en `node_modules/next/dist/docs/` (sobre todo:
>    - `01-app/02-guides/internationalization.md` (enfoque cliente / cookies, no usamos `/[lang]`)
>    - `01-app/03-api-reference/03-file-conventions/proxy.md` (NOTA: Next 16 renombró `middleware` a `proxy`; `request.geo` ya no existe en esta versión)
>    - `01-app/03-api-reference/04-functions/cookies.md` (cookies asíncronas: `await cookies()`).
> 3. Ejecuta las fases en orden: Fase 1 a Fase 12. NO saltes pasos.
>
> Decisiones inamovibles:
> - Librerías: i18next + react-i18next. NO agregar zustand. Estado con React Context.
> - Locales: `en` (default, embebido) + `es-LA`, `es-MX`, `es-AR`, `es-CL`, `es-CO`, `es-PE` (bundles en `public/locales/{id}.json`).
> - Geo: `proxy.ts` best-effort (header `x-vercel-ip-country` + `Accept-Language` en el edge), con ipapi.co client-side como fallback (1 llamada por navegador, vía cookie).
> - Persistencia: UNA cookie `locale` (maxAge 1 año). NO guardar bundles en localStorage/IndexedDB, NO versionar (`LOCALE_VERSIONS`).
> - Ruteo: cookie-only, SIN prefijo `/[lang]` en URL, SIN redirects.
> - Traducción: COMPLETA (todos los strings de los 12 componentes + los mapas de datos en `app/page.tsx`).
>
> Pasos de arquitectura esperados (resumen, también en el plan):
> - Crear `proxy.ts` en la raíz del proyecto.
> - Crear el módulo `lib/locale/` (domain, infrastructure, hooks, utils, server metadata).
> - Crear `app/components/locale/LocaleProvider.tsx` y `LanguageSwitcher.tsx`.
> - Modificar `app/layout.tsx`: `html lang` dinámico + metadata localizada + envolver en `LocaleProvider`.
> - Crear `lib/locale/infrastructure/resources/en/*.json` (11 namespaces) con todo el texto actual del sitio.
> - Crear `public/locales/{es-LA,es-MX,es-AR,es-CL,es-CO,es-PE}.json` con la traducción completa al español.
> - Reemplazar todos los textos hardcodeados por `t("ns:key")` con interpolación.
>
> Reglas de estilo: NO agregar comentarios innecesarios; respeta el estilo de los archivos existentes y usa las utilidades ya presentes (motion, lucide-react, tailwind).
>
> Verificación final obligatoria:
> - `npm run lint` y `npm run build` sin errores.
> - `npm run dev` en puerto 3002 y probar `/?locale=es-MX`, fallback a `en`, persistencia por cookie, `html lang`, `LanguageSwitcher`.
> - No tocar nada fuera del alcance del plan.
> - Reportar al terminar: qué se creó, qué se modificó, resultados de lint/build, y cualquier desviación del plan con justificación.
> ```