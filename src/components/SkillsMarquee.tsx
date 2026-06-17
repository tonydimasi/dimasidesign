/**
 * SkillsMarquee — 3 rows of pills in #3CEADC on background #1d1d1d.
 * Row 1 → right, Row 2 ← left, Row 3 → right (different speeds).
 * Pure RAF loop, zero extra dependencies.
 */
import React, { useEffect, useRef } from 'react';

const ROW_1 = [
  'UX Design', 'UI Design', 'Figma', 'Branding', 'Web Design', 'Prototyping', 'Design System',
  'UX Design', 'UI Design', 'Figma', 'Branding', 'Web Design', 'Prototyping', 'Design System'
];
const ROW_2 = [
  'CRO Optimisation', 'A/B Testing', 'Conversion Rate', 'Landing Page', 'Heuristic Analysis', 'Product Design', 'Visual Identity',
  'CRO Optimisation', 'A/B Testing', 'Conversion Rate', 'Landing Page', 'Heuristic Analysis', 'Product Design', 'Visual Identity'
];
const ROW_3 = [
  'UX Design', 'UI Design', 'Figma', 'Branding', 'Web Design', 'Prototyping', 'Design System',
  'UX Design', 'UI Design', 'Figma', 'Branding', 'Web Design', 'Prototyping', 'Design System'
];

interface MarqueeRowProps {
  items: string[];
  direction: 'left' | 'right';
  speed: number;
  initialOffsetPercent?: number; // to staggered rows visually on start
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction, speed, initialOffsetPercent = 0 }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef     = useRef(0);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const firstChild = track.firstElementChild as HTMLElement;
    let w = 0;
    let initialized = false;

    const tick = () => {
      if (w === 0 && firstChild) {
        w = firstChild.getBoundingClientRect().width;
        if (w === 0) {
          rafRef.current = requestAnimationFrame(tick);
          return;
        }
      }

      if (!initialized && w > 0) {
        xRef.current = -w * initialOffsetPercent;
        initialized = true;
      }

      if (direction === 'right') {
        // Visually moving right means translating from negative values back towards zero
        xRef.current += speed;
        if (xRef.current >= 0) {
          xRef.current -= w;
        }
      } else {
        // Visually moving left means translating from zero downwards towards negative width
        xRef.current -= speed;
        if (xRef.current <= -w) {
          xRef.current += w;
        }
      }

      track.style.transform = `translate3d(${xRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleResize = () => {
      if (firstChild) {
        w = firstChild.getBoundingClientRect().width;
      }
    };
    window.addEventListener('resize', handleResize);

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [direction, speed, initialOffsetPercent]);

  const content = (
    <div className="flex items-center gap-5 pr-5 flex-shrink-0">
      {items.map((label, i) => (
        <div
          key={i}
          className="flex-shrink-0 flex items-center justify-center px-8 py-3 rounded-full border-2 border-[#1d1d1d] bg-transparent font-sans font-light text-[#1d1d1d] uppercase tracking-wider whitespace-nowrap select-none h-[50px] leading-none"
          style={{ 
            fontSize: 'clamp(13px, 1.1vw, 15px)', 
            letterSpacing: '0.04em' 
          }}
        >
          {label}
        </div>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden w-full py-3 bg-transparent">
      <div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{ width: 'max-content' }}
      >
        {content}
        {content}
      </div>
    </div>
  );
};

export const SkillsMarquee: React.FC = () => {
  return (
    <section
      className="relative w-full bg-[#3CEADC] py-16 md:py-24 flex flex-col justify-center gap-6 md:gap-8 overflow-hidden select-none"
      aria-label="Skills Marquee"
    >
      {/* SEO keywords hidden markup */}
      <div className="sr-only">
        UX Design, UI Design, Figma, Branding, Web Design, Prototyping, Design System,
        CRO Optimisation, A/B Testing, Conversion Rate, Landing Page, Heuristic Analysis, Product Design, Visual Identity
      </div>

      <MarqueeRow items={ROW_1} direction="right" speed={1.1} initialOffsetPercent={0.5} />
      <MarqueeRow items={ROW_2} direction="left"  speed={0.8} initialOffsetPercent={0.1} />
      <MarqueeRow items={ROW_3} direction="right" speed={1.4} initialOffsetPercent={0.7} />
    </section>
  );
};