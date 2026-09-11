import React from 'react';
import * as THREE from 'three';

interface VigiloxStudioEnvironmentProps {
  glowColor?: string;
  intensity?: number;
}

export const VigiloxStudioEnvironment: React.FC<VigiloxStudioEnvironmentProps> = ({
  glowColor = '#00f0ff',
  intensity = 1.0,
}) => {
  return (
    <>
      {/* Ambient Fill */}
      <ambientLight intensity={0.35 * intensity} color="#b4c0cb" />

      {/* Main Overhead Architectural Key Light */}
      <directionalLight
        position={[4, 8, 5]}
        intensity={1.8 * intensity}
        color="#ffffff"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />

      {/* Cool Graphite Side Fill */}
      <directionalLight
        position={[-6, 2, -4]}
        intensity={0.8 * intensity}
        color="#2c3742"
      />

      {/* Futuristic Electric Cyan Rim / Edge Backlight */}
      <pointLight
        position={[0, -2, -3]}
        intensity={2.5 * intensity}
        color={glowColor}
        distance={12}
      />

      {/* Soft Ground Floor Glow */}
      <pointLight
        position={[0, -2.5, 2]}
        intensity={0.6 * intensity}
        color="#00f0ff"
        distance={6}
      />

      {/* Deep Cyber Void Fog */}
      <fog attach="fog" args={['#050607', 8, 22]} />
    </>
  );
};
