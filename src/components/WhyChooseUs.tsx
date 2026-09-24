import React from 'react';
import { WHY_CHOOSE_US } from '../data/businessData';
import { ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  return (
    <section id="why-us" className="py-20 bg-neutral-900/40 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Dedicated Hand Car Wash & Valeting</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display text-balance">
            Why Choose Bramley Hand Car Wash
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 leading-relaxed">
            Safe wash methods, deep interior extraction, open 7 days a week, and verified 5.0★ Google customer satisfaction at 601 Stanningley Rd, Bramley, Leeds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CHOOSE_US.map((item) => (
            <div
              key={item.number}
              className="bg-neutral-950/70 border border-neutral-800/90 rounded-xl p-7 flex flex-col justify-between hover:border-neutral-700 transition-colors"
            >
              <div>
                <span className="text-sm font-bold text-amber-400 font-display tabular-nums tracking-wider block mb-3">
                  {item.number}
                </span>
                <h3 className="text-xl font-bold text-white font-display mb-3">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
