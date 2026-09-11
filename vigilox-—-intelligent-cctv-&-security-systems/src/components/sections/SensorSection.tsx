import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Sensor3D } from '../3d/SensorScene';
import { Sparkles, Sun, Eye, Zap, Waves } from 'lucide-react';

export const SensorSection: React.FC = () => {
  return (
    <section
      id="sensor"
      className="relative w-full min-h-screen py-24 bg-[#06070a] flex flex-col justify-between border-t border-white/5 overflow-hidden"
    >
      {/* Background Radial Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,240,255,0.08)_0%,transparent_70%)] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
              PHOTOVOLTAIC ARCHITECTURE
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight">
            45.7 MP FULL-FRAME SENSOR.
          </h2>
          <p className="mt-3 text-lg md:text-xl font-sans text-white/80 font-light italic">
            “Every photon becomes possibility.”
          </p>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest block">
            READOUT SPEED
          </span>
          <span className="text-2xl font-bold font-mono text-[#00f0ff]">
            1/200s FULL DIE
          </span>
        </div>
      </div>

      {/* 3D WebGL Sensor Visualization */}
      <div
        className="relative w-full h-[62vh] md:h-[70vh] my-4 cursor-grab active:cursor-grabbing"
        data-cursor="explore"
      >
        <Canvas
          camera={{ position: [0, 0, 5.2], fov: 45 }}
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[4, 6, 4]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-4, -3, 3]} intensity={1.2} color="#00f0ff" />
          <directionalLight position={[0, -6, -2]} intensity={1.0} color="#0369a1" />

          <Sensor3D />
        </Canvas>

        {/* Floating Photon HUD Tags */}
        <div className="absolute top-8 left-6 md:left-12 pointer-events-none space-y-3">
          <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center gap-3 backdrop-blur-md">
            <Sun size={18} className="text-[#00f0ff]" />
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase">STACKED ARCHITECTURE</div>
              <div className="text-xs font-mono font-bold text-white">Back-Illuminated Copper BSI</div>
            </div>
          </div>

          <div className="glass-panel p-3 rounded-xl border border-white/10 flex items-center gap-3 backdrop-blur-md">
            <Waves size={18} className="text-[#00f0ff]" />
            <div>
              <div className="text-[10px] font-mono text-white/40 uppercase">COLOR RECONSTRUCTION</div>
              <div className="text-xs font-mono font-bold text-white">Optical Low-Pass Suppressed</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Core Technical Metrics at Bottom */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/10">
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="text-2xl md:text-3xl font-black font-display text-white">45.7 MP</div>
            <div className="text-[11px] font-mono text-[#00f0ff] uppercase mt-1">EFFECTIVE PIXELS</div>
            <div className="text-[10px] font-mono text-white/40 mt-1">8256 × 5504 Resolution</div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="text-2xl md:text-3xl font-black font-display text-white">14+ STOPS</div>
            <div className="text-[11px] font-mono text-[#00f0ff] uppercase mt-1">DYNAMIC RANGE</div>
            <div className="text-[10px] font-mono text-white/40 mt-1">Wide Latitude Tonality</div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="text-2xl md:text-3xl font-black font-display text-white">64–51,200</div>
            <div className="text-[11px] font-mono text-[#00f0ff] uppercase mt-1">NATIVE ISO RANGE</div>
            <div className="text-[10px] font-mono text-white/40 mt-1">Dual Base 64 / 800</div>
          </div>

          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <div className="text-2xl md:text-3xl font-black font-display text-white">15 FPS</div>
            <div className="text-[11px] font-mono text-[#00f0ff] uppercase mt-1">BURST RATE</div>
            <div className="text-[10px] font-mono text-white/40 mt-1">Full Mechanical AF/AE</div>
          </div>
        </div>
      </div>
    </section>
  );
};
