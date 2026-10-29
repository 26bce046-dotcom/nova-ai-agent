/**
 * Pure calculation functions for Solar Tandem Physics & Levelized Cost of Electricity (LCOE)
 */

export interface SystemEconomicsParams {
  systemCapexPerWatt: number; // e.g. $0.22/W for tandem vs $0.14/W for silicon
  annualOpexPerWatt: number;  // e.g. $0.012/W/year
  moduleEfficiency: number;   // e.g. 24.5% (commercial) or 26.9% (record) vs 22.0%
  annualDegradation: number;  // e.g. 0.008 (0.8%/year for early tandem) vs 0.004 (0.4%/year for silicon)
  lifetimeYears: number;      // e.g. 20 years vs 25-30 years
  discountRate: number;       // e.g. 0.06 (6%)
  annualIrradianceKwhM2: number; // e.g. 1750 kWh/m^2/year (standard US utility solar resource)
  balanceOfSystemPerWatt: number; // e.g. $0.55/W for fixed-tilt utility BOS
}

export interface EconomicsResult {
  lcoePerKwh: number;
  lcoePerMwh: number;
  lifetimeTotalEnergyKwhPerM2: number;
  relativeOutputBoostPercent: number; // compared to baseline 22% silicon
  initialOutputWattsPerM2: number;
  twentyYearOutputWattsPerM2: number;
}

/**
 * Calculates initial power density in W/m^2 given standard test conditions (1000 W/m^2 irradiance)
 */
export function calculatePowerDensity(efficiencyPercent: number): number {
  if (efficiencyPercent <= 0) return 0;
  return Math.round((efficiencyPercent / 100) * 1000 * 10) / 10;
}

/**
 * Calculates relative energy yield boost compared to standard silicon (22% nominal)
 */
export function calculateRelativeBoost(efficiencyPercent: number, baselineEfficiency: number = 22.0): number {
  if (baselineEfficiency <= 0) return 0;
  const boost = ((efficiencyPercent - baselineEfficiency) / baselineEfficiency) * 100;
  return Math.round(boost * 10) / 10;
}

/**
 * Computes Levelized Cost of Electricity (LCOE) using discounted cash flow formula
 */
export function calculateLCOE(params: SystemEconomicsParams): EconomicsResult {
  const {
    systemCapexPerWatt,
    annualOpexPerWatt,
    moduleEfficiency,
    annualDegradation,
    lifetimeYears,
    discountRate,
    annualIrradianceKwhM2,
    balanceOfSystemPerWatt,
  } = params;

  const totalCapexPerWatt = systemCapexPerWatt + balanceOfSystemPerWatt;
  const initialPowerWPerM2 = calculatePowerDensity(moduleEfficiency);
  const initialOutputKwhPerM2Year = (annualIrradianceKwhM2 * moduleEfficiency) / 100;

  let totalDiscountedCostPerM2 = totalCapexPerWatt * initialPowerWPerM2;
  let totalDiscountedEnergyKwhPerM2 = 0;
  let rawLifetimeEnergy = 0;

  for (let year = 1; year <= lifetimeYears; year++) {
    const degradationFactor = Math.pow(1 - annualDegradation, year - 1);
    const yearlyEnergyKwhPerM2 = initialOutputKwhPerM2Year * degradationFactor;
    rawLifetimeEnergy += yearlyEnergyKwhPerM2;

    const discountFactor = Math.pow(1 + discountRate, year);
    totalDiscountedEnergyKwhPerM2 += yearlyEnergyKwhPerM2 / discountFactor;

    const yearlyOpexPerM2 = annualOpexPerWatt * initialPowerWPerM2;
    totalDiscountedCostPerM2 += yearlyOpexPerM2 / discountFactor;
  }

  const lcoePerKwh = totalDiscountedEnergyKwhPerM2 > 0
    ? totalDiscountedCostPerM2 / totalDiscountedEnergyKwhPerM2
    : 0;

  const twentyYearDegrade = Math.pow(1 - annualDegradation, Math.min(20, lifetimeYears));
  const twentyYearPower = Math.round(initialPowerWPerM2 * twentyYearDegrade * 10) / 10;

  return {
    lcoePerKwh: Math.round(lcoePerKwh * 1000) / 1000,
    lcoePerMwh: Math.round(lcoePerKwh * 1000 * 10) / 10,
    lifetimeTotalEnergyKwhPerM2: Math.round(rawLifetimeEnergy),
    relativeOutputBoostPercent: calculateRelativeBoost(moduleEfficiency),
    initialOutputWattsPerM2: initialPowerWPerM2,
    twentyYearOutputWattsPerM2: twentyYearPower,
  };
}

