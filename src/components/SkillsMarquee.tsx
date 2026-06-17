/**
 * SkillsMarquee — 3 rows of pills on #4be8f2.
 * Row 1 → right, Row 2 ← left, Row 3 → right (different speeds).
 * Pure RAF, no extra deps.
 */
import React, { useEffect, useRef } from 'react';

const ROW_1 = ['UX Design', 'UI Design', 'Figma', 'Branding', 'Web Design', 'Prototyping', 'Design System', 'User Research', 'Wireframing', 'Interaction Design'];
const ROW_2 = ['CRO Optimisation', 'A/B Testing', 'Conversion Rate', 'Landing Page', 'Heuristic Analysis', 'Usability Testing', 'Information Architecture', 'Journey Mapping'];
const ROW_3 = ['Art Direction', 'Visual Identity', 'Typography', 'Motion Design', 'Responsive Design', 'Design Thinking', 'Atomic Design', 'Component Library', 'Accessibility'];

interface MarqueeRowProps {
  items: string[];
  direction: 'left' | 'right';
  speed: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction, speed }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const xRef     = useRef(0);
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    // Clone once for seamless loop
    const clone = track.firstElementChild?.cloneNode(true) as HTMLElement;
    if (clone) track.appendChild(clone);

    const tick = () => {
      const w = (track.firstElementChild as HTMLElement)?.scrollWidth ?? 0;
      if (w === 0) { rafRef.current = requestAnimationFrame(tick); return; }

      if (direction === 'right') {
        xRef.current -= speed;
        if (Math.abs(xRef.current) >= w) xRef.current = 0;
      } else {
        xRef.current += speed;
        if (xRef.current >= 0) xRef.current = -w;
      }

      track.style.transform = `translateX(${xRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    // Init position for left-direction rows
    if (direction === 'left') {
      const w = (track.firstElementChild as HTMLElement)?.scrollWidth ?? 0;
      xRef.current = -w;
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [direction, speed]);

  const content = (
    <div className="flex items-center gap-4 pr-4 flex-shrink-0">
      {items.map((label, i) => (
        <div
          key={i}
          className="flex-shrink-0 px-6 py-2.5 rounded-full border border-[#1d1d1d]/30 font-sans font-light text-[#1d1d1d] whitespace-nowrap select-none"
          style={{ fontSize: 'clamp(12px, 1.1vw, 14px)', letterSpacing: '0.01em' }}
        >
          {label}
        </div>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex will-change-transform"
        style={{ width: 'max-content' }}
      >
        {content}
      </div>
    </div>
  );
};

export const SkillsMarquee: React.FC = () => {
  return (
    <section
      className="relative w-full bg-[#4be8f2] py-10 flex flex-col gap-4 overflow-hidden select-none"
      aria-label="Skills and competencies"
    >
      {/* SEO hidden keywords */}
      <div className="sr-only">
        UX Design, UI Design, Figma, Branding, Web Design, Prototyping, Design System,
        User Research, CRO Optimisation, A/B Testing, Art Direction, Visual Identity,
        Typography, Motion Design, Responsive Design, Design Thinking, Accessibility
      </div>

      <MarqueeRow items={ROW_1} direction="right" speed={0.55} />
      <MarqueeRow items={ROW_2} direction="left"  speed={0.42} />
      <MarqueeRow items={ROW_3} direction="right" speed={0.65} />
    </section>
  );
};