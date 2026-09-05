import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  Sparkles, 
  MapPin, 
  Users, 
  Coffee, 
  Heart, 
  Briefcase, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Send,
  Video
} from 'lucide-react';

interface SuiteOption {
  id: string;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  amenities: string[];
}

const SUITE_OPTIONS: SuiteOption[] = [
  {
    id: 'celebration',
    name: 'The Celebration Suite',
    tagline: 'Milestone Closing & Photo Experience',
    icon: '🎉',
    description: 'Perfect for first-time homebuyers and sellers ready to celebrate their next chapter.',
    amenities: [
      'Personalized digital welcome screen greeting signers by name',
      'Signature Wise Title celebration toast (sparkling cider / champagne)',
      'Branded photo backdrop with "Just Closed" props & instant digital photo delivery',
      'Closing gift box & local Decatur/Bridgeport artisan treats',
    ],
  },
  {
    id: 'executive',
    name: 'The Executive Suite',
    tagline: 'High-Speed Commercial & Investor Lounge',
    icon: '💼',
    description: 'Engineered for commercial syndications, multi-parcel land deals, and busy professionals.',
    amenities: [
      'High-speed dedicated Wi-Fi & private conferencing audio/video',
      'Spacious conference boardroom seating up to 12 participants',
      'Gourmet espresso bar, sparkling water & executive refreshment bar',
      'Private notary signing stations for multi-party execution',
    ],
  },
  {
    id: 'family_pet',
    name: 'The Family & Pet-Friendly Suite',
    tagline: 'Relaxed & Accommodating Signing Space',
    icon: '🐾',
    description: 'Designed so parents and pet owners can sign without stress or rushing.',
    amenities: [
      'Comfortable lounge seating with children’s coloring books & activity packs',
      'Pet-friendly accommodation with water bowls & artisan dog treats',
      'Soundproofed relaxing atmosphere with gentle ambient music',
      'Flexible pacing allowing breaks whenever needed',
    ],
  },
  {
    id: 'ron_digital',
    name: 'Remote Online Notarization (RON)',
    tagline: '100% Digital Worldwide Closing',
    icon: '💻',
    description: 'Close securely from your home, office, or out of state on your computer or tablet.',
    amenities: [
      'Compliant two-way audio/video secure signing room',
      'Credential analysis & biometric identity verification',
      'Instant digital document delivery upon funding approval',
      'Zero travel required — close from anywhere worldwide',
    ],
  },
];

import { forwardToWebhook } from '../../../lib/webhook';

