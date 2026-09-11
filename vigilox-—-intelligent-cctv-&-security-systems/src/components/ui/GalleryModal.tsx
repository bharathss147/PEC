import React from 'react';
import { X, Camera, Aperture, Clock, Zap, MapPin, User } from 'lucide-react';
import { GalleryItem } from '../../types';

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-5xl glass-panel-glow rounded-2xl overflow-hidden border border-white/15 shadow-2xl flex flex-col lg:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 text-white/70 hover:text-white border border-white/10 transition-colors"
          aria-label="Close"
        >
          <X size={18} />
        </button>

        {/* Large Photographic Preview Canvas */}
        <div className="lg:w-3/5 bg-black/90 flex items-center justify-center relative overflow-hidden group">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full object-contain max-h-[70vh] lg:max-h-[85vh]"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest bg-black/60 border border-[#00f0ff]/40 text-[#00f0ff] uppercase backdrop-blur-md">
              {item.category}
            </span>
          </div>
        </div>

        {/* Technical Telemetry Sidebar */}
        <div className="lg:w-2/5 p-6 lg:p-8 flex flex-col justify-between overflow-y-auto bg-[#0a0c10]/95">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-[#00f0ff] uppercase mb-1">
              LUMORA SHOT ARCHIVE
            </div>
            <h3 className="text-2xl font-bold font-display text-white tracking-tight mb-2">
              {item.title}
            </h3>

            <div className="flex items-center gap-4 text-xs font-mono text-white/50 mb-6">
              <span className="flex items-center gap-1">
                <User size={12} className="text-[#00f0ff]" /> {item.photographer}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={12} className="text-[#00f0ff]" /> {item.location}
              </span>
            </div>

            <p className="text-sm text-white/70 leading-relaxed font-sans mb-6">
              {item.description}
            </p>

            {/* EXIF Exposure Matrix */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">
                EXIF OPTICAL TELEMETRY
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex items-center gap-2.5">
                  <Aperture size={16} className="text-[#00f0ff]" />
                  <div>
                    <div className="text-[9px] font-mono uppercase text-white/40">APERTURE</div>
                    <div className="text-xs font-mono font-semibold text-white">{item.aperture}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex items-center gap-2.5">
                  <Clock size={16} className="text-[#00f0ff]" />
                  <div>
                    <div className="text-[9px] font-mono uppercase text-white/40">SHUTTER</div>
                    <div className="text-xs font-mono font-semibold text-white">{item.shutterSpeed}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex items-center gap-2.5">
                  <Zap size={16} className="text-[#00f0ff]" />
                  <div>
                    <div className="text-[9px] font-mono uppercase text-white/40">SENSITIVITY</div>
                    <div className="text-xs font-mono font-semibold text-white">{item.iso}</div>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-black/50 border border-white/5 flex items-center gap-2.5">
                  <Camera size={16} className="text-[#00f0ff]" />
                  <div>
                    <div className="text-[9px] font-mono uppercase text-white/40">SENSOR FORMAT</div>
                    <div className="text-xs font-mono font-semibold text-white">Full-Frame 3:2</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optical Lens Line */}
            <div className="mt-4 p-3 rounded-lg bg-[#00f0ff]/5 border border-[#00f0ff]/20">
              <div className="text-[9px] font-mono uppercase text-[#00f0ff]/80">GLASS USED</div>
              <div className="text-xs font-mono font-semibold text-white mt-0.5">
                {item.lensUsed}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span>UNCOMPRESSED 16-BIT RAW</span>
            <span className="text-[#00f0ff]">RESOLVED 8256 × 5504</span>
          </div>
        </div>
      </div>
    </div>
  );
};
