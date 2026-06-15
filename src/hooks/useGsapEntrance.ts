/**
 * useGsapEntrance — GSAP entrance hook for HeroSection rows.
 * Drop-in: replaces CSS animate-elegant-fade on hero rows.
 * Does NOT touch TopologyBackground, App, or any other component.
 */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export function useGsapEntrance() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Resume text (left column)
      gsap.from('.hero-resume-text', {
        opacity: 0,
        y: 28,
        duration: 1.1,
        ease: 'power3.out',
        delay: 0.5,
      });

      // Each hero row — staggered upward reveal
      gsap.from('.hero-row', {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.12,
        delay: 0.25,
      });

      // Glyphs start invisible; GSAP doesn't touch them —
      // CSS hover transitions handle their reveal as before.
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return containerRef;
}