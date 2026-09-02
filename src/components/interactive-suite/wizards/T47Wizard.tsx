import React, { useState } from 'react';
import { FileText, CheckCircle2, AlertTriangle, Printer, Sparkles, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

export default function T47Wizard() {
  const [step, setStep] = useState<number>(1);

  // Form State
  const [affiantName, setAffiantName] = useState('John & Sarah Miller');
  const [propertyAddress, setPropertyAddress] = useState('1402 Country Club Dr, Decatur, TX 76234');
  const [legalDescription, setLegalDescription] = useState('Lot 12, Block 4, Park West Addition, Wise County, Texas');
  const [county, setCounty] = useState('Wise');
  const [surveyDate, setSurveyDate] = useState('2021-06-15');
  const [surveyorName, setSurveyorName] = useState('North Texas Land Surveying LLC');
  
  // Modification flags
  const [hasFenceChanges, setHasFenceChanges] = useState(false);
  const [hasStructureChanges, setHasStructureChanges] = useState(false);
  const [hasBoundaryChanges, setHasBoundaryChanges] = useState(false);
  const [hasEasementChanges, setHasEasementChanges] = useState(false);
  const [modificationsDescription, setModificationsDescription] = useState('');

  const hasAnyModifications = hasFenceChanges || hasStructureChanges || hasBoundaryChanges || hasEasementChanges;

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      
      {/* Top Wizard Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 border-b border-gold-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Texas Promulgated Form (TDI / TREC)
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Texas T-47 Residential Affidavit Generator
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Generate a legally compliant Texas T-47 Residential Real Property Affidavit to accompany an existing survey at closing.
            </p>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center gap-2 self-start sm:self-auto text-xs font-semibold">
            {[1, 2, 3].map((s) => (
              <span
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                  step === s
                    ? 'bg-gold-500 text-navy-950 font-bold shadow-md'
                    : step > s
                    ? 'bg-emerald-600 text-white'
                    : 'bg-navy-800 text-slate-400'
                }`}
              >
                {step > s ? '✓' : s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        
        {/* STEP 1: Affiant & Property Info */}
        {step === 1 && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-serif font-bold text-navy-900 text-xl">Step 1: Affiant & Property Information</h3>
              <p className="text-xs text-slate-500 mt-1">Enter the seller(s) legal names and exact property identification.</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Affiant / Seller Name(s) (as shown on Title)
                </label>
                <input
                  type="text"
                  value={affiantName}
                  onChange={(e) => setAffiantName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                  placeholder="e.g. John Miller & Sarah Miller"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Physical Property Address
                </label>
                <input
                  type="text"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                  placeholder="e.g. 405 Park West Ct, Decatur, TX 76234"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Legal Description (from Deed or Title Commitment)
                </label>
                <textarea
                  rows={2}
                  value={legalDescription}
                  onChange={(e) => setLegalDescription(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500 text-sm"
                  placeholder="e.g. Lot 4, Block 2, Oak Grove Addition, Wise County, Texas"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Texas County
                </label>
                <select
                  value={county}
                  onChange={(e) => setCounty(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                >
                  <option value="Wise">Wise County</option>
                  <option value="Denton">Denton County</option>
                  <option value="Tarrant">Tarrant County</option>
                  <option value="Parker">Parker County</option>
                  <option value="Collin">Collin County</option>
                  <option value="Dallas">Dallas County</option>
                  <option value="Cooke">Cooke County</option>
                  <option value="Montague">Montague County</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="btn-gold text-xs flex items-center gap-2"
              >
                <span>Continue to Survey Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Survey & Modifications Questionnaire */}
        {step === 2 && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="font-serif font-bold text-navy-900 text-xl">Step 2: Prior Survey & Property Changes</h3>
              <p className="text-xs text-slate-500 mt-1">Review the existing survey and indicate if any changes occurred since that date.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Date of Existing Survey
                </label>
                <input
                  type="date"
                  value={surveyDate}
                  onChange={(e) => setSurveyDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Original Surveying Firm / RPLS
                </label>
                <input
                  type="text"
                  value={surveyorName}
                  onChange={(e) => setSurveyorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500 text-sm"
                  placeholder="e.g. John Doe, RPLS #1234"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="font-semibold text-xs uppercase tracking-wider text-slate-700">
                Property Modifications Questionnaire (Paragraph 4 Verification)
              </div>

              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasFenceChanges}
                  onChange={(e) => setHasFenceChanges(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                />
                <span className="text-xs text-slate-800">
                  <strong>Fences or Retaining Walls:</strong> Have any fences been built, moved, or replaced?
                </span>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasStructureChanges}
                  onChange={(e) => setHasStructureChanges(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                />
                <span className="text-xs text-slate-800">
                  <strong>Structures / Additions:</strong> Has a swimming pool, storage shed, workshop, garage, or patio cover been added?
                </span>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasBoundaryChanges}
                  onChange={(e) => setHasBoundaryChanges(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                />
                <span className="text-xs text-slate-800">
                  <strong>Boundary Line Changes:</strong> Have any lot lines been replatted or conveyed?
                </span>
              </label>

              <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasEasementChanges}
                  onChange={(e) => setHasEasementChanges(e.target.checked)}
                  className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                />
                <span className="text-xs text-slate-800">
                  <strong>Easements / Encroachments:</strong> Have any utility, pipeline, or access easements been granted?
                </span>
              </label>
            </div>

            {hasAnyModifications ? (
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-semibold text-xs">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Modifications Description Required:</span>
                </div>
                <textarea
                  rows={2}
                  value={modificationsDescription}
                  onChange={(e) => setModificationsDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-amber-300 bg-white text-slate-900 text-xs focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Added a 12x16 storage shed on concrete pad in the northeast corner of lot in 2023."
                />
              </div>
            ) : (
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Paragraph 4 will state: <strong>"None since date of survey"</strong>.</span>
              </div>
            )}

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="btn-outline text-xs flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="btn-gold text-xs flex items-center gap-2"
              >
                <span>Generate T-47 Preview</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Complete Affidavit Preview & Print */}
        {step === 3 && (
          <div className="space-y-6 max-w-3xl mx-auto">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-serif font-bold text-navy-900 text-xl">Step 3: Completed T-47 Affidavit Preview</h3>
                <p className="text-xs text-slate-500 mt-1">Ready for notarization at Wise County Title Company closing suites.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-outline text-xs"
                >
                  Edit Details
                </button>
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="btn-gold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print for Notarization</span>
                </button>
              </div>
            </div>

            {/* Document Sheet Preview */}
            <div className="bg-slate-50 p-6 sm:p-10 rounded-2xl border-2 border-slate-300 font-serif text-slate-900 space-y-5 text-xs sm:text-sm leading-relaxed shadow-inner">
              
              <div className="text-center space-y-1 pb-4 border-b border-slate-300">
                <div className="font-bold text-base sm:text-lg uppercase tracking-wider text-navy-950">
                  T-47 RESIDENTIAL REAL PROPERTY AFFIDAVIT
                </div>
                <div className="text-xs text-slate-600 italic">
                  (May be modified as appropriate for commercial transactions)
                </div>
                <div className="text-xs text-navy-900 font-sans font-semibold pt-1">
                  Texas Department of Insurance Promulgated Form
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-sans border-b border-slate-300 pb-4">
                <div>
                  <span className="text-slate-500 font-bold uppercase">Date:</span> {new Date().toLocaleDateString()}
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase">GF No. / Title Order:</span> [Pending Title Intake]
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 font-bold uppercase">Name of Affiant(s):</span> <strong className="text-navy-950">{affiantName}</strong>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 font-bold uppercase">Address of Affiant:</span> {propertyAddress}
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 font-bold uppercase">Property Description:</span> {legalDescription}
                </div>
                <div>
                  <span className="text-slate-500 font-bold uppercase">County:</span> {county} County, Texas
                </div>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <p>
                  "Before me, the undersigned notary public, on this day personally appeared Affiant(s) who, after being by me duly sworn, on oath stated that:
                </p>
                
                <p>
                  1. We are the owners of the Property. (If Affiant is not the owner, explain).
                </p>
                
                <p>
                  2. We are familiar with the property and the improvements located on the Property.
                </p>

                <p>
                  3. We are closing a transaction for sale/purchase/refinance of the Property through <strong>Wise County Title Company</strong>.
                </p>

                <p>
                  4. To the best of our knowledge and belief, since <strong>{surveyDate || '[Date of Survey]'}</strong> (the date of the existing survey provided by {surveyorName || 'licensed surveyor'}), there have been:
                </p>

                <div className="p-3 bg-white rounded-xl border border-slate-300 font-sans font-medium text-navy-900 my-2">
                  {hasAnyModifications ? (
                    <span>{modificationsDescription || 'Modifications noted as checked.'}</span>
                  ) : (
                    <span className="font-bold">None. No changes, construction, fence additions, or easements have occurred since date of survey.</span>
                  )}
                </div>

                <p>
                  5. We understand that Title Company may use this Affidavit in lieu of requiring a new survey to issue title policy with Area and Boundary (T-38) coverage."
                </p>
              </div>

              {/* Signature Blocks */}
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans text-xs">
                <div className="space-y-4">
                  <div className="border-b border-slate-700 pt-8"></div>
                  <div className="text-center font-bold text-slate-800">Affiant Signature: {affiantName}</div>
                </div>

                <div className="space-y-4">
                  <div className="border-b border-slate-700 pt-8"></div>
                  <div className="text-center font-bold text-slate-800">Notary Public, State of Texas</div>
                </div>
              </div>

            </div>

            <div className="p-4 bg-navy-50 rounded-2xl border border-navy-100 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
              <div className="text-xs text-navy-950">
                <strong>Complimentary Notary Service:</strong> When you close with Wise County Title Company in Decatur or Bridgeport, our certified escrow officers will notarize this T-47 affidavit at no extra charge.
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
