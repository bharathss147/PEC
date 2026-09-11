import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { VigiloxCameraModel } from './VigiloxCameraModel';

interface PtzRadar3DProps {
  panAngle: number;
  tiltAngle: number;
  zoomLevel: number; // 1x to 40x
  isSweeping: boolean;
}

export const PtzRadar3D: React.FC<PtzRadar3DProps> = ({
  panAngle,
  tiltAngle,
  zoomLevel,
  isSweeping,
}) => {
  const radarGroupRef = useRef<THREE.Group>(null);
  const frustumMeshRef = useRef<THREE.Mesh>(null);
  const currentAngle = useRef(panAngle);

  // Optical field of view calculation based on zoom
  // at 1x: ~65 deg, at 40x: ~4 deg
  const fovDeg = useMemo(() => {
    return Math.max(3, 65 / Math.sqrt(zoomLevel));
  }, [zoomLevel]);

  // Procedural radar cone geometry
  const coneGeo = useMemo(() => {
    const radius = Math.tan(THREE.MathUtils.degToRad(fovDeg / 2)) * 6;
    return new THREE.ConeGeometry(radius, 6, 32, 1, true);
  }, [fovDeg]);

  useFrame((_, delta) => {
    if (isSweeping) {
      currentAngle.current = (currentAngle.current + delta * 45) % 360;
    } else {
      currentAngle.current = THREE.MathUtils.damp(currentAngle.current, panAngle, 5, delta);
    }

    if (radarGroupRef.current) {
      radarGroupRef.current.rotation.y = THREE.MathUtils.degToRad(currentAngle.current);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Central VIGILOX PTZ Camera */}
      <VigiloxCameraModel
        panAngle={0}
        tiltAngle={tiltAngle}
        interactiveFollow={false}
        scale={0.9}
        position={[0, 0.4, 0]}
      />

      {/* Synchronized Optical Sensor Cone & Radar Beam */}
      <group ref={radarGroupRef} position={[0, -0.3, 0]}>
        <group rotation={[THREE.MathUtils.degToRad(-tiltAngle) - Math.PI / 2, 0, 0]}>
          {/* Volumetric Optical Beam Cone */}
          <mesh
            ref={frustumMeshRef}
            geometry={coneGeo}
            position={[0, 3, 0]}
            rotation={[Math.PI, 0, 0]}
          >
            <meshBasicMaterial
              color="#00f0ff"
              transparent
              opacity={0.12}
              side={THREE.DoubleSide}
              depthWrite={false}
            />
          </mesh>

          {/* Wireframe Perimeter Edges */}
          <lineSegments position={[0, 3, 0]} rotation={[Math.PI, 0, 0]}>
            <edgesGeometry args={[coneGeo]} />
            <lineBasicMaterial color="#00f0ff" transparent opacity={0.35} />
          </lineSegments>

          {/* Central Laser Trajectory Line */}
          <line>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                args={[new Float32Array([0, 0, 0, 0, 6, 0]), 3]}
              />
            </bufferGeometry>
            <lineBasicMaterial color="#00f0ff" linewidth={2} />
          </line>

          {/* Target Impact Reticle at 6m focal plane */}
          <mesh position={[0, 6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.2, 0.25, 32]} />
            <meshBasicMaterial color="#00f0ff" transparent opacity={0.8} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>

      {/* Surrounding Ground Compass Ring & Target Markers */}
      <group position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        {/* Outer Perimeter Ring */}
        <mesh>
          <ringGeometry args={[4.2, 4.25, 64]} />
          <meshBasicMaterial color="rgba(255,255,255,0.08)" side={THREE.DoubleSide} />
        </mesh>
        {/* Mid Azimuth Ring */}
        <mesh>
          <ringGeometry args={[2.8, 2.83, 64]} />
          <meshBasicMaterial color="rgba(0, 240, 255, 0.15)" side={THREE.DoubleSide} />
        </mesh>

        {/* Compass Cardinal Points */}
        {[0, 90, 180, 270].map((deg, i) => {
          const rad = THREE.MathUtils.degToRad(deg);
          return (
            <mesh key={i} position={[Math.cos(rad) * 4.4, Math.sin(rad) * 4.4, 0]}>
              <circleGeometry args={[0.08, 16]} />
              <meshBasicMaterial color="#00f0ff" />
            </mesh>
          );
        })}

        {/* Security Zone Boundary Sectors */}
        {Array.from({ length: 12 }).map((_, i) => {
          const rad = (i / 12) * Math.PI * 2;
          return (
            <line key={i}>
              <bufferGeometry>
                <bufferAttribute
                  attach="attributes-position"
                  args={[
                    new Float32Array([
                      Math.cos(rad) * 2.8,
                      Math.sin(rad) * 2.8,
                      0,
                      Math.cos(rad) * 4.2,
                      Math.sin(rad) * 4.2,
                      0,
                    ]),
                    3,
                  ]}
                />
              </bufferGeometry>
              <lineBasicMaterial color="rgba(255,255,255,0.06)" />
            </line>
          );
        })}
      </group>
    </group>
  );
};
