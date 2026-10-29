import React, { useState } from 'react';
import { Calendar, Building2, Zap, ArrowRight, ExternalLink } from 'lucide-react';

export const TimelineRoadmap: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'manufacturing'>('timeline');

  const milestones = [
    {
      date: '2014 – 2020',
      tag: 'University Spinout & Lab Proof',
      title: 'Foundational Perovskite-on-Silicon Breakthrough',
      description:
        'Co-founded by Prof. Henry Snaith at the University of Oxford. Transitioned metal-halide perovskite crystals from basic physics to stackable thin films over commercial silicon wafers.',
      verified: true,
      testingBody: 'Oxford University & Helmholtz-Zentrum Berlin',
    },
    {
      date: '2021 – 2023',
      tag: 'Pilot Facility Scale',
      title: 'Brandenburg an der Havel Factory Commissioning',
      description:
        'Oxford PV converted a former solar fab in Brandenburg, Germany into a dedicated pilot manufacturing line to develop industrial-scale thin-film evaporation and slot-die coating processes.',
      verified: true,
      testingBody: 'State of Brandenburg & European Investment Bank',
    },
    {
      date: 'June 19, 2024',
      tag: 'World Record Verification',
      title: '26.9% Certified Residential Module Record',
      description:
        'Germany’s Fraunhofer ISE CalLab officially certified a residential-sized (60-cell) perovskite-on-silicon tandem module producing 425 Watts at 26.9% efficiency, breaking all commercial silicon records.',
      verified: true,
      testingBody: 'Fraunhofer ISE CalLab (Freiburg, Germany)',
      link: 'https://www.oxfordpv.com/news/oxford-pv-debuts-residential-solar-module-record-setting-269-efficiency',
    },
    {
      date: 'September 5, 2024',
      tag: 'Historic Commercial Delivery',
      title: 'First Commercial Shipment to US Utility Customer',
      description:
        'Oxford PV announced the first commercial delivery of 72-cell perovskite-on-silicon panels rated at 24.5% module efficiency to a utility customer in the United States, marking the first recorded commercial sale worldwide.',
      verified: true,
      testingBody: 'US Utility Customer Acceptance & STC Flash Test',
      link: 'https://www.oxfordpv.com/news/20-more-powerful-tandem-solar-panels-enter-commercial-use-first-time-us',
    },
    {
      date: '2025 – 2027+',
      tag: 'Projected Outlook',
      title: 'Multi-Gigawatt Industrial Scaling',
      description:
        'Expanding production from the initial megawatt-scale pilot line to continuous multi-gigawatt fabs. Overcoming thin-film uniformity across millions of square meters and demonstrating 25-year bankable field warranties.',
      verified: false,
      testingBody: 'Commercialization Roadmap (Active Uncertainty)',
    },
  ];

  return (
    <section id="timeline" className="py-12 border-b border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-3xl">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
              Commercialization & Operational Chronology
            </div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
              From Laboratory Milestone to US Utility Grid
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Key chronological dates documenting how perovskite tandem photovoltaics became the first commercially
              shipped next-generation solar technology.
            </p>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-lg shadow-xs shrink-0">
            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'timeline'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Key Dates Chronology
            </button>
            <button
              onClick={() => setActiveTab('manufacturing')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeTab === 'manufacturing'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-950'
              }`}
            >
              Manufacturing & Deployment Sites
            </button>
          </div>
        </div>

        {activeTab === 'timeline' ? (
          <div className="mt-10 relative">
            {/* Timeline vertical line */}
            <div className="hidden md:block absolute left-48 top-4 bottom-4 w-0.5 bg-slate-200" />

            <div className="space-y-6">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative flex flex-col md:flex-row md:items-start gap-4 md:gap-10">
                  {/* Left Date Column */}
                  <div className="md:w-40 md:text-right shrink-0 pt-1">
                    <span className="font-mono text-xs font-bold text-slate-900">{m.date}</span>
                    <div className="text-[11px] font-mono text-slate-500">{m.tag}</div>
                  </div>

                  {/* Marker node */}
                  <div className="hidden md:flex w-5 h-5 rounded-full bg-white border-2 border-slate-900 items-center justify-center shrink-0 z-10 mt-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-900" />
                  </div>

                  {/* Right Content Card */}
                  <div className="flex-1 p-5 bg-white rounded-xl border border-slate-200 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                      <div className="text-xs font-mono text-slate-500">
                        {m.verified ? (
                          <span className="text-emerald-700 font-semibold">Verified Fact</span>
                        ) : (
                          <span className="text-amber-700 font-semibold">Future Outlook</span>
                        )}
                      </div>
                    </div>

                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {m.description}
                    </p>

                    <div className="mt-3 pt-2.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                      <div>
                        <span className="font-medium text-slate-700">Verification / Source: </span>
                        <span>{m.testingBody}</span>
                      </div>

                      {m.link && (
                        <a
                          href={m.link}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
                        >
                          <span>Official Announcement</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Manufacturing & Site Inspection View */
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Brandenburg Plant */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
              <div className="h-60 overflow-hidden relative bg-slate-900">
                <img
                  src="/src/assets/images/solar_pilot_manufacturing_1793284025649.jpg"
                  alt="Oxford PV automated solar cleanroom manufacturing line in Brandenburg Germany"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs font-mono">
                    Brandenburg an der Havel, Germany · Pilot Manufacturing Line
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    Industrial Pilot Line & Thin-Film Deposition
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    The facility applies Oxford PV's proprietary multi-cation perovskite formulation on standard commercial
                    silicon wafers at line speeds. It integrates automated wafer transfer, cleanroom evaporation, slot-die
                    coating, and in-line photoluminescence imaging for defect detection.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-slate-500 font-mono text-[11px]">Factory Capacity</div>
                      <div className="font-bold text-slate-900 mt-0.5 font-mono">~100 MW / year</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-slate-500 font-mono text-[11px]">Cell Architecture</div>
                      <div className="font-bold text-slate-900 mt-0.5 font-mono">M6 / G12 Silicon Wafer</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  Certified according to ISO 9001 and IEC manufacturing criteria.
                </div>
              </div>
            </div>

            {/* US Utility Deployment Site */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col">
              <div className="h-60 overflow-hidden relative bg-slate-900">
                <img
                  src="/src/assets/images/utility_solar_deployment_1793284025653.jpg"
                  alt="Utility scale solar farm deployment in the United States"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white text-xs font-mono">
                    Utility Grid Site · United States (Sept 2024 Deployment)
                  </div>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-950">
                    First Commercial 72-Cell Utility Installation
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Shipped to a commercial US utility operator, these 72-cell tandem modules operate at 24.5% efficiency.
                    They are connected to utility single-axis tracking arrays to evaluate field energy yield under real-world
                    soiling, ultraviolet exposure, and diurnal thermal cycling.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-slate-500 font-mono text-[11px]">Field Rating</div>
                      <div className="font-bold text-slate-900 mt-0.5 font-mono">24.5% Operational STC</div>
                    </div>
                    <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                      <div className="text-slate-500 font-mono text-[11px]">Array Type</div>
                      <div className="font-bold text-slate-900 mt-0.5 font-mono">Utility Single-Axis Tracking</div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  Data telemetry monitored in collaboration with utility engineering teams.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
