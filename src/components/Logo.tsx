/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
// @ts-ignore
import logoImg from './logo.png';

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
      <img 
        src={logoImg} 
        alt="Logo" 
        referrerPolicy="no-referrer"
        style={{
          width: '140px',
          height: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
};
