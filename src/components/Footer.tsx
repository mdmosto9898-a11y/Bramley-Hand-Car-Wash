import React from 'react';
import { BUSINESS_INFO } from '../data/businessData';
import { Phone, MapPin, Clock, Settings, Navigation, Star } from 'lucide-react';
import { TikTokIcon } from './TikTokIcon';
import { Logo } from './Logo';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs py-14 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-900">
          
          {/* Col 1: Brand & Location */}
          <div className="md:col-span-2">
            <Logo variant="horizontal" size="md" className="mb-4" />
            <p className="text-neutral-300 text-sm max-w-md leading-relaxed mb-4">
              Professional hand car washing, rich snow foam baths, deep interior valeting, and vehicle care at 601 Stanningley Rd.
            </p>
            <div className="space-y-2 text-xs text-neutral-400">
              <a
                href={BUSINESS_INFO.googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-white transition-colors"
              >
                <MapPin className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                <span>601 Stanningley Rd, Bramley, Leeds LS13 4EL, UK</span>
              </a>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-neutral-400 shrink-0" />
                <span>Monday – Sunday: 8:30 AM – 6:00 PM (Open 7 Days)</span>
              </div>
              <div className="flex items-center gap-2 text-amber-400 font-semibold">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>Rated 5.0 ★ by Google reviewers</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Navigation
            </h4>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services & Pricing ($)</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Valet Packages</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Bramley</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Before & After Gallery</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Google Reviews (5.0★)</a></li>
              <li><a href="#service-area" className="hover:text-white transition-colors">Location & Areas</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#booking" className="hover:text-white transition-colors">Book / Enquire</a></li>
            </ul>
          </div>

          {/* Col 3: Verified Contact & TikTok */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Contact & Social
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="text-white hover:text-neutral-200 font-semibold flex items-center gap-2 tabular-nums"
                >
                  <Phone className="w-4 h-4 text-neutral-400" />
                  <span>{BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={BUSINESS_INFO.googleDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-300 hover:text-white flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4 text-cyan-400" />
                  <span>Get Directions (Google Maps)</span>
                </a>
              </li>
              {/* Real TikTok Account */}
              <li>
                <a
                  href={BUSINESS_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 flex items-center gap-2 font-medium"
                >
                  <TikTokIcon className="w-4 h-4 text-pink-400" />
                  <span>@bramley_handcarwash0</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar with legal & discreet admin settings link */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {currentYear} Bramley Hand Car Wash</span>
            <span className="text-neutral-700">|</span>
            <a href="#privacy" className="hover:text-neutral-400 transition-colors">Privacy</a>
            <span className="text-neutral-700">|</span>
            <a href="#terms" className="hover:text-neutral-400 transition-colors">Terms</a>
            <span className="text-neutral-700">|</span>
            <div className="relative group inline-block">
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-neutral-300 p-1 rounded-md transition-all duration-300 hover:scale-110 cursor-pointer focus:outline-none focus:ring-1 focus:ring-neutral-700"
                title="Staff Login"
                aria-label="Staff Login"
              >
                <Settings className="w-3.5 h-3.5 transition-transform duration-300 group-hover:rotate-45 text-neutral-500 group-hover:text-amber-400" />
                <span className="text-[11px] font-medium hidden sm:inline-block">Staff Login</span>
              </button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-neutral-900 border border-neutral-750 text-neutral-200 text-[10px] rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Staff Login
              </div>
            </div>
          </div>
          <p className="text-center sm:text-right max-w-xl">
            601 Stanningley Rd, Bramley, Leeds LS13 4EL. All prices displayed in USD ($) as demo starting rates subject to vehicle size and condition.
          </p>
        </div>

      </div>
    </footer>
  );
};
