import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from 'motion/react';

interface Project {
  id: string;
  title: string;
  description: string;
  meta: string;
  tag: string;
}

const PROJECTS: Project[] = [
  {
    id: 'mc-geopolicy',
    title: 'MC GEOPOLICY',
    description: 'Posizionamento strategico per un ex-ambasciatore nel mercato della consulenza B2B. Focus totale su credibilità istituzionale e relazioni diplomatiche, tradotto in una UX minimalista.',
    meta: 'B2B CONSULTING',
    tag: 'STRATEGY'
  },
  {
    id: 'fintech-design',
    title: 'FINTECH SYSTEM',
    description: 'Un design system per applicazioni finanziarie commerciali ad alto livello. Semplifica la lettura di dati complessi e garantisce velocità di implementazione.',
    meta: 'ENTERPRISE INT.',
    tag: 'UI KIT'
  },
  {
    id: 'crypto-portfolio',
    title: 'CRYPTO MONITOR',
    description: 'Piattaforma e cruscotto per il monitoraggio in tempo reale di asset digitali. Interfaccia basata su principi di densità informativa bilanciata.',
    meta: 'METRICS HUB',
    tag: 'LIVE FEED'
  },
  {
    id: 'neural-interface',
    title: 'NEURAL INTERFACE',
    description: 'Progettazione e prototipazione della UI per controller neurale di intelligenza artificiale. Flusso dati sincrono ed estetica brutalista high-contrast.',
    meta: 'AI RESEARCH',
    tag: 'PROTOTYPE'
  },
  {
    id: 'fashion-archive',
    title: 'ARCHIVAL FASHION',
    description: 'E-commerce interattivo per un prestigioso archivio milanese di moda di lusso d\'epoca. Tipografia audace e griglie spazianti con cura.',
    meta: 'LUXURY RETRO',
    tag: 'ART DIRECTION'
  }
];

