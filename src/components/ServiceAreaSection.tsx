import React, { useState } from 'react';
import { MapPin, Check, Search, AlertCircle, Compass, Navigation } from 'lucide-react';
import { SERVICE_AREAS, BUSINESS_INFO } from '../data/businessData';

interface ServiceAreaSectionProps {
  onOpenBooking: () => void;
}

export const ServiceAreaSection: React.FC<ServiceAreaSectionProps> = ({ onOpenBooking }) => {
  const [searchPostcode, setSearchPostcode] = useState('');
  const [checkResult, setCheckResult] = useState<{
    tested: boolean;
    covered: boolean;
    message: string;
  }>({ tested: false, covered: false, message: '' });

  const handlePostcodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = searchPostcode.trim().toUpperCase();
    if (!clean) return;

    const isBramleyImmediate = clean.startsWith('LS13') || clean.startsWith('LS28');
    const isLeedsArea = clean.startsWith('LS');
    const isBradfordNear = clean.startsWith('BD3') || clean.startsWith('BD4') || clean.startsWith('BD1') || clean.startsWith('BD');

    if (isBramleyImmediate) {
      setCheckResult({
        tested: true,
        covered: true,
        message: `Great! Postcode ${clean} is right in our immediate Bramley & Stanningley neighbourhood. You are only minutes from our site at 601 Stanningley Rd.`
      });
    } else if (isLeedsArea) {
      setCheckResult({
        tested: true,
        covered: true,
        message: `Excellent! Postcode ${clean} is within our regular Leeds service community. Easy access via the A647 Stanningley Bypass.`
      });
    } else if (isBradfordNear) {
      setCheckResult({
        tested: true,
        covered: true,
        message: `Good news! Postcode ${clean} is just along the A647 Leeds/Bradford corridor. Convenient straight drive to 601 Stanningley Rd.`
      });
    } else {
      setCheckResult({
        tested: true,
        covered: true,
        message: `Postcode ${clean} is within driving distance of our Leeds facility at 601 Stanningley Rd (LS13 4EL). Call ${BUSINESS_INFO.phoneDisplay} for directions or queue status.`
      });
    }
  };

  return (
    <section id="service-area" className="py-20 bg-neutral-900/40 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Facility Location & Local Areas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display text-balance">
            Convenient Stanningley Road Location
          </h2>
          <p className="text-sm sm:text-base text-neutral-300 mt-3 leading-relaxed">
            Located at 601 Stanningley Rd, Bramley, Leeds LS13 4EL. Conveniently serving motorists across Bramley, Stanningley, Farsley, Pudsey, Armley, Kirkstall, Horsforth, and greater Leeds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Postcode checker & Districts list (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Quick Postcode Checker Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6">
              <h3 className="text-base sm:text-lg font-bold text-white font-display mb-1">
                Check Your Postcode for Travel Distance
              </h3>
              <p className="text-xs text-neutral-400 mb-4">
                Enter your Leeds or West Yorkshire postcode to check distance to 601 Stanningley Rd.
              </p>
              
              <form onSubmit={handlePostcodeCheck} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={searchPostcode}
                    onChange={(e) => setSearchPostcode(e.target.value)}
                    placeholder="e.g. LS13 4EL, LS28, LS12, BD3..."
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-white text-white px-4 py-2.5 rounded-lg text-sm uppercase placeholder:normal-case placeholder:text-neutral-500 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Check Postcode</span>
                </button>
              </form>

              {/* Result display */}
              {checkResult.tested && (
                <div className="mt-4 p-4 rounded-lg text-xs leading-relaxed flex items-start gap-3 animate-in fade-in bg-neutral-900 border border-neutral-750 text-neutral-200">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-white mb-1">{checkResult.message}</p>
                    <a
                      href={BUSINESS_INFO.googleDirectionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 mt-1 inline-flex items-center gap-1"
                    >
                      <Navigation className="w-3 h-3" />
                      <span>Get turn-by-turn Google directions to 601 Stanningley Rd →</span>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Verified Local Leeds & Surround Areas */}
            <div className="bg-neutral-950/60 border border-neutral-800/80 rounded-xl p-6">
              <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-4">
                Surrounding Leeds & West Yorkshire Districts
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {SERVICE_AREAS.map((area, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border text-xs flex flex-col justify-between gap-1 transition-colors ${
                      area.highlight
                        ? 'bg-neutral-900/90 border-neutral-700 text-white'
                        : 'bg-neutral-900/40 border-neutral-800/60 text-neutral-300'
                    }`}
                  >
                    <span className="font-semibold text-white truncate">{area.name}</span>
                    <div className="flex items-center justify-between text-[11px] text-neutral-400">
                      <span>{area.postcode}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-neutral-400 mt-4 leading-relaxed">
                Direct road access via A647 Stanningley Road and Leeds Ring Road. Easy drive-in turning with customer waiting area.
              </p>
            </div>

          </div>

          {/* Location / Base Hub Info Card (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col items-center text-center">
            <div className="w-full relative aspect-square max-w-sm rounded-lg overflow-hidden bg-neutral-900/80 border border-neutral-800 flex items-center justify-center p-6">
              
              {/* Concentric radar rings */}
              <div className="absolute w-64 h-64 rounded-full border border-neutral-800/60 animate-pulse" />
              <div className="absolute w-48 h-48 rounded-full border border-neutral-700/60" />
              <div className="absolute w-32 h-32 rounded-full border border-neutral-600/80 bg-neutral-900/40" />
              
              {/* Compass points */}
              <div className="absolute top-3 text-[10px] font-mono text-neutral-400 font-bold">KIRKSTALL / HORSFORTH</div>
              <div className="absolute bottom-3 text-[10px] font-mono text-neutral-400 font-bold">ARMLEY / WORTLEY</div>
              <div className="absolute left-3 text-[10px] font-mono text-neutral-400 font-bold">STANNINGLEY / PUDSEY</div>
              <div className="absolute right-3 text-[10px] font-mono text-neutral-400 font-bold">LEEDS CITY CENTRE</div>

              {/* Center Pin for Bramley Site */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-11 h-11 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-xl ring-4 ring-white/20">
                  <MapPin className="w-5 h-5 text-neutral-950" />
                </div>
                <div className="mt-2 bg-neutral-950 border border-neutral-700 px-3 py-1 rounded text-xs font-bold text-white shadow-lg">
                  Bramley Hand Car Wash
                </div>
                <div className="text-[10px] text-neutral-300 mt-0.5">
                  601 Stanningley Rd, Leeds LS13 4EL
                </div>
              </div>
            </div>

            <div className="mt-6 w-full text-left bg-neutral-900/60 border border-neutral-800/80 rounded-lg p-4 text-xs text-neutral-300">
              <div className="flex items-center gap-2 text-white font-semibold mb-1">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Facility Address</span>
              </div>
              <p className="text-neutral-200 leading-relaxed font-medium">
                {BUSINESS_INFO.address}
              </p>
              <p className="text-neutral-400 text-[11px] mt-1">
                Open Monday to Sunday 8:30 AM – 6:00 PM. High-pressure wash bays, snow foam lances, hot water extraction, and dedicated valeting.
              </p>
              <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between">
                <a
                  href={BUSINESS_INFO.googleDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 text-xs font-bold inline-flex items-center gap-1"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
                <a href={BUSINESS_INFO.phoneHref} className="text-white font-bold hover:underline">
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
