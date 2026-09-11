import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { CinemaScene3D } from '../3d/CinemaScene3D';
import { Film, Video, Disc, Gauge, Radio } from 'lucide-react';

export const CinemaSection: React.FC = () => {
  const [activeProfile, setActiveProfile] = useState<'8k' | '120fps' | 'log'>('8k');

  const specs = [
    { title: '8K RAW', subtitle: 'Uncompressed Cinema DNG', desc: 'Full 8192 × 4320 sensor readout with zero line skipping or pixel binning.' },
    { title: '120 FPS', subtitle: 'High Frame Rate 4K/8K', desc: 'Silky 5x slow-motion recording without thermal throttling or recording caps.' },
    { title: '10-BIT LOG', subtitle: 'Lumora Log3 Gamut', desc: 'Rec.2020 wide color envelope holding over 14.8 stops of grading latitude.' },
    { title: '5-AXIS IBIS', subtitle: 'Magnetic Active Gimbal', desc: 'Electronic and voice-coil gyro stabilization for rock-steady handheld tracking.' },
  ];

  return (
    <section
      id="cinema"
      className="relative w-full min-h-screen py-24 bg-[#040507] flex flex-col justify-between border-t border-white/5 overflow-hidden"
    >
      {/* Cinematic Top Letterbox Bar Indicator */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-black/80 z-20 flex items-center justify-between px-6 border-b border-white/5 text-[10px] font-mono text-white/50">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-white font-bold tracking-wider">● REC [00:18:42:09]</span>
          <span className="hidden sm:inline text-white/40">TCG: 24.000 FPS</span>
        </div>
        <div className="flex items-center gap-4 text-white/60">
          <span>8K RAW DNG</span>
          <span>SHUTTER: 180.0°</span>
          <span>AUDIO: 24-BIT 96kHz</span>
        </div>
      </div>

      {/* Main Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-10">
        <div className="flex items-center gap-2 mb-2">
          <Film size={14} className="text-[#00f0ff]" />
          <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
            MOTION CINEMATOGRAPHY
          </span>
        </div>
        <h2 className="text-4xl md:text-7xl font-black font-display text-white tracking-tighter uppercase">
          TURN MOTION INTO CINEMA.
        </h2>
      </div>

      {/* 3D WebGL Cinema Stage */}
      <div
        className="relative w-full h-[55vh] md:h-[65vh] my-4 cursor-grab active:cursor-grabbing"
        data-cursor="explore"
      >
        <Canvas
          camera={{ position: [0, 0.4, 4.6], fov: 42 }}
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <CinemaScene3D />
        </Canvas>

        {/* Floating Viewfinder Aspect Ratio Guides Overlay */}
        <div className="absolute inset-0 pointer-events-none border-x-4 md:border-x-[40px] border-black/40 flex items-center justify-center">
          <div className="w-[85%] h-[75%] border border-white/10 relative">
            {/* Center Crosshair */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4">
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-[#00f0ff]/60" />
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-[#00f0ff]/60" />
            </div>

            {/* Corner Framing Marks */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/40" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/40" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/40" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/40" />
          </div>
        </div>
      </div>

      {/* Bottom 4 Cinematic Pillars */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-white/10">
          {specs.map((item, index) => (
            <div
              key={index}
              className="p-5 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00f0ff]/40 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-black font-display text-white tracking-tight">
                {item.title}
              </div>
              <div className="text-xs font-mono font-bold text-[#00f0ff] uppercase mt-1">
                {item.subtitle}
              </div>
              <p className="text-xs font-sans text-white/60 leading-relaxed mt-2">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
