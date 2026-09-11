import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { createSensorTexture } from './materials';

export const Sensor3D: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const raysRef = useRef<THREE.Group>(null);
  const dataParticlesRef = useRef<THREE.Points>(null);

  const sensorTex = useMemo(() => createSensorTexture(), []);

  // Data streams rising from the sensor substrate
  const streamCount = 120;
  const streamPositions = useMemo(() => {
    const pos = new Float32Array(streamCount * 3);
    for (let i = 0; i < streamCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4.2;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2.8;
      pos[i * 3 + 2] = Math.random() * 2.5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (groupRef.current) {
      // Gentle cinematic breathing and rotation
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15 - 0.2;
      groupRef.current.rotation.x = Math.cos(t * 0.25) * 0.1 + 0.15;
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
    }

    if (raysRef.current) {
      raysRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const scale = 1 + Math.sin(t * 3 + i) * 0.2;
        mesh.scale.set(scale, 1, scale);
        const mat = mesh.material as THREE.MeshBasicMaterial;
        if (mat) {
          mat.opacity = 0.25 + Math.sin(t * 4 + i * 0.5) * 0.15;
        }
      });
    }

    if (dataParticlesRef.current) {
      const positions = dataParticlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < streamCount; i++) {
        // Move particles outward/upward
        positions[i * 3 + 2] += 0.02;
        if (positions[i * 3 + 2] > 3) {
          positions[i * 3 + 2] = 0;
        }
      }
      dataParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Heavy Anodized Substrate Carrier Plate */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[4.8, 3.4, 0.25]} />
        <meshStandardMaterial
          color="#101318"
          metalness={0.92}
          roughness={0.25}
        />
      </mesh>

      {/* Gold Perimeter Wire Bonding Bus Frame */}
      <mesh position={[0, 0, 0.14]}>
        <boxGeometry args={[4.3, 2.9, 0.04]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.98}
          roughness={0.15}
        />
      </mesh>

      {/* 45.7MP Full-Frame Silicon Active Die with Iridescent Micro-lenses */}
      <mesh position={[0, 0, 0.165]} castShadow>
        <planeGeometry args={[3.9, 2.6]} />
        <meshStandardMaterial
          map={sensorTex}
          metalness={0.85}
          roughness={0.1}
          emissive="#00f0ff"
          emissiveIntensity={0.22}
        />
      </mesh>

      {/* Anti-Reflective Optical Glass Cover Slip with Thin-Film Interference */}
      <mesh position={[0, 0, 0.2]}>
        <planeGeometry args={[4.0, 2.7]} />
        <meshPhysicalMaterial
          color="#22d3ee"
          transmission={0.95}
          opacity={0.3}
          transparent
          roughness={0.02}
          ior={1.65}
          clearcoat={1}
          clearcoatRoughness={0.02}
          reflectivity={0.9}
        />
      </mesh>

      {/* Laser-etched Gold Precision Pins around edges */}
      {Array.from({ length: 28 }).map((_, i) => (
        <mesh key={`pin-top-${i}`} position={[-2.0 + (i * 4.0) / 27, 1.55, 0.08]}>
          <boxGeometry args={[0.08, 0.14, 0.03]} />
          <meshStandardMaterial color="#f5c242" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}
      {Array.from({ length: 28 }).map((_, i) => (
        <mesh key={`pin-bot-${i}`} position={[-2.0 + (i * 4.0) / 27, -1.55, 0.08]}>
          <boxGeometry args={[0.08, 0.14, 0.03]} />
          <meshStandardMaterial color="#f5c242" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* Photonic Light Rays hitting the sensor surface */}
      <group ref={raysRef} position={[0, 0, 1.6]}>
        {[-1.2, 0, 1.2].map((rx, idx) =>
          [-0.6, 0.6].map((ry, idy) => (
            <mesh
              key={`${idx}-${idy}`}
              position={[rx, ry, 0]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.02, 0.35, 3.2, 16, 1, true]} />
              <meshBasicMaterial
                color="#00f0ff"
                transparent
                opacity={0.3}
                blending={THREE.AdditiveBlending}
                side={THREE.DoubleSide}
              />
            </mesh>
          ))
        )}
      </group>

      {/* Digital Data Stream Sparks */}
      <points ref={dataParticlesRef} position={[0, 0, 0.25]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={streamCount}
            array={streamPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.06}
          color="#00f0ff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Subtle Backglow Halo */}
      <pointLight position={[0, 0, -0.8]} intensity={4} color="#00f0ff" distance={6} />
    </group>
  );
};
