import React, { useState } from 'react';
import {
  Zap,
  Droplet,
  Wind,
  Hammer,
  Layers,
  Grid,
  LayoutGrid,
  Paintbrush,
  Maximize2,
  Wrench,
  Camera,
  ShieldCheck,
  Tv,
  PhoneCall,
  Check,
  ArrowRight,
  Shield,
  Building
} from 'lucide-react';
import { CONSTRUCTION_RENOVATION_TRADES, SECURITY_TECHNOLOGY_TRADES } from '../../data/servicesData';
import { ServiceTrade } from '../../types/company';

interface ServicesMatrixSectionProps {
  onSelectTradeQuote: (tradeName: string) => void;
}

export const ServicesMatrixSection: React.FC<ServicesMatrixSectionProps> = ({ onSelectTradeQuote }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'renovation' | 'security'>('all');
  const [selectedTradeId, setSelectedTradeId] = useState<string>('cctv-surveillance');

  const allTrades = [...SECURITY_TECHNOLOGY_TRADES, ...CONSTRUCTION_RENOVATION_TRADES];

  const displayedTrades = activeTab === 'all'
    ? allTrades
    : activeTab === 'renovation'
    ? CONSTRUCTION_RENOVATION_TRADES
    : SECURITY_TECHNOLOGY_TRADES;

  const currentTrade: ServiceTrade = allTrades.find(t => t.id === selectedTradeId) || allTrades[0];

  // Helper map for icons
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap className="w-4 h-4 text-[#DFBF7A]" />;
      case 'Droplet': return <Droplet className="w-4 h-4 text-[#DFBF7A]" />;
      case 'Wind': return <Wind className="w-4 h-4 text-[#DFBF7A]" />;
      case 'Hammer': return <Hammer className="w-4 h-4 text-[#DFBF7A]" />;
      case 'Layers': return <Layers className="w-4 h-4 text-[#DFBF7A]" />;
      case 'Grid': return <Grid className="w-4 h-4 text-[#DFBF7A]" />;
      case 'LayoutGrid': return <LayoutGrid className="w-4 h-4 text-[#DFBF7A]" />;
      case 'Paintbrush': return <Paintbrush className="w-4 h-4 text-[#DFBF7A]" />;
      case 'Maximize2': return <Maximize2 className="w-4 h-4 text-[#DFBF7A]" />;
      case 'Wrench': return <Wrench className="w-4 h-4 text-[#DFBF7A]" />;
      case 'Camera': return <Camera className="w-4 h-4 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
      case 'Tv': return <Tv className="w-4 h-4 text-emerald-400" />;
      case 'PhoneCall': return <PhoneCall className="w-4 h-4 text-emerald-400" />;
      default: return <Shield className="w-4 h-4 text-[#DFBF7A]" />;
    }
  };

  return (
    <section id="services" className="relative w-full bg-[#040D1A] text-[#F8FAFC] py-24 border-t border-[#C5A059]/20 overflow-hidden">
      <div className="absolute inset-0 bg-architectural-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-white/[0.08] gap-6">
          <div>
            <div className="text-[11px] font-mono text-[#C5A059] tracking-widest uppercase mb-2 flex items-center gap-2">
              <Building className="w-3.5 h-3.5 text-[#C5A059]" />
              02 // TURNKEY SERVICES & SPECIALIZED TRADES
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight leading-[0.95]">
              CONSTRUCTION, RENOVATION<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#DFBF7A]">
                & SECURITY ARCHITECTURE.
              </span>
            </h2>
          </div>

          {/* Division Filter Ribbon */}
          <div className="flex items-center gap-2 p-1.5 rounded-xs bg-[#0A1C36] border border-white/10 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xs transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#C5A059] text-[#040D1A] font-bold shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              ALL TRADES ({allTrades.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`px-4 py-2 rounded-xs transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-[#C5A059] text-[#040D1A] font-bold shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              SECURITY & TECH (4)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('renovation')}
              className={`px-4 py-2 rounded-xs transition-all cursor-pointer ${
                activeTab === 'renovation'
                  ? 'bg-[#C5A059] text-[#040D1A] font-bold shadow-md'
                  : 'text-[#94A3B8] hover:text-white'
              }`}
            >
              CONSTRUCTION & FIT-OUT (10)
            </button>
          </div>
        </div>

        {/* Master Trade Layout: Left Selector Grid, Right Detailed Architectural Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Trade Ribbon Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
            {displayedTrades.map((trade) => {
              const isSelected = selectedTradeId === trade.id;
              const isSecurity = trade.category === 'security_technology';
              return (
                <button
                  key={trade.id}
                  type="button"
                  onClick={() => setSelectedTradeId(trade.id)}
                  className={`p-4 text-left rounded-xs border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[115px] ${
                    isSelected
                      ? 'bg-[#0E2442] text-white border-[#C5A059] shadow-[0_0_20px_rgba(197,160,89,0.2)]'
                      : 'bg-[#08172C] border-white/[0.08] text-[#94A3B8] hover:border-white/20 hover:text-white'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A059]" />
                  )}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#C5A059]">
                        {isSecurity ? 'ELECTRONIC SECURITY' : 'CONSTRUCTION TRADE'}
                      </span>
                      {renderIcon(trade.iconName)}
                    </div>
                    <div className="text-sm font-display font-bold uppercase text-white mt-1.5 line-clamp-1">
                      {trade.name}
                    </div>
                  </div>
                  <p className="text-[11px] text-[#94A3B8] font-sans font-light mt-2 line-clamp-2 leading-relaxed">
                    {trade.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right: Selected Trade Detailed Dossier */}
          <div className="lg:col-span-5 bg-[#091A32] border border-[#C5A059]/30 rounded-xs p-6 sm:p-8 flex flex-col justify-between font-mono space-y-6 shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
                <span className="text-[10px] text-[#C5A059] tracking-widest uppercase font-bold">
                  TRADE SPECIFICATION DOSSIER
                </span>
                <span className="px-2 py-0.5 rounded-xs bg-emerald-400/10 border border-emerald-400/30 text-[10px] text-emerald-400 font-mono">
                  BCA & EMA LICENSED
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-display font-black text-white mt-4 uppercase">
                {currentTrade.name}
              </h3>
              
              <p className="text-xs text-[#94A3B8] mt-3 font-sans font-light leading-relaxed">
                {currentTrade.fullDesc}
              </p>

              {/* Standard Deliverables Checklist */}
              <div className="mt-6 pt-5 border-t border-white/[0.08]">
                <div className="text-[11px] text-[#C5A059] uppercase tracking-wider mb-3 font-bold flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5" />
                  <span>STANDARD SCOPE & DELIVERABLES</span>
                </div>
                <div className="space-y-2">
                  {currentTrade.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-start gap-2 bg-[#061325] p-2 rounded-xs border border-white/[0.04] text-xs text-[#F8FAFC]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059] mt-1.5 shrink-0" />
                      <span className="text-[11px]">{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Applications */}
              <div className="mt-5">
                <span className="text-[10px] text-[#94A3B8] uppercase block mb-1.5">
                  COMMON COMMERCIAL APPLICATIONS:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {currentTrade.applications.map((app, i) => (
                    <span key={i} className="px-2 py-1 bg-[#0E2442] rounded-xs text-[10px] text-[#DFBF7A] border border-white/[0.06]">
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quote Action for This Specific Trade */}
            <div className="pt-6 border-t border-white/[0.08]">
              <button
                type="button"
                onClick={() => onSelectTradeQuote(currentTrade.name)}
                className="tactile-button tactile-button-gold w-full py-3.5 text-xs tracking-wider cursor-pointer"
              >
                <span>REQUEST QUOTE FOR {currentTrade.name.toUpperCase()}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
