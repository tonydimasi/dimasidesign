import React, { useState } from 'react';
import { motion } from 'motion/react';
import funnelSvgRaw from '../../funnel.svg?raw';

export const CROFunnelAnimation: React.FC = () => {
  const [isOptimized, setIsOptimized] = useState<boolean>(true);

  // Configuration for continuous cascading shapes falling into the funnel mouth
  // They start wide, get squeezed towards the funnel throat (50%), and escape through the bottom
  const cascadingShapes = [
    { id: 1, type: 'square' as const, delay: 0, startX: '20%' },
    { id: 2, type: 'plus' as const, delay: 0.5, startX: '35%' },
    { id: 3, type: 'square' as const, delay: 1.0, startX: '75%' },
    { id: 4, type: 'plus' as const, delay: 1.5, startX: '65%' },
    { id: 5, type: 'square' as const, delay: 2.0, startX: '28%' },
    { id: 6, type: 'plus' as const, delay: 2.5, startX: '55%' },
    { id: 7, type: 'square' as const, delay: 3.0, startX: '80%' },
    { id: 8, type: 'plus' as const, delay: 3.5, startX: '45%' },
  ];

  return (
    <div 
      className="relative w-full h-full flex flex-col justify-center items-center p-6 bg-zinc-950/80 rounded-xl overflow-hidden font-sans border border-[#3CEADC]/10 cursor-pointer select-none"
      onClick={() => setIsOptimized(!isOptimized)}
      title="Clicca per invertire lo stato CRO"
    >
      
      {/* Main Vector Stage - Heavily Focused on the Importer Funnel Vector */}
      <div className="relative w-full h-full flex items-center justify-center min-h-0 overflow-hidden">
        
        {/* Underlay glow background */}
        <div className="absolute w-[180px] h-[180px] rounded-full bg-[#3CEADC]/5 filter blur-[60px] pointer-events-none" />

        {/* The User-Provided Vector, rendered dynamically and responsively */}
        <div 
          className="w-full h-full max-h-[360px] max-w-[240px] relative text-[#3CEADC] flex items-center justify-center opacity-90 transition-all duration-500"
          style={{
            filter: isOptimized 
              ? 'drop-shadow(0 0 15px rgba(60,234,220,0.12))' 
              : 'drop-shadow(0 0 4px rgba(60,234,220,0.02))'
          }}
          dangerouslySetInnerHTML={{ 
            __html: funnelSvgRaw
              .replace('<svg ', '<svg class="w-full h-full object-contain" ')
              .replace(/fill="#3CEADC"/g, 'fill="currentColor" fill-opacity="0.85"')
              .replace(/stroke="#3CEADC"/g, 'stroke="currentColor" stroke-opacity="0.8"')
          }}
        />

        {/* CASCADING SHAPES ANIMATION LAYER */}
        {/* Render squares and pluses flying down into the mouth of the funnel, conforming to its physical shape */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="relative w-full h-full max-h-[360px] max-w-[240px]">
            
            {cascadingShapes.map((shape) => {
              // Custom speed and flow settings based on isOptimized
              const duration = isOptimized ? 1.4 : 2.6; // faster, smoother flows when optimized
              const textShadow = isOptimized ? '0 0 8px rgba(60,234,220,0.8)' : 'none';
              const shapeColor = isOptimized ? '#3CEADC' : '#71717a';

              return (
                <motion.div
                  key={shape.id}
                  initial={{ 
                    top: '0%', 
                    left: shape.startX, 
                    scale: 1.1, 
                    opacity: 0, 
                    rotate: 0 
                  }}
                  animate={{
                    // 1. Vertical descent: Top mouth (0-20%) -> Middle funnel constriction (60%) -> Throat pipeline (75%) -> Escape bottom (98%)
                    top: ['0%', '26%', '60%', '76%', '98%'],
                    // 2. Horizontal squeeze: conforms to actual funnel mouth slope, converging tightly to center (50%)
                    left: [shape.startX, shape.startX, '50%', '50%', '50%'],
                    // 3. Mathematical scale: shrinks as it gets squeezed into depth, scales up slightly at exit
                    scale: [1.1, 0.95, 0.55, 0.45, 0.35],
                    // 4. Opacity lifecycle
                    opacity: [0, 0.9, 0.85, 0.4, 0],
                    // 5. Dynamic spin
                    rotate: [0, 90, 270, 450, 720],
                  }}
                  transition={{
                    duration: duration,
                    repeat: Infinity,
                    delay: shape.delay,
                    ease: "easeInOut",
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                >
                  {shape.type === 'square' ? (
                    <div 
                      className="w-3.5 h-3.5 border rounded-sm transition-colors duration-500"
                      style={{ 
                        borderColor: shapeColor,
                        backgroundColor: isOptimized ? 'rgba(60, 234, 220, 0.25)' : 'rgba(113, 113, 122, 0.1)',
                        boxShadow: isOptimized ? '0 0 10px rgba(60,234,220,0.4)' : 'none'
                      }}
                    />
                  ) : (
                    <span 
                      className="font-sans text-xs font-black transition-colors duration-500 select-none animate-pulse"
                      style={{ 
                        color: shapeColor,
                        textShadow: textShadow
                      }}
                    >
                      +
                    </span>
                  )}
                </motion.div>
              );
            })}

          </div>
        </div>

      </div>

    </div>
  );
};
