# dimasidesign — Antonio Di Masi Design Studio

> Sito portfolio Awwwards-level per **Antonio Di Masi Design Studio** — dimasidesign.it  
> Stack: React 19 · Vite · TypeScript · Tailwind 4 · Framer Motion · GSAP 3.12 · WebGL

---

## Stack Tecnico

| Tecnologia | Versione | Ruolo |
|---|---|---|
| React | 19.0.1 | UI framework |
| Vite | 6.2.3 | Build tool |
| TypeScript | 5.8.2 | Type safety |
| Tailwind CSS | 4.1.14 | Utility styling |
| Framer Motion (`motion`) | 12.x | Card transitions, scroll transforms |
| GSAP | 3.12.5 | Entrance animations hero |
| WebGL (vanilla) | — | Topology background shader |
| Lucide React | 0.546 | Iconografia |

---

## Architettura File

```
src/
├── App.tsx                        # Root — orchestra Preloader + layout principale
├── main.tsx                       # Entry point React
├── index.css                      # Stili globali + Tailwind + classi custom
├── types.ts                       # Interfacce TypeScript (Vortex, TiltState)
├── hooks/
│   └── useGsapEntrance.ts         # Hook GSAP per entrance animation hero rows
└── components/
    ├── Preloader.tsx              # Preloader cinematico ADM counter + clip-path wipe
    ├── TopologyBackground.tsx     # WebGL shader topology + vortici fisici + 3D tilt
    ├── HeroSection.tsx            # Hero tipografica — 4 service rows con glifi
    ├── ProjectsSection.tsx        # Scroll-driven cards + cyan grid reveal
    ├── FooterSection.tsx          # Contact section sfondo #4be8f2
    ├── CustomCursor.tsx           # Cursore custom ring+dot
    ├── Logo.tsx                   # Logo PNG wrapper
    └── logo.png                   # Asset logo
```

---

## Cronologia Completa delle Modifiche

### `2552c05abc` — 2026-06-15 · Initial commit
**Origine: Google AI Studio**  
Scaffolding iniziale del progetto React + Vite + TypeScript.  
Setup base con Tailwind 4, configurazione Vite, tsconfig, .gitignore, .env.example.

---

### `e1539beaf7` — 2026-06-15 · feat: initialize liquid marble background application
**Origine: Google AI Studio**  
Prima implementazione del background WebGL.  
- Shader GLSL con noise procedurale e linee di contorno topografiche
- Canvas fullscreen con ResizeObserver
- Sistema vortici fisici iniziale (4 ambient + 28 slot interattivi)
- Palette: sfondo `#1d1d1d`, linee `#4be8f2`

---

### `5c0a1e87f5` — 2026-06-15 · refactor: update logo and styling architecture
**Origine: Google AI Studio**  
- Sostituzione logo SVG → PNG (`logo.png`)
- Migrazione a classi CSS custom (da Tailwind inline a `index.css`)
- Incremento `scale` del tilt plate per effetto 3D più pronunciato
- Introduzione variabile `--safe-margin: 32px`

---

### `e9ab3529c5` — 2026-06-15 · feat: implement projects section and scroll effects
**Origine: Google AI Studio**  
Implementazione completa di `ProjectsSection` e `FooterSection`.  
- 5 progetti con card animate via `AnimatePresence` + `popLayout`
- `useScroll` + `useMotionValueEvent` per cambio card su scroll
- Scroll snap CSS (`scroll-snap-type: y mandatory`)
- `FooterSection`: sfondo `#4be8f2`, contatti, social, email copy
- Layout hero aggiornato: due colonne (bio sinistra, servizi destra)
- Stagger CSS `animate-elegant-fade` sulle righe hero
- `TopologyBackground`: vortici fisici raffinati, 3D tilt plate con lerp

---

