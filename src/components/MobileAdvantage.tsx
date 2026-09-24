import React from 'react';
import { ArrowRight, CheckCircle2, MapPin, Sparkles, Clock } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface MobileAdvantageProps {
  onOpenBooking: () => void;
}

export const MobileAdvantage: React.FC<MobileAdvantageProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      title: 'Drive In or Book Ahead',
      description: 'Visit our facility at 601 Stanningley Rd, Bramley. No appointment needed for routine washes; book ahead for deep valeting.',
      highlight: 'Open 7 days: 8:30 AM – 6:00 PM'
    },
    {
      number: '02',
      title: 'Gentle Foam & Hand Wash',
      description: 'We treat your clear coat with care: high-pressure rinse, thick snow foam, two-bucket gentle hand wash, and wheel iron cleanse.',
      highlight: 'Scratch-free wash procedure'
    },
    {
      number: '03',
      title: 'Deep Valet & Spotless Finish',
      description: 'Plush microfibre drying, tyre dressing, interior vacuuming, hot upholstery extraction, and streak-free crystal clear glass.',
      highlight: 'Spotless inside & out'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-neutral-900/60 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>The Bramley Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display text-balance mb-4 leading-tight">
            Quality Hand Car Wash & Valeting
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
            Fast, thorough, and careful. Conveniently located on Stanningley Road between Bramley and Pudsey, we keep your vehicle in pristine showroom condition without the scratch risks of automated car washes.
          </p>
        </div>

        {/* 3-Step Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {steps.map((step) => (
            <div
              key={step.number}
              className="bg-neutral-950/80 border border-neutral-800/90 rounded-xl p-7 relative flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <span className="text-3xl font-black text-neutral-600 font-display tabular-nums block mb-3">
                  {step.number}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5">
                  {step.description}
                </p>
              </div>

              <div className="pt-3 border-t border-neutral-900 flex items-center gap-2 text-xs font-medium text-amber-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{step.highlight}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Location & CTA info */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-neutral-950 border border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 flex items-center justify-center text-cyan-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-white">601 Stanningley Rd, Bramley, Leeds LS13 4EL</h4>
              <p className="text-xs text-neutral-400">Directly accessible via A647 with easy queue lane & turnaround</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={BUSINESS_INFO.googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-neutral-700 transition-colors text-center"
            >
              Directions
            </a>
            <button
              type="button"
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Book Valet</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
