import React from 'react';
import { ArrowUpRight, Phone, Mail, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { ParadiseEliteLogo } from '../brand/ParadiseEliteLogo';
import { COMPANY_CONTACT, COMPANY_PROFILE } from '../../data/companyData';

interface FooterSectionProps {
  onOpenConsultation: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenConsultation }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact-footer" className="relative w-full bg-[#040D1A] text-[#F8FAFC] border-t border-[#C5A059]/20 pt-20 pb-12 font-mono text-xs overflow-hidden">
      <div className="absolute inset-0 bg-architectural-grid opacity-25 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Call-To-Action Banner: START A PROJECT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pb-16 border-b border-white/[0.08] items-center">
          <div className="lg:col-span-8">
            <div className="text-[11px] text-[#C5A059] uppercase tracking-widest mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>SINGAPORE MULTIDISCIPLINARY CONTRACTING & SECURITY INFRASTRUCTURE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-black text-white tracking-tight uppercase leading-[1.05]">
              BUILDING SPACES.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F8FAFC] to-[#DFBF7A]">
                SECURING WHAT MATTERS.
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#94A3B8] font-sans font-light mt-3 max-w-2xl leading-relaxed">
              From structural architectural works and turnkey commercial interior renovation to high-definition AI CCTV and access control, Paradise Elite delivers complete turnkey certainty.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="tactile-button tactile-button-gold px-8 py-4 text-xs tracking-widest cursor-pointer shadow-lg"
            >
              <span>START A PROJECT / ENQUIRY</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation & Company Dossier Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-white/[0.08]">
          {/* Company Identity */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <ParadiseEliteLogo variant="compact" size="md" theme="dark" />
            <p className="text-[11px] text-[#94A3B8] font-sans leading-relaxed">
              Registered Singapore general builder, commercial renovation specialist, and certified electronic security integrator.
            </p>
            <div className="pt-2 text-[10px] text-[#C5A059] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>BCA Standards • Licensed M&E Works</span>
            </div>
          </div>

          {/* Construction & Renovation Services */}
          <div>
            <div className="text-white font-bold mb-4 uppercase tracking-wider text-xs border-b border-white/[0.08] pb-1.5">
              CONSTRUCTION & RENOVATION
            </div>
            <ul className="space-y-2.5 text-[#94A3B8]">
              <li><a href="#services" className="hover:text-[#DFBF7A] transition-colors">Electrical Engineering (EMA)</a></li>
              <li><a href="#services" className="hover:text-[#DFBF7A] transition-colors">Commercial Plumbing & Sanitary</a></li>
              <li><a href="#services" className="hover:text-[#DFBF7A] transition-colors">Air Conditioning & ACMV</a></li>
              <li><a href="#services" className="hover:text-[#DFBF7A] transition-colors">Architectural Custom Carpentry</a></li>
              <li><a href="#services" className="hover:text-[#DFBF7A] transition-colors">Partition & False Ceilings</a></li>
              <li><a href="#services" className="hover:text-[#DFBF7A] transition-colors">Vinyl & Porcelain Tiling</a></li>
              <li><a href="#services" className="hover:text-[#DFBF7A] transition-colors">Painting & Maintenance</a></li>
            </ul>
          </div>

          {/* CCTV & Electronic Security */}
          <div>
            <div className="text-white font-bold mb-4 uppercase tracking-wider text-xs border-b border-white/[0.08] pb-1.5">
              CCTV & SECURITY TECH
            </div>
            <ul className="space-y-2.5 text-[#94A3B8]">
              <li><a href="#products" className="hover:text-[#DFBF7A] transition-colors">4K IP PoE Surveillance Systems</a></li>
              <li><a href="#products" className="hover:text-[#DFBF7A] transition-colors">Biometric Facial Recognition</a></li>
              <li><a href="#products" className="hover:text-[#DFBF7A] transition-colors">RFID Door Access Control & EM Locks</a></li>
              <li><a href="#products" className="hover:text-[#DFBF7A] transition-colors">Multi-Tenant Video Intercoms</a></li>
              <li><a href="#products" className="hover:text-[#DFBF7A] transition-colors">PABX Telephony & Structured Cabling</a></li>
              <li><a href="#products" className="hover:text-[#DFBF7A] transition-colors">Cloud & On-Prem NVR Storage</a></li>
            </ul>
          </div>

          {/* Verified Contact Details (Strictly NO banking information) */}
          <div>
            <div className="text-white font-bold mb-4 uppercase tracking-wider text-xs border-b border-white/[0.08] pb-1.5">
              SINGAPORE CONTACT
            </div>
            <div className="text-[#94A3B8] space-y-3.5 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <span className="text-white font-semibold block">{COMPANY_CONTACT.legalName}</span>
                  <span>{COMPANY_CONTACT.headquarters}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div>
                  <span className="text-white font-semibold block">DIRECT HOTLINE:</span>
                  <a href={`tel:${COMPANY_CONTACT.phone}`} className="text-[#DFBF7A] hover:underline">
                    {COMPANY_CONTACT.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C5A059] shrink-0" />
                <div>
                  <span className="text-white font-semibold block">OFFICIAL ENQUIRY:</span>
                  <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-[#DFBF7A] hover:underline">
                    {COMPANY_CONTACT.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-[10px]">
                <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{COMPANY_CONTACT.businessHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Copyright & Disclaimers (Strictly NO banking info, NO private routes) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#94A3B8] text-[11px]">
          <div className="flex items-center gap-3">
            <span className="text-white font-bold">{COMPANY_PROFILE.legalName}</span>
            <span>© {currentYear} ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-5 text-[10px] text-[#94A3B8]">
            <span>SINGAPORE COMMERCIAL SERVICES</span>
            <span className="text-white/20">•</span>
            <span>BCA SAFETY & QUALITY STANDARDS</span>
            <span className="text-white/20">•</span>
            <span>AUTHORIZED HARDWARE PARTNERSHIPS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
