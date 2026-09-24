import React from 'react';
import { Phone, Navigation, Calendar } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenBooking }) => {
  return (
    <div
      aria-label="Quick Actions"
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 p-2 px-2.5 flex items-center gap-1.5 shadow-2xl"
      style={{ maxHeight: '64px' }}
    >
      <a
        href={BUSINESS_INFO.phoneHref}
        className="flex-1 h-10 flex items-center justify-center gap-1 bg-neutral-900 border border-neutral-700 text-white font-semibold text-xs rounded-lg hover:bg-neutral-800 transition-colors uppercase tracking-wider"
      >
        <Phone className="w-3.5 h-3.5 text-neutral-300" />
        <span>Call</span>
      </a>

      <a
        href={BUSINESS_INFO.googleDirectionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 h-10 flex items-center justify-center gap-1 bg-neutral-900 border border-neutral-700 text-cyan-300 font-semibold text-xs rounded-lg hover:bg-neutral-800 transition-colors uppercase tracking-wider"
      >
        <Navigation className="w-3.5 h-3.5 text-cyan-400" />
        <span>Directions</span>
      </a>

      <button
        type="button"
        onClick={onOpenBooking}
        className="flex-[1.3] h-10 flex items-center justify-center gap-1 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors shadow-md cursor-pointer"
      >
        <Calendar className="w-3.5 h-3.5" />
        <span>BOOK / ENQUIRE</span>
      </button>
    </div>
  );
};
