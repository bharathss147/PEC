import React from 'react';
import { ShieldCheck, Cpu, Eye, Compass, Lock, Activity, CheckCircle } from 'lucide-react';
import { TECH_METRICS } from '../../data/vigiloxData';

export const TechMetricsSection: React.FC = () => {
  const complianceCertifications = [
    { name: 'NDAA SECTION 889', desc: 'Fully compliant with US federal defense procurement standards.' },
    { name: 'TAA COMPLIANT', desc: 'Manufactured and assembled in Trade Agreements Act approved facilities.' },
    { name: 'FIPS 140-3 LEVEL 3', desc: 'Cryptographic hardware module with tamper-resistant physical enclosure.' },
    { name: 'SOC2 TYPE II', desc: 'Audited and verified enterprise cloud management security standards.' },
    { name: 'IK10 IMPACT RATING', desc: 'Engineered to withstand 20 Joules direct kinetic sledgehammer strike.' },
    { name: 'IP67 SUBMERSIBLE', desc: 'Protected against dust ingress and continuous water immersion up to 1 meter.' },
  ];

  return (
    <section
      id="specs"
      className="relative w-full min-h-screen bg-[#07090c] text-[#F4F6F7] py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-security-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-white/8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-1 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00f0ff]" />
              09 // BENCHMARK TELEMETRY
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              BUILT TO SEE WHAT OTHERS MISS.
            </h2>
          </div>
          <p className="text-sm font-mono text-[#9EA4A8] max-w-md">
            Uncompromising tolerances engineered for mission-critical aerospace, energy grids, and high-security defense compounds.
          </p>
        </div>

        {/* Large Numerical Benchmark Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {TECH_METRICS.map((metric, i) => (
            <div
              key={i}
              className="p-6 bg-[#0a0d12] border border-white/8 rounded-sm hover:border-[#00f0ff]/40 transition-all group"
            >
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl sm:text-5xl font-display font-black text-white group-hover:text-[#00f0ff] transition-colors">
                  {metric.stat}
                </span>
                <span className="text-xs font-mono text-[#00f0ff] font-semibold tracking-wider">
                  {metric.unit}
                </span>
              </div>
              <div className="text-xs font-mono font-bold text-white tracking-wider uppercase mb-2">
                {metric.label}
              </div>
              <p className="text-xs text-[#9EA4A8] leading-relaxed">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance & Regulatory Trust Grid */}
        <div className="p-8 bg-[#0a0d12] border border-white/10 rounded-sm">
          <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-6 flex items-center justify-between border-b border-white/8 pb-3">
            <span>GOVERNMENT & ENTERPRISE COMPLIANCE STANDARDS</span>
            <span className="text-emerald-400">ZERO VENDOR LOCK-IN // ONVIF PROFILE S, G, T, M</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 font-mono text-xs">
            {complianceCertifications.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white mb-1">{item.name}</div>
                  <div className="text-[#9EA4A8] leading-relaxed text-[11px]">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
