import React, { useState } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Scale, 
  Phone, 
  ChevronRight, 
  HelpCircle,
  FileText,
  Calculator,
  ArrowUpRight
} from 'lucide-react';

interface KnowledgeAnswer {
  keywords: string[];
  title: string;
  response: string;
  statute: string;
  linkText: string;
  linkUrl: string;
}

const KNOWLEDGE_BASE: KnowledgeAnswer[] = [
  {
    keywords: ['probate', 'will', 'deceased', 'heir', 'heirship', 'death', 'died'],
    title: 'Deceased Owner & Heirship Resolution',
    response:
      'In Texas, title cannot pass solely on an unprobated will. Under Texas Estates Code §203, if the deceased owner passed more than 4 years ago without outstanding debts, title can be cleared using an Affidavit of Heirship signed by 2 disinterested witnesses. Alternatively, formal probate or Muniment of Title is required.',
    statute: 'Texas Estates Code §203 & §256.003',
    linkText: 'Learn About Heirship Affidavits →',
    linkUrl: '/knowledge-hub/title-clearance/affidavit-of-heirship-texas-estates-code-203',
  },
  {
    keywords: ['mortgage', 'lien', 'unreleased', 'statute of limitations', 'old loan', 'defunct bank'],
    title: 'Unreleased Mortgage & 4-Year Statute of Limitations',
    response:
      'Under Texas Civil Practice & Remedies Code §16.035, real property liens have a strict 4-year statute of limitations from the maturity date stated in the recorded Deed of Trust. If 4 years have passed, the lien is extinguished as a matter of law without court action.',
    statute: 'Texas CPRC §16.035',
    linkText: '4-Year Mortgage Statute Guide →',
    linkUrl: '/knowledge-hub/title-clearance/4-year-statute-of-limitations-deed-of-trust-cprc-16-035',
  },
  {
    keywords: ['rate', 'cost', 'premium', 'calculator', 'how much', 'fee', 'tdi', 'promulgated', 'r-1', 'r-5'],
    title: 'Texas TDI Promulgated Rates & Simultaneous Issue',
    response:
      'All Texas title insurance premiums are promulgated by the Texas Department of Insurance (TDI) under Basic Manual Rule R-1. When an Owner’s Policy and Lender’s Policy are issued simultaneously in the same transaction, Rule R-5 discounts the Lender’s Policy to a flat $100.',
    statute: 'Texas Insurance Code Chapter 2703 & TDI Rule R-5',
    linkText: 'Open Live TDI Rate Calculator →',
    linkUrl: '/tools/tdi-rate-calculator',
  },
  {
    keywords: ['homestead', 'tax', 'exemption', 'form 50-114', 'cad', 'appraisal cap', 'over 65'],
    title: 'Texas Homestead Exemption (Form 50-114)',
    response:
      'Texas Tax Code §11.13 grants homestead property tax exemptions with a 10% annual appraisal cap. You can file Form 50-114 directly with Wise CAD (or your county appraisal district) free of charge with retroactive filing allowed up to 2 years.',
    statute: 'Texas Tax Code §11.13 & §11.43',
    linkText: 'Homestead Exemption Assistant →',
    linkUrl: '/tools/homestead-exemption-assistant',
  },
  {
    keywords: ['t47', 't-47', 'survey', 'affidavit', 'boundary', 'fence', 'pool'],
    title: 'Texas T-47 Residential Survey Affidavit',
    response:
      'The Texas T-47 Affidavit certifies that no changes to property boundaries, fences, pools, or structures have occurred since the last existing survey date. If changes exist, declare them in Paragraph 4 or order an updated survey.',
    statute: 'TDI Basic Manual Rule R-16 & TREC Paragraph 6C',
    linkText: 'Launch T-47 Affidavit Generator →',
    linkUrl: '/tools/t47-affidavit-wizard',
  },
  {
    keywords: ['lady bird', 'enhanced life estate', 'remainderman', 'remaindermen', 'medicaid', 'merp'],
    title: 'Texas Lady Bird Deeds (Enhanced Life Estate)',
    response:
      'A Lady Bird Deed conveys property to remaindermen while reserving the grantor the unrestricted right to sell, lease, or mortgage during life. Upon death, title transfers immediately outside probate, avoiding Medicaid Estate Recovery (MERP).',
    statute: 'Texas Property Code §5.001 & Common Law Life Estate',
    linkText: 'Lady Bird Deed Curative Guide →',
    linkUrl: '/knowledge-hub/homeowner/lady-bird-deed-texas-enhanced-life-estate-probate-avoidance',
  },
];

