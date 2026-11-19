import { useEffect, useState, useCallback } from 'react';
import { Camera, ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import {
  GALLERY_ITEMS,
  type GalleryCategory,
  type GalleryItem,
} from '../data/studioData';

const CATEGORIES: GalleryCategory[] = [
  'Todos',
  'Casamentos',
  'Retratos',
  'Eventos',
];

function GalleryPicture({
  item,
  eager = false,
  className = '',
}: {
  item: GalleryItem;
  eager?: boolean;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 bg-[#222222] text-neutral-400 p-8 aspect-[2/3] w-full">
        <Camera className="w-8 h-8 text-[#1D9BF0]" />
        <span className="text-sm font-medium text-neutral-200 text-center">
          {item.title}
        </span>
      </div>
    );
  }

  return (
    <picture className="block w-full">
      <source srcSet={item.webpSrc} type="image/webp" />
      <img
        src={item.jpgSrc}
        alt={item.alt}
        width={item.width}
        height={item.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setHasError(true)}
        className={className}
      />
    </picture>
  );
}

export function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('Todos');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    activeCategory === 'Todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const selectedItem =
    selectedIndex !== null ? filteredItems[selectedIndex] ?? null : null;

  const handleClose = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null || filteredItems.length === 0) return null;
      return (prev + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      } else if (event.key === 'ArrowLeft') {
        handlePrev();
      } else if (event.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedIndex, handleClose, handlePrev, handleNext]);

  return (
    <section
      id="galeria"
      className="py-20 sm:py-28 bg-[#1A1A1A] border-t border-white/10 scroll-mt-16"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-xl">
            <p className="text-xs sm:text-sm font-medium text-[#1D9BF0] tracking-wide">
              Portfólio Selecionado
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-white text-balance">
              Histórias reais sob um olhar autoral
            </h2>
            <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
              Cada clique preserva a proporção original, a luz e a atmosfera
              genuína de casamentos, retratos e encontros em Goiânia.
            </p>
          </div>

          {/* Interactive category filter controls */}
          <div
            role="tablist"
            aria-label="Filtrar galeria por categoria"
            className="inline-flex flex-wrap items-center gap-1.5 p-1 bg-[#222222] border border-white/10 rounded-lg self-start md:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  onClick={() => {
                    setActiveCategory(category);
                    setSelectedIndex(null);
                  }}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] ${
                    isActive
                      ? 'bg-[#1D9BF0] text-white shadow-sm'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Responsive gallery preserving original aspect ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {filteredItems.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              aria-label={`Ampliar fotografia: ${item.title}`}
              className="group relative w-full text-left bg-[#222222] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:border-[#1D9BF0]/60 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0] cursor-pointer"
            >
              <div className="relative overflow-hidden bg-[#141414]">
                <GalleryPicture
                  item={item}
                  className="w-full h-auto block transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/90 via-transparent to-transparent opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300"
                />
                <span
                  aria-hidden="true"
                  className="absolute top-3 right-3 inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[#1A1A1A]/80 border border-white/15 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:border-[#1D9BF0]/70"
                >
                  <Expand className="w-4 h-4 text-[#1D9BF0]" />
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="text-[#1D9BF0] font-medium">
                    {item.category}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="text-sm sm:text-base font-medium text-white leading-snug group-hover:text-[#1D9BF0] transition-colors">
                  {item.title}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedItem && selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização ampliada: ${selectedItem.title}`}
          onClick={handleClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 backdrop-blur-md p-4 sm:p-8"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full flex flex-col items-center gap-4"
          >
            {/* Top Bar inside Lightbox */}
            <div className="w-full flex items-center justify-between gap-4 text-sm text-neutral-300">
              <div className="flex items-center gap-2">
                <span className="text-[#1D9BF0] font-medium">
                  {selectedItem.category}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums text-neutral-400">
                  {selectedIndex + 1} / {filteredItems.length}
                </span>
              </div>

              <button
                type="button"
                onClick={handleClose}
                aria-label="Fechar visualização"
                className="inline-flex items-center justify-center w-11 h-11 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/15 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Image Container with Prev/Next controls */}
            <div className="relative w-full flex items-center justify-center">
              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Foto anterior"
                  className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#1A1A1A]/85 hover:bg-[#1D9BF0] text-white border border-white/15 mr-4 shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0]"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}

              <div className="max-h-[75vh] overflow-hidden rounded-xl border border-white/15 bg-[#141414]">
                <picture>
                  <source srcSet={selectedItem.webpSrc} type="image/webp" />
                  <img
                    src={selectedItem.jpgSrc}
                    alt={selectedItem.alt}
                    width={selectedItem.width}
                    height={selectedItem.height}
                    className="max-h-[75vh] w-auto h-auto object-contain mx-auto"
                  />
                </picture>
              </div>

              {filteredItems.length > 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Próxima foto"
                  className="hidden sm:inline-flex items-center justify-center w-11 h-11 rounded-lg bg-[#1A1A1A]/85 hover:bg-[#1D9BF0] text-white border border-white/15 ml-4 shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1D9BF0]"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Caption + Mobile Navigation */}
            <div className="w-full max-w-2xl text-center space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-white">
                {selectedItem.title}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedItem.description}
              </p>
              {filteredItems.length > 1 && (
                <div className="flex sm:hidden items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-white/10 rounded-lg border border-white/15 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Anterior
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-white/10 rounded-lg border border-white/15 cursor-pointer"
                  >
                    Próxima
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
