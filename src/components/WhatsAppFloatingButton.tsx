import { MessageCircle } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

export function WhatsAppFloatingButton() {
  const href = `${STUDIO_INFO.whatsappBaseUrl}?text=${encodeURIComponent(
    STUDIO_INFO.whatsappDefaultMessage,
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com Gouveia Photo Art pelo WhatsApp (62) 3278-5206"
      title="Atendimento via WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2.5 h-12 px-4 sm:px-5 rounded-full bg-[#1D9BF0] text-white font-semibold text-sm shadow-xl shadow-black/40 border border-white/15 transition-all duration-200 hover:bg-[#1A8CD8] hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#1A1A1A]"
    >
      <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
    </a>
  );
}
