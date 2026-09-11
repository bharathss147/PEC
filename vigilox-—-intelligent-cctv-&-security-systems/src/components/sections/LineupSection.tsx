import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Check, ArrowRight, Layers, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';
import { SpatialLineup3D } from '../3d/SpatialLineup3D';
import { VigiloxStudioEnvironment } from '../3d/VigiloxStudioEnvironment';
import { VIGILOX_PRODUCTS } from '../../data/vigiloxData';
import { VigiloxModelId, VigiloxProduct } from '../../types/vigilox';
import { useIntersection } from '../../hooks/useIntersection';
import { useQuality } from '../../hooks/useQuality';

interface LineupSectionProps {
  onOpenConsultation: () => void;
}

export const LineupSection: React.FC<LineupSectionProps> = ({ onOpenConsultation }) => {
  const [containerRef, isVisible] = useIntersection<HTMLDivElement>({ threshold: 0.1 });
  const { tier, pixelRatio } = useQuality();

  const [selectedId, setSelectedId] = useState<VigiloxModelId>('core');
  const currentProduct: VigiloxProduct =
    VIGILOX_PRODUCTS.find((p) => p.id === selectedId) || VIGILOX_PRODUCTS[0];

  return (
    <section
      ref={containerRef}
      id="lineup"
      className="relative w-full min-h-screen bg-[#06080B] text-[#F4F6F7] py-28 border-t border-white/[0.08] overflow-hidden"
    >
      <div className="absolute inset-0 bg-security-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header with Technical Eyebrow */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-6">
          <div>
            <div className="text-[11px] font-mono text-[#00f0ff] tracking-widest uppercase mb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-[#00f0ff]" />
              06 // SPATIAL SENSOR ARSENAL
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase text-white tracking-tight leading-[0.95]">
              THE VIGILOX<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F6F7] to-[#00f0ff]">
                HARDWARE LINEUP.
              </span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm font-mono text-[#9EA4A8] max-w-md leading-relaxed">
            Purpose-built form factors for long-range perimeter interdiction, subterranean utility tunnels, and covert architectural monitoring.
          </p>
        </div>

        {/* Product Selector Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mb-8 font-mono text-xs">
          {VIGILOX_PRODUCTS.map((prod) => {
            const isSelected = selectedId === prod.id;
            return (
              <button
                key={prod.id}
                type="button"
                onClick={() => setSelectedId(prod.id)}
                className={`p-3.5 text-left rounded-xs border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? 'bg-[#0B0E13] text-white border-[#00f0ff] shadow-[0_0_24px_rgba(0,240,255,0.25)]'
                    : 'bg-[#090C10] border-white/[0.08] text-[#9EA4A8] hover:border-white/20 hover:text-white'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#00f0ff]" />
                )}
                <div className="text-[9px] text-[#00f0ff] uppercase tracking-widest font-bold">
                  {prod.category.split(' ')[0]}
                </div>
                <div className="text-sm font-display font-black uppercase truncate mt-1">
                  {prod.name.replace('VIGILOX ', '')}
                </div>
                <div className="text-[10px] mt-1 text-[#9EA4A8] truncate font-mono">
                  ${prod.price.toLocaleString()} USD
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Showcase Stage: Left 3D Canvas, Right Spec Detail Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* 3D Model Stage */}
          <div className="lg:col-span-7 relative min-h-[480px] lg:min-h-[560px] rounded-xs bg-[#090C10] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between">
            {isVisible && (
              <div className="absolute inset-0">
                <Canvas
                  dpr={pixelRatio}
                  camera={{ position: [0, 0.4, 4.2], fov: 40 }}
                  gl={{ antialias: tier === 'high' || tier === 'medium' }}
                >
                  <Suspense fallback={null}>
                    <VigiloxStudioEnvironment glowColor="#00f0ff" intensity={1.2} />
                    <SpatialLineup3D activeModel={selectedId} autoRotate={true} />
                  </Suspense>
                </Canvas>
              </div>
            )}

            {/* In-Canvas Top Badge */}
            <div className="relative z-20 m-4 flex items-center justify-between pointer-events-none">
              <div className="font-mono text-xs bg-[#07090D]/90 border border-white/10 px-3 py-1.5 rounded-xs backdrop-blur-md flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[#00f0ff] font-bold">{currentProduct.name}</span>
                <span className="text-white/25">|</span>
                <span className="text-[#9EA4A8]">{currentProduct.weatherRating}</span>
              </div>

              <div className="font-mono text-[10px] bg-[#07090D]/90 border border-white/10 px-2.5 py-1.5 rounded-xs text-[#9EA4A8] backdrop-blur-md hidden sm:block">
                LIVE HARDWARE RENDER
              </div>
            </div>

            {/* In-Canvas Bottom Telemetry */}
            <div className="relative z-20 m-4 p-3 bg-[#07090D]/90 border border-white/10 rounded-xs font-mono text-xs text-[#9EA4A8] backdrop-blur-md flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span className="text-white font-medium">{currentProduct.resolution}</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-[#5A6572] text-[10px] block">ENTERPRISE MSRP</span>
                <span className="text-[#00f0ff] font-bold text-sm">
                  ${currentProduct.price.toLocaleString()} USD
                </span>
              </div>
            </div>
          </div>

          {/* Right Product Dossier */}
          <div className="lg:col-span-5 bg-[#090C10] border border-white/10 rounded-xs p-6 sm:p-8 flex flex-col justify-between font-mono space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-[#00f0ff] tracking-widest uppercase font-bold">
                  {currentProduct.category}
                </span>
                <span className="px-2 py-0.5 rounded-xs bg-emerald-400/10 border border-emerald-400/30 text-[10px] text-emerald-400 font-mono">
                  IN PRODUCTION
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-1 uppercase">
                {currentProduct.name}
              </h3>
              
              <p className="text-xs text-[#9EA4A8] mt-2 font-sans font-light leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* Spec Table */}
            <div className="space-y-2 py-3 border-y border-white/[0.08] text-xs">
              {currentProduct.specs.slice(0, 5).map((spec, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-white/[0.03] last:border-0">
                  <span className="text-[#9EA4A8]">{spec.label}</span>
                  <span className="text-white font-semibold text-right">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* AI Capabilities Checklist */}
            <div>
              <div className="text-[10px] text-[#00f0ff] uppercase tracking-wider mb-2 font-bold flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                <span>INTEGRATED EDGE INTELLIGENCE</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F4F6F7]">
                {currentProduct.aiFeatures.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 bg-[#0B0E13] p-1.5 rounded-xs border border-white/5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="truncate text-[11px]">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="tactile-button tactile-button-primary w-full py-3.5 text-xs tracking-wider cursor-pointer"
              >
                <span>REQUEST SYSTEM SPEC & RFP</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
