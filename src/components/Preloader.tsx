/**
 * Preloader — counter 0→100, monogram build, clip-path wipe reveal.
 * Sits above everything in App. Calls onComplete when done.
 * Zero dependencies outside motion/react (already installed).
 */
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount]       = useState(0);
  const [phase, setPhase]       = useState<'counting' | 'reveal' | 'done'>('counting');
  const [visible, setVisible]   = useState(true);
  const rafRef                  = useRef<number>(0);
  const startRef                = useRef<number>(0);
  const DURATION                = 2000; // ms for 0→100

  useEffect(() => {
    // Prevent scroll during preloader
    document.body.style.overflow = 'hidden';

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed  = ts - startRef.current;
      const progress = Math.min(elapsed / DURATION, 1);
      // Ease out cubic
      const eased    = 1 - Math.pow(1 - progress, 3);
      const value    = Math.round(eased * 100);
      setCount(value);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Counter done — brief pause then wipe
        setTimeout(() => setPhase('reveal'), 220);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // When wipe animation ends
  const handleRevealComplete = () => {
    setVisible(false);
    document.body.style.overflow = '';
    onComplete();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-[#1d1d1d] select-none"
          animate={phase === 'reveal' ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={phase === 'reveal' ? { duration: 0.85, ease: [0.76, 0, 0.24, 1] } : undefined}
          onAnimationComplete={() => {
            if (phase === 'reveal') handleRevealComplete();
          }}
        >
          {/* Monogram — 3 letters build in staggered */}
          <div className="flex items-end gap-[0.04em] mb-6 overflow-hidden">
            {['A', 'D', 'M'].map((letter, i) => (
              <motion.span
                key={letter}
                className="font-sans text-white leading-none select-none"
                style={{
                  fontSize: 'clamp(72px, 14vw, 160px)',
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  color: i === 1 ? '#4be8f2' : '#ffffff',
                }}
                initial={{ y: '110%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                  delay: i * 0.08,
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Counter */}
          <div
            className="font-sans font-light tabular-nums text-white/30"
            style={{ fontSize: 'clamp(11px, 1.2vw, 13px)', letterSpacing: '0.3em' }}
          >
            {String(count).padStart(3, '0')}
          </div>

          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-[1px] bg-[#4be8f2]/20 w-full">
            <motion.div
              className="h-full bg-[#4be8f2]"
              style={{ width: `${count}%` }}
            />
          </div>

          {/* Subtle grain overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};