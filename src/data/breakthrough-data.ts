export interface SourceReference {
  title: string;
  organization: string;
  url: string;
  publicationDate: string;
  type: 'announcement' | 'scientific-certification' | 'global-report';
  summary: string;
}

export interface FrontierTopic {
  id: string;
  title: string;
  sector: string;
  milestoneDate: string;
  commercialStatus: 'commercialized' | 'pilot-scale' | 'pre-commercial' | 'demonstration';
  summary: string;
  verifiedFacts: {
    point: string;
    detail: string;
    source: string;
  }[];
  uncertainties: {
    point: string;
    detail: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    mitigation: string;
  }[];
}

export const MAIN_BREAKTHROUGH = {
  title: 'First Commercial Deployment of Perovskite-Silicon Tandem Solar Panels',
  subtitle: 'Transition from Laboratory Physics to Utility-Scale Power Generation',
  leadResearcherAndCompany: 'Oxford PV (University of Oxford spinout) & Fraunhofer ISE',
  manufacturingLocation: 'Brandenburg an der Havel, Germany',
  customerDeployment: 'Commercial utility customer, United States',
  keyDates: [
    {
      date: 'June 19, 2024',
      milestone: 'Residential Module World Record (26.9%)',
      body: 'Fraunhofer ISE CalLab certified a record module efficiency of 26.9% on standard 60-cell residential form factor, surpassing all conventional silicon modules.',
    },
    {
      date: 'September 5, 2024',
      milestone: 'First Commercial Utility Shipment (24.5%)',
      body: 'Oxford PV delivered the world’s first commercial shipment of 72-cell perovskite-on-silicon panels rated at 24.5% module efficiency to a US utility customer.',
    },
  ],
  verifiedFacts: [
    {
      id: 'vf-1',
      title: 'Commercial Shipment & Manufacturing Reality',
      summary: 'The panels delivered in September 2024 were manufactured at Oxford PV’s dedicated facility in Brandenburg an der Havel, Germany, marking the first recorded commercial utility deployment of perovskite-tandem modules worldwide.',
      testingBody: 'Oxford PV Pilot Facility & US Utility Acceptance',
      date: 'September 5, 2024',
      confidenceRating: 98,
      evidenceType: 'Commercial Invoice & Physical Shipment',
      metric: '72-cell tandem format',
      sourceUrl: 'https://www.oxfordpv.com/news/20-more-powerful-tandem-solar-panels-enter-commercial-use-first-time-us',
    },
    {
      id: 'vf-2',
      title: 'Operational Efficiency Boost (24.5% to 26.9%)',
      summary: 'Initial commercial modules deliver an operational efficiency of 24.5%, generating 15% to 20% more power from the same land/roof surface area than mainstream silicon modules (typically 20%–22% efficiency).',
      testingBody: 'Fraunhofer CalLab & Factory STC Flash Testing',
      date: 'June & September 2024',
      confidenceRating: 99,
      evidenceType: 'Standard Test Conditions (1000 W/m², AM1.5G, 25°C)',
      metric: '+15% to +20% power density',
      sourceUrl: 'https://www.oxfordpv.com/news/oxford-pv-debuts-residential-solar-module-record-setting-269-efficiency',
    },
    {
      id: 'vf-3',
      title: 'Independent Metrology & Standardized Testing',
      summary: 'The underlying tandem module architecture underwent standardized outdoor durability testing and efficiency verification by independent metrology labs, including the Fraunhofer Institute for Solar Energy Systems (ISE).',
      testingBody: 'Fraunhofer Institute for Solar Energy Systems (ISE)',
      date: '2024',
      confidenceRating: 96,
      evidenceType: 'IEC 61215 and IEC 61730 Accelerated Stress Compliance',
      metric: 'Independent Lab Verification',
      sourceUrl: 'https://www.ise.fraunhofer.de/en/press-media/press-releases/2024.html',
    },
  ],
  uncertainties: [
    {
      id: 'unc-1',
      title: 'Decadal Real-World Field Durability',
      summary: 'While traditional silicon solar panels provide 25- to 30-year operational warranties with <0.5%/yr degradation, perovskite crystal structures have historically suffered from degradation when exposed to moisture, UV radiation, and thermal cycling.',
      severity: 'high' as const,
      testingBody: 'Long-term Field Deployments & IEA PVPS Task 13',
      riskFactor: 'Ion migration & halide segregation under heat/UV',
      mitigationRoadmap: '2D/3D perovskite passivating heterojunctions, volatile ion locking with cesium/formamidinium, and atomic layer deposition (ALD) hermetic edge sealing.',
      sourceUrl: 'https://www.iea.org/reports/renewables-2024',
    },
    {
      id: 'unc-2',
      title: 'Gigawatt-Scale Manufacturing Yields',
      summary: 'Oxford PV’s initial commercial rollout was produced on a ~100 MW pilot line. Transitioning production to multi-gigawatt fabrication lines without microscopic pinholes or prohibitive yield losses has yet to be demonstrated.',
      severity: 'high' as const,
      testingBody: 'Photovoltaic Manufacturing Consortia',
      riskFactor: 'Uniform thin-film deposition across millions of m²',
      mitigationRoadmap: 'Hybrid vacuum co-evaporation and slot-die coating processes, automated optical inline inspection, and partnerships with established tier-1 silicon toolmakers.',
      sourceUrl: 'https://www.oxfordpv.com/news/20-more-powerful-tandem-solar-panels-enter-commercial-use-first-time-us',
    },
    {
      id: 'unc-3',
      title: 'Net Levelized Cost of Electricity (LCOE) Parity',
      summary: 'While tandem modules generate significantly more electricity per square meter, the exact manufacturing cost premium over cheap, mass-produced monocrystalline silicon ($0.10–$0.14/W) is not yet proven at multi-GW scale.',
      severity: 'medium' as const,
      testingBody: 'NREL Techno-Economic Modeling & BloombergNEF',
      riskFactor: 'Module CAPEX premium vs BOS savings tradeoff',
      mitigationRoadmap: 'Balance of System (BOS) land and rack savings offset higher module cost once module price stays within $0.18–$0.22/W with at least 20-year lifespan.',
      sourceUrl: 'https://www.iea.org/reports/renewables-2024',
    },
  ],
  sources: [
    {
      title: '20% More Powerful Tandem Solar Panels Enter Commercial Use for First Time in the US',
      organization: 'Oxford PV Official News',
      url: 'https://www.oxfordpv.com/news/20-more-powerful-tandem-solar-panels-enter-commercial-use-first-time-us',
      publicationDate: 'September 5, 2024',
      type: 'announcement',
      summary: 'Oxford PV announces the initial commercial shipment of its 72-cell perovskite-on-silicon tandem solar panels to an American utility customer.',
    },
    {
      title: 'Oxford PV Debuts Residential Solar Module with Record-Setting 26.9% Efficiency',
      organization: 'Oxford PV Press Release',
      url: 'https://www.oxfordpv.com/news/oxford-pv-debuts-residential-solar-module-record-setting-269-efficiency',
      publicationDate: 'June 19, 2024',
      type: 'scientific-certification',
      summary: 'Certified by Fraunhofer CalLab, the 60-cell module produced 425 W on a standard residential format, reaching 26.9% conversion efficiency.',
    },
    {
      title: 'Renewables 2024: Analysis and Forecast to 2030',
      organization: 'International Energy Agency (IEA)',
      url: 'https://www.iea.org/reports/renewables-2024',
      publicationDate: 'October 2024',
      type: 'global-report',
      summary: 'Comprehensive analysis on solar photovoltaic supply chains, tandem technology trajectory, cost roadmaps, and utility deployment outlook.',
    },
  ] as SourceReference[],
};

