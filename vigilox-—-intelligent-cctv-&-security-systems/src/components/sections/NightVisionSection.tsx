import React, { useState } from 'react';
import { Moon, Sun, Sliders, Shield, Eye, Flame, Activity } from 'lucide-react';

export const NightVisionSection: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [mode, setMode] = useState<'starlight' | 'infrared' | 'thermal'>('starlight');

  return (
    <section
      id="night-vision"
      className="relative w-full min-h-screen bg-[#050607] text-[#F4F6F7] py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-security-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-1 flex items-center gap-2">
              <Moon className="w-4 h-4 text-[#00f0ff]" />
              05 // SUB-LUX OPTICAL CAPTURE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              LIGHT IN ABSOLUTE OBSCURITY.
            </h2>
          </div>
          <p className="text-sm font-mono text-[#9EA4A8] max-w-md">
            Drag the slider to compare conventional 0-Lux darkness against VIGILOX TrueColor Starlight Night Vision powered by 1/1.2" backside-illuminated sensors.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 mb-6 font-mono text-xs">
          <span className="text-[#9EA4A8] mr-2">SPECTRUM MODE:</span>
          {[
            { id: 'starlight', label: 'TRUECOLOR STARLIGHT (0.0003 LUX)' },
            { id: 'infrared', label: '850nm DUAL-SPECTRUM IR' },
            { id: 'thermal', label: 'NEURAL THERMAL FUSION' },
          ].map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id as any)}
              className={`px-3.5 py-1.5 rounded-sm border uppercase transition-all cursor-pointer ${
                mode === m.id
                  ? 'bg-[#00f0ff] text-black font-bold border-[#00f0ff]'
                  : 'bg-[#0e1216] text-[#9EA4A8] border-white/10 hover:text-white'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Interactive Comparison Stage */}
        <div className="relative w-full h-[520px] rounded-sm border border-white/15 overflow-hidden shadow-2xl select-none group">
          {/* UNDER LAYER: VIGILOX Full-Color Neural Night Vision */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80"
              alt="VIGILOX TrueColor Starlight View"
              className={`w-full h-full object-cover ${
                mode === 'infrared'
                  ? 'filter grayscale contrast-150 brightness-110'
                  : mode === 'thermal'
                  ? 'filter hue-rotate-180 invert brightness-90 contrast-200'
                  : 'filter brightness-105 contrast-110 saturate-125'
              }`}
            />
            {/* VIGILOX Watermark & Status */}
            <div className="absolute top-4 right-4 z-10 bg-[#05080c]/85 border border-[#00f0ff]/40 px-3 py-1.5 rounded-sm font-mono text-xs text-[#00f0ff] backdrop-blur-md">
              <span className="font-bold">VIGILOX TRUECOLOR // 0.0003 LUX ACTIVE</span>
            </div>
          </div>

          {/* OVER LAYER: Conventional Grainy Darkness (Clipped by sliderPos) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="relative w-full h-full min-w-[1000px]">
              <img
                src="https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1600&q=80"
                alt="Conventional Low Light Darkness"
                className="w-full h-full object-cover filter brightness-20 contrast-150 grayscale blur-[1px]"
              />
              {/* Noise Grain simulation */}
              <div className="absolute inset-0 bg-black/60 mix-blend-multiply pointer-events-none" />

              {/* Conventional Label */}
              <div className="absolute top-4 left-4 z-10 bg-black/80 border border-white/20 px-3 py-1.5 rounded-sm font-mono text-xs text-[#9EA4A8] backdrop-blur-md">
                <span>CONVENTIONAL SENSOR // PITCH OBSCURITY</span>
              </div>
            </div>
          </div>

          {/* Draggable Divider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-[#00f0ff] cursor-ew-resize z-20 shadow-[0_0_15px_#00f0ff]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#00f0ff] text-black flex items-center justify-center font-bold shadow-lg border-2 border-white">
              <Sliders className="w-4 h-4 rotate-90" />
            </div>
          </div>

          {/* Hidden full-area range input for seamless drag & touch */}
          <input
            type="range"
            min="0"
            max="100"
            value={sliderPos}
            onChange={(e) => setSliderPos(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            aria-label="Drag night vision comparison slider"
          />

          {/* Bottom Telemetry Bar */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between p-3 bg-[#05080c]/85 border border-white/10 rounded-sm font-mono text-xs backdrop-blur-md text-[#9EA4A8]">
            <div className="flex items-center gap-2">
              <span className="text-[#00f0ff] font-bold">DRAG SLIDER HORIZONTALLY</span>
              <span className="hidden sm:inline text-white/30">|</span>
              <span className="hidden sm:inline">1/1.2" BACKSIDE-ILLUMINATED SONY STARVIS 2</span>
            </div>
            <div className="flex items-center gap-2 text-white">
              <span>SENSITIVITY GAIN:</span>
              <span className="text-emerald-400 font-bold">+42 dB NOISE-FREE</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 font-mono text-xs">
          <div className="p-4 bg-[#0a0d12] border border-white/8 rounded-sm">
            <div className="text-[#00f0ff] font-bold mb-1">0.0003 LUX SENSITIVITY</div>
            <p className="text-[#9EA4A8] leading-relaxed">
              Ultra-large 2.9µm pixel diodes gather sufficient ambient photons under starlight to render natural clothing colors and skin tones without external spotlights.
            </p>
          </div>

          <div className="p-4 bg-[#0a0d12] border border-white/8 rounded-sm">
            <div className="text-[#00f0ff] font-bold mb-1">940nm STEALTH INFRARED</div>
            <p className="text-[#9EA4A8] leading-relaxed">
              Completely covert 940nm wavelengths eliminate the tell-tale red glow of standard security cameras, keeping tactical surveillance undetectable in the dark.
            </p>
          </div>

          <div className="p-4 bg-[#0a0d12] border border-white/8 rounded-sm">
            <div className="text-[#00f0ff] font-bold mb-1">SMART BEAM SHAPING</div>
            <p className="text-[#9EA4A8] leading-relaxed">
              Dynamic optical reflectors narrow the infrared beam when zooming in on distant perimeter fences, preventing severe face wash-out on nearby subjects.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
