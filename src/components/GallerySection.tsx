import React, { useState } from 'react';
import { GalleryItem } from '../types';
import { Maximize2, Sparkles, SlidersHorizontal, ImagePlus, Info, Eye } from 'lucide-react';

interface GallerySectionProps {
  items: GalleryItem[];
  onOpenLightbox: (item: GalleryItem) => void;
  onOpenReplaceModal: (item: GalleryItem) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  items,
  onOpenLightbox,
  onOpenReplaceModal
}) => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [sliderPosition, setSliderPosition] = useState<number>(50);

  // Exact categories requested by user
  const tabs = [
    { id: 'all', label: 'ALL' },
    { id: 'car_wash', label: 'CAR WASH' },
    { id: 'interior', label: 'INTERIOR' },
    { id: 'exterior', label: 'EXTERIOR' },
    { id: 'full_valet', label: 'FULL VALET' },
    { id: 'wheels', label: 'WHEELS & TYRES' },
    { id: 'paint', label: 'PAINT' },
    { id: 'headlights', label: 'HEADLIGHTS' }
  ];

  const matchesCategory = (itemCat: string, filterId: string) => {
    if (filterId === 'all') return true;
    if (filterId === 'car_wash') {
      return itemCat === 'car_wash' || itemCat === 'exterior_wash';
    }
    if (filterId === 'paint') {
      return itemCat === 'paint' || itemCat === 'paint_correction' || itemCat === 'paintwork';
    }
    if (filterId === 'wheels') {
      return itemCat === 'wheels' || itemCat === 'wheels_tyres';
    }
    if (filterId === 'full_valet') {
      return itemCat === 'full_valet' || itemCat === 'full_detail';
    }
    return itemCat === filterId;
  };

  const filteredItems = activeTab === 'all'
    ? items
    : items.filter((item) => matchesCategory(item.category, activeTab));

  // Featured Before / After comparison
  const featured = items.find((i) => i.id === 'gal-car-wash' || i.category === 'car_wash') || items[0] || {
    id: 'feat',
    title: 'Snow Foam Hand Wash & Clean Finish',
    category: 'car_wash',
    beforeLabel: 'Road Grime & Traffic Film',
    afterLabel: 'Clean Gloss Hand Wash',
    description: 'Thick snow foam pre-wash followed by gentle two-bucket contact washing and microfibre dry at Bramley Hand Car Wash.',
    beforeImage: '',
    afterImage: ''
  };

  const handleSliderDrag = (clientX: number, rect: DOMRect) => {
    const x = clientX - rect.left;
    const pos = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(pos);
  };

  return (
    <section id="gallery" className="py-20 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Visual Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display text-balance">
              Gallery & Work Showcase
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-md">
            Professional hand washing, deep interior valeting, and vehicle care at 601 Stanningley Rd, Bramley, Leeds.
          </p>
        </div>

        {/* Business Owner Transparency Notice Banner */}
        <div className="mb-10 p-4 rounded-lg bg-neutral-900/60 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-neutral-300">
          <div className="flex items-start sm:items-center gap-2.5">
            <Info className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-white font-medium">Demo Image Notice: </strong>
              To uphold verified business integrity, current photos serve as high-standard representative placeholders. Bramley Hand Car Wash can easily upload or replace any image with their real vehicle portfolio.
            </span>
          </div>
          <span className="shrink-0 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider bg-neutral-950 px-2.5 py-1 rounded border border-neutral-800">
            Easily Replaceable
          </span>
        </div>

        {/* Featured Interactive Comparison Slider */}
        {featured && (
          <div className="mb-14 bg-neutral-900 border border-neutral-800 rounded-xl p-4 sm:p-6 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 px-2 py-0.5 rounded bg-neutral-950 border border-neutral-800 inline-block mb-1">
                  Before / After Comparison
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                  {featured.title}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 hidden sm:flex">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Drag slider to compare</span>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenReplaceModal(featured)}
                  className="px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-[11px] font-semibold text-neutral-200 border border-neutral-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Replace this image with real business photo"
                >
                  <ImagePlus className="w-3.5 h-3.5 text-neutral-300" />
                  <span>Replace Photo</span>
                </button>
              </div>
            </div>

            <div
              className="relative h-64 sm:h-96 md:h-[420px] w-full rounded-lg overflow-hidden select-none touch-none bg-neutral-950 cursor-ew-resize"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                handleSliderDrag(e.clientX, rect);
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                handleSliderDrag(e.touches[0].clientX, rect);
              }}
              onClick={() => onOpenLightbox(featured)}
            >
              {/* After Image */}
              <img
                src={featured.afterImage}
                alt={`${featured.title} completed clean result`}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
              />
              <div className="absolute top-4 right-4 bg-neutral-950/85 backdrop-blur border border-neutral-700 px-3 py-1 rounded text-xs font-semibold text-white pointer-events-none">
                After: {featured.afterLabel || 'Clean Wash'}
              </div>

              {/* Before Image (Clipped overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPosition}%` }}
              >
                <img
                  src={featured.beforeImage || featured.afterImage}
                  alt={`${featured.title} before wash condition`}
                  referrerPolicy="no-referrer"
                  className="absolute inset-y-0 left-0 w-full h-full object-cover object-center max-w-none pointer-events-none filter contrast-90 brightness-75"
                  style={{ width: '100%', minWidth: '100%' }}
                />
                <div className="absolute inset-0 bg-neutral-950/20" />
                <div className="absolute top-4 left-4 bg-neutral-950/85 backdrop-blur border border-neutral-700 px-3 py-1 rounded text-xs font-semibold text-neutral-300 pointer-events-none">
                  Before: {featured.beforeLabel || 'Dirty Condition'}
                </div>
              </div>

              {/* Divider Line & Handle */}
              <div
                className="absolute inset-y-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10 pointer-events-none"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center shadow-lg font-bold text-xs select-none">
                  ↔
                </div>
              </div>

              {/* Click to open lightbox badge */}
              <div className="absolute bottom-4 right-4 bg-neutral-950/80 backdrop-blur px-2.5 py-1 rounded border border-neutral-800 text-[11px] text-neutral-300 flex items-center gap-1.5 pointer-events-none">
                <Maximize2 className="w-3 h-3" />
                <span>Click for Fullscreen Lightbox</span>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-8 border-b border-neutral-900 scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-850'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group bg-neutral-900 border border-neutral-800/90 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-200 flex flex-col justify-between"
            >
              {/* Media container */}
              <div
                onClick={() => onOpenLightbox(item)}
                className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-950 cursor-pointer"
              >
                <img
                  src={item.afterImage}
                  alt={`${item.title} - Bramley Hand Car Wash Leeds`}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Category tag */}
                <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider text-neutral-200 bg-neutral-950/85 backdrop-blur px-2.5 py-1 rounded border border-neutral-800">
                  {item.category.replace('_', ' ')}
                </span>

                {/* Expand overlay icon */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-neutral-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Information & Action bar */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white mb-2 font-display group-hover:text-neutral-200 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => onOpenLightbox(item)}
                    className="text-xs font-semibold text-neutral-300 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer py-1"
                  >
                    <Eye className="w-3.5 h-3.5 text-neutral-400" />
                    <span>View Image</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenReplaceModal(item)}
                    className="px-2.5 py-1 text-[11px] font-semibold text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 rounded transition-colors flex items-center gap-1 cursor-pointer"
                    title="Replace with real customer vehicle photo"
                  >
                    <ImagePlus className="w-3 h-3" />
                    <span>Replace</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if category has no items */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16 bg-neutral-900/40 rounded-xl border border-neutral-800 p-8">
            <p className="text-sm text-neutral-400 mb-2">No photos in this category yet.</p>
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className="text-xs text-white underline cursor-pointer"
            >
              View All Categories
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
