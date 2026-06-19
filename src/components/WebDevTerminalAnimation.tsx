import React, { useState, useEffect, useRef } from 'react';

export const WebDevTerminalAnimation: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [compiling, setCompiling] = useState<boolean>(false);
  const [saveCount, setSaveCount] = useState<number>(0);
  const [cursorBlink, setCursorBlink] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Blinking cursor loop
  useEffect(() => {
    const val = setInterval(() => setCursorBlink((b) => !b), 500);
    return () => clearInterval(val);
  }, []);

  // Autoscroll to bottom whenever lines are written
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [logs, compiling]);

  // Real React / HTML / CSS / JS / WebGL interaction sequence
  const compilationSequence = [
    '// React WebGL Shader Component',
    'import React, { useEffect, useRef, useState } from "react";',
    '',
    'export function WebGLGlowContainer({ intensity }) {',
    '  const canvasRef = useRef<HTMLCanvasElement>(null);',
    '  const [gl, setGl] = useState<WebGL2RenderingContext | null>(null);',
    '',
    '  useEffect(() => {',
    '    const canvas = canvasRef.current;',
    '    if (!canvas) return;',
    '    ',
    '    // Bind graphics context and depth map buffers',
    '    const context = canvas.getContext("webgl2", { alpha: false });',
    '    if (!context) return;',
    '    ',
    '    context.viewport(0, 0, canvas.width, canvas.height);',
    '    context.clearColor(0.01, 0.01, 0.01, 1.0);',
    '    setGl(context);',
    '  }, []);',
    '',
    '  return (',
    '    <div className="relative group w-full h-[320px] rounded-xl overflow-hidden border border-[#3CEADC]/20">',
    '      <canvas id="gl_context_canvas" ref={canvasRef} className="w-full h-full object-cover" />',
    '      <span className="absolute bottom-4 font-sans text-xs text-[#3CEADC] tracking-wider animate-pulse">',
    '        WebGL 2.0 API: Active Fragment Shader Layer',
    '      </span>',
    '    </div>',
    '  );',
    '}',
    '',
    '/* CSS Injection rules */',
    '#gl_context_canvas {',
    '  box-shadow: 0 0 35px rgba(60, 234, 220, 0.15);',
    '  transition: filter 0.25s cubic-bezier(0.4, 0, 0.2, 1);',
    '}',
    '#gl_context_canvas:hover {',
    '  filter: drop-shadow(0 0 16px rgba(60, 234, 220, 0.85));',
    '}',
    '',
    '// JS Low-level WebGL context initialization & Program link',
    'const canvas = document.getElementById("gl_context_canvas");',
    'const gl = canvas.getContext("webgl2");',
    'if (!gl) throw new Error("WebGL Context initialization failed");',
    '',
    '// GLSL Vertex Shader Source Code (#version 300 es)',
    'const vertexShaderSource = `#version 300 es',
    '  in vec2 a_position;',
    '  out vec2 v_texCoord;',
    '  void main() {',
    '    v_texCoord = a_position * 0.5 + 0.5;',
    '    gl_Position = vec4(a_position, 0.0, 1.0);',
    '  }',
    '`;',
    '',
    '// GLSL Fragment Shader Source Code (Dynamic color animation lookup)',
    'const fragmentShaderSource = `#version 300 es',
    '  precision highp float;',
    '  in vec2 v_texCoord;',
    '  out vec4 outColor;',
    '  uniform float u_time;',
    '  void main() {',
    '    float glow = 0.5 + 0.5 * sin(v_texCoord.x * 12.0 + u_time);',
    '    outColor = vec4(0.23, 0.91, 0.86, glow);',
    '  }',
    '`;',
    '',
    '// Link program into current GL rendering state pipeline',
    'const program = gl.createProgram();',
    'gl.attachShader(program, vs);',
    'gl.attachShader(program, fs);',
    'gl.linkProgram(program);',
    'if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {',
    '  console.error(gl.getProgramInfoLog(program));',
    '}',
  ];

  const triggerSaveCompile = () => {
    if (compiling) return;
    setCompiling(true);
    setSaveCount((prev) => prev + 1);

    // Swap parameters dynamically in the console stream imitating an active hot module replacement
    const recompileLines = [
      `// [HMR] File updated: src/components/WebGLGlowContainer.tsx 📝`,
      `// Swapping fragment shader layout vector matrices & recompiling buffers...`,
      `const fragmentShaderSource_v${saveCount + 2} = \`outColor = vec4(0.23, ${(Math.random() * 0.3 + 0.7).toFixed(2)}, 0.86, glow);\`;`,
      `// [HMR] WebGL program bound and linked successfully to React render loop! 🟢`
    ];

    setLogs((prev) => [...prev, ...recompileLines]);
    
    setTimeout(() => {
      setCompiling(false);
    }, 1000);
  };

  // Autowriter: streams realistic lines sequentially
  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < compilationSequence.length) {
        const line = compilationSequence[currentIdx];
        if (typeof line === 'string') {
          setLogs((prev) => [...prev, line]);
        }
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 90); // Swift typing emulation

    return () => clearInterval(interval);
  }, []);

  // Professional syntax highlighter for Inter font code layout
  const formatCodeLine = (line: string) => {
    if (line.startsWith('//') || line.startsWith('/*') || line.endsWith('*/')) {
      return <span className="text-zinc-500 italic font-light font-sans">{line}</span>;
    }
    
    // Highlight HTML tags or React components
    if (line.includes('<') || line.includes('>')) {
      return (
        <span className="text-zinc-300 font-sans">
          {line.split(/(<\/?[a-zA-Z0-9_-]+>?|className=)/g).map((part, i) => {
            if (part?.startsWith('<') || part?.startsWith('</')) {
              return <span key={i} className="text-[#3CEADC] font-medium">{part}</span>;
            }
            if (part === 'className=') {
              return <span key={i} className="text-[#3CEADC]/70">{part}</span>;
            }
            return <span key={i}>{part}</span>;
          })}
        </span>
      );
    }

    // Highlight keywords
    const keywords = ['const ', 'let ', 'import ', 'from ', 'export ', 'function ', 'return', 'if ', 'throw ', 'new ', 'void ', 'precision ', 'uniform ', 'out ', 'in '];
    let matchesKeyword = keywords.some(k => line.includes(k));
    if (matchesKeyword) {
      return (
        <span className="text-zinc-400 font-sans">
          {line.split(/\b(const|let|import|from|export|function|return|if|throw|new|void|precision|uniform|out|in)\b/g).map((part, i) => {
            if (['const', 'let', 'import', 'from', 'export', 'function', 'return', 'if', 'throw', 'new', 'void', 'precision', 'uniform', 'out', 'in'].includes(part)) {
              return <span key={i} className="text-[#3CEADC]/90 font-medium">{part}</span>;
            }
            return <span key={i}>{part}</span>;
          })}
        </span>
      );
    }

    if (line.includes('[HMR]') || line.includes('successfully')) {
      return <span className="text-[#3CEADC] font-semibold font-sans">{line}</span>;
    }

    return <span className="text-zinc-400 font-sans">{line}</span>;
  };

  return (
    <div 
      className="relative w-full h-full flex flex-col justify-between p-5 bg-zinc-950/80 font-sans rounded-xl overflow-hidden border border-[#3CEADC]/10 text-zinc-300 text-[10px] sm:text-[11px] leading-relaxed cursor-pointer select-none"
      onClick={triggerSaveCompile}
      title="Clicca per modificare e salvare i parametri WebGL / React!"
    >
      
      {/* Code window with custom scroll anchoring */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto scrollbar-none pr-1 space-y-1 text-[10px] sm:text-[11px] scroll-smooth"
      >
        {logs.map((logLine, idx) => {
          if (typeof logLine !== 'string') return null;
          return (
            <div key={idx} className="whitespace-pre break-all leading-snug font-sans font-light tracking-wide">
              {formatCodeLine(logLine)}
            </div>
          );
        })}

        {/* Typing cursor */}
        <div className="inline-block text-[#3CEADC] font-semibold font-sans">
          {compiling ? (
            <span className="text-teal-300 font-medium animate-pulse">HMR Swapping active WebGL context...</span>
          ) : (
            <span>
              {cursorBlink ? '▒' : ' '}
            </span>
          )}
        </div>
      </div>

    </div>
  );
};
