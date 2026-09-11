import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Compass, Gauge, Play, Pause, ZoomIn, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { PtzRadar3D } from '../3d/PtzRadar3D';
import { VigiloxStudioEnvironment } from '../3d/VigiloxStudioEnvironment';
import { useIntersection } from '../../hooks/useIntersection';
import { useQuality } from '../../hooks/useQuality';

export const PtzSection: React.FC = () => {
  const [containerRef, isVisible] = useIntersection<HTMLDivElement>({ threshold: 0.1 });
  const { tier, pixelRatio } = useQuality();

  const [pan, setPan] = useState(140);
  const [tilt, setTilt] = useState(-15);
  const [zoom, setZoom] = useState(10);
  const [isSweeping, setIsSweeping] = useState(false);

  // Math calculations
  const fovDeg = Math.round(Math.max(3, 65 / Math.sqrt(zoom)));
  const groundReachMeters = Math.round(50 + zoom * 12);
  const coveredAreaSqMeters = Math.round(Math.PI * Math.pow(groundReachMeters, 2) * (fovDeg / 360));

  return (
    <section
      ref={containerRef}
      id="ptz"
      className="relative w-full min-h-screen bg-[#050607] text-[#F4F6F7] py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-security-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-1 flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#00f0ff]" />
              03 // 360° HEMISPHERICAL COVERAGE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              NO BLIND SPOTS.
            </h2>
          </div>
          <p className="text-sm font-mono text-[#9EA4A8] max-w-md">
            Continuous endless 360° panning with 450°/second harmonic motor drives. Instantly sweeps, tracks, and locks onto targets across thousands of square meters.
          </p>
        </div>

        {/* Dual Column: 3D Radar Stage + Real-Time Control Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left 3D Radar Visualizer */}
          <div className="lg:col-span-8 relative h-[520px] rounded-sm bg-[#0a0d12] border border-white/10 overflow-hidden shadow-2xl">
            {isVisible && (
              <Canvas
                dpr={pixelRatio}
                camera={{ position: [0, 4, 6.5], fov: 45 }}
                gl={{ antialias: tier === 'high' || tier === 'medium' }}
              >
                <Suspense fallback={null}>
                  <VigiloxStudioEnvironment glowColor="#00f0ff" intensity={1.2} />
                  <PtzRadar3D
                    panAngle={pan}
                    tiltAngle={tilt}
                    zoomLevel={zoom}
                    isSweeping={isSweeping}
                  />
                </Suspense>
              </Canvas>
            )}

            {/* Radar Scope Reticle Overlay */}
            <div className="absolute top-4 left-4 z-20 font-mono text-xs text-[#00f0ff] bg-[#070a0e]/80 px-3 py-1.5 rounded-sm border border-[#00f0ff]/30 backdrop-blur-md">
              <span>ACTIVE RADAR INTERCEPT // PAN: {pan}°</span>
            </div>

            {/* Bottom Quick Status */}
            <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 bg-[#070a0e]/90 border border-white/10 rounded-sm text-xs font-mono text-[#9EA4A8] backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>SLEW RATE: <span className="text-white font-bold">450°/SEC</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span>COVERAGE: <span className="text-[#00f0ff] font-bold">{coveredAreaSqMeters.toLocaleString()} m²</span></span>
              </div>
            </div>
          </div>

          {/* Right Control Console */}
          <div className="lg:col-span-4 bg-[#0a0d12] border border-white/10 rounded-sm p-6 space-y-6 font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-white/8">
              <span className="text-xs text-[#00f0ff] uppercase tracking-wider">PTZ MANUAL CONSOLE</span>
              <button
                type="button"
                onClick={() => setIsSweeping(!isSweeping)}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs rounded-sm border transition-all cursor-pointer ${
                  isSweeping
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                    : 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black'
                }`}
              >
                {isSweeping ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isSweeping ? 'HALT PATROL' : 'AUTO-SWEEP 360°'}</span>
              </button>
            </div>

            {/* Pan Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#9EA4A8]">AZIMUTH (PAN):</span>
                <span className="text-white font-bold">{pan}°</span>
              </div>
              <input
                type="range"
                min="0"
                max="360"
                value={pan}
                disabled={isSweeping}
                onChange={(e) => setPan(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>0° (NORTH)</span>
                <span>180° (SOUTH)</span>
                <span>360°</span>
              </div>
            </div>

            {/* Tilt Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#9EA4A8]">ELEVATION (TILT):</span>
                <span className="text-white font-bold">{tilt}°</span>
              </div>
              <input
                type="range"
                min="-20"
                max="90"
                value={tilt}
                disabled={isSweeping}
                onChange={(e) => setTilt(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>-20° (DEPRESSION)</span>
                <span>0° (HORIZON)</span>
                <span>+90° (ZENITH)</span>
              </div>
            </div>

            {/* Zoom Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#9EA4A8]">OPTICAL TELEPHOTO:</span>
                <span className="text-[#00f0ff] font-bold">{zoom}X ZOOM</span>
              </div>
              <input
                type="range"
                min="1"
                max="40"
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>1X (114° WIDE)</span>
                <span>20X</span>
                <span>40X (1.8° TELE)</span>
              </div>
            </div>

            {/* Live Telemetry Card */}
            <div className="p-4 bg-[#07090c] rounded-sm border border-white/5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#9EA4A8]">CONE BEAM FOV:</span>
                <span className="text-white font-semibold">{fovDeg}°</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9EA4A8]">EFFECTIVE REACH:</span>
                <span className="text-white font-semibold">{groundReachMeters} METERS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9EA4A8]">ZERO-BACKLASH MTBF:</span>
                <span className="text-emerald-400 font-semibold">10,000,000 CYCLES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
