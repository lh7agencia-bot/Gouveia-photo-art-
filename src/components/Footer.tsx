import { STUDIO_INFO } from '../data/studioData';
import { scrollToSection } from '../utils/scrollToSection';

const FOOTER_LINKS = [
  { label: 'Início', target: 'inicio' },
  { label: 'Galeria', target: 'galeria' },
  { label: 'Serviços', target: 'servicos' },
  { label: 'Depoimentos', target: 'depoimentos' },
  { label: 'FAQ', target: 'faq' },
  { label: 'Contato', target: 'contato' },
] as const;

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#141414] border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <p className="font-display text-2xl font-semibold text-white">
              {STUDIO_INFO.name}
            </p>
            <p className="text-sm text-neutral-400">{STUDIO_INFO.slogan}</p>
          </div>

          <nav
            aria-label="Links do rodapé"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-300"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.target}
                href={`#${link.target}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.target);
                }}
                className="hover:text-[#1D9BF0] transition-colors whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-400">
          <p>
            {STUDIO_INFO.address} · Tel/WhatsApp: {STUDIO_INFO.phoneDisplay}
          </p>
          <p className="tabular-nums">
            © {currentYear} {STUDIO_INFO.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
