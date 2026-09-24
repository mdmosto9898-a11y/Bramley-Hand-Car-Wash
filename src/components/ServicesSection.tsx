import React, { useState } from 'react';
import { ArrowRight, Sparkles, ChevronRight, Tag, Info, Phone } from 'lucide-react';
import { SERVICES_LIST, BUSINESS_INFO } from '../data/businessData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onOpenModal: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES_LIST
    : SERVICES_LIST.filter((s) => s.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'exterior', label: 'Hand Wash & Exterior' },
    { id: 'interior', label: 'Interior Valeting' },
    { id: 'paint', label: 'Polishing & Wax' },
    { id: 'specialist', label: 'Specialist Add-ons' },
  ];

  return (
    <section id="services" className="py-20 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Service Catalog & Menu</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display text-balance">
              Car Wash & Valeting Services
            </h2>
          </div>
          <p className="text-sm sm:text-base text-neutral-400 max-w-md">
            Conveniently located at 601 Stanningley Rd, Bramley, Leeds LS13 4EL. Drive in 7 days a week or book ahead.
          </p>
        </div>

        {/* Pricing Guideline Banner */}
        <div className="mb-10 p-4 rounded-xl bg-neutral-900/80 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-300">
          <div className="flex items-start sm:items-center gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-white">Pricing Transparency: </strong>
              Prices shown in USD ($) from — starting rates subject to vehicle size and condition. For exact quote or fleet rates, call Bramley Hand Car Wash on{' '}
              <a href={BUSINESS_INFO.phoneHref} className="text-white underline font-semibold">
                {BUSINESS_INFO.phoneDisplay}
              </a>.
            </span>
          </div>
          <span className="shrink-0 text-[11px] font-semibold text-amber-400 uppercase tracking-wider bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
            USD ($) Rates
          </span>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-10 border-b border-neutral-900 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-neutral-800 text-white border border-neutral-700 shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="group bg-neutral-900/80 border border-neutral-800/90 rounded-xl overflow-hidden flex flex-col hover:border-neutral-700 transition-all duration-200 hover:shadow-xl hover:shadow-black/60 relative"
            >
              {/* Card Image */}
              <div className="relative h-52 w-full overflow-hidden bg-neutral-950">
                <img
                  src={service.image}
                  alt={`${service.name} at Bramley Hand Car Wash Leeds`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                
                {/* Category label */}
                <div className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-neutral-300 bg-neutral-950/85 backdrop-blur px-2.5 py-1 rounded border border-neutral-800">
                  {service.category === 'paint' ? 'Paintwork' : service.category}
                </div>

                {/* Popular badge */}
                {service.isPopular && (
                  <div className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-neutral-950/90 backdrop-blur px-2 py-0.5 rounded border border-amber-500/30">
                    Popular
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-neutral-200 transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  {/* Price Tag Badge */}
                  <div className="mb-3.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-950 border border-neutral-800 text-xs font-semibold text-neutral-200">
                    <Tag className="w-3 h-3 text-amber-400" />
                    <span>{service.priceDisplay}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3 mb-5">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenModal(service)}
                    className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-2.5 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-neutral-700"
                  >
                    <span>View Details</span>
                    <ChevronRight className="w-3.5 h-3.5 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.name)}
                    className="px-3.5 py-2 bg-neutral-800 hover:bg-white text-neutral-200 hover:text-neutral-950 font-semibold text-xs rounded-lg border border-neutral-700 hover:border-white transition-all duration-150 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom helper prompt */}
        <div className="mt-14 p-6 sm:p-8 rounded-xl bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-white mb-1 font-display">
              Have questions about vehicle sizes or multiple car discounts?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Located on Stanningley Road, Leeds. Call us directly on{' '}
              <strong className="text-white font-mono">{BUSINESS_INFO.phoneDisplay}</strong> for queue updates or booking inquiries.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="px-5 py-2.5 bg-neutral-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-neutral-700 hover:bg-neutral-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-300" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <button
              onClick={() => onSelectService('Full Valet Package')}
              className="px-5 py-2.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors shadow-sm cursor-pointer"
            >
              Book Full Valet
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
