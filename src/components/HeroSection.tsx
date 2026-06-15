/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useGsapEntrance } from '../hooks/useGsapEntrance';

export const HeroSection: React.FC = () => {
  const containerRef = useGsapEntrance();

  return (
    <section className="hero-outer-section">
      <div className="hero-flex-layout" ref={containerRef}>
        
        {/* Left Column: Premium Resume Description */}
        <div className="hero-resume-text">
          Antonio Di Masi — UX/UI Designer con 10+ anni di esperienza nel design digitale, branding e sviluppo web.
        </div>

        {/* Right Column: Hero Typographic Rows */}
        <div className="hero-container">
        
        {/* ROW 1: ?→! UX DESIGN */}
        <div className="hero-row row-indent-1">
          <div className="row-wrapper">
            <span className="hero-glyph-left">?—&gt;!</span>
            <span className="hero-main-text">UX DESIGN</span>
          </div>
        </div>

        {/* ROW 2: CRO OPT +++ */}
        <div className="hero-row row-indent-2">
          <div className="row-wrapper">
            <span className="hero-main-text">CRO OPT</span>
            <span className="hero-glyph-right">+++</span>
          </div>
        </div>

        {/* ROW 3: :)) BRAND */}
        <div className="hero-row row-indent-3">
          <div className="row-wrapper">
            <span className="hero-glyph-left">:))</span>
            <span className="hero-main-text">BRAND</span>
          </div>
        </div>

        {/* ROW 4: WEBDEV <[{ */}
        <div className="hero-row row-indent-4">
          <div className="row-wrapper">
            <span className="hero-main-text">WEBDEV</span>
            <span className="hero-glyph-right">&lt;[&#123;</span>
          </div>
        </div>

      </div>
    </div>
  </section>
  );
};