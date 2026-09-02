import React, { useState } from 'react';
import { Building, CheckCircle2, ExternalLink, FileText, Printer, Sparkles, AlertCircle, MapPin, Calendar } from 'lucide-react';

interface CountyCadInfo {
  name: string;
  cadName: string;
  portalUrl: string;
  address: string;
  phone: string;
  deadline: string;
  onlineFilingAvailable: boolean;
}

const COUNTY_CAD_DIRECTORY: Record<string, CountyCadInfo> = {
  Wise: {
    name: 'Wise County',
    cadName: 'Wise County Appraisal District (Wise CAD)',
    portalUrl: 'https://www.wisecad.org/',
    address: '400 E Business US 380, Decatur, TX 76234',
    phone: '(940) 627-3081',
    deadline: 'April 30th (or up to 2 years late for retroactive refunds)',
    onlineFilingAvailable: true,
  },
  Denton: {
    name: 'Denton County',
    cadName: 'Denton Central Appraisal District (Denton CAD)',
    portalUrl: 'https://www.dentoncad.com/',
    address: '3911 Morse St, Denton, TX 76208',
    phone: '(940) 349-3800',
    deadline: 'April 30th',
    onlineFilingAvailable: true,
  },
  Tarrant: {
    name: 'Tarrant County',
    cadName: 'Tarrant Appraisal District (TAD)',
    portalUrl: 'https://www.tad.org/',
    address: '2500 Handley Ederville Rd, Fort Worth, TX 76118',
    phone: '(817) 284-0024',
    deadline: 'April 30th',
    onlineFilingAvailable: true,
  },
  Parker: {
    name: 'Parker County',
    cadName: 'Parker County Appraisal District (Parker CAD)',
    portalUrl: 'https://www.parkercad.org/',
    address: '1108 E Bankhead Dr, Weatherford, TX 76086',
    phone: '(817) 596-0077',
    deadline: 'April 30th',
    onlineFilingAvailable: true,
  },
  Collin: {
    name: 'Collin County',
    cadName: 'Collin Central Appraisal District (Collin CAD)',
    portalUrl: 'https://www.collincad.org/',
    address: '250 Eldorado Pkwy, McKinney, TX 75069',
    phone: '(469) 742-9200',
    deadline: 'April 30th',
    onlineFilingAvailable: true,
  },
  Dallas: {
    name: 'Dallas County',
    cadName: 'Dallas Central Appraisal District (DCAD)',
    portalUrl: 'https://www.dallascad.org/',
    address: '2949 N Stemmons Fwy, Dallas, TX 75247',
    phone: '(214) 631-0910',
    deadline: 'April 30th',
    onlineFilingAvailable: true,
  },
};

