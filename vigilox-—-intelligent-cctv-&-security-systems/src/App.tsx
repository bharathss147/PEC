import React, { useState } from 'react';
import { Navbar } from './components/ui/Navbar';
import { SecurityReticleCursor } from './components/ui/SecurityReticleCursor';
import { PerformanceHUD } from './components/ui/PerformanceHUD';
import { UniversalQuoteModal } from './components/ui/UniversalQuoteModal';

// Master Shell Sections
import { HeroSection } from './components/sections/HeroSection';
import { CompanyIntroSection } from './components/sections/CompanyIntroSection';
import { ServicesMatrixSection } from './components/sections/ServicesMatrixSection';
import { CommercialOverviewSection } from './components/sections/CommercialOverviewSection';

// Specialized Security & 3D Hardware Sections
import { HikvisionExplodedSection } from './components/sections/HikvisionExplodedSection';
import { ProductSection } from './components/sections/ProductSection';
import { PtzSection } from './components/sections/PtzSection';
import { AiVisionSection } from './components/sections/AiVisionSection';
import { NightVisionSection } from './components/sections/NightVisionSection';
import { LineupSection } from './components/sections/LineupSection';
import { SecurityEnvSection } from './components/sections/SecurityEnvSection';
import { CommandCenterSection } from './components/sections/CommandCenterSection';
import { TechMetricsSection } from './components/sections/TechMetricsSection';
import { ConfiguratorSection } from './components/sections/ConfiguratorSection';
import { FooterSection } from './components/sections/FooterSection';

export default function App() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [preselectedTrade, setPreselectedTrade] = useState<string | undefined>(undefined);
  const [activeTab, setActiveTab] = useState('home');

  const scrollTo = (id: string) => {
    setActiveTab(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenTradeQuote = (tradeName: string) => {
    setPreselectedTrade(tradeName);
    setQuoteModalOpen(true);
  };

  const handleOpenGeneralQuote = () => {
    setPreselectedTrade(undefined);
    setQuoteModalOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#040D1A] text-[#F8FAFC] selection:bg-[#C5A059]/30 selection:text-white">
      {/* Precision Reticle Tracking Cursor */}
      <SecurityReticleCursor />

      {/* Master Global Brand Navigation */}
      <Navbar
        activeTab={activeTab}
        onSelectNav={(id) => setActiveTab(id)}
        onOpenQuote={handleOpenGeneralQuote}
      />

      {/* MASTER WEBSITE TIMELINE */}
      <main>
        {/* 01. Master Brand Hero */}
        <HeroSection
          onExploreClick={() => scrollTo('about')}
          onOpenQuote={handleOpenGeneralQuote}
          onServicesClick={() => scrollTo('services')}
        />

        {/* 02. Corporate Identity & Capability (Build, Renovate, Secure, Maintain) */}
        <CompanyIntroSection
          onOpenQuote={handleOpenGeneralQuote}
          onExploreServices={() => scrollTo('services')}
        />

        {/* 03. Turnkey Services & 14 Specialized Trades Matrix */}
        <ServicesMatrixSection
          onSelectTradeQuote={handleOpenTradeQuote}
        />

        {/* 04. Dedicated Electronic Security & 3D Optics Division Anchor */}
        <div id="products" className="relative bg-[#061224] py-8 border-t border-[#C5A059]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs">
              <div className="flex items-center gap-2 text-[#DFBF7A]">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold tracking-widest uppercase">
                  DIVISION 03 // ENTERPRISE CCTV & INTELLIGENT SECURITY
                </span>
              </div>
              <span className="text-[#94A3B8]">
                FEATURING 4K STARLIGHT SENSORS • HIKVISION • DAHUA • VIGI INFRASTRUCTURE
              </span>
            </div>
          </div>
        </div>

        {/* 3D Hardware Node (Preserving the rich 3D experience) */}
        <HikvisionExplodedSection />

        {/* Interactive 3D Product Anatomy with Telemetry Hotspots */}
        <ProductSection />

        {/* 360° PTZ & Real-Time Radar Coverage Visualization */}
        <PtzSection />

        {/* Simulated Edge AI Surveillance Viewport */}
        <AiVisionSection />

        {/* TrueColor Starlight Night Vision Before/After Slider */}
        <NightVisionSection />

        {/* 3D Spatial Product Lineup Showcase */}
        <LineupSection onOpenConsultation={handleOpenGeneralQuote} />

        {/* 05. Commercial Infrastructure & Target Sectors */}
        <CommercialOverviewSection
          onOpenQuote={handleOpenGeneralQuote}
        />

        {/* Facility Threat Intercept & Real-World Scenarios */}
        <SecurityEnvSection />

        {/* Centralized Surveillance Command Center Mosaic */}
        <CommandCenterSection />

        {/* Numerical Benchmarks & Compliance Specifications */}
        <TechMetricsSection />

        {/* Enterprise Deployment Blueprint Estimator */}
        <ConfiguratorSection onOpenConsultation={handleOpenGeneralQuote} />
      </main>

      {/* Verified Global Footer */}
      <FooterSection onOpenConsultation={handleOpenGeneralQuote} />

      {/* Floating Real-Time Performance & Quality Telemetry HUD */}
      <PerformanceHUD />

      {/* Universal Multi-Trade Project Quote Modal */}
      <UniversalQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        preselectedTrade={preselectedTrade}
      />
    </div>
  );
}
