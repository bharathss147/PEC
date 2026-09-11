import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CameraModel } from './CameraModel';

export const CinemaScene3D: React.FC = () => {
  const cameraRigRef = useRef<THREE.Group>(null);
  const streaksRef = useRef<THREE.Group>(null);

  // Anamorphic horizontal light streaks
  const streakCount = 18;
  const streakData = useMemo(() => {
    return Array.from({ length: streakCount }).map(() => ({
      x: (Math.random() - 0.5) * 16,
      y: (Math.random() - 0.5) * 8,
      z: -5 + Math.random() * 8,
      length: 6 + Math.random() * 12,
      opacity: 0.15 + Math.random() * 0.35,
      speed: 0.2 + Math.random() * 0.5,
    }));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    if (cameraRigRef.current) {
      // Cinematic camera motion: dynamic slow sweeping arc with subtle organic hand-held motion
      cameraRigRef.current.position.x = Math.sin(t * 0.4) * 0.8;
      cameraRigRef.current.position.y = Math.cos(t * 0.35) * 0.35 + 0.1;
      cameraRigRef.current.position.z = Math.sin(t * 0.25) * 0.5;

      cameraRigRef.current.rotation.y = -0.3 + Math.sin(t * 0.3) * 0.25;
      cameraRigRef.current.rotation.x = 0.08 + Math.cos(t * 0.4) * 0.06;
      cameraRigRef.current.rotation.z = Math.sin(t * 0.5) * 0.03;
    }

    if (streaksRef.current) {
      streaksRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const data = streakData[i];
        mesh.position.x = ((data.x + t * data.speed) % 20) - 10;
      });
    }
  });

  return (
    <group>
      {/* Volumetric Cinema Spotlight Shafts */}
      <spotLight
        position={[-6, 6, -3]}
        target-position={[0, 0, 0]}
        intensity={6.0}
        angle={0.5}
        penumbra={0.8}
        color="#00f0ff"
      />
      <spotLight
        position={[6, 4, -4]}
        target-position={[0, 0, 0]}
        intensity={4.5}
        angle={0.6}
        penumbra={0.9}
        color="#38bdf8"
      />
      <directionalLight position={[0, -5, -5]} intensity={1.5} color="#0c4a6e" />

      {/* Cinematic Fog Plane / Atmosphere */}
      <ambientLight intensity={0.25} color="#05101a" />

      {/* Camera with Cinema Rig Mounted */}
      <group ref={cameraRigRef}>
        <CameraModel
          bodyColor="obsidian"
          grip="performance"
          lens="50mm"
          floating={false}
        />

        {/* Cinema Matte Box on Front of Lens */}
        <group position={[0, 0.05, 1.8]}>
          {/* Carbon Fiber Sunshade Frame */}
          <mesh castShadow>
            <boxGeometry args={[1.5, 1.1, 0.25]} />
            <meshStandardMaterial color="#0b0d10" roughness={0.7} metalness={0.2} />
          </mesh>
          {/* Top French Flag (Eyebrow shade) tilted forward */}
          <mesh position={[0, 0.58, 0.12]} rotation={[-0.35, 0, 0]} castShadow>
            <boxGeometry args={[1.45, 0.03, 0.45]} />
            <meshStandardMaterial color="#08090b" roughness={0.8} metalness={0.1} />
          </mesh>
          {/* Side Flags Left/Right */}
          <mesh position={[-0.78, 0, 0.1]} rotation={[0, 0.35, 0]}>
            <boxGeometry args={[0.03, 1.0, 0.35]} />
            <meshStandardMaterial color="#08090b" roughness={0.8} metalness={0.1} />
          </mesh>
          <mesh position={[0.78, 0, 0.1]} rotation={[0, -0.35, 0]}>
            <boxGeometry args={[0.03, 1.0, 0.35]} />
            <meshStandardMaterial color="#08090b" roughness={0.8} metalness={0.1} />
          </mesh>
        </group>

        {/* Top Cinema Handle */}
        <group position={[0, 0.95, -0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.16, 0.08, 1.2]} />
            <meshStandardMaterial color="#1a1c22" roughness={0.3} metalness={0.9} />
          </mesh>
          {/* Handle Upright Stems */}
          <mesh position={[0, -0.15, -0.45]}>
            <cylinderGeometry args={[0.04, 0.04, 0.25, 16]} />
            <meshStandardMaterial color="#2d3038" roughness={0.2} metalness={0.95} />
          </mesh>
          <mesh position={[0, -0.15, 0.35]}>
            <cylinderGeometry args={[0.04, 0.04, 0.25, 16]} />
            <meshStandardMaterial color="#2d3038" roughness={0.2} metalness={0.95} />
          </mesh>
        </group>

        {/* Dual 15mm Carbon Fiber Support Rods underneath */}
        <group position={[0, -0.65, 0.35]}>
          <mesh position={[-0.45, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 2.8, 16]} />
            <meshStandardMaterial color="#08080a" roughness={0.5} metalness={0.8} />
          </mesh>
          <mesh position={[0.45, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 2.8, 16]} />
            <meshStandardMaterial color="#08080a" roughness={0.5} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* Anamorphic Horizontal Blue Light Streaks in Background */}
      <group ref={streaksRef}>
        {streakData.map((s, i) => (
          <mesh key={i} position={[s.x, s.y, s.z]}>
            <planeGeometry args={[s.length, 0.04]} />
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={s.opacity}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};
