import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { TECH_COMPONENTS } from '../../data/techLabData';
import { TechComponentInfo } from '../../types';

interface TechLab3DProps {
  selectedComponent: TechComponentInfo | null;
  onSelectComponent: (comp: TechComponentInfo) => void;
}

export const TechLab3D: React.FC<TechLab3DProps> = ({
  selectedComponent,
  onSelectComponent,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const pulseLinesRef = useRef<THREE.Group>(null);

  // Animate lines and node rotation
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
      groupRef.current.position.y = Math.sin(t * 0.4) * 0.05;
    }
  });

  // Calculate pairs to draw lines connecting components to the central sensor
  const centerPos = TECH_COMPONENTS[0].position;

  return (
    <group ref={groupRef}>
      {/* Central Engineering Grid Wireframe Plane */}
      <gridHelper
        args={[10, 20, '#00f0ff', '#141c24']}
        position={[0, -1.8, 0]}
      />

      {/* Interconnecting Data Lines */}
      <group ref={pulseLinesRef}>
        {TECH_COMPONENTS.slice(1).map((comp, idx) => {
          const points = [
            new THREE.Vector3(...centerPos),
            new THREE.Vector3(...comp.position),
          ];
          const lineGeom = new THREE.BufferGeometry().setFromPoints(points);

          return (
            <primitive
              key={idx}
              object={
                new THREE.Line(
                  lineGeom,
                  new THREE.LineBasicMaterial({
                    color: comp.color,
                    transparent: true,
                    opacity: 0.45,
                  })
                )
              }
            />
          );
        })}
      </group>

      {/* Floating 3D Component Nodes */}
      {TECH_COMPONENTS.map((comp) => {
        const isSelected = selectedComponent?.id === comp.id;

        return (
          <group
            key={comp.id}
            position={comp.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectComponent(comp);
            }}
          >
            {/* Component Geometric Core */}
            <mesh castShadow>
              {comp.id === 'sensor-core' ? (
                <boxGeometry args={[0.9, 0.6, 0.08]} />
              ) : comp.id === 'processor-neural' ? (
                <boxGeometry args={[0.55, 0.55, 0.06]} />
              ) : comp.id === 'cooling-graphene' ? (
                <boxGeometry args={[0.5, 0.7, 0.3]} />
              ) : comp.id === 'ibis-maglev' ? (
                <cylinderGeometry args={[0.4, 0.4, 0.15, 24]} />
              ) : (
                <cylinderGeometry args={[0.3, 0.3, 0.8, 24]} />
              )}
              <meshStandardMaterial
                color={isSelected ? '#00f0ff' : '#171920'}
                metalness={0.9}
                roughness={0.2}
                emissive={isSelected ? comp.color : '#000000'}
                emissiveIntensity={isSelected ? 0.4 : 0}
              />
            </mesh>

            {/* Glowing Orbit Ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.65, 0.68, 32]} />
              <meshBasicMaterial
                color={comp.color}
                transparent
                opacity={isSelected ? 0.8 : 0.3}
                side={THREE.DoubleSide}
              />
            </mesh>

            {/* 3D Technical Tag */}
            <Html center distanceFactor={7}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectComponent(comp);
                }}
                className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-mono text-[11px] border backdrop-blur-md transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] scale-105'
                    : 'bg-black/60 border-white/10 text-white/70 hover:border-white/40 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: comp.color }}
                  />
                  <span>{comp.name}</span>
                </div>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
