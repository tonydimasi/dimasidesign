import React, { useState, useEffect } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [milanTime, setMilanTime] = useState('');

  // Live Milan local time clock calculation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Milan is in Central European Time (CET/CEST)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Rome',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setMilanTime(new Intl.DateTimeFormat('it-IT', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tony.dimasi92@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section 
      id="contact-footer-section"
      className="relative w-full bg-[#3CEADC] text-zinc-950 px-6 sm:px-8 md:px-16 py-16 md:py-24 flex flex-col justify-between box-border overflow-hidden select-none font-sans"
    >
      
      {/* Decorative Top Thin Grid Line */}
      <div className="w-full border-t border-zinc-950/15 mb-12 md:mb-16" />

      <div className="w-full max-w-7xl mx-auto flex flex-col justify-between gap-12 relative z-10">
        
        {/* Status Tag & Clock Top Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 w-full border-b border-zinc-950/15 pb-10">
          <div className="flex flex-col gap-1 items-start text-left">
            <span className="text-[10px] font-bold tracking-widest text-zinc-950/60 uppercase">STATUS</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-zinc-800">
                Disponibile per Progetti • Q3 2026
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 items-start text-left">
            <span className="text-[10px] font-bold tracking-widest text-zinc-950/60 uppercase">SEDE / FUSO ORARIO</span>
            <span className="text-xs font-semibold mt-1 text-zinc-800 uppercase tracking-wider">
              MILANO, ITALIA — {milanTime || '09:00:00'} (CET)
            </span>
          </div>

          <div className="flex flex-col gap-1 items-start md:items-end text-left md:text-right">
            <span className="text-[10px] font-bold tracking-widest text-zinc-950/60 uppercase">CREAZIONE</span>
            <span className="text-xs font-semibold mt-1 text-zinc-800 uppercase tracking-wider">
              PORTFOLIO PROFESSIONALE ©2026
            </span>
          </div>
        </div>

        {/* Huge Hero Contact Callout Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 md:gap-12 py-6">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-[10vw] sm:text-[8vw] md:text-[6vw] lg:text-[5.5vw] font-black uppercase leading-[0.9] tracking-tighter text-zinc-950">
              PARLIAMO DEL TUO <br />
              <span className="text-zinc-950/40">PROSSIMO</span> PROGETTO.
            </h2>
            <p className="text-sm sm:text-base text-zinc-800 max-w-xl font-light mt-4 leading-relaxed">
              Hai un'idea innovativa, un prodotto digitale da creare o hai bisogno di scalare e ottimizzare le conversioni e l'esperienza utente delle tue applicazioni web? Sviluppiamo soluzioni rapide, reattive e dal design impeccabile.
            </p>
          </div>

          {/* Interactive Action Magnet Button Card */}
          <div className="flex flex-col items-start lg:items-end justify-end mt-4 lg:mt-0">
            <button 
              onClick={handleCopyEmail}
              className="group relative flex flex-col items-start p-6 rounded-2xl bg-zinc-950 text-cyan-400 hover:text-white w-full sm:w-[320px] shadow-lg transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border border-zinc-950"
            >
              <div className="flex items-center justify-between w-full relative z-10">
                <span className="text-xs font-bold tracking-widest text-cyan-400/70 uppercase">Fai click per copiare</span>
                {copied ? <Check size={16} className="text-emerald-400 animate-bounce" /> : <Copy size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />}
              </div>
              <div className="text-base sm:text-lg font-bold tracking-wide mt-4 relative z-10 transition-colors duration-300">
                {copied ? 'EMAIL COPIATA!' : 'tony.dimasi92@gmail.com'}
              </div>
              <div className="flex items-center gap-2 mt-2 text-[10px] tracking-wide text-zinc-400 font-light relative z-10">
                <span>Risposta garantita entro 24 ore</span>
                <span className="text-cyan-400">•</span>
                <span>Progettazione e Sviluppo</span>
              </div>
              
              {/* Dynamic decorative hover background liquid scale */}
              <div className="absolute inset-0 bg-neutral-900 scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 ease-[0.16,1,0.3,1] pointer-events-none z-0" />
            </button>
          </div>
        </div>

        {/* Detailed Grid: Contacts & Secondary Action Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 border-t border-zinc-950/15 pt-12">
          
          {/* Column 1 - Quick Info Channels */}
          <div className="md:col-span-5 flex flex-col gap-4 text-left">
            <span className="text-[10px] font-bold tracking-widest text-zinc-950/60 uppercase">CONTATTI DIRETTI</span>
            
            <div className="flex flex-col gap-3 font-medium text-sm sm:text-base text-zinc-900 mt-1">
              <a 
                href="mailto:tony.dimasi92@gmail.com" 
                className="flex items-center gap-3 hover:text-zinc-950 hover:pl-1 transition-all duration-300 ease-out"
              >
                <Mail size={16} className="text-zinc-950/70" />
                <span>tony.dimasi92@gmail.com</span>
              </a>

              <a 
                href="tel:+393492614543" 
                className="flex items-center gap-3 hover:text-zinc-950 hover:pl-1 transition-all duration-300 ease-out"
              >
                <Phone size={16} className="text-zinc-950/70" />
                <span>+39 349 261 4543</span>
              </a>

              <div className="flex items-center gap-3 text-zinc-900">
                <MapPin size={16} className="text-zinc-950/70" />
                <span>Milano / Italia • Internazionale</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Social Paths Grid */}
          <div className="md:col-span-4 flex flex-col gap-4 text-left">
            <span className="text-[10px] font-bold tracking-widest text-zinc-950/60 uppercase">SOCIAL CHANNELS</span>
            <div className="grid grid-cols-2 gap-3 mt-1 text-sm sm:text-base font-semibold">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-between border-b border-zinc-950/10 py-1.5 pr-2 hover:border-zinc-950 hover:text-zinc-950 transition-all duration-300"
              >
                <span>Linkedin</span>
                <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a 
                href="https://behance.net" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-between border-b border-zinc-950/10 py-1.5 pr-2 hover:border-zinc-950 hover:text-zinc-950 transition-all duration-300"
              >
                <span>Behance</span>
                <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a 
                href="https://dribbble.com" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-between border-b border-zinc-950/10 py-1.5 pr-2 hover:border-zinc-950 hover:text-zinc-950 transition-all duration-300"
              >
                <span>Dribbble</span>
                <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer" 
                className="group flex items-center justify-between border-b border-zinc-950/10 py-1.5 pr-2 hover:border-zinc-950 hover:text-zinc-950 transition-all duration-300"
              >
                <span>GitHub</span>
                <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Column 3 - Clean Quote & Bottom Credits */}
          <div className="md:col-span-3 flex flex-col items-start md:items-end justify-between text-left md:text-right gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-bold tracking-widest text-zinc-950/60 uppercase">CORE STACK</span>
              <span className="text-xs font-semibold text-zinc-900 uppercase tracking-widest mt-1">
                REACT • SHADERS • UX • CRO
              </span>
            </div>
            
            <div className="text-[10px] text-zinc-950/50 uppercase tracking-widest mt-auto font-medium">
              © 2026 ANTONIO DI MASI
            </div>
          </div>

        </div>

      </div>

    </section>
  );
};

