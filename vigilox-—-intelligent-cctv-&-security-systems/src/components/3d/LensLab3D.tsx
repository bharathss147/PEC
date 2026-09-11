import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { LensSpecification } from '../../types';
import { createKnurlingTexture } from './materials';

interface LensLab3DProps {
  activeLens: LensSpecification;
  apertureValue: number; // e.g. 1.2 to 16
  wireframe?: boolean;
}

export const LensLab3D: React.FC<LensLab3DProps> = ({
  activeLens,
  apertureValue,
  wireframe = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const bladesGroupRef = useRef<THREE.Group>(null);
  const knurlingTex = useMemo(() => createKnurlingTexture(), []);

  // Compute optical barrel dimensions dynamically based on lens id
  const lensParams = useMemo(() => {
    switch (activeLens.id) {
      case '24mm':
        return { length: 2.2, radius: 1.1, frontCurv: 0.95, groups: 11, elements: 14 };
      case '35mm':
        return { length: 2.6, radius: 1.15, frontCurv: 1.0, groups: 9, elements: 12 };
      case '50mm':
        return { length: 3.2, radius: 1.25, frontCurv: 1.15, groups: 12, elements: 15 };
      case '85mm':
        return { length: 3.6, radius: 1.35, frontCurv: 1.25, groups: 10, elements: 13 };
      case '70-200mm':
        return { length: 5.5, radius: 1.4, frontCurv: 1.3, groups: 15, elements: 19 };
      default:
        return { length: 3.2, radius: 1.25, frontCurv: 1.15, groups: 12, elements: 15 };
    }
  }, [activeLens.id]);

  // Aperture normalized factor: 0 (wide open) to 1 (stopped down to f/16)
  const [minAperture, maxAperture] = activeLens.apertureRange;
  const apertureNormalized = Math.max(
    0,
    Math.min(1, (apertureValue - minAperture) / (maxAperture - minAperture))
  );

  // Aperture iris opening radius
  const irisRadius = 0.55 - apertureNormalized * 0.42; // open: 0.55, closed: 0.13

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      // Slow continuous floating and presentation rotation
      groupRef.current.rotation.y = t * 0.25;
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.08;
    }
  });

  const numBlades = activeLens.diaphragmBlades;

  return (
    <group ref={groupRef} rotation={[0.2, 0, 0]}>
      {/* BASE MOUNT FLANGE */}
      <mesh position={[0, -lensParams.length / 2, 0]} castShadow>
        <cylinderGeometry args={[1.0, 1.05, 0.35, 48]} />
        <meshStandardMaterial
          color="#d0d5dd"
          metalness={0.98}
          roughness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* Gold Bayonet Pins */}
      {Array.from({ length: 12 }).map((_, i) => {
        const ang = (i * Math.PI * 2) / 12;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(ang) * 0.85,
              -lensParams.length / 2 - 0.18,
              Math.sin(ang) * 0.85,
            ]}
          >
            <cylinderGeometry args={[0.02, 0.02, 0.06, 12]} />
            <meshStandardMaterial color="#f5c242" metalness={0.95} roughness={0.1} />
          </mesh>
        );
      })}

      {/* LOWER BARREL SECTION */}
      <mesh position={[0, -lensParams.length * 0.3, 0]} castShadow>
        <cylinderGeometry
          args={[lensParams.radius * 0.92, lensParams.radius * 0.95, lensParams.length * 0.3, 48]}
        />
        <meshStandardMaterial
          color="#121316"
          metalness={0.88}
          roughness={0.35}
          wireframe={wireframe}
        />
      </mesh>

      {/* APERTURE CONTROL RING WITH KNURLING */}
      <mesh position={[0, -lensParams.length * 0.15, 0]} castShadow>
        <cylinderGeometry
          args={[lensParams.radius * 0.96, lensParams.radius * 0.96, 0.25, 48]}
        />
        <meshStandardMaterial
          color="#1c1d22"
          metalness={0.9}
          roughness={0.3}
          bumpMap={knurlingTex}
          bumpScale={0.08}
        />
      </mesh>

      {/* DISTANCE SCALE WINDOW */}
      <mesh position={[0, 0, lensParams.radius * 0.98]}>
        <boxGeometry args={[0.8, 0.2, 0.1]} />
        <meshStandardMaterial color="#081017" roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh position={[0, 0, lensParams.radius * 0.98 + 0.06]}>
        <planeGeometry args={[0.7, 0.12]} />
        <meshBasicMaterial color="#00f0ff" />
      </mesh>

      {/* BROAD MANUAL FOCUS RING WITH FINE RIBS */}
      <mesh position={[0, lensParams.length * 0.15, 0]} castShadow>
        <cylinderGeometry
          args={[lensParams.radius, lensParams.radius, lensParams.length * 0.45, 48]}
        />
        <meshStandardMaterial
          color="#0f1013"
          metalness={0.9}
          roughness={0.4}
          bumpMap={knurlingTex}
          bumpScale={0.1}
        />
      </mesh>

      {/* FRONT MAIN BARREL */}
      <mesh position={[0, lensParams.length * 0.4, 0]} castShadow>
        <cylinderGeometry
          args={[lensParams.radius * 1.05, lensParams.radius, lensParams.length * 0.2, 48]}
        />
        <meshStandardMaterial
          color="#181a1f"
          metalness={0.92}
          roughness={0.25}
          wireframe={wireframe}
        />
      </mesh>

      {/* ENGRAVED FRONT RIM BEZEL */}
      <mesh position={[0, lensParams.length / 2, 0]}>
        <cylinderGeometry
          args={[lensParams.radius * 1.06, lensParams.radius * 1.06, 0.15, 48, 1, true]}
        />
        <meshStandardMaterial color="#22252c" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* INTERNAL DYNAMIC APERTURE IRIS BLADES */}
      <group ref={bladesGroupRef} position={[0, -0.1, 0]}>
        {Array.from({ length: numBlades }).map((_, i) => {
          const angle = (i * Math.PI * 2) / numBlades;
          const bladeAngle = angle + (1 - apertureNormalized) * 0.35;
          const bx = Math.cos(angle) * irisRadius;
          const bz = Math.sin(angle) * irisRadius;

          return (
            <mesh
              key={i}
              position={[bx, 0, bz]}
              rotation={[Math.PI / 2, 0, bladeAngle]}
            >
              <planeGeometry args={[0.75, 0.28]} />
              <meshStandardMaterial
                color="#1b1c20"
                metalness={0.95}
                roughness={0.2}
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      </group>

      {/* MULTI-ELEMENT GLASS OPTICS (Visible through aperture & front) */}
      {/* Rear optical element */}
      <mesh position={[0, -lensParams.length * 0.25, 0]}>
        <cylinderGeometry args={[0.7, 0.7, 0.08, 32]} />
        <meshPhysicalMaterial
          color="#38bdf8"
          transmission={0.95}
          opacity={0.3}
          transparent
          roughness={0.02}
          ior={1.6}
        />
      </mesh>

      {/* Middle doublet optical element */}
      <mesh position={[0, lensParams.length * 0.1, 0]}>
        <cylinderGeometry args={[lensParams.radius * 0.8, lensParams.radius * 0.8, 0.12, 32]} />
        <meshPhysicalMaterial
          color="#e0f2fe"
          transmission={0.96}
          opacity={0.25}
          transparent
          roughness={0.01}
          ior={1.65}
        />
      </mesh>

      {/* Large Front Convex Aspherical Glass Element */}
      <mesh
        position={[0, lensParams.length / 2 - 0.15, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <sphereGeometry
          args={[
            lensParams.frontCurv,
            32,
            16,
            0,
            Math.PI * 2,
            0,
            Math.PI * 0.38,
          ]}
        />
        <meshPhysicalMaterial
          color="#0284c7"
          transmission={0.94}
          opacity={0.35}
          transparent
          roughness={0.02}
          ior={1.8}
          reflectivity={0.95}
          clearcoat={1}
          clearcoatRoughness={0.02}
        />
      </mesh>

      {/* Fluorite Anti-Reflective Coating Reflection Ring */}
      <mesh
        position={[0, lensParams.length / 2 - 0.08, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <ringGeometry
          args={[lensParams.radius * 0.5, lensParams.radius * 0.98, 48]}
        />
        <meshBasicMaterial
          color="#a855f7"
          opacity={0.25}
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
};
