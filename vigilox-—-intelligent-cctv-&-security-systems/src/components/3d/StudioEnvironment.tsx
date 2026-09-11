import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface StudioEnvironmentProps {
  intensity?: number;
  particles?: boolean;
  rimColor?: string;
  floorShadow?: boolean;
}

export const StudioEnvironment: React.FC<StudioEnvironmentProps> = ({
  intensity = 1.0,
  particles = true,
  rimColor = '#00f0ff',
  floorShadow = true,
}) => {
  const particlesRef = useRef<THREE.Points>(null);

  // Floating micro-particles (subtle dust motes in cinematic studio light)
  const particleCount = 70;
  const particlePositions = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particles && particlesRef.current) {
      const t = state.clock.getElapsedTime();
      particlesRef.current.rotation.y = t * 0.02;
      particlesRef.current.position.y = Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <>
      {/* Ambient Low Foundation */}
      <ambientLight intensity={0.35 * intensity} color="#181c24" />

      {/* Main Overhead Softbox Key Light */}
      <directionalLight
        position={[4, 7, 5]}
        intensity={2.2 * intensity}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
        color="#ffffff"
      />

      {/* Soft Front-Fill Studio Light */}
      <directionalLight
        position={[-3, 2, 4]}
        intensity={1.1 * intensity}
        color="#cfd8dc"
      />

      {/* Cinematic Cyber-Blue Rim Light (Right-Rear Grazing Angle) */}
      <directionalLight
        position={[5, 1, -4]}
        intensity={3.0 * intensity}
        color={rimColor}
      />

      {/* Silver Metallic Edge Highlight (Left-Rear Grazing Angle) */}
      <directionalLight
        position={[-5, 3, -3]}
        intensity={2.4 * intensity}
        color="#e2e8f0"
      />

      {/* Bottom Subtle Bounce Ground Light */}
      <directionalLight
        position={[0, -4, 2]}
        intensity={0.4 * intensity}
        color="#00f0ff"
      />

      {/* Cinematic Studio Floor with Vignette and Reflection */}
      {floorShadow && (
        <group position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh receiveShadow>
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial
              color="#07080a"
              roughness={0.65}
              metalness={0.4}
            />
          </mesh>
          {/* Soft Radial Contact Shadow Blob under Camera */}
          <mesh position={[0, 0, 0.01]}>
            <circleGeometry args={[1.6, 32]} />
            <meshBasicMaterial
              color="#000000"
              transparent
              opacity={0.7}
            />
          </mesh>
        </group>
      )}

      {/* Subtle Dust / Photon Particles */}
      {particles && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={particlePositions}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color="#67e8f9"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </>
  );
};
