import React from 'react';
import { Building2, Warehouse, Store, Home, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CORE_SECTORS } from '../../data/companyData';

interface CommercialOverviewSectionProps {
  onOpenQuote: () => void;
}

export const CommercialOverviewSection: React.FC<CommercialOverviewSectionProps> = ({ onOpenQuote }) => {
  const sectors = [
    {
      title: 'Commercial Offices & Corporate Towers',
      desc: 'Turnkey interior fit-out, acoustic meeting rooms, EMA electrical DB works, and facial recognition biometric access control.',
      icon: Building2,
      metrics: '350+ Workstations Supported',
    },
    {
      title: 'Industrial Warehouses & Logistics Parks',
      desc: 'Heavy-duty steel reinforcement, SCDF fire-rated drywall partitions, 4K long-range perimeter CCTV, and high-bay lighting.',
      icon: Warehouse,
      metrics: 'Up to 50,000 sq ft Logistics Hubs',
    },
    {
      title: 'Retail Outlets & F&B Multi-Chain',
      desc: 'PUB grease trap plumbing, custom architectural carpentry counters, glass shopfronts, and loss prevention Starlight surveillance.',
      icon: Store,
      metrics: 'Fast-Track Handover Execution',
    },
    {
      title: 'Strata Condominiums & Landed Estates',
      desc: 'Turnkey residential additions & alterations (A&A), waterproofing, luxury marble tiling, and smart video intercom stations.',
      icon: Home,
      metrics: 'Comprehensive BCA Standards',
    },
  ];

  return (
    <section id="commercial" className="relative w-full bg-[#051122] text-[#F8FAFC] py-24 border-t border-[#C5A059]/20 overflow-hidden">
      <div className="absolute inset-0 bg-architectural-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-6">
          <div>
            <div className="text-[11px] font-mono text-[#C5A059] tracking-widest uppercase mb-2 flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C5A059]" />
              05 // COMMERCIAL SECTORS & INFRASTRUCTURE
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight leading-[0.95]">
              SECURITY & INFRASTRUCTURE<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#DFBF7A]">
                BUILT FOR BUSINESS.
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-sans text-[#94A3B8] max-w-md leading-relaxed font-light">
            Engineered for facility managers, main contractors, MCSTs, and enterprise business owners requiring unified engineering and electronic security execution.
          </p>
        </div>

        {/* Sectors 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {sectors.map((sec, i) => {
            const Icon = sec.icon;
            return (
              <div
                key={i}
                className="elite-surface-card p-6 rounded-xs border border-white/[0.08] flex flex-col justify-between group"
              >
                <div>
                  <div className="w-10 h-10 rounded-xs bg-[#0E2442] border border-[#C5A059]/30 flex items-center justify-center text-[#DFBF7A] mb-5 group-hover:border-[#C5A059] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-display font-bold uppercase text-white mb-2 leading-tight">
                    {sec.title}
                  </h3>
                  <p className="text-xs text-[#94A3B8] font-sans font-light leading-relaxed">
                    {sec.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] text-[11px] font-mono text-[#C5A059]">
                  {sec.metrics}
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Turnkey Workflow Banner */}
        <div className="p-8 rounded-xs bg-[#091A32] border border-[#C5A059]/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#C5A059] uppercase tracking-widest font-bold block">
              SEAMLESS END-TO-END PROJECT DELIVERY
            </span>
            <h4 className="text-xl sm:text-2xl font-display font-bold text-white uppercase">
              SITE SURVEY → DESIGN → RENOVATION → M&E → SECURITY → HANDOVER
            </h4>
            <p className="text-xs text-[#94A3B8] font-sans font-light max-w-2xl">
              Eliminate vendor fragmentation. We coordinate all construction, electrical, plumbing, carpentry, air conditioning, and 4K CCTV surveillance under a single unified Singapore management contract.
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenQuote}
            className="tactile-button tactile-button-gold px-8 py-4 text-xs whitespace-nowrap cursor-pointer shadow-lg shrink-0"
          >
            <span>REQUEST COMMERCIAL PROPOSAL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
