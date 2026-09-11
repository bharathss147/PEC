import React from 'react';
import { Html } from '@react-three/drei';
import { VIGILOX_HOTSPOTS } from '../../data/vigiloxData';
import { HotspotItem } from '../../types/vigilox';

interface VigiloxHotspots3DProps {
  activeHotspot: HotspotItem | null;
  onSelectHotspot: (hotspot: HotspotItem) => void;
  visible?: boolean;
}

export const VigiloxHotspots3D: React.FC<VigiloxHotspots3DProps> = ({
  activeHotspot,
  onSelectHotspot,
  visible = true,
}) => {
  if (!visible) return null;

  return (
    <group>
      {VIGILOX_HOTSPOTS.map((hotspot) => {
        const isActive = activeHotspot?.id === hotspot.id;

        return (
          <group key={hotspot.id} position={hotspot.position}>
            {/* 3D Glowing Core Sphere */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                onSelectHotspot(hotspot);
              }}
            >
              <sphereGeometry args={[0.07, 16, 16]} />
              <meshStandardMaterial
                color={isActive ? '#ffffff' : '#00f0ff'}
                emissive={isActive ? '#00f0ff' : '#00a3cc'}
                emissiveIntensity={isActive ? 1.5 : 0.8}
              />
            </mesh>

            {/* Pulsing Target Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.09, 0.12, 32]} />
              <meshBasicMaterial
                color={isActive ? '#00f0ff' : '#00f0ff'}
                transparent
                opacity={isActive ? 0.9 : 0.4}
              />
            </mesh>

            {/* Connecting Stanchion Line */}
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.005, 0.005, 0.15, 8]} />
              <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
            </mesh>

            {/* Interactive HTML Tag Overlay */}
            <Html
              position={[0, 0.22, 0]}
              center
              distanceFactor={8}
              zIndexRange={[100, 0]}
            >
              <button
                type="button"
                onClick={() => onSelectHotspot(hotspot)}
                className={`group flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[11px] font-mono whitespace-nowrap transition-all duration-300 backdrop-blur-md cursor-pointer ${
                  isActive
                    ? 'bg-[#00f0ff] text-black font-semibold shadow-[0_0_20px_rgba(0,240,255,0.6)] scale-110'
                    : 'bg-[#0b0e12]/80 border border-[#00f0ff]/40 text-[#F4F6F7] hover:border-[#00f0ff] hover:bg-[#0e141a]'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-black animate-ping' : 'bg-[#00f0ff]'}`} />
                <span>{hotspot.label}</span>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
