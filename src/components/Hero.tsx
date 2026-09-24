import React from 'react';
import { Star, Phone, Navigation, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, heroCarImg } from '../data/businessData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-neutral-950 border-b border-neutral-800/80 pt-8 pb-14"
    >
      {/* Background Image Container with Measured Contrast Scrims */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <img
          src={heroCarImg}
          alt="Bramley Hand Car Wash Leeds quality vehicle care"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-35 scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/90" />
        <div className="absolute inset-0 bg-radial from-transparent via-neutral-950/60 to-neutral-950/95" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-4">
        
        {/* Location & Status Pill */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-neutral-300 uppercase tracking-widest mb-6 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-neutral-800 backdrop-blur shadow-lg">
          <span className="flex items-center gap-1.5 text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Open 7 Days (8:30 AM – 6:00 PM)
          </span>
          <span className="text-neutral-600 hidden sm:inline" aria-hidden="true">·</span>
          <a
            href={BUSINESS_INFO.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-neutral-400" />
            <span>601 Stanningley Rd, Bramley, Leeds</span>
          </a>
        </div>

        {/* Brand Name Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display leading-[1.08] mb-4 max-w-4xl mx-auto text-balance">
          BRAMLEY HAND CAR WASH
        </h1>

        {/* Quality Hand Car Wash & Valeting in Leeds */}
        <p className="text-xl sm:text-2xl md:text-3xl text-neutral-200 font-semibold max-w-3xl mx-auto mb-4 font-display tracking-tight text-balance">
          QUALITY HAND CAR WASH & VALETING IN LEEDS
        </p>

        <p className="text-sm sm:text-base text-neutral-400 max-w-2xl mx-auto mb-8 leading-relaxed text-balance">
          Meticulous hand washing, snow foam baths, wheel iron decontamination, and deep interior valeting right on Stanningley Road. Drive in today or contact our team for bookings.
        </p>

        {/* Required 3 CTA Buttons: CALL NOW | GET DIRECTIONS | BOOK / ENQUIRE */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10 max-w-2xl mx-auto">
          {/* CTA 1: CALL NOW */}
          <a
            href={BUSINESS_INFO.phoneHref}
            className="w-full sm:w-auto px-7 py-3.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-all duration-150 shadow-xl shadow-white/5 active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>CALL NOW</span>
          </a>

          {/* CTA 2: GET DIRECTIONS */}
          <a
            href={BUSINESS_INFO.googleDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-neutral-750 hover:border-neutral-600 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Navigation className="w-4 h-4 text-cyan-400" />
            <span>GET DIRECTIONS</span>
          </a>

          {/* CTA 3: BOOK / ENQUIRE */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-200 hover:text-white font-bold text-xs uppercase tracking-wider rounded-lg border border-neutral-800 transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-neutral-400" />
            <span>BOOK / ENQUIRE</span>
          </button>
        </div>

        {/* Verified Google 5.0★ Review Summary Badge */}
        <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 py-3 px-5 rounded-lg bg-neutral-900/80 border border-neutral-800 backdrop-blur shadow-md">
          <a
            href={BUSINESS_INFO.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white hover:text-neutral-200 transition-colors"
          >
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span><strong>5.0 ★</strong> Google Reviews</span>
          </a>

          <div className="hidden sm:block w-px h-4 bg-neutral-800" />

          <div className="flex items-center gap-1.5 text-xs text-neutral-300">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Mon–Sun 8:30 AM–6:00 PM</span>
          </div>

          <div className="hidden sm:block w-px h-4 bg-neutral-800" />

          <a
            href={BUSINESS_INFO.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white underline font-medium"
          >
            <span>601 Stanningley Rd, Leeds</span>
          </a>
        </div>

      </div>
    </section>
  );
};
