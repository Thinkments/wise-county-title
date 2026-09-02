import React, { useState } from 'react';
import { TITLE_GLOSSARY } from '../../lib/glossary';
import { HelpCircle, ExternalLink } from 'lucide-react';

interface Props {
  term: string;
  displayText?: string;
}

export default function GlossaryHovercard({ term, displayText }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const glossaryItem = TITLE_GLOSSARY[term];

  if (!glossaryItem) {
    return <span className="underline decoration-dotted text-navy-900 font-medium">{displayText || term}</span>;
  }

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
    >
      <button
        type="button"
        className="inline-flex items-center gap-0.5 text-navy-900 font-semibold underline decoration-gold-500 decoration-2 underline-offset-2 hover:text-gold-700 cursor-help transition-colors"
        aria-expanded={isOpen}
      >
        <span>{displayText || term}</span>
        <HelpCircle className="w-3 h-3 text-gold-600 inline opacity-70" />
      </button>

      {isOpen && (
        <div 
          role="tooltip"
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 sm:w-80 p-4 bg-navy-950 text-white rounded-xl shadow-2xl border border-gold-500/40 z-50 text-left text-xs animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-navy-800">
            <span className="font-serif font-bold text-gold-400 text-sm">{glossaryItem.term}</span>
            <span className="text-[10px] uppercase font-semibold text-slate-400 bg-navy-900 px-1.5 py-0.5 rounded">
              {glossaryItem.category}
            </span>
          </div>

          <p className="text-slate-200 leading-relaxed text-[11px]">
            {glossaryItem.definition}
          </p>

          {glossaryItem.deepLink && (
            <a 
              href={glossaryItem.deepLink}
              className="mt-2.5 pt-1.5 border-t border-navy-800/80 text-[11px] text-gold-400 hover:text-gold-300 font-medium flex items-center justify-between transition-colors"
            >
              <span>Learn more in our guide</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}
    </span>
  );
}
