import React, { useState } from 'react';
import { X, Play, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';

interface ExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({ isOpen, onClose }) => {
  const [muted, setMuted] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl glass-panel rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/70 text-white/70 hover:text-white border border-white/10 transition-colors"
          aria-label="Close video experience"
        >
          <X size={18} />
        </button>

        {/* Cinematic Film Presentation */}
        <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden">
          {/* High-definition moody backdrop video or cinematic frame sequence */}
          <img
            src="https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=1600&auto=format&fit=crop"
            alt="Cinematic Footage"
            className="w-full h-full object-cover opacity-80"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />

          {/* Center Play Overlay */}
          <div className="relative z-10 text-center max-w-lg px-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-[#00f0ff] text-black flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.6)] mb-4">
              <Play size={24} className="fill-black translate-x-0.5" />
            </div>
            <span className="text-[11px] font-mono tracking-widest text-[#00f0ff] uppercase">
              CINEMATIC PRODUCT LAUNCH FILM
            </span>
            <h3 className="text-2xl md:text-3xl font-bold font-display text-white mt-1">
              THE GENESIS OF LUMORA
            </h3>
            <p className="text-xs font-sans text-white/70 mt-2">
              Captured across the volcanic craters of Iceland and subterranean Tokyo in native 8K 120 FPS RAW.
            </p>
          </div>

          {/* Bottom Bar Telemetry */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-[11px] font-mono text-white/60">
            <div className="flex items-center gap-3">
              <Film size={14} className="text-[#00f0ff]" />
              <span>8K UNCOMPRESSED / 2.39:1 CINEMASCOPE</span>
            </div>
            <button
              onClick={() => setMuted(!muted)}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{muted ? 'MUTED' : 'DOLBY ATMOS'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
