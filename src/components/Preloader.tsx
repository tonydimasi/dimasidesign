import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

const LogoPaths = [
  "M443 217.764C322.732 217.764 225.236 120.268 225.236 0.000148773L443 0.000139254L443 217.764Z",
  "M443 468.619C322.732 468.619 225.236 371.123 225.236 250.855L443 250.855L443 468.619Z",
  "M193.212 439.484C128.123 401.832 84.3301 331.458 84.3301 250.855H193.212L193.212 439.484ZM193.212 188.629C128.123 150.976 84.3301 80.603 84.3301 0L193.212 0V188.629Z",
  "M53.374 393.675C20.1286 355.442 3.47557e-05 305.5 0 250.855H53.374L53.374 393.675ZM53.374 142.819C20.1286 104.586 0 54.6444 0 0L53.374 0L53.374 142.819Z",
];

const PATH_DELAYS = [0, 0.12, 0.24, 0.36];

/* ── Noise canvas — disturbo piatto, niente glow ── */
const Noise: React.FC = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      const img  = ctx.createImageData(w, h);
      const data = img.data;
      for (let i = 0; i < data.length; i += 4) {
        const v      = Math.floor(Math.random() * 255);
        const show   = Math.random() > 0.52;
        data[i]      = v;
        data[i + 1]  = v;
        data[i + 2]  = v;
        data[i + 3]  = show ? Math.floor(Math.random() * 22) : 0;
      }
      ctx.putImageData(img, 0, 0);
      raf.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
};

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [count, setCount]     = useState(0);
  const [phase, setPhase]     = useState<'build' | 'hold' | 'wipe'>('build');
  const [visible, setVisible] = useState(true);
  const rafRef                = useRef<number>(0);
  const startRef              = useRef<number>(0);
  const completedRef          = useRef<boolean>(false);
  const DURATION              = 2200;

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let holdTimeout: any = null;
    let wipeTimeout: any = null;

    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / DURATION, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        holdTimeout = setTimeout(() => setPhase('hold'), 180);
        wipeTimeout = setTimeout(() => setPhase('wipe'), 560);
      }
    };

    const id = setTimeout(() => { rafRef.current = requestAnimationFrame(tick); }, 200);
    return () => {
      clearTimeout(id);
      clearTimeout(holdTimeout);
      clearTimeout(wipeTimeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleWipeComplete = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setVisible(false);
    document.body.style.overflow = '';
    onComplete();
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="preloader"
        className="fixed inset-0 z-[9000] flex flex-col items-center justify-center overflow-hidden"
        style={{ background: '#1d1d1d' }}
        animate={phase === 'wipe' ? { clipPath: 'inset(0 0 100% 0)' } : { clipPath: 'inset(0 0 0% 0)' }}
        initial={{ clipPath: 'inset(0 0 0% 0)' }}
        transition={phase === 'wipe' ? { duration: 0.85, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
        onAnimationComplete={() => { if (phase === 'wipe') handleWipeComplete(); }}
      >

        {/* Disturbo */}
        <Noise />

        {/* Logo */}
        <motion.div
          className="relative z-10"
          style={{ width: 'clamp(80px, 14vw, 140px)' }}
          animate={phase === 'hold' ? { scale: [1, 1.04, 1] } : { scale: 1 }}
          transition={phase === 'hold' ? { duration: 0.3, ease: 'easeInOut' } : undefined}
        >
          <svg viewBox="0 0 443 469" fill="none" xmlns="http://www.w3.org/2000/svg"
            style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
            {LogoPaths.map((d, i) => (
              <motion.path
                key={i} d={d} fill="#3CEADC"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  scaleY:  { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: PATH_DELAYS[i] },
                  opacity: { duration: 0.3, ease: 'linear', delay: PATH_DELAYS[i] },
                }}
                style={{ transformOrigin: 'bottom center' }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Counter — Inter, piatto */}
        <div
          className="relative z-10 mt-8 font-sans tabular-nums font-light text-white/30 tracking-[0.3em]"
          style={{ fontSize: 'clamp(11px, 1vw, 12px)' }}
        >
          {String(count).padStart(3, '0')}
        </div>

      </motion.div>
    </AnimatePresence>
  );
};