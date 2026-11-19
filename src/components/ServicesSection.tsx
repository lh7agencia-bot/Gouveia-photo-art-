import { STUDIO_SERVICES } from '../data/studioData';
import { scrollToSection } from '../utils/scrollToSection';

export function ServicesSection() {
  return (
    <section
      id="servicos"
      className="py-20 sm:py-24 bg-[#161616] border-t border-white/10 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs sm:text-sm font-medium text-[#1D9BF0] tracking-wide">
              Especialidades do Estúdio
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-white text-balance">
              Técnica precisa a serviço da emoção
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Do atendimento intimista no Setor Sul à cobertura de grandes
              eventos em Goiânia, conduzimos cada etapa com planejamento, luz
              equilibrada e entrega pontual.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={() => scrollToSection('contato')}
                className="inline-flex items-center px-5 py-2.5 text-sm font-semibold text-white bg-[#1D9BF0] rounded-lg transition-all duration-200 hover:bg-[#1A8CD8] hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0]"
              >
                Consultar Disponibilidade
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 divide-y divide-white/10 border-t border-b border-white/10">
            {STUDIO_SERVICES.map((service) => (
              <article
                key={service.number}
                className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 transition-colors duration-200 hover:bg-white/[0.02] px-2 -mx-2 rounded-lg"
              >
                <div className="sm:col-span-2">
                  <span className="font-display text-2xl sm:text-3xl font-semibold text-[#1D9BF0] tabular-nums">
                    {service.number}
                  </span>
                </div>
                <div className="sm:col-span-10 space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    {service.title}
                  </h3>
                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                    {service.summary}
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-400 pt-1">
                    {service.deliverables}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
