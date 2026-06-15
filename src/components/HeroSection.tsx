/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="hero-outer-section">
      <div className="hero-flex-layout">
        
        {/* Left Column: Premium Resume Description (Aligned with Logo left margin and bottom-aligned with WEBDEV) */}
        <div 
          className="hero-resume-text animate-elegant-fade"
          style={{ animationDelay: '300ms' }}
        >
          Antonio Di Masi — UX/UI Designer con 10+ anni di esperienza nel design digitale, branding e sviluppo web.
        </div>

        {/* Right Column: Hero Typographic Rows */}
        <div className="hero-container">
        
        {/* ROW 1: ?→! UX DESIGN */}
        <div 
          className="hero-row row-indent-1 animate-elegant-fade"
          style={{ animationDelay: '100ms' }}
        >
          <div className="row-wrapper">
            <span className="hero-glyph-left">?—&gt;!</span>
            <span className="hero-main-text">UX DESIGN</span>
          </div>
        </div>

        {/* ROW 2: CRO OPT +++ */}
        <div 
          className="hero-row row-indent-2 animate-elegant-fade"
          style={{ animationDelay: '250ms' }}
        >
          <div className="row-wrapper">
            <span className="hero-main-text">CRO OPT</span>
            <span className="hero-glyph-right">+++</span>
          </div>
        </div>

        {/* ROW 3: :)) BRAND */}
        <div 
          className="hero-row row-indent-3 animate-elegant-fade"
          style={{ animationDelay: '400ms' }}
        >
          <div className="row-wrapper">
            <span className="hero-glyph-left">:))</span>
            <span className="hero-main-text">BRAND</span>
          </div>
        </div>

        {/* ROW 4: WEBDEV <[{ */}
        <div 
          className="hero-row row-indent-4 animate-elegant-fade"
          style={{ animationDelay: '550ms' }}
        >
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
