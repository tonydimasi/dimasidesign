import React, { useEffect, useRef, useState } from 'react';

export const AsciiMeshBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const preRef = useRef<HTMLPreElement | null>(null);
  
  const [fontSize, setFontSize] = useState<number>(11);
  const [charHeight, setCharHeight] = useState<number>(14);
  const [charWidth, setCharWidth] = useState<number>(6.6);

  // Track relative mouse coordinates in pixels relative to the container element
  const mouseRef = useRef<{ px: number; py: number; active: boolean }>({
    px: 0,
    py: 0,
    active: false,
  });

  // Track 3D tilt state for interactive, heavy physical plane depth
  const tiltRef = useRef<{
    targetTiltX: number;
    targetTiltY: number;
    currentTiltX: number;
    currentTiltY: number;
    targetOffsetX: number;
    targetOffsetY: number;
    currentOffsetX: number;
    currentOffsetY: number;
    lastTickTime: number;
  }>({
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
    targetOffsetX: 0,
    targetOffsetY: 0,
    currentOffsetX: 0,
    currentOffsetY: 0,
    lastTickTime: Date.now(),
  });

  // Grid dimensions ref to use safely inside requestAnimationFrame without re-mounting
  const gridRef = useRef<{ cols: number; rows: number }>({ cols: 100, rows: 40 });

  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      // Select layout sizes based on screen category for superb layout density
      let fSize = 10;
      if (window.innerWidth >= 1536) {
        fSize = 13.5;
      } else if (window.innerWidth >= 1280) {
        fSize = 12.5;
      } else if (window.innerWidth >= 1024) {
        fSize = 11.5;
      } else if (window.innerWidth >= 768) {
        fSize = 10;
      } else {
        fSize = 7.5;
      }

      // Exact monospace proportions for a perfectly synchronized layout
      const cWidth = fSize * 0.6; // exact ratio for monospace characters
      const cHeight = fSize * 1.12; // vertical line-height multiplier

      setFontSize(fSize);
      setCharWidth(cWidth);
      setCharHeight(cHeight);

      // Map grid dimensions to precisely fill 100% of the screen dimension
      gridRef.current.cols = Math.max(20, Math.floor(width / cWidth) + 1);
      gridRef.current.rows = Math.max(10, Math.floor(height / cHeight) + 1);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const px = e.clientX - rect.left;
        const py = e.clientY - rect.top;
        
        // Active check relative to the bounding rect of the container
        if (
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom
        ) {
          mouseRef.current.px = px;
          mouseRef.current.py = py;
          mouseRef.current.active = true;

          // Compute smooth normalized coords from container center [-1.0, 1.0]
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const normX = (e.clientX - (rect.left + centerX)) / centerX;
          const normY = (e.clientY - (rect.top + centerY)) / centerY;

          const maxTiltX = 4.0;
          const maxTiltY = 4.0;
          const maxShiftX = 8.0;
          const maxShiftY = 8.0;

          tiltRef.current.targetTiltX = normX * maxTiltY;
          tiltRef.current.targetTiltY = -normY * maxTiltX;
          tiltRef.current.targetOffsetX = normX * maxShiftX;
          tiltRef.current.targetOffsetY = normY * maxShiftY;
          return;
        }
      }
      mouseRef.current.active = false;
      tiltRef.current.targetTiltX = 0;
      tiltRef.current.targetTiltY = 0;
      tiltRef.current.targetOffsetX = 0;
      tiltRef.current.targetOffsetY = 0;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
      tiltRef.current.targetTiltX = 0;
      tiltRef.current.targetTiltY = 0;
      tiltRef.current.targetOffsetX = 0;
      tiltRef.current.targetOffsetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    let animationId: number;

    const tick = (timestamp: number) => {
      const time = timestamp / 1000;
      const { cols, rows } = gridRef.current;
      
      let textBuffer = '';
      
      // Dynamic undulating pulse for the interaction hotspot
      const mousePulse = 1.0 + 0.25 * Math.sin(time * 5.5);

      // 1. Process 3D Tilt Interpolation
      const nowMs = Date.now();
      const frameDtSec = Math.min(0.08, (nowMs - tiltRef.current.lastTickTime) / 1000.0);
      tiltRef.current.lastTickTime = nowMs;

      const lerpFactor = 1.0 - Math.exp(-3.5 * frameDtSec);
      
      const tilt = tiltRef.current;
      tilt.currentTiltX += (tilt.targetTiltX - tilt.currentTiltX) * lerpFactor;
      tilt.currentTiltY += (tilt.targetTiltY - tilt.currentTiltY) * lerpFactor;
      tilt.currentOffsetX += (tilt.targetOffsetX - tilt.currentOffsetX) * lerpFactor;
      tilt.currentOffsetY += (tilt.targetOffsetY - tilt.currentOffsetY) * lerpFactor;

      // Apply transform smoothly inline to preRef
      if (preRef.current) {
        preRef.current.style.transform = `perspective(1000px) rotateX(${tilt.currentTiltY}deg) rotateY(${tilt.currentTiltX}deg) translate3d(${tilt.currentOffsetX}px, ${tilt.currentOffsetY}px, 0) scale(1.04)`;
      }

      // 2. Compute character stream buffer
      for (let r = 0; r < rows; r++) {
        // Map row to relative float space [-1, 1] for wave calculations
        const y = -((r / (rows - 1)) * 2 - 1);
        
        for (let c = 0; c < cols; c++) {
          // Map column to relative float space [-1, 1]
          const x = (c / (cols - 1)) * 2 - 1;

          // Multi-frequency wave formula for a highly fluid and organic background rhythm
          const wave1 = Math.sin(x * 3.2 + time * 0.6) * Math.cos(y * 2.8 - time * 0.5);
          const wave2 = Math.sin(x * y * 4.0 + time * 0.35);
          const wave3 = Math.cos((x + y) * 2.0 - time * 0.2);
          
          let intensity = (wave1 + wave2 + wave3) / 3;

          // Pure mathematical overlay for cursor interactive illumination (combines perfectly)
          if (mouseRef.current.active) {
            // Find absolute pixel coordinates of this cell center
            const charX = c * charWidth + charWidth / 2;
            const charY = r * charHeight + charHeight / 2;

            const dx = charX - mouseRef.current.px;
            const dy = charY - mouseRef.current.py;
            
            // Standard Euclidean distance in pixels
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const radius = 220; // Slightly larger interaction zone for a delicate, wider gradient
            if (dist < radius) {
              const normalDist = dist / radius;
              // Smoothstep decay (1 - (3t^2 - 2t^3)) for an organic, perfectly uniform gradient drop-off
              const smoothFactor = 1 - (3 * normalDist * normalDist - 2 * normalDist * normalDist * normalDist);
              const hoverGlow = smoothFactor * 1.95 * mousePulse;
              intensity += hoverGlow;
            }
          }

          // Character threshold mappings to produce density gradient
          let char = ' ';
          if (intensity > 1.25) {
            char = '@';
          } else if (intensity > 1.05) {
            char = '#';
          } else if (intensity > 0.85) {
            char = '%';
          } else if (intensity > 0.65) {
            char = '*';
          } else if (intensity > 0.45) {
            char = '+';
          } else if (intensity > 0.25) {
            char = '=';
          } else if (intensity > 0.05) {
            char = '-';
          } else if (intensity > -0.15) {
            char = ':';
          } else if (intensity > -0.35) {
            char = '·';
          } else if (intensity > -0.6) {
            char = '.';
          }

          textBuffer += char;
        }
        textBuffer += '\n';
      }

      if (preRef.current) {
        preRef.current.textContent = textBuffer;
      }

      animationId = requestAnimationFrame(tick);
    };

    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [charWidth, charHeight]);

  return (
    <div 
      ref={containerRef}
      id="ascii-mesh-root" 
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 bg-transparent p-0 m-0"
    >
      <pre
        ref={preRef}
        id="ascii-canvas-display"
        className="absolute inset-0 w-full h-full font-mono text-left select-none pointer-events-none p-0 m-0 overflow-hidden text-[#3ceadc] opacity-[0.045] whitespace-pre"
        style={{
          fontFamily: '"Courier New", Courier, monospace',
          fontSize: `${fontSize}px`,
          lineHeight: `${charHeight}px`,
          textShadow: '0 0 2px rgba(60, 234, 220, 0.45)',
          willChange: 'transform',
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
        }}
      />
    </div>
  );
};
