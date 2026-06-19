import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

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
    title: 'McGeopolicy',
    description: 'Posizionamento digitale per un ex-ambasciatore italiano nel mercato della consulenza B2B. Focus su credibilità e trust architecture.',
    meta: 'B2B · Consulenza',
    tag: 'UX Strategy'
  },
  {
    id: 'istituto-confucio',
    title: 'Istituto Confucio',
    description: 'Landing page per l\'acquisizione studenti. Architettura di conversione con CTA distribuiti e form semplificato per ridurre la frizione.',
    meta: 'Education',
    tag: 'Landing Page'
  },
  {
    id: 'idea-marble',
    title: 'Idea Marble',
    description: 'Landing page per il mercato export USA/Canada. Storytelling attraverso progetti realizzati e form di qualificazione lead.',
    meta: 'Luxury · Export',
    tag: 'Visual Design'
  },
  {
    id: 'criptowallet',
    title: 'Criptowallet',
    description: 'Rivista digitale sul mondo crypto. Design editoriale con ticker prezzi real-time e firme autoriali per costruire credibilità.',
    meta: 'Fintech · Media',
    tag: 'Editorial Design'
  },
  {
    id: 'sia-engineering',
    title: 'SIA Engineering',
    description: 'Sito corporate per azienda aerospaziale con 5 business unit. Architettura modulare e trust signals per clienti enterprise.',
    meta: 'Industrial · B2B',
    tag: 'Corporate'
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
            stroke="#3CEADC"
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

          <div className="relative z-10 w-full max-w-none flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20 px-6 sm:px-12 md:px-16 lg:px-24 xl:px-32">

            {/* ── LEFT: text column (unboxed, full height layout, side-by-side, large typography) ── */}
            <div className="w-full md:w-[48%] lg:w-[44%] flex flex-col justify-center items-start text-left pointer-events-auto">
              <p
                className="font-sans font-light uppercase tracking-tight text-zinc-300 leading-[1.25] select-text"
                style={{ fontSize: 'clamp(1.5rem, 3.2vw, 2.6rem)' }}
              >
                DESIGNER SPECIALIZZATO IN UX/UI CON UN APPROCCIO STRATEGICO. TRASFORMO PROBLEMI COMPLESSI IN ESPERIENZE DIGITALI INTUITIVE E COINVOLGENTI. IL MIO BACKGROUND INCLUDE BRANDING, SVILUPPO WEB E DIREZIONE ARTISTICA. QUESTO MI PERMETTE DI VEDERE I PROGETTI DA PIÙ ANGOLAZIONI E CREARE SOLUZIONI CHE FUNZIONANO SIA ESTETICAMENTE CHE STRATEGICAMENTE. LAVORO CON STARTUP, AGENZIE E AZIENDE CONSOLIDATE IN ITALIA E ALL'ESTERO.
              </p>
            </div>

            {/* ── RIGHT: massive, almost square card (side-by-side) ── */}
            <div
              className="w-full md:w-[48%] lg:w-[50%] flex items-center justify-center relative pointer-events-auto aspect-[1/1.05] h-[75vh] max-h-[85vh]"
            >
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 100, scale: 0.96, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -100, scale: 0.96, filter: 'blur(6px)' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full h-full group rounded-[32px] overflow-hidden cursor-pointer bg-black"
                >
                  {/* Future link arrow at the top right of the card, appearing on hover */}
                  <div className="absolute top-8 right-8 z-20 text-white opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out select-none pointer-events-none">
                    <ArrowUpRight className="h-8 w-8" strokeWidth={1.5} />
                  </div>

                  {/* Full Background Image */}
                  <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                    {/* McGeopolicy Image */}
                    {activeProject.id === 'mc-geopolicy' && (
                      <img 
                        src="https://dimasidesign.it/assets/carnelos.jpg" 
                        alt="McGeopolicy" 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-100 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Chinese Institute Image */}
                    {activeProject.id === 'istituto-confucio' && (
                      <img 
                        src="https://dimasidesign.it/assets/confucio.jpg" 
                        alt="Istituto Confucio" 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-100 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Idea Marble Image */}
                    {activeProject.id === 'idea-marble' && (
                      <img 
                        src="https://dimasidesign.it/assets/ideamarble.jpg" 
                        alt="Idea Marble" 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-100 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* Credit Wallet Image */}
                    {activeProject.id === 'criptowallet' && (
                      <img 
                        src="https://dimasidesign.it/assets/criptowallet.jpg" 
                        alt="Criptowallet" 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-top opacity-100 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}

                    {/* SIA Engineering Image */}
                    {activeProject.id === 'sia-engineering' && (
                      <img 
                        src="https://dimasidesign.it/assets/sia.jpg" 
                        alt="SIA Engineering" 
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-100 transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Dark Gradient Overlay smoothly darkening only the lower part of the card (no top shadows) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none" />

                  {/* Typography container over continuous image background */}
                  <div className="absolute bottom-0 left-0 w-full px-8 pb-8 pt-24 flex flex-col gap-2 z-10">
                    <span className="font-sans font-semibold tracking-tight text-white text-[22px] md:text-[24px]">
                      {activeProject.title}
                    </span>
                    <p className="font-sans text-[16px] md:text-[17px] font-light text-zinc-100/95 leading-relaxed text-left select-text">
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