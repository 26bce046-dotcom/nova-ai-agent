import React, { useState } from 'react';
import { BatteryCharging, Wind, Sun, CheckCircle, AlertOctagon } from 'lucide-react';
import { COMPARATIVE_FRONTIERS, FrontierTopic } from '../data/breakthrough-data';

export const ComparativeFrontiers: React.FC = () => {
  const [selectedFrontier, setSelectedFrontier] = useState<string>('perovskite-tandem');

  const activeData =
    COMPARATIVE_FRONTIERS.find((f) => f.id === selectedFrontier) || COMPARATIVE_FRONTIERS[0];

  return (
    <section className="py-12 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Cross-Sector Clean Energy Horizons
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            Compare Against Parallel Renewable Frontiers
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Examine how perovskite-silicon tandem solar compares to other recent breakthrough technologies across
            grid-scale storage and deep-water wind in terms of verified readiness and active risks.
          </p>
        </div>

        {/* Frontier Selector Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {COMPARATIVE_FRONTIERS.map((frontier) => {
            const isSelected = frontier.id === selectedFrontier;
            return (
              <button
                key={frontier.id}
                onClick={() => setSelectedFrontier(frontier.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {frontier.sector === 'Solar PV' && <Sun className="w-3.5 h-3.5 text-amber-400" />}
                {frontier.sector === 'Battery Storage' && (
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
                )}
                {frontier.sector === 'Wind Energy' && <Wind className="w-3.5 h-3.5 text-sky-400" />}
                <span>{frontier.title}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-slate-800 text-slate-300' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {frontier.sector}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Frontier Detailed Comparison */}
        <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-200">
            <div>
              <h3 className="text-lg font-bold text-slate-900">{activeData.title}</h3>
              <p className="mt-1 text-xs text-slate-600">{activeData.summary}</p>
            </div>
            <div className="text-xs font-mono text-slate-500 shrink-0">
              Commercial Status:{' '}
              <span className="font-bold uppercase text-slate-900">{activeData.commercialStatus}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Verified Facts */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-emerald-800 font-mono">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Verified Milestones</span>
              </div>

              {activeData.verifiedFacts.map((fact, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="font-semibold text-slate-900">{fact.point}</div>
                  <div className="mt-1 text-slate-600">{fact.detail}</div>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">Source: {fact.source}</div>
                </div>
              ))}
            </div>

            {/* Uncertainties */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase text-amber-800 font-mono">
                <AlertOctagon className="w-4 h-4 text-amber-600" />
                <span>Active Uncertainties</span>
              </div>

              {activeData.uncertainties.map((unc, idx) => (
                <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200 text-xs shadow-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-slate-900">{unc.point}</span>
                    <span className="text-[10px] font-mono uppercase text-amber-700 font-bold">
                      {unc.riskLevel} Risk
                    </span>
                  </div>
                  <div className="mt-1 text-slate-600">{unc.detail}</div>
                  <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <strong className="text-slate-700">Mitigation: </strong>
                    {unc.mitigation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
