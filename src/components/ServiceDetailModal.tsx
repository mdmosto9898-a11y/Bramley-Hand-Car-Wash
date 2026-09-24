import React from 'react';
import { X, CheckCircle2, ArrowRight, Tag, Info } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onSelectService: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onSelectService,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        {service.image && (
          <div className="relative h-44 sm:h-52 w-full overflow-hidden bg-neutral-950 shrink-0">
            <img
              src={service.image}
              alt={service.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded bg-neutral-950/80 text-neutral-300 hover:text-white border border-neutral-700 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        <div className="p-6 sm:p-8 overflow-y-auto">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Hand Car Wash & Valeting Service
              </span>
              <h3 className="text-2xl font-bold text-white font-display mt-0.5">
                {service.name}
              </h3>
            </div>
            {!service.image && (
              <button
                onClick={onClose}
                className="p-1 text-neutral-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Pricing indicator */}
          <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-950 border border-neutral-800 text-xs font-semibold text-white">
            <Tag className="w-3.5 h-3.5 text-neutral-400" />
            <span>Pricing: {service.priceDisplay}</span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
            {service.fullDesc}
          </p>

          <div className="mb-6">
            <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-3">
              Included In This Service
            </h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-neutral-200">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-neutral-950/70 border border-neutral-800 rounded p-3.5 mb-4 text-xs text-neutral-300">
            <strong className="text-white font-medium">Recommended for: </strong>
            {service.recommendedFor}
          </div>

          <div className="p-3 rounded bg-neutral-950/40 border border-neutral-800/80 text-[11px] text-neutral-400 flex items-start gap-2 mb-6">
            <Info className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
            <span>
              {service.priceNote || 'Prices from — subject to vehicle size and condition.'} Contact Bramley Hand Car Wash for specific vehicle quotations.
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-neutral-400 hover:text-white rounded transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectService(service.name);
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-2.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <span>Book This Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
