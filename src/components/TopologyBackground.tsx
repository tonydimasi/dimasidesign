/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Vortex } from '../types';

interface TopologyBackgroundProps {
  onPointerStateChange?: (isHovered: boolean, isPressed: boolean, x: number, y: number) => void;
  scrollProgress?: number;
  children?: React.ReactNode;
}

export const TopologyBackground: React.FC<TopologyBackgroundProps> = ({
  onPointerStateChange,
  scrollProgress = 0,
  children,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const tiltPlateRef = useRef<HTMLDivElement | null>(null);
  
  const stateRef = useRef<{
    gl: WebGLRenderingContext | null;
    program: WebGLProgram | null;
    vortices: Vortex[];
    lastPointerX: number;
    lastPointerY: number;
    lastPointerTime: number;
    lastSpawnedX: number;
    lastSpawnedY: number;
    lastSpawnedTime: number;
    lastTickTime: number;
    isFirstMoveSinceEntry: boolean;
    isActivePointer: boolean;
    currentPointerX: number;
    currentPointerY: number;
    animationId: number;
    startTime: number;
    targetTiltX: number;
    targetTiltY: number;
    currentTiltX: number;
    currentTiltY: number;
    targetOffsetX: number;
    targetOffsetY: number;
    currentOffsetX: number;
    currentOffsetY: number;
  }>({
    gl: null,
    program: null,
    vortices: [],
    lastPointerX: 0,
    lastPointerY: 0,
    lastPointerTime: 0,
    lastSpawnedX: 0,
    lastSpawnedY: 0,
    lastSpawnedTime: 0,
    lastTickTime: Date.now(),
    isFirstMoveSinceEntry: true,
    isActivePointer: false,
    currentPointerX: 0,
    currentPointerY: 0,
    animationId: 0,
    startTime: Date.now(),
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
    targetOffsetX: 0,
    targetOffsetY: 0,
    currentOffsetX: 0,
    currentOffsetY: 0,
  });

  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Initialize WebGL Context
    const gl = canvas.getContext('webgl', { 
      alpha: false, 
      depth: false, 
      antialias: true,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false 
    });
    
    if (!gl) {
      console.error('WebGL is not supported in this browser.');
      setHasError(true);
      return;
    }
    stateRef.current.gl = gl;

    // 2. Define Vertex and Fragment Shaders
    const vertexSource = `
      attribute vec2 position;
      varying vec2 v_uv;
      void main() {
          v_uv = position * 0.5 + 0.5;
          gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentSource = `
      precision highp float;

      #define NUM_POINTS 32

      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;

      uniform vec2 u_points[NUM_POINTS];
      uniform vec2 u_vels[NUM_POINTS];
      uniform float u_strengths[NUM_POINTS];
      uniform float u_radii[NUM_POINTS];

      // Procedural 2D Value Noise with optimized hash function
      float hash(vec2 p) {
          p = fract(p * vec2(127.1, 311.7));
          p += dot(p, p + 19.19);
          return fract(p.x * p.y);
      }

      float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
                     mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
      }

      // Fractional Brownian Motion (5 octaves) with rotating axis mapping to decouple grid lines
      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          float frequency = 1.0;
          vec2 r1 = vec2(0.866, 0.5);
          vec2 r2 = vec2(-0.5, 0.866);
          for (int i = 0; i < 5; i++) {
              value += amplitude * noise(p * frequency);
              p = vec2(dot(p, r1), dot(p, r2)) * 2.04;
              amplitude *= 0.48;
          }
          return value;
      }

      void main() {
          // Normalise coordinates centered at (0,0), aspect corrected
          vec2 p_raw = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / min(u_resolution.x, u_resolution.y);
          
          // Cumulative fluid physical displacement (vortex rotation + velocity push)
          vec2 warp_offset = vec2(0.0);
          for (int i = 0; i < NUM_POINTS; i++) {
              float strength = u_strengths[i];
              float absStrength = abs(strength);
              if (absStrength > 0.005) {
                  vec2 dVec = p_raw - u_points[i];
                  float dist = length(dVec);
                  float radius = u_radii[i];
                  
                  if (dist < radius) {
                      float t = 1.0 - dist / radius;
                      float influence = t * t * (3.0 - 2.0 * t) * absStrength;
                      
                      float isInteractive = step(3.5, float(i));
                      
                      // Precise mathematical deforming gravity/contraction for elegant parallel contour warping
                      float spinScale = mix(1.2, 0.0, isInteractive);
                      float pushScale = mix(0.4, 0.16, isInteractive);
                      float gravityScale = mix(0.12, 0.32, isInteractive);
                      
                      float spinDir = sign(strength);
                      
                      // 1. Vortex rotational swirl (0 for interactive elements; lovely ambient background drift)
                      vec2 rotForce = vec2(-dVec.y, dVec.x) * influence * spinScale * spinDir;
                      
                      // 2. Linear momentum drag follow
                      vec2 pushForce = u_vels[i] * influence * pushScale;
                      
                      // 3. Symmetrical lens contraction/gravity warp (organic terrain-like contour lines warping)
                      vec2 gravityForce = dVec * influence * gravityScale;
                      
                      warp_offset += rotForce + pushForce + gravityForce;
                  }
              }
          }
          
          // Warp the space coordinate domain interactively
          vec2 p = p_raw - warp_offset;
          
          // Slightly zoomed-in macro view for a closer, more elegant look at the flowing topology (applied post-warp so mouse coordinates match 1:1)
          p *= 0.56;
          
          // Create the glowing textured cosmic background matching the #1d1d1d spec
          vec2 screen_uv = gl_FragCoord.xy / u_resolution.xy;
          
          // Solid pure dark charcoal slate background matching #1d1d1d perfectly
          vec3 bg_color = vec3(0.113725, 0.113725, 0.113725);
          
          // 1-level gentle domain warp for unparalleled elegant topology (curved, elastic valleys)
          vec2 r;
          float drift = u_time * 0.018;
          
          r.x = fbm(p + drift);
          r.y = fbm(p + vec2(4.5, 2.3) - drift);
          
          // Pure beautiful topological elevation height map
          float f = fbm(p + r * 1.1 + drift * 0.5);
          
          // Increasing the density multiplier to generate significantly more visible topological flow lines
          float contour_coord = f * 105.0;
          
          // Draw thin, sharp, parallel elevation level curves
          float s = sin(contour_coord * 3.14159265);
          
          // Custom anti-aliased smoothstep contour lines
          // Highly crisp and ultra-thin vector line core with zero glow for an architectural blueprint feel
          float line_s = abs(s);
          float line_core = smoothstep(0.06, 0.0, line_s);         // Ultra-sharp fine line
          float line_glow = smoothstep(0.18, 0.0, line_s) * 0.06;   // Barely visible neon halo for premium aesthetic
          float total_line = clamp(line_core + line_glow, 0.0, 1.0);
          
          // Symmetrical contrast mask: dim lines in deep flat plains to keep the structure breathable
          float level_density = noise(p * 0.35 + u_time * 0.002) * 0.40 + 0.60;
          total_line *= level_density;
          
          // Perfect #3CEADC social brand cyan color for pure professional topology lines
          vec3 line_color = vec3(0.235294, 0.917647, 0.862745);
          
          // Increased visual visibility and elegant opacity blend for clearer vector topology lines
          vec3 final_color = mix(bg_color, line_color, total_line * 0.35);
          
          // Introduce crisp tactile film grain / paper texture noise
          float static_grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          // High-frequency animated boiling grain for high-end professional websites
          float moving_grain = fract(sin(dot(gl_FragCoord.xy, vec2(73.140693, 2.665144) + mod(u_time * 24.0, 100.0))) * 43758.5453123);
          float combined_grain = mix(static_grain, moving_grain, 0.50);
          
          // Balanced, sleek cinematic film grain that is present yet incredibly clean
          final_color += (combined_grain - 0.5) * 0.062;
          
          // Elegant subtle dark vignette frame to anchor screen limits without coloring the slate background
          float vignette = screen_uv.x * screen_uv.y * (1.0 - screen_uv.x) * (1.0 - screen_uv.y);
          vignette = clamp(pow(16.0 * vignette, 0.35), 0.0, 1.0);
          final_color *= mix(0.72, 1.0, vignette);
          
          // Prevent standard clamping overflow
          final_color = clamp(final_color, 0.0, 1.0);
          
          gl_FragColor = vec4(final_color, 1.0);
      }
    `;

    // 3. Compile and Link Shader Program
    const createShader = (type: number, source: string): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('An error occurred compiling the shaders:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, vertexSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vs || !fs) {
      setHasError(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setHasError(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Unable to initialize the shader program:', gl.getProgramInfoLog(program));
      setHasError(true);
      gl.deleteProgram(program);
      return;
    }
    stateRef.current.program = program;

    gl.deleteShader(vs);
    gl.deleteShader(fs);

    // 4. Create Fullscreen Quad Buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // 5. Initialize Physical Vortex Lists
    const initialVortices: Vortex[] = [];
    
    // Inject persistent ambient currents that slowly glide so the scene is forever active on load
    for (let i = 0; i < 4; i++) {
      initialVortices.push({
        x: (Math.random() - 0.5) * 1.5,
        y: (Math.random() - 0.5) * 1.5,
        vx: 0,
        vy: 0,
        strength: (Math.random() > 0.5 ? 1 : -1) * (0.4 + Math.random() * 0.3),
        radius: 0.2 + Math.random() * 0.15,
        life: 1.0,
        decaySpeed: 0.0,
        isAmbient: true,
        ambientOffset: Math.random() * Math.PI * 2,
      });
    }

    // Populate remaining 28 slots as inactive
    for (let i = 4; i < 32; i++) {
      initialVortices.push({
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        strength: 0,
        radius: 0,
        life: 0,
        decaySpeed: 0,
        isAmbient: false,
        ambientOffset: 0,
      });
    }
    stateRef.current.vortices = initialVortices;

    // 6. Responsive Canvas Sizing Handler
    const handleResize = () => {
      const container = containerRef.current;
      if (!container || !canvas) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    handleResize();

    // 7. Render Core Animation Loop
    const pointsArray = new Float32Array(32 * 2);
    const velsArray = new Float32Array(32 * 2);
    const strengthsArray = new Float32Array(32);
    const radiiArray = new Float32Array(32);

    const tick = () => {
      const state = stateRef.current;
      const nowMs = Date.now();
      const frameDtSec = Math.min(0.08, (nowMs - state.lastTickTime) / 1000.0);
      state.lastTickTime = nowMs;

      // Smoothly lerp tilt and offset values to give a physical 3D "heavy weight" effect to the plane
      const lerpFactor = 1.0 - Math.exp(-3.5 * frameDtSec);
      state.currentTiltX += (state.targetTiltX - state.currentTiltX) * lerpFactor;
      state.currentTiltY += (state.targetTiltY - state.currentTiltY) * lerpFactor;
      state.currentOffsetX += (state.targetOffsetX - state.currentOffsetX) * lerpFactor;
      state.currentOffsetY += (state.targetOffsetY - state.currentOffsetY) * lerpFactor;

      if (tiltPlateRef.current) {
        tiltPlateRef.current.style.transform = `perspective(1000px) rotateX(${state.currentTiltY}deg) rotateY(${state.currentTiltX}deg) translate3d(${state.currentOffsetX}px, ${state.currentOffsetY}px, 0) scale(1.22)`;
      }

      const timeMs = nowMs - state.startTime;
      const timeSec = timeMs / 1000.0;

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      const positionLocation = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(positionLocation);
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

      gl.uniform2f(
        gl.getUniformLocation(program, 'u_resolution'),
        canvas.width,
        canvas.height
      );
      gl.uniform1f(gl.getUniformLocation(program, 'u_time'), timeSec);

      state.vortices.forEach((v, idx) => {
        if (v.isAmbient) {
          const angle = timeSec * 0.22 + v.ambientOffset;
          const driftRadiusX = 0.8;
          const driftRadiusY = 0.5;
          v.x = Math.sin(angle) * driftRadiusX;
          v.y = Math.sin(angle * 2.0) * driftRadiusY;
          v.strength = (v.strength > 0 ? 1 : -1) * (0.32 + Math.sin(angle * 2.5) * 0.08);
        } else if (idx === 4) {
          v.x = state.currentPointerX;
          v.y = state.currentPointerY;
          
          if (state.isActivePointer) {
            const sFactor = 1.0 - Math.exp(-6.0 * frameDtSec);
            v.strength += (0.45 - v.strength) * sFactor;
            v.radius += (0.38 - v.radius) * sFactor;
          } else {
            const rFactor = 1.0 - Math.exp(-3.0 * frameDtSec);
            v.strength += (0.0 - v.strength) * rFactor;
            v.radius += (0.01 - v.radius) * rFactor;
          }
        } else if (v.strength !== 0) {
          v.x += v.vx * frameDtSec * 60.0 * 0.012;
          v.y += v.vy * frameDtSec * 60.0 * 0.012;
          
          v.vx *= Math.pow(0.962, frameDtSec * 60.0);
          v.vy *= Math.pow(0.962, frameDtSec * 60.0);
          
          v.radius += 0.05 * frameDtSec;
          v.strength *= Math.pow(0.982, frameDtSec * 60.0);
          
          if (Math.abs(v.strength) < 0.01) {
            v.strength = 0;
            v.life = 0;
          }
        }

        pointsArray[idx * 2] = v.x;
        pointsArray[idx * 2 + 1] = v.y;
        
        velsArray[idx * 2] = v.vx;
        velsArray[idx * 2 + 1] = v.vy;
        
        strengthsArray[idx] = v.strength;
        radiiArray[idx] = v.radius;
      });

      gl.uniform2fv(gl.getUniformLocation(program, 'u_points'), pointsArray);
      gl.uniform2fv(gl.getUniformLocation(program, 'u_vels'), velsArray);
      gl.uniform1fv(gl.getUniformLocation(program, 'u_strengths'), strengthsArray);
      gl.uniform1fv(gl.getUniformLocation(program, 'u_radii'), radiiArray);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      state.animationId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(stateRef.current.animationId);
      resizeObserver.disconnect();
      if (gl) {
        gl.deleteBuffer(positionBuffer);
        if (program) {
          gl.deleteProgram(program);
        }
      }
    };
  }, []);

  const injectVortexAtPointer = (clientX: number, clientY: number, intensityScale = 1.0) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const minDim = Math.min(rect.width, rect.height);
    const glX = (x * 2.0 - rect.width) / minDim;
    const glY = ((rect.height - y) * 2.0 - rect.height) / minDim;

    const state = stateRef.current;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const normX = (clientX - (rect.left + centerX)) / centerX;
    const normY = (clientY - (rect.top + centerY)) / centerY;

    const maxTiltY = 5.5;
    const maxTiltX = 5.5;
    const maxShiftX = 16.0;
    const maxShiftY = 16.0;

    state.targetTiltX = normX * maxTiltY;
    state.targetTiltY = -normY * maxTiltX;
    state.targetOffsetX = normX * maxShiftX;
    state.targetOffsetY = normY * maxShiftY;
    
    state.currentPointerX = glX;
    state.currentPointerY = glY;
    state.isActivePointer = true;

    const now = Date.now();
    
    if (state.isFirstMoveSinceEntry) {
      state.lastPointerX = glX;
      state.lastPointerY = glY;
      state.lastPointerTime = now;
      state.lastSpawnedX = glX;
      state.lastSpawnedY = glY;
      state.lastSpawnedTime = now;
      state.isFirstMoveSinceEntry = false;
      return;
    }

    const dt = Math.max(1, now - state.lastPointerTime);
    const dx = glX - state.lastPointerX;
    const dy = glY - state.lastPointerY;

    state.lastPointerX = glX;
    state.lastPointerY = glY;
    state.lastPointerTime = now;

    const vx = (dx / dt) * 1000.0;
    const vy = (dy / dt) * 1000.0;
    const vMag = Math.sqrt(vx * vx + vy * vy);

    const distSinceLastVortex = Math.sqrt(
      (glX - state.lastSpawnedX) * (glX - state.lastSpawnedX) +
      (glY - state.lastSpawnedY) * (glY - state.lastSpawnedY)
    );

    const minDistanceThreshold = 0.025;
    const timeDeltaSpawnThreshold = 30;
    const velocityThreshold = 0.15;

    if (vMag > velocityThreshold && (distSinceLastVortex > minDistanceThreshold || (now - state.lastSpawnedTime) > timeDeltaSpawnThreshold)) {
      let targetIdx = 5;
      let minVal = Infinity;
      for (let i = 5; i < 32; i++) {
        const v = state.vortices[i];
        const currentScore = Math.abs(v.strength);
        if (currentScore < minVal) {
          minVal = currentScore;
          targetIdx = i;
        }
      }

      const speedScale = 0.015;
      const clampedVx = Math.max(-1.0, Math.min(1.0, vx * speedScale));
      const clampedVy = Math.max(-1.0, Math.min(1.0, vy * speedScale));

      state.vortices[targetIdx] = {
        x: glX,
        y: glY,
        vx: clampedVx,
        vy: clampedVy,
        strength: (0.7 + Math.random() * 0.3) * intensityScale,
        radius: 0.35 + Math.random() * 0.10,
        life: 1.0,
        decaySpeed: 0.020 + Math.random() * 0.010,
        isAmbient: false,
        ambientOffset: 0,
      };

      state.lastSpawnedX = glX;
      state.lastSpawnedY = glY;
      state.lastSpawnedTime = now;
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    stateRef.current.isActivePointer = true;
    stateRef.current.isFirstMoveSinceEntry = true;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const minDim = Math.min(rect.width, rect.height);
    const glX = (x * 2.0 - rect.width) / minDim;
    const glY = ((rect.height - y) * 2.0 - rect.height) / minDim;
    
    stateRef.current.lastPointerX = glX;
    stateRef.current.lastPointerY = glY;
    stateRef.current.lastPointerTime = Date.now();
    stateRef.current.lastSpawnedX = glX;
    stateRef.current.lastSpawnedY = glY;
    stateRef.current.lastSpawnedTime = Date.now();

    injectVortexAtPointer(e.clientX, e.clientY, 0.70);

    if (onPointerStateChange) {
      onPointerStateChange(true, true, e.clientX, e.clientY);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    injectVortexAtPointer(e.clientX, e.clientY, 0.45);

    if (onPointerStateChange) {
      onPointerStateChange(true, stateRef.current.isActivePointer, e.clientX, e.clientY);
    }
  };

  const handlePointerUp = () => {
    const state = stateRef.current;
    state.isActivePointer = false;
    state.isFirstMoveSinceEntry = true;

    state.targetTiltX = 0;
    state.targetTiltY = 0;
    state.targetOffsetX = 0;
    state.targetOffsetY = 0;

    if (onPointerStateChange) {
      onPointerStateChange(false, false, 0, 0); // Hide or treat as inactive
    }
  };

  const handlePointerEnter = () => {
    stateRef.current.isFirstMoveSinceEntry = true;
    if (onPointerStateChange) {
      onPointerStateChange(true, stateRef.current.isActivePointer, 0, 0);
    }
  };

  const handlePointerLeave = () => {
    const state = stateRef.current;
    state.isFirstMoveSinceEntry = true;
    handlePointerUp();
    
    state.targetTiltX = 0;
    state.targetTiltY = 0;
    state.targetOffsetX = 0;
    state.targetOffsetY = 0;

    if (onPointerStateChange) {
      onPointerStateChange(false, false, 0, 0);
    }
  };

  if (hasError) {
    return (
      <div id="fallback-container" className="flex items-center justify-center w-full h-full bg-[#1d1d1d] text-[#3CEADC] font-mono text-center px-6">
        <p id="error-message">Interactive Fluid Canvas requires WebGL support.</p>
      </div>
    );
  }

  return (
    <div
      id="fluid-background-container"
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerLeave}
      onPointerLeave={handlePointerLeave}
      onPointerEnter={handlePointerEnter}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#1d1d1d] select-none pointer-events-auto touch-none cursor-none"
    >
      <div
        id="topology-tilt-plate"
        ref={tiltPlateRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          willChange: 'transform',
          transformOrigin: 'center center',
          transformStyle: 'preserve-3d',
          opacity: Math.max(0, 1 - scrollProgress * 1.5),
        }}
      >
        <canvas
          id="fluid-canvas"
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none"
        />
      </div>
      {/* Interactive, completely stable high-fidelity layout layer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
        {children}
      </div>
    </div>
  );
};
