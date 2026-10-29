import React, { useState } from 'react';
import { Calculator, ArrowUpRight, TrendingDown, DollarSign, Clock, RefreshCw } from 'lucide-react';
import { calculateLCOE } from '../utils/solar-calculations';

export const LcoeSimulator: React.FC = () => {
  // Tandem parameters
  const [tandemCapex, setTandemCapex] = useState<number>(0.22); // $/W
  const [tandemLifespan, setTandemLifespan] = useState<number>(20); // years
  const [tandemDegradation, setTandemDegradation] = useState<number>(0.8); // %/year
  const [tandemEfficiency, setTandemEfficiency] = useState<number>(24.5); // %

  // Shared project parameters
  const [irradiance, setIrradiance] = useState<number>(1800); // kWh/m^2/year
  const [bosCost, setBosCost] = useState<number>(0.55); // $/W (racks, land, wiring, inverters)
  const [discountRate, setDiscountRate] = useState<number>(6.0); // %

  // Standard Silicon Benchmark (TOPCon / PERC)
  const siliconBaseline = calculateLCOE({
    systemCapexPerWatt: 0.12, // mature commodity module
    annualOpexPerWatt: 0.010,
    moduleEfficiency: 22.0,
    annualDegradation: 0.004, // 0.4%/yr standard warranty
    lifetimeYears: 25,
    discountRate: discountRate / 100,
    annualIrradianceKwhM2: irradiance,
    balanceOfSystemPerWatt: bosCost,
  });

  // Tandem Calculation
  const tandemResult = calculateLCOE({
    systemCapexPerWatt: tandemCapex,
    annualOpexPerWatt: 0.011,
    moduleEfficiency: tandemEfficiency,
    annualDegradation: tandemDegradation / 100,
    lifetimeYears: tandemLifespan,
    discountRate: discountRate / 100,
    annualIrradianceKwhM2: irradiance,
    balanceOfSystemPerWatt: bosCost,
  });

  const lcoeDelta = Math.round((tandemResult.lcoePerMwh - siliconBaseline.lcoePerMwh) * 10) / 10;
  const isCompetitive = tandemResult.lcoePerMwh <= siliconBaseline.lcoePerMwh;

  const resetDefaults = () => {
    setTandemCapex(0.22);
    setTandemLifespan(20);
    setTandemDegradation(0.8);
    setTandemEfficiency(24.5);
    setIrradiance(1800);
    setBosCost(0.55);
    setDiscountRate(6.0);
  };

  return (
    <section id="lcoe-simulator" className="py-12 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Techno-Economic Modeling & Parity Analysis
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              Levelized Cost of Electricity (LCOE) Simulator
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Simulate the economic breakeven trade-off between higher tandem module efficiency and manufacturing CAPEX
              premiums over 25-year standard crystalline silicon.
            </p>
          </div>

          <button
            onClick={resetDefaults}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap self-start md:self-auto border border-slate-200"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Baseline</span>
          </button>
        </div>

        {/* Workspace Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-5 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
              <Calculator className="w-4 h-4 text-slate-700" />
              <h3 className="text-sm font-semibold text-slate-900">Tandem Sensitivity Controls</h3>
            </div>

            {/* Slider 1: Tandem Module Efficiency */}
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <label className="text-xs font-medium text-slate-700">Tandem Module Efficiency</label>
                <span className="font-mono text-xs font-bold text-slate-900">{tandemEfficiency}%</span>
              </div>
              <input
                type="range"
                min="23.0"
                max="28.0"
                step="0.1"
                value={tandemEfficiency}
                onChange={(e) => setTandemEfficiency(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>23.0% (Entry)</span>
                <span>24.5% (Shipped)</span>
                <span>26.9% (Record)</span>
              </div>
            </div>

            {/* Slider 2: Module Capex */}
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <label className="text-xs font-medium text-slate-700">Tandem Module Capex ($/W)</label>
                <span className="font-mono text-xs font-bold text-slate-900">${tandemCapex.toFixed(2)}/W</span>
              </div>
              <input
                type="range"
                min="0.12"
                max="0.38"
                step="0.01"
                value={tandemCapex}
                onChange={(e) => setTandemCapex(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>$0.12 (Parity)</span>
                <span>$0.22 (Current Pilot)</span>
                <span>$0.38 (Early Batch)</span>
              </div>
            </div>

            {/* Slider 3: Lifetime Years */}
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <label className="text-xs font-medium text-slate-700">Field Operational Lifespan</label>
                <span className="font-mono text-xs font-bold text-slate-900">{tandemLifespan} Years</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="1"
                value={tandemLifespan}
                onChange={(e) => setTandemLifespan(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>10 yr (High Risk)</span>
                <span>20 yr (Target)</span>
                <span>30 yr (Silicon Parity)</span>
              </div>
            </div>

            {/* Slider 4: Degradation Rate */}
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <label className="text-xs font-medium text-slate-700">Annual Degradation Rate</label>
                <span className="font-mono text-xs font-bold text-slate-900">{tandemDegradation}% / yr</span>
              </div>
              <input
                type="range"
                min="0.3"
                max="2.0"
                step="0.1"
                value={tandemDegradation}
                onChange={(e) => setTandemDegradation(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-900"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-1">
                <span>0.4% (Silicon Level)</span>
                <span>0.8% (Current Est.)</span>
                <span>2.0% (Fast Fade)</span>
              </div>
            </div>

            {/* Balance of System & Resource */}
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-600 block mb-1">Balance of System</label>
                <select
                  value={bosCost}
                  onChange={(e) => setBosCost(Number(e.target.value))}
                  className="w-full p-1.5 bg-white border border-slate-200 rounded-md font-mono"
                >
                  <option value={0.45}>Low BOS ($0.45/W)</option>
                  <option value={0.55}>Utility Fixed ($0.55/W)</option>
                  <option value={0.70}>Tracker BOS ($0.70/W)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-600 block mb-1">Solar Resource</label>
                <select
                  value={irradiance}
                  onChange={(e) => setIrradiance(Number(e.target.value))}
                  className="w-full p-1.5 bg-white border border-slate-200 rounded-md font-mono"
                >
                  <option value={1500}>Central Europe (1500 kWh/m²)</option>
                  <option value={1800}>US Sunbelt (1800 kWh/m²)</option>
                  <option value={2200}>Desert High (2200 kWh/m²)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Results Comparison Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Direct Head-to-Head Comparison Card */}
            <div className="p-6 bg-slate-900 text-white rounded-2xl shadow-md">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                LCOE Head-to-Head Comparison
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Benchmark Silicon */}
                <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                  <div className="text-xs text-slate-400 font-medium">Standard Silicon Benchmark</div>
                  <div className="mt-1 text-xs text-slate-300">22.0% TOPCon · 25yr lifespan · $0.12/W</div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span className="text-3xl font-mono font-bold text-white">
                      ${siliconBaseline.lcoePerMwh.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ MWh</span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-slate-400">
                    (${siliconBaseline.lcoePerKwh.toFixed(3)} / kWh)
                  </div>
                </div>

                {/* Perovskite Tandem */}
                <div
                  className={`p-4 rounded-xl border ${
                    isCompetitive
                      ? 'bg-emerald-950/40 border-emerald-500/80 ring-1 ring-emerald-500'
                      : 'bg-amber-950/40 border-amber-600/80'
                  }`}
                >
                  <div className="text-xs text-amber-300 font-medium flex items-center justify-between">
                    <span>Perovskite-Silicon Tandem</span>
                    {isCompetitive ? (
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">LCOE ADVANTAGE</span>
                    ) : (
                      <span className="text-[11px] font-mono text-amber-400 font-bold">PREMIUM</span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-slate-300">
                    {tandemEfficiency}% module · {tandemLifespan}yr · ${tandemCapex.toFixed(2)}/W
                  </div>
                  <div className="mt-3 flex items-baseline gap-1">
                    <span
                      className={`text-3xl font-mono font-bold ${
                        isCompetitive ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      ${tandemResult.lcoePerMwh.toFixed(1)}
                    </span>
                    <span className="text-xs font-mono text-slate-400">/ MWh</span>
                  </div>
                  <div className="mt-2 text-[11px] font-mono text-slate-300">
                    Delta vs Silicon: {lcoeDelta > 0 ? `+$${lcoeDelta}` : `-$${Math.abs(lcoeDelta)}`} / MWh
                  </div>
                </div>
              </div>

              {/* Economic Insight Summary */}
              <div className="mt-5 p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300 leading-relaxed">
                <span className="font-semibold text-white">Economic Verdict: </span>
                {isCompetitive ? (
                  <span>
                    Tandem achieves <strong className="text-emerald-400">economic parity</strong>! The +
                    {tandemResult.relativeOutputBoostPercent}% power density advantage dilutes Balance-of-System (racks,
                    land, civil works) costs sufficiently to outweigh the higher module capex.
                  </span>
                ) : (
                  <span>
                    Tandem is currently <strong className="text-amber-400">${lcoeDelta}/MWh higher</strong> than mature
                    silicon. To achieve parity, tandem module manufacturing costs must drop below $
                    {Math.max(0.14, tandemCapex - lcoeDelta * 0.003).toFixed(2)}/W or operational lifespan must reach
                    23+ years.
                  </span>
                )}
              </div>
            </div>

            {/* Area and Energy Productivity Comparison */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs font-mono text-slate-500 uppercase">Power Density (STC)</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-slate-900">
                    {tandemResult.initialOutputWattsPerM2} W/m²
                  </span>
                  <span className="text-xs font-mono text-emerald-600 font-semibold">
                    +{tandemResult.relativeOutputBoostPercent}%
                  </span>
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  vs 220 W/m² for standard silicon. Reduces required land area by ~
                  {Math.round((1 - 220 / tandemResult.initialOutputWattsPerM2) * 100)}%.
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs font-mono text-slate-500 uppercase">Lifetime Energy Yield</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-2xl font-bold font-mono text-slate-900">
                    {tandemResult.lifetimeTotalEnergyKwhPerM2.toLocaleString()}
                  </span>
                  <span className="text-xs font-mono text-slate-500">kWh / m²</span>
                </div>
                <div className="mt-1 text-xs text-slate-600">
                  Total cumulative clean electricity generated per m² over {tandemLifespan} operational years.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
