/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Unified interface representing local physical vortices in the liquid
export interface Vortex {
  x: number;          // Coords normalized aspect-ratio (WebGL coordinates)
  y: number;
  vx: number;         // Velocity in WebGL space
  vy: number;
  strength: number;   // Spin strength and direction (negative = CCW, positive = CW)
  radius: number;     // Domain of influence
  life: number;       // Progress of decay (0 to 1)
  decaySpeed: number; // Speed of decay per frame
  isAmbient: boolean; // Whether it is an autonomous ambient current
  ambientOffset: number; // Phase offset for ambient motion
}

// 3D Tilt orientation State
export interface TiltState {
  targetTiltX: number;
  targetTiltY: number;
  currentTiltX: number;
  currentTiltY: number;
  targetOffsetX: number;
  targetOffsetY: number;
  currentOffsetX: number;
  currentOffsetY: number;
}
