import React from 'react';
import { ExternalLink, CheckCircle2, AlertTriangle, ArrowRight, Layers } from 'lucide-react';
import { MAIN_BREAKTHROUGH } from '../data/breakthrough-data';

interface HeroBreakthroughProps {
  onExplorePhysics: () => void;
  onExploreVerification: () => void;
}

export const HeroBreakthrough: React.FC<HeroBreakthroughProps> = ({
  onExplorePhysics,
  onExploreVerification,
}) => {
  return (
    <section id="overview" className="pt-8 pb-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Unboxed clean metadata kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 mb-3">
          <span>Renewable Energy Frontier</span>
          <span aria-hidden="true">·</span>
          <span>Photovoltaic Semiconductor Physics</span>
          <span aria-hidden="true">·</span>
          <span>Verified Commercial Delivery: Sept 5, 2024</span>
          <span aria-hidden="true">·</span>
          <span>Fraunhofer ISE Certified</span>
        </div>

        {/* 2-Column Grid Split: Text + High Fidelity Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-[1.15] text-balance">
              First Commercial Deployment of Perovskite-Silicon Tandem Solar Panels
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              In late 2024, solar technology crossed a historic threshold as{' '}
              <strong className="text-slate-900 font-semibold">perovskite-on-silicon tandem modules</strong> transitioned
              from laboratory prototypes to initial commercial delivery to a US utility customer. By layering synthetic
              perovskite crystals over conventional silicon, the dual-junction module breaks through the theoretical
              efficiency ceilings of single-junction silicon.
            </p>

            {/* Key Fact & Uncertainty Summary Highlights */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Verified Empirical Facts</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-normal">
                  24.5% module efficiency commercially delivered from Brandenburg pilot plant; independent 26.9% record
                  verified by Fraunhofer CalLab.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Active Research Uncertainties</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-normal">
                  Decadal field durability under thermal/humidity stress remains unproven; scaling from 100 MW pilot line to
                  multi-GW fabs without yield losses.
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onExplorePhysics}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
              >
                <Layers className="w-4 h-4" />
                <span>Inspect Tandem Physics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onExploreVerification}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 transition-colors"
              >
                <span>Audit Verified Facts vs Risks</span>
              </button>

              <a
                href="https://www.oxfordpv.com/news/20-more-powerful-tandem-solar-panels-enter-commercial-use-first-time-us"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors"
              >
                <span>Oxford PV Release</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Visual Graphic Asset */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 shadow-md group flex-1 min-h-[320px]">
              <img
                src="/src/assets/images/perovskite_tandem_solar_1793284025659.jpg"
                alt="Perovskite-Silicon tandem solar cell cross-section showing blue and amber light absorption paths"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
                <div className="text-xs font-mono uppercase tracking-wider text-amber-300">
                  Monolithic Dual-Junction Architecture
                </div>
                <div className="text-sm font-semibold text-white mt-1">
                  Perovskite Absorber (Blue Spectrum) + Silicon Substrate (Infrared)
                </div>
                <div className="mt-2 text-xs text-slate-300 flex items-center gap-3">
                  <span>Eg ≈ 1.7 eV Top Cell</span>
                  <span aria-hidden="true">·</span>
                  <span>Eg ≈ 1.1 eV Bottom Cell</span>
                  <span aria-hidden="true">·</span>
                  <span>Shockley-Queisser Limit Bypass</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Metric Strip */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs uppercase font-mono text-slate-500 tracking-wider">
              Commercial Module Rating
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold font-mono text-slate-900">24.5</span>
              <span className="text-sm font-mono text-slate-500">%</span>
            </div>
            <div className="mt-1 text-xs text-slate-600">
              Shipped Sept 5, 2024 to US utility
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs uppercase font-mono text-slate-500 tracking-wider">
              Certified World Record
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold font-mono text-amber-600">26.9</span>
              <span className="text-sm font-mono text-slate-500">%</span>
            </div>
            <div className="mt-1 text-xs text-slate-600">
              Fraunhofer CalLab certified (June 2024)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs uppercase font-mono text-slate-500 tracking-wider">
              Surface Power Uplift
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold font-mono text-emerald-600">+15-20</span>
              <span className="text-sm font-mono text-slate-500">%</span>
            </div>
            <div className="mt-1 text-xs text-slate-600">
              More energy vs mainstream 20-22% silicon
            </div>
          </div>

          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="text-xs uppercase font-mono text-slate-500 tracking-wider">
              Theoretical Ceiling
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-3xl font-bold font-mono text-slate-900">43.0</span>
              <span className="text-sm font-mono text-slate-500">%</span>
            </div>
            <div className="mt-1 text-xs text-slate-600">
              vs 29.4% single-junction silicon limit
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
