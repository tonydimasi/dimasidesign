/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopologyBackground } from './components/TopologyBackground';
import { CustomCursor } from './components/CustomCursor';
import { Logo } from './components/Logo';
import { HeroSection } from './components/HeroSection';

export default function App() {
  const [cursor, setCursor] = useState({
    isHovered: false,
    isPressed: false,
    clientX: -100,
    clientY: -100,
  });

  const handlePointerStateChange = (
    isHovered: boolean,
    isPressed: boolean,
    clientX: number,
    clientY: number
  ) => {
    setCursor({
      isHovered,
      isPressed,
      clientX,
      clientY,
    });
  };

  return (
    <main className="w-screen h-screen bg-[#1d1d1d] overflow-hidden flex items-center justify-center p-2.5 sm:p-3.5 md:p-4 select-none text-white font-sans selection:bg-[#4be8f2] selection:text-[#1d1d1d]">
      
      {/* 
        Interactive nested card with exactly 20px border radius as requested.
        No shadow, and the solid dark background (#1d1d1d) is visible in the narrow margins around it.
      */}
      <div 
        id="hero-rounded-card"
        className="relative w-full h-full rounded-[20px] overflow-hidden bg-[#1d1d1d] border border-white/5 flex items-center justify-center"
      >
        {/* 1. Interactive Topology Background (handles deforming fluid WebGL & 3D tilt plate) */}
        <TopologyBackground onPointerStateChange={handlePointerStateChange}>
          
          {/* 2. Logo positioned back in its original top-left corner inside the card */}
          <div className="absolute top-8 left-8 z-40 animate-elegant-fade" style={{ animationDelay: '100ms' }}>
            <Logo />
          </div>

          {/* 3. Hero Visual Section rendering the exact 4 casing uppercase typographic rows in Inter Light */}
          <HeroSection />

        </TopologyBackground>
      </div>

      {/* 4. Fine-tuned custom target cursor tracking pointer coordinates */}
      <CustomCursor
        isHovered={cursor.isHovered}
        isPressed={cursor.isPressed}
        clientX={cursor.clientX}
        clientY={cursor.clientY}
      />
    </main>
  );
}
