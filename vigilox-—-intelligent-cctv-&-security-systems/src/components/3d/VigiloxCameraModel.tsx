import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { createKnurlingTexture, createSensorTexture } from './materials';

interface VigiloxCameraModelProps {
  wireframe?: boolean;
  panAngle?: number; // degrees
  tiltAngle?: number; // degrees
  interactiveFollow?: boolean;
  statusColor?: string;
  irActive?: boolean;
  scale?: number;
  rotation?: [number, number, number];
  position?: [number, number, number];
}

export const VigiloxCameraModel: React.FC<VigiloxCameraModelProps> = ({
  wireframe = false,
  panAngle = 0,
  tiltAngle = 0,
  interactiveFollow = true,
  statusColor = '#00f0ff',
  irActive = true,
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
}) => {
  const rootRef = useRef<THREE.Group>(null);
  const panTurretRef = useRef<THREE.Group>(null);
  const tiltHeadRef = useRef<THREE.Group>(null);
  const ledRingRef = useRef<THREE.Mesh>(null);
  const targetPan = useRef(0);
  const targetTilt = useRef(0);

  // Procedural textures
  const knurlTex = useMemo(() => createKnurlingTexture(), []);
  const sensorTex = useMemo(() => createSensorTexture(), []);

  // Materials
  const materials = useMemo(() => {
    return {
      bodyMetal: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0e1114'),
        roughness: 0.28,
        metalness: 0.88,
        wireframe,
      }),
      bodyAccents: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#191f24'),
        roughness: 0.4,
        metalness: 0.75,
        wireframe,
      }),
      titaniumRing: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#68727b'),
        roughness: 0.2,
        metalness: 0.95,
        bumpMap: knurlTex,
        bumpScale: 0.02,
        wireframe,
      }),
      smokedDome: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#030507'),
        roughness: 0.05,
        metalness: 0.1,
        transmission: 0.85,
        thickness: 0.6,
        ior: 1.52,
        transparent: true,
        opacity: 0.9,
        wireframe,
      }),
      opticalLens: new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#081a24'),
        roughness: 0.02,
        metalness: 0.1,
        transmission: 0.92,
        thickness: 0.8,
        ior: 1.62,
        clearcoat: 1.0,
        clearcoatRoughness: 0.05,
        reflectivity: 0.9,
        wireframe,
      }),
      sensorCore: new THREE.MeshStandardMaterial({
        map: sensorTex,
        roughness: 0.1,
        metalness: 0.9,
        wireframe,
      }),
      statusGlow: new THREE.MeshBasicMaterial({
        color: new THREE.Color(statusColor),
        wireframe,
      }),
      irLedGlow: new THREE.MeshBasicMaterial({
        color: new THREE.Color(irActive ? '#ff1e56' : '#222'),
        wireframe,
      }),
      heatSinkFin: new THREE.MeshStandardMaterial({
        color: new THREE.Color('#0a0d10'),
        roughness: 0.35,
        metalness: 0.92,
        wireframe,
      }),
    };
  }, [wireframe, knurlTex, sensorTex, statusColor, irActive]);

  useFrame((state, delta) => {
    // Mouse tracking for subtle responsive gaze
    if (interactiveFollow) {
      const mouse = state.pointer;
      const mousePan = mouse.x * 0.45;
      const mouseTilt = -mouse.y * 0.35;
      targetPan.current = THREE.MathUtils.degToRad(panAngle) + mousePan;
      targetTilt.current = THREE.MathUtils.degToRad(tiltAngle) + mouseTilt;
    } else {
      targetPan.current = THREE.MathUtils.degToRad(panAngle);
      targetTilt.current = THREE.MathUtils.degToRad(tiltAngle);
    }

    if (panTurretRef.current) {
      panTurretRef.current.rotation.y = THREE.MathUtils.damp(
        panTurretRef.current.rotation.y,
        targetPan.current,
        4,
        delta
      );
    }

    if (tiltHeadRef.current) {
      tiltHeadRef.current.rotation.x = THREE.MathUtils.damp(
        tiltHeadRef.current.rotation.x,
        targetTilt.current,
        4,
        delta
      );
    }

    // Gentle floating breathing
    if (rootRef.current && !interactiveFollow) {
      rootRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.05;
    }

    // Pulse status LED
    if (ledRingRef.current) {
      const intensity = 0.8 + Math.sin(state.clock.elapsedTime * 3) * 0.25;
      materials.statusGlow.color.set(statusColor).multiplyScalar(intensity);
    }
  });

  return (
    <group ref={rootRef} position={position} rotation={rotation} scale={scale}>
      {/* BASE MOUNT ASSEMBLY (Ceiling/Wall junction plate) */}
      <group position={[0, 1.35, 0]}>
        {/* Mounting Flange Plate */}
        <mesh material={materials.bodyMetal} castShadow receiveShadow>
          <cylinderGeometry args={[1.5, 1.6, 0.22, 64]} />
        </mesh>
        
        {/* Weather Sealing O-Ring */}
        <mesh position={[0, -0.12, 0]}>
          <torusGeometry args={[1.45, 0.03, 16, 64]} />
          <meshStandardMaterial color="#1a202c" roughness={0.9} wireframe={wireframe} />
        </mesh>

        {/* Cable Gland & Armor Conduit Nut */}
        <mesh position={[0.9, 0.15, 0]} rotation={[0, 0, Math.PI / 8]} material={materials.titaniumRing}>
          <cylinderGeometry args={[0.16, 0.18, 0.2, 8]} />
        </mesh>

        {/* Heat Sink Cooling Fins Ring */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.32, -0.06, Math.sin(angle) * 1.32]}
              rotation={[0, -angle, 0]}
              material={materials.heatSinkFin}
            >
              <boxGeometry args={[0.14, 0.16, 0.03]} />
            </mesh>
          );
        })}
      </group>

      {/* PAN MECHANISM COLLAR (Rotates horizontally) */}
      <group ref={panTurretRef} position={[0, 0.8, 0]}>
        {/* Turret Main Housing */}
        <mesh material={materials.bodyMetal} castShadow receiveShadow>
          <cylinderGeometry args={[1.35, 1.45, 0.85, 64]} />
        </mesh>

        {/* Precision Laser-Etched Degree Ring */}
        <mesh position={[0, 0.35, 0]} material={materials.titaniumRing}>
          <cylinderGeometry args={[1.36, 1.36, 0.14, 64]} />
        </mesh>

        {/* Neon Status Ring (Active Cyber Indicator) */}
        <mesh ref={ledRingRef} position={[0, -0.38, 0]} material={materials.statusGlow}>
          <torusGeometry args={[1.36, 0.03, 16, 64]} />
        </mesh>

        {/* Quad Mic Array Acoustic Vents */}
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
          <mesh
            key={i}
            position={[Math.cos(angle) * 1.38, 0.05, Math.sin(angle) * 1.38]}
            rotation={[0, -angle, 0]}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.08, 16]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.4} wireframe={wireframe} />
          </mesh>
        ))}

        {/* TILT FORK ARMS */}
        <mesh position={[-0.95, -0.6, 0]} material={materials.bodyAccents}>
          <boxGeometry args={[0.22, 0.85, 0.45]} />
        </mesh>
        <mesh position={[0.95, -0.6, 0]} material={materials.bodyAccents}>
          <boxGeometry args={[0.22, 0.85, 0.45]} />
        </mesh>

        {/* TILT HEAD & OPTICAL BALL (Rotates vertically) */}
        <group ref={tiltHeadRef} position={[0, -0.7, 0]}>
          {/* Main Spherical Optical Core */}
          <mesh material={materials.bodyMetal} castShadow receiveShadow>
            <sphereGeometry args={[0.88, 64, 48]} />
          </mesh>

          {/* Front Bezel Ring */}
          <mesh position={[0, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]} material={materials.titaniumRing}>
            <cylinderGeometry args={[0.55, 0.62, 0.28, 48]} />
          </mesh>

          {/* Optical Glass Lens (Recessed) */}
          <mesh position={[0, 0, 0.82]} rotation={[-Math.PI / 2, 0, 0]} material={materials.opticalLens}>
            <sphereGeometry args={[0.48, 32, 24, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
          </mesh>

          {/* Internal CMOS Starlight Sensor (Visible through lens) */}
          <mesh position={[0, 0, 0.6]} material={materials.sensorCore}>
            <boxGeometry args={[0.34, 0.34, 0.02]} />
          </mesh>

          {/* Stealth IR Illuminator Array (12 dual-spectrum LEDs around lens) */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const radius = 0.68;
            return (
              <mesh
                key={i}
                position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0.62]}
                rotation={[Math.PI / 2, 0, 0]}
                material={materials.irLedGlow}
              >
                <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
              </mesh>
            );
          })}

          {/* Laser Rangefinder & Auto-Tracking Emitter */}
          <mesh position={[0.35, 0.35, 0.72]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.045, 0.045, 0.06, 16]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.8} />
          </mesh>

          {/* Smoked Protective Outer Dome (Optional protective envelope) */}
          <mesh position={[0, 0, 0.1]} material={materials.smokedDome}>
            <sphereGeometry args={[1.05, 48, 36, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          </mesh>

          {/* Precision Micro-Logo Plate */}
          <mesh position={[0, 0.78, 0.35]} rotation={[-0.4, 0, 0]}>
            <boxGeometry args={[0.38, 0.1, 0.02]} />
            <meshStandardMaterial color="#0b0e12" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