export default function AiConciergeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<
    Array<{ sender: 'ai' | 'user'; text: string; statute?: string; linkText?: string; linkUrl?: string }>
  >([
    {
      sender: 'ai',
      text: 'Hello! I am the Wise County Title Knowledge Concierge. Ask me any question about Texas title insurance rates, survey affidavits, homestead caps, or curative probate issues.',
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const userText = textToSend || query;
    if (!userText.trim()) return;

    const lower = userText.toLowerCase();
    const newMessages = [...messages, { sender: 'user' as const, text: userText }];

    // Find best match in knowledge base
    let bestMatch: KnowledgeAnswer | null = null;
    for (const item of KNOWLEDGE_BASE) {
      if (item.keywords.some((kw) => lower.includes(kw))) {
        bestMatch = item;
        break;
      }
    }

    if (bestMatch) {
      newMessages.push({
        sender: 'ai',
        text: bestMatch.response,
        statute: bestMatch.statute,
        linkText: bestMatch.linkText,
        linkUrl: bestMatch.linkUrl,
      });
    } else {
      newMessages.push({
        sender: 'ai',
        text: `Regarding "${userText}": In Texas real estate and title examination, specific facts require review of the recorded county tract books and deed records. For formal title examination or deed preparation, our co-located legal partner The Berry White Law Firm, PLLC is available for direct consultation.`,
        statute: 'Wise County Title Sovereignty Plant Records (Est. 1878)',
        linkText: 'Explore 300-Page Research Knowledge Hub →',
        linkUrl: '/knowledge-hub',
      });
    }

    setMessages(newMessages);
    setQuery('');
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Deal Doctor Assistant"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-navy-900 text-white border-2 border-gold-500 shadow-2xl hover:scale-105 hover:bg-navy-950 transition-all duration-200 group"
      >
        <div className="w-8 h-8 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center font-bold text-xs border border-gold-400">
          🦉
        </div>
        <span className="text-xs font-bold tracking-wide group-hover:text-gold-300">
          Ask Deal Doctor AI
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
      </button>

      {/* Slide-Up Chat Modal */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white p-4 border-b border-gold-500/40 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gold-500 text-navy-950 font-bold flex items-center justify-center text-sm shadow-sm">
                🦉
              </div>
              <div>
                <div className="font-serif font-bold text-sm text-white flex items-center gap-1.5">
                  <span>Deal Doctor AI</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-gold-500/20 text-gold-300 border border-gold-500/40">
                    2026 Edition
                  </span>
                </div>
                <div className="text-[10px] text-slate-300">
                  Wise County Title & Berry White Law Assistant
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-surface text-xs max-h-80">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[88%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-navy-900 text-white rounded-br-sm'
                      : 'bg-white text-slate-800 border border-slate-200 shadow-sm rounded-bl-sm'
                  }`}
                >
                  <p>{m.text}</p>

                  {m.statute && (
                    <div className="mt-2 pt-2 border-t border-slate-100 text-[10px] font-mono text-gold-700 font-bold flex items-center gap-1">
                      <Scale className="w-3 h-3" />
                      <span>{m.statute}</span>
                    </div>
                  )}

                  {m.linkUrl && (
                    <a
                      href={m.linkUrl}
                      className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold text-navy-900 hover:text-gold-600 block"
                    >
                      <span>{m.linkText}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[10px]">
            <button
              type="button"
              onClick={() => handleSend('How do I clear an unprobated will?')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-gold-50 text-slate-700 hover:text-navy-900 border border-slate-200 shrink-0"
            >
              📜 Unprobated Will
            </button>
            <button
              type="button"
              onClick={() => handleSend('What is the TDI Rule R-5 discount?')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-gold-50 text-slate-700 hover:text-navy-900 border border-slate-200 shrink-0"
            >
              💰 TDI Rule R-5
            </button>
            <button
              type="button"
              onClick={() => handleSend('How does a Lady Bird deed work?')}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-gold-50 text-slate-700 hover:text-navy-900 border border-slate-200 shrink-0"
            >
              🏡 Lady Bird Deed
            </button>
          </div>

          {/* Input & Call CTA */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask about rates, T-47, probate..."
                className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs text-slate-900 focus:ring-2 focus:ring-gold-500"
              />
              <button
                type="submit"
                aria-label="Send query"
                className="p-2 rounded-xl bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold shadow"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
              <span>Need attorney consult?</span>
              <a
                href="tel:9406833581"
                className="font-bold text-navy-900 hover:text-gold-600 flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-gold-600" />
                (940) 683-3581
              </a>
            </div>
          </div>

        </div>
      )}
    </>
  );
}
