import React, { useState, useMemo } from 'react';
import { calculateTdiRates } from '../../../lib/tdi-rates';
import { formatCurrency } from '../../../lib/utils';
import { generateCoBrandedTdiQuotePdf } from '../../../lib/pdf-export';
import { forwardToWebhook } from '../../../lib/webhook';
import { 
  Calculator, 
  HelpCircle, 
  Printer, 
  ShieldCheck, 
  Sparkles, 
  Info, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  DollarSign, 
  FileText,
  Download,
  User,
  Building,
  X
} from 'lucide-react';

export default function TdiRateCalculator() {
  const [transactionType, setTransactionType] = useState<'purchase' | 'refinance'>('purchase');
  const [purchasePrice, setPurchasePrice] = useState<number>(450000);
  const [loanAmount, setLoanAmount] = useState<number>(360000);

  // Endorsements
  const [includeT19, setIncludeT19] = useState<boolean>(true);
  const [includeT38, setIncludeT38] = useState<boolean>(true);
  const [isCommercialT38, setIsCommercialT38] = useState<boolean>(false);
  const [includeT42, setIncludeT42] = useState<boolean>(false);
  const [includeT42_1, setIncludeT42_1] = useState<boolean>(false);
  const [includeT26, setIncludeT26] = useState<boolean>(false);
  const [includeT17, setIncludeT17] = useState<boolean>(false);

  // Co-Branding Modal State
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [agentName, setAgentName] = useState<string>('');
  const [brokerageName, setBrokerageName] = useState<string>('');
  const [agentPhone, setAgentPhone] = useState<string>('');
  const [agentEmail, setAgentEmail] = useState<string>('');

  // Rate Calculation Memo
  const quote = useMemo(() => {
    return calculateTdiRates({
      purchasePrice: transactionType === 'purchase' ? purchasePrice : 0,
      loanAmount: loanAmount,
      isSimultaneousIssue: transactionType === 'purchase' && loanAmount > 0,
      isCommercial: isCommercialT38,
      endorsements: {
        t19_minerals_restrictions: includeT19,
        t38_area_boundary: includeT38,
        t42_equity_loan: includeT42,
        t42_1_supplemental: includeT42_1,
        t26_additional_insured: includeT26,
        t17_access: includeT17,
      },
    });
  }, [
    transactionType,
    purchasePrice,
    loanAmount,
    includeT19,
    includeT38,
    isCommercialT38,
    includeT42,
    includeT42_1,
    includeT26,
    includeT17,
  ]);

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePdf = async () => {
    generateCoBrandedTdiQuotePdf(
      {
        salesPrice: transactionType === 'purchase' ? purchasePrice : 0,
        loanAmount: loanAmount,
        ownersPolicyPremium: quote.basicPremium,
        lendersPolicyPremium: quote.loanPolicyPremium,
        totalEndorsements: quote.totalEndorsements,
        settlementFee: quote.escrowSettlementFee,
        recordingFees: quote.countyRecordingFees,
        simultaneousSavings: quote.simultaneousIssueSavings,
        totalTitleEstimate: quote.totalTitleEstimate,
      },
      {
        agentName,
        brokerageName,
        agentPhone,
        agentEmail,
      }
    );
    setShowPdfModal(false);

    if (agentEmail || agentPhone || agentName) {
      await forwardToWebhook({
        eventType: 'quote_request',
        timestamp: new Date().toISOString(),
        sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
        data: {
          transactionType,
          purchasePrice,
          loanAmount,
          totalTitleEstimate: quote.totalTitleEstimate,
          agentName,
          brokerageName,
          agentPhone,
          agentEmail,
        },
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      
      {/* Top Calculator Header */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 border-b border-gold-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              State-Regulated Basic Manual Rule R-1
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Texas Promulgated Title Rate Calculator
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Title insurance rates in Texas are set by the Texas Department of Insurance (TDI). Compute exact premiums and statutory endorsements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setShowPdfModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-gold-500 hover:bg-gold-400 text-navy-950 shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              Co-Branded PDF
            </button>
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-slate-200 border border-slate-700 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4 text-gold-400" />
              Print
            </button>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Inputs & Endorsement Controls */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-slate-200">
          
          {/* Transaction Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Transaction Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTransactionType('purchase')}
                className={`py-3 px-4 rounded-xl text-sm font-semibold border text-center transition-all ${
                  transactionType === 'purchase'
                    ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Residential / Commercial Purchase
              </button>
              <button
                type="button"
                onClick={() => setTransactionType('refinance')}
                className={`py-3 px-4 rounded-xl text-sm font-semibold border text-center transition-all ${
                  transactionType === 'refinance'
                    ? 'bg-navy-900 text-white border-navy-900 shadow-sm'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Refinance / Equity Loan
              </button>
            </div>
          </div>

          {/* Purchase Price (if Purchase) */}
          {transactionType === 'purchase' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="purchase-price-input" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Sales / Purchase Price
                </label>
                <span className="font-mono font-bold text-navy-900 text-lg">
                  {formatCurrency(purchasePrice)}
                </span>
              </div>
              <div className="relative">
                <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="purchase-price-input"
                  type="number"
                  min="0"
                  step="5000"
                  value={purchasePrice}
                  onChange={(e) => setPurchasePrice(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500 focus:border-navy-900"
                />
              </div>
              <input
                type="range"
                min="50000"
                max="2500000"
                step="10000"
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
              />
            </div>
          )}

          {/* Loan Amount */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="loan-amount-input" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Loan Amount (Lender's Policy)
              </label>
              <span className="font-mono font-bold text-navy-900 text-lg">
                {loanAmount > 0 ? formatCurrency(loanAmount) : 'All Cash ($0)'}
              </span>
            </div>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="loan-amount-input"
                type="number"
                min="0"
                step="5000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500 focus:border-navy-900"
              />
            </div>
            <input
              type="range"
              min="0"
              max="2500000"
              step="10000"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
            {transactionType === 'purchase' && loanAmount > 0 && (
              <p className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 font-medium">
                <Check className="w-3.5 h-3.5 shrink-0" />
                Simultaneous Issue Rule R-5 Applied: Lender's policy discounted to flat $100.
              </p>
            )}
          </div>

          {/* Endorsement Selection Toggles */}
          <div className="pt-4 border-t border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Texas Statutory Endorsements
              </span>
              <span className="text-xs text-slate-500">TDI Promulgated Rates</span>
            </div>

            <div className="space-y-2 text-xs">
              
              {/* T-19 / T-19.1 */}
              <label className="flex items-start justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeT19}
                    onChange={(e) => setIncludeT19(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">T-19 / T-19.1 Restrictions, Encroachments & Minerals</div>
                    <div className="text-slate-500 text-[11px]">10% of basic policy (standard for residential mortgages)</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-800">
                  {formatCurrency(quote.endorsements.t19_minerals_restrictions)}
                </span>
              </label>

              {/* T-38 Area & Boundary */}
              <label className="flex items-start justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeT38}
                    onChange={(e) => setIncludeT38(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">T-38 Area & Boundary / Survey Deletion</div>
                    <div className="text-slate-500 text-[11px]">5% residential / 15% commercial (modifies survey exceptions)</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-800">
                  {formatCurrency(quote.endorsements.t38_area_boundary)}
                </span>
              </label>

              {/* T-42 / T-42.1 (Equity Loan) */}
              <label className="flex items-start justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeT42}
                    onChange={(e) => setIncludeT42(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">T-42 Texas Equity Loan Endorsement</div>
                    <div className="text-slate-500 text-[11px]">Texas Constitutional Article XVI, §50(a)(6) protection ($50 statutory)</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-800">
                  {formatCurrency(quote.endorsements.t42_equity_loan)}
                </span>
              </label>

              {/* T-26 Additional Insured */}
              <label className="flex items-start justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex items-start gap-2.5">
                  <input
                    type="checkbox"
                    checked={includeT26}
                    onChange={(e) => setIncludeT26(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-navy-900 focus:ring-gold-500 w-4 h-4"
                  />
                  <div>
                    <div className="font-semibold text-slate-900">T-26 Additional Insured Endorsement</div>
                    <div className="text-slate-500 text-[11px]">Living trusts, family LLCs, or estate planning entities ($100 flat)</div>
                  </div>
                </div>
                <span className="font-mono font-bold text-slate-800">
                  {formatCurrency(quote.endorsements.t26_additional_insured)}
                </span>
              </label>

            </div>
          </div>

        </div>

        {/* Right Column: Live Itemized Quote Output */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <span className="font-serif font-bold text-navy-900 text-lg">Itemized Title Estimate</span>
              <span className="badge-pillar text-[10px]">TDI Promulgated</span>
            </div>

            {/* Breakdown list */}
            <div 
              className="mt-4 space-y-3 text-xs"
              aria-live="polite"
            >
              
              {transactionType === 'purchase' && (
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                  <div>
                    <span className="font-semibold text-slate-800">Owner's Title Policy (OTP)</span>
                    <div className="text-[10px] text-slate-500">Liability: {formatCurrency(purchasePrice)}</div>
                  </div>
                  <span className="font-mono font-bold text-navy-900 text-sm">
                    {formatCurrency(quote.ownersPolicyPremium)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                <div>
                  <span className="font-semibold text-slate-800">Lender's Title Policy (MTP)</span>
                  <div className="text-[10px] text-slate-500">
                    {quote.isSimultaneousIssue ? 'Simultaneous Issue (Rule R-5)' : `Liability: ${formatCurrency(loanAmount)}`}
                  </div>
                </div>
                <span className="font-mono font-bold text-navy-900 text-sm">
                  {formatCurrency(quote.lendersPolicyPremium)}
                </span>
              </div>

              {quote.endorsementsTotal > 0 && (
                <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                  <div>
                    <span className="font-semibold text-slate-800">Statutory Endorsements</span>
                    <div className="text-[10px] text-slate-500">T-19, T-38, T-42, T-26 combined</div>
                  </div>
                  <span className="font-mono font-bold text-navy-900 text-sm">
                    {formatCurrency(quote.endorsementsTotal)}
                  </span>
                </div>
              )}

              <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                <span className="text-slate-600">Estimated Settlement & Escrow Fee</span>
                <span className="font-mono text-slate-800">
                  {formatCurrency(quote.estimatedEscrowFee)}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-slate-200/80">
                <span className="text-slate-600">County Recording Fees (Est.)</span>
                <span className="font-mono text-slate-800">
                  {formatCurrency(quote.estimatedRecordingFee)}
                </span>
              </div>

              {quote.simultaneousIssueSavings > 0 && (
                <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-[11px] flex justify-between items-center">
                  <span className="font-semibold">Simultaneous Issue Savings:</span>
                  <span className="font-mono font-bold text-emerald-700">
                    - {formatCurrency(quote.simultaneousIssueSavings)}
                  </span>
                </div>
              )}

            </div>

            {/* Grand Total */}
            <div className="mt-6 pt-4 border-t-2 border-navy-900/20 bg-navy-900 text-white rounded-2xl p-5 shadow-md">
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
                    Total Estimated Settlement
                  </div>
                  <div className="text-xs text-slate-300">Guaranteed TDI Promulgated Basic Rate</div>
                </div>
                <div className="font-mono font-bold text-2xl sm:text-3xl text-gold-400">
                  {formatCurrency(quote.grandTotal)}
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Actions */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <a
              href="/order"
              className="w-full btn-gold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>Open Title with This Quote</span>
            </a>
            
            <p className="text-[10px] text-slate-400 text-center leading-tight">
              Rates calculated per Texas Insurance Code and TDI Basic Manual. Escrow fees subject to final Closing Disclosure (CD) approval.
            </p>
          </div>

        </div>

      </div>

      {/* Co-Branded PDF Modal */}
      {showPdfModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex justify-between items-start">
              <div>
                <span className="badge-gold">Realtor & Broker Tool</span>
                <h3 className="font-serif font-bold text-xl text-navy-950 mt-1">
                  Customize Co-Branded PDF
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add your contact details to generate a branded title quote for your client.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPdfModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-navy-900 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Agent / Loan Officer Name
                </label>
                <input
                  type="text"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gold-500 text-slate-900 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Brokerage / Lending Company
                </label>
                <input
                  type="text"
                  value={brokerageName}
                  onChange={(e) => setBrokerageName(e.target.value)}
                  placeholder="e.g. North Texas Land & Realty"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gold-500 text-slate-900 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={agentPhone}
                    onChange={(e) => setAgentPhone(e.target.value)}
                    placeholder="(940) 555-0199"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gold-500 text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={agentEmail}
                    onChange={(e) => setAgentEmail(e.target.value)}
                    placeholder="agent@brokerage.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-gold-500 text-slate-900"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={handleGeneratePdf}
                className="flex-1 btn-gold text-xs flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download PDF Estimate
              </button>
              <button
                type="button"
                onClick={() => setShowPdfModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

