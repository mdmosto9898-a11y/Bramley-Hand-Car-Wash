import React, { useState, useEffect } from 'react';
import { Check, ArrowRight, Sparkles, HelpCircle, Star } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { adminStore, calculateDiscountPercent } from '../admin/data/adminStore';
import { AdminPricingPackage } from '../admin/types/admin';

interface PricingPackagesSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export const PricingPackagesSection: React.FC<PricingPackagesSectionProps> = ({ onSelectPackage }) => {
  const [packages, setPackages] = useState<AdminPricingPackage[]>(() => {
    return adminStore.getPricingPackages().filter((p) => p.status === 'active');
  });

  // Re-sync if store updates
  useEffect(() => {
    const handleStorage = () => {
      setPackages(adminStore.getPricingPackages().filter((p) => p.status === 'active'));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <section id="pricing" className="py-20 bg-neutral-900/50 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2.5 flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>USD ($) Professional Valeting Packages</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display text-balance mb-3">
            Hand Car Wash & Valeting Pricing
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            All prices are displayed in USD ($) as demo promotional starting rates subject to vehicle size and condition. Final confirmed prices provided on vehicle inspection at 601 Stanningley Rd.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {packages.map((pkg) => {
            const original = pkg.originalPrice || (pkg.startingPrice ? Math.round(pkg.startingPrice * 1.22) : undefined);
            const discounted = pkg.discountedPrice || pkg.startingPrice;
            const discountPct = pkg.discountPercent || calculateDiscountPercent(original, discounted);
            const isFeatured = pkg.isPopular || pkg.featured;

            return (
              <div
                key={pkg.id}
                className={`group rounded-2xl border flex flex-col justify-between overflow-hidden transition-all duration-300 relative bg-neutral-950 hover:-translate-y-1 hover:shadow-2xl active:translate-y-0 ${
                  isFeatured
                    ? 'border-amber-500/60 shadow-xl shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : 'border-neutral-800/90 hover:border-neutral-700'
                }`}
              >
                {/* Most Popular Badge */}
                {isFeatured && (
                  <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-950 text-[10px] font-black uppercase tracking-wider shadow-lg">
                    <Star className="w-3 h-3 fill-neutral-950" />
                    <span>Most Popular</span>
                  </div>
                )}

                {/* Service Image matching the service */}
                {pkg.image && (
                  <div className="relative w-full h-48 sm:h-52 bg-neutral-900 overflow-hidden shrink-0">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />

                    {/* Auto Discount Badge overlay */}
                    {discountPct > 0 && (
                      <div className="absolute bottom-3 left-3 inline-flex items-center px-2.5 py-1 rounded-md bg-emerald-500/95 text-neutral-950 text-[11px] font-black tracking-wider uppercase shadow-md animate-pulse">
                        SAVE {discountPct}%
                      </div>
                    )}
                  </div>
                )}

                {/* Card Content Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div>
                    {/* Title & Classification */}
                    <div className="mb-2">
                      <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                        {pkg.vehicleType || 'All Vehicle Sizes'}
                      </span>
                      <h3 className="text-xl font-bold text-white font-display mt-0.5 tracking-tight group-hover:text-amber-300 transition-colors">
                        {pkg.name}
                      </h3>
                    </div>

                    {/* Pricing Block with Strikethrough & Prominent Discount */}
                    <div className="mb-4 pb-4 border-b border-neutral-850 flex items-baseline gap-3">
                      {original && original > discounted ? (
                        <>
                          <div className="text-3xl sm:text-4xl font-black text-white font-display tabular-nums tracking-tight">
                            ${discounted}
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-neutral-500 line-through tabular-nums font-semibold">
                              ${original}
                            </span>
                            <span className="text-[10px] text-neutral-400 font-medium">
                              Demo Starting Rate
                            </span>
                          </div>
                        </>
                      ) : (
                        <div>
                          <div className="text-3xl sm:text-4xl font-black text-white font-display tabular-nums tracking-tight">
                            {pkg.priceDisplay || `$${discounted}`}
                          </div>
                          <span className="text-[10px] text-neutral-400 font-medium">
                            Demo Starting Rate
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Short Description */}
                    <p className="text-xs text-neutral-300 mb-5 leading-relaxed line-clamp-2">
                      {pkg.description}
                    </p>

                    {/* Included Services Checklist */}
                    {pkg.includedServices && pkg.includedServices.length > 0 && (
                      <div className="space-y-2 mb-6">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                          Included Procedures:
                        </span>
                        {pkg.includedServices.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-snug">
                            <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                        {pkg.includedServices.length > 4 && (
                          <span className="text-[10px] text-neutral-500 italic block pt-0.5">
                            +{pkg.includedServices.length - 4} additional detailing steps included
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Book Now Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => onSelectPackage(pkg.name)}
                      className={`w-full py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md hover:-translate-y-0.5 active:translate-y-0 ${
                        isFeatured
                          ? 'bg-amber-400 hover:bg-amber-300 text-neutral-950 font-black shadow-amber-500/20'
                          : 'bg-white hover:bg-neutral-200 text-neutral-950'
                      }`}
                    >
                      <span>Book Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pricing notice footer */}
        <div className="mt-12 text-center text-xs text-neutral-400 flex items-center justify-center gap-1.5 flex-wrap">
          <HelpCircle className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span>Have a custom vehicle, commercial van, or fleet inquiry? Call Bramley Hand Car Wash on</span>
          <a
            href={BUSINESS_INFO.phoneHref}
            className="text-white underline font-semibold hover:text-neutral-200 transition-colors"
          >
            {BUSINESS_INFO.phoneDisplay}
          </a>
          <span>or drive in 7 days a week to 601 Stanningley Rd, Leeds.</span>
        </div>

      </div>
    </section>
  );
};
