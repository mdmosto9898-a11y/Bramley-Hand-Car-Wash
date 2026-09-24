import React, { useState, useEffect } from 'react';
import { BookingFormData } from '../types';
import { BUSINESS_INFO, SERVICES_LIST } from '../data/businessData';
import {
  Calendar,
  CheckCircle2,
  Phone,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  RotateCcw,
  Clock,
  Car,
  Check,
  Send,
  MapPin
} from 'lucide-react';
import { getStoredData, setStoredData } from '../data/dbStore';
import { Booking } from '../types/database';
import { bookingService } from '../services/bookingService';

interface BookingSectionProps {
  preselectedService?: string;
  onResetPreselectedService?: () => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  preselectedService,
  onResetPreselectedService
}) => {
  // Current active step (1 to 7)
  const [currentStep, setCurrentStep] = useState<number>(1);

  const initialForm: BookingFormData = {
    serviceRequired: 'Full Valet Package',
    vehicleType: 'Hatchback / Saloon',
    vehicleMakeModel: '',
    preferredDate: '',
    preferredTime: 'Morning (08:30 – 12:00)',
    fullName: '',
    phone: '',
    email: '',
    locationPostcode: '601 Stanningley Rd, Leeds',
    additionalInfo: ''
  };

  const [formData, setFormData] = useState<BookingFormData>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingTicketId, setBookingTicketId] = useState<string>('');

  useEffect(() => {
    if (preselectedService) {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: preselectedService
      }));
    }
  }, [preselectedService]);

  const vehicleTypes = [
    'Hatchback / Saloon',
    'Estate / Touring',
    'Compact SUV / Crossover',
    'Large SUV / 4x4',
    'Sports Car / Supercar',
    'Commercial Van / Large'
  ];

  const timeSlots = [
    'Morning (08:30 – 12:00)',
    'Midday (12:00 – 15:00)',
    'Afternoon (15:00 – 18:00)',
    'Flexible / Drive-in'
  ];

  // Validation per step
  const validateStep = (stepNumber: number): boolean => {
    const errs: Partial<Record<string, string>> = {};

    if (stepNumber === 1 && !formData.serviceRequired) {
      errs.serviceRequired = 'Please select a service';
    }

    if (stepNumber === 2) {
      if (!formData.vehicleType) {
        errs.vehicleType = 'Please select vehicle size/type';
      }
      if (!formData.vehicleMakeModel.trim()) {
        errs.vehicleMakeModel = 'Please enter vehicle make & model (e.g. BMW 3 Series, Ford Fiesta)';
      }
    }

    if (stepNumber === 3 && !formData.preferredDate) {
      errs.preferredDate = 'Please select your preferred date';
    }

    if (stepNumber === 4 && !formData.preferredTime) {
      errs.preferredTime = 'Please select a preferred time slot';
    }

    if (stepNumber === 5) {
      if (!formData.fullName.trim()) {
        errs.fullName = 'Please enter your full name';
      }
      if (!formData.phone.trim() || formData.phone.trim().length < 9) {
        errs.phone = 'Please enter a valid UK phone number';
      }
      if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        errs.email = 'Please enter a valid email address';
      }
    }

    if (stepNumber === 6) {
      if (!formData.locationPostcode.trim()) {
        errs.locationPostcode = 'Please enter address or postcode (e.g. LS13 4EL or visit on site)';
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 7));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4) || !validateStep(5) || !validateStep(6)) {
      return;
    }

    const ticketId = 'BHCW-' + Math.floor(100000 + Math.random() * 900000);
    setBookingTicketId(ticketId);

    // Save to local database store for Admin Panel visibility
    const newBooking: Booking = {
      id: ticketId,
      createdAt: new Date().toISOString(),
      status: 'pending',
      serviceName: formData.serviceRequired,
      vehicleMakeModel: formData.vehicleMakeModel,
      vehicleType: formData.vehicleType,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      postcode: formData.locationPostcode,
      additionalInfo: formData.additionalInfo,
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.email
    };

    const existing = getStoredData<Booking[]>('bramley_bookings_v2', []);
    setStoredData('bramley_bookings_v2', [newBooking, ...existing]);

    // Also persist to Cloud Firestore
    bookingService.create({
      status: 'pending',
      customerName: formData.fullName,
      customerPhone: formData.phone,
      customerEmail: formData.email,
      vehicleMakeModel: formData.vehicleMakeModel,
      vehicleType: formData.vehicleType,
      serviceName: formData.serviceRequired,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      locationPostcode: formData.locationPostcode,
      additionalNotes: formData.additionalInfo,
      estimatedPrice: 'Pending inspection'
    }).catch((err) => {
      console.warn('Booking Firestore submission background notification:', err);
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData(initialForm);
    setErrors({});
    setIsSubmitted(false);
    setCurrentStep(1);
    setBookingTicketId('');
    if (onResetPreselectedService) {
      onResetPreselectedService();
    }
  };

  // Generate WhatsApp message link
  const generateWhatsAppHref = () => {
    const text = encodeURIComponent(
      `Hi Bramley Hand Car Wash, I would like to enquire / book:\n` +
      `• Service: ${formData.serviceRequired}\n` +
      `• Vehicle: ${formData.vehicleMakeModel} (${formData.vehicleType})\n` +
      `• Date: ${formData.preferredDate}\n` +
      `• Time: ${formData.preferredTime}\n` +
      `• Location: ${formData.locationPostcode}\n` +
      `• Name: ${formData.fullName}\n` +
      `• Phone: ${formData.phone}\n` +
      (formData.additionalInfo ? `• Notes: ${formData.additionalInfo}\n` : '') +
      `[Ref: ${bookingTicketId || 'New Enquiry'}]`
    );
    return `https://wa.me/447838676170?text=${text}`;
  };

  const stepsList = [
    { num: 1, label: 'Service' },
    { num: 2, label: 'Vehicle' },
    { num: 3, label: 'Date' },
    { num: 4, label: 'Time' },
    { num: 5, label: 'Details' },
    { num: 6, label: 'Location' },
    { num: 7, label: 'Review' },
  ];

  return (
    <section id="booking" className="py-20 bg-neutral-950 border-b border-neutral-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-3">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Online Booking & Valeting Enquiries</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-display text-balance">
            Book or Enquire
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-2 max-w-xl mx-auto">
            Quality hand car washing & valeting at 601 Stanningley Rd, Bramley, Leeds (LS13 4EL). Drive in 7 days a week or book ahead.
          </p>

          {/* Quick Direct Call & Directions row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-white hover:border-neutral-700 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-neutral-300" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
            <a
              href={BUSINESS_INFO.googleDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-semibold text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>Directions (601 Stanningley Rd)</span>
            </a>
          </div>
        </div>

        {/* 7-Step Stepper Progress Bar */}
        {!isSubmitted && (
          <div className="mb-10">
            <div className="hidden sm:flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-800 -translate-y-1/2 z-0" />
              {stepsList.map((s) => {
                const isActive = s.num === currentStep;
                const isPassed = s.num < currentStep;
                return (
                  <div key={s.num} className="relative z-10 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (s.num < currentStep) setCurrentStep(s.num);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive
                          ? 'bg-white text-neutral-950 ring-4 ring-white/20'
                          : isPassed
                          ? 'bg-neutral-800 text-white cursor-pointer hover:bg-neutral-700'
                          : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4 text-emerald-400" /> : s.num}
                    </button>
                    <span
                      className={`text-[10px] uppercase tracking-wider font-semibold mt-1.5 ${
                        isActive ? 'text-white' : isPassed ? 'text-neutral-400' : 'text-neutral-600'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Mobile simplified progress indicator */}
            <div className="sm:hidden flex items-center justify-between bg-neutral-900/80 px-4 py-3 rounded-lg border border-neutral-800">
              <span className="text-xs text-neutral-400">
                Step <strong className="text-white">{currentStep}</strong> of 7:
              </span>
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                {stepsList[currentStep - 1].label}
              </span>
            </div>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-neutral-900/90 border border-neutral-800 rounded-xl p-6 sm:p-10 shadow-xl">
          {isSubmitted ? (
            /* Submission Confirmation Ticket */
            <div className="text-center py-6 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-950/80 border border-emerald-600/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              
              <h3 className="text-2xl font-bold text-white font-display mb-2">
                Booking Request Generated
              </h3>
              
              <div className="inline-block px-3 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-300 mb-4">
                Reference: <strong className="text-white">{bookingTicketId}</strong>
              </div>

              <p className="text-sm text-neutral-300 max-w-lg mx-auto mb-6 leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Your enquiry has been registered. You can dispatch this directly to Bramley Hand Car Wash via WhatsApp or call us now:
              </p>

              {/* Request Summary Receipt */}
              <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-5 max-w-md mx-auto text-left text-xs space-y-2 mb-8">
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-400">Service:</span>
                  <span className="text-white font-semibold">{formData.serviceRequired}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-400">Vehicle:</span>
                  <span className="text-white font-semibold">{formData.vehicleMakeModel} ({formData.vehicleType})</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-400">Preferred Date:</span>
                  <span className="text-white font-semibold">{formData.preferredDate}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-400">Time Window:</span>
                  <span className="text-white font-semibold">{formData.preferredTime}</span>
                </div>
                <div className="flex justify-between border-b border-neutral-900 pb-2">
                  <span className="text-neutral-400">Location / Postcode:</span>
                  <span className="text-white font-semibold">{formData.locationPostcode}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-neutral-400">Customer Phone:</span>
                  <span className="text-white font-semibold">{formData.phone}</span>
                </div>
              </div>

              {/* Instant Dispatch CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 max-w-md mx-auto">
                <a
                  href={generateWhatsAppHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send via WhatsApp</span>
                </a>

                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="w-full sm:w-auto flex-1 py-3 px-5 bg-white hover:bg-neutral-200 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="text-xs text-neutral-400 hover:text-white underline underline-offset-4 flex items-center justify-center gap-1 mx-auto cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Submit another booking request</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitRequest}>
              {/* STEP 1: Select Service */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-1">
                      Step 1: Select Service
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Choose from our hand car wash and valeting services at 601 Stanningley Rd.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                    {SERVICES_LIST.map((srv) => {
                      const isSelected = formData.serviceRequired === srv.name;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setFormData({ ...formData, serviceRequired: srv.name })}
                          className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-neutral-800 border-white text-white ring-1 ring-white/50'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span className="text-xs font-bold text-white">{srv.name}</span>
                            <span className="text-[10px] font-semibold text-neutral-400 shrink-0 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                              {srv.priceDisplay}
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2">
                            {srv.shortDesc}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  {errors.serviceRequired && (
                    <p className="text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.serviceRequired}</span>
                    </p>
                  )}
                </div>
              )}

              {/* STEP 2: Vehicle Size / Type */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-1">
                      Step 2: Vehicle Size & Model
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Prices and cleaning duration depend on vehicle dimensions and starting condition.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-semibold text-neutral-300 block">
                      Select Vehicle Category:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {vehicleTypes.map((vType) => {
                        const isSelected = formData.vehicleType === vType;
                        return (
                          <button
                            type="button"
                            key={vType}
                            onClick={() => setFormData({ ...formData, vehicleType: vType })}
                            className={`p-3 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-neutral-800 border-white text-white'
                                : 'bg-neutral-950 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                            }`}
                          >
                            <Car className="w-4 h-4 mb-1 text-neutral-400" />
                            <span>{vType}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.vehicleType && (
                      <p className="text-xs text-red-400 mt-1">{errors.vehicleType}</p>
                    )}
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-neutral-300 block mb-1">
                      Vehicle Make & Model:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ford Fiesta, Volkswagen Golf, BMW 3 Series"
                      value={formData.vehicleMakeModel}
                      onChange={(e) => setFormData({ ...formData, vehicleMakeModel: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-700 focus:border-white text-white px-4 py-2.5 rounded-lg text-xs focus:outline-none"
                    />
                    {errors.vehicleMakeModel && (
                      <p className="text-xs text-red-400 mt-1">{errors.vehicleMakeModel}</p>
                    )}
                  </div>
                </div>
              )}

              {/* STEP 3: Preferred Date */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-1">
                      Step 3: Choose Preferred Date
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Bramley Hand Car Wash is open 7 days a week (Monday–Sunday 8:30 AM–6:00 PM).
                    </p>
                  </div>

                  <div>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full sm:w-80 bg-neutral-950 border border-neutral-700 focus:border-white text-white px-4 py-3 rounded-lg text-xs focus:outline-none"
                    />
                    {errors.preferredDate && (
                      <p className="text-xs text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    )}
                  </div>

                  <div className="p-3.5 bg-neutral-950/60 rounded-lg border border-neutral-800 text-xs text-neutral-400 flex items-start gap-2">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>
                      Drive-ins are welcome every day. For full valeting or paint polishing, booking ahead ensures dedicated bay time.
                    </span>
                  </div>
                </div>
              )}

              {/* STEP 4: Preferred Time */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-1">
                      Step 4: Select Preferred Time Window
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Opening hours: Monday – Sunday, 8:30 AM – 6:00 PM.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {timeSlots.map((slot) => {
                      const isSelected = formData.preferredTime === slot;
                      return (
                        <label
                          key={slot}
                          className={`flex items-center gap-3 p-3.5 rounded-lg border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-neutral-800 border-white text-white'
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                          }`}
                        >
                          <input
                            type="radio"
                            name="preferredTime"
                            checked={isSelected}
                            onChange={() => setFormData({ ...formData, preferredTime: slot })}
                            className="text-white focus:ring-0"
                          />
                          <span className="text-xs font-semibold">{slot}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 5: Customer Details */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-1">
                      Step 5: Enter Contact Details
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Required so Bramley Hand Car Wash can confirm your slot and contact you.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Full Name:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. David Smith"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-white text-white px-4 py-2.5 rounded-lg text-xs focus:outline-none"
                      />
                      {errors.fullName && (
                        <p className="text-xs text-red-400 mt-1">{errors.fullName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1">
                          Phone Number (UK Mobile):
                        </label>
                        <input
                          type="tel"
                          placeholder="e.g. 07700 900123"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 focus:border-white text-white px-4 py-2.5 rounded-lg text-xs focus:outline-none"
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-400 mt-1">{errors.phone}</p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-semibold text-neutral-300 block mb-1">
                          Email Address:
                        </label>
                        <input
                          type="email"
                          placeholder="e.g. david.smith@example.co.uk"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 focus:border-white text-white px-4 py-2.5 rounded-lg text-xs focus:outline-none"
                        />
                        {errors.email && (
                          <p className="text-xs text-red-400 mt-1">{errors.email}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Postcode / Location */}
              {currentStep === 6 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-1">
                      Step 6: Location & Notes
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Our facility is at 601 Stanningley Rd, Bramley, Leeds LS13 4EL.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Your Leeds Postcode / Area:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. LS13 4EL or visiting Stanningley Rd directly"
                        value={formData.locationPostcode}
                        onChange={(e) => setFormData({ ...formData, locationPostcode: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-white text-white px-4 py-2.5 rounded-lg text-xs focus:outline-none"
                      />
                      {errors.locationPostcode && (
                        <p className="text-xs text-red-400 mt-1">{errors.locationPostcode}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-neutral-300 block mb-1">
                        Additional Vehicle / Valet Notes (Optional):
                      </label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Child seats fitted, dog hair removal required, heavy road salt..."
                        value={formData.additionalInfo}
                        onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 focus:border-white text-white px-4 py-2.5 rounded-lg text-xs focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 7: Confirm Booking Request */}
              {currentStep === 7 && (
                <div className="space-y-5 animate-in fade-in duration-150">
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-1">
                      Step 7: Confirm Your Request
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Please review your details before submitting to Bramley Hand Car Wash.
                    </p>
                  </div>

                  <div className="bg-neutral-950 rounded-lg border border-neutral-800 p-5 space-y-3 text-xs">
                    <div className="flex justify-between border-b border-neutral-900 pb-2">
                      <span className="text-neutral-400">Service:</span>
                      <span className="text-white font-bold">{formData.serviceRequired}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-900 pb-2">
                      <span className="text-neutral-400">Vehicle:</span>
                      <span className="text-white font-medium">{formData.vehicleMakeModel} ({formData.vehicleType})</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-900 pb-2">
                      <span className="text-neutral-400">Date & Time:</span>
                      <span className="text-white font-medium">{formData.preferredDate} · {formData.preferredTime}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-900 pb-2">
                      <span className="text-neutral-400">Customer:</span>
                      <span className="text-white font-medium">{formData.fullName} ({formData.phone})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-400">Area / Location:</span>
                      <span className="text-white font-medium">{formData.locationPostcode}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-neutral-950/70 border border-neutral-800 rounded-lg text-xs text-neutral-300 leading-relaxed">
                    <strong className="text-white">Note: </strong>
                    All pricing displays are demo starting rates in USD ($) subject to vehicle size and condition. No payment is required online; pay on completion at 601 Stanningley Rd.
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-8 pt-6 border-t border-neutral-800 flex items-center justify-between gap-3">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-5 py-2.5 rounded-lg border border-neutral-700 bg-neutral-900 text-xs font-semibold text-neutral-300 hover:text-white transition-colors cursor-pointer"
                  >
                    Back
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 7 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2.5 rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>Continue to Step {currentStep + 1}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-2 cursor-pointer shadow-xl"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Confirm Booking Request</span>
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
