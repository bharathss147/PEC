import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Phone, Clock, ShieldCheck, ChevronDown } from 'lucide-react';
import { ParadiseEliteLogo } from '../brand/ParadiseEliteLogo';
import { COMPANY_CONTACT } from '../../data/companyData';

interface NavbarProps {
  activeTab?: string;
  onSelectNav?: (navId: string) => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'home',
  onSelectNav,
  onOpenQuote,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Master Global Navigation Links
  const navItems = [
    { id: 'home', label: 'HOME', href: '#home' },
    { id: 'services', label: 'SERVICES', href: '#services' },
    { id: 'products', label: 'PRODUCTS', href: '#products' },
    { id: 'commercial', label: 'COMMERCIAL', href: '#commercial' },
    { id: 'projects', label: 'PROJECTS', href: '#projects' },
    { id: 'about', label: 'ABOUT', href: '#about' },
    { id: 'contact', label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (id: string, href: string) => {
    setMobileMenuOpen(false);
    if (onSelectNav) {
      onSelectNav(id);
    }
    const el = document.getElementById(href.replace('#', ''));
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="master-navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-2 bg-[#040D1A]/95 backdrop-blur-xl border-b border-[#C5A059]/20 shadow-2xl shadow-black/80'
          : 'py-3.5 bg-gradient-to-b from-[#040D1A]/95 via-[#040D1A]/75 to-transparent'
      }`}
    >
      {/* Top Utility Bar (Desktop Only) */}
      <div className="hidden lg:block border-b border-white/[0.06] pb-1.5 mb-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-[11px] font-mono text-[#94A3B8]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-white font-medium">BCA & EMA COMPLIANT</span>
            </span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5 text-[#C5A059]">
              <Clock className="w-3.5 h-3.5" />
              <span>SGT Mon–Fri 08:30–18:00</span>
            </span>
          </div>

          <div className="flex items-center gap-5">
            <a
              href={`tel:${COMPANY_CONTACT.phone}`}
              className="flex items-center gap-1.5 text-[#DFBF7A] hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>SINGAPORE HQ: {COMPANY_CONTACT.phone}</span>
            </a>
            <span className="text-white/20">|</span>
            <span className="text-[#94A3B8] uppercase">24/7 RAPID M&E & SECURITY DISPATCH</span>
          </div>
        </div>
      </div>

      {/* Main Dock Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* OFFICIAL BRAND LOGO */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home', '#home');
          }}
          className="focus:outline-hidden"
          aria-label="Paradise Elite Construction Pte. Ltd. Home"
        >
          <ParadiseEliteLogo variant="horizontal" size="md" theme="dark" />
        </a>

        {/* MASTER DESKTOP NAVIGATION DOCK */}
        <nav className="hidden xl:flex items-center gap-1 px-4 py-1.5 rounded-xs bg-[#0A1C36]/80 border border-[#C5A059]/20 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id, item.href)}
                className={`px-3.5 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 uppercase relative cursor-pointer ${
                  isActive
                    ? 'text-[#DFBF7A] font-bold'
                    : 'text-[#94A3B8] hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#C5A059]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* PRIMARY CALL-TO-ACTION & CONTACT */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenQuote}
            className="tactile-button tactile-button-gold text-xs shadow-md cursor-pointer"
          >
            <span>REQUEST A QUOTE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden p-2.5 rounded-xs text-[#DFBF7A] hover:text-white bg-[#0A1C36]/80 border border-[#C5A059]/20 transition-colors"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* FULL-SCREEN / LARGE MOBILE ACCESSIBLE MENU */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#040D1A]/98 backdrop-blur-2xl border-b border-[#C5A059]/25 p-6 overflow-y-auto flex flex-col justify-between animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="border-b border-white/[0.08] pb-4">
              <span className="text-[10px] font-mono tracking-widest text-[#C5A059] uppercase block mb-1">
                CORPORATE NAVIGATION
              </span>
              <span className="text-sm font-display font-semibold text-white">
                PARADISE ELITE CONSTRUCTION PTE. LTD.
              </span>
            </div>

            {/* Nav Links Grid */}
            <div className="grid grid-cols-1 gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id, item.href)}
                  className="w-full text-left py-3 px-4 rounded-xs bg-[#0A1C36]/60 border border-white/[0.06] hover:border-[#C5A059]/40 text-sm font-mono tracking-wider text-white hover:text-[#DFBF7A] transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-4 h-4 text-[#C5A059]" />
                </button>
              ))}
            </div>

            {/* Quick Contact Info */}
            <div className="p-4 rounded-xs bg-[#081528] border border-[#C5A059]/20 space-y-2 text-xs font-mono text-[#94A3B8]">
              <div className="flex items-center gap-2 text-white font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>BCA Registered • Licensed Builder</span>
              </div>
              <div>Hotline: <a href={`tel:${COMPANY_CONTACT.phone}`} className="text-[#DFBF7A]">{COMPANY_CONTACT.phone}</a></div>
              <div>Email: <a href={`mailto:${COMPANY_CONTACT.email}`} className="text-[#DFBF7A]">{COMPANY_CONTACT.email}</a></div>
            </div>
          </div>

          {/* Primary Mobile CTA */}
          <div className="pt-6 border-t border-white/[0.08] mt-6">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="tactile-button tactile-button-gold w-full py-4 text-xs tracking-widest text-center cursor-pointer justify-center"
            >
              <span>REQUEST A QUOTE / TENDER</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