/**
 * Simulates photon absorption breakdown for a given solar wavelength (in nanometers)
 * Perovskite Bandgap: ~1.7 eV (~730 nm cutoff)
 * Silicon Bandgap: ~1.12 eV (~1107 nm cutoff)
 */
export interface SpectralAbsorption {
  wavelengthNm: number;
  photonEnergyEv: number;
  perovskiteAbsorptionPct: number;
  siliconAbsorptionPct: number;
  thermalLossPct: number;
  dominantAbsorber: 'perovskite' | 'silicon' | 'loss' | 'sub-bandgap';
}

export function analyzeSpectralAbsorption(wavelengthNm: number): SpectralAbsorption {
  // Planck constant * c in eV*nm: ~1239.8
  const photonEnergyEv = wavelengthNm > 0 ? Math.round((1239.84 / wavelengthNm) * 100) / 100 : 0;

  let perovskiteAbsorption = 0;
  let siliconAbsorption = 0;
  let thermalLoss = 0;
  let dominant: 'perovskite' | 'silicon' | 'loss' | 'sub-bandgap' = 'loss';

  if (wavelengthNm < 350) {
    // UV cutoff - high thermalization losses & parasitic absorption
    perovskiteAbsorption = 60;
    siliconAbsorption = 0;
    thermalLoss = 40;
    dominant = 'perovskite';
  } else if (wavelengthNm >= 350 && wavelengthNm <= 700) {
    // Blue & Visible spectrum - Perovskite top-cell optimal bandgap
    perovskiteAbsorption = Math.max(10, Math.round(92 - (wavelengthNm - 350) * 0.12));
    siliconAbsorption = Math.max(0, 100 - perovskiteAbsorption - 8);
    thermalLoss = 8;
    dominant = 'perovskite';
  } else if (wavelengthNm > 700 && wavelengthNm <= 1100) {
    // Near-Infrared - Perovskite is transparent, Silicon bottom-cell absorbs
    perovskiteAbsorption = Math.max(0, Math.round(20 - (wavelengthNm - 700) * 0.2));
    siliconAbsorption = Math.min(88, Math.max(0, Math.round(88 - (wavelengthNm - 800) * 0.15)));
    thermalLoss = Math.max(0, 100 - perovskiteAbsorption - siliconAbsorption);
    dominant = 'silicon';
  } else {
    // Beyond 1107 nm: photons pass through silicon without excitation (sub-bandgap)
    perovskiteAbsorption = 0;
    siliconAbsorption = 2;
    thermalLoss = 98;
    dominant = 'sub-bandgap';
  }

  return {
    wavelengthNm,
    photonEnergyEv,
    perovskiteAbsorptionPct: perovskiteAbsorption,
    siliconAbsorptionPct: siliconAbsorption,
    thermalLossPct: thermalLoss,
    dominantAbsorber: dominant,
  };
}

/**
 * Filter fact and uncertainty items by status, tag or query string
 */
export interface ResearchItem {
  id: string;
  category: 'verified-fact' | 'uncertainty-challenge' | 'key-date';
  title: string;
  summary: string;
  testingBodyOrSource?: string;
  date?: string;
  severityOrImpact?: 'low' | 'medium' | 'high' | 'critical';
  confidenceRating?: number; // 0-100
  mitigationRoadmap?: string;
  citationUrl?: string;
}

export function filterResearchItems(
  items: ResearchItem[],
  categoryFilter: 'all' | 'verified-fact' | 'uncertainty-challenge' | 'key-date',
  searchQuery: string = ''
): ResearchItem[] {
  const query = searchQuery.trim().toLowerCase();
  return items.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    if (!matchesCategory) return false;
    if (!query) return true;
    return (
      item.title.toLowerCase().includes(query) ||
      item.summary.toLowerCase().includes(query) ||
      (item.testingBodyOrSource && item.testingBodyOrSource.toLowerCase().includes(query))
    );
  });
}
