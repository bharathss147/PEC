import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Eye, RotateCw, Terminal, ArrowRight, ShieldCheck, Cpu, Aperture, HardDrive } from 'lucide-react';
import { VigiloxCameraModel } from '../3d/VigiloxCameraModel';
import { VigiloxHotspots3D } from '../3d/VigiloxHotspots3D';
import { VigiloxStudioEnvironment } from '../3d/VigiloxStudioEnvironment';
import { HotspotModal } from '../ui/HotspotModal';
import { VIGILOX_HOTSPOTS } from '../../data/vigiloxData';
import { HotspotItem } from '../../types/vigilox';
import { useIntersection } from '../../hooks/useIntersection';
import { useQuality } from '../../hooks/useQuality';

export const ProductSection: React.FC = () => {
  const [containerRef, isVisible] = useIntersection<HTMLDivElement>({ threshold: 0.1 });
  const { tier, pixelRatio } = useQuality();

  const [activeHotspot, setActiveHotspot] = useState<HotspotItem | null>(null);
  const [modalHotspot, setModalHotspot] = useState<HotspotItem | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [showHotspots, setShowHotspots] = useState(true);

  const handleSelectHotspot = (hotspot: HotspotItem) => {
    setActiveHotspot(hotspot);
    setModalHotspot(hotspot);
  };

  return (
    <section
      ref={containerRef}
      id="products"
      className="relative w-full min-h-screen bg-[#06080B] text-[#F4F6F7] py-28 border-t border-white/[0.08] overflow-hidden"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-security-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Industrial Hierarchy */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-6">
          <div>
            <div className="text-[11px] font-mono text-[#00f0ff] tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
              02 // STRUCTURAL & OPTICAL ANATOMY
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black uppercase text-white tracking-tight leading-[0.95]">
              ENGINEERED FOR<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F4F6F7] to-[#00f0ff]">
                EXTREME CONDITIONAL INTEGRITY.
              </span>
            </h2>
          </div>
          <div className="lg:max-w-md space-y-2">
            <p className="text-xs sm:text-sm font-mono text-[#9EA4A8] leading-relaxed">
              Every curve, heat-sink rib, and optic baffle serves a tactical imperative.
              Interact with the 3D model below to isolate aerospace alloys, starlight optics, and dual-NPU silicon.
            </p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-[#5A6572]">
              <span>TOLERANCE: ±0.005mm</span>
              <span>•</span>
              <span>COATING: CERAMIC FLUOROPOLYMER</span>
            </div>
          </div>
        </div>

        {/* Main 3D Viewport with Tactical HUD */}
        <div className="relative w-full h-[620px] rounded-xs bg-[#090C10] border border-white/10 overflow-hidden shadow-2xl">
          {/* 3D Canvas */}
          {isVisible && (
            <Canvas
              dpr={pixelRatio}
              camera={{ position: [0, 0.4, 4.2], fov: 40 }}
              gl={{ antialias: tier === 'high' || tier === 'medium' }}
            >
              <Suspense fallback={null}>
                <VigiloxStudioEnvironment glowColor="#00f0ff" intensity={1.15} />
                <OrbitControls
                  enableZoom={true}
                  minDistance={2.4}
                  maxDistance={6.5}
                  autoRotate={autoRotate}
                  autoRotateSpeed={0.7}
                  enablePan={false}
                />
                <group position={[0, 0, 0]}>
                  <VigiloxCameraModel
                    wireframe={wireframe}
                    interactiveFollow={false}
                    scale={1.18}
                  />
                  <VigiloxHotspots3D
                    activeHotspot={activeHotspot}
                    onSelectHotspot={handleSelectHotspot}
                    visible={showHotspots}
                  />
                </group>
              </Suspense>
            </Canvas>
          )}

          {/* Top Left Hotspot Category Filter Bar */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-1.5 max-w-lg">
            {VIGILOX_HOTSPOTS.map((h) => (
              <button
                key={h.id}
                type="button"
                onClick={() => handleSelectHotspot(h)}
                className={`px-2.5 py-1 text-[10px] font-mono rounded-xs border transition-all cursor-pointer ${
                  activeHotspot?.id === h.id
                    ? 'bg-[#00f0ff] text-black font-bold border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-[#0B0E13]/85 border-white/10 text-[#9EA4A8] hover:border-white/25 hover:text-white backdrop-blur-md'
                }`}
              >
                {h.label}
              </button>
            ))}
          </div>

          {/* Top Right Tooling Toolbar */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2 rounded-xs border font-mono text-xs backdrop-blur-md transition-all cursor-pointer ${
                autoRotate
                  ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]'
                  : 'bg-[#0B0E13]/85 border-white/10 text-[#9EA4A8] hover:text-white'
              }`}
              title="Toggle Auto Orbit"
              aria-label="Toggle auto rotation"
            >
              <RotateCw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setWireframe(!wireframe)}
              className={`p-2 rounded-xs border font-mono text-xs backdrop-blur-md transition-all cursor-pointer ${
                wireframe
                  ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]'
                  : 'bg-[#0B0E13]/85 border-white/10 text-[#9EA4A8] hover:text-white'
              }`}
              title="Toggle Wireframe Shell"
              aria-label="Toggle wireframe display"
            >
              <Terminal className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setShowHotspots(!showHotspots)}
              className={`p-2 rounded-xs border font-mono text-xs backdrop-blur-md transition-all cursor-pointer ${
                showHotspots
                  ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]'
                  : 'bg-[#0B0E13]/85 border-white/10 text-[#9EA4A8] hover:text-white'
              }`}
              title="Toggle Telemetry Markers"
              aria-label="Toggle hotspot markers"
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Telemetry HUD overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-[#080A0E]/90 border border-white/10 rounded-xs backdrop-blur-md text-[11px] font-mono gap-2.5">
            <div className="flex items-center gap-3">
              <span className="text-[#00f0ff] font-bold">VIGILOX CORE TELEMETRY:</span>
              <span className="text-[#9EA4A8] hidden md:inline">ROTATE 360° • SCROLL/PINCH TO ZOOM</span>
            </div>
            {activeHotspot ? (
              <div className="flex items-center gap-2">
                <span className="text-[#5A6572]">ACTIVE FOCUS:</span>
                <span className="text-white font-semibold">{activeHotspot.title}</span>
                <button
                  type="button"
                  onClick={() => setModalHotspot(activeHotspot)}
                  className="ml-2 px-2.5 py-1 bg-[#00f0ff] text-black font-bold text-[10px] uppercase rounded-xs hover:bg-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>INSPECT SPEC</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <div className="text-[#9EA4A8]">CLICK ANY TELEMETRY PIN TO INSPECT INTERNAL BLUEPRINT</div>
            )}
          </div>
        </div>

        {/* Asymmetric Technical Engineering Briefs Below */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
          <div className="p-6 bg-[#090C10] border border-white/[0.08] rounded-xs hover:border-[#00f0ff]/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-mono text-[#00f0ff] tracking-widest uppercase">ENCLOSURE SPEC</div>
              <ShieldCheck className="w-4 h-4 text-[#9EA4A8] group-hover:text-[#00f0ff] transition-colors" />
            </div>
            <div className="text-lg font-display font-bold text-white mb-2 uppercase">
              6061-T6 BILLET ALUMINUM
            </div>
            <p className="text-xs text-[#9EA4A8] leading-relaxed mb-4">
              Monolithic 5-axis CNC machined housing with marine-grade fluoropolymer coating. Certified against salt-fog corrosion and 50-joule IK10 physical kinetic impacts.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#5A6572]">
              <span>RATING: IP67 / IK10</span>
              <span className="text-white font-medium">-40°C TO +65°C</span>
            </div>
          </div>

          <div className="p-6 bg-[#090C10] border border-white/[0.08] rounded-xs hover:border-[#00f0ff]/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-mono text-[#00f0ff] tracking-widest uppercase">OPTICS INTEGRATION</div>
              <Aperture className="w-4 h-4 text-[#9EA4A8] group-hover:text-[#00f0ff] transition-colors" />
            </div>
            <div className="text-lg font-display font-bold text-white mb-2 uppercase">
              F0.95 STARLIGHT OPTICS
            </div>
            <p className="text-xs text-[#9EA4A8] leading-relaxed mb-4">
              Dual aspherical multi-layer broadband anti-reflective glass. Maximizes photon transmission onto the 1/1.2" backside-illuminated sensor with 144 dB Super WDR.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#5A6572]">
              <span>SENSITIVITY: 0.0003 LUX</span>
              <span className="text-white font-medium">4K @ 60 FPS</span>
            </div>
          </div>

          <div className="p-6 bg-[#090C10] border border-white/[0.08] rounded-xs hover:border-[#00f0ff]/40 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[10px] font-mono text-[#00f0ff] tracking-widest uppercase">EDGE COMPUTATION</div>
              <Cpu className="w-4 h-4 text-[#00f0ff] group-hover:animate-pulse" />
            </div>
            <div className="text-lg font-display font-bold text-white mb-2 uppercase">
              16.8 TOPS DUAL NPU
            </div>
            <p className="text-xs text-[#9EA4A8] leading-relaxed mb-4">
              Onboard hardware neural acceleration delivers sub-millisecond edge classification across 64 concurrent targets without offloading unencrypted streams to cloud servers.
            </p>
            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-[#5A6572]">
              <span>ENCRYPTION: AES-256</span>
              <span className="text-emerald-400 font-medium">ZERO CLOUD LATENCY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Deep Telemetry Modal */}
      <HotspotModal hotspot={modalHotspot} onClose={() => setModalHotspot(null)} />
    </section>
  );
};
