/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

interface CustomCursorProps {
  isHovered: boolean;
  isPressed: boolean;
  clientX: number;
  clientY: number;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({
  isHovered,
  isPressed,
  clientX,
  clientY,
}) => {
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (cursorRef.current && isHovered) {
      cursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
    }
  }, [clientX, clientY, isHovered]);

  return (
    <div
      id="custom-cursor-container"
      ref={cursorRef}
      className="fixed pointer-events-none z-50 top-0 left-0"
      style={{
        width: '1px',
        height: '1px',
        transform: isHovered ? `translate3d(${clientX}px, ${clientY}px, 0)` : 'translate3d(-100px, -100px, 0)',
        willChange: 'transform',
      }}
    >
      <div 
        className="absolute flex items-center justify-center animate-fade-in"
        style={{
          width: '18px',
          height: '18px',
          marginLeft: '-9px',
          marginTop: '-9px',
          opacity: isHovered ? 1 : 0,
          scale: isPressed ? 0.75 : 1,
          transition: 'opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), scale 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Outer classic target border ring */}
        <div 
          className="absolute inset-0 rounded-full border border-white/60 animate-pulse" 
          style={{ borderWidth: '1px', animationDuration: '3s' }} 
        />
        
        {/* Inner intense glowing solid cyan dot */}
        <div 
          className="w-[5px] h-[5px] rounded-full bg-[#4be8f2]" 
          style={{ boxShadow: '0 0 8px 2px rgba(75, 232, 242, 0.8)' }} 
        />
      </div>
    </div>
  );
};
