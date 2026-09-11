import React, { useState } from 'react';
import { ShieldAlert, MapPin, AlertCircle, CheckCircle2, Clock, Video, Radio, ChevronRight } from 'lucide-react';
import { SECURITY_EVENTS } from '../../data/vigiloxData';
import { SecurityEvent } from '../../types/vigilox';

export const SecurityEnvSection: React.FC = () => {
  const [activeEvent, setActiveEvent] = useState<SecurityEvent>(SECURITY_EVENTS[0]);

  return (
    <section
      id="scenarios"
      className="relative w-full min-h-screen bg-[#050607] text-[#F4F6F7] py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-security-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-1 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-[#00f0ff]" />
              07 // REAL-WORLD MISSION CRITICAL DEPLOYMENT
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              FACILITY THREAT INTERCEPT.
            </h2>
          </div>
          <p className="text-sm font-mono text-[#9EA4A8] max-w-md">
            Click on simulated facility incidents to inspect live multi-sensor triangulation, autonomous perimeter deterrence, and forensic timestamp verification.
          </p>
        </div>

        {/* Dual Layout: Event Timeline on Left, Dynamic Incident Surveillance Feed on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Incident Event Log */}
          <div className="lg:col-span-5 space-y-3 font-mono">
            <div className="text-xs text-[#00f0ff] uppercase tracking-wider pb-2 border-b border-white/8 flex items-center justify-between">
              <span>LIVE INCIDENT STREAM</span>
              <span className="text-emerald-400">4 EVENTS RECORDED</span>
            </div>

            {SECURITY_EVENTS.map((evt) => {
              const isSelected = activeEvent.id === evt.id;

              return (
                <div
                  key={evt.id}
                  onClick={() => setActiveEvent(evt)}
                  className={`p-4 rounded-sm border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#00f0ff]/10 border-[#00f0ff] shadow-[0_0_25px_rgba(0,240,255,0.2)]'
                      : 'bg-[#0a0d12] border-white/10 hover:border-white/25 hover:bg-[#0e1217]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-[#00f0ff] font-bold">{evt.code}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[#9EA4A8] flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {evt.timestamp}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded-xs text-[10px] uppercase font-bold ${
                          evt.severity === 'critical'
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                            : evt.severity === 'high'
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        }`}
                      >
                        {evt.severity}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-display font-bold text-white mb-1">
                    {evt.type} // {evt.location}
                  </h3>

                  <p className="text-xs text-[#9EA4A8] line-clamp-2 leading-relaxed">
                    {evt.summary}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Active Event Surveillance & Facility Map */}
          <div className="lg:col-span-7 bg-[#0a0d12] border border-white/10 rounded-sm p-6 space-y-5 font-mono">
            {/* Live Camera Feed Simulation */}
            <div className="relative w-full h-[360px] rounded-sm bg-black border border-white/15 overflow-hidden shadow-xl">
              <img
                src={activeEvent.streamUrl}
                alt={activeEvent.location}
                className="w-full h-full object-cover filter brightness-90 contrast-110"
              />

              {/* Cyan Target HUD overlay */}
              <div className="absolute inset-0 bg-security-grid opacity-25 pointer-events-none" />

              {/* Live Status Watermark */}
              <div className="absolute top-4 left-4 z-10 bg-[#05080c]/85 border border-[#00f0ff]/40 px-3 py-1.5 rounded-sm text-xs text-[#00f0ff] backdrop-blur-md">
                <span className="font-bold">{activeEvent.cameraName}</span>
                <span className="text-white/40 mx-2">|</span>
                <span className="text-emerald-400 font-medium">REPLAY VERIFIED</span>
              </div>

              {/* Target Location Coordinate Dot */}
              <div
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
                style={{ left: `${activeEvent.coordinates.x}%`, top: `${activeEvent.coordinates.y}%` }}
              >
                <div className="w-full h-full rounded-full border-2 border-rose-500 animate-ping opacity-75" />
                <div className="w-3 h-3 rounded-full bg-rose-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>

              {/* Forensic Hash Footnote */}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between p-2.5 bg-[#05080c]/90 border border-white/10 rounded-sm text-[11px] text-[#9EA4A8] backdrop-blur-md">
                <span>TIME: {activeEvent.timestamp}</span>
                <span className="text-emerald-400">IMMUTABLE BLOCKCHAIN TIMESTAMPS</span>
              </div>
            </div>

            {/* Event Incident Breakdown Card */}
            <div className="p-4 bg-[#07090c] rounded-sm border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#00f0ff] font-bold">AUTONOMOUS ACTION TAKEN:</span>
                <span className="text-white font-semibold">INCIDENT {activeEvent.code}</span>
              </div>
              <p className="text-[#9EA4A8] leading-relaxed">
                {activeEvent.summary}
              </p>
              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-white/60">GEOFENCE LOCATION:</span>
                <span className="text-[#00f0ff]">{activeEvent.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