export const COMPARATIVE_FRONTIERS: FrontierTopic[] = [
  {
    id: 'perovskite-tandem',
    title: 'Perovskite-on-Silicon Tandem Photovoltaics',
    sector: 'Solar PV',
    milestoneDate: 'Sep 2024',
    commercialStatus: 'commercialized',
    summary: 'Layering synthetic perovskite over crystalline silicon to capture blue and infrared wavelengths, breaking past single-junction limits.',
    verifiedFacts: [
      {
        point: '24.5% commercial module shipped to US utility in Sept 2024',
        detail: 'Manufactured on pilot line in Brandenburg an der Havel, Germany.',
        source: 'Oxford PV',
      },
      {
        point: '26.9% residential record certified by Fraunhofer CalLab',
        detail: 'Tested under Standard Test Conditions (AM1.5G, 25°C).',
        source: 'Fraunhofer ISE',
      },
    ],
    uncertainties: [
      {
        point: 'Decadal field durability under humidity and thermal cycling',
        detail: 'Accelerated 1,000h testing passed, but 25-year warranty equivalence unproven.',
        riskLevel: 'high',
        mitigation: 'ALD barrier coatings and multi-cation perovskite crystal stabilization.',
      },
      {
        point: 'Yield consistency in multi-gigawatt continuous manufacturing',
        detail: 'High speed slot-die and evaporation across large areas.',
        riskLevel: 'high',
        mitigation: 'Automated defect spectroscopy and hybrid deposition.',
      },
    ],
  },
  {
    id: 'sodium-ion',
    title: 'Commercial Sodium-Ion Grid Energy Storage',
    sector: 'Battery Storage',
    milestoneDate: '2024',
    commercialStatus: 'commercialized',
    summary: 'Replacing lithium and cobalt with abundant sodium salts for stationary grid storage and temperate EVs.',
    verifiedFacts: [
      {
        point: 'Utility-scale 100 MWh sodium-ion BESS commissioned in Hubei, China',
        detail: 'Supplied by HiNa Battery; zero dependence on scarce lithium or cobalt.',
        source: 'China Southern Power Grid / HiNa',
      },
      {
        point: 'Energy densities reached 160 Wh/kg commercially',
        detail: 'Prismatic hard-carbon/Prussian white cells with superior cold-temperature (-20°C) retention (>85%).',
        source: 'CATL & HiNa Technical Reports',
      },
    ],
    uncertainties: [
      {
        point: 'Cycle life parity against mature Lithium Iron Phosphate (LFP)',
        detail: 'Sodium cells achieve 3,000–5,000 cycles vs LFP 8,000–10,000 cycles.',
        riskLevel: 'medium',
        mitigation: 'Electrolyte additive optimization and cathode particle engineering.',
      },
      {
        point: 'Lower volumetric energy density limits space-constrained applications',
        detail: 'Requires ~30% larger footprint than LFP for equivalent MWh capacity.',
        riskLevel: 'low',
        mitigation: 'Ideal for rural stationary utility storage where land footprint is non-critical.',
      },
    ],
  },
  {
    id: 'floating-offshore-wind',
    title: '16–18 MW Deep-Water Floating Offshore Wind',
    sector: 'Wind Energy',
    milestoneDate: '2024',
    commercialStatus: 'pilot-scale',
    summary: 'Massive semi-submersible and tension-leg floating turbines operating in deep marine waters (>60 meters) inaccessible to fixed-bottom foundations.',
    verifiedFacts: [
      {
        point: 'World-record 16-18 MW turbines connected to grid in South China Sea',
        detail: '260-meter rotor diameter capturing consistent offshore wind regimes.',
        source: 'Goldwind / Mingyang Smart Energy',
      },
      {
        point: 'Operational capacity factors exceed 52% in deep offshore waters',
        detail: 'Significantly higher utilization than onshore wind (~30–35%).',
        source: 'Global Wind Energy Council (GWEC)',
      },
    ],
    uncertainties: [
      {
        point: 'Mooring line fatigue and dynamic subsea power cable failure rates',
        detail: 'Cyclic storm loading and ocean turbulence create high stress on anchor arrays.',
        riskLevel: 'high',
        mitigation: 'Synthetic fiber mooring tethers and semi-active dynamic ballast systems.',
      },
      {
        point: 'High installation and offshore port infrastructure capex',
        detail: 'LCOE currently $110–$140/MWh compared to $60/MWh for fixed-bottom.',
        riskLevel: 'high',
        mitigation: 'Standardized serial fabrication of steel floaters and wet towing.',
      },
    ],
  },
];
