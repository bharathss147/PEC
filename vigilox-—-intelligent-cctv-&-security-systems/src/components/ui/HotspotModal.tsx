import React from 'react';
import { X, Cpu, Eye, Shield, Activity, Compass, Volume2 } from 'lucide-react';
import { HotspotItem, HotspotData } from '../../types';

interface HotspotModalProps {
  hotspot: HotspotItem | HotspotData | any | null;
  onClose: () => void;
}

export const HotspotModal: React.FC<HotspotModalProps> = ({ hotspot, onClose }) => {
  if (!hotspot) return null;

  const getIcon = () => {
    switch (hotspot.id) {
      case 'sensor':
        return <Eye className="w-5 h-5 text-[#00f0ff]" />;
      case 'processor':
        return <Cpu className="w-5 h-5 text-[#00f0ff]" />;
      case 'ptz-motor':
        return <Compass className="w-5 h-5 text-[#00f0ff]" />;
      case 'night-matrix':
        return <Activity className="w-5 h-5 text-[#00f0ff]" />;
      case 'audio-array':
        return <Volume2 className="w-5 h-5 text-[#00f0ff]" />;
      default:
        return <Shield className="w-5 h-5 text-[#00f0ff]" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#0e1217] border border-[#00f0ff]/30 rounded-sm p-6 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative scanner line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-[#151b22] border border-[#00f0ff]/40 flex items-center justify-center">
              {getIcon()}
            </div>
            <div>
              <div className="text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase">
                {hotspot.label} // {hotspot.category}
              </div>
              <h3 className="text-lg font-display font-bold text-white tracking-wide">
                {hotspot.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#9EA4A8] hover:text-white rounded-sm hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Description */}
        <div className="py-4 text-sm text-[#9EA4A8] leading-relaxed">
          {hotspot.description}
        </div>

        {/* Technical Specifications Grid */}
        <div className="space-y-2 py-3 bg-[#080a0d] p-4 rounded-sm border border-white/5">
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#00f0ff] pb-1 border-b border-white/5">
            CALIBRATED BENCHMARK TELEMETRY
          </div>
          <div className="grid grid-cols-1 gap-2.5 pt-1">
            {hotspot.specs.map((spec, index) => (
              <div key={index} className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#9EA4A8]">{spec.label}</span>
                <span className="text-white font-semibold">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3 border-t border-white/8 flex items-center justify-between text-[11px] font-mono text-[#9EA4A8]">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff]" />
            NDAA / TAA COMPLIANT SUB-SYSTEM
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#00f0ff] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
          >
            CLOSE TELEMETRY
          </button>
        </div>
      </div>
    </div>
  );
};
