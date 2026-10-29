import React, { useState } from 'react';
import { Sliders, Zap, Info, Sun, Sparkles } from 'lucide-react';
import { analyzeSpectralAbsorption } from '../utils/solar-calculations';

export const TandemPhysicsVisualizer: React.FC = () => {
  const [wavelength, setWavelength] = useState<number>(480);
  const [selectedLayer, setSelectedLayer] = useState<string>('perovskite');

  const spectrumData = analyzeSpectralAbsorption(wavelength);

  const presets = [
    { label: 'High-Energy Blue (420 nm)', wl: 420, layer: 'perovskite' },
    { label: 'Solar Peak Green (530 nm)', wl: 530, layer: 'perovskite' },
    { label: 'Bandgap Transition (710 nm)', wl: 710, layer: 'silicon' },
    { label: 'Near-Infrared (880 nm)', wl: 880, layer: 'silicon' },
    { label: 'Sub-Bandgap IR (1160 nm)', wl: 1160, layer: 'loss' },
  ];

  const layersInfo = {
    glass: {
      name: 'Anti-Reflective Front Glass & ITO Grid',
      thickness: '~2 mm textured glass + 100 nm ITO',
      function: 'Maximizes light transmission, traps oblique angles, and collects front electrons with minimal shading.',
      physics: 'Refractive index matching (n ≈ 1.48 to 1.9) reduces surface reflection from >30% down to <2%.',
    },
    perovskite: {
      name: 'Synthetic Perovskite Absorber (Top Cell)',
      thickness: '400 – 600 nm thin film',
      function: 'Wide-bandgap absorber (Eg ≈ 1.68–1.72 eV). Absorbs high-energy blue/green photons (300–650 nm).',
      physics: 'High open-circuit voltage (Voc > 1.25 V). Prevents thermalization energy loss by converting high-energy photons before they reach silicon.',
    },
    tunnel: {
      name: 'Recombination / Tunnel Junction',
      thickness: '15 – 30 nm (AZO / ITO / Ultrathin Ag)',
      function: 'Electrically connects top and bottom cells in series with minimal parasitic optical absorption.',
      physics: 'Enables quantum mechanical tunneling of charge carriers, neutralizing holes from the top cell with electrons from the bottom cell.',
    },
    silicon: {
      name: 'Crystalline Silicon Absorber (Bottom Cell)',
      thickness: '130 – 160 µm n-type wafer (TOPCon or Heterojunction)',
      function: 'Narrow-bandgap absorber (Eg ≈ 1.12 eV). Absorbs red and near-infrared light (650–1100 nm) transmitted by perovskite.',
      physics: 'Perovskite layer is optically transparent to photons with energies below 1.7 eV, allowing silicon to capture infrared photons efficiently.',
    },
    contact: {
      name: 'Rear Passivated Contact & Mirror',
      thickness: '100 – 200 nm Silver / Aluminum metallization',
      function: 'Reflects unabsorbed near-infrared photons back through silicon wafer for second-pass absorption.',
      physics: 'Full-area rear contact ensures low series resistance and back-surface field passivation.',
    },
  };

  const currentLayer = layersInfo[selectedLayer as keyof typeof layersInfo] || layersInfo.perovskite;

  return (
    <section id="cell-physics" className="py-12 border-b border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-500">
            Semiconductor Architecture & Quantum Mechanics
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-slate-950 tracking-tight">
            How Tandem Cells Break the Shockley-Queisser Limit
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Standard single-junction silicon solar cells are constrained to an efficiency ceiling of ~29.4% because high-energy
            photons lose excess energy as heat (thermalization), while low-energy photons pass through unabsorbed. By stacking a
            wide-bandgap perovskite cell on top of silicon, each layer captures its optimal portion of the solar spectrum.
          </p>
        </div>

        {/* Interactive Workspace Grid */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Wavelength Scrubber & Dynamic Absorption HUD */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-slate-700" />
                <h3 className="text-sm font-semibold text-slate-900">Photon Wavelength Scanner</h3>
              </div>
              <div className="font-mono text-xs text-slate-500">
                AM1.5G Solar Spectrum
              </div>
            </div>

            {/* Slider control */}
            <div>
              <div className="flex justify-between items-baseline mb-2">
                <label htmlFor="wavelength-slider" className="text-xs font-medium text-slate-700">
                  Incident Wavelength (λ)
                </label>
                <div className="flex items-baseline gap-1 font-mono">
                  <span className="text-xl font-bold text-slate-900">{wavelength}</span>
                  <span className="text-xs text-slate-500">nm</span>
                  <span className="text-xs text-slate-400 ml-2">({spectrumData.photonEnergyEv} eV)</span>
                </div>
              </div>

              <input
                id="wavelength-slider"
                type="range"
                min="320"
                max="1250"
                step="5"
                value={wavelength}
                onChange={(e) => setWavelength(Number(e.target.value))}
                className="w-full h-2 bg-gradient-to-r from-blue-600 via-emerald-500 via-amber-400 to-red-600 rounded-lg appearance-none cursor-pointer accent-slate-900"
                aria-label="Solar wavelength in nanometers"
              />

              <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-1.5">
                <span>320nm (UV)</span>
                <span>550nm (Visible)</span>
                <span>800nm (NIR)</span>
                <span>1250nm (IR)</span>
              </div>
            </div>

            {/* Presets */}
            <div>
              <div className="text-xs font-medium text-slate-700 mb-2">Spectral Test Presets:</div>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((p) => (
                  <button
                    key={p.wl}
                    onClick={() => {
                      setWavelength(p.wl);
                      if (p.layer !== 'loss') setSelectedLayer(p.layer);
                    }}
                    className={`px-2.5 py-1 text-xs rounded-md font-mono transition-colors border ${
                      wavelength === p.wl
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Absorption Gauges */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-amber-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    Top Cell: Perovskite Absorption (Eg ~1.7 eV)
                  </span>
                  <span className="font-mono font-semibold text-slate-900">
                    {spectrumData.perovskiteAbsorptionPct}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-amber-500 h-2 rounded-full transition-all duration-150"
                    style={{ width: `${spectrumData.perovskiteAbsorptionPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-blue-800 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                    Bottom Cell: Silicon Absorption (Eg ~1.1 eV)
                  </span>
                  <span className="font-mono font-semibold text-slate-900">
                    {spectrumData.siliconAbsorptionPct}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-150"
                    style={{ width: `${spectrumData.siliconAbsorptionPct}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium mb-1">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                    Thermal Relaxation / Sub-Bandgap Loss
                  </span>
                  <span className="font-mono font-semibold text-slate-900">
                    {spectrumData.thermalLossPct}%
                  </span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-slate-400 h-2 rounded-full transition-all duration-150"
                    style={{ width: `${spectrumData.thermalLossPct}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Diagnostic callout */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-600">
              <span className="font-semibold text-slate-900">Physical Outcome at {wavelength} nm: </span>
              {spectrumData.dominantAbsorber === 'perovskite' && (
                <span>
                  High-energy photon converted at high voltage (Voc ~1.25V) by the synthetic perovskite layer. Heat
                  loss minimized compared to standard silicon.
                </span>
              )}
              {spectrumData.dominantAbsorber === 'silicon' && (
                <span>
                  Perovskite layer is optically transparent at this wavelength. Infrared photon penetrates directly into
                  the crystalline silicon base wafer.
                </span>
              )}
              {spectrumData.dominantAbsorber === 'sub-bandgap' && (
                <span>
                  Wavelength exceeds silicon’s absorption edge (1107 nm, 1.12 eV). Photon passes through cell without
                  exciting charge carriers.
                </span>
              )}
            </div>
          </div>

          {/* Right Column: Interactive Visual Stack Diagram & Layer Detail */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 bg-slate-900 rounded-2xl text-white shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <h3 className="text-sm font-semibold tracking-wide uppercase text-slate-200">
                    Monolithic 2-Terminal Tandem Stack
                  </h3>
                </div>
                <div className="text-xs font-mono text-slate-400">Click layer to inspect physics</div>
              </div>

              {/* Graphical Stack Layers */}
              <div className="space-y-2 select-none">
                {/* Layer 1: Glass */}
                <button
                  onClick={() => setSelectedLayer('glass')}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedLayer === 'glass'
                      ? 'bg-sky-500/20 border-sky-400 ring-1 ring-sky-400'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-medium text-sky-200">
                      Layer 1: Front Textured Glass + Anti-Reflective Coating
                    </span>
                    <span className="text-slate-400 text-[11px]">2.0 mm / High Transparency</span>
                  </div>
                </button>

                {/* Layer 2: Perovskite */}
                <button
                  onClick={() => setSelectedLayer('perovskite')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    selectedLayer === 'perovskite'
                      ? 'bg-amber-500/25 border-amber-400 ring-2 ring-amber-400'
                      : 'bg-amber-950/40 border-amber-800/70 hover:bg-amber-900/50'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span className="font-mono font-bold text-amber-300">
                        Layer 2: Synthetic Perovskite Top Cell (Eg ≈ 1.70 eV)
                      </span>
                    </div>
                    <span className="text-amber-200/80 text-[11px] font-mono">
                      {spectrumData.perovskiteAbsorptionPct}% Active Absorption
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-amber-200/70">
                    Captures high-energy ultraviolet, blue, and green photons (λ &lt; 650 nm)
                  </div>
                </button>

                {/* Layer 3: Recombination */}
                <button
                  onClick={() => setSelectedLayer('tunnel')}
                  className={`w-full text-left p-2 rounded-lg border transition-all ${
                    selectedLayer === 'tunnel'
                      ? 'bg-purple-500/20 border-purple-400 ring-1 ring-purple-400'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono text-purple-300">
                      Layer 3: Tunnel Junction / Recombination Layer (AZO / ITO)
                    </span>
                    <span className="text-slate-400 text-[11px]">15–25 nm / Series Coupling</span>
                  </div>
                </button>

                {/* Layer 4: Silicon */}
                <button
                  onClick={() => setSelectedLayer('silicon')}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                    selectedLayer === 'silicon'
                      ? 'bg-blue-600/30 border-blue-400 ring-2 ring-blue-400'
                      : 'bg-blue-950/40 border-blue-800/70 hover:bg-blue-900/50'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <Sun className="w-3.5 h-3.5 text-blue-400" />
                      <span className="font-mono font-bold text-blue-300">
                        Layer 4: Crystalline Silicon Bottom Cell (Eg ≈ 1.12 eV)
                      </span>
                    </div>
                    <span className="text-blue-200/80 text-[11px] font-mono">
                      {spectrumData.siliconAbsorptionPct}% Active Absorption
                    </span>
                  </div>
                  <div className="mt-1 text-[11px] text-blue-200/70">
                    Captures red and near-infrared spectrum (λ 650 nm – 1100 nm)
                  </div>
                </button>

                {/* Layer 5: Rear Contact */}
                <button
                  onClick={() => setSelectedLayer('contact')}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedLayer === 'contact'
                      ? 'bg-slate-700 border-slate-400 ring-1 ring-slate-400'
                      : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-mono font-medium text-slate-300">
                      Layer 5: Passivated Rear Metallization & Optical Back Reflector
                    </span>
                    <span className="text-slate-400 text-[11px]">Silver / Aluminum Contact</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Layer Detail Inspector Card */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-slate-500">
                <Info className="w-3.5 h-3.5" />
                <span>Selected Component Specification</span>
              </div>
              <h4 className="mt-1 text-base font-bold text-slate-900">{currentLayer.name}</h4>
              <div className="mt-1 text-xs font-mono text-slate-500">
                Nominal Thickness: {currentLayer.thickness}
              </div>

              <div className="mt-3 space-y-2 text-xs text-slate-600">
                <div>
                  <strong className="text-slate-900 font-semibold">Primary Function: </strong>
                  {currentLayer.function}
                </div>
                <div>
                  <strong className="text-slate-900 font-semibold">Underlying Physics: </strong>
                  {currentLayer.physics}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
