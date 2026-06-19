import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

export const BrandLogoAnimation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'construction' | 'solid'>('construction');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev === 'construction' ? 'solid' : 'construction'));
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  // Snappy spring curve
  const springTransition = {
    type: "spring",
    stiffness: 400,
    damping: 24,
    mass: 0.6,
  };

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-zinc-950/60 rounded-xl overflow-hidden font-sans border border-[#3CEADC]/10 cursor-pointer select-none"
      onClick={() => setActiveTab((prev) => (prev === 'construction' ? 'solid' : 'construction'))}
      title="Clicca per invertire la costruzione geometrica"
    >
      
      {/* Main Drawing Stage Area */}
      <div className="flex-1 w-full flex items-center justify-center relative py-4">

        {/* Master SVG Canvas */}
        <svg 
          viewBox="0 0 200 161" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-h-[240px] max-w-[300px] text-[#3CEADC] transition-all duration-300"
        >
          
          {/* ────── GRID GUIDE LINES (Only visible in construction mode) ────── */}
          <g>
            {/* Guide line 1 (Slope diagonal right) */}
            <motion.line 
              animate={{ 
                opacity: activeTab === 'construction' ? 0.45 : 0,
                pathLength: activeTab === 'construction' ? 1 : 0
              }}
              transition={springTransition}
              x1="108.432" y1="0.450701" x2="199.432" y2="156.451" 
              stroke="currentColor" 
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            
            {/* Guide line 2 (Slope diagonal left) */}
            <motion.line 
              animate={{ 
                opacity: activeTab === 'construction' ? 0.45 : 0,
                pathLength: activeTab === 'construction' ? 1 : 0
              }}
              transition={springTransition}
              x1="44.567" y1="156.656" x2="134.868" y2="0.250028" 
              stroke="currentColor" 
              strokeDasharray="4 4"
              strokeWidth="1"
            />

            {/* Guide line 3 (Base horizontal lock) */}
            <motion.line 
              animate={{ 
                opacity: activeTab === 'construction' ? 0.55 : 0,
                pathLength: activeTab === 'construction' ? 1 : 0
              }}
              transition={springTransition}
              x1="200" y1="137.203" x2="38" y2="137.203" 
              stroke="currentColor" 
              strokeWidth="0.75"
            />

            {/* Intersecting path guide 4 */}
            <motion.path 
              animate={{ 
                opacity: activeTab === 'construction' ? 0.35 : 0,
                pathLength: activeTab === 'construction' ? 1 : 0
              }}
              transition={springTransition}
              d="M187.5 5.41771L97.8509 160.695" 
              stroke="currentColor" 
              strokeWidth="0.5"
            />
            
            {/* Intersecting path guide 5 */}
            <motion.path 
              animate={{ 
                opacity: activeTab === 'construction' ? 0.35 : 0,
                pathLength: activeTab === 'construction' ? 1 : 0
              }}
              transition={springTransition}
              d="M181.251 5.41771L91.6019 160.695" 
              stroke="currentColor" 
              strokeWidth="0.5"
            />
          </g>

          {/* ────── CONSTRAINING GRID CIRCLES (Only visible in construction mode) ────── */}
          <g>
            {/* Outer golden-ratio bounding circle */}
            <motion.circle 
              animate={{ 
                opacity: activeTab === 'construction' ? 0.65 : 0,
                scale: activeTab === 'construction' ? 1 : 0.85
              }}
              style={{ originX: "68px", originY: "68.7px" }}
              transition={springTransition}
              cx="68" 
              cy="68.7026" 
              r="67.5" 
              stroke="currentColor" 
              strokeWidth="1"
            />

            {/* Medium offset bounding circle */}
            <motion.circle 
              animate={{ 
                opacity: activeTab === 'construction' ? 0.65 : 0,
                scale: activeTab === 'construction' ? 1 : 0.85
              }}
              style={{ originX: "149.5px", originY: "114.2px" }}
              transition={springTransition}
              cx="149.5" 
              cy="114.203" 
              r="22" 
              stroke="currentColor" 
              strokeDasharray="2 2"
              strokeWidth="1"
            />

            {/* Intersection focal anchor dot */}
            <motion.circle 
              animate={{ 
                opacity: activeTab === 'construction' ? 0.85 : 0,
                scale: activeTab === 'construction' ? 1 : 0
              }}
              style={{ originX: "140.5px", originY: "66.2px" }}
              transition={springTransition}
              cx="140.5" 
              cy="66.2026" 
              r="5" 
              stroke="currentColor" 
              strokeWidth="1"
            />
          </g>

          {/* ────── MAIN BRAND LOGO VECTORS (Centers, scales and opacifies gracefully!) ────── */}
          {/* We animate translation offset based on state to focus the logo nicely */}
          <motion.g
            animate={{
              x: activeTab === 'solid' ? -28 : 0, // shifts layout slightly to center of canvas when standalone
              y: activeTab === 'solid' ? -8 : 0,
              scale: activeTab === 'solid' ? 1.15 : 1
            }}
            transition={springTransition}
            style={{ originX: "100px", originY: "80px" }}
          >
            {/* Logo Part 1 (Left Curve Mark) */}
            <motion.path 
              animate={{ 
                fillOpacity: activeTab === 'solid' ? 1 : 0.18,
                strokeWidth: activeTab === 'solid' ? 0 : 1
              }}
              transition={springTransition}
              d="M56 136.657C77.9865 98.4647 99.6881 60.7656 121.601 22.7026C123.264 25.5852 124.734 28.1409 126.209 30.6919C132.64 41.8446 139.09 52.9835 145.462 64.1685C145.871 64.8868 146.096 66.1669 145.733 66.807C138.562 79.3872 131.726 92.1884 123.953 104.391C110.456 125.578 90.6243 135.934 65.6702 136.647C62.629 136.735 59.5878 136.661 56 136.661L56 136.657Z" 
              fill="currentColor"
              stroke="currentColor"
            />

            {/* Logo Part 2 (Right Chevron Mark) */}
            <motion.path 
              animate={{ 
                fillOpacity: activeTab === 'solid' ? 1 : 0.18,
                strokeWidth: activeTab === 'solid' ? 0 : 1
              }}
              transition={springTransition}
              d="M187 136.233C186.587 136.491 186.522 136.564 186.458 136.56C172.993 136.514 159.496 137.057 146.082 136.256C131.023 135.353 122.18 118.901 129.163 105.432C134.097 95.9137 139.747 86.7732 145.081 77.4624C146.33 75.2797 147.598 73.1063 149.119 70.4678C161.867 92.5982 174.404 114.37 187 136.233Z" 
              fill="currentColor"
              stroke="currentColor"
            />
          </motion.g>

        </svg>
      </div>

    </div>
  );
};
