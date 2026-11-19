import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/studioData';

export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="py-20 sm:py-28 bg-[#1A1A1A] border-t border-white/10 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl space-y-3 mb-12">
          <p className="text-xs sm:text-sm font-medium text-[#1D9BF0] tracking-wide">
            Depoimentos de Clientes
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white text-balance">
            Quem confiou suas memórias ao nosso olhar
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between p-6 sm:p-7 bg-[#222222] border border-white/10 rounded-xl transition-all duration-200 hover:border-[#1D9BF0]/45 hover:-translate-y-0.5"
            >
              <div className="space-y-4">
                <div
                  className="flex items-center gap-1"
                  aria-label={`Avaliação ${item.rating} de 5 estrelas`}
                >
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-4 h-4 fill-[#1D9BF0] text-[#1D9BF0]"
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <blockquote className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                  “{item.text}”
                </blockquote>
              </div>

              <footer className="mt-6 pt-4 border-t border-white/10">
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="text-xs text-neutral-400 mt-0.5">{item.context}</p>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
