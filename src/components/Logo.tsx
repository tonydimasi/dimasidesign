/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3 pointer-events-auto">
      {/* 6-piece geometric grid leaf logo from the Figma mockup */}
      <svg 
        width="44" 
        height="38" 
        viewBox="0 0 160 128" 
        fill="currentColor" 
        className="text-[#4be8f2]"
        style={{ filter: 'drop-shadow(0 0 6px rgba(75, 232, 242, 0.45))' }}
      >
        {/* Row 1 - Top quadrants/crescents curving down-right */}
        {/* Column 1 - narrowest */}
        <path d="M 0 0 C 0 33 5.4 60 12 60 L 12 0 Z" />
        {/* Column 2 - medium */}
        <path d="M 20 0 C 20 33 34.4 60 52 60 L 52 0 Z" />
        {/* Column 3 - wide quadrant */}
        <path d="M 60 0 C 60 33 105 60 160 60 L 160 0 Z" />

        {/* Row 2 - Bottom quadrants/crescents curving up-right (vertically mirrored) */}
        {/* Column 1 - narrowest */}
        <path d="M 0 128 C 0 95 5.4 68 12 68 L 12 128 Z" />
        {/* Column 2 - medium */}
        <path d="M 20 128 C 20 95 34.4 68 52 68 L 52 128 Z" />
        {/* Column 3 - wide quadrant */}
        <path d="M 60 128 C 60 95 105 68 160 68 L 160 128 Z" />
      </svg>
    </div>
  );
};
