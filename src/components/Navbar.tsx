import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';
import { scrollToSection } from '../utils/scrollToSection';

const NAV_LINKS = [
  { label: 'Galeria', target: 'galeria' },
  { label: 'Serviços', target: 'servicos' },
  { label: 'Depoimentos', target: 'depoimentos' },
  { label: 'FAQ', target: 'faq' },
  { label: 'Contato', target: 'contato' },
] as const;

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    targetId: string,
  ) => {
    event.preventDefault();
    setMobileMenuOpen(false);
    scrollToSection(targetId);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        isScrolled || mobileMenuOpen
          ? 'bg-[#1A1A1A]/95 backdrop-blur-md border-b border-white/10'
          : 'bg-gradient-to-b from-[#1A1A1A]/80 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single clean wordmark */}
        <a
          href="#inicio"
          onClick={(e) => handleNavClick(e, 'inicio')}
          className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-white whitespace-nowrap shrink-0 transition-opacity duration-200 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] rounded"
        >
          {STUDIO_INFO.name}
        </a>

        {/* Zone 2: Clean single-line nav links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => handleNavClick(e, link.target)}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] rounded after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#1D9BF0] after:transition-all after:duration-200 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={(e) => handleNavClick(e, 'contato')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-[#1D9BF0] rounded-lg whitespace-nowrap shrink-0 transition-all duration-200 hover:bg-[#1A8CD8] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A] cursor-pointer"
          >
            Agendar Ensaio
          </button>

          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-neutral-200 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#1A1A1A]/98 backdrop-blur-md px-5 py-4 space-y-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => handleNavClick(e, link.target)}
              className="block py-3 px-2 text-base font-medium text-neutral-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <button
              type="button"
              onClick={(e) => handleNavClick(e, 'contato')}
              className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#1D9BF0] rounded-lg hover:bg-[#1A8CD8] transition-colors cursor-pointer"
            >
              Agendar Ensaio
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
