import React from 'react';
import { motion } from 'motion/react';
import { Eye, Layers, Compass, Cpu } from 'lucide-react';

export const DraftSection: React.FC = () => {
  return (
    <section
      id="draft-notes-section"
      className="relative w-full min-h-[90vh] bg-[#1d1d1d] text-white px-8 md:px-12 lg:px-16 py-24 flex flex-col justify-center select-none overflow-hidden font-sans border-t border-white/5"
    >
      {/* Dynamic technical background highlights */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#3CEADC]/5 blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-zinc-800/10 blur-[80px]" />
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Header containing meta-text and minimal design indicators */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] text-[#3CEADC] uppercase tracking-[0.2em] font-medium flex items-center gap-2">
              <span className="inline-block w-1.5 h-1.5 bg-[#3CEADC] rounded-full animate-ping" />
              AREA DI BOZZA / DEVELOPMENT DRAFT
            </span>
            <h2 className="text-4xl md:text-5xl font-light uppercase tracking-tight leading-none text-white">
              SGUARDO AL <span className="font-semibold text-zinc-300">FUTURO</span>
            </h2>
          </div>
          <p className="text-xs font-mono text-zinc-500 tracking-wider max-w-xs text-left md:text-right">
            SPEC_SYS_0.94 // BOZZA DI LAVORO COMPLETAMENTE REATTIVA OPERANTE IN BACKEND PROCESSO AD ALTA STRUTTURA.
          </p>
        </div>

        {/* Bento-style wireframe grid detailing futuristic elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="group border border-white/10 rounded-[20px] bg-zinc-950/40 p-6 flex flex-col gap-8 hover:border-[#3CEADC]/40 hover:bg-zinc-950/80 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/5 text-[#3CEADC] group-hover:bg-[#3CEADC] group-hover:text-zinc-900 transition-colors duration-500">
                <Layers size={18} />
              </div>
              <span className="font-mono text-xs text-zinc-600">PHASE_01</span>
            </div>
            <div className="flex flex-col gap-2 text-left">
              <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase">Interactive Systems</h3>
              <p className="text-xs font-light text-zinc-500 leading-relaxed">
                Struttura prototipale per l'ottimizzazione del caricamento dei contenuti e transizioni fluide multilivello basate su matrici geometriche.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group border border-white/10 rounded-[20px] bg-zinc-950/40 p-6 flex flex-col gap-8 hover:border-[#3CEADC]/40 hover:bg-zinc-950/80 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/5 text-[#3CEADC] group-hover:bg-[#3CEADC] group-hover:text-zinc-900 transition-colors duration-500">
                <Compass size={18} />
              </div>
              <span className="font-mono text-xs text-zinc-600">PHASE_02</span>
            </div>
            <div className="flex flex-col gap-2 text-left">
              <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase">Microdesign & UX</h3>
              <p className="text-xs font-light text-zinc-500 leading-relaxed">
                Controllo del feedback tattile virtuale per massimizzare la conversione utente (CRO), curando i microintervalli di inserimento dati.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group border border-white/10 rounded-[20px] bg-zinc-950/40 p-6 flex flex-col gap-8 hover:border-[#3CEADC]/40 hover:bg-zinc-950/80 transition-all duration-500">
            <div className="flex items-center justify-between">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/5 text-[#3CEADC] group-hover:bg-[#3CEADC] group-hover:text-zinc-900 transition-colors duration-500">
                <Cpu size={18} />
              </div>
              <span className="font-mono text-xs text-zinc-600">PHASE_03</span>
            </div>
            <div className="flex flex-col gap-2 text-left">
              <h3 className="text-sm font-semibold tracking-wider text-zinc-300 uppercase">Sviluppo Web3D</h3>
              <p className="text-xs font-light text-zinc-500 leading-relaxed">
                Integrazione di shader WebGL avanzati a livello nativo con algoritmi di disturbo per generare reti nodali fluide in grado di reagire al cursore.
              </p>
            </div>
          </div>

          {/* Card 4 - Wireframe Preview Area */}
          <div className="border border-dashed border-white/10 rounded-[20px] p-6 flex flex-col justify-between bg-zinc-950/20 relative overflow-hidden group hover:border-[#3CEADC]/30 transition-colors duration-500">
            {/* Skeletal layout lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-white/50" />
              <div className="absolute left-0 right-0 top-1/2 border-t border-dashed border-white/50" />
              <div className="absolute top-2 right-2 font-mono text-[8px] text-zinc-600">GRID_VIEW</div>
            </div>

            <div className="flex items-center justify-between relative z-10">
              <div className="p-3 bg-zinc-900 rounded-lg border border-white/5 text-[#3CEADC]">
                <Eye size={18} />
              </div>
              <span className="font-mono text-xs text-[#3CEADC] animate-pulse">WIRE_04</span>
            </div>
            
            <div className="flex flex-col gap-2 mt-8 text-left relative z-10">
              <div className="h-1.5 w-1/3 bg-zinc-800 rounded mb-1" />
              <div className="h-1 w-2/3 bg-[#3CEADC]/20 rounded mb-1" />
              <div className="h-1 w-1/2 bg-zinc-800 rounded" />
              <p className="text-[10px] font-mono text-zinc-600 mt-2 uppercase tracking-wide">
                Sistema di visualizzazione in fase di rifinitura
              </p>
            </div>
          </div>

        </div>

        {/* Minimal bottom brand spec notes */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 font-mono text-[9px] uppercase tracking-wider pt-4 border-t border-white/5">
          <span>PORTFOLIO EDITORIALE // MILANO 2026 // ITALIA</span>
          <span>STRETTA OSSERVANZA SUI MATERIALI DI PROGETTAZIONE DI ALTA QUALITÀ</span>
        </div>

      </div>
    </section>
  );
};
