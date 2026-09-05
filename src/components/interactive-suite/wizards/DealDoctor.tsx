import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertTriangle, Send, Sparkles, ShieldCheck, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import { forwardToWebhook } from '../../../lib/webhook';

interface ScenarioDef {

  id: string;
  title: string;
  category: string;
  defaultSeverity: 'high' | 'medium' | 'low';
  summaryRoadmap: string;
  statutoryBasis: string;
  estimatedResolutionDays: string;
  recommendedDocs: string[];
}

const COMMON_SCENARIOS: ScenarioDef[] = [
  {
    id: 'unprobated_estate',
    title: 'Deceased Owner / Unprobated Will / Multiple Heirs',
    category: 'Probate & Heirship',
    defaultSeverity: 'high',
    summaryRoadmap:
      'Title cannot pass solely on an unprobated will. Options include formal probate (Letters Testamentary), Muniment of Title (if no debts), or Affidavits of Heirship pursuant to Texas Estates Code §203 if deceased passed more than 4 years ago without debts.',
    statutoryBasis: 'Texas Estates Code Chapter 203 & §256.003',
    estimatedResolutionDays: '3–10 business days for Affidavit of Heirship; 30–60 days for formal court probate',
    recommendedDocs: [
      'Affidavit of Heirship signed by 2 disinterested witnesses',
      'Death Certificate copy',
      'Special Warranty Deed executed by all legal heirs',
    ],
  },
  {
    id: 'unreleased_lien',
    title: 'Unreleased Mortgage / 1980s-1990s Deed of Trust from Defunct Bank',
    category: 'Title Curative',
    defaultSeverity: 'medium',
    summaryRoadmap:
      'Texas Civil Practice & Remedies Code §16.035 creates a 4-year statute of limitations to foreclose a real property lien after maturity date. If maturity date is stated in the recorded deed of trust, the lien can be cleared as a matter of law without court action.',
    statutoryBasis: 'Texas CPRC §16.035 (Statute of Limitations on Real Property Liens)',
    estimatedResolutionDays: '1–3 business days (Title Examiner Review)',
    recommendedDocs: [
      'Copy of original recorded Deed of Trust',
      'Proof of loan payoff or passage of 4 years past stated maturity',
      'Underwriter indemnity affidavit',
    ],
  },
  {
    id: 'boundary_encroachment',
    title: 'Fence / Shed Encroachment Over Boundary or Setback Line',
    category: 'Survey & Boundaries',
    defaultSeverity: 'medium',
    summaryRoadmap:
      'If a fence or shed encroaches into a neighboring tract or utility easement, title can close by issuing a Texas T-19.1 or Area & Boundary endorsement, securing a Boundary Line Agreement, or obtaining a License to Encroach from the municipality/utility.',
    statutoryBasis: 'TDI Basic Manual Rule R-16 & Procedural Rule P-2',
    estimatedResolutionDays: '2–5 business days',
    recommendedDocs: [
      'Current ALTA or Category 1A Land Title Survey',
      'Boundary Line Agreement & Quitclaim executed by adjoiner',
      'T-19.1 Endorsement Request',
    ],
  },
  {
    id: 'lady_bird_deed',
    title: 'Selling Property Held Under an Enhanced Life Estate (Lady Bird Deed)',
    category: 'Estate Planning',
    defaultSeverity: 'low',
    summaryRoadmap:
      'If the grantor of a recorded Lady Bird Deed is living, the grantor retains full power to sell, convey, or mortgage without joinder of remaindermen. If grantor is deceased, title vests immediately in remaindermen upon recording certified death certificate.',
    statutoryBasis: 'Texas Property Code §5.001 & Common Law Enhanced Life Estate',
    estimatedResolutionDays: '1–2 business days',
    recommendedDocs: [
      'Recorded Lady Bird Deed copy',
      'Certified Death Certificate (if grantor deceased)',
      'General Warranty Deed from remaindermen or living grantor',
    ],
  },
  {
    id: 'solar_ucc_lien',
    title: 'Solar Panel Lease / UCC-1 Fixture Filing on Title',
    category: 'Financial Liens',
    defaultSeverity: 'medium',
    summaryRoadmap:
      'Solar financing companies file UCC-1 fixture filings in county records. To close, the solar loan must either be paid in full at closing, or the solar lender must issue a formal Subordination Agreement or Transfer of Obligation approving the buyer.',
    statutoryBasis: 'Texas Business & Commerce Code Chapter 9',
    estimatedResolutionDays: '5–10 business days (lender response dependent)',
    recommendedDocs: [
      'Solar Lender Payoff Demand or Assumption Package',
      'UCC-3 Financing Statement Amendment / Termination',
    ],
  },
];

