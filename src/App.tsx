import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroBreakthrough } from './components/HeroBreakthrough';
import { TandemPhysicsVisualizer } from './components/TandemPhysicsVisualizer';
import { VerifiedVsUncertaintyMatrix } from './components/VerifiedVsUncertaintyMatrix';
import { LcoeSimulator } from './components/LcoeSimulator';
import { TimelineRoadmap } from './components/TimelineRoadmap';
import { ComparativeFrontiers } from './components/ComparativeFrontiers';
import { ReportDrawer } from './components/ReportDrawer';
import { ResearchAssistantModal } from './components/ResearchAssistantModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-amber-100 selection:text-amber-900">
      {/* Top Bar Navigation */}
      <Header
        onOpenReport={() => setIsReportOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      <main className="flex-1">
        {/* Section 1: Breakthrough Executive Overview & Hero Visual */}
        <HeroBreakthrough
          onExplorePhysics={() => scrollToSection('cell-physics')}
          onExploreVerification={() => scrollToSection('verification-matrix')}
        />

        {/* Section 2: Semiconductor Physics & Solar Spectrum Simulator */}
        <TandemPhysicsVisualizer />

        {/* Section 3: Verified Empirical Facts vs Active Uncertainties Matrix */}
        <VerifiedVsUncertaintyMatrix />

        {/* Section 4: Levelized Cost of Electricity (LCOE) Financial Parity Simulator */}
        <LcoeSimulator />

        {/* Section 5: Chronological Milestone Timeline & Manufacturing Cleanroom */}
        <TimelineRoadmap />

        {/* Section 6: Comparative Analysis with Parallel Clean Energy Frontiers */}
        <ComparativeFrontiers />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ReportDrawer isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} />
      <ResearchAssistantModal isOpen={isAssistantOpen} onClose={() => setIsAssistantOpen(false)} />
    </div>
  );
}
