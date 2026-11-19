import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { scrollToSection } from '../utils/scrollToSection';

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      videoEl.pause();
      return;
    }

    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback poster remains visible if autoplay is blocked by browser power saver
      });
    }
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-[#1A1A1A] pt-20 pb-12 sm:pb-16"
    >
      {/* Fallback / Poster image layer */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none">
        <source srcSet="/images/hero-poster.webp" type="image/webp" />
        <img
          src="/images/hero-poster.jpg"
          alt="Portfólio em movimento de Gouveia Photo Art"
          fetchPriority="high"
          className="w-full h-full object-cover object-center"
        />
      </picture>

      {/* Full-Screen Looping Background Video (no visible controls) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/hero-poster.webp"
        aria-hidden="true"
        onCanPlay={() => setVideoReady(true)}
        className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none transition-opacity duration-700 ${
          videoReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <source src="/videos/hero-reel.mp4" type="video/mp4" />
      </video>

      {/* Measured dark contrast scrims for legibility across all video frames */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/75 via-[#1A1A1A]/50 to-[#1A1A1A]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A]/85 via-[#1A1A1A]/40 to-transparent"
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl w-full mx-auto px-5 sm:px-8 mt-auto">
        <div className="max-w-2xl space-y-6">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm font-medium tracking-wide text-neutral-300">
            <span>Fotografia Autoral</span>
            <span aria-hidden="true" className="text-[#1D9BF0]">
              ·
            </span>
            <span>Setor Sul, Goiânia - GO</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white leading-[1.05] text-balance">
            {STUDIO_INFO.slogan}
          </h1>

          <p className="text-base sm:text-lg text-neutral-200 leading-relaxed max-w-xl tracking-[0.01em]">
            Direção sensível, olhar editorial e acabamento refinado para
            casamentos, retratos e eventos corporativos em Goiânia.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              type="button"
              onClick={() => scrollToSection('contato')}
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#1D9BF0] rounded-lg whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#1A8CD8] hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-[#1D9BF0]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] cursor-pointer"
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('galeria')}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg whitespace-nowrap shrink-0 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] cursor-pointer"
            >
              <span>Explorar Galeria</span>
            </button>
          </div>
        </div>

        {/* Bottom Studio Credentials Strip */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs sm:text-sm text-neutral-300">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span>Casamentos</span>
            <span aria-hidden="true" className="text-neutral-600">
              /
            </span>
            <span>Retratos Editoriais</span>
            <span aria-hidden="true" className="text-neutral-600">
              /
            </span>
            <span>Eventos Corporativos</span>
          </div>

          <button
            type="button"
            onClick={() => scrollToSection('galeria')}
            className="inline-flex items-center gap-2 text-neutral-300 hover:text-[#1D9BF0] transition-colors self-start sm:self-auto cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] rounded px-1 py-0.5"
          >
            <span>Rolar para ver o portfólio</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-200 hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
