import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { CameraModel } from '../3d/CameraModel';
import { StudioEnvironment } from '../3d/StudioEnvironment';
import { FloatingHotspots } from '../3d/FloatingHotspots';
import { HotspotModal } from '../ui/HotspotModal';
import { HOTSPOTS_DATA } from '../../data/cameraData';
import { HotspotData } from '../../types';
import { RotateCcw, Play, Pause, Box, Eye, Layers } from 'lucide-react';

export const ExplorerSection: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [wireframe, setWireframe] = useState(false);
  const [lightingMode, setLightingMode] = useState<'studio' | 'cyber' | 'stealth'>('studio');
  const [hotspotsVisible, setHotspotsVisible] = useState(true);
  const controlsRef = useRef<any>(null);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  const handleSelectHotspot = (spot: HotspotData) => {
    setActiveHotspot(spot);
    setAutoRotate(false);
  };

  const rimColor =
    lightingMode === 'cyber'
      ? '#00f0ff'
      : lightingMode === 'stealth'
      ? '#475569'
      : '#e2e8f0';

  return (
    <section
      id="explorer"
      className="relative w-full min-h-screen py-24 bg-[#07080b] flex flex-col justify-between border-t border-white/5 overflow-hidden"
    >
      {/* Background Cyber Grid Accent */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />

      {/* Top Header Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
              INTERACTIVE 3D CAD INSPECTION
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            ENGINEERED TO DISAPPEAR.
          </h2>
        </div>

        {/* Hotspot Quick Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {HOTSPOTS_DATA.map((spot) => (
            <button
              key={spot.id}
              onClick={() => handleSelectHotspot(spot)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                activeHotspot?.id === spot.id
                  ? 'bg-[#00f0ff] text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5'
              }`}
            >
              {spot.name}
            </button>
          ))}
        </div>
      </div>

      {/* 3D Canvas Area */}
      <div
        className="relative w-full h-[65vh] md:h-[72vh] my-4 cursor-grab active:cursor-grabbing"
        data-cursor="explore"
      >
        <Canvas
          camera={{ position: [2.5, 1.2, 3.2], fov: 40 }}
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <StudioEnvironment
            intensity={lightingMode === 'stealth' ? 0.7 : 1.15}
            rimColor={rimColor}
            floorShadow={true}
          />

          <OrbitControls
            ref={controlsRef}
            autoRotate={autoRotate}
            autoRotateSpeed={0.9}
            enableDamping
            dampingFactor={0.05}
            minDistance={1.8}
            maxDistance={6.5}
            maxPolarAngle={Math.PI / 2 + 0.1}
          />

          <group position={[0, -0.1, 0]}>
            <CameraModel
              bodyColor="obsidian"
              grip="standard"
              lens="50mm"
              wireframe={wireframe}
              onPartClick={(id) => {
                const found = HOTSPOTS_DATA.find((s) => s.id === id);
                if (found) handleSelectHotspot(found);
              }}
            />

            <FloatingHotspots
              activeHotspotId={activeHotspot?.id || null}
              onSelectHotspot={handleSelectHotspot}
              visible={hotspotsVisible}
            />
          </group>
        </Canvas>

        {/* Floating Tool Controls Bar */}
        <div className="absolute bottom-6 left-6 z-20 flex items-center gap-2 glass-panel p-1.5 rounded-xl border border-white/10">
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              autoRotate ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-white/60 hover:text-white'
            }`}
            title={autoRotate ? 'Pause Rotation' : 'Auto Rotate'}
            aria-label="Toggle auto rotation"
          >
            {autoRotate ? <Pause size={16} /> : <Play size={16} />}
          </button>

          <button
            onClick={() => setWireframe(!wireframe)}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              wireframe ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-white/60 hover:text-white'
            }`}
            title="Toggle Structural Wireframe"
            aria-label="Toggle structural wireframe"
          >
            <Box size={16} />
          </button>

          <button
            onClick={() => setHotspotsVisible(!hotspotsVisible)}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              hotspotsVisible ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'text-white/60 hover:text-white'
            }`}
            title="Toggle Hotspot Markers"
            aria-label="Toggle hotspot markers"
          >
            <Eye size={16} />
          </button>

          <button
            onClick={resetCamera}
            className="p-2 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer"
            title="Reset Perspective"
            aria-label="Reset perspective"
          >
            <RotateCcw size={16} />
          </button>

          <div className="h-4 w-[1px] bg-white/10 mx-1" />

          {/* Lighting Mode Selector */}
          <div className="flex items-center gap-1 text-[10px] font-mono pr-1">
            {(['studio', 'cyber', 'stealth'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setLightingMode(mode)}
                className={`px-2 py-1 rounded uppercase transition-colors cursor-pointer ${
                  lightingMode === mode
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Technical Hotspot Modal */}
      <HotspotModal
        hotspot={activeHotspot}
        onClose={() => setActiveHotspot(null)}
      />

      {/* Bottom Status Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-[11px] font-mono text-white/40 pt-4 border-t border-white/5">
        <span>PINCH / SCROLL TO ZOOM — DRAG TO ROTATE 360°</span>
        <span className="text-[#00f0ff]">CLICK HIGHLIGHT BEACONS FOR TELEMETRY</span>
      </div>
    </section>
  );
};