### `e619f4644e` — 2026-06-15 · deps: add gsap 3.12.5
**Origine: Claude (questa sessione)**  
Aggiunta dipendenza `"gsap": "^3.12.5"` in `package.json`.  
Motivazione: sostituire le CSS keyframe animations con GSAP per maggior controllo choreografico, easing personalizzato e future ScrollTrigger integrations.

---

### `6afc111b0c` — 2026-06-15 · feat: add useGsapEntrance hook (GSAP 3.12)
**Origine: Claude (questa sessione)**  
Nuovo file: `src/hooks/useGsapEntrance.ts`  
- Hook React con `gsap.context()` per scope isolato e cleanup automatico (`ctx.revert()`)
- Anima `.hero-resume-text`: `opacity 0→1`, `y: 28→0`, delay 500ms
- Anima `.hero-row`: `opacity 0→1`, `y: 40→0`, stagger 0.12s, delay 250ms
- I glifi restano gestiti da CSS hover — GSAP non interferisce

---

### `38109aa442` — 2026-06-15 · feat: replace CSS fade with GSAP entrance in HeroSection
**Origine: Claude (questa sessione)**  
Modifica: `src/components/HeroSection.tsx`  
- Rimosso `animate-elegant-fade` e `animationDelay` inline dalle righe hero
- Aggiunto `import { useGsapEntrance }` e `ref={containerRef}` sul wrapper
- Struttura HTML identica — zero rischio layout/hover
- Le righe ora entrano con GSAP `power4.out` invece di CSS cubic-bezier

---

### `d93fcfce49` — 2026-06-15 · feat: wider text, taller cards, cyan grid scroll reveal
**Origine: Claude (questa sessione)**  
Modifica: `src/components/ProjectsSection.tsx`  
- **Testo più largo**: colonna sinistra da `w-7/12` → `w-[58%]`, font `clamp(1.5rem, 3.2vw, 2.6rem)`
- **Card più alta**: da `h-[500px]` → `clamp(420px, 58vh, 620px)` su `aspect-ratio` libero
- **Card footer**: titolo progetto + tag + descrizione `line-clamp-2` sotto il preview
- **Cyan grid**: componente `<CyanGrid>` con SVG `<pattern>` 80×80px, `strokeWidth 0.4`
  - Opacità driven da `useTransform` su `scrollYProgress`: `[0, 0.15, 0.85, 1] → [0, 0.18, 0.32, 0.42]`
  - Radial gradient scuro al centro per non soffocare il contenuto
  - Entrata delicata — grid visibile solo dopo il 15% di scroll
- **Transizione card**: rimosso `rotate`, aggiunto `filter: blur(6px)` su init/exit — più cinematico
- Rimosso import inutilizzato `ArrowUpRight`

---

### `257fc1eb23` — 2026-06-15 · feat: add Preloader component
**Origine: Claude (questa sessione)**  
Nuovo file: `src/components/Preloader.tsx`  
- **Monogramma ADM**: lettere A/D/M entrano da `y: 110%` in stagger 80ms. D in `#4be8f2`, A/M in bianco
- **Counter**: `000→100` con easing cubico out (RAF loop, 2000ms), font Inter light, `letter-spacing: 0.3em`
- **Progress bar**: linea `1px` cyan che cresce in sync col counter, posizionata `absolute bottom-0`
- **Wipe reveal**: `clip-path: inset(0 0 100% 0)` — il preloader sale come sipario, easing `[0.76, 0, 0.24, 1]`, durata 850ms
- **Grain overlay**: SVG noise texture a `opacity: 0.03` per qualità cinematica
- Blocca `document.body.style.overflow = 'hidden'` durante il loading, ripristina al termine
- `onComplete()` callback per notificare App

---