/* ─── Cyan grid overlay — emerges gently with scroll ─── */
const CyanGrid: React.FC<{ opacity: any }> = ({ opacity }) => (
  <motion.div
    className="absolute inset-0 pointer-events-none overflow-hidden"
    style={{ opacity }}
  >
    <svg
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern
          id="cyan-grid"
          x="0" y="0"
          width="80" height="80"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 80 0 L 0 0 0 80"
            fill="none"
            stroke="#4be8f2"
            strokeWidth="0.4"
            strokeOpacity="0.55"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#cyan-grid)" />
    </svg>
    {/* Subtle radial fade — grid brighter at centre */}
    <div
      className="absolute inset-0"
      style={{
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, #1d1d1d 100%)'
      }}
    />
  </motion.div>
);

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const pane = document.getElementById('main-scroll-pane') as HTMLDivElement;
    if (pane) setScrollContainer(pane);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ['start start', 'end end']
  });

  /* Grid opacity: 0 at scroll start → 0.9 at scroll end, eased */
  const gridOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 0.18, 0.32, 0.42]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(PROJECTS.length - 1, Math.floor(latest * PROJECTS.length));
    if (idx !== activeIndex && idx >= 0) setActiveIndex(idx);
  });

  const activeProject = PROJECTS[activeIndex];

  return (
    <div
      id="projects-section-container"
      ref={sectionRef}
      className="relative w-full bg-[#1d1d1d] select-none z-20 font-sans"
    >
      {/* ── Scroll height anchors ── */}
      {PROJECTS.map((project) => (
        <div
          key={`anchor-${project.id}`}
          className="project-snap-anchor w-full h-screen relative pointer-events-none"
        />
      ))}

      {/* ── Sticky viewport ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16">

          {/* Cyan grid — fades in as user scrolls */}
          <CyanGrid opacity={gridOpacity} />

          <div className="relative z-10 w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">

            {/* ── LEFT: wide text column ── */}
            <div className="w-full md:w-[58%] flex flex-col justify-center items-start text-left pointer-events-auto">
              <p
                className="font-sans font-light uppercase tracking-tight text-white leading-[1.18] select-text"
                style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.6rem)' }}
              >
                DESIGNER SPECIALIZZATO IN UX/UI CON UN APPROCCIO STRATEGICO. TRASFORMO PROBLEMI COMPLESSI IN ESPERIENZE DIGITALI INTUITIVE E COINVOLGENTI. IL MIO BACKGROUND INCLUDE BRANDING, SVILUPPO WEB E DIREZIONE ARTISTICA. QUESTO MI PERMETTE DI VEDERE I PROGETTI DA PIÙ ANGOLAZIONI E CREARE SOLUZIONI CHE FUNZIONANO SIA ESTETICAMENTE CHE STRATEGICAMENTE. LAVORO CON STARTUP, AGENZIE E AZIENDE CONSOLIDATE IN ITALIA E ALL'ESTERO.
              </p>
            </div>

            {/* ── RIGHT: taller card ── */}
            <div
              className="w-full md:w-[38%] flex items-center justify-center relative pointer-events-auto"
              style={{ height: 'clamp(420px, 58vh, 620px)' }}
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 100, scale: 0.96, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -100, scale: 0.96, filter: 'blur(6px)' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full flex flex-col bg-[#121212] rounded-[24px] border border-[#4be8f2]/70 shadow-[0_0_40px_rgba(75,232,242,0.13)]"
                  style={{ height: 'clamp(420px, 58vh, 620px)' }}
                >
                  {/* Card inner preview — takes most of the height */}
                  <div className="relative flex-1 rounded-[20px] overflow-hidden bg-zinc-950 m-2.5 mb-0">

                    {activeProject.id === 'mc-geopolicy' && (
                      <div className="absolute inset-0 bg-[#090b11] flex items-center justify-center overflow-hidden">
                        <div className="relative flex items-center justify-center scale-75 opacity-40">
                          <div className="w-72 h-72 rounded-full border border-dashed border-[#4be8f2]/40 animate-[spin_120s_linear_infinite]" />
                          <div className="absolute w-52 h-52 rounded-full border border-[#4be8f2]/25 animate-[spin_80s_linear_infinite_reverse]" />
                          <div className="absolute w-32 h-32 rounded-full border border-dashed border-[#4be8f2]/20" />
                          <div className="absolute w-10 h-10 rounded-full bg-[#4be8f2]/10 border border-[#4be8f2]/40" />
                        </div>
                      </div>
                    )}

                    {activeProject.id === 'fintech-design' && (
                      <div className="absolute inset-0 bg-[#0c0d12] p-6 flex flex-col gap-4 justify-center overflow-hidden">
                        {[0.66, 0.8, 0.5].map((w, i) => (
                          <div key={i} className="bg-zinc-900/80 border border-white/5 rounded-lg p-3 flex flex-col gap-2">
                            <div className="h-1.5 rounded bg-zinc-700" style={{ width: `${(i + 1) * 20}%` }} />
                            <div className="h-1 w-full bg-[#4be8f2]/15 rounded overflow-hidden">
                              <div className="h-full bg-[#4be8f2]" style={{ width: `${w * 100}%` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeProject.id === 'crypto-portfolio' && (
                      <div className="absolute inset-0 bg-[#02050b] flex items-center justify-center p-6 overflow-hidden">
                        <svg className="w-full" viewBox="0 0 100 36" preserveAspectRatio="none">
                          <defs>
                            <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#4be8f2" stopOpacity="0.25" />
                              <stop offset="100%" stopColor="#4be8f2" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path d="M0,28 Q15,10 30,24 T60,6 T90,20 T100,4 L100,36 L0,36Z" fill="url(#cg)" />
                          <path d="M0,28 Q15,10 30,24 T60,6 T90,20 T100,4" fill="none" stroke="#4be8f2" strokeWidth="1.2" />
                        </svg>
                      </div>
                    )}

                    {activeProject.id === 'neural-interface' && (
                      <div className="absolute inset-0 bg-[#0d0d0d] p-6 flex flex-col gap-3 justify-center overflow-hidden">
                        {[1, 0.6, 0.8].map((o, i) => (
                          <div key={i} className="border border-zinc-800 p-3 rounded-lg bg-zinc-950/60 flex flex-col gap-1.5">
                            <div className="h-1 rounded bg-[#4be8f2]" style={{ width: '45%', opacity: o }} />
                            <div className="h-1 rounded bg-zinc-700" style={{ width: '70%' }} />
                          </div>
                        ))}
                      </div>
                    )}

                    {activeProject.id === 'fashion-archive' && (
                      <div className="absolute inset-0 bg-[#161413] flex flex-col items-center justify-center gap-3 overflow-hidden">
                        <div className="w-14 h-14 rounded-full border border-[#4be8f2]/30 flex items-center justify-center">
                          <div className="w-7 h-7 rounded-full border border-[#4be8f2]/50" />
                        </div>
                        <div className="h-1.5 w-20 bg-[#4be8f2]/40 rounded" />
                      </div>
                    )}

                  </div>

                  {/* Card footer — project info */}
                  <div className="px-4 py-4 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <span
                        className="font-sans font-semibold uppercase tracking-tight text-white"
                        style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)' }}
                      >
                        {activeProject.title}
                      </span>
                      <span className="text-[10px] font-light tracking-widest text-[#4be8f2] uppercase">
                        {activeProject.tag}
                      </span>
                    </div>
                    <p className="text-[11px] font-light text-white/40 leading-relaxed line-clamp-2">
                      {activeProject.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};