import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Hammer, Camera, Wrench, Building, Layers, Send, Phone, Mail } from 'lucide-react';
import { COMPANY_CONTACT } from '../../data/companyData';
import { UniversalQuoteRequest } from '../../types/company';

interface UniversalQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTrade?: string;
}

export const UniversalQuoteModal: React.FC<UniversalQuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedTrade,
}) => {
  const [serviceType, setServiceType] = useState<UniversalQuoteRequest['serviceType']>(
    preselectedTrade?.toLowerCase().includes('cctv') || preselectedTrade?.toLowerCase().includes('security')
      ? 'cctv_security'
      : preselectedTrade
      ? 'renovation'
      : 'multiple'
  );

  // Form State
  const [propertyType, setPropertyType] = useState('Commercial Office');
  const [approxArea, setApproxArea] = useState('1,500 – 3,000 sq ft');
  const [cameraCount, setCameraCount] = useState(8);
  const [requiresAccessControl, setRequiresAccessControl] = useState(true);
  const [storageDays, setStorageDays] = useState(30);
  const [selectedTrades, setSelectedTrades] = useState<string[]>(
    preselectedTrade ? [preselectedTrade] : ['Electrical & Lighting', 'Drywall & Ceiling', 'CCTV 4K Surveillance']
  );
  const [siteLocation, setSiteLocation] = useState('Central Singapore');
  const [targetTimeline, setTargetTimeline] = useState('Within 1 Month');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const toggleTrade = (trade: string) => {
    if (selectedTrades.includes(trade)) {
      setSelectedTrades(selectedTrades.filter(t => t !== trade));
    } else {
      setSelectedTrades([...selectedTrades, trade]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const tradeOptions = [
    'Electrical & Power (EMA)',
    'Plumbing & Sanitary (PUB)',
    'Aircon & ACMV Mechanical',
    'Custom Carpentry & Joinery',
    'Drywall & False Ceiling',
    'Heavy-Duty Vinyl & SPC',
    'Porcelain / Marble Tiling',
    'Painting & Coating',
    'Glass / Aluminium Works',
    'Facilities Maintenance',
    'CCTV 4K Surveillance',
    'Biometric Door Access',
    'Video Intercom Systems',
    'PABX & Structured Cabling'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#07162C] border border-[#C5A059]/40 rounded-xs shadow-2xl p-6 sm:p-8 text-[#F8FAFC] font-mono max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-[#94A3B8] hover:text-white hover:bg-white/10 rounded-xs transition-colors"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-400/20 border border-emerald-400 flex items-center justify-center mx-auto text-emerald-400">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs text-[#C5A059] uppercase tracking-widest block mb-1">
                ENQUIRY RECEIVED & LOGGED
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase">
                THANK YOU, {contactName || 'VALUED CLIENT'}
              </h3>
              <p className="text-xs sm:text-sm text-[#94A3B8] font-sans font-light mt-3 max-w-lg mx-auto leading-relaxed">
                Your project specification has been routed to our Singapore quantity surveying & engineering division. A licensed project manager will respond within 4 business hours.
              </p>
            </div>

            <div className="p-4 rounded-xs bg-[#091A32] border border-[#C5A059]/20 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="text-[#C5A059] font-bold">NEED RAPID SAME-DAY ESTIMATES?</div>
              <div className="text-[#94A3B8]">Direct WhatsApp: <span className="text-white font-bold">{COMPANY_CONTACT.whatsapp}</span></div>
              <div className="text-[#94A3B8]">Direct Phone: <span className="text-white font-bold">{COMPANY_CONTACT.phone}</span></div>
              <div className="text-[#94A3B8]">Official Email: <span className="text-white font-bold">{COMPANY_CONTACT.email}</span></div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="tactile-button tactile-button-gold px-8 py-3 text-xs"
            >
              <span>RETURN TO PLATFORM</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Modal Header */}
            <div className="border-b border-white/[0.08] pb-4">
              <div className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>PARADISE ELITE CONSTRUCTION PTE. LTD. // SINGAPORE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-display font-black text-white uppercase mt-1">
                REQUEST PROJECT QUOTATION / TENDER
              </h2>
              <p className="text-xs text-[#94A3B8] font-sans font-light mt-1">
                Select your service requirements to generate a tailored architectural and technical estimate.
              </p>
            </div>

            {/* STEP 1: Choose Primary Category */}
            <div>
              <label className="text-[11px] text-[#C5A059] uppercase tracking-wider block mb-2 font-bold">
                01 // WHAT SERVICES DO YOU REQUIRE?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                {[
                  { id: 'multiple', label: 'COMBINED / TURNKEY' },
                  { id: 'cctv_security', label: 'CCTV & SECURITY' },
                  { id: 'renovation', label: 'FIT-OUT & RENOVATION' },
                  { id: 'construction', label: 'CIVIL & STRUCTURAL' },
                  { id: 'maintenance', label: 'M&E MAINTENANCE' },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setServiceType(st.id as any)}
                    className={`p-2.5 text-center rounded-xs border transition-all cursor-pointer text-[10px] font-bold ${
                      serviceType === st.id
                        ? 'bg-[#C5A059] text-[#040D1A] border-[#C5A059]'
                        : 'bg-[#0A1C36] text-[#94A3B8] border-white/10 hover:text-white'
                    }`}
                  >
                    {st.label}
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: Conditional Requirements based on serviceType */}
            {(serviceType === 'cctv_security' || serviceType === 'multiple') && (
              <div className="p-4 rounded-xs bg-[#0A1C36]/70 border border-[#C5A059]/20 space-y-4">
                <div className="text-xs text-[#DFBF7A] font-bold uppercase flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-emerald-400" />
                  <span>SURVEILLANCE & ACCESS CONFIGURATION</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">CAMERA QUANTITY</label>
                    <select
                      value={cameraCount}
                      onChange={(e) => setCameraCount(Number(e.target.value))}
                      className="w-full bg-[#07162C] border border-white/10 p-2 text-white rounded-xs focus:border-[#C5A059]"
                    >
                      <option value={4}>4-Camera Package</option>
                      <option value={8}>8-Camera Package (Standard)</option>
                      <option value={16}>16-Camera Commercial Hub</option>
                      <option value={32}>32-Camera Enterprise NVR</option>
                      <option value={64}>64+ Multi-Building Network</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">STORAGE RETENTION</label>
                    <select
                      value={storageDays}
                      onChange={(e) => setStorageDays(Number(e.target.value))}
                      className="w-full bg-[#07162C] border border-white/10 p-2 text-white rounded-xs focus:border-[#C5A059]"
                    >
                      <option value={14}>14 Days Surveillance</option>
                      <option value={30}>30 Days (Standard SG)</option>
                      <option value={60}>60 Days Compliance</option>
                      <option value={90}>90 Days Enterprise Raid</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">BIOMETRIC ACCESS</label>
                    <select
                      value={requiresAccessControl ? 'yes' : 'no'}
                      onChange={(e) => setRequiresAccessControl(e.target.value === 'yes')}
                      className="w-full bg-[#07162C] border border-white/10 p-2 text-white rounded-xs focus:border-[#C5A059]"
                    >
                      <option value="yes">Include Facial Recognition / EM Locks</option>
                      <option value="no">Surveillance Only</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {(serviceType === 'renovation' || serviceType === 'construction' || serviceType === 'multiple') && (
              <div className="p-4 rounded-xs bg-[#0A1C36]/70 border border-[#C5A059]/20 space-y-4">
                <div className="text-xs text-[#DFBF7A] font-bold uppercase flex items-center gap-1.5">
                  <Hammer className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>INTERIOR FIT-OUT & CONSTRUCTION TRADES</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">PROPERTY TYPE</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-[#07162C] border border-white/10 p-2 text-white rounded-xs focus:border-[#C5A059]"
                    >
                      <option value="Commercial Office">Commercial Office / HQ</option>
                      <option value="Industrial Warehouse">Industrial Warehouse / B2 Factory</option>
                      <option value="Retail Outlet">Retail Store / F&B Restaurant</option>
                      <option value="Residential Landed">Residential Landed / Penthouse</option>
                      <option value="Condominium">Condominium Apartment</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">APPROX. FLOOR AREA</label>
                    <select
                      value={approxArea}
                      onChange={(e) => setApproxArea(e.target.value)}
                      className="w-full bg-[#07162C] border border-white/10 p-2 text-white rounded-xs focus:border-[#C5A059]"
                    >
                      <option value="Under 1,000 sq ft">Under 1,000 sq ft</option>
                      <option value="1,000 – 3,000 sq ft">1,000 – 3,000 sq ft</option>
                      <option value="3,000 – 8,000 sq ft">3,000 – 8,000 sq ft</option>
                      <option value="Over 8,000 sq ft">Over 8,000 sq ft (Industrial)</option>
                    </select>
                  </div>
                </div>

                {/* Specific Trades Checkboxes */}
                <div>
                  <label className="text-[10px] text-[#94A3B8] uppercase block mb-2">
                    SELECT TRADES NEEDED (CLICK TO TOGGLE):
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {tradeOptions.map((tr) => {
                      const isSelected = selectedTrades.includes(tr);
                      return (
                        <button
                          key={tr}
                          type="button"
                          onClick={() => toggleTrade(tr)}
                          className={`px-2.5 py-1 text-[10px] rounded-xs border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#C5A059] text-[#040D1A] font-bold border-[#C5A059]'
                              : 'bg-[#07162C] text-[#94A3B8] border-white/10 hover:border-white/30'
                          }`}
                        >
                          {isSelected && '✓ '}
                          {tr}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Site Details & Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-[10px] text-[#C5A059] uppercase block mb-1 font-bold">
                  PROJECT LOCATION (SINGAPORE)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tuas Industrial / Raffles Place / Woodlands"
                  value={siteLocation}
                  onChange={(e) => setSiteLocation(e.target.value)}
                  className="w-full bg-[#0A1C36] border border-white/10 p-2.5 text-white rounded-xs focus:border-[#C5A059]"
                />
              </div>

              <div>
                <label className="text-[10px] text-[#C5A059] uppercase block mb-1 font-bold">
                  TARGET COMMENCEMENT TIMELINE
                </label>
                <select
                  value={targetTimeline}
                  onChange={(e) => setTargetTimeline(e.target.value)}
                  className="w-full bg-[#0A1C36] border border-white/10 p-2.5 text-white rounded-xs focus:border-[#C5A059]"
                >
                  <option value="Immediate (Within 7 Days)">Immediate (Within 7 Days)</option>
                  <option value="Within 1 Month">Within 1 Month</option>
                  <option value="1 – 3 Months">1 – 3 Months</option>
                  <option value="Future Budgeting / Tender">Future Budgeting / Tender</option>
                </select>
              </div>
            </div>

            {/* STEP 4: Client Contact Info */}
            <div className="border-t border-white/[0.08] pt-4 space-y-3">
              <span className="text-[11px] text-[#C5A059] uppercase tracking-wider block font-bold">
                02 // YOUR CONTACT INFORMATION
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">NAME / ENTITY *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Tan"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full bg-[#0A1C36] border border-white/10 p-2 text-white rounded-xs focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">OFFICIAL EMAIL *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com.sg"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="w-full bg-[#0A1C36] border border-white/10 p-2 text-white rounded-xs focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">PHONE / WHATSAPP *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+65 9123 4567"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full bg-[#0A1C36] border border-white/10 p-2 text-white rounded-xs focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-[#94A3B8] uppercase block mb-1">
                  ADDITIONAL SCOPE NOTES / REQUIREMENTS (OPTIONAL)
                </label>
                <textarea
                  rows={2}
                  placeholder="Mention any architectural drawings, LEW requirements, or specific camera placement needs..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#0A1C36] border border-white/10 p-2 text-white rounded-xs focus:border-[#C5A059] text-xs"
                />
              </div>
            </div>

            {/* Submission CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] text-[#94A3B8]">
                ✓ Strictly Confidential • BCA Licensed Standard • No Obligation Quote
              </span>
              <button
                type="submit"
                className="tactile-button tactile-button-gold w-full sm:w-auto px-8 py-3.5 text-xs tracking-wider cursor-pointer"
              >
                <span>SUBMIT QUOTATION REQUEST</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
