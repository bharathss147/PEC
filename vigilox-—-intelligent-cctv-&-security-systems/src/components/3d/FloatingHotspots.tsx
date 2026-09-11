import React from 'react';
import { Html } from '@react-three/drei';
import { HOTSPOTS_DATA } from '../../data/cameraData';
import { HotspotData } from '../../types';

interface FloatingHotspotsProps {
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: HotspotData) => void;
  visible?: boolean;
}

export const FloatingHotspots: React.FC<FloatingHotspotsProps> = ({
  activeHotspotId,
  onSelectHotspot,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <group>
      {HOTSPOTS_DATA.map((spot) => {
        const isActive = activeHotspotId === spot.id;
        return (
          <group key={spot.id} position={spot.position}>
            <Html center distanceFactor={7} zIndexRange={[100, 0]}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectHotspot(spot);
                }}
                className="group relative flex items-center justify-center p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff] rounded-full cursor-pointer transition-transform duration-300 hover:scale-125"
                title={spot.title}
                aria-label={`View ${spot.name} specifications`}
              >
                {/* Outer pulsating ring */}
                <span
                  className={`absolute w-8 h-8 rounded-full border border-[#00f0ff]/50 animate-ping opacity-75 ${
                    isActive ? 'scale-150 border-[#00f0ff]' : ''
                  }`}
                />
                {/* Secondary halo ring */}
                <span
                  className={`absolute w-6 h-6 rounded-full border transition-all duration-300 ${
                    isActive
                      ? 'border-[#00f0ff] bg-[#00f0ff]/20'
                      : 'border-white/30 bg-black/40 group-hover:border-[#00f0ff]'
                  }`}
                />
                {/* Core illuminated dot */}
                <span
                  className={`relative w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    isActive ? 'bg-[#00f0ff] shadow-[0_0_12px_#00f0ff]' : 'bg-white group-hover:bg-[#00f0ff]'
                  }`}
                />
                {/* Floating pill label on hover */}
                <span
                  className={`absolute left-7 whitespace-nowrap px-2 py-0.5 rounded text-[10px] tracking-wider uppercase font-mono font-medium backdrop-blur-md transition-all duration-200 pointer-events-none ${
                    isActive
                      ? 'bg-[#00f0ff]/20 border border-[#00f0ff]/40 text-[#00f0ff] translate-x-0 opacity-100'
                      : 'bg-black/70 border border-white/10 text-white/70 opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                  }`}
                >
                  {spot.name}
                </span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
