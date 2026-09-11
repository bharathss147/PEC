import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { VigiloxModelId } from '../../types/vigilox';
import { VigiloxCameraModel } from './VigiloxCameraModel';

interface SpatialLineup3DProps {
  activeModel: VigiloxModelId;
  autoRotate?: boolean;
}

export const SpatialLineup3D: React.FC<SpatialLineup3DProps> = ({
  activeModel,
  autoRotate = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  // Render distinct custom form factors based on activeModel
  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {activeModel === 'core' && (
        <VigiloxCameraModel
          scale={1.1}
          panAngle={0}
          tiltAngle={-15}
          statusColor="#00f0ff"
          interactiveFollow={false}
        />
      )}

      {activeModel === 'ptz' && (
        <group position={[0, 0.2, 0]}>
          <VigiloxCameraModel
            scale={1.2}
            panAngle={25}
            tiltAngle={-20}
            statusColor="#00f0ff"
            interactiveFollow={false}
          />
          {/* Extended Telephoto Snout */}
          <mesh position={[0, -0.65, 1.15]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.46, 0.5, 48]} />
            <meshStandardMaterial color="#14191f" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Hydrophobic Wiper Arm */}
          <mesh position={[0.3, -0.4, 1.25]} rotation={[0, 0, -0.4]}>
            <boxGeometry args={[0.04, 0.35, 0.02]} />
            <meshStandardMaterial color="#333" metalness={0.5} roughness={0.6} />
          </mesh>
        </group>
      )}

      {activeModel === 'dome' && (
        <group position={[0, 0.4, 0]}>
          {/* Recessed Ceiling Mount Collar */}
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[1.8, 1.85, 0.15, 64]} />
            <meshStandardMaterial color="#0c0e12" metalness={0.8} roughness={0.3} />
          </mesh>
          {/* Ultra-Smooth Low Profile Smoked Glass Dome */}
          <mesh position={[0, 0.2, 0]}>
            <sphereGeometry args={[1.3, 64, 48, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
            <meshPhysicalMaterial
              color="#040608"
              roughness={0.03}
              metalness={0.1}
              transmission={0.88}
              thickness={0.5}
              ior={1.5}
              transparent
              opacity={0.92}
            />
          </mesh>
          {/* Hidden Internal Gimbal Core */}
          <mesh position={[0, 0.4, 0]}>
            <sphereGeometry args={[0.85, 32, 24]} />
            <meshStandardMaterial color="#1a2026" metalness={0.85} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.2, 0.7]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.3, 0.35, 0.2, 32]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} />
          </mesh>
        </group>
      )}

      {activeModel === 'bullet' && (
        <group position={[0, -0.1, 0]}>
          {/* Articulated Ball-Joint Bracket */}
          <mesh position={[0, 0.6, -1.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.6, 0.65, 0.25, 32]} />
            <meshStandardMaterial color="#181d22" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.4, -0.7]} rotation={[0.3, 0, 0]}>
            <cylinderGeometry args={[0.18, 0.18, 0.9, 16]} />
            <meshStandardMaterial color="#4a5568" metalness={0.95} roughness={0.2} />
          </mesh>

          {/* Long Bullet Barrel Body */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 2.2, 48]} />
            <meshStandardMaterial color="#0e1115" metalness={0.85} roughness={0.3} />
          </mesh>

          {/* Sunshield / Rain Canopy Hood */}
          <mesh position={[0, 0.25, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.82, 0.82, 2.0, 48, 1, true, 0, Math.PI]} />
            <meshStandardMaterial color="#161b20" metalness={0.9} roughness={0.3} side={THREE.DoubleSide} />
          </mesh>

          {/* Front Dual Blinding Strobes */}
          <mesh position={[-0.45, 0.35, 1.1]}>
            <boxGeometry args={[0.2, 0.15, 0.08]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
          </mesh>
          <mesh position={[0.45, 0.35, 1.1]}>
            <boxGeometry args={[0.2, 0.15, 0.08]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.2} />
          </mesh>

          {/* Center Front Lens */}
          <mesh position={[0, -0.05, 1.1]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.42, 0.46, 0.15, 32]} />
            <meshStandardMaterial color="#00f0ff" metalness={0.8} roughness={0.1} />
          </mesh>
        </group>
      )}

      {activeModel === 'mini' && (
        <group position={[0, 0.1, 0]}>
          {/* Ultra-compact Cube Chassis */}
          <mesh>
            <boxGeometry args={[1.1, 1.1, 0.9]} />
            <meshStandardMaterial color="#0c0f13" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Titanium Corner Chamfer Ring */}
          <mesh position={[0, 0, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.38, 0.42, 0.1, 32]} />
            <meshStandardMaterial color="#556270" metalness={0.95} roughness={0.2} />
          </mesh>
          {/* Micro-Lens Eye */}
          <mesh position={[0, 0, 0.54]}>
            <sphereGeometry args={[0.24, 24, 16]} />
            <meshPhysicalMaterial
              color="#021a24"
              roughness={0.05}
              metalness={0.1}
              transmission={0.9}
              ior={1.6}
            />
          </mesh>
          {/* Micro Status LED */}
          <mesh position={[0.38, 0.38, 0.46]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" />
          </mesh>
        </group>
      )}

      {/* Floating Floor Grid Shadow Ring */}
      <mesh position={[0, -1.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.5, 2.2, 32]} />
        <meshBasicMaterial color="rgba(0, 240, 255, 0.08)" transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
