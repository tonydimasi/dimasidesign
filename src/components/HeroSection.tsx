/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full h-full flex flex-col justify-center px-4 sm:px-12 md:px-20 lg:px-24 select-none pointer-events-none">
      
      {/* 
        Stack holding 4 typographic rows matched to the design.
        Each row is an interactive container with stable transition elements that do not push neighbors.
      */}
      <div className="flex flex-col space-y-1 sm:space-y-3 md:space-y-4 max-w-6xl w-full mx-auto pt-8">
        
        {/* ROW 1: ?→! UX DESIGN */}
        <div 
          className="group flex items-center self-start pl-12 sm:pl-20 md:pl-28 lg:pl-36 pointer-events-auto cursor-pointer animate-elegant-fade"
          style={{ animationDelay: '150ms' }}
        >
          <div className="relative flex items-center transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6">
            {/* Stable absolute left glyph: reveals on hover, completely free of layout-shifting */}
            <span 
              className="absolute right-full mr-4 sm:mr-6 md:mr-8 font-[100] text-[#4be8f2] text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[6.2rem] opacity-0 translate-x-4 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-40 group-hover:translate-x-0 select-none pointer-events-none whitespace-nowrap"
            >
              ?—&gt;!
            </span>
            {/* Main heading in Inter Light (font-[200]) */}
            <span 
              className="text-white font-[200] uppercase tracking-normal text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7.4rem] leading-[0.95] transition-colors duration-350 group-hover:text-white/100 text-white/90 whitespace-nowrap"
            >
              UX DESIGN
            </span>
          </div>
        </div>

        {/* ROW 2: CRO OPT +++ */}
        <div 
          className="group flex items-center self-start pl-24 sm:pl-40 md:pl-56 lg:pl-[20rem] pointer-events-auto cursor-pointer animate-elegant-fade"
          style={{ animationDelay: '300ms' }}
        >
          <div className="relative flex items-center transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6">
            {/* Main heading in Inter Light */}
            <span 
              className="text-white font-[200] uppercase tracking-normal text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7.4rem] leading-[0.95] transition-colors duration-350 group-hover:text-white/100 text-white/90 whitespace-nowrap"
            >
              CRO OPT
            </span>
            {/* Stable absolute right glyph: reveals on hover, completely free of layout-shifting */}
            <span 
              className="absolute left-full ml-4 sm:ml-6 md:ml-8 font-[100] text-[#4be8f2] text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[6.2rem] opacity-0 -translate-x-4 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-40 group-hover:translate-x-0 select-none pointer-events-none whitespace-nowrap"
            >
              +++
            </span>
          </div>
        </div>

        {/* ROW 3: :)) BRAND */}
        <div 
          className="group flex items-center self-start pl-16 sm:pl-28 md:pl-40 lg:pl-52 pointer-events-auto cursor-pointer animate-elegant-fade"
          style={{ animationDelay: '450ms' }}
        >
          <div className="relative flex items-center transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6">
            {/* Stable absolute left glyph: reveals on hover, completely free of layout-shifting */}
            <span 
              className="absolute right-full mr-4 sm:mr-6 md:mr-8 font-[100] text-[#4be8f2] text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[6.2rem] opacity-0 translate-x-4 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-40 group-hover:translate-x-0 select-none pointer-events-none whitespace-nowrap"
            >
              :))
            </span>
            {/* Main heading in Inter Light */}
            <span 
              className="text-white font-[200] uppercase tracking-normal text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7.4rem] leading-[0.95] transition-colors duration-350 group-hover:text-white/100 text-white/90 whitespace-nowrap"
            >
              BRAND
            </span>
          </div>
        </div>

        {/* ROW 4: WEBDEV <[{ */}
        <div 
          className="group flex items-center self-start pl-28 sm:pl-48 md:pl-72 lg:pl-[24rem] pointer-events-auto cursor-pointer animate-elegant-fade"
          style={{ animationDelay: '600ms' }}
        >
          <div className="relative flex items-center transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6">
            {/* Main heading in Inter Light */}
            <span 
              className="text-white font-[200] uppercase tracking-normal text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7.4rem] leading-[0.95] transition-colors duration-350 group-hover:text-white/100 text-white/90 whitespace-nowrap"
            >
              WEBDEV
            </span>
            {/* Stable absolute right glyph: reveals on hover, completely free of layout-shifting */}
            <span 
              className="absolute left-full ml-4 sm:ml-6 md:ml-8 font-[100] text-[#4be8f2] text-2xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-[6.2rem] opacity-0 -translate-x-4 transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-40 group-hover:translate-x-0 select-none pointer-events-none whitespace-nowrap"
            >
              &lt;[&#123;
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
