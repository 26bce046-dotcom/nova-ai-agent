import React from 'react';
import { Sun, FileText, Search } from 'lucide-react';

interface HeaderProps {
  onOpenReport: () => void;
  onOpenAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReport, onOpenAssistant }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#overview"
            className="flex items-center gap-2 text-slate-950 font-bold text-lg tracking-tight whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
          >
            <span className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
              <Sun className="w-4 h-4" />
            </span>
            <span>HeliosTandem</span>
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <a href="#overview" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
              Breakthrough
            </a>
            <a href="#cell-physics" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
              Cell Physics
            </a>
            <a href="#verification-matrix" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
              Facts & Uncertainty
            </a>
            <a href="#lcoe-simulator" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
              LCOE Economics
            </a>
            <a href="#timeline" className="hover:text-slate-950 transition-colors whitespace-nowrap shrink-0">
              Milestone Timeline
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenAssistant}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 border border-slate-200"
              aria-label="Ask Research Question"
            >
              <Search className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Query AI Model</span>
              <span className="sm:hidden">Ask AI</span>
            </button>
            <button
              onClick={onOpenReport}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
              aria-label="Download Research Briefing"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Executive Brief</span>
              <span className="sm:hidden">Brief</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
