import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CameraColor, GripType, LensType } from '../../types';
import {
  createKnurlingTexture,
  createLeatherTexture,
  createSensorTexture,
  createScreenTexture,
} from './materials';

interface CameraModelProps {
  bodyColor?: CameraColor;
  grip?: GripType;
  lens?: LensType;
  floating?: boolean;
  wireframe?: boolean;
  explodedOffset?: number; // 0 (assembled) to 1 (fully exploded)
  onPartClick?: (partId: string) => void;
  showInternals?: boolean;
}

export const CameraModel: React.FC<CameraModelProps> = ({
  bodyColor = 'obsidian',
  grip = 'standard',
  lens = '50mm',
  floating = false,
  wireframe = false,
  explodedOffset = 0,
  onPartClick,
  showInternals = false,
}) => {
  const rootGroupRef = useRef<THREE.Group>(null);
  const lensGroupRef = useRef<THREE.Group>(null);
  const topPlateRef = useRef<THREE.Group>(null);
  const sensorGroupRef = useRef<THREE.Group>(null);
  const processorRef = useRef<THREE.Group>(null);
  const coolingRef = useRef<THREE.Group>(null);
  const batteryRef = useRef<THREE.Group>(null);
  const bodyChassisRef = useRef<THREE.Group>(null);

  // Textures
  const knurlingTex = useMemo(() => createKnurlingTexture(), []);
  const leatherTex = useMemo(() => createLeatherTexture(), []);
  const sensorTex = useMemo(() => createSensorTexture(), []);
  const screenTex = useMemo(() => createScreenTexture(), []);

  // Material parameters based on bodyColor
  const isTitanium = bodyColor === 'titanium';
  const chassisColor = isTitanium ? '#8c929d' : '#141518';
  const chassisMetalness = isTitanium ? 0.92 : 0.65;
  const chassisRoughness = isTitanium ? 0.28 : 0.42;

  // Lens physical dimensions based on selected focal length
  const lensDimensions = useMemo(() => {
    switch (lens) {
      case '24mm':
        return { length: 0.9, radius: 0.52, frontCurve: 0.45, name: '24mm F1.4' };
      case '35mm':
        return { length: 1.05, radius: 0.54, frontCurve: 0.48, name: '35mm F1.4' };
      case '50mm':
        return { length: 1.25, radius: 0.58, frontCurve: 0.52, name: '50mm F1.2' };
      case '85mm':
        return { length: 1.45, radius: 0.62, frontCurve: 0.55, name: '85mm F1.2' };
      case '70-200mm':
        return { length: 2.3, radius: 0.64, frontCurve: 0.58, name: '70-200mm F2.8' };
      default:
        return { length: 1.25, radius: 0.58, frontCurve: 0.52, name: '50mm F1.2' };
    }
  }, [lens]);

  // Subtle floating motion in idle state
  useFrame((state) => {
    if (floating && rootGroupRef.current) {
      const t = state.clock.getElapsedTime();
      rootGroupRef.current.position.y = Math.sin(t * 1.2) * 0.05;
      rootGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.04;
      rootGroupRef.current.rotation.x = Math.cos(t * 0.7) * 0.02;
    }
  });

  // Calculate exploded translations
  const exp = explodedOffset;
  const lensZ = exp * 2.2;
  const topY = exp * 1.4;
  const sensorZ = exp * 0.7;
  const sensorY = exp * 0.15;
  const procZ = -exp * 0.7;
  const procY = exp * 0.2;
  const coolingX = -exp * 1.5;
  const batteryY = -exp * 1.4;
  const batteryX = exp * 0.8;
  const screenZ = -exp * 1.2;

  return (
    <group ref={rootGroupRef}>
      {/* MAIN CAMERA CHASSIS */}
      <group
        ref={bodyChassisRef}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('body');
        }}
      >
        {/* Central Core Body */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2.0, 1.2, 0.7]} />
          <meshStandardMaterial
            color={chassisColor}
            metalness={chassisMetalness}
            roughness={chassisRoughness}
            wireframe={wireframe}
          />
        </mesh>

        {/* Chamfered Top Shoulder */}
        <mesh position={[0, 0.62, 0]} castShadow>
          <boxGeometry args={[1.9, 0.1, 0.64]} />
          <meshStandardMaterial
            color={chassisColor}
            metalness={chassisMetalness}
            roughness={chassisRoughness}
            wireframe={wireframe}
          />
        </mesh>

        {/* Ergonomic Right Grip */}
        <group position={[1.05, -0.05, 0.2]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry
              args={[
                grip === 'performance' ? 0.35 : 0.28,
                grip === 'performance' ? 0.38 : 0.3,
                grip === 'performance' ? 1.4 : 1.15,
                24,
              ]}
            />
            <meshStandardMaterial
              color="#0d0e11"
              roughness={0.88}
              metalness={0.08}
              bumpMap={leatherTex}
              bumpScale={0.04}
              wireframe={wireframe}
            />
          </mesh>

          {/* Front Command Dial embedded in grip */}
          <mesh position={[0, 0.45, 0.25]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.12, 0.12, 0.12, 24]} />
            <meshStandardMaterial
              color="#2a2c33"
              metalness={0.9}
              roughness={0.3}
              bumpMap={knurlingTex}
              bumpScale={0.06}
            />
          </mesh>
        </group>

        {/* Left Side Grip Texture Strip */}
        <mesh position={[-0.95, -0.05, 0.05]} castShadow>
          <boxGeometry args={[0.12, 1.05, 0.62]} />
          <meshStandardMaterial
            color="#0f1013"
            roughness={0.85}
            metalness={0.1}
            bumpMap={leatherTex}
            bumpScale={0.03}
          />
        </mesh>

        {/* Minimalist LUMORA Logo Badge on Front Face */}
        <group position={[-0.5, 0.48, 0.36]}>
          <mesh>
            <boxGeometry args={[0.55, 0.1, 0.015]} />
            <meshStandardMaterial
              color={isTitanium ? '#ffffff' : '#e0e4eb'}
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
        </group>

        {/* Minimal Red Accent Indicator */}
        <mesh position={[-0.85, 0.45, 0.36]}>
          <circleGeometry args={[0.045, 24]} />
          <meshBasicMaterial color="#ff2a3b" />
        </mesh>

        {/* AF Assist Illuminator Eye */}
        <mesh position={[0.65, 0.45, 0.36]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 16]} />
          <meshStandardMaterial
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.6}
            roughness={0.1}
          />
        </mesh>

        {/* Stainless Steel Lens Bayonet Mount */}
        <group
          position={[0, 0.05, 0.36]}
          onClick={(e) => {
            e.stopPropagation();
            onPartClick?.('lens-mount');
          }}
        >
          {/* Outer Mount Flange Collar */}
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.58, 0.62, 0.06, 48]} />
            <meshStandardMaterial
              color="#d6dadf"
              metalness={0.98}
              roughness={0.18}
              wireframe={wireframe}
            />
          </mesh>
          {/* Inner Bayonet Throat with 4 precision locking flanges */}
          <mesh position={[0, 0, 0.035]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.48, 0.04, 16, 48]} />
            <meshStandardMaterial color="#3a3d45" metalness={0.9} roughness={0.3} />
          </mesh>
          {/* 12 Gold Contact Pins */}
          {Array.from({ length: 12 }).map((_, i) => {
            const angle = Math.PI * 0.6 + (i * Math.PI * 0.8) / 11;
            const px = Math.cos(angle) * 0.44;
            const py = Math.sin(angle) * 0.44;
            return (
              <mesh key={i} position={[px, py, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.012, 0.012, 0.02, 12]} />
                <meshStandardMaterial color="#f5c242" metalness={0.95} roughness={0.1} />
              </mesh>
            );
          })}
          {/* Red Lens Alignment Index Point */}
          <mesh position={[0.48, 0.32, 0.04]}>
            <circleGeometry args={[0.02, 16]} />
            <meshBasicMaterial color="#ef4444" />
          </mesh>
          {/* Lens Release Push Button */}
          <mesh position={[0.62, -0.15, 0.02]} rotation={[0, Math.PI / 2, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.04, 20]} />
            <meshStandardMaterial color="#555963" metalness={0.8} roughness={0.3} />
          </mesh>
        </group>

        {/* Rear LCD Screen Assembly */}
        <group
          position={[0, -0.02, -0.36 - screenZ]}
          onClick={(e) => {
            e.stopPropagation();
            onPartClick?.('body');
          }}
        >
          {/* Screen Bezel Frame */}
          <mesh castShadow>
            <boxGeometry args={[1.5, 0.95, 0.05]} />
            <meshStandardMaterial color="#181a1f" metalness={0.6} roughness={0.4} />
          </mesh>
          {/* Active Live-View Display Face */}
          <mesh position={[0, 0, -0.028]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[1.38, 0.84]} />
            <meshBasicMaterial map={screenTex} />
          </mesh>
          {/* Precision Hinge on Left Edge */}
          <mesh position={[-0.76, 0, 0]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.8, 16]} />
            <meshStandardMaterial color="#4f535d" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* TOP PLATE ASSEMBLY (Separates along +Y in exploded view) */}
      <group
        ref={topPlateRef}
        position={[0, topY, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('body');
        }}
      >
        {/* EVF / Pentaprism Pyramid Housing */}
        <group position={[0, 0.65, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.32, 0.46, 0.32, 4]} />
            <meshStandardMaterial
              color={chassisColor}
              metalness={chassisMetalness}
              roughness={chassisRoughness}
              wireframe={wireframe}
            />
          </mesh>
          {/* Hot Shoe Mount on Top of EVF */}
          <mesh position={[0, 0.17, 0]} castShadow>
            <boxGeometry args={[0.26, 0.03, 0.3]} />
            <meshStandardMaterial color="#2d3038" metalness={0.95} roughness={0.2} />
          </mesh>
          {/* Gold Contacts inside Hot Shoe */}
          <mesh position={[0, 0.188, 0.02]}>
            <boxGeometry args={[0.12, 0.01, 0.12]} />
            <meshStandardMaterial color="#f5c242" metalness={0.98} roughness={0.1} />
          </mesh>
          {/* Rear Eyecup with Optical Glass */}
          <mesh position={[0, 0.02, -0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.16, 0.19, 0.1, 24]} />
            <meshStandardMaterial color="#0b0b0d" roughness={0.9} metalness={0.05} />
          </mesh>
          {/* Diopter Adjustment Wheel */}
          <mesh position={[0.22, 0.02, -0.26]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.05, 0.05, 0.03, 16]} />
            <meshStandardMaterial
              color="#3a3d46"
              metalness={0.8}
              roughness={0.3}
              bumpMap={knurlingTex}
              bumpScale={0.08}
            />
          </mesh>
          {/* Stereo Mics on EVF flanks */}
          <mesh position={[-0.22, 0.08, 0.05]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.4} />
          </mesh>
          <mesh position={[0.22, 0.08, 0.05]}>
            <sphereGeometry args={[0.025, 12, 12]} />
            <meshStandardMaterial color="#111" metalness={0.8} roughness={0.4} />
          </mesh>
        </group>

        {/* Shutter Button & Power Collar on Right Grip Top */}
        <group position={[0.82, 0.68, 0.18]}>
          {/* Power Switch Rotating Collar */}
          <mesh rotation={[0, 0.4, 0]}>
            <cylinderGeometry args={[0.13, 0.14, 0.04, 24]} />
            <meshStandardMaterial color="#33363e" metalness={0.9} roughness={0.25} />
          </mesh>
          {/* Shutter Release Button with threaded remote core */}
          <mesh position={[0, 0.03, 0]}>
            <cylinderGeometry args={[0.085, 0.085, 0.04, 24]} />
            <meshStandardMaterial
              color={isTitanium ? '#ffffff' : '#4a4e58'}
              metalness={0.95}
              roughness={0.15}
            />
          </mesh>
          {/* Threaded cable release hole */}
          <mesh position={[0, 0.052, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.01, 12]} />
            <meshBasicMaterial color="#111" />
          </mesh>
        </group>

        {/* Main Exposure Mode Dial (Left Top) */}
        <group position={[-0.72, 0.68, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.22, 0.22, 0.08, 32]} />
            <meshStandardMaterial
              color="#22242a"
              metalness={0.9}
              roughness={0.3}
              bumpMap={knurlingTex}
              bumpScale={0.06}
            />
          </mesh>
          {/* Mode Lock Button in center */}
          <mesh position={[0, 0.045, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 0.03, 20]} />
            <meshStandardMaterial color="#4f535e" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>

        {/* Exposure Compensation Dial (Right Top Rear) */}
        <group position={[0.55, 0.67, -0.15]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.18, 0.18, 0.07, 32]} />
            <meshStandardMaterial
              color="#22242a"
              metalness={0.9}
              roughness={0.3}
              bumpMap={knurlingTex}
              bumpScale={0.06}
            />
          </mesh>
        </group>

        {/* Dedicated Movie REC Button with Red Ring */}
        <group position={[0.52, 0.68, 0.18]}>
          <mesh>
            <cylinderGeometry args={[0.05, 0.05, 0.02, 20]} />
            <meshStandardMaterial color="#2d3038" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.015, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.015, 16]} />
            <meshBasicMaterial color="#ff1744" />
          </mesh>
        </group>
      </group>

      {/* SENSOR & IBIS CORE (Separates forward in exploded view or visible through mount) */}
      <group
        ref={sensorGroupRef}
        position={[0, 0.05 + sensorY, 0.22 + sensorZ]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('sensor');
        }}
      >
        {/* 5-Axis Magnetic Levitation Carrier Frame */}
        <mesh castShadow>
          <boxGeometry args={[0.78, 0.65, 0.06]} />
          <meshStandardMaterial
            color="#2e313a"
            metalness={0.85}
            roughness={0.3}
            wireframe={wireframe}
          />
        </mesh>
        {/* Voice-Coil Actuator Magnets on 4 corners */}
        {[
          [-0.34, 0.26],
          [0.34, 0.26],
          [-0.34, -0.26],
          [0.34, -0.26],
        ].map(([cx, cy], i) => (
          <mesh key={i} position={[cx, cy, 0.02]}>
            <boxGeometry args={[0.08, 0.08, 0.04]} />
            <meshStandardMaterial color="#00f0ff" metalness={0.8} roughness={0.2} emissive="#00f0ff" emissiveIntensity={0.2} />
          </mesh>
        ))}
        {/* Silicon Sensor Die with Pixel Grid Texture */}
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.54, 0.36]} />
          <meshStandardMaterial
            map={sensorTex}
            metalness={0.85}
            roughness={0.12}
            emissive="#00f0ff"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Optical Low-Pass Filter Glass Layer */}
        <mesh position={[0, 0, 0.042]}>
          <planeGeometry args={[0.56, 0.38]} />
          <meshPhysicalMaterial
            color="#22d3ee"
            transmission={0.9}
            opacity={0.4}
            transparent
            roughness={0.05}
            ior={1.52}
          />
        </mesh>
      </group>

      {/* NEURAL PROCESSOR ENGINE (Slides backward in exploded view) */}
      <group
        ref={processorRef}
        position={[0, procY, -0.15 + procZ]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('processor');
        }}
      >
        {/* Multi-layer Motherboard PCB */}
        <mesh castShadow>
          <boxGeometry args={[1.2, 0.8, 0.04]} />
          <meshStandardMaterial color="#091b26" metalness={0.6} roughness={0.5} />
        </mesh>
        {/* LUMORA Quantum IV Neural Chip */}
        <mesh position={[0, 0.05, 0.035]} castShadow>
          <boxGeometry args={[0.38, 0.38, 0.04]} />
          <meshStandardMaterial
            color="#121316"
            metalness={0.95}
            roughness={0.2}
            wireframe={wireframe}
          />
        </mesh>
        {/* Laser Engraved Die Details */}
        <mesh position={[0, 0.05, 0.058]}>
          <planeGeometry args={[0.32, 0.32]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
        {/* Heat Spreader Copper Fins */}
        <mesh position={[0, 0.05, -0.035]}>
          <boxGeometry args={[0.42, 0.42, 0.03]} />
          <meshStandardMaterial color="#c27d38" metalness={0.95} roughness={0.25} />
        </mesh>
      </group>

      {/* GRAPHENE COOLING CHAMBER (Slides left in exploded view) */}
      <group
        ref={coolingRef}
        position={[-0.3 + coolingX, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('cooling');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[0.35, 0.7, 0.45]} />
          <meshStandardMaterial
            color="#1c232b"
            metalness={0.88}
            roughness={0.35}
            wireframe={wireframe}
          />
        </mesh>
        {/* Sintered Copper Heat Pipes */}
        <mesh position={[0.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.4, 16]} />
          <meshStandardMaterial color="#d97706" metalness={0.95} roughness={0.2} />
        </mesh>
      </group>

      {/* SOLID-STATE BATTERY CELL (Drops down in exploded view) */}
      <group
        ref={batteryRef}
        position={[0.7 + batteryX, -0.2 + batteryY, 0.15]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('battery');
        }}
      >
        <mesh castShadow>
          <boxGeometry args={[0.42, 0.72, 0.3]} />
          <meshStandardMaterial
            color="#181a20"
            metalness={0.7}
            roughness={0.4}
            wireframe={wireframe}
          />
        </mesh>
        {/* Battery Terminals */}
        <mesh position={[0, 0.37, 0]}>
          <boxGeometry args={[0.2, 0.02, 0.1]} />
          <meshStandardMaterial color="#f5c242" metalness={0.98} roughness={0.1} />
        </mesh>
        {/* Technical Label Strip */}
        <mesh position={[0.215, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.26, 0.5]} />
          <meshBasicMaterial color="#00f0ff" wireframe />
        </mesh>
      </group>

      {/* ATTACHED 3D LENS ASSEMBLY (Separates forward along +Z in exploded view) */}
      <group
        ref={lensGroupRef}
        position={[0, 0.05, 0.38 + lensZ]}
        onClick={(e) => {
          e.stopPropagation();
          onPartClick?.('lens-mount');
        }}
      >
        {/* Base Lens Mount Collar */}
        <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.55, 0.58, 0.16, 48]} />
          <meshStandardMaterial
            color="#1a1c22"
            metalness={0.9}
            roughness={0.25}
            wireframe={wireframe}
          />
        </mesh>

        {/* Stepped Aperture Ring with Knurling */}
        <mesh position={[0, 0, 0.22]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[lensDimensions.radius * 0.95, lensDimensions.radius * 0.95, 0.12, 48]} />
          <meshStandardMaterial
            color="#141519"
            metalness={0.85}
            roughness={0.3}
            bumpMap={knurlingTex}
            bumpScale={0.06}
          />
        </mesh>

        {/* Distance Scale Window with luminous markings */}
        <mesh position={[0, lensDimensions.radius * 0.96, 0.36]} rotation={[-Math.PI * 0.1, 0, 0]}>
          <boxGeometry args={[0.28, 0.04, 0.1]} />
          <meshStandardMaterial color="#0b1a24" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, lensDimensions.radius * 0.96 + 0.02, 0.36]} rotation={[-Math.PI * 0.1, 0, 0]}>
          <planeGeometry args={[0.24, 0.025]} />
          <meshBasicMaterial color="#00f0ff" />
        </mesh>

        {/* Broad Focus Ring with Fine Ribbed Texture */}
        <mesh
          position={[0, 0, 0.24 + lensDimensions.length * 0.4]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry
            args={[lensDimensions.radius, lensDimensions.radius, lensDimensions.length * 0.45, 48]}
          />
          <meshStandardMaterial
            color="#111215"
            metalness={0.88}
            roughness={0.35}
            bumpMap={knurlingTex}
            bumpScale={0.08}
          />
        </mesh>

        {/* Front Barrel Section */}
        <mesh
          position={[0, 0, 0.1 + lensDimensions.length * 0.85]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry
            args={[
              lensDimensions.radius * 1.05,
              lensDimensions.radius,
              lensDimensions.length * 0.35,
              48,
            ]}
          />
          <meshStandardMaterial
            color={chassisColor}
            metalness={chassisMetalness}
            roughness={chassisRoughness}
            wireframe={wireframe}
          />
        </mesh>

        {/* Front Engraved Bezel Rim */}
        <mesh
          position={[0, 0, 0.26 + lensDimensions.length]}
          rotation={[Math.PI / 2, 0, 0]}
          castShadow
        >
          <cylinderGeometry
            args={[
              lensDimensions.radius * 1.05,
              lensDimensions.radius * 1.05,
              0.04,
              48,
              1,
              true,
            ]}
          />
          <meshStandardMaterial color="#2d3038" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Internal Aperture Iris Blades Ring */}
        <group position={[0, 0, 0.4]}>
          {Array.from({ length: 11 }).map((_, i) => {
            const rot = (i * Math.PI * 2) / 11;
            return (
              <mesh
                key={i}
                position={[Math.cos(rot) * 0.18, Math.sin(rot) * 0.18, 0]}
                rotation={[0, 0, rot + 0.3]}
              >
                <planeGeometry args={[0.22, 0.08]} />
                <meshStandardMaterial
                  color="#1e2025"
                  metalness={0.92}
                  roughness={0.2}
                  side={THREE.DoubleSide}
                />
              </mesh>
            );
          })}
        </group>

        {/* Middle Optical Glass Element */}
        <mesh position={[0, 0, 0.6]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[lensDimensions.radius * 0.8, lensDimensions.radius * 0.8, 0.05, 32]} />
          <meshPhysicalMaterial
            color="#e0f2fe"
            transmission={0.95}
            opacity={0.3}
            transparent
            roughness={0.02}
            ior={1.62}
            clearcoat={1}
          />
        </mesh>

        {/* Large Curved Front Optical Glass Element */}
        <mesh
          position={[0, 0, 0.22 + lensDimensions.length]}
          rotation={[0, 0, 0]}
        >
          <sphereGeometry
            args={[
              lensDimensions.frontCurve,
              32,
              16,
              0,
              Math.PI * 2,
              0,
              Math.PI * 0.35,
            ]}
          />
          <meshPhysicalMaterial
            color="#38bdf8"
            transmission={0.92}
            opacity={0.35}
            transparent
            roughness={0.03}
            metalness={0.1}
            ior={1.75}
            reflectivity={0.9}
            clearcoat={1}
            clearcoatRoughness={0.05}
          />
        </mesh>

        {/* Deep Violet / Emerald Anti-Reflective Coating Specular Ring */}
        <mesh position={[0, 0, 0.23 + lensDimensions.length]} rotation={[0, 0, 0]}>
          <ringGeometry args={[lensDimensions.radius * 0.6, lensDimensions.radius * 0.98, 48]} />
          <meshBasicMaterial
            color="#8b5cf6"
            opacity={0.25}
            transparent
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  );
};
