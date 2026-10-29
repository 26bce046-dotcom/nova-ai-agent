import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Knowledge base offline fallback for robust queries if API key is not yet set
function generateOfflineResponse(question: string, context?: string): string {
  const q = question.toLowerCase();
  
  if (q.includes('durability') || q.includes('degradation') || q.includes('lifespan') || q.includes('warranty')) {
    return `### Verified Findings on Perovskite Durability & Degradation

**Empirical Reality vs. Commercial Need:**
* **Verified Testing:** Oxford PV tandem modules passed IEC 61215 accelerated stress testing (thermal cycling -40°C to +85°C, damp heat at 85°C/85% RH for 1,000 hours) verified by the Fraunhofer ISE.
* **The 25-Year Challenge:** Conventional crystalline silicon degradation is strictly guaranteed at ≤0.4% to 0.5% per year over 25–30 years. Metal-halide perovskites, however, contain volatile organic cations and ionic halides that can suffer from ion migration, phase segregation under continuous illumination, and moisture-induced decomposition.
* **Mitigation Engineering:** Commercial cells employ multi-cation formulations (cesium, formamidinium) with 2D/3D perovskite heterojunctions and hermetic atomic layer deposition (ALD) encapsulation to block moisture and oxygen ingress.`;
  }
  
  if (q.includes('bandgap') || q.includes('physics') || q.includes('wavelength') || q.includes('shockley') || q.includes('spectrum')) {
    return `### Tandem Physics & Shockley-Queisser Limit

**Overcoming the 29.4% Silicon Boundary:**
* **Single-Junction Silicon Limit:** Standard silicon solar cells have a bandgap of ~1.12 eV, imposing a fundamental thermodynamic limit of 29.4% efficiency due to sub-bandgap photon loss and thermalization of high-energy photons.
* **Dual-Junction Synergy:**
  - **Top Cell (Perovskite, Eg ≈ 1.68–1.72 eV):** Captures high-energy blue and green photons (300–600 nm) with minimal thermal relaxation loss.
  - **Bottom Cell (C-Si, Eg ≈ 1.12 eV):** Transparent to visible light, absorbing red and near-infrared photons (600–1100 nm).
* **Theoretical Maximum:** 2-terminal monolithic tandem efficiency reaches up to **43.0%** theoretically, with commercial practical targets between **28% and 32%**.`;
  }

  if (q.includes('cost') || q.includes('lcoe') || q.includes('capex') || q.includes('price')) {
    return `### Levelized Cost of Electricity (LCOE) & Economics

**Economic Trade-Offs for Tandem Photovoltaics:**
* **Balance of System (BOS) Advantage:** In utility-scale solar, land acquisition, mounting racks, civil engineering, cabling, and inverters represent over 55–65% of total capital expenditure. A 20% higher power density (245 W/m² vs 205 W/m²) generates ~20% more power from the identical land footprint and mounting hardware.
* **Manufacturing Cost Premium:** Pilot line production costs in Brandenburg are currently 1.5× to 2.2× higher than commodity Chinese PERC/TOPCon modules ($0.22–0.30/W vs $0.10–0.14/W).
* **Breakeven Threshold:** Techno-economic modeling shows tandem modules become LCOE-competitive with standard silicon once module pricing drops below $0.18/W while maintaining a field lifespan of at least 20–22 years.`;
  }

  return `### Renewable Energy Intelligence: Oxford PV Commercial Tandem Deployment

**Summary Analysis:**
* **Milestone:** First recorded commercial sale and utility deployment of perovskite-on-silicon tandem solar panels (announced Sept 5, 2024 to a US customer).
* **Specifications:** 72-cell commercial module operating at **24.5% efficiency**, yielding 15–20% more power per square meter than conventional panels.
* **Independent Record:** Certified **26.9% efficiency** achieved on residential-sized modules at Fraunhofer ISE CalLab (June 2024).
* **Active Uncertainties:** Long-term degradation over 25 years under field moisture/thermal stress; yield optimization when expanding from megawatt pilot lines to multi-gigawatt fabs.`;
}

// Research query route
app.post('/api/research/ask', async (req, res) => {
  try {
    const { question, context } = req.body;
    if (!question || typeof question !== 'string') {
      return res.status(400).json({ error: 'Valid question string is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.json({
        answer: generateOfflineResponse(question, context),
        isFallback: true,
      });
    }

    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `You are an expert scientific researcher and photovoltaic semiconductor engineer.
Topic: First Commercial Deployment of Perovskite-Silicon Tandem Solar Panels (Oxford PV, Sept 2024 shipment to US utility, 24.5% module efficiency, June 2024 Fraunhofer 26.9% record, Brandenburg pilot line, durability and scaling uncertainties).

Context provided by app:
${context || 'Perovskite-on-silicon tandem solar commercialization vs standard monocrystalline silicon'}

User question:
${question}

Instructions:
1. Provide a direct, authoritative, and scientifically rigorous answer.
2. Clearly distinguish VERIFIED EMPIRICAL FACTS from RESEARCH UNCERTAINTIES / HYPOTHESES.
3. Cite real metrology benchmarks (e.g. Fraunhofer ISE, NREL, IEC 61215) and quantitative numbers where appropriate.
4. Keep the answer structured with clear markdown headings and bullet points.`,
    });

    res.json({
      answer: response.text || generateOfflineResponse(question, context),
      isFallback: false,
    });
  } catch (err: any) {
    console.warn('Backend Gemini API call failed or encountered error, using grounded expert response:', err.message);
    res.json({
      answer: generateOfflineResponse(req.body.question, req.body.context),
      isFallback: true,
    });
  }
});

// Vite middleware or production static files
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: 3000, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();
