import React, { useState, useMemo } from 'react';
import { calculateBasicTdiPremium } from '../../../lib/tdi-rates';
import { formatCurrency } from '../../../lib/utils';
import { DollarSign, Printer, Download, Sparkles, Building, ArrowRight, ShieldCheck } from 'lucide-react';

import { forwardToWebhook } from '../../../lib/webhook';

export default function SellerNetSheet() {
  const [salesPrice, setSalesPrice] = useState<number>(450000);
  const [existingMortgagePayoff, setExistingMortgagePayoff] = useState<number>(185000);
  const [brokerCommissionPct, setBrokerCommissionPct] = useState<number>(5.5);
  const [sellerClosingCredits, setSellerClosingCredits] = useState<number>(3000);
  const [estimatedProratedTaxes, setEstimatedProratedTaxes] = useState<number>(2800);
  const [hoaTransferFee, setHoaTransferFee] = useState<number>(350);
  const [surveyFee, setSurveyFee] = useState<number>(0);
  const [homeWarrantyFee, setHomeWarrantyFee] = useState<number>(650);

  const netResults = useMemo(() => {
    const ownersTitlePolicy = calculateBasicTdiPremium(salesPrice);
    const totalCommission = Math.round((salesPrice * brokerCommissionPct) / 100);
    const escrowSettlementFee = 450;
    const attorneyDocPrepFee = 200; // The Berry White Law Firm deed preparation
    const recordingTaxRelease = 80;

    const totalClosingCosts =
      ownersTitlePolicy +
      totalCommission +
      sellerClosingCredits +
      estimatedProratedTaxes +
      hoaTransferFee +
      surveyFee +
      homeWarrantyFee +
      escrowSettlementFee +
      attorneyDocPrepFee +
      recordingTaxRelease;

    const totalDeductions = totalClosingCosts + existingMortgagePayoff;
    const estimatedNetProceeds = Math.max(0, salesPrice - totalDeductions);

    return {
      ownersTitlePolicy,
      totalCommission,
      escrowSettlementFee,
      attorneyDocPrepFee,
      recordingTaxRelease,
      totalClosingCosts,
      totalDeductions,
      estimatedNetProceeds,
    };
  }, [
    salesPrice,
    existingMortgagePayoff,
    brokerCommissionPct,
    sellerClosingCredits,
    estimatedProratedTaxes,
    hoaTransferFee,
    surveyFee,
    homeWarrantyFee,
  ]);

  const handlePrint = async () => {
    window.print();
    await forwardToWebhook({
      eventType: 'quote_request',
      timestamp: new Date().toISOString(),
      sourceUrl: typeof window !== 'undefined' ? window.location.href : '',
      data: {
        tool: 'seller_net_sheet',
        salesPrice,
        existingMortgagePayoff,
        brokerCommissionPct,
        estimatedNetProceeds: netResults.estimatedNetProceeds,
      },
    });
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 border-b border-gold-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Realtor & Seller Financial Tool
            </span>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              Texas Seller Net Sheet Calculator
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Estimate net cash proceeds at closing, factoring in TDI title policy, commissions, payoffs, and Wise County tax prorations.
            </p>
          </div>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-slate-200 border border-slate-700 shadow-sm transition-colors self-start sm:self-auto"
          >
            <Printer className="w-4 h-4 text-gold-400" />
            Print Branded Net Sheet
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left: Inputs */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-slate-200">
          
          {/* Sales Price */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="sns-sales-price" className="text-xs font-bold uppercase tracking-wider text-slate-700">Estimated Sales Price</label>
              <span className="font-mono font-bold text-navy-900 text-lg">{formatCurrency(salesPrice)}</span>
            </div>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="sns-sales-price"
                type="number"
                step="5000"
                value={salesPrice}
                onChange={(e) => setSalesPrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          {/* Mortgage Payoff */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="sns-payoff" className="text-xs font-bold uppercase tracking-wider text-slate-700">Existing Mortgage Loan Payoff</label>
              <span className="font-mono font-bold text-slate-700">{formatCurrency(existingMortgagePayoff)}</span>
            </div>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="sns-payoff"
                type="number"
                step="1000"
                value={existingMortgagePayoff}
                onChange={(e) => setExistingMortgagePayoff(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          {/* Grid of Two Columns for Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            
            <div>
              <label htmlFor="sns-comm" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Total Broker Commission (%)</label>
              <input
                id="sns-comm"
                type="number"
                step="0.25"
                value={brokerCommissionPct}
                onChange={(e) => setBrokerCommissionPct(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="sns-credits" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Seller Credits to Buyer ($)</label>
              <input
                id="sns-credits"
                type="number"
                step="250"
                value={sellerClosingCredits}
                onChange={(e) => setSellerClosingCredits(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="sns-taxes" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Prorated Property Taxes ($)</label>
              <input
                id="sns-taxes"
                type="number"
                step="100"
                value={estimatedProratedTaxes}
                onChange={(e) => setEstimatedProratedTaxes(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="sns-warranty" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Residential Home Warranty ($)</label>
              <input
                id="sns-warranty"
                type="number"
                step="50"
                value={homeWarrantyFee}
                onChange={(e) => setHomeWarrantyFee(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="sns-hoa" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">HOA Resale / Transfer ($)</label>
              <input
                id="sns-hoa"
                type="number"
                step="50"
                value={hoaTransferFee}
                onChange={(e) => setHoaTransferFee(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500 text-sm"
              />
            </div>

            <div>
              <label htmlFor="sns-survey" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">New Survey (if Seller Pays)</label>
              <input
                id="sns-survey"
                type="number"
                step="50"
                value={surveyFee}
                onChange={(e) => setSurveyFee(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500 text-sm"
              />
            </div>

          </div>

          <div className="p-3 bg-navy-50 rounded-xl border border-navy-100 text-xs text-navy-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-600 shrink-0 mt-0.5" />
            <span>
              Includes Attorney Deed Prep by <strong>The Berry White Law Firm, PLLC</strong> ($200) and Texas Promulgated Owner Title Policy.
            </span>
          </div>

        </div>

        {/* Right: Output Proceeds */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div>
            <div className="pb-3 border-b border-slate-200">
              <span className="font-serif font-bold text-navy-900 text-lg">Estimated Settlement Summary</span>
            </div>

            <div className="mt-4 space-y-2 text-xs">
              
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-600">Contract Sales Price:</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(salesPrice)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 text-red-700">
                <span>Existing Mortgage Payoff:</span>
                <span className="font-mono font-bold">- {formatCurrency(existingMortgagePayoff)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 text-red-700">
                <span>Total Broker Commissions ({brokerCommissionPct}%):</span>
                <span className="font-mono">- {formatCurrency(netResults.totalCommission)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 text-red-700">
                <span>Owner's Title Insurance Policy:</span>
                <span className="font-mono">- {formatCurrency(netResults.ownersTitlePolicy)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 text-red-700">
                <span>Escrow, Deed Prep & Releases:</span>
                <span className="font-mono">- {formatCurrency(netResults.escrowSettlementFee + netResults.attorneyDocPrepFee + netResults.recordingTaxRelease)}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-200 text-red-700">
                <span>Credits, Tax Proration & Other Fees:</span>
                <span className="font-mono">- {formatCurrency(sellerClosingCredits + estimatedProratedTaxes + hoaTransferFee + surveyFee + homeWarrantyFee)}</span>
              </div>

              <div className="flex justify-between py-2 border-b-2 border-slate-300 font-semibold text-slate-900">
                <span>Total Deductions & Costs:</span>
                <span className="font-mono font-bold text-red-700">{formatCurrency(netResults.totalDeductions)}</span>
              </div>

            </div>

            {/* Estimated Net Proceeds Highlight Box */}
            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-br from-navy-950 to-navy-900 text-white shadow-xl border border-gold-500/50">
              <div className="text-xs font-semibold text-gold-400 uppercase tracking-wider">
                Estimated Net Cash Proceeds
              </div>
              <div className="font-mono font-bold text-3xl sm:text-4xl text-gold-400 mt-2">
                {formatCurrency(netResults.estimatedNetProceeds)}
              </div>
              <div className="text-[11px] text-slate-300 mt-1">
                Estimated cash wired to seller on closing day
              </div>
            </div>

          </div>

          <div className="space-y-2 pt-4">
            <a
              href="/order"
              className="w-full btn-gold text-xs flex items-center justify-center gap-2"
            >
              <span>Submit Contract to Open Escrow</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