export default function HomesteadWizard() {
  const [selectedCounty, setSelectedCounty] = useState<string>('Wise');
  const [ownerName, setOwnerName] = useState<string>('David & Emily Walker');
  const [propertyAddress, setPropertyAddress] = useState<string>('804 S Trinity St, Decatur, TX 76234');
  const [occupancyDate, setOccupancyDate] = useState<string>('2026-03-01');
  const [cadAccountNum, setCadAccountNum] = useState<string>('');
  
  // Exemption sub-types
  const [isGeneralResidence, setIsGeneralResidence] = useState<boolean>(true);
  const [isOver65, setIsOver65] = useState<boolean>(false);
  const [isDisabledPerson, setIsDisabledPerson] = useState<boolean>(false);
  const [isDisabledVeteran, setIsDisabledVeteran] = useState<boolean>(false);
  const [isSurvivingSpouse, setIsSurvivingSpouse] = useState<boolean>(false);

  const cadInfo = COUNTY_CAD_DIRECTORY[selectedCounty] || COUNTY_CAD_DIRECTORY['Wise'];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      
      {/* Top Wizard Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 border-b border-gold-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Texas Comptroller Form 50-114 Assistant
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Texas Homestead Exemption Assistant
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Reduce your annual school and county property taxes. Pre-fill your Texas Homestead Exemption with exact CAD filing instructions.
            </p>
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-slate-200 border border-slate-700 shadow-sm transition-colors self-start sm:self-auto"
          >
            <Printer className="w-4 h-4 text-gold-400" />
            Print Filing Packet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Form Questionnaire */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
          
          <div className="space-y-4">
            <div>
              <label htmlFor="hw-county" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Select Your Texas Property County
              </label>
              <select
                id="hw-county"
                value={selectedCounty}
                onChange={(e) => setSelectedCounty(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500"
              >
                <option value="Wise">Wise County (Wise CAD)</option>
                <option value="Denton">Denton County (Denton CAD)</option>
                <option value="Tarrant">Tarrant County (TAD)</option>
                <option value="Parker">Parker County (Parker CAD)</option>
                <option value="Collin">Collin County (Collin CAD)</option>
                <option value="Dallas">Dallas County (DCAD)</option>
              </select>
            </div>

            <div>
              <label htmlFor="hw-owner" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Property Owner Name(s) (Matching Driver's License)
              </label>
              <input
                id="hw-owner"
                type="text"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500 text-sm"
                placeholder="e.g. David Walker & Emily Walker"
              />
            </div>

            <div>
              <label htmlFor="hw-address" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Homestead Physical Address
              </label>
              <input
                id="hw-address"
                type="text"
                value={propertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500 text-sm"
                placeholder="e.g. 804 S Trinity St, Decatur, TX 76234"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="hw-date" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Date of Primary Occupancy / Closing
                </label>
                <input
                  id="hw-date"
                  type="date"
                  value={occupancyDate}
                  onChange={(e) => setOccupancyDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500 text-sm"
                />
              </div>

              <div>
                <label htmlFor="hw-cad-id" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  CAD Account / Parcel ID (Optional)
                </label>
                <input
                  id="hw-cad-id"
                  type="text"
                  value={cadAccountNum}
                  onChange={(e) => setCadAccountNum(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500 text-sm"
                  placeholder="e.g. R000012345"
                />
              </div>
            </div>

            {/* Exemption Sub-types */}
            <div className="pt-3 border-t border-slate-200 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Applicable Texas Exemption Categories (Check All That Apply):
              </div>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={isGeneralResidence}
                  onChange={(e) => setIsGeneralResidence(e.target.checked)}
                  className="rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">General Residence Homestead Exemption ($100k+ School Tax Exemption)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={isOver65}
                  onChange={(e) => setIsOver65(e.target.checked)}
                  className="rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">Age 65 or Older Exemption (Freezes School Tax Ceiling)</span>
              </label>

              <label className="flex items-center gap-2.5 p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={isDisabledVeteran}
                  onChange={(e) => setIsDisabledVeteran(e.target.checked)}
                  className="rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-800">100% Disabled Veteran or Surviving Spouse (100% Total Property Tax Exemption)</span>
              </label>
            </div>

          </div>

          {/* Driver License Requirement Callout */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900">
              <strong>Mandatory Texas Requirement:</strong> Texas law requires your Texas Driver's License or ID address to <em>match exactly</em> the physical address of the property before the Appraisal District will approve your homestead application.
            </div>
          </div>

        </div>

        {/* Right: County CAD Direct Routing & Instructions */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-200">
              <span className="font-serif font-bold text-navy-900 text-lg">Your County CAD Filing Instructions</span>
              <p className="text-xs text-slate-500 mt-0.5">Customized routing for {cadInfo.name}</p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 text-xs shadow-sm">
              <div className="font-bold text-navy-900 text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-gold-600" />
                <span>{cadInfo.cadName}</span>
              </div>

              <div className="space-y-1.5 text-slate-600">
                <p className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{cadInfo.address}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>Deadline: <strong>{cadInfo.deadline}</strong></span>
                </p>
              </div>

              {cadInfo.onlineFilingAvailable && (
                <div className="pt-2 border-t border-slate-100">
                  <a
                    href={cadInfo.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-gold text-xs flex items-center justify-center gap-1.5"
                  >
                    <span>File Online at {cadInfo.name} CAD</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>

            <div className="space-y-2 text-xs text-slate-600">
              <div className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">3-Step Filing Checklist:</div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>1. Update your Texas DL address online at Texas DPS.</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>2. Upload copy of your Recorded Deed (provided in your Wise Title closing packet).</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>3. Submit Form 50-114 directly via the online portal or mail.</span>
              </div>
            </div>

          </div>

          <div className="p-4 bg-navy-900 text-white rounded-2xl text-xs space-y-2">
            <div className="font-semibold text-gold-400">Need a copy of your recorded deed?</div>
            <p className="text-slate-300 text-[11px]">
              If you closed with Wise County Title, our escrow department can email you a certified PDF copy of your recorded warranty deed.
            </p>
            <a href="mailto:orderdesk@wisetitle.com?subject=Recorded%20Deed%20Request%20for%20Homestead" className="text-gold-400 hover:text-gold-300 underline font-medium block">
              Request Deed Copy from Escrow →
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