### `82f5f1313e` — 2026-06-15 · feat: integrate Preloader into App, gate content behind isReady
**Origine: Claude (questa sessione)**  
Modifica: `src/App.tsx`  
- Aggiunto stato `isReady: boolean` (default `false`)
- `<Preloader onComplete={() => setIsReady(true)} />` montato sopra il `<main>`
- `<main>` riceve `opacity: isReady ? 1 : 0` con `transition: opacity 0.6s ease`
- La hero e il topology sono presenti nel DOM durante il preloader ma invisibili → WebGL si inizializza in background senza delay percepito
- Struttura App invariata — solo fragment `<>` wrapper aggiunto

---

## Prossimi Step Pianificati

### 🔲 Choreografia Hero (priorità alta)
- Righe hero entrano da sinistra con `skewX` che si raddrizza (`-4deg → 0`)
- Flash cyan 80ms sui glifi `?→!` `+++` `:))` `<[{` al termine dell'entrata
- Coordinato con fine preloader (`onComplete`)

### 🔲 Transizione Hero → Projects
- Al primo scroll: testo hero fa `scaleX` collapse al centro
- Topology sfuma (`opacity 1→0`)
- Card projects entrano da destra con `clipPath` reveal
- Effetto cambio scena cinematografico

### 🔲 Micro-dettagli Projects
- Numero progetto attivo (`01→05`) con flip verticale invece di fade
- Indicatore progresso verticale `1px` cyan sulla sinistra
- Parole del testo progetto con underline cyan che si disegna da sinistra su hover

### 🔲 Easter egg developer
- Label `[topology v2.1]` appare accanto al cursore al caricamento, svanisce dopo 3s

### 🔲 Contenuti reali
- Sostituire progetti placeholder con screenshot e descrizioni reali
- SEO meta tags in `index.html`
- OG image per social sharing

---

## Setup Locale

```bash
git clone https://github.com/tonydimasi/dimasidesign.git
cd dimasidesign
npm install
npm run dev
# → http://localhost:3000
```

## Deploy

Vercel — collegato a `tonydimasi/dimasidesign` branch `main`.  
Ogni push su `main` triggera deploy automatico.

- **Framework preset**: Vite
- **Build command**: `vite build`  
- **Output directory**: `dist`
- **Install command**: `npm install`

---

## Brand Tokens

```css
--bg:       #1d1d1d   /* sfondo principale */
--cyan:     #4be8f2   /* colore dominante brand */
--white:    #ffffff
--font:     'Inter', sans-serif
```

---

## Note Architetturali

**TopologyBackground** è il componente più complesso — gestisce WebGL context, ResizeObserver, RAF loop, sistema vortici fisici e 3D tilt CSS. Non va toccato senza leggere attentamente `types.ts` per la struttura `Vortex`.

**Scroll system**: tutto lo scroll passa per `#main-scroll-pane` (overflow-y auto, scrollbar hidden). `ProjectsSection` ascolta questo elemento via `useScroll({ container })`. Non usare `window.scrollY`.

**GSAP context**: `useGsapEntrance` usa `gsap.context(fn, ref)` — il ref deve puntare al wrapper che contiene gli elementi animati. Il cleanup `ctx.revert()` è obbligatorio per evitare memory leak in StrictMode.

---

*Ultimo aggiornamento: 2026-06-15 · Sessione Claude Sonnet 4.6*

### `77b300d734` — 2026-06-16 · feat: SVG logo path reveal preloader
**Origine: Claude (questa sessione)**  
Sostituzione preloader monogramma ADM con preloader basato sul SVG logo reale (`Group_6.svg`).  
- 4 `<motion.path>` con `scaleY: 0→1` da `transform-origin: bottom center`
- Stagger 120ms per path — le barre più grandi entrano prima (path 0 e 1), poi media (path 2), poi sottile (path 3)
- Easing `[0.16, 1, 0.3, 1]` — fast start, soft landing
- Micro pulse `scale 1→1.06→1` al completamento (fase `hold`)
- Counter `000→100` + progress bar in parallelo invariati
- Clip-path wipe verso l'alto invariato
- Riferimento visual: https://animated-svg-logo-css.webflow.io/