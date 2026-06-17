/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const LOGO_PATHS = [
  "M443 217.764C322.732 217.764 225.236 120.268 225.236 0.000148773L443 0.000139254L443 217.764Z",
  "M443 468.619C322.732 468.619 225.236 371.123 225.236 250.855L443 250.855L443 468.619Z",
  "M193.212 439.484C128.123 401.832 84.3301 331.458 84.3301 250.855H193.212L193.212 439.484ZM193.212 188.629C128.123 150.976 84.3301 80.603 84.3301 0L193.212 0V188.629Z",
  "M53.374 393.675C20.1286 355.442 3.47557e-05 305.5 0 250.855H53.374L53.374 393.675ZM53.374 142.819C20.1286 104.586 0 54.6444 0 0L53.374 0L53.374 142.819Z",
];

export const Logo: React.FC = () => {
  return (
    <div 
      className="logo-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        pointerEvents: 'auto',
      }}
    >
      <svg 
        viewBox="0 0 443 469" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '38px',
          height: 'auto',
          display: 'block',
        }}
      >
        {LOGO_PATHS.map((d, i) => (
          <path 
            key={i} 
            d={d} 
            fill="#3ceadc"
          />
        ))}
      </svg>
    </div>
  );
};
