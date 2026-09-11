import React, { useState } from 'react';
import { X, ShieldCheck, Check, Server, Building2, HardDrive, ArrowRight } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [facility, setFacility] = useState('datacenter');
  const [cameras, setCameras] = useState(64);
  const [retention, setRetention] = useState(90);
  const [perimeterDefense, setPerimeterDefense] = useState(true);
  const [biometrics, setBiometrics] = useState(true);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const estimatedBandwidth = (cameras * 12.5).toFixed(1); // Mbps
  const estimatedStorageTB = ((cameras * 12.5 * 3600 * 24 * retention) / (8 * 1024 * 1024)).toFixed(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-fade-in font-mono">
      <div
        className="relative w-full max-w-2xl bg-[#0b0e12] border border-[#00f0ff]/40 rounded-sm p-6 sm:p-8 shadow-[0_0_60px_rgba(0,240,255,0.15)] text-[#F4F6F7] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top cyan accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00f0ff] via-blue-500 to-[#00f0ff]" />

        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <div className="text-xs text-[#00f0ff] tracking-widest uppercase">
              VIGILOX ENTERPRISE ARCHITECTURE
            </div>
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white mt-1">
              DEPLOYMENT ESTIMATOR & RFP
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#9EA4A8] hover:text-white rounded-sm hover:bg-white/5 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 mx-auto flex items-center justify-center">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-xl font-display font-bold text-white">
              DEPLOYMENT BRIEF RECEIVED
            </h3>
            <p className="text-sm text-[#9EA4A8] max-w-md mx-auto">
              A VIGILOX Solutions Architect has been assigned to your facility blueprint. Encrypted design docs and technical specifications have been queued for dispatch.
            </p>
            <div className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-6 py-2.5 bg-[#00f0ff] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                RETURN TO COMMAND CENTER
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="py-5 space-y-6">
            {/* Facility Category */}
            <div>
              <label className="block text-xs uppercase text-[#9EA4A8] mb-2 tracking-wider">
                1. FACILITY INFRASTRUCTURE CLASSIFICATION
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  { id: 'datacenter', label: 'HYPERSCALE DATA CENTER' },
                  { id: 'logistics', label: 'AUTONOMOUS PORT & CARGO' },
                  { id: 'corporate', label: 'GLOBAL HEADQUARTERS' },
                  { id: 'aerospace', label: 'AEROSPACE & LAUNCH' },
                  { id: 'critical', label: 'NATIONAL INFRASTRUCTURE' },
                  { id: 'commercial', label: 'HIGH-DENSITY CAMPUS' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFacility(item.id)}
                    className={`p-2.5 text-xs text-left border rounded-sm transition-all cursor-pointer ${
                      facility === item.id
                        ? 'bg-[#00f0ff]/10 border-[#00f0ff] text-white font-semibold'
                        : 'bg-[#101419] border-white/5 text-[#9EA4A8] hover:border-white/20'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scale Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#101419] p-4 rounded-sm border border-white/5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#9EA4A8]">CAMERA NODES:</span>
                  <span className="text-[#00f0ff] font-bold text-sm">{cameras} SENSORS</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="256"
                  step="8"
                  value={cameras}
                  onChange={(e) => setCameras(Number(e.target.value))}
                  className="w-full accent-[#00f0ff] cursor-pointer"
                />
              </div>

              <div className="bg-[#101419] p-4 rounded-sm border border-white/5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#9EA4A8]">ON-PREM ENCRYPTED RETENTION:</span>
                  <span className="text-[#00f0ff] font-bold text-sm">{retention} DAYS</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="365"
                  step="30"
                  value={retention}
                  onChange={(e) => setRetention(Number(e.target.value))}
                  className="w-full accent-[#00f0ff] cursor-pointer"
                />
              </div>
            </div>

            {/* AI Capabilities Selection */}
            <div>
              <label className="block text-xs uppercase text-[#9EA4A8] mb-2 tracking-wider">
                2. AUTONOMOUS NEURAL PACKAGES
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <label className="flex items-center gap-3 p-3 rounded-sm bg-[#101419] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={perimeterDefense}
                    onChange={(e) => setPerimeterDefense(e.target.checked)}
                    className="accent-[#00f0ff] w-4 h-4"
                  />
                  <span className="text-xs text-[#F4F6F7]">Kinematic Perimeter Defense & Radar Intercept</span>
                </label>
                <label className="flex items-center gap-3 p-3 rounded-sm bg-[#101419] border border-white/5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={biometrics}
                    onChange={(e) => setBiometrics(e.target.checked)}
                    className="accent-[#00f0ff] w-4 h-4"
                  />
                  <span className="text-xs text-[#F4F6F7]">Zero-Trust Face Vector & LPR Fleet Recognition</span>
                </label>
              </div>
            </div>

            {/* Architecture Metrics Live Box */}
            <div className="bg-[#07090c] p-4 rounded-sm border border-[#00f0ff]/30 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[#9EA4A8] block">AGGREGATE THROUGHPUT:</span>
                <span className="text-white font-bold">{estimatedBandwidth} Mbps</span>
              </div>
              <div>
                <span className="text-[#9EA4A8] block">ESTIMATED STORAGE:</span>
                <span className="text-white font-bold">{estimatedStorageTB} TB</span>
              </div>
              <div>
                <span className="text-[#9EA4A8] block">SECURITY CLEARANCE:</span>
                <span className="text-emerald-400 font-bold">NDAA / TAA READY</span>
              </div>
            </div>

            {/* Contact Email Input */}
            <div>
              <label className="block text-xs uppercase text-[#9EA4A8] mb-2 tracking-wider">
                3. ARCHITECT / SECURITY DIRECTOR CORPORATE EMAIL
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="chief.security@enterprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#101419] border border-white/10 rounded-sm px-4 py-2.5 text-xs text-white placeholder-white/30 focus:border-[#00f0ff] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#00f0ff] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>SUBMIT RFP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
