/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TopologyBackground } from './components/TopologyBackground';
import { CustomCursor } from './components/CustomCursor';
import { Logo } from './components/Logo';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
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

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;
    const progress = Math.min(1, scrollTop / (clientHeight || 1));
    setScrollProgress(progress);
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
        <TopologyBackground onPointerStateChange={handlePointerStateChange} scrollProgress={scrollProgress}>
          
          {/* 2. Logo positioned back in its original top-left corner inside the card */}
          <div className="logo-placement animate-elegant-fade" style={{ animationDelay: '100ms' }}>
            <Logo />
          </div>

          {/* 3. Main scrollable view pane housing the fixed Hero and the scrolling projects */}
          <div id="main-scroll-pane" className="scroll-container-pane" onScroll={handleScroll}>
            
            {/* The Hero section as the first screen */}
            <div className="hero-scroll-screen">
              <HeroSection />
            </div>

            {/* The premium Projects showcase as the second section */}
            <ProjectsSection />

          </div>

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

