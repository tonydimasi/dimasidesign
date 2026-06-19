import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const UXWireframeAnimation: React.FC = () => {
  const [state, setState] = useState<1 | 2>(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setState((prev) => (prev === 1 ? 2 : 1));
    }, 1500); // Transitions change cleanly every 1.5 seconds
    return () => clearInterval(timer);
  }, []);

  // Premium, snappy motion design spring curve - significantly more responsive
  const springTransition = {
    type: "spring",
    stiffness: 320,
    damping: 22,
    mass: 0.7,
  };

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center cursor-pointer select-none p-1 sm:p-2"
      onClick={() => setState((prev) => (prev === 1 ? 2 : 1))}
      title="Clicca per invertire il layout"
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 405 557" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#3CEADC]"
      >
        {/* ── CONSTANT/STATIC OUTER DEVICE SHELL ── */}
        <rect 
          x="0.5" 
          y="0.5" 
          width="404" 
          height="556" 
          rx="19.5" 
          stroke="currentColor" 
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Browser Top Bar */}
        <line x1="0" y1="33.5" x2="405" y2="33.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        
        {/* Browser Top Menu Lines */}
        <line x1="30" y1="12.5" x2="48" y2="12.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="30" y1="16.5" x2="48" y2="16.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="30" y1="20.5" x2="48" y2="20.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.4" />

        {/* ── DYNAMIC MORPHING HARD GRID SEPARATORS ── */}
        {/* Dynamic Horizontal Splitter Line 1 */}
        <motion.line
          x1="0"
          x2="405"
          animate={{
            y1: state === 1 ? 346.5 : 182.5,
            y2: state === 1 ? 346.5 : 182.5
          }}
          transition={springTransition}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Dynamic Horizontal Splitter Line 2 */}
        <motion.line
          x1="0"
          x2="405"
          animate={{
            y1: state === 1 ? 516.995 : 352.5,
            y2: state === 1 ? 516.995 : 352.5
          }}
          transition={springTransition}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Dynamic Vertical Splitter Path */}
        <motion.path
          animate={{
            d: state === 1 
              ? "M201.995 516.495L201.996 347" 
              : "M201.995 352L201.996 182.505"
          }}
          transition={springTransition}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
        />


        {/* ── DYNAMIC MORPHING CONTENT CARDS ── */}

        {/* LEFT CARD (Morphs height and Y-position seamlessly across screen states) */}
        <motion.rect
          animate={{
            x: 31.5,
            y: state === 1 ? 45.8008 : 384.5,
            width: 133,
            height: state === 1 ? 278.882 : 133,
          }}
          transition={springTransition}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.75"
        />
        
        {/* Left Card Cross Line 1 (Morphs seamlessly with the box) */}
        <motion.line
          animate={{
            x1: 32,
            y1: state === 1 ? 48.434 : 385.5,
            x2: 164.5,
            y2: state === 1 ? 323.094 : 517,
          }}
          transition={springTransition}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
        />

        {/* Left Card Cross Line 2 (Morphs seamlessly with the box) */}
        <motion.line
          animate={{
            x1: 31.5,
            y1: state === 1 ? 324.138 : 517.5,
            x2: 164,
            y2: state === 1 ? 47.3889 : 385,
          }}
          transition={springTransition}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.4"
        />


        {/* RIGHT TEXT DETAILS (Lines 1, 2, and 3 slide down to the bottom) */}
        <motion.line
          animate={{
            x1: 228,
            y1: state === 1 ? 79.5 : 426.5,
            x2: 360,
            y2: state === 1 ? 79.5 : 426.5,
          }}
          transition={springTransition}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.8"
        />
        <motion.line
          animate={{
            x1: 228,
            y1: state === 1 ? 103.5 : 450.5,
            x2: 360,
            y2: state === 1 ? 103.5 : 450.5,
          }}
          transition={springTransition}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.5"
        />
        <motion.line
          animate={{
            x1: 228,
            y1: state === 1 ? 127.5 : 474.5,
            x2: 360,
            y2: state === 1 ? 127.5 : 474.5,
          }}
          transition={springTransition}
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.5"
        />


        {/* RIGHT MIDDLE CIRCULAR GRAPHIC (Only populated in State 1; slides and scale-fades in sync) */}
        <motion.g
          animate={{
            opacity: state === 1 ? 1 : 0,
            scale: state === 1 ? 1 : 0.75,
            y: state === 1 ? 0 : 35,
          }}
          style={{ originX: "295px", originY: "219px" }}
          transition={springTransition}
        >
          {/* Circular bounding wireframe */}
          <rect 
            x="228.5" 
            y="152.5" 
            width="133" 
            height="133" 
            rx="66.5" 
            stroke="currentColor" 
            strokeWidth="1"
            strokeOpacity="0.75"
          />
          {/* Internal diagonal cruz lines */}
          <path d="M248.012 172.439L342.238 265.811" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
          <path d="M248.5 265.5L341.5 172.5" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3" />
        </motion.g>

      </svg>
    </div>
  );
};
