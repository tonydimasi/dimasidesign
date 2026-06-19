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
import { Preloader } from './components/Preloader';
import { SkillsMarquee } from './components/SkillsMarquee';
import { IntegratedActivitySection } from './components/IntegratedActivitySection';
import { FooterSection } from './components/FooterSection';

export default function App() {
  const [isReady, setIsReady]   = useState(false);
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
    setCursor({ isHovered, isPressed, clientX, clientY });
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const scrollTop    = e.currentTarget.scrollTop;
    const clientHeight = e.currentTarget.clientHeight;
    const progress     = Math.min(1, scrollTop / (clientHeight || 1));
    setScrollProgress(progress);
  };

  return (
    <>
      {/* Preloader — sits above everything, calls setIsReady when done */}
      {!isReady && <Preloader onComplete={() => setIsReady(true)} />}

      <main className="app-container" style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        <div id="hero-rounded-card" className="card-wrapper">

          <TopologyBackground
            onPointerStateChange={handlePointerStateChange}
            scrollProgress={scrollProgress}
          >
            {/* Logo sits statically on top of all canvas layers and scroll pane */}
            <div className="logo-placement animate-elegant-fade" style={{ animationDelay: '100ms', zIndex: 100 }}>
              <Logo />
            </div>

            <div id="main-scroll-pane" className="scroll-container-pane" onScroll={handleScroll}>
              <div className="hero-scroll-screen">
                <HeroSection />
              </div>
              <ProjectsSection />
              <SkillsMarquee />
               <IntegratedActivitySection />
              <FooterSection />
            </div>
          </TopologyBackground>

        </div>

        <CustomCursor
          isHovered={cursor.isHovered}
          isPressed={cursor.isPressed}
          clientX={cursor.clientX}
          clientY={cursor.clientY}
        />
      </main>
    </>
  );
}