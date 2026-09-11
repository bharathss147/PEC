import React from 'react';
import { Hammer, Sparkles, ShieldCheck, Wrench, CheckCircle2, ArrowRight, Building2 } from 'lucide-react';
import { COMPANY_PROFILE } from '../../data/companyData';

interface CompanyIntroSectionProps {
  onOpenQuote: () => void;
  onExploreServices: () => void;
}

export const CompanyIntroSection: React.FC<CompanyIntroSectionProps> = ({
  onOpenQuote,
  onExploreServices,
}) => {
  const pillars = [
    {
      step: '01',
      title: 'BUILD',
      subtitle: 'Civil & Structural Engineering',
      desc: 'BCA-compliant structural works, steel framing, shopfronts, and commercial facilities expansion.',
      icon: Building2,
    },
    {
      step: '02',
      title: 'RENOVATE',
      subtitle: 'Turnkey Interior Transformation',
      desc: 'Comprehensive interior fit-out spanning custom carpentry, partitions, ceilings, vinyl, tiling, and painting.',
      icon: Hammer,
    },
    {
      step: '03',
      title: 'SECURE',
      subtitle: 'Intelligent Security & AI CCTV',
      desc: '4K Starlight optics, biometric face access control, multi-door intercom, and IMDA structured cabling.',
      icon: ShieldCheck,
    },
    {
      step: '04',
      title: 'MAINTAIN',
      subtitle: 'Facilities & M&E Management',
      desc: 'Scheduled aircon servicing, electrical DB certification, plumbing rectification, and rapid on-call support.',
      icon: Wrench,
    },
  ];

  return (
    <section id="about" className="relative w-full bg-[#051122] text-[#F8FAFC] py-24 border-t border-[#C5A059]/20 overflow-hidden">
      <div className="absolute inset-0 bg-architectural-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 pb-6 border-b border-white/[0.08] gap-6">
          <div>
            <div className="text-[11px] font-mono text-[#C5A059] tracking-widest uppercase mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C5A059]" />
              01 // CORPORATE CAPABILITY & IDENTITY
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black uppercase text-white tracking-tight leading-[0.95]">
              ONE MULTIDISCIPLINARY PARTNER.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#DFBF7A]">
                COMPLETE TURNKEY CERTAINTY.
              </span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm font-sans text-[#94A3B8] max-w-md leading-relaxed font-light">
            {COMPANY_PROFILE.overview}
          </p>
        </div>

        {/* 4 Pillars Grid (BUILD, RENOVATE, SECURE, MAINTAIN) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.step}
                className="elite-surface-card p-6 rounded-xs relative group overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-transparent group-hover:bg-[#C5A059] transition-all duration-300" />
                <div>
                  <div className="flex items-center justify-between text-[#94A3B8] font-mono text-xs mb-4">
                    <span className="text-[#C5A059] font-bold">{p.step} //</span>
                    <Icon className="w-5 h-5 text-[#DFBF7A]" />
                  </div>
                  <h3 className="text-2xl font-display font-black text-white tracking-tight uppercase mb-1">
                    {p.title}
                  </h3>
                  <div className="text-xs font-mono text-[#DFBF7A] uppercase mb-3">
                    {p.subtitle}
                  </div>
                  <p className="text-xs text-[#94A3B8] font-sans font-light leading-relaxed">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-[#94A3B8] group-hover:text-[#DFBF7A] transition-colors">
                  <span>LEARN SCOPE</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Singapore Commercial Metrics Banner */}
        <div className="p-8 rounded-xs bg-[#091A32] border border-[#C5A059]/25 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 items-center">
          {COMPANY_PROFILE.stats.map((stat, i) => (
            <div key={i} className="text-center sm:text-left border-r border-white/[0.06] last:border-0 pr-4">
              <div className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight text-gold-gradient">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono text-[#94A3B8] uppercase mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
