import React, { useState } from 'react';
import { X, Copy, Check, Printer, FileText, ExternalLink } from 'lucide-react';
import { MAIN_BREAKTHROUGH } from '../data/breakthrough-data';

interface ReportDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReportDrawer: React.FC<ReportDrawerProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const markdownContent = `### Breakthrough: First Commercial Deployment of Perovskite-Silicon Tandem Solar Panels

In late 2024, solar technology reached a major milestone as **perovskite-on-silicon tandem solar panels** transitioned from laboratory prototypes to initial commercial delivery. By layering synthetic perovskite crystal material over conventional silicon solar cells, these tandem modules capture different parts of the solar spectrum (perovskite absorbs high-energy blue wavelengths while silicon absorbs lower-energy red and infrared light), breaking past the physical efficiency limits of traditional silicon-only cells.

---

### Key Dates
* **June 19, 2024:** Oxford PV unveiled a residential-size module achieving a certified record efficiency of **26.9%** (tested by Germany's Fraunhofer CalLab).
* **September 5, 2024:** Oxford PV announced the **first commercial shipment** of 72-cell perovskite-on-silicon panels (rated at 24.5% module efficiency) to a utility customer in the United States.

---

### Verified Facts
* **Commercial Readiness:** The panels delivered in September 2024 were manufactured at Oxford PV’s pilot facility in Brandenburg an der Havel, Germany, making it the first recorded commercial sale and utility deployment of perovskite-tandem modules worldwide.
* **Efficiency Boost:** The initial commercial modules offer an operational efficiency of **24.5%**, delivering approximately 15% to 20% more energy output from the same surface area compared to mainstream silicon solar panels, which typically operate between 20% and 22% efficiency.
* **Independent Certification:** The underlying tandem module architecture underwent standardized outdoor durability testing and efficiency verification by independent metrology labs, including the Fraunhofer Institute for Solar Energy Systems.

---

### Uncertainties and Challenges
* **Real-World Durability:** While traditional silicon solar panels come with 25- to 30-year operational warranties, perovskite materials have historically been prone to degradation when exposed to moisture, ultraviolet light, and high thermal stress. Long-term performance in outdoor field conditions over decades remains unproven.
* **Gigawatt-Scale Manufacturing:** Oxford PV's initial rollout was produced on a **megawatt-scale** pilot line. Transitioning production to multi-gigawatt commercial fabrication without defects or prohibitive yield losses has yet to be demonstrated.
* **Economic Competitiveness (LCOE):** While tandem modules generate more electricity per square meter, the exact manufacturing cost premium over cheap, mass-produced monocrystalline silicon is not yet publicly proven at scale. The net Levelized Cost of Electricity (LCOE) advantage depends heavily on factory scaling and module lifespan.

---

### Sources
* Commercial deployment announcement: Oxford PV Commercial Announcement (https://www.oxfordpv.com/news/20-more-powerful-tandem-solar-panels-enter-commercial-use-first-time-us)
* Residential efficiency record: Oxford PV Record Announcement (https://www.oxfordpv.com/news/oxford-pv-debuts-residential-solar-module-record-setting-269-efficiency)
* Global deployment trends and forecasts: International Energy Agency (IEA) Renewables Report (https://www.iea.org/reports/renewables-2024)`;

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Executive Briefing Report"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
    >
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header bar */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Executive Research Brief</h3>
              <p className="text-xs text-slate-500">
                Print-ready briefing formatted with verified facts vs uncertainties
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Markdown'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close Executive Brief"
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formatted Document View */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6 text-slate-800 text-sm leading-relaxed">
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-950">
              Breakthrough: First Commercial Deployment of Perovskite-Silicon Tandem Solar Panels
            </h1>
            <p className="mt-3 text-slate-600">
              In late 2024, solar technology reached a major milestone as{' '}
              <strong className="text-slate-900">perovskite-on-silicon tandem solar panels</strong> transitioned from
              laboratory prototypes to initial commercial delivery. By layering synthetic perovskite crystal material
              over conventional silicon solar cells, these tandem modules capture different parts of the solar spectrum
              (perovskite absorbs high-energy blue wavelengths while silicon absorbs lower-energy red and infrared light),
              breaking past the physical efficiency limits of traditional silicon-only cells.
            </p>
          </div>

          <hr className="border-slate-200" />

          {/* Key Dates */}
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide font-mono text-xs text-amber-700">
              Key Dates
            </h2>
            <ul className="mt-3 space-y-2.5 text-xs sm:text-sm text-slate-700">
              {MAIN_BREAKTHROUGH.keyDates.map((kd, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 whitespace-nowrap">• {kd.date}:</span>
                  <span>{kd.body}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-slate-200" />

          {/* Verified Facts */}
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide font-mono text-xs text-emerald-700">
              Verified Facts
            </h2>
            <ul className="mt-3 space-y-3 text-xs sm:text-sm text-slate-700">
              {MAIN_BREAKTHROUGH.verifiedFacts.map((fact) => (
                <li key={fact.id} className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 whitespace-nowrap">• {fact.title}:</span>
                  <span>{fact.summary}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-slate-200" />

          {/* Uncertainties and Challenges */}
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide font-mono text-xs text-amber-800">
              Uncertainties and Challenges
            </h2>
            <ul className="mt-3 space-y-3 text-xs sm:text-sm text-slate-700">
              {MAIN_BREAKTHROUGH.uncertainties.map((unc) => (
                <li key={unc.id} className="flex items-start gap-2">
                  <span className="font-bold text-slate-900 whitespace-nowrap">• {unc.title}:</span>
                  <span>{unc.summary}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-slate-200" />

          {/* Sources */}
          <div>
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide font-mono text-xs text-slate-600">
              Sources
            </h2>
            <ul className="mt-3 space-y-2 text-xs text-slate-600">
              {MAIN_BREAKTHROUGH.sources.map((src, idx) => (
                <li key={idx} className="flex items-center gap-1.5">
                  <span>• {src.organization}:</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-blue-600 hover:text-blue-800 font-medium underline flex items-center gap-1"
                  >
                    <span>{src.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
