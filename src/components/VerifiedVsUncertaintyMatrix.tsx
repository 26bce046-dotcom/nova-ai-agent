import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldCheck,
  Flame,
  Search,
  BookOpen,
} from 'lucide-react';
import { MAIN_BREAKTHROUGH } from '../data/breakthrough-data';

export const VerifiedVsUncertaintyMatrix: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'uncertainties'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const verifiedFacts = MAIN_BREAKTHROUGH.verifiedFacts;
  const uncertainties = MAIN_BREAKTHROUGH.uncertainties;

  const filteredFacts = verifiedFacts.filter((item) => {
    if (activeFilter === 'uncertainties') return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
  });

  const filteredUncertainties = uncertainties.filter((item) => {
    if (activeFilter === 'verified') return false;
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q);
  });

  return (
    <section id="verification-matrix" className="py-12 border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Evidence-Based Scientific Audit
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Verified Empirical Facts vs. Active Uncertainties
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Rigorous scientific and commercial evaluation distinguishing third-party verified achievements from
              unresolved commercialization and physics challenges.
            </p>
          </div>

          {/* Interactive Filter Buttons (segmented control) */}
          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg shadow-xs shrink-0">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              All Analysis ({verifiedFacts.length + uncertainties.length})
            </button>
            <button
              onClick={() => setActiveFilter('verified')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'verified'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Verified Facts ({verifiedFacts.length})
            </button>
            <button
              onClick={() => setActiveFilter('uncertainties')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeFilter === 'uncertainties'
                  ? 'bg-amber-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Uncertainties ({uncertainties.length})
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-6 max-w-md">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search facts, testing labs, or risks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>
        </div>

        {/* Two-Column Comparison Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Column 1: Verified Facts */}
          {(activeFilter === 'all' || activeFilter === 'verified') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-base font-bold text-slate-900">Verified Empirical Facts</h3>
                </div>
                <span className="text-xs font-mono text-emerald-700 font-semibold">
                  {filteredFacts.length} Certified Milestones
                </span>
              </div>

              {filteredFacts.map((fact) => (
                <div
                  key={fact.id}
                  className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>VERIFIED · {fact.evidenceType}</span>
                      </div>
                      <h4 className="mt-1 text-base font-bold text-slate-900">{fact.title}</h4>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-bold font-mono text-emerald-700">
                        {fact.confidenceRating}%
                      </div>
                      <div className="text-[10px] uppercase font-mono text-slate-400">Confidence</div>
                    </div>
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {fact.summary}
                  </p>

                  {/* Clean unboxed metadata footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="inline-flex items-center gap-1.5 flex-wrap">
                      <span className="font-medium text-slate-700">{fact.testingBody}</span>
                      <span className="text-slate-300 font-mono">/</span>
                      <span className="text-emerald-800 font-mono text-[11px]">{fact.date}</span>
                    </div>

                    <a
                      href={fact.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 font-medium text-emerald-700 hover:text-emerald-800 transition-colors"
                    >
                      <span>Primary Source</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Column 2: Uncertainties and Challenges */}
          {(activeFilter === 'all' || activeFilter === 'uncertainties') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-amber-200">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">Uncertainties & Commercial Bottlenecks</h3>
                </div>
                <span className="text-xs font-mono text-amber-700 font-semibold">
                  {filteredUncertainties.length} Critical Risks
                </span>
              </div>

              {filteredUncertainties.map((unc) => (
                <div
                  key={unc.id}
                  className="p-5 bg-white rounded-xl border border-slate-200 shadow-xs hover:border-amber-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-amber-700 font-medium">
                        <Flame className="w-3.5 h-3.5" />
                        <span className="uppercase">
                          {unc.severity === 'high' ? 'High Severity Risk' : 'Medium Severity Risk'}
                        </span>
                      </div>
                      <h4 className="mt-1 text-base font-bold text-slate-900">{unc.title}</h4>
                    </div>
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {unc.summary}
                  </p>

                  {/* Scientific Mitigation Box */}
                  <div className="mt-3.5 p-3 rounded-lg bg-amber-50/60 border border-amber-200/60 text-xs">
                    <span className="font-semibold text-amber-900">Active Mitigation Roadmap: </span>
                    <span className="text-slate-700">{unc.mitigationRoadmap}</span>
                  </div>

                  {/* Clean unboxed metadata footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="inline-flex items-center gap-1.5 flex-wrap">
                      <span className="font-medium text-slate-700">{unc.testingBody}</span>
                      <span className="text-slate-300 font-mono">/</span>
                      <span className="text-amber-800 font-mono text-[11px]">{unc.riskFactor}</span>
                    </div>

                    <a
                      href={unc.sourceUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-1 font-medium text-amber-700 hover:text-amber-800 transition-colors"
                    >
                      <span>Report Citation</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reliable Sources Verification Bar */}
        <div className="mt-12 p-6 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500">
            <BookOpen className="w-4 h-4 text-slate-700" />
            <span>Reliable Primary Sources & Documentation</span>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {MAIN_BREAKTHROUGH.sources.map((source, index) => (
              <a
                key={index}
                href={source.url}
                target="_blank"
                rel="noreferrer noopener"
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-white transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="text-[11px] font-mono text-slate-500 flex items-center justify-between">
                    <span>{source.organization}</span>
                    <span>{source.publicationDate}</span>
                  </div>
                  <div className="mt-2 text-xs font-semibold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {source.title}
                  </div>
                  <p className="mt-1.5 text-[11px] text-slate-500 line-clamp-2">
                    {source.summary}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-medium text-slate-700 group-hover:text-slate-950">
                  <span>Open Official Document</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
