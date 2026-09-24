import React from 'react';
import { Star, Clock, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const TrustBar: React.FC = () => {
  return (
    <section aria-label="Trust Signals" className="bg-neutral-900/90 border-b border-neutral-800/80 py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-neutral-800">
          
          {/* Rating */}
          <a
            href={BUSINESS_INFO.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-center sm:text-left py-2 hover:opacity-90 transition-opacity"
          >
            <div className="flex items-center text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div>
              <p className="text-xs text-neutral-400">Google Verified</p>
              <p className="text-sm font-semibold text-white">5.0 ★ Rating</p>
            </div>
          </a>

          {/* Open 7 Days */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-center sm:text-left py-2 md:pl-6">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-200 shrink-0">
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-400">8:30 AM – 6:00 PM</p>
              <p className="text-sm font-semibold text-white">Open 7 Days a Week</p>
            </div>
          </div>

          {/* Location */}
          <a
            href={BUSINESS_INFO.googleDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-center sm:text-left py-2 md:pl-6 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-200 shrink-0">
              <MapPin className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-400">601 Stanningley Rd</p>
              <p className="text-sm font-semibold text-white">Bramley, Leeds</p>
            </div>
          </a>

          {/* Quality Care */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 text-center sm:text-left py-2 md:pl-6">
            <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center text-neutral-200 shrink-0">
              <Sparkles className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <p className="text-xs text-neutral-400">Safe Hand Wash</p>
              <p className="text-sm font-semibold text-white">Snow Foam & Valeting</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
