import React, { useState } from 'react';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Loader2, 
  DollarSign, 
  Building2, 
  Calendar, 
  UserCheck, 
  Mail,
  ShieldCheck,
  Phone
} from 'lucide-react';
import { formatCurrency } from '../../../lib/utils';

export default function ContractDropParser() {
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedData, setParsedData] = useState<any>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [gfNumber, setGfNumber] = useState('');

  // Editable fields after drop
  const [buyerName, setBuyerName] = useState('Marcus & Elena Vance');
  const [sellerName, setSellerName] = useState('Robert H. Thornton');
  const [propertyAddress, setPropertyAddress] = useState('1105 Eagle Ridge Dr, Decatur, TX 76234');
  const [salesPrice, setSalesPrice] = useState(485000);
  const [earnestMoney, setEarnestMoney] = useState(5000);
  const [closingDate, setClosingDate] = useState('2026-09-30');
  const [listingAgent, setListingAgent] = useState('Sarah Jenkins (Premier Realty Decatur)');
  const [buyerAgent, setBuyerAgent] = useState('Michael Cole (North Texas Land Group)');
  const [closerPreference, setCloserPreference] = useState('Debbie Remmele Leatherman (Decatur)');

  const handleFileUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsParsing(true);

    // Simulate smart OCR parsing of standard TREC One to Four Family Contract
    setTimeout(() => {
      setIsParsing(false);
      setParsedData({
        fileName: files[0].name,
        confidence: 99.4,
        pages: 11,
      });
    }, 1200);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const newGf = `GF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGfNumber(newGf);
    setIsSubmitted(true);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-6 sm:p-8 border-b border-gold-500/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Realtor & Broker Direct Intake Engine
            </div>
            <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
              1-Click Intelligent Contract Drop
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Skip multi-page order forms. Upload your signed TREC or commercial purchase agreement (PDF) for immediate parsing and escrow file opening.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-navy-800 px-4 py-2 rounded-xl border border-navy-700 text-xs text-slate-300 self-start sm:self-auto">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Direct to orderdesk@wisetitle.com</span>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-10">
        
        {/* Upload Dropzone */}
        {!parsedData && !isSubmitted && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-10 sm:p-16 text-center transition-all cursor-pointer ${
              isDragging
                ? 'border-gold-500 bg-gold-50/50 scale-[1.01]'
                : 'border-slate-300 hover:border-navy-900 hover:bg-slate-50'
            }`}
            onClick={() => document.getElementById('contract-file-input')?.click()}
          >
            <input
              id="contract-file-input"
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={(e) => handleFileUpload(e.target.files)}
            />

            {isParsing ? (
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-gold-500 animate-spin" />
                <div className="space-y-1">
                  <div className="font-serif font-bold text-navy-900 text-lg">Parsing Contract Details...</div>
                  <p className="text-xs text-slate-500">Reading parties, legal description, earnest money, and closing timeline...</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-navy-50 border border-navy-100 flex items-center justify-center text-navy-900 shadow-sm">
                  <UploadCloud className="w-8 h-8 text-gold-600" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-navy-900 text-xl">
                    Drag & Drop Your Purchase Agreement Here
                  </h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Accepts TREC 1-4 Family, Farm & Ranch, Unimproved Property, and Commercial Contracts (.PDF)
                  </p>
                </div>
                <button
                  type="button"
                  className="btn-gold text-xs px-6 py-2.5 shadow"
                >
                  Browse Files from Computer
                </button>
              </div>
            )}
          </div>
        )}

        {/* Verification & Instant Submission Form */}
        {parsedData && !isSubmitted && (
          <form onSubmit={handleSubmitOrder} className="space-y-6 max-w-3xl mx-auto animate-in fade-in">
            
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                <div className="text-xs text-emerald-950">
                  <span className="font-bold">Contract Successfully Parsed: </span>
                  <span>{parsedData.fileName} (Extracted with {parsedData.confidence}% confidence)</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setParsedData(null)}
                className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline shrink-0"
              >
                Upload Different File
              </button>
            </div>

            <div className="border-b border-slate-200 pb-3">
              <span className="font-serif font-bold text-navy-900 text-xl">
                Verify Extracted Contract Details
              </span>
              <p className="text-xs text-slate-500">Review the auto-extracted fields before opening your escrow order ticket.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              <div className="sm:col-span-2">
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Property Address
                </label>
                <input
                  type="text"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Buyer(s)
                </label>
                <input
                  type="text"
                  value={buyerName}
                  onChange={(e) => setBuyerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Seller(s)
                </label>
                <input
                  type="text"
                  value={sellerName}
                  onChange={(e) => setSellerName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Sales Price ($)
                </label>
                <input
                  type="number"
                  value={salesPrice}
                  onChange={(e) => setSalesPrice(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-bold focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Earnest Money Deposit ($)
                </label>
                <input
                  type="number"
                  value={earnestMoney}
                  onChange={(e) => setEarnestMoney(Number(e.target.value))}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Closing Date Specified
                </label>
                <input
                  type="date"
                  value={closingDate}
                  onChange={(e) => setClosingDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Preferred Closer / Office
                </label>
                <select
                  value={closerPreference}
                  onChange={(e) => setCloserPreference(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-semibold focus:ring-2 focus:ring-gold-500"
                >
                  <option value="Debbie Remmele Leatherman (Decatur)">Debbie Remmele Leatherman (Decatur HQ)</option>
                  <option value="Bridgeport Closer Team (1602 Halsell)">Bridgeport Closer Team (1602 Halsell St)</option>
                  <option value="First Available Escrow Officer">First Available Senior Closer</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Listing Agent / Broker
                </label>
                <input
                  type="text"
                  value={listingAgent}
                  onChange={(e) => setListingAgent(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                />
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Buyer's Agent / Broker
                </label>
                <input
                  type="text"
                  value={buyerAgent}
                  onChange={(e) => setBuyerAgent(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium focus:ring-2 focus:ring-gold-500"
                />
              </div>

            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="btn-gold text-sm px-8 py-3.5 flex items-center gap-2 shadow-lg"
              >
                <span>Confirm & Open Title File Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>
        )}

        {/* Confirmation State */}
        {isSubmitted && (
          <div className="max-w-2xl mx-auto bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-card text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-gold-600">
                Title Order Opened Successfully
              </div>
              <h3 className="font-serif font-bold text-navy-950 text-2xl sm:text-3xl">
                Guaranty File Assigned: <span className="text-gold-600">{gfNumber}</span>
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Our sovereignty title plant examiners in Decatur have initiated the title search on <strong>{propertyAddress}</strong>.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 text-xs text-left space-y-2.5 shadow-sm">
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 font-semibold">Assigned Escrow Officer:</span>
                <span className="font-bold text-navy-900">{closerPreference}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 font-semibold">Contract Sales Price:</span>
                <span className="font-mono font-bold text-slate-900">{formatCurrency(salesPrice)}</span>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-1.5">
                <span className="text-slate-500 font-semibold">Target Closing Date:</span>
                <span className="font-bold text-slate-900">{closingDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-semibold">Automated Alerts Dispatched:</span>
                <span className="text-emerald-700 font-semibold">orderdesk@wisetitle.com & All Agents</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setParsedData(null);
                }}
                className="btn-outline text-xs"
              >
                Open Another Title Order
              </button>
              <a
                href="/tools/tdi-rate-calculator"
                className="btn-gold text-xs"
              >
                Calculate Title Fees for This File →
              </a>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
