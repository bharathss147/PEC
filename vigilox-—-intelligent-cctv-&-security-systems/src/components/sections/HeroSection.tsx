import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ChevronDown, Cpu, ArrowRight, ShieldCheck, Hammer, Layers, Wrench, Shield, Terminal } from 'lucide-react';
import { VigiloxCameraModel } from '../3d/VigiloxCameraModel';
import { VigiloxStudioEnvironment } from '../3d/VigiloxStudioEnvironment';
import { useIntersection } from '../../hooks/useIntersection';
import { useQuality } from '../../hooks/useQuality';
import { COMPANY_PROFILE } from '../../data/companyData';

interface HeroSectionProps {
  onExploreClick: () => void;
  onOpenQuote: () => void;
  onServicesClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onOpenQuote,
  onServicesClick,
}) => {
  const [containerRef, isVisible] = useIntersection<HTMLDivElement>({ threshold: 0.1 });
  const { tier, pixelRatio, isMobile, reducedMotion } = useQuality();
  const [wireframe, setWireframe] = useState(false);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#040D1A] pt-28 pb-12"
    >
      {/* 01. Background Architectural Lighting & Blueprint Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-35 pointer-events-none" />
      
      {/* Central Warm Gold & Deep Navy Anamorphic Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-gradient-to-tr from-[#C5A059]/10 via-[#0A1C36]/40 to-transparent rounded-full blur-3xl pointer-events-none opacity-50" />

      {/* Subtle Vignette Framing */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#040D1A]/70 to-[#040D1A] pointer-events-none" />

      {/* 02. Precision Telemetry Corner Overlays */}
      <div className="absolute top-28 left-6 sm:left-10 font-mono text-[10px] text-[#94A3B8] select-none pointer-events-none hidden sm:block z-20">
        <div className="text-[#DFBF7A] flex items-center gap-1.5 font-bold tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          PARADISE ELITE // SINGAPORE HQ
        </div>
        <div className="opacity-80 mt-1 tracking-wider text-white">CONSTRUCTION • RENOVATION • SECURITY</div>
        <div className="opacity-60 tracking-wider">STANDARDS: BCA & EMA LICENSED</div>
      </div>

      <div className="absolute top-28 right-6 sm:right-10 font-mono text-[10px] text-right text-[#94A3B8] select-none pointer-events-none hidden sm:block z-20">
        <div className="text-[#DFBF7A] font-bold tracking-widest uppercase flex items-center justify-end gap-1.5">
          <span>INTEGRATED INFRASTRUCTURE</span>
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        </div>
        <div className="text-white font-semibold mt-1">TURNKEY ARCHITECTURAL & M&E</div>
        <div className="opacity-60">SURVEILLANCE: 4K STARLIGHT AI OPTICS</div>
      </div>

      {/* 03. 3D WEBGL CAMERA & HARDWARE CANVAS (Interactive Focal Anchor) */}
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-85">
        {isVisible && (
          <Canvas
            dpr={pixelRatio}
            camera={{ position: [0, 0, 4.8], fov: 40 }}
            gl={{ antialias: tier === 'high' || tier === 'medium', powerPreference: 'high-performance' }}
          >
            <Suspense fallback={null}>
              <VigiloxStudioEnvironment glowColor="#C5A059" intensity={1.1} />
              <VigiloxCameraModel
                wireframe={wireframe}
                interactiveFollow={!reducedMotion}
                scale={isMobile ? 0.9 : 1.25}
                position={[0, -0.05, 0]}
              />
            </Suspense>
          </Canvas>
        )}
      </div>

      {/* 04. FOREGROUND EDITORIAL BRAND CONTENT */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center justify-between min-h-[82vh] pointer-events-none">
        {/* Top Eyebrow Badge */}
        <div className="pointer-events-auto pt-2 sm:pt-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xs bg-[#0A1C36]/90 border border-[#C5A059]/30 text-[11px] font-mono text-[#DFBF7A] backdrop-blur-md shadow-[0_0_24px_rgba(197,160,89,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="tracking-widest uppercase font-bold">PARADISE ELITE CONSTRUCTION PTE. LTD.</span>
          </div>
        </div>

        {/* Central Monolithic Headline */}
        <div className="my-auto py-6">
          {/* 4 Pillars Header Ribbon */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-[10px] sm:text-xs font-mono tracking-[0.25em] text-[#C5A059] uppercase mb-4">
            <span>BUILD</span>
            <span className="text-white/30">•</span>
            <span>RENOVATE</span>
            <span className="text-white/30">•</span>
            <span>SECURE</span>
            <span className="text-white/30">•</span>
            <span>MAINTAIN</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black tracking-tight text-white uppercase leading-[0.92] select-none drop-shadow-2xl">
            BUILDING SPACES.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#DFBF7A]">
              SECURING WHAT MATTERS.
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-base md:text-lg text-[#94A3B8] max-w-3xl mx-auto font-sans font-light leading-relaxed">
            Singapore multidisciplinary builder integrating civil construction, turnkey commercial interior renovation, facilities maintenance, and enterprise electronic security infrastructure.
          </p>

          {/* Interactive CTAs & Controls */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 pointer-events-auto">
            <button
              type="button"
              onClick={onOpenQuote}
              className="tactile-button tactile-button-gold px-8 py-3.5 text-xs shadow-xl cursor-pointer"
            >
              <span>REQUEST A QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onServicesClick || onExploreClick}
              className="tactile-button tactile-button-navy px-7 py-3.5 text-xs cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>EXPLORE SERVICES & TRADES</span>
            </button>

            {/* Wireframe Inspection Toggle */}
            <button
              type="button"
              onClick={() => setWireframe(!wireframe)}
              className={`p-3.5 rounded-xs border font-mono text-xs uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer ${
                wireframe
                  ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#DFBF7A]'
                  : 'bg-[#0A1C36]/80 border-white/10 text-[#94A3B8] hover:border-[#C5A059]/40 hover:text-white'
              }`}
              title="Toggle Security Sensor Geometry Shell"
              aria-label="Toggle wireframe inspection mode"
            >
              <Terminal className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom 4 Core Divisions Ticker Bar */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pointer-events-auto border-t border-white/[0.08] pt-4 pb-2 text-[11px] font-mono text-[#94A3B8] gap-3">
          <div className="flex items-center gap-5 flex-wrap justify-center sm:justify-start">
            <div className="flex items-center gap-1.5 text-white">
              <Hammer className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-semibold">CIVIL & RENOVATION</span>
            </div>
            <span className="text-white/20 hidden md:inline">|</span>
            <div className="flex items-center gap-1.5 text-white">
              <Wrench className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="font-semibold">M&E & AIRCON</span>
            </div>
            <span className="text-white/20 hidden md:inline">|</span>
            <div className="flex items-center gap-1.5 text-white">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold">4K AI CCTV & ACCESS</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-[#94A3B8]">
            <button
              type="button"
              onClick={onExploreClick}
              className="flex items-center gap-1.5 text-[#DFBF7A] hover:text-white transition-colors cursor-pointer"
            >
              <span>EXPLORE CAPABILITIES</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
