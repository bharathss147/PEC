import React, { useState, useEffect } from 'react';
import { Cpu, ShieldCheck, UserCheck, Car, Eye, Zap, Activity, AlertTriangle } from 'lucide-react';
import { AI_TARGETS } from '../../data/vigiloxData';
import { AiDetectionClass, AiDetectionTarget } from '../../types/vigilox';

export const AiVisionSection: React.FC = () => {
  const [activeClasses, setActiveClasses] = useState<Record<AiDetectionClass, boolean>>({
    person: true,
    vehicle: true,
    face: true,
    motion: true,
    perimeter: true,
  });

  const [selectedTarget, setSelectedTarget] = useState<AiDetectionTarget | null>(AI_TARGETS[0]);
  const [inferenceTime, setInferenceTime] = useState(3.8);

  useEffect(() => {
    const interval = setInterval(() => {
      setInferenceTime(+(3.6 + Math.random() * 0.5).toFixed(1));
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const toggleClass = (c: AiDetectionClass) => {
    setActiveClasses((prev) => ({ ...prev, [c]: !prev[c] }));
  };

  const visibleTargets = AI_TARGETS.filter((t) => activeClasses[t.classType]);

  return (
    <section
      id="ai-vision"
      className="relative w-full min-h-screen bg-[#07090c] text-[#F4F6F7] py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-security-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#00f0ff]" />
              04 // EDGE NEURAL PROCESSING
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              INTELLIGENCE IN EVERY FRAME.
            </h2>
          </div>
          <p className="text-sm font-mono text-[#9EA4A8] max-w-md">
            Dual Hexa-Core NPUs execute 16.8 TOPS of continuous inference. Humans, vehicles, and behavioral anomalies are tokenized at the edge with zero cloud latency.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 bg-[#0a0d12] border border-white/10 rounded-sm font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[#9EA4A8]">NEURAL DETECTORS:</span>
            {(['person', 'vehicle', 'face', 'perimeter'] as AiDetectionClass[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => toggleClass(c)}
                className={`px-3 py-1 rounded-sm border uppercase transition-all cursor-pointer ${
                  activeClasses[c]
                    ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff] font-bold'
                    : 'bg-[#12161b] border-white/10 text-[#9EA4A8] hover:border-white/20'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-[#9EA4A8]">
            <span>LATENCY: <span className="text-[#00f0ff] font-bold">{inferenceTime}ms</span></span>
            <span>NPU LOAD: <span className="text-emerald-400 font-bold">38%</span></span>
          </div>
        </div>

        {/* Live Surveillance AI Viewport */}
        <div className="relative w-full h-[540px] rounded-sm bg-[#050607] border border-white/15 overflow-hidden shadow-2xl">
          {/* Background Realistic Surveillance Feed Image */}
          <img
            src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1600&q=80"
            alt="AI Surveillance Stream"
            className="w-full h-full object-cover filter brightness-75 contrast-125 saturate-50"
          />

          {/* Cyan Grid & Scan Lines Overlay */}
          <div className="absolute inset-0 bg-security-grid opacity-30 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

          {/* OSD Header */}
          <div className="absolute top-4 left-4 z-20 font-mono text-xs space-y-1 bg-[#05080c]/80 p-3 rounded-sm border border-white/10 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span className="text-white font-bold">LIVE AI STREAM // CAM-02 PERIMETER</span>
            </div>
            <div className="text-[11px] text-[#00f0ff]">
              16.8 TOPS EDGE INFERENCE // 60 FPS // ZERO BIOMETRIC EGRESS
            </div>
          </div>

          {/* Dynamic AI Detection Bounding Boxes */}
          {visibleTargets.map((target) => {
            const isSelected = selectedTarget?.id === target.id;

            return (
              <div
                key={target.id}
                onClick={() => setSelectedTarget(target)}
                className={`absolute transition-all cursor-pointer group ${
                  isSelected ? 'z-30' : 'z-20'
                }`}
                style={{
                  left: `${target.box.x}%`,
                  top: `${target.box.y}%`,
                  width: `${target.box.width}%`,
                  height: `${target.box.height}%`,
                }}
              >
                {/* Bounding Box Brackets */}
                <div
                  className={`w-full h-full border-2 transition-all relative ${
                    isSelected
                      ? 'border-[#00f0ff] bg-[#00f0ff]/15 shadow-[0_0_20px_rgba(0,240,255,0.4)]'
                      : 'border-[#00f0ff]/60 hover:border-[#00f0ff] hover:bg-[#00f0ff]/10'
                  }`}
                >
                  {/* Corner Accent Ticks */}
                  <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#00f0ff]" />
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00f0ff]" />
                  <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#00f0ff]" />
                  <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00f0ff]" />

                  {/* Header Label Pill */}
                  <div className="absolute -top-6 left-0 px-1.5 py-0.5 bg-[#00f0ff] text-black font-mono text-[10px] font-bold tracking-wider uppercase whitespace-nowrap shadow-md">
                    {target.label} [{target.confidence}%]
                  </div>

                  {/* Kinematic Skeleton Vector (for person) */}
                  {target.classType === 'person' && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-70 pointer-events-none">
                      <div className="w-3 h-3 rounded-full border border-[#00f0ff] mb-1" />
                      <div className="w-0.5 h-12 bg-[#00f0ff]" />
                      <div className="w-8 h-0.5 bg-[#00f0ff] -mt-10" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Selected Target Deep Telemetry Inspector */}
          {selectedTarget && (
            <div className="absolute bottom-4 right-4 z-20 max-w-sm bg-[#0a0d12]/90 border border-[#00f0ff]/40 p-4 rounded-sm backdrop-blur-md font-mono text-xs text-[#F4F6F7] shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
                <span className="text-[#00f0ff] font-bold uppercase">{selectedTarget.label}</span>
                <span className="text-emerald-400 font-semibold">{selectedTarget.confidence}% CONFIDENCE</span>
              </div>
              <div className="text-[11px] text-[#9EA4A8] mb-2">{selectedTarget.metadata}</div>
              <div className="flex items-center justify-between text-[10px] pt-1 border-t border-white/5">
                <span className="text-white/60">ENCRYPTION HASH:</span>
                <span className="text-[#00f0ff]">SHA-256 [0x8f...1b]</span>
              </div>
            </div>
          )}
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6 font-mono text-xs">
          <div className="p-4 bg-[#0a0d12] border border-white/8 rounded-sm">
            <div className="text-[#00f0ff] font-bold mb-1">KINEMATIC AI</div>
            <p className="text-[#9EA4A8] leading-relaxed">
              Analyzes joint angles, stride frequencies, and velocity to differentiate between authorized patrols and perimeter climbers.
            </p>
          </div>

          <div className="p-4 bg-[#0a0d12] border border-white/8 rounded-sm">
            <div className="text-[#00f0ff] font-bold mb-1">ANPR & FLEET OCR</div>
            <p className="text-[#9EA4A8] leading-relaxed">
              Decodes vehicle license plates, hazardous cargo placards, and fleet numbers at velocities up to 140 km/h with 99.1% accuracy.
            </p>
          </div>

          <div className="p-4 bg-[#0a0d12] border border-white/8 rounded-sm">
            <div className="text-[#00f0ff] font-bold mb-1">ZERO-TRUST BIOMETRICS</div>
            <p className="text-[#9EA4A8] leading-relaxed">
              Facial structures are converted into encrypted cryptographic hashes locally on-chip. No raw portrait images ever touch external networks.
            </p>
          </div>

          <div className="p-4 bg-[#0a0d12] border border-white/8 rounded-sm">
            <div className="text-[#00f0ff] font-bold mb-1">ACOUSTIC SENSING</div>
            <p className="text-[#9EA4A8] leading-relaxed">
              Quad MEMS microphones detect gunshots, glass fractures, and distress frequencies, autonomously slewing PTZ cameras to the acoustic origin.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