export default function ClosingSuiteSelector() {
  const [selectedOffice, setSelectedOffice] = useState<'decatur' | 'bridgeport'>('decatur');
  const [selectedSuiteId, setSelectedSuiteId] = useState<string>('celebration');
  const [beverageSelection, setBeverageSelection] = useState<string>('espresso');
  const [fileNumber, setFileNumber] = useState<string>('');
  const [buyerSellerName, setBuyerSellerName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [isReserved, setIsReserved] = useState<boolean>(false);

  const selectedSuite = SUITE_OPTIONS.find((s) => s.id === selectedSuiteId) || SUITE_OPTIONS[0];

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsReserved(true);

    if (selectedSuiteId === 'celebration') {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0B2545', '#C59B27', '#E2B842', '#133C55'],
      });
    }

    await forwardToWebhook({
      eventType: 'closing_suite_reservation',
      timestamp: new Date().toISOString(),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      data: {
        office: selectedOffice,
        suiteId: selectedSuiteId,
        suiteName: selectedSuite.name,
        beverageSelection,
        fileNumber,
        buyerSellerName,
        contactPhone,
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      
      {/* Top Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 border-b border-gold-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Closing Day Hospitality Experience
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Closing Suite & Hospitality Concierge
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              At Wise County Title Company, closing day is a celebrated milestone. Personalize your signing room ambiance, refreshments, and technology.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Suite Configuration */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
          
          {/* Office Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. Choose Preferred Closing Location
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedOffice('decatur')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedOffice === 'decatur'
                    ? 'bg-navy-900 text-white border-navy-900 shadow-md ring-2 ring-gold-500/50'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm">Decatur Headquarters</div>
                <div className={`text-[11px] ${selectedOffice === 'decatur' ? 'text-gold-300' : 'text-slate-500'}`}>
                  405 Park West Court
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedOffice('bridgeport')}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  selectedOffice === 'bridgeport'
                    ? 'bg-navy-900 text-white border-navy-900 shadow-md ring-2 ring-gold-500/50'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="font-bold text-xs sm:text-sm">Bridgeport Branch</div>
                <div className={`text-[11px] ${selectedOffice === 'bridgeport' ? 'text-gold-300' : 'text-slate-500'}`}>
                  1602 Halsell Street
                </div>
              </button>
            </div>
          </div>

          {/* Suite Type Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              2. Select Your Closing Suite Atmosphere
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {SUITE_OPTIONS.map((suite) => (
                <button
                  key={suite.id}
                  type="button"
                  onClick={() => setSelectedSuiteId(suite.id)}
                  className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                    selectedSuiteId === suite.id
                      ? 'bg-navy-900 text-white border-navy-900 shadow-md ring-2 ring-gold-500/50'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xl">{suite.icon}</span>
                    <span className="font-bold text-xs sm:text-sm">{suite.name}</span>
                  </div>
                  <div className={`text-[11px] leading-snug ${selectedSuiteId === suite.id ? 'text-slate-300' : 'text-slate-500'}`}>
                    {suite.tagline}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Refreshment Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              3. Complimentary Hospitality & Refreshments
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="beverage"
                  checked={beverageSelection === 'espresso'}
                  onChange={() => setBeverageSelection('espresso')}
                  className="text-navy-900 focus:ring-gold-500"
                />
                <span className="font-semibold text-slate-800">Espresso & Coffee Bar</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="beverage"
                  checked={beverageSelection === 'tea'}
                  onChange={() => setBeverageSelection('tea')}
                  className="text-navy-900 focus:ring-gold-500"
                />
                <span className="font-semibold text-slate-800">Texas Sweet Tea & Water</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="radio"
                  name="beverage"
                  checked={beverageSelection === 'sparkling'}
                  onChange={() => setBeverageSelection('sparkling')}
                  className="text-navy-900 focus:ring-gold-500"
                />
                <span className="font-semibold text-slate-800">Sparkling Celebration Cider</span>
              </label>
            </div>
          </div>

        </div>

        {/* Right: Suite Amenities & Reservation Form */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            <div className="pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedSuite.icon}</span>
                <div>
                  <span className="font-serif font-bold text-navy-900 text-lg">{selectedSuite.name}</span>
                  <p className="text-xs text-slate-500">{selectedSuite.tagline}</p>
                </div>
              </div>
            </div>

            {/* Amenities List */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-2 text-xs">
              <div className="font-bold text-navy-950 uppercase tracking-wider text-[11px]">
                Included Suite Amenities:
              </div>
              <ul className="space-y-1.5 text-slate-700">
                {selectedSuite.amenities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Booking form */}
            {!isReserved ? (
              <form onSubmit={handleReserve} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="font-bold text-navy-900 text-xs uppercase tracking-wider">
                  Reserve for Your Closing:
                </div>
                
                <input
                  type="text"
                  required
                  placeholder="Buyer / Seller / Agent Name"
                  value={buyerSellerName}
                  onChange={(e) => setBuyerSellerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                  />
                  <input
                    type="text"
                    placeholder="GF # (if known)"
                    value={fileNumber}
                    onChange={(e) => setFileNumber(e.target.value)}
                    className="p-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold text-xs flex items-center justify-center gap-1.5 py-3"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Confirm Closing Experience</span>
                </button>
              </form>
            ) : (
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-2 animate-in fade-in">
                <div className="font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Closing Suite Confirmed!</span>
                </div>
                <p>
                  We have prepared <strong>{selectedSuite.name}</strong> at our <strong>{selectedOffice === 'decatur' ? 'Decatur' : 'Bridgeport'}</strong> office for <strong>{buyerSellerName || 'your party'}</strong>. Our escrow team will have your personalized welcome board and refreshments ready!
                </p>
              </div>
            )}

          </div>

          <div className="p-3 bg-navy-900 text-white rounded-xl text-[11px] flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-gold-400 shrink-0" />
            <span>Need mobile notary or signing at your office? We travel across Wise & North Texas.</span>
          </div>

        </div>

      </div>

    </div>
  );
}
