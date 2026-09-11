import React, { useState, useEffect } from 'react';
import { Shield, Terminal, Radio, Server, Lock, AlertOctagon, Maximize2, Activity, Volume2, VolumeX } from 'lucide-react';
import { COMMAND_FEEDS } from '../../data/vigiloxData';
import { CommandFeed } from '../../types/vigilox';

export const CommandCenterSection: React.FC = () => {
  const [activeFeed, setActiveFeed] = useState<CommandFeed>(COMMAND_FEEDS[0]);
  const [securityPosture, setSecurityPosture] = useState<'NOMINAL' | 'ELEVATED' | 'LOCKDOWN'>('NOMINAL');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [bandwidth, setBandwidth] = useState(51.9);

  useEffect(() => {
    const interval = setInterval(() => {
      setBandwidth(+(50 + Math.random() * 4).toFixed(1));
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="command-center"
      className="relative w-full min-h-screen bg-[#050607] text-[#F4F6F7] py-24 border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 bg-security-grid opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-white/8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-1 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#00f0ff]" />
              08 // CENTRALIZED SURVEILLANCE MATRIX
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              ONE SYSTEM. TOTAL AWARENESS.
            </h2>
          </div>
          <p className="text-sm font-mono text-[#9EA4A8] max-w-md">
            Consolidate hundreds of high-resolution edge camera nodes into a unified zero-trust tactical command center with real-time incident dispatch.
          </p>
        </div>

        {/* Global Posture & Live Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 font-mono text-xs">
          <div className="p-3 bg-[#0a0d12] border border-white/10 rounded-sm">
            <div className="text-[#9EA4A8] text-[10px] uppercase">SECURITY POSTURE:</div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  securityPosture === 'NOMINAL'
                    ? 'bg-emerald-400'
                    : securityPosture === 'ELEVATED'
                    ? 'bg-amber-400'
                    : 'bg-rose-500 animate-ping'
                }`}
              />
              <span
                className={`font-bold uppercase ${
                  securityPosture === 'NOMINAL'
                    ? 'text-emerald-400'
                    : securityPosture === 'ELEVATED'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {securityPosture} (DEFCON {securityPosture === 'NOMINAL' ? '5' : securityPosture === 'ELEVATED' ? '3' : '1'})
              </span>
            </div>
          </div>

          <div className="p-3 bg-[#0a0d12] border border-white/10 rounded-sm">
            <div className="text-[#9EA4A8] text-[10px] uppercase">NETWORK THROUGHPUT:</div>
            <div className="text-white font-bold text-sm mt-1">{bandwidth} MB/s (H.265+)</div>
          </div>

          <div className="p-3 bg-[#0a0d12] border border-white/10 rounded-sm">
            <div className="text-[#9EA4A8] text-[10px] uppercase">NODES ONLINE:</div>
            <div className="text-[#00f0ff] font-bold text-sm mt-1">128 / 128 (100% HEALTH)</div>
          </div>

          <div className="p-3 bg-[#0a0d12] border border-white/10 rounded-sm">
            <div className="text-[#9EA4A8] text-[10px] uppercase">RETENTION BUFFER:</div>
            <div className="text-white font-bold text-sm mt-1">94 DAYS ENCRYPTED</div>
          </div>
        </div>

        {/* Command Matrix Grid: Big Focused Primary Stream + 3 Secondary Feeds */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Primary Main Viewport */}
          <div className="lg:col-span-8 bg-[#0a0d12] border border-white/10 rounded-sm overflow-hidden shadow-2xl">
            <div className="relative w-full h-[420px] bg-black">
              <img
                src={activeFeed.streamPoster}
                alt={activeFeed.name}
                className="w-full h-full object-cover filter brightness-85 contrast-110"
              />

              {/* Cyan Reticle Scan Lines */}
              <div className="absolute inset-0 bg-security-grid opacity-30 pointer-events-none" />

              {/* Top OSD Header */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-[#05080c]/85 border border-[#00f0ff]/40 px-3 py-1.5 rounded-sm font-mono text-xs text-[#00f0ff] backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                <span className="font-bold">{activeFeed.code} // {activeFeed.name}</span>
              </div>

              {/* Top Right Controls */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 rounded-sm bg-[#05080c]/80 border border-white/15 text-white hover:text-[#00f0ff] cursor-pointer"
                  title="Toggle Acoustic Feed"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00f0ff]" /> : <VolumeX className="w-4 h-4" />}
                </button>
              </div>

              {/* Bottom Telemetry Data Ribbon */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between p-3 bg-[#05080c]/90 border border-white/10 rounded-sm font-mono text-xs backdrop-blur-md text-[#9EA4A8] gap-2">
                <div>
                  ZONE: <span className="text-white font-semibold">{activeFeed.zone}</span>
                </div>
                <div>
                  FPS: <span className="text-emerald-400 font-bold">{activeFeed.fps} FPS</span>
                </div>
                <div>
                  BITRATE: <span className="text-white font-semibold">{activeFeed.bitrate}</span>
                </div>
                <div>
                  STATUS: <span className="text-[#00f0ff] font-bold">{activeFeed.status}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Mosaic Feeds & Posture Control */}
          <div className="lg:col-span-4 space-y-4 font-mono">
            <div className="text-xs text-[#00f0ff] uppercase tracking-wider pb-2 border-b border-white/8">
              ACTIVE MATRIX FEEDS (CLICK TO FOCUS)
            </div>

            <div className="space-y-2.5">
              {COMMAND_FEEDS.map((feed) => {
                const isSelected = activeFeed.id === feed.id;

                return (
                  <div
                    key={feed.id}
                    onClick={() => setActiveFeed(feed)}
                    className={`flex items-center gap-3 p-2.5 rounded-sm border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#00f0ff]/15 border-[#00f0ff] shadow-md'
                        : 'bg-[#0a0d12] border-white/10 hover:border-white/30 hover:bg-[#0e1217]'
                    }`}
                  >
                    <div className="w-20 h-14 rounded-xs overflow-hidden bg-black shrink-0 relative">
                      <img
                        src={feed.streamPoster}
                        alt={feed.name}
                        className="w-full h-full object-cover filter brightness-75"
                      />
                      <span className="absolute bottom-0.5 right-1 text-[8px] bg-black/80 px-1 text-white">
                        {feed.code}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{feed.name}</div>
                      <div className="text-[10px] text-[#9EA4A8] truncate">{feed.zone}</div>
                      <div className="text-[10px] text-[#00f0ff] font-semibold mt-0.5">{feed.status}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Posture Mode Controls */}
            <div className="p-4 bg-[#0a0d12] border border-white/10 rounded-sm space-y-3 pt-4">
              <div className="text-xs text-[#9EA4A8] uppercase">FACILITY POSTURE OVERRIDE:</div>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setSecurityPosture('NOMINAL')}
                  className={`py-2 px-1 rounded-sm border text-center transition-all cursor-pointer ${
                    securityPosture === 'NOMINAL'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-bold'
                      : 'bg-[#12161b] border-white/10 text-[#9EA4A8] hover:border-white/20'
                  }`}
                >
                  NOMINAL
                </button>
                <button
                  type="button"
                  onClick={() => setSecurityPosture('ELEVATED')}
                  className={`py-2 px-1 rounded-sm border text-center transition-all cursor-pointer ${
                    securityPosture === 'ELEVATED'
                      ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-bold'
                      : 'bg-[#12161b] border-white/10 text-[#9EA4A8] hover:border-white/20'
                  }`}
                >
                  ELEVATED
                </button>
                <button
                  type="button"
                  onClick={() => setSecurityPosture('LOCKDOWN')}
                  className={`py-2 px-1 rounded-sm border text-center transition-all cursor-pointer ${
                    securityPosture === 'LOCKDOWN'
                      ? 'bg-rose-500/20 border-rose-500 text-rose-400 font-bold animate-pulse'
                      : 'bg-[#12161b] border-white/10 text-[#9EA4A8] hover:border-white/20'
                  }`}
                >
                  LOCKDOWN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
