import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AsciiMeshBackground } from './AsciiMeshBackground';
import { UXWireframeAnimation } from './UXWireframeAnimation';
import { CROFunnelAnimation } from './CROFunnelAnimation';
import { BrandLogoAnimation } from './BrandLogoAnimation';
import { WebDevTerminalAnimation } from './WebDevTerminalAnimation';

interface ActivityItem {
  id: string;
  title: string;
  desc: string;
  ascii: string;
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

  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  // Monitor visibility of Horizontal Snapping Stage to avoid scroll hijacking too early
  useEffect(() => {
    const parent = document.getElementById('horizontal-methods-snap');
    if (!parent) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        threshold: 0.65, // Trigger only when 65% of the 100vh section occupies the screen
      }
    );

    observer.observe(parent);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !isIntersecting) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;

      const maxScroll = el.scrollWidth - el.clientWidth;
      const isAtLeft = el.scrollLeft <= 6;
      const isAtRight = Math.ceil(el.scrollLeft) >= Math.floor(maxScroll) - 8;

      // Only block default vertical scroll if there are items to scroll horizontally left/right
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
  }, [isIntersecting]);

  const slides: ActivityItem[] = [
    {
      id: 'ux-design',
      title: 'UX DESIGN',
      desc: 'Traduzione dei valori di marca in un\'interfaccia usabile, strutturando wireframe e prototipi ad alta fedeltà. Eliminiamo i colli di bottiglia cognitivi per rendere la navigazione naturale, fluida e gratificante.',
      ascii: `+-- UX_WIRE_VIEWPORT_H01 -----------+
| [O] [O] [O]           [ 1280x800 ]|
+-----------------------------------+
| . . . . . . . . . . . . . . . . . |
| . [ BRAND_LOGO ] . . . [ NAV ] . .|
| . . . . . . . . . . . . . . . . . |
| . +-----------------------------+ |
| . | HERO_CONTAINER              | |
| . |                             | |
| . |  [#] TITLE_DISPLAY_LARGE    | |
| . |  [#] SUBTITLE_SUPPORT       | |
| . |                             | |
| . |  +--------+                 | |
| . |  | ACTION |  .-.            | |
| . |  +--------+   \\ \\ (Cursor)  | |
| . +-----------------------------+ |
| . . . . . . . . . . \\ . . . . . . |
| . [GRID_01] . . . .  *  . . . . . |
| . . . . . . . . . . . . . . . . . |
+-----------------------------------+`
    },
    {
      id: 'cro-opt',
      title: 'CRO OPT',
      desc: 'Analizziamo ed ottimizziamo flussi di conversione basati su dati psicologici e statistici rigorosi, sbloccando costanti miglioramenti delle performance di vendita.',
      ascii: `+-- CRO_METRIC_FUNNEL --------------+
| [SESSIONS] ====> 100% [ 12,450 ]  |
+-----------------------------------+
|      \\                         /  |
|       \\                       /   |
|        \\ [ENGAGED]  ===> 48% /    |
|         +-------------------+     |
|         |                   |     |
|         \\     [CONVERT] === / 12% |
|          +-----------------+      |
|                                   |
|  [CR_METRIC] ^                    |
|          10% |       .-*--.       |
|           5% |      /      \\      |
|           1% |  _.-*        *     |
|              +--+--+--+--+--+-->  |
|                 M1 M2 M3 M4 M5    |
+-----------------------------------+`
    },
    {
      id: 'brand',
      title: 'BRAND',
      desc: 'Creiamo identità coordinate e durature, esprimendo l\'archetipo e l\'essenza stessa di un brand attraverso sofisticati sistemi visivi minimali.',
      ascii: `+-- BRAND_GEOMETRY_SYSTEM ----------+
| ANCHORS: [X: 200, Y: 200]  D: 1.6 |
+-----------------------------------+
|                 |                 |
|             _.-"|" -._            |
|           .'  .-"|"-._ '.         |
|          /   /   |    \\  \\        |
|         |   | ---*-----|  |       |
| --------|---|---|---|--|--|-------|
|         |   |    |     |  |       |
|          \\   \\   |    /  /        |
|           '.  '-_|_.-' .'         |
|             '-._ | _.-'           |
|                 |                 |
|   [FIBONACCI]  1, 1, 2, 3, 5, 8   |
|   [SCALE]      |||||||||||||||    |
+-----------------------------------+`
    },
    {
      id: 'webdev',
      title: 'WEBDEV',
      desc: 'Costruiamo interfacce incredibilmente reattive ed ultra-veloci, ottimizzando ogni linea di codice per performance superlative e stabilità totale.',
      ascii: `+-- WEBDEV_COMPILE_TARGET_ES6 ------+
| STACK: REACT + VITE + TAILWIND   |
+-----------------------------------+
|  1  import { useState } from 'r'; |
|  2  const [state, setState] =     |
|  3    useState<Active>(true);     |
|  4                                |
|  5  // Optimize frame layout      |
|  6  const render = () => {        |
|  7    return <div className="c"   |
|  8      id="ascii_node" />;       |
|  9  };                            |
|                                   |
|  === SERVER STATUS: COMPILING === |
|  >> BUNDLER: [ SUCCESS ] IN 12ms |
|  >> PORT   : http://0.0.0.0:3000  |
|  >> HMR    : [ STANDBY_OK ]       |
+-----------------------------------+`
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

      {/* 2. Custom Cyan scroll-loading indicator */}
      <div className="absolute top-0 left-0 w-full h-[3px] bg-white/5 z-35">
        <div 
          className="h-full bg-[#3ceadc] transition-all duration-100 ease-out origin-left"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* 3. Horizontal Snapping Stage Frame */}
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
              className="snap-start shrink-0 w-full h-full flex items-center justify-center relative px-6 sm:px-12 md:px-16"
            >
              <div className="w-full max-w-[960px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center px-4">
                
                {/* Left Area: Display name + description paired directly in Inter */}
                <div className="lg:col-span-6 flex flex-col justify-center text-left">
                  
                  {/* Clean Minimalist Slide Index */}
                  <div className="overflow-hidden mb-3">
                    <motion.span
                      initial={{ y: "100%", opacity: 0 }}
                      animate={isFocused ? { y: 0, opacity: 0.5 } : { y: "100%", opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.04, ease: "easeOut" }}
                      className="text-xs sm:text-sm tracking-[0.2em] text-[#3ceadc] font-sans font-semibold block select-none"
                    >
                      0{sIdx + 1}
                    </motion.span>
                  </div>

                  {/* Title heading in Inter display scale */}
                  <div className="overflow-hidden mb-6">
                    <motion.h2
                      initial={{ y: "100%", opacity: 0 }}
                      animate={isFocused ? { y: 0, opacity: 0.95 } : { y: "100%", opacity: 0 }}
                      transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="text-5xl sm:text-7xl lg:text-[80px] xl:text-[90px] font-sans font-light tracking-tight text-white leading-[0.95] uppercase select-none"
                    >
                      {slide.title}
                    </motion.h2>
                  </div>

                  {/* Descriptive text block in matching Inter style */}
                  <div className="overflow-hidden">
                    <motion.p
                      initial={{ y: 15, opacity: 0 }}
                      animate={isFocused ? { y: 0, opacity: 0.8 } : { y: 15, opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      className="text-zinc-200 text-[15px] sm:text-[17px] md:text-[18px] font-sans font-normal leading-relaxed max-w-[480px]"
                    >
                      {slide.desc}
                    </motion.p>
                  </div>
                </div>

                {/* Right Area: MASSIVE aspect-ratio aesthetic ASCII or interactive layout card */}
                <div className="lg:col-span-6 flex items-center justify-center">
                  <motion.div 
                    initial={{ scale: 0.94, opacity: 0 }}
                    animate={isFocused ? { scale: 1, opacity: 1 } : { scale: 0.94, opacity: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 }}
                    className={`relative w-full max-w-[380px] border border-[#3ceadc]/15 bg-zinc-950/40 backdrop-blur-md rounded-[12px] shadow-2xl overflow-hidden text-[#3ceadc]/90 select-none tracking-normal ${
                      slide.id === 'ux-design' || slide.id === 'cro-opt'
                        ? 'aspect-[3/4]' 
                        : 'aspect-square flex items-center justify-center'
                    }`}
                  >
                    {slide.id === 'ux-design' && <UXWireframeAnimation />}
                    {slide.id === 'cro-opt' && <CROFunnelAnimation />}
                    {slide.id === 'brand' && <BrandLogoAnimation />}
                    {slide.id === 'webdev' && <WebDevTerminalAnimation />}
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
