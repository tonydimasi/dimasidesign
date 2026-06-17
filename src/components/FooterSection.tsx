import React, { useState } from 'react';
import { ArrowUpRight, Mail, Phone, MapPin, Send } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('tony.dimasi92@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="contact-footer-section"
      className="relative w-full bg-[#3CEADC] text-zinc-950 px-8 md:px-12 lg:px-16 py-24 md:py-32 flex flex-col items-center justify-between box-border overflow-hidden select-none font-sans"
    >
      {/* Absolute copyright label */}
      <div className="absolute bottom-4 right-4 text-[10px] text-zinc-950/40 font-sans tracking-wider">
        © 2026 ANTONIO DI MASI
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
        
        {/* Left column: Let's collaborate text */}
        <div className="flex flex-col items-start text-left max-w-2xl gap-6 font-sans">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light uppercase tracking-tight text-zinc-950 leading-[1.1]">
            LAVORIAMO <br />
            <span className="font-semibold">INSIEME</span>
          </h2>
          <p className="text-[15px] md:text-base leading-relaxed text-zinc-800/90 font-light max-w-md">
            Hai un progetto interessante da sviluppare o vuoi migliorare l'esperienza utente delle tue applicazioni digitali? Mettiti in contatto.
          </p>

          {/* Pill-shaped beautiful button as requested/sketched */}
          <button 
            onClick={handleCopyEmail}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 mt-4 rounded-full border border-zinc-950 text-zinc-950 font-medium tracking-wide hover:bg-zinc-950 hover:text-[#3CEADC] transition-all duration-500 cursor-pointer text-sm overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              {copied ? 'EMAIL COPIATA!' : 'COPIA INDIRIZZO EMAIL'} <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
            </span>
            <div className="absolute inset-0 bg-zinc-950 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-[0.16,1,0.3,1] pointer-events-none" />
          </button>
        </div>

        {/* Right column: Social and quick credentials */}
        <div className="flex flex-col items-start gap-8 min-w-[280px] font-sans">
          <div className="flex flex-col gap-4 text-left">
            <span className="text-xs font-semibold tracking-widest text-zinc-800 uppercase">CONTATTI</span>
            
            <a 
              href="mailto:tony.dimasi92@gmail.com" 
              className="flex items-center gap-3 text-zinc-950 hover:opacity-80 transition-opacity font-light"
            >
              <Mail size={16} className="text-zinc-950/70" />
              <span>tony.dimasi92@gmail.com</span>
            </a>

            <div className="flex items-center gap-3 text-zinc-950/90 font-light">
              <Phone size={16} className="text-zinc-950/70" />
              <span>+39 349 261 4543</span>
            </div>

            <div className="flex items-center gap-3 text-zinc-950/90 font-light">
              <MapPin size={16} className="text-zinc-950/70" />
              <span>Milano / Italia</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-left w-full border-t border-zinc-950/10 pt-6">
            <span className="text-xs font-semibold tracking-widest text-zinc-800 uppercase">SOCIAL</span>
            <div className="flex gap-4">
              <a href="#" className="text-sm font-medium hover:underline">Linkedin</a>
              <a href="#" className="text-sm font-medium hover:underline">Bēhance</a>
              <a href="#" className="text-sm font-medium hover:underline">Dribbble</a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
