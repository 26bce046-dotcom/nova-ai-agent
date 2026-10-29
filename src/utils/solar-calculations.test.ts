import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculatePowerDensity,
  calculateRelativeBoost,
  calculateLCOE,
  analyzeSpectralAbsorption,
  filterResearchItems,
  ResearchItem,
} from './solar-calculations';

test('calculatePowerDensity computes accurate STC power rating in W/m^2', () => {
  assert.equal(calculatePowerDensity(22.0), 220);
  assert.equal(calculatePowerDensity(24.5), 245);
  assert.equal(calculatePowerDensity(26.9), 269);
  assert.equal(calculatePowerDensity(0), 0);
  assert.equal(calculatePowerDensity(-5), 0);
});

test('calculateRelativeBoost computes output uplift over standard silicon baseline', () => {
  // 24.5% commercial vs 22.0% standard = (2.5 / 22) * 100 = 11.36% -> ~11.4%
  const boost245 = calculateRelativeBoost(24.5, 22.0);
  assert.equal(boost245, 11.4);

  // 26.9% record vs 22.0% standard = (4.9 / 22) * 100 = 22.27% -> 22.3%
  const boost269 = calculateRelativeBoost(26.9, 22.0);
  assert.equal(boost269, 22.3);

  // 24.5% vs 20.0% standard = (4.5 / 20) * 100 = 22.5%
  assert.equal(calculateRelativeBoost(24.5, 20.0), 22.5);
});

test('calculateLCOE produces realistic levelized costs and energy totals', () => {
  const result = calculateLCOE({
    systemCapexPerWatt: 0.22,
    annualOpexPerWatt: 0.012,
    moduleEfficiency: 24.5,
    annualDegradation: 0.008,
    lifetimeYears: 20,
    discountRate: 0.06,
    annualIrradianceKwhM2: 1750,
    balanceOfSystemPerWatt: 0.55,
  });

  assert.ok(result.lcoePerKwh > 0.02 && result.lcoePerKwh < 0.15, `LCOE was ${result.lcoePerKwh}`);
  assert.ok(result.lifetimeTotalEnergyKwhPerM2 > 5000, `Energy was ${result.lifetimeTotalEnergyKwhPerM2}`);
  assert.equal(result.initialOutputWattsPerM2, 245);
  assert.ok(result.twentyYearOutputWattsPerM2 > 190 && result.twentyYearOutputWattsPerM2 < 245);
});

test('analyzeSpectralAbsorption properly routes blue vs infrared photons', () => {
  // Blue photon (450 nm)
  const blue = analyzeSpectralAbsorption(450);
  assert.equal(blue.dominantAbsorber, 'perovskite');
  assert.ok(blue.perovskiteAbsorptionPct > 70);
  assert.equal(blue.photonEnergyEv, 2.76);

  // Near-infrared photon (900 nm)
  const infrared = analyzeSpectralAbsorption(900);
  assert.equal(infrared.dominantAbsorber, 'silicon');
  assert.ok(infrared.siliconAbsorptionPct > 60);
  assert.equal(infrared.photonEnergyEv, 1.38);

  // Deep infrared sub-bandgap (1250 nm)
  const deepInfrared = analyzeSpectralAbsorption(1250);
  assert.equal(deepInfrared.dominantAbsorber, 'sub-bandgap');
  assert.ok(deepInfrared.thermalLossPct >= 95);
});

test('filterResearchItems accurately filters by category and search terms', () => {
  const mockItems: ResearchItem[] = [
    {
      id: '1',
      category: 'verified-fact',
      title: 'Commercial Shipment to US',
      summary: 'Oxford PV delivered 72-cell tandem modules to US utility',
      testingBodyOrSource: 'Oxford PV',
    },
    {
      id: '2',
      category: 'uncertainty-challenge',
      title: 'Real-World 25-Year Durability',
      summary: 'Moisture and thermal cycling degradation over decades unproven',
      testingBodyOrSource: 'IEA',
    },
    {
      id: '3',
      category: 'key-date',
      title: 'June 19, 2024 Record',
      summary: '26.9% efficiency verified by Fraunhofer CalLab',
      testingBodyOrSource: 'Fraunhofer ISE',
    },
  ];

  // All
  assert.equal(filterResearchItems(mockItems, 'all', '').length, 3);

  // Category filter
  const facts = filterResearchItems(mockItems, 'verified-fact');
  assert.equal(facts.length, 1);
  assert.equal(facts[0].id, '1');

  // Search query
  const fraunhoferResults = filterResearchItems(mockItems, 'all', 'Fraunhofer');
  assert.equal(fraunhoferResults.length, 1);
  assert.equal(fraunhoferResults[0].id, '3');

  // Search query in summary
  const moistureResults = filterResearchItems(mockItems, 'all', 'moisture');
  assert.equal(moistureResults.length, 1);
  assert.equal(moistureResults[0].id, '2');
});
