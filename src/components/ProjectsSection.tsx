import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';

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
    description: 'E-commerce interattivo per un prestigioso archivio milanese di moda di lusso d\'epoca. Tipografia audace e griglie spaziante con cura.',
    meta: 'LUXURY RETRO',
    tag: 'ART DIRECTION'
  }
];

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Bind scroll container event listening
  useEffect(() => {
    const pane = document.getElementById('main-scroll-pane') as HTMLDivElement;
    if (pane) {
      setScrollContainer(pane);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start start", "end end"]
  });

  // Calculate high-precision active card index based on progress segment mapping
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const computedIndex = Math.min(PROJECTS.length - 1, Math.floor(latest * PROJECTS.length));
    if (computedIndex !== activeIndex && computedIndex >= 0) {
      setActiveIndex(computedIndex);
    }
  });

  const activeProject = PROJECTS[activeIndex];

  return (
    <div 
      id="projects-section-container"
      ref={sectionRef}
      className="relative w-full bg-[#1d1d1d] select-none z-20 font-sans"
    >
      
      {/* 
        ========================================================================
        1. STRUCTURAL SNAP PANELS
        These items are rendered in standard document flow. They determine the
        exact height of our scroll block (500vh) and perfectly catch the
        parent container's CSS snapping features.
        ========================================================================
      */}
      {PROJECTS.map((project) => (
        <div 
          key={`anchor-${project.id}`}
          className="project-snap-anchor w-full h-screen relative pointer-events-none"
        />
      ))}

      {/* 
        ========================================================================
        2. STICKY DISPLAY PORTAL
        Fixed to the top of the viewport during the entire scroll progress.
        This keeps the layout perfectly stable, allowing elements on the screen
        to perform pure, gorgeous micro-animations without layout shifting.
        ========================================================================
      */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16">
          
          <div 
            className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16"
          >
            
            {/* 
              ==================================================================
              LEFT PANEL (STATIONARY TYPOGRAPHY):
              Holds exclusively the user's strategic copys in uppercase (stampatello)
              at least 40px (using text-[40px] dynamically for desktop), using the
              clean Inter font with absolutely zero tags, indicators or CTAs.
              ==================================================================
            */}
            <div className="w-full md:w-7/12 flex flex-col justify-center items-start text-left pointer-events-auto">
              <p className="font-sans font-light uppercase tracking-tight text-white text-2xl sm:text-3xl lg:text-[40px] leading-[1.2] select-text max-w-2xl">
                DESIGNER SPECIALIZZATO IN UX/UI CON UN APPROCCIO STRATEGICO. TRASFORMO PROBLEMI COMPLESSI IN ESPERIENZE DIGITALI INTUITIVE E COINVOLGENTI. IL MIO BACKGROUND INCLUDE BRANDING, SVILUPPO WEB E DIREZIONE ARTISTICA. QUESTO MI PERMETTE DI VEDERE I PROGETTI DA PIÙ ANGOLAZIONI E CREARE SOLUZIONI CHE FUNZIONANO SIA ESTETICAMENTE CHE STRATEGICAMENTE. LAVORO CON STARTUP, AGENZIE E AZIENDE CONSOLIDATE IN ITALIA E ALL'ESTERO.
              </p>
            </div>

            {/* 
              ==================================================================
              RIGHT PANEL (TACTILE OVERLAPPING CARDS):
              Implements perfect cinematic popLayout transitions where the old
              portrait card rises gracefully and fades away, and the new card
              ascends and scales in.
              ==================================================================
            */}
            <div className="w-full md:w-5/12 flex items-center justify-center relative h-[380px] sm:h-[440px] md:h-[500px] pointer-events-auto">
              <AnimatePresence mode="popLayout">
                <motion.div 
                  key={activeIndex}
                  initial={{ opacity: 0, y: 140, scale: 0.94, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, y: -140, scale: 0.94, rotate: -2 }}
                  transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full max-w-[260px] sm:max-w-[310px] md:max-w-[340px] aspect-[3/4] flex flex-col bg-[#121212] p-2.5 rounded-[24px] border-2 border-[#4be8f2] shadow-[0_0_30px_rgba(75,232,242,0.18)] h-auto"
                >
                  
                  {/* Portrait aspect preview container (3/4 layout ratio) */}
                  <div 
                    className="relative w-full flex-1 rounded-[16px] overflow-hidden bg-zinc-950 shadow-inner"
                  >
                    
                    {/* ====== INTERFACE 1: MC GEOPOLICY ====== */}
                    {activeProject.id === 'mc-geopolicy' && (
                      <div className="absolute inset-0 bg-[#090b11] p-5 flex flex-col justify-between overflow-hidden font-sans">
                        {/* Concentric vector relationship wires */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-[0.65] opacity-35">
                          <div className="w-96 h-96 rounded-full border border-dashed border-[#4be8f2]/35 animate-[spin_120s_linear_infinite]" />
                          <div className="absolute w-72 h-72 rounded-full border border-[#4be8f2]/25 animate-[spin_80s_linear_infinite_reverse]" />
                          <div className="absolute w-44 h-44 rounded-full border border-dashed border-[#4be8f2]/20" />
                          <div className="absolute w-12 h-12 rounded-full bg-[#4be8f2]/10 border border-[#4be8f2]/40" />
                        </div>
                      </div>
                    )}

                    {/* ====== INTERFACE 2: FINTECH SYSTEM ====== */}
                    {activeProject.id === 'fintech-design' && (
                      <div className="absolute inset-0 bg-[#0c0d12] p-5 flex flex-col justify-between overflow-hidden font-sans">
                        {/* Financial dashboard analytics (clean, abstract, tag-free) */}
                        <div className="flex flex-col gap-4 my-auto w-full pointer-events-none px-2">
                          <div className="bg-zinc-900/80 border border-white/5 rounded-lg p-3 flex flex-col gap-2">
                            <div className="h-1.5 w-1/3 bg-zinc-700 rounded" />
                            <div className="h-3 w-2/3 bg-white/10 rounded" />
                            <div className="h-1 w-full bg-[#4be8f2]/25 rounded overflow-hidden">
                              <div className="h-full bg-[#4be8f2] w-2/3" />
                            </div>
                          </div>
                          
                          <div className="bg-zinc-900/80 border border-white/5 rounded-lg p-3 flex flex-col gap-2">
                            <div className="h-1.5 w-1/4 bg-zinc-700 rounded" />
                            <div className="h-3 w-1/2 bg-white/10 rounded" />
                            <div className="h-1 w-full bg-emerald-500/20 rounded overflow-hidden">
                              <div className="h-full bg-[#4be8f2] w-4/5" />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ====== INTERFACE 3: CRYPTO MONITOR ====== */}
                    {activeProject.id === 'crypto-portfolio' && (
                      <div className="absolute inset-0 bg-[#02050b] p-5 flex flex-col justify-between overflow-hidden font-sans">
                        {/* Realtime token spark charts (clean grid + line, no labels) */}
                        <div className="relative h-24 w-full flex items-end pointer-events-none my-auto">
                          <svg className="w-full h-full text-[#4be8f2]" viewBox="0 0 100 30" preserveAspectRatio="none">
                            <path 
                              d="M0,25 Q15,8 30,22 T60,5 T90,18 T100,2" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="1.5"
                            />
                            <path 
                              d="M0,25 Q15,8 30,22 T60,5 T90,18 T100,2 L100,30 L0,30 Z" 
                              fill="url(#card-stack-gradient)" 
                              opacity="0.15"
                            />
                            <defs>
                              <linearGradient id="card-stack-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="#4be8f2" />
                                <stop offset="100%" stopColor="#4be8f2" stopOpacity="0" />
                              </linearGradient>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* ====== INTERFACE 4: NEURAL INTERFACE ====== */}
                    {activeProject.id === 'neural-interface' && (
                      <div className="absolute inset-0 bg-[#0d0d0d] p-5 flex flex-col justify-between overflow-hidden font-sans">
                        {/* Cybernetic active limits code-matrix */}
                        <div className="my-auto flex flex-col gap-3 font-mono text-[8px] text-zinc-500 text-left px-2">
                          <div className="border border-zinc-800 p-3 rounded-lg bg-zinc-950/60 flex flex-col gap-1.5">
                            <div className="h-1 w-1/2 bg-[#4be8f2]/50 rounded" />
                            <div className="h-1 w-5/6 bg-zinc-700 rounded" />
                          </div>

                          <div className="border border-zinc-800 p-3 rounded-lg bg-zinc-950/60 flex flex-col gap-1.5">
                            <div className="h-1 w-1/3 bg-zinc-700 rounded" />
                            <div className="h-1 w-2/3 bg-zinc-700/60 rounded" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ====== INTERFACE 5: ARCHIVAL FASHION ====== */}
                    {activeProject.id === 'fashion-archive' && (
                      <div className="absolute inset-0 bg-[#161413] p-5 flex flex-col justify-between overflow-hidden font-sans">
                        {/* High-end minimalist design typography (clean concept) */}
                        <div className="my-auto text-center flex flex-col items-center gap-1.5 pointer-events-none">
                          <div className="w-12 h-12 rounded-full border border-[#4be8f2]/30 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full border border-[#4be8f2]/50" />
                          </div>
                          <div className="h-2 w-16 bg-[#4be8f2]/40 rounded mt-2" />
                        </div>
                      </div>
                    )}

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
