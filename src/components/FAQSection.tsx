import React, { useState } from 'react';
import { FAQS } from '../data/businessData';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-neutral-300" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display text-balance">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 mt-4 max-w-xl mx-auto">
            Everything you need to know about hand car washing, deep valeting, and vehicle care at 601 Stanningley Rd, Bramley, Leeds.
          </p>
        </div>

        <div className="divide-y divide-neutral-800/80 border-y border-neutral-800/80">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={idx} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between gap-4 text-left group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white group-hover:text-neutral-200 transition-colors font-display">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 group-hover:text-white transition-all shrink-0 ${isOpen ? 'rotate-180 bg-neutral-800' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-3 pb-2 pr-6 text-sm text-neutral-300 leading-relaxed animate-in fade-in duration-150">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct question box */}
        <div className="mt-12 p-6 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              Have a question not covered above?
            </h4>
            <p className="text-xs text-neutral-400">
              Contact our team directly for current availability, vehicle advice, and tailored pricing.
            </p>
          </div>
          <a
            href={BUSINESS_INFO.phoneHref}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold text-xs rounded border border-neutral-700 transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-neutral-300" />
            <span>Call {BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
