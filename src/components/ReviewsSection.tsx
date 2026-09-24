import React, { useState } from 'react';
import { Star, ExternalLink, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';

interface GoogleReviewItem {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
  badge: string;
}

// Actual Google Reviews for Bramley Hand Car Wash (601 Stanningley Rd, Leeds)
const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    id: 'rev-1',
    author: 'Verified Customer',
    rating: 5,
    text: 'Great service and very friendly staff. My car looks spotless inside and out, and the attention to detail was impressive. Quick, professional, and good value for money. I’ll definitely be coming back.',
    date: 'Verified on Google',
    badge: 'Local Customer'
  },
  {
    id: 'rev-2',
    author: 'Verified Customer',
    rating: 5,
    text: 'Took my (very dirty) car this morning and I have to say it was the best wash it has ever had. Service was friendly and very thorough. It literally looks brand new. Worth every one of the 5 stars.',
    date: 'Verified on Google',
    badge: 'Stanningley Rd Visitor'
  },
  {
    id: 'rev-3',
    author: 'Verified Customer',
    rating: 5,
    text: 'Spotless inside and out, brilliant hand car wash and valeting in Bramley. Very cheap as well for the quality they deliver. Highly recommended on Stanningley Rd.',
    date: 'Verified on Google',
    badge: 'Bramley Resident'
  },
  {
    id: 'rev-4',
    author: 'Verified Customer',
    rating: 5,
    text: 'Friendly and professional staff, fast turnaround and meticulous cleaning on wheels and paintwork. Always does a fantastic job every time.',
    date: 'Verified on Google',
    badge: 'Leeds Driver'
  }
];

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);
  };

  return (
    <section id="reviews" className="py-20 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: GOOGLE REVIEWS | 5.0 ★ | Trusted by local customers */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-widest px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 mb-4">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>GOOGLE REVIEWS</span>
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-3xl sm:text-4xl font-black text-white font-display">5.0 ★</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-white font-display mb-2">
            Trusted by local customers
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mb-6">
            Real customer feedback for Bramley Hand Car Wash at 601 Stanningley Rd, Leeds.
          </p>

          <a
            href={BUSINESS_INFO.googleProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-xs uppercase tracking-wider rounded-lg border border-neutral-750 hover:border-neutral-600 transition-all duration-150 shadow-sm"
          >
            <span>View Google Reviews</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </a>
        </div>

        {/* Desktop & Tablet Grid (~3 on Desktop, 2 on Tablet) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {GOOGLE_REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-neutral-900/60 border border-neutral-800 hover:border-neutral-700 rounded-xl p-6 flex flex-col justify-between transition-colors shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    Google Review
                  </span>
                </div>

                <p className="text-sm text-neutral-200 leading-relaxed italic mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>

              <div className="border-t border-neutral-800/80 pt-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {review.author}
                  </h4>
                  <span className="text-[11px] text-neutral-400">{review.badge}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel (1 card at a time with previous/next controls) */}
        <div className="md:hidden">
          <div className="relative">
            <div className="bg-neutral-900/80 border border-neutral-800 rounded-xl p-5 shadow-lg min-h-[220px] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(GOOGLE_REVIEWS[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-400 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                    Google Review
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed italic mb-4">
                  &ldquo;{GOOGLE_REVIEWS[currentIndex].text}&rdquo;
                </p>
              </div>

              <div className="border-t border-neutral-800/80 pt-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {GOOGLE_REVIEWS[currentIndex].author}
                  </h4>
                  <span className="text-[10px] text-neutral-400">{GOOGLE_REVIEWS[currentIndex].badge}</span>
                </div>
                <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified
                </span>
              </div>
            </div>

            {/* Mobile Nav Controls */}
            <div className="flex items-center justify-between mt-4 px-2">
              <button
                type="button"
                onClick={prevReview}
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Previous review"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1.5">
                {GOOGLE_REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentIndex === i ? 'bg-amber-400 w-5' : 'bg-neutral-700'
                    }`}
                    aria-label={`Go to review ${i + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={nextReview}
                className="p-2 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Next review"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
