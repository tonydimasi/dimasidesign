import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AsciiMeshBackground } from './AsciiMeshBackground';

interface ActivityItem {
  id: string;
  title: string;
  desc: string;
  svg: React.ReactNode;
}

export const IntegratedActivitySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeSlide, setActiveSlide] = useState<number>(0);

  // Monitor scroll progress and determine active slide index along with cyan progress bar state
  const handleScroll = () => {
    const el = containerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    
    const maxScroll = scrollWidth - clientWidth;
    const pct = maxScroll > 0 ? scrollLeft / maxScroll : 0;
    setScrollProgress(pct);

    const index = Math.round(scrollLeft / (clientWidth || 1));
    if (index !== activeSlide) {
      setActiveSlide(index);
    }
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const isAtLeft = el.scrollLeft <= 0;
      const isAtRight = el.scrollLeft >= maxScroll - 2;

      // Handle vertical wheel delta conversion to horizontal scroll stream
      if (e.deltaY < 0 && !isAtLeft) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      } else if (e.deltaY > 0 && !isAtRight) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY * 1.5, behavior: 'auto' });
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const slides: ActivityItem[] = [
    {
      id: 'ux-design',
      title: 'UX DESIGN',
      desc: 'Traduzione dei valori di marca in un\'interfaccia usabile, strutturando wireframe e prototipi ad alta fedeltà. Eliminiamo i colli di bottiglia cognitivi per rendere la navigazione naturale, fluida e gratificante.',
      svg: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-[#3ceadc]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="150" r="70" stroke="rgba(60, 234, 220, 0.25)" strokeWidth="1.5" />
          <circle cx="200" cy="150" r="100" stroke="rgba(255, 255, 255, 0.04)" strokeWidth="1" strokeDasharray="4 4" />
          <motion.rect 
            x="145" y="95" width="110" height="110" 
            stroke="rgba(255, 255, 255, 0.08)" 
            strokeWidth="1"
            animate={{ rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '200px 150px' }}
          />
          <motion.g
            animate={{ rotate: -360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '200px 150px' }}
          >
            <circle cx="200" cy="80" r="5" fill="#3ceadc" />
            <circle cx="200" cy="220" r="5" fill="#3ceadc" />
          </motion.g>
        </svg>
      )
    },
    {
      id: 'cro-opt',
      title: 'CRO OPT',
      desc: 'Analizziamo ed ottimizziamo flussi di conversione basati su dati psicologici e statistici rigorosi, sbloccando costanti miglioramenti delle performance di vendita.',
      svg: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-[#3ceadc]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(200, 150)">
            <motion.path 
              d="M -70 40 L -20 -10 L 20 20 L 70 -40" 
              stroke="#3ceadc" 
              strokeWidth="2.5" 
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: "easeInOut" }}
            />
            <path d="M -70 50 L -20 0 L 20 30 L 70 -30" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />
            <circle cx="-70" cy="40" r="4.5" fill="#3ceadc" />
            <circle cx="-20" cy="-10" r="4.5" fill="#3ceadc" />
            <circle cx="20" cy="20" r="4.5" fill="#3ceadc" />
            <circle cx="70" cy="-40" r="5.5" fill="#3ceadc" className="filter drop-shadow-[0_0_8px_#3ceadc]" />
          </g>
        </svg>
      )
    },
    {
      id: 'brand',
      title: 'BRAND',
      desc: 'Creiamo identità coordinate e durature, esprimendo l\'archetipo e l\'essenza stessa di un brand attraverso sofisticati sistemi visivi minimali.',
      svg: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-[#3ceadc]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(200, 150)">
            <circle cx="0" cy="0" r="55" stroke="#3ceadc" strokeWidth="2.5" />
            <circle cx="0" cy="0" r="18" fill="#3ceadc" />
            <polygon points="0,-10 8,8 -8,8" fill="#3ceadc" transform="translate(0, -80)" />
            <circle cx="0" cy="-80" r="3.5" fill="#3ceadc" />
            <line x1="0" y1="-55" x2="0" y2="-70" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" />
          </g>
        </svg>
      )
    },
    {
      id: 'webdev',
      title: 'WEBDEV',
      desc: 'Costruiamo interfacce incredibilmente reattive ed ultra-veloci, ottimizzando ogni linea di codice per performance superlative e stabilità totale.',
      svg: (
        <svg viewBox="0 0 400 300" className="w-full h-full text-[#3ceadc]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(200, 150)">
            <text x="-65" y="20" className="font-sans text-[84px] fill-white font-extralight select-none" textAnchor="middle">&lt;</text>
            <text x="65" y="20" className="font-sans text-[84px] fill-white font-extralight select-none" textAnchor="middle">&gt;</text>
            <rect x="-24" y="-32" width="48" height="3" fill="#3ceadc" />
            <rect x="-8" y="-12" width="16" height="3" fill="#3ceadc" />
          </g>
        </svg>
      )
    }
  ];

  return (
    <section 
      id="horizontal-methods-snap" 
      className="relative w-full h-screen bg-zinc-950 overflow-hidden select-none flex flex-col justify-center border-t border-b border-white/5 m-0 p-0"
      style={{ scrollSnapAlign: 'start', scrollSnapStop: 'always' }}
    >
      {/* 1. Underlying background ASCII layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <AsciiMeshBackground />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(#ffffff01_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-[0.25] z-[1]" />

      {/* 2. Custom Cyan scroll-loading indicator strictly tracking progress toward the 4th section */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 z-20">
        <div 
          className="h-full bg-[#3ceadc] transition-all duration-100 ease-out origin-left"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* 3. Horizontal Snapping Stage Frame without tabs, indexes, counters, or upper headers */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="relative w-full h-full overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex scroll-smooth z-10 scrollbar-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {slides.map((slide, sIdx) => {
          const isFocused = activeSlide === sIdx;

          return (
            <div
              key={slide.id}
              className="snap-start shrink-0 w-full h-full flex items-center justify-center relative px-6 sm:px-16 md:px-24 lg:px-32"
            >
              <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                
                {/* Left Area: Clean high-contrast typography pairing built strictly in Inter (font-sans) */}
                <div className="lg:col-span-7 flex flex-col justify-center text-left">
                  
                  {/* Title heading paired in Inter (font-sans font-light) without any labels or tags above */}
                  <div className="overflow-hidden mb-6">
                    <motion.h2
                      initial={{ y: "100%", opacity: 0 }}
                      animate={isFocused ? { y: 0, opacity: 0.95 } : { y: "100%", opacity: 0 }}
                      transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="text-5xl sm:text-7xl md:text-[80px] lg:text-[96px] font-sans font-light tracking-tight text-white leading-none uppercase select-none"
                    >
                      {slide.title}
                    </motion.h2>
                  </div>

                  {/* Descriptive text block in Inter (font-sans font-normal) */}
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 15, opacity: 0 }}
                      animate={isFocused ? { y: 0, opacity: 0.8 } : { y: 15, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      className="text-zinc-200 text-[15px] sm:text-[17px] md:text-[18px] font-sans font-normal leading-relaxed max-w-[520px]"
                    >
                      {slide.desc}
                    </motion.p>
                  </div>
                </div>

                {/* Right Area: Floating pure SVG vector illustrations */}
                <div className="lg:col-span-5 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={isFocused ? { scale: 1, opacity: 1 } : { scale: 0.96, opacity: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className="relative w-full max-w-[340px] aspect-[4/3] flex items-center justify-center p-4 overflow-hidden"
                  >
                    {slide.svg}
                  </motion.div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
