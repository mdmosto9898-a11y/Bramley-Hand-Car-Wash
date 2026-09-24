import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, MapPin } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { TikTokIcon } from './TikTokIcon';
import { Logo } from './Logo';

interface HeaderProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Services & Pricing', href: '#services' },
    { label: 'Pricing Packages', href: '#pricing' },
    { label: 'Why Bramley', href: '#why-us' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location & Area', href: '#service-area' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 border-b ${
        isScrolled
          ? 'bg-neutral-950/95 backdrop-blur-md border-neutral-800/90 shadow-lg shadow-black/50'
          : 'bg-neutral-950/90 backdrop-blur-sm border-neutral-800/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Brand wordmark with vector Logo emblem */}
        <a
          href="#home"
          className="group flex items-center focus:outline-none min-w-0 shrink"
        >
          <Logo variant="horizontal" size="md" />
        </a>

        {/* Navigation links (desktop) */}
        <nav className="hidden xl:flex items-center gap-5 text-xs uppercase tracking-wider font-semibold text-neutral-300">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-white transition-colors duration-150 py-1 hover:underline decoration-neutral-500 underline-offset-8 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Primary actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          {/* TikTok link */}
          <a
            href={BUSINESS_INFO.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="Follow @bramley_handcarwash0 on TikTok"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-300 hover:text-white px-2.5 py-2 rounded border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 transition-colors shrink-0"
          >
            <TikTokIcon className="w-3.5 h-3.5" />
            <span className="hidden md:inline font-mono text-[11px]">TikTok</span>
          </a>

          {/* Direct Call Button */}
          <a
            href={BUSINESS_INFO.phoneHref}
            className="hidden lg:inline-flex items-center gap-2 text-xs font-semibold text-neutral-200 hover:text-white px-3 py-2 rounded border border-neutral-800 hover:border-neutral-700 transition-colors whitespace-nowrap shrink-0"
            title={`Call ${BUSINESS_INFO.phoneDisplay}`}
          >
            <Phone className="w-3.5 h-3.5 text-neutral-300" />
            <span className="tabular-nums font-mono">{BUSINESS_INFO.phoneDisplay}</span>
          </a>

          {/* BOOK/ENQUIRE CTA Button — always visible on 320px+ without clipping */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-[10px] min-[360px]:text-[11px] sm:text-xs uppercase tracking-wider px-2.5 min-[360px]:px-3 sm:px-4 py-2 sm:py-2.5 rounded-md transition-all duration-150 shadow-sm whitespace-nowrap shrink-0 cursor-pointer active:scale-[0.98]"
          >
            <span className="hidden min-[380px]:inline">BOOK / ENQUIRE</span>
            <span className="min-[380px]:hidden">BOOK</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-1.5 min-[360px]:p-2 text-neutral-400 hover:text-white rounded border border-neutral-800 transition-colors shrink-0 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-neutral-950 border-b border-neutral-800 px-5 py-5 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-3 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-neutral-300 hover:text-white transition-colors py-1.5 border-b border-neutral-900"
              >
                {link.label}
              </a>
            ))}

            {/* Official TikTok in Mobile Menu */}
            <a
              href={BUSINESS_INFO.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 py-2.5 text-neutral-200 hover:text-white transition-colors border-b border-neutral-900"
            >
              <TikTokIcon className="w-4 h-4 text-pink-400" />
              <span>Follow @bramley_handcarwash0 on TikTok</span>
            </a>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="flex items-center justify-center gap-2 py-2.5 rounded border border-neutral-800 text-sm font-semibold text-white bg-neutral-900"
              >
                <Phone className="w-4 h-4 text-neutral-400" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>

              <a
                href={BUSINESS_INFO.googleDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded border border-neutral-800 text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900/60"
              >
                <MapPin className="w-4 h-4 text-neutral-400" />
                <span>Get Directions (601 Stanningley Rd)</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded text-center cursor-pointer"
              >
                BOOK / ENQUIRE
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
