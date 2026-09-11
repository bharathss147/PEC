import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { LensLab3D } from '../3d/LensLab3D';
import { LENSES_DATA } from '../../data/lensesData';
import { LensSpecification } from '../../types';
import { Aperture, CircleDot, ShieldCheck, Sparkles, Sliders } from 'lucide-react';

export const LensLabSection: React.FC = () => {
  const [selectedLens, setSelectedLens] = useState<LensSpecification>(LENSES_DATA[2]); // Default 50mm F1.2
  const [aperture, setAperture] = useState<number>(1.2);

  const handleSelectLens = (lens: LensSpecification) => {
    setSelectedLens(lens);
    // Reset aperture to wide open for this lens
    setAperture(lens.apertureRange[0]);
  };

  return (
    <section
      id="lens-lab"
      className="relative w-full min-h-screen py-24 bg-[#07080b] flex flex-col justify-between border-t border-white/5 overflow-hidden"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,240,255,0.06)_0%,transparent_60%)] pointer-events-none" />

      {/* Top Header & Lens Selector Buttons */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
              L-INFINITY OPTICAL LABORATORY
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            MASTER OPTICAL FORMULAS.
          </h2>
          <p className="text-sm font-mono text-white/50 max-w-lg mt-2">
            Multi-element fluorite and extreme aspherical glass assemblies engineered for zero spherical aberration.
          </p>
        </div>

        {/* The 5 Lenses Selector Strip */}
        <div className="flex flex-wrap items-center gap-2">
          {LENSES_DATA.map((lens) => {
            const isCurrent = selectedLens.id === lens.id;
            return (
              <button
                key={lens.id}
                onClick={() => handleSelectLens(lens)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#00f0ff] text-black font-bold shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10'
                }`}
              >
                <Aperture size={13} />
                <span>{lens.id.toUpperCase()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Stage & Interactive Lens Interface */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-6">
        {/* 3D WebGL Lens Canvas (7 cols) */}
        <div
          className="lg:col-span-7 h-[50vh] md:h-[65vh] relative cursor-grab active:cursor-grabbing"
          data-cursor="explore"
        >
          <Canvas
            camera={{ position: [0, 0.4, 6.0], fov: 40 }}
            shadows
            dpr={[1, 2]}
            gl={{ antialias: true }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[4, 6, 4]} intensity={2.2} color="#ffffff" />
            <directionalLight position={[-4, 2, -3]} intensity={2.0} color="#00f0ff" />
            <directionalLight position={[0, -5, 2]} intensity={0.5} color="#38bdf8" />

            <LensLab3D
              activeLens={selectedLens}
              apertureValue={aperture}
            />
          </Canvas>

          {/* Aperture Iris Interactive Controller Overlay */}
          <div className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 z-20 glass-panel p-4 rounded-xl border border-white/10 max-w-sm backdrop-blur-xl">
            <div className="flex items-center justify-between text-xs font-mono mb-2">
              <span className="flex items-center gap-1.5 text-white/70">
                <Sliders size={13} className="text-[#00f0ff]" /> IRIS APERTURE BLADES
              </span>
              <span className="text-base font-bold font-mono text-[#00f0ff]">
                f/{aperture.toFixed(1)}
              </span>
            </div>

            <input
              type="range"
              min={selectedLens.apertureRange[0]}
              max={selectedLens.apertureRange[1]}
              step="0.1"
              value={aperture}
              onChange={(e) => setAperture(parseFloat(e.target.value))}
              className="w-full accent-[#00f0ff] cursor-pointer"
              aria-label="Aperture iris adjustment"
            />

            <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
              <span>WIDE OPEN (f/{selectedLens.apertureRange[0]})</span>
              <span>STOPPED DOWN (f/{selectedLens.apertureRange[1]})</span>
            </div>
          </div>
        </div>

        {/* Detailed Technical Specification Sidebar (5 cols) */}
        <div className="lg:col-span-5 glass-panel p-6 md:p-8 rounded-2xl border border-white/10 space-y-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase">
              OPTICAL BLUEPRINT
            </span>
            <h3 className="text-2xl font-bold font-display text-white tracking-tight mt-1">
              {selectedLens.name}
            </h3>
            <p className="text-sm text-white/70 font-sans leading-relaxed mt-2">
              {selectedLens.description}
            </p>
          </div>

          {/* Key Optical Highlights */}
          <div className="p-3.5 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/20 flex items-start gap-3">
            <Sparkles size={18} className="text-[#00f0ff] shrink-0 mt-0.5" />
            <div className="text-xs font-mono text-white/90">
              <span className="text-[#00f0ff] font-bold block mb-0.5">ACOUSTIC LINEAR DRIVE</span>
              {selectedLens.highlight}
            </div>
          </div>

          {/* Technical Spec Matrix */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] font-mono text-white/40 uppercase">FOCAL LENGTH</span>
              <div className="text-xs font-mono font-bold text-white mt-0.5">
                {selectedLens.focalLength}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] font-mono text-white/40 uppercase">FILTER THREAD</span>
              <div className="text-xs font-mono font-bold text-white mt-0.5">
                Ø {selectedLens.filterDiameter}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] font-mono text-white/40 uppercase">OPTICAL GROUPS</span>
              <div className="text-xs font-mono font-bold text-white mt-0.5">
                {selectedLens.elements}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-black/40 border border-white/5">
              <span className="text-[10px] font-mono text-white/40 uppercase">DIAPHRAGM BLADES</span>
              <div className="text-xs font-mono font-bold text-white mt-0.5">
                {selectedLens.diaphragmBlades} Circular Blades
              </div>
            </div>
          </div>

          {/* Price & Mount Status */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-white/40 block">PRICE (MSRP)</span>
              <span className="text-2xl font-bold font-mono text-white">
                ${selectedLens.price.toLocaleString()}{' '}
                <span className="text-xs text-white/40 font-normal">USD</span>
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-white/40 block">MOUNT SPEC</span>
              <span className="text-xs font-mono font-bold text-[#00f0ff]">
                L-INFINITY BAYONET
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
