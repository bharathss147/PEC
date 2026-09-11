import React, { useState } from 'react';
import { Cpu, Gauge, Zap, ChevronDown, ChevronUp, Monitor } from 'lucide-react';
import { useQuality } from '../../hooks/useQuality';
import { qualityManager } from '../../utils/qualityManager';
import { DeviceQualityTier } from '../../types/vigilox';

export const PerformanceHUD: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { tier, fps, pixelRatio, isMobile, reducedMotion, hasWebGL2 } = useQuality();

  const handleSetTier = (newTier: DeviceQualityTier) => {
    const caps = qualityManager.getCapabilities();
    caps.tier = newTier;
    if (newTier === 'high') caps.pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);
    else if (newTier === 'medium') caps.pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
    else if (newTier === 'low') caps.pixelRatio = 1.0;
    else caps.pixelRatio = 0.85;

    // Trigger update
    (qualityManager as any).capabilities = caps;
    (qualityManager as any).notifyListeners();
  };

  return (
    <aside
      id="vigilox-performance-hud"
      aria-label="Performance Telemetry HUD"
      className="fixed bottom-4 right-4 z-40 font-mono select-none"
    >
      <div className="bg-[#0b0e12]/90 border border-white/10 rounded-sm shadow-xl backdrop-blur-md overflow-hidden text-xs">
        {/* Header bar */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2.5 px-3 py-1.5 hover:bg-white/5 transition-colors cursor-pointer w-full text-left"
          aria-expanded={expanded}
        >
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                fps >= 50 ? 'bg-emerald-400' : fps >= 30 ? 'bg-amber-400' : 'bg-rose-400'
              }`}
            />
            <span className="text-[#F4F6F7] font-semibold">{fps} FPS</span>
          </div>
          <span className="text-white/20">|</span>
          <span className="text-[#00f0ff] uppercase">{tier}</span>
          <span className="text-[#9EA4A8] ml-auto">
            {expanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </span>
        </button>

        {/* Expanded Telemetry Details */}
        {expanded && (
          <div className="p-3 border-t border-white/10 space-y-2.5 min-w-[240px] bg-[#07090c]">
            <div className="flex items-center justify-between text-[#9EA4A8]">
              <span>Resolution DPR:</span>
              <span className="text-white font-medium">{pixelRatio.toFixed(2)}x</span>
            </div>
            <div className="flex items-center justify-between text-[#9EA4A8]">
              <span>Acceleration:</span>
              <span className="text-emerald-400 font-medium">
                {hasWebGL2 ? 'WebGL 2.0 (Active)' : 'WebGL 1.0 Fallback'}
              </span>
            </div>
            <div className="flex items-center justify-between text-[#9EA4A8]">
              <span>Form Factor:</span>
              <span className="text-white">{isMobile ? 'Mobile' : 'Desktop'}</span>
            </div>
            <div className="flex items-center justify-between text-[#9EA4A8]">
              <span>Motion Mode:</span>
              <span className={reducedMotion ? 'text-amber-400' : 'text-white'}>
                {reducedMotion ? 'Reduced' : 'Dynamic 60Hz'}
              </span>
            </div>

            {/* Quality Tier Selector */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-[10px] text-[#9EA4A8] mb-1.5 uppercase">ADAPTIVE QUALITY OVERRIDE</div>
              <div className="grid grid-cols-4 gap-1">
                {(['high', 'medium', 'low', 'very-low'] as DeviceQualityTier[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleSetTier(t)}
                    className={`py-1 text-[10px] uppercase rounded-sm border transition-all cursor-pointer ${
                      tier === t
                        ? 'bg-[#00f0ff] border-[#00f0ff] text-black font-bold'
                        : 'bg-[#12161b] border-white/10 text-[#9EA4A8] hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {t === 'very-low' ? 'V.LOW' : t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