export default function DealDoctor() {

  const [selectedId, setSelectedId] = useState<string>(COMMON_SCENARIOS[0].id);
  const [customNotes, setCustomNotes] = useState<string>('');
  const [agentName, setAgentName] = useState<string>('');
  const [agentPhone, setAgentPhone] = useState<string>('');
  const [agentEmail, setAgentEmail] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const activeScenario = COMMON_SCENARIOS.find((s) => s.id === selectedId) || COMMON_SCENARIOS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    await forwardToWebhook({
      eventType: 'deal_doctor_inquiry',
      timestamp: new Date().toISOString(),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      data: {
        scenarioId: selectedId,
        scenarioTitle: activeScenario.title,
        customNotes,
        agentName,
        agentPhone,
        agentEmail,
      },
    });
  };


  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 border-b border-gold-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-2">
              <Scale className="w-3.5 h-3.5" />
              Underwriting & Legal Curative Triage
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              The "Deal Doctor" Title Triage Engine
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Have a tricky title issue before going under contract? Get an immediate statutory roadmap from our in-house legal team at The Berry White Law Firm, PLLC.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-navy-800/80 px-4 py-2 rounded-xl border border-navy-700 text-xs text-gold-400 font-semibold self-start sm:self-auto">
            <Clock className="w-4 h-4" />
            <span>Avg. Triage Response: 2–4 Hours</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Scenario Selector & Custom Details */}
        <div className="lg:col-span-6 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
              1. Select Common Title Issue Scenario:
            </label>
            <div className="space-y-2.5">
              {COMMON_SCENARIOS.map((scenario) => (
                <button
                  key={scenario.id}
                  type="button"
                  onClick={() => setSelectedId(scenario.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                    selectedId === scenario.id
                      ? 'bg-navy-900 text-white border-navy-900 shadow-md ring-2 ring-gold-500/50'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <div>
                    <div className="font-semibold text-xs sm:text-sm">{scenario.title}</div>
                    <div className={`text-[11px] ${selectedId === scenario.id ? 'text-gold-300' : 'text-slate-500'}`}>
                      {scenario.category}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      selectedId === scenario.id
                        ? 'bg-gold-500 text-navy-950'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {scenario.defaultSeverity}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Scenario Notes */}
          <div className="space-y-2 pt-2 border-t border-slate-200">
            <label htmlFor="dd-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              2. Describe Specific Transaction Details (Optional):
            </label>
            <textarea
              id="dd-notes"
              rows={3}
              value={customNotes}
              onChange={(e) => setCustomNotes(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-xs font-medium focus:ring-2 focus:ring-gold-500"
              placeholder="e.g. Seller is daughter of deceased owner; father passed 5 years ago in Wise County with no will. Need closing in 30 days."
            />
          </div>

          {/* Attorney Partnership Notice */}
          <div className="p-4 bg-navy-50 rounded-2xl border border-navy-100 flex items-start gap-3">
            <Scale className="w-5 h-5 text-gold-600 shrink-0 mt-0.5" />
            <div className="text-xs text-navy-950 leading-relaxed">
              <strong>Direct In-House Attorney Support:</strong> Scenarios are reviewed directly by Attorney Herman Berry White IV, J.D. (Texas Bar #24060820) at our Bridgeport office.
            </div>
          </div>

        </div>

        {/* Right: Instant Curative Roadmap & Attorney Dispatch */}
        <div className="lg:col-span-6 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div className="space-y-4">
            
            <div className="pb-3 border-b border-slate-200">
              <span className="font-serif font-bold text-navy-900 text-lg">Preliminary Legal Roadmap</span>
              <p className="text-xs text-slate-500 mt-0.5">{activeScenario.title}</p>
            </div>

            {/* Statutory basis & analysis box */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
              <div>
                <div className="font-bold text-slate-900 mb-1">Underwriting Assessment:</div>
                <p className="text-slate-700 leading-relaxed">{activeScenario.summaryRoadmap}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-100 text-[11px]">
                <div>
                  <span className="text-slate-500 block font-semibold uppercase">Statutory Rule:</span>
                  <span className="text-navy-900 font-bold">{activeScenario.statutoryBasis}</span>
                </div>
                <div>
                  <span className="text-slate-500 block font-semibold uppercase">Est. Clearance Timeline:</span>
                  <span className="text-emerald-700 font-bold">{activeScenario.estimatedResolutionDays}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="font-bold text-slate-900 mb-1.5">Required Documents for Clear Title:</div>
                <ul className="space-y-1 text-slate-600">
                  {activeScenario.recommendedDocs.map((doc, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-gold-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Direct Attorney Submission Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="font-bold text-navy-900 text-xs uppercase tracking-wider">
                  Request Free Attorney Scenario Triage:
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Your Name / Title"
                    value={agentName}
                    onChange={(e) => setAgentName(e.target.value)}
                    className="p-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-gold-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Direct Phone"
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    className="p-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-gold-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    className="p-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-gold-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold text-xs flex items-center justify-center gap-1.5 py-2.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Scenario to The Berry White Law Firm</span>
                </button>
              </form>
            ) : (
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1.5 animate-in fade-in">
                <div className="font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Scenario Dispatched to Legal Counsel!</span>
                </div>
                <p>
                  Thank you, <strong>{agentName || 'Partner'}</strong>. Herman Berry White IV, J.D. and our underwriting examiners have received your file details. We will contact you at <strong>{agentPhone || 'your phone'}</strong> with a concrete curative plan.
                </p>
              </div>
            )}

          </div>

          <div className="pt-2 text-center">
            <a 
              href="https://www.hbwhitelaw.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[11px] text-slate-500 hover:text-navy-900 inline-flex items-center gap-1"
            >
              The Berry White Law Firm, PLLC • 1602 Halsell St, Bridgeport, TX • (940) 647-0000 <ExternalLink className="w-3 h-3" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
