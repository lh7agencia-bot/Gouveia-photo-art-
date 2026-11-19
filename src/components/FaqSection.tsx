import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '../data/studioData';

export function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-[#161616] border-t border-white/10 scroll-mt-16"
    >
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="space-y-3 mb-12">
          <p className="text-xs sm:text-sm font-medium text-[#1D9BF0] tracking-wide">
            Dúvidas Frequentes
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white text-balance">
            Informações essenciais antes do seu ensaio
          </h2>
        </div>

        <div className="divide-y divide-white/10 border-t border-b border-white/10">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id} className="py-1">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  className="w-full py-5 flex items-center justify-between gap-4 text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] rounded-lg px-2 -mx-2"
                >
                  <span
                    className={`text-base sm:text-lg font-medium transition-colors duration-200 ${
                      isOpen
                        ? 'text-[#1D9BF0]'
                        : 'text-white group-hover:text-[#1D9BF0]'
                    }`}
                  >
                    {item.question}
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'rotate-180 text-[#1D9BF0]'
                        : 'text-neutral-400 group-hover:text-white'
                    }`}
                  />
                </button>

                <div
                  id={`faq-panel-${item.id}`}
                  data-open={isOpen}
                  className="accordion-content"
                >
                  <div className="accordion-inner">
                    <p className="pb-6 text-sm sm:text-base text-neutral-300 leading-relaxed max-w-3xl">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
