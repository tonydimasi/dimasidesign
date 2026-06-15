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
    <main className="app-container">
      
      {/* 
        Interactive nested card with exactly 20px border radius as requested.
        No shadow, and the solid dark background (#1d1d1d) is visible in the narrow margins around it (8px).
      */}
      <div 
        id="hero-rounded-card"
        className="card-wrapper"
      >
        {/* 1. Interactive Topology Background (handles deforming fluid WebGL & 3D tilt plate) */}
        <TopologyBackground onPointerStateChange={handlePointerStateChange}>
          
          {/* 2. Logo positioned back in its original top-left corner inside the card */}
          <div className="logo-placement animate-elegant-fade" style={{ animationDelay: '100ms' }}>
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
