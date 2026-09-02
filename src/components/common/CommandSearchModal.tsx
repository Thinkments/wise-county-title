import React, { useState, useEffect, useRef } from 'react';
import { Search, X, BookOpen, Sparkles, MapPin, ArrowRight, ShieldCheck } from 'lucide-react';
import { MASTER_300_TOPICS } from '../../lib/knowledge-taxonomy';
import { REGISTERED_TOOLS } from '../../lib/tools-manifest';

export default function CommandSearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Combined search results
  const filteredTools = REGISTERED_TOOLS.filter((t) =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.fallbackSummary.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 3);

  const filteredTopics = MASTER_300_TOPICS.filter((t) =>
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.summary.toLowerCase().includes(query.toLowerCase()) ||
    t.subCluster.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 7);

  const totalResults = [
    ...filteredTools.map((t) => ({ type: 'tool', title: t.name, url: t.slug, desc: t.fallbackSummary })),
    ...filteredTopics.map((t) => ({ type: 'topic', title: t.title, url: `/knowledge-hub/${t.pillar}/${t.slug}`, desc: t.summary })),
  ];

  const handleSelect = (url: string) => {
    setIsOpen(false);
    window.location.href = url;
  };

  return (
    <>
      {/* Global Quick Search Header Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-navy-900 border border-slate-200 text-xs font-medium transition-all shadow-sm group"
        aria-label="Open Universal Real Estate & Title Search"
      >
        <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-gold-600 transition-colors" />
        <span>Quick Search...</span>
        <kbd className="px-1.5 py-0.5 rounded bg-white text-[10px] text-slate-400 border border-slate-200 font-mono shadow-xs">
          Ctrl K
        </kbd>
      </button>

      {/* Glassmorphic Modal Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-navy-950/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
              <Search className="w-5 h-5 text-gold-600 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search 300 topics, calculators, legal guides, or office locations..."
                className="w-full bg-transparent text-sm sm:text-base font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results List */}
            <div className="p-3 overflow-y-auto space-y-1 divide-y divide-slate-100">
              {totalResults.length > 0 ? (
                totalResults.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelect(item.url)}
                    className={`p-3 rounded-2xl cursor-pointer transition-all flex items-start justify-between gap-3 ${
                      selectedIndex === idx ? 'bg-navy-900 text-white shadow-md' : 'hover:bg-slate-50 text-slate-800'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {item.type === 'tool' ? (
                          <span className={`badge-gold text-[10px] ${selectedIndex === idx ? 'bg-gold-500 text-navy-950 font-bold' : ''}`}>
                            🛠️ Interactive Tool
                          </span>
                        ) : (
                          <span className={`text-[10px] uppercase font-bold tracking-wider ${selectedIndex === idx ? 'text-gold-300' : 'text-gold-600'}`}>
                            📄 Research Guide
                          </span>
                        )}
                        <span className={`text-xs font-bold ${selectedIndex === idx ? 'text-white' : 'text-navy-900'}`}>
                          {item.title}
                        </span>
                      </div>
                      <p className={`text-[11px] line-clamp-1 ${selectedIndex === idx ? 'text-slate-300' : 'text-slate-500'}`}>
                        {item.desc}
                      </p>
                    </div>

                    <ArrowRight className={`w-4 h-4 shrink-0 mt-2 ${selectedIndex === idx ? 'text-gold-400' : 'text-slate-300'}`} />
                  </div>
                ))
              ) : (
                <div className="p-8 text-center space-y-2">
                  <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                  <div className="text-sm font-bold text-navy-900">No matching guides found</div>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try searching for "TDI rate", "homestead", "1-d-1 ag", "Lady Bird deed", "T-47", or "Decatur".
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 px-5">
              <div className="flex items-center gap-3">
                <span>Navigate: <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">↑</kbd> <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">↓</kbd></span>
                <span>Select: <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Enter</kbd></span>
                <span>Close: <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border">Esc</kbd></span>
              </div>
              <span className="font-semibold text-navy-900">300 Texas Title Guides</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
