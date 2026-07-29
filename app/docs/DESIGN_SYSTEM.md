# Axentra Systems — Design System v1
Extraído del brand mockup (Corporate Identity, Landing, Social, Tarjeta NFC).
Fuente de verdad para: landing corporativo (axentra.systems), Kallap, y refinamiento de Amauta.

---

## 1. Color

| Token | Hex | Uso |
|---|---|---|
| `axentra-navy` | `#0A1D3A` | Fondos oscuros (hero, footer, tarjeta NFC), texto principal |
| `axentra-blue` | `#2563EB` | CTA primario, links activos, iconos destacados |
| `axentra-sky` | `#5DA9FF` | Hover, acentos secundarios, gradientes |
| `axentra-mist` | `#E8F1FF` | Fondos de sección clara, cards claras |
| `axentra-gray` | `#687280` | Texto secundario, subtítulos, metadata |

Regla simple: **secciones de producto (Amauta) → fondo mist/blanco; secciones corporativas e institucionales → fondo navy.** Kallap sigue el patrón navy (mismo tratamiento que la Corporate Identity), diferenciándose de Amauta que es más claro/lúdico.

## 2. Tipografía

- **Display** (titulares, wordmark): Archivo — bold/black para H1/H2, tracking ligeramente negativo.
- **Body** (párrafos, UI, botones): Inter — regular/medium.
- Jerarquía usada en el mockup: pretítulo pequeño en `blue` uppercase → H1 grande en `navy` → subtítulo en `gray`.

## 3. Iconos

- Estilo: **línea (stroke)**, no relleno. Grosor ~1.5–2px.
- Compatible con **Lucide** o **Phosphor** (weight "regular"/"light"). Elegir una sola librería y no mezclar.
- Color vía `currentColor` (clase `.icon-axentra` en tokens.css ya deja esto listo).
- Tamaño default 24px; 20px en nav/footer; 32–40px en Brand Pillars / feature cards.

## 4. Botones — 2 variantes

**Primario** (`Button variant="primary"`)
- Fondo `axentra-blue`, texto blanco, `radius-button` (8px).
- Ejemplos del mockup: "Get in Touch", "Let's Build Your Advantage", "Book a consultation".

**Link / terciario** (`Button variant="link"`)
- Sin fondo, texto `axentra-blue`, flecha `→` al final, sin subrayado hasta hover.
- Ejemplos: "Explore all services →", "Read case study →".

> No se detectó una variante "secondary" con borde en el mockup — si se necesita un botón intermedio, usar outline navy sobre fondo claro / outline blanco sobre fondo navy, mismo radius.

## 5. Patrón de Product Card

Estructura repetible (usada para Amauta y Kallap en la sección "Products by Axentra Systems"):

```
┌─────────────────────────────┐
│ [mascota/ilustración]        │  ← opcional, específico por producto
│ NombreProducto (bold, xl)    │
│ Tagline corta (gray, sm)     │
│ [ badge pill: categoría ]    │  ← "Adaptive Learning Product" / "Career Opportunity Product"
└─────────────────────────────┘
```

- **Amauta**: fondo claro (`mist`/blanco), mascota cóndor, badge naranja/tierno acorde a su identidad ya definida (no navy — Amauta tiene su propia sub-identidad más lúdica).
- **Kallap**: fondo `navy` + textura mesh geométrica (reutilizar `NetworkMeshBackground.jsx` ya construido), badge en `sky` o blanco sobre navy.
- Mismo radius (`radius-card`), mismo padding interno, mismo tamaño de tipografía — lo que cambia es la paleta secundaria y la ilustración.

## 6. Estructura del Landing Corporativo (axentra.systems)

Extraída directamente de la sección 2 del mockup, en orden:

1. Nav (logo + Services/Products/Case Studies/About/Insights/Contact + CTA "Get in Touch")
2. Hero: pretítulo azul + H1 + subtítulo gray + botón primario
3. Our Services (grid de 4 cards con icono + título + descripción corta)
4. Products by Axentra Systems (cards Amauta + Kallap, patrón de sección 5)
5. Case Studies (3 cards: título + resultado destacado + link "Read case study →")
6. CTA final sobre fondo navy ("Let's architect what's next—together")
7. Footer navy con columnas (Company / Resources / Connect) + legal line

## 7. Próximos pasos sugeridos

1. Importar `axentra-design-tokens.css` en el proyecto del landing corporativo (mismo stack que Amauta: Next.js + Tailwind v4).
2. Montar `Button.tsx` y `ProductCard.tsx` (adjuntos) como componentes base compartidos.
3. Construir el landing corporativo reutilizando la arquitectura de secciones de Amauta (`AboutSection`, `CapabilitiesSection`, etc. como referencia de patrón, no de contenido).
4. Construir Kallap card + su propia landing usando el mismo `ProductCard` con `theme="dark"`.
