import React, { useState, useMemo } from 'react';
import { formatCurrency } from '../../../lib/utils';
import { Calculator, DollarSign, Percent, Calendar, Sparkles } from 'lucide-react';

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.75);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [annualPropertyTax, setAnnualPropertyTax] = useState<number>(6800);
  const [annualHomeInsurance, setAnnualHomeInsurance] = useState<number>(2400);
  const [monthlyHoa, setMonthlyHoa] = useState<number>(50);

  const calculations = useMemo(() => {
    const downPaymentAmount = (homePrice * downPaymentPct) / 100;
    const principal = homePrice - downPaymentAmount;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;

    let monthlyPrincipalInterest = 0;
    if (monthlyRate > 0) {
      monthlyPrincipalInterest =
        (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    } else {
      monthlyPrincipalInterest = principal / totalPayments;
    }

    const monthlyTax = annualPropertyTax / 12;
    const monthlyInsurance = annualHomeInsurance / 12;
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyTax + monthlyInsurance + monthlyHoa;

    return {
      downPaymentAmount,
      principal,
      monthlyPrincipalInterest: Math.round(monthlyPrincipalInterest),
      monthlyTax: Math.round(monthlyTax),
      monthlyInsurance: Math.round(monthlyInsurance),
      monthlyHoa: Math.round(monthlyHoa),
      totalMonthlyPayment: Math.round(totalMonthlyPayment),
    };
  }, [
    homePrice,
    downPaymentPct,
    interestRate,
    loanTermYears,
    annualPropertyTax,
    annualHomeInsurance,
    monthlyHoa,
  ]);

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 border-b border-gold-500/40">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-2">
          <Sparkles className="w-3.5 h-3.5" /> Buyer Settlement Estimator
        </div>
        <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
          Texas Monthly Mortgage & Amortization Calculator
        </h2>
        <p className="text-slate-300 text-xs sm:text-sm mt-1">
          Estimate full PITI (Principal, Interest, Taxes, and Insurance) payments for your North Texas home purchase.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-5 border-b lg:border-b-0 lg:border-r border-slate-200">
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="mc-price" className="text-xs font-bold uppercase tracking-wider text-slate-700">Home Purchase Price</label>
              <span className="font-mono font-bold text-navy-900 text-lg">{formatCurrency(homePrice)}</span>
            </div>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="mc-price"
                type="number"
                step="5000"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="mc-down" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Down Payment (%)</label>
              <input
                id="mc-down"
                type="number"
                step="1"
                value={downPaymentPct}
                onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label htmlFor="mc-rate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Interest Rate (%)</label>
              <input
                id="mc-rate"
                type="number"
                step="0.125"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label htmlFor="mc-term" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Loan Term</label>
              <select
                id="mc-term"
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-gold-500"
              >
                <option value={30}>30 Years (Fixed)</option>
                <option value={20}>20 Years (Fixed)</option>
                <option value={15}>15 Years (Fixed)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-200">
            <div>
              <label htmlFor="mc-tax" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Annual Taxes ($)</label>
              <input
                id="mc-tax"
                type="number"
                step="200"
                value={annualPropertyTax}
                onChange={(e) => setAnnualPropertyTax(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label htmlFor="mc-ins" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Annual Home Ins ($)</label>
              <input
                id="mc-ins"
                type="number"
                step="100"
                value={annualHomeInsurance}
                onChange={(e) => setAnnualHomeInsurance(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-gold-500"
              />
            </div>

            <div>
              <label htmlFor="mc-hoa" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Monthly HOA ($)</label>
              <input
                id="mc-hoa"
                type="number"
                step="10"
                value={monthlyHoa}
                onChange={(e) => setMonthlyHoa(Number(e.target.value))}
                className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold text-sm focus:ring-2 focus:ring-gold-500"
              />
            </div>
          </div>

        </div>

        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          
          <div>
            <span className="font-serif font-bold text-navy-900 text-lg">Monthly Payment Breakdown</span>
            
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="text-slate-600">Principal & Interest (P&I):</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(calculations.monthlyPrincipalInterest)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="text-slate-600">County & ISD Property Taxes:</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(calculations.monthlyTax)}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-200">
                <span className="text-slate-600">Homeowners Hazard Insurance:</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(calculations.monthlyInsurance)}</span>
              </div>
              {calculations.monthlyHoa > 0 && (
                <div className="flex justify-between py-1.5 border-b border-slate-200">
                  <span className="text-slate-600">HOA Assessment:</span>
                  <span className="font-mono font-bold text-slate-900">{formatCurrency(calculations.monthlyHoa)}</span>
                </div>
              )}
            </div>

            <div className="mt-6 p-5 rounded-2xl bg-navy-900 text-white shadow-md border border-gold-500/40">
              <div className="text-[11px] font-semibold text-gold-400 uppercase tracking-wider">
                Total Estimated Monthly PITI
              </div>
              <div className="font-mono font-bold text-3xl text-gold-400 mt-1">
                {formatCurrency(calculations.totalMonthlyPayment)}
                <span className="text-xs text-slate-300 font-normal"> / mo</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a href="/tools/tdi-rate-calculator" className="w-full btn-gold text-xs flex items-center justify-center gap-1.5">
              <span>Calculate One-Time Title Insurance Fees →</span>
            </a>
          </div>

        </div>

      </div>

    </div>
  );
}
