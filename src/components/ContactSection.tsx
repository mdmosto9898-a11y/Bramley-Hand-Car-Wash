import React, { useState } from 'react';
import { Phone, MapPin, Navigation, Clock, Send, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '../data/businessData';
import { getStoredData, setStoredData } from '../data/dbStore';
import { ContactMessage } from '../types/database';
import { TikTokIcon } from './TikTokIcon';
import { messageService } from '../services/messageService';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenBooking }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now(),
      createdAt: new Date().toISOString(),
      fullName: formData.name,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      status: 'new'
    };

    const existing = getStoredData<ContactMessage[]>('bramley_messages_v2', []);
    setStoredData('bramley_messages_v2', [newMessage, ...existing]);

    // Dispatch to Firestore messages collection
    messageService.create({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      message: formData.message,
      subject: 'Website Contact Form Enquiry',
      status: 'new'
    }).catch((err) => {
      console.warn('Message Firestore dispatch notice:', err);
    });

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-neutral-900/60 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left information column (7 cols) */}
          <div className="lg:col-span-7">
            <div className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>Direct Communication & Location</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display text-balance mb-4">
              Contact Bramley Hand Car Wash
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8 max-w-xl">
              Located at 601 Stanningley Rd, Bramley, Leeds. Drive in 7 days a week, call us directly, or send an enquiry below.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              
              {/* Phone card */}
              <div className="p-5 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded bg-neutral-900 flex items-center justify-center text-white">
                      <Phone className="w-4 h-4 text-neutral-300" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Direct Phone</span>
                      <a
                        href={BUSINESS_INFO.phoneHref}
                        className="text-base font-bold text-white tabular-nums hover:underline font-mono"
                      >
                        {BUSINESS_INFO.phoneDisplay}
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    Call directly for today&apos;s queue times, valeting queries, and bookings.
                  </p>
                </div>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="mt-4 block text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-white text-neutral-950 rounded hover:bg-neutral-200 transition-colors"
                >
                  Call {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>

              {/* Location & Directions card */}
              <div className="p-5 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded bg-neutral-900 flex items-center justify-center text-white">
                      <MapPin className="w-4 h-4 text-neutral-300" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Location</span>
                      <span className="text-sm font-bold text-white">Bramley, Leeds</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-300 mt-2 leading-relaxed">
                    601 Stanningley Rd, Bramley, Leeds LS13 4EL, UK
                  </p>
                </div>
                <a
                  href={BUSINESS_INFO.googleDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-neutral-900 text-white border border-neutral-750 rounded hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5"
                >
                  <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Get Directions</span>
                </a>
              </div>

              {/* Hours card */}
              <div className="p-5 rounded-lg bg-neutral-950 border border-neutral-800">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded bg-neutral-900 flex items-center justify-center text-white">
                    <Clock className="w-4 h-4 text-neutral-300" />
                  </div>
                  <div>
                    <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Opening Hours</span>
                    <span className="text-sm font-bold text-white">Monday – Sunday</span>
                  </div>
                </div>
                <p className="text-xs text-neutral-300 mt-2 font-mono">
                  8:30 AM – 6:00 PM (Daily)
                </p>
                <span className="mt-1 block text-[11px] text-amber-400">
                  Open 7 Days a week
                </span>
              </div>

              {/* Real TikTok card */}
              <div className="p-5 rounded-lg bg-neutral-950 border border-neutral-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 rounded bg-neutral-900 flex items-center justify-center text-pink-400">
                      <TikTokIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] text-neutral-400 uppercase tracking-wider block">Official TikTok</span>
                      <span className="text-sm font-bold text-white font-mono">@bramley_handcarwash0</span>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    Watch our car wash transformation videos, snow foam cleans, and behind the scenes.
                  </p>
                </div>
                <a
                  href={BUSINESS_INFO.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block text-center py-2.5 text-xs font-bold uppercase tracking-wider bg-pink-950/40 text-pink-300 border border-pink-800/60 rounded hover:bg-pink-900/50 transition-colors flex items-center justify-center gap-1.5"
                >
                  <TikTokIcon className="w-3.5 h-3.5" />
                  <span>Open TikTok Profile</span>
                </a>
              </div>

            </div>

            {/* Verified External Channels */}
            <div className="flex flex-wrap items-center gap-3 text-xs">
              <span className="text-neutral-400">Social & Links:</span>
              <a
                href={BUSINESS_INFO.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-pink-400 hover:text-pink-300 underline underline-offset-4"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
                <span>TikTok (@bramley_handcarwash0)</span>
              </a>
              <span className="text-neutral-700">·</span>
              <a
                href={BUSINESS_INFO.googleProfileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white underline underline-offset-4"
              >
                <span>Google Maps Profile</span>
              </a>
            </div>

          </div>

          {/* Right quick contact enquiry form (5 cols) */}
          <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-lg p-6 sm:p-8">
            <h3 className="text-xl font-bold text-white font-display mb-2">
              Send an Enquiry
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Have a question about hand car wash services, full valeting, or machine polishing at 601 Stanningley Rd?
            </p>

            {submitted ? (
              <div className="p-6 bg-neutral-900 rounded-lg border border-neutral-800 text-center animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white mb-1">Message Sent</h4>
                <p className="text-xs text-neutral-400 mb-4">
                  Thank you! Your message has been saved. Bramley Hand Car Wash will respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', email: '', message: '' });
                  }}
                  className="text-xs text-white underline underline-offset-4 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Your Name:
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. David Harrison"
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-white text-white px-3.5 py-2.5 rounded text-xs focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Phone Number:
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="07700 900123"
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-white text-white px-3.5 py-2.5 rounded text-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.co.uk"
                      className="w-full bg-neutral-900 border border-neutral-700 focus:border-white text-white px-3.5 py-2.5 rounded text-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-neutral-300 block mb-1">
                    Vehicle & Service Needed:
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. Full Valet on Ford Focus, checking availability..."
                    className="w-full bg-neutral-900 border border-neutral-700 focus:border-white text-white px-3.5 py-2.5 rounded text-xs focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-[0.98]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
