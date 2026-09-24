import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { GalleryItem } from '../types';

interface LightboxModalProps {
  item: GalleryItem | null;
  items?: GalleryItem[];
  onClose: () => void;
  onNavigate?: (newItem: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items = [],
  onClose,
  onNavigate
}) => {
  const currentIndex = item ? items.findIndex((i) => i.id === item.id) : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < items.length - 1;

  const handlePrev = useCallback(() => {
    if (hasPrevious && onNavigate) {
      onNavigate(items[currentIndex - 1]);
    }
  }, [hasPrevious, currentIndex, items, onNavigate]);

  const handleNext = useCallback(() => {
    if (hasNext && onNavigate) {
      onNavigate(items[currentIndex + 1]);
    }
  }, [hasNext, currentIndex, items, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, handlePrev, handleNext]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative max-w-5xl w-full bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-neutral-850 bg-neutral-900/90">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 text-neutral-300 shrink-0">
              {item.category.replace('_', ' ')}
            </span>
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white font-display truncate">
              {item.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {items.length > 0 && currentIndex >= 0 && (
              <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block px-2 py-1 rounded bg-neutral-950 border border-neutral-800">
                {currentIndex + 1} / {items.length}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-neutral-400 hover:text-white rounded-lg border border-neutral-800 hover:border-neutral-600 bg-neutral-950 transition-colors cursor-pointer"
              aria-label="Close lightbox"
              title="Close (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Media area with navigation buttons */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden select-none">
          <img
            src={item.afterImage}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />

          {/* Previous Button */}
          {hasPrevious && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-950/80 hover:bg-neutral-900 text-white border border-neutral-700/80 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Previous image"
              title="Previous (Arrow Left)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Next Button */}
          {hasNext && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-neutral-950/80 hover:bg-neutral-900 text-white border border-neutral-700/80 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Next image"
              title="Next (Arrow Right)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}

          {/* Floating Category tag */}
          <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-neutral-950/85 backdrop-blur border border-neutral-800 px-2.5 py-1 rounded text-[11px] font-medium text-neutral-300 flex items-center gap-1.5 pointer-events-none">
            <Sparkles className="w-3 h-3 text-neutral-400" />
            <span>High-Clarity Automotive Transformation</span>
          </div>
        </div>

        {/* Footer info & action bar */}
        <div className="p-4 sm:p-5 bg-neutral-900/80 border-t border-neutral-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
              {item.description}
            </p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-neutral-400">
              <span>{item.afterLabel || 'Completed Detailing Finish'}</span>
              <span>•</span>
              <span>Mobile Detailing Across Yorkshire</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {hasPrevious && (
              <button
                onClick={handlePrev}
                className="px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold rounded border border-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
            )}
            {hasNext && (
              <button
                onClick={handleNext}
                className="px-3 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-neutral-300 text-xs font-semibold rounded border border-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
