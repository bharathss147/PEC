import React, { useState } from 'react';
import { Server, HardDrive, ShieldCheck, ChevronRight, Calculator, Cpu, Network } from 'lucide-react';

interface ConfiguratorSectionProps {
  onOpenConsultation: () => void;
}

export const ConfiguratorSection: React.FC<ConfiguratorSectionProps> = ({ onOpenConsultation }) => {
  const [facilityType, setFacilityType] = useState('datacenter');
  const [areaSqFt, setAreaSqFt] = useState(120000);
  const [cameraDensity, setCameraDensity] = useState<'standard' | 'high' | 'maximum'>('high');

  // Multiplier for camera count based on density and area
  const densityDivisor = cameraDensity === 'maximum' ? 1200 : cameraDensity === 'high' ? 2000 : 3500;
  const recommendedCameras = Math.max(8, Math.round(areaSqFt / densityDivisor));
  const estimatedThroughput = (recommendedCameras * 12.5).toFixed(1); // Mbps
  const estimatedStorageTB = ((recommendedCameras * 12.5 * 3600 * 24 * 90) / (8 * 1024 * 1024)).toFixed(1);
  const totalNpuTops = (recommendedCameras * 16.8).toFixed(0);

  return (
    <section
      id="deploy"
      className="relative w-full min-h-screen bg-[#050607] text-[#F4F6F7] py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-security-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-1 flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#00f0ff]" />
              10 // ENTERPRISE DEPLOYMENT ESTIMATOR
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              DEPLOY VIGILOX.
            </h2>
          </div>
          <p className="text-sm font-mono text-[#9EA4A8] max-w-md">
            Model the edge bandwidth, neural compute, and on-premises cryptographic retention footprint for your facility in real time.
          </p>
        </div>

        {/* Interactive Estimator Console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-6 bg-[#0a0d12] border border-white/10 rounded-sm p-6 sm:p-8 space-y-6 font-mono text-xs">
            {/* Facility Choice */}
            <div>
              <label className="block text-[#9EA4A8] uppercase tracking-wider mb-2">
                FACILITY CLASSIFICATION:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'datacenter', label: 'HYPERSCALE DATA CENTER' },
                  { id: 'logistics', label: 'LOGISTICS & PORT DOCK' },
                  { id: 'corporate', label: 'CORPORATE CAMPUS' },
                  { id: 'critical', label: 'POWER & WATER INFRASTRUCTURE' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFacilityType(item.id)}
                    className={`p-3 text-left rounded-sm border transition-all cursor-pointer ${
                      facilityType === item.id
                        ? 'bg-[#00f0ff]/15 border-[#00f0ff] text-white font-bold'
                        : 'bg-[#101419] border-white/10 text-[#9EA4A8] hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[#9EA4A8]">FACILITY FOOTPRINT:</span>
                <span className="text-[#00f0ff] font-bold text-sm">
                  {areaSqFt.toLocaleString()} SQ FT
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="500000"
                step="10000"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full accent-[#00f0ff] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#9EA4A8] mt-1">
                <span>10,000 SQ FT</span>
                <span>250,000 SQ FT</span>
                <span>500,000 SQ FT</span>
              </div>
            </div>

            {/* Security Density */}
            <div>
              <label className="block text-[#9EA4A8] uppercase tracking-wider mb-2">
                PERIMETER SENSOR DENSITY:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'standard', label: 'PERIMETER ONLY' },
                  { id: 'high', label: 'COMPREHENSIVE' },
                  { id: 'maximum', label: 'ZERO-BLIND-SPOT' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setCameraDensity(item.id as any)}
                    className={`py-2 px-1 text-center rounded-sm border transition-all cursor-pointer ${
                      cameraDensity === item.id
                        ? 'bg-[#00f0ff] text-black font-bold border-[#00f0ff]'
                        : 'bg-[#101419] border-white/10 text-[#9EA4A8] hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Architecture Result Blueprint */}
          <div className="lg:col-span-6 bg-[#0a0d12] border border-[#00f0ff]/40 rounded-sm p-6 sm:p-8 space-y-6 font-mono shadow-[0_0_30px_rgba(0,240,255,0.1)]">
            <div className="text-xs text-[#00f0ff] uppercase tracking-widest flex items-center justify-between pb-3 border-b border-white/10">
              <span>ESTIMATED ARCHITECTURAL METRICS</span>
              <span className="text-emerald-400">NDAA CERTIFIED</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-[#07090c] rounded-sm border border-white/5">
                <span className="text-[11px] text-[#9EA4A8] block">OPTIMAL CAMERA NODES:</span>
                <span className="text-3xl font-display font-black text-white mt-1 block">
                  {recommendedCameras} <span className="text-xs font-mono font-normal text-[#00f0ff]">UNITS</span>
                </span>
              </div>

              <div className="p-4 bg-[#07090c] rounded-sm border border-white/5">
                <span className="text-[11px] text-[#9EA4A8] block">AGGREGATE EDGE NPU:</span>
                <span className="text-3xl font-display font-black text-white mt-1 block">
                  {totalNpuTops} <span className="text-xs font-mono font-normal text-emerald-400">TOPS</span>
                </span>
              </div>

              <div className="p-4 bg-[#07090c] rounded-sm border border-white/5">
                <span className="text-[11px] text-[#9EA4A8] block">NETWORK INGRESS:</span>
                <span className="text-2xl font-display font-bold text-white mt-1 block">
                  {estimatedThroughput} <span className="text-xs font-mono font-normal text-[#9EA4A8]">Mbps</span>
                </span>
              </div>

              <div className="p-4 bg-[#07090c] rounded-sm border border-white/5">
                <span className="text-[11px] text-[#9EA4A8] block">90-DAY ON-PREM STORAGE:</span>
                <span className="text-2xl font-display font-bold text-white mt-1 block">
                  {estimatedStorageTB} <span className="text-xs font-mono font-normal text-[#9EA4A8]">TB (H.265+)</span>
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full py-3.5 bg-[#00f0ff] text-black font-bold text-xs uppercase tracking-widest hover:bg-white hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>GENERATE FORMAL BLUEPRINT & RFP</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
