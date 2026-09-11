import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { TechLab3D } from '../3d/TechLab3D';
import { TECH_COMPONENTS } from '../../data/techLabData';
import { TechComponentInfo } from '../../types';
import { Cpu, Zap, Activity, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const TechLabSection: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<TechComponentInfo | null>(TECH_COMPONENTS[0]);

  return (
    <section
      id="tech-lab"
      className="relative w-full min-h-screen py-24 bg-[#050609] flex flex-col justify-between border-t border-white/5 overflow-hidden"
    >
      {/* Top Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
              INTERCONNECTED EMBEDDED COMPUTING
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black font-display text-white tracking-tight uppercase">
            TECHNOLOGY YOU CAN FEEL.
          </h2>
          <p className="text-sm font-mono text-white/50 max-w-lg mt-2">
            A synchronous network of low-latency coprocessors, rare-earth voice coils, and graphene loops working in concert.
          </p>
        </div>

        {/* Selected Component Status Badge */}
        {selectedComp && (
          <div className="glass-panel px-4 py-2.5 rounded-xl border border-[#00f0ff]/30 text-right">
            <span className="text-[10px] font-mono text-white/40 uppercase block">
              SELECTED SUBSYSTEM
            </span>
            <span className="text-sm font-mono font-bold text-[#00f0ff]">
              {selectedComp.name}
            </span>
          </div>
        )}
      </div>

      {/* 3D WebGL Tech Lab Canvas */}
      <div
        className="relative w-full h-[60vh] md:h-[68vh] my-4 cursor-grab active:cursor-grabbing"
        data-cursor="explore"
      >
        <Canvas
          camera={{ position: [0, 0.5, 4.8], fov: 45 }}
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[4, 5, 4]} intensity={2.0} color="#ffffff" />
          <directionalLight position={[-4, 2, -3]} intensity={1.8} color="#00f0ff" />
          <pointLight position={[0, 0, 0]} intensity={2.5} color="#00f0ff" distance={8} />

          <TechLab3D
            selectedComponent={selectedComp}
            onSelectComponent={(comp) => setSelectedComp(comp)}
          />
        </Canvas>

        {/* Active Component Telemetry Card Floating Overlay */}
        {selectedComp && (
          <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-8 md:w-96 z-20 glass-panel-glow p-5 rounded-2xl border border-[#00f0ff]/40 shadow-2xl backdrop-blur-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-3">
              <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase">
                {selectedComp.metric}
              </span>
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-ping" />
            </div>
            <h4 className="text-lg font-bold font-display text-white mb-1.5">
              {selectedComp.name}
            </h4>
            <p className="text-xs font-sans text-white/75 leading-relaxed">
              {selectedComp.summary}
            </p>
          </div>
        )}
      </div>

      {/* Bottom Subsystems Selector Strip */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4 border-t border-white/10">
          {TECH_COMPONENTS.map((comp) => {
            const isSel = selectedComp?.id === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedComp(comp)}
                className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                  isSel
                    ? 'bg-[#00f0ff]/10 border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                    : 'bg-black/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="text-[10px] font-mono text-white/40 uppercase">MODULE</div>
                <div className="text-xs font-mono font-bold text-white mt-0.5 truncate">
                  {comp.name}
                </div>
                <div className="text-[10px] font-mono text-[#00f0ff] mt-1 truncate">
                  {comp.metric}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
