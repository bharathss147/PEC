import React, { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GalleryItem } from '../../types';

interface SpatialGallery3DProps {
  items: GalleryItem[];
  onSelectItem: (item: GalleryItem) => void;
  activeCategory: string;
}

// Subcomponent for each floating photographic plane in 3D space
const FloatingImagePlane: React.FC<{
  item: GalleryItem;
  position: [number, number, number];
  rotation: [number, number, number];
  onSelect: (item: GalleryItem) => void;
}> = ({ item, position, rotation, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Load image texture with fallback
  const texture = useMemo(() => {
    const loader = new THREE.TextureLoader();
    const tex = loader.load(item.imageUrl);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [item.imageUrl]);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      // Gentle depth parallax floating
      meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.08;
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.1, 1.1, 1.1), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1.0, 1.0, 1.0), 0.1);
      }
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(item);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <planeGeometry args={[3.2, 2.0]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.2}
          metalness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Frame Border with subtle illumination on hover */}
      <mesh position={[0, 0, -0.02]}>
        <planeGeometry args={[3.3, 2.1]} />
        <meshBasicMaterial
          color={hovered ? '#00f0ff' : '#1e222b'}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Meta Tag Below Image in 3D */}
      <mesh position={[0, -1.2, 0.02]}>
        <planeGeometry args={[3.0, 0.2]} />
        <meshBasicMaterial color="#080a0f" opacity={0.8} transparent />
      </mesh>
    </group>
  );
};

export const SpatialGallery3D: React.FC<SpatialGallery3DProps> = ({
  items,
  onSelectItem,
}) => {
  const rootGroup = useRef<THREE.Group>(null);

  // Position items in a sweeping 3D curved spatial gallery at staggered depths
  const spatialPositions = useMemo(() => {
    return items.map((_, i) => {
      const angle = (i / (items.length - 1)) * Math.PI * 0.9 - Math.PI * 0.45;
      const radius = 9.5;
      const x = Math.sin(angle) * radius;
      const z = -Math.cos(angle) * radius + 5;
      const y = (i % 2 === 0 ? 0.6 : -0.6) + Math.sin(i * 1.5) * 0.4;
      const rotY = -angle * 0.75;
      return {
        pos: [x, y, z] as [number, number, number],
        rot: [0, rotY, 0] as [number, number, number],
      };
    });
  }, [items]);

  useFrame((state) => {
    if (rootGroup.current) {
      // Gentle mouse parallax on the gallery space
      const mx = (state.pointer.x * 0.6);
      const my = (state.pointer.y * 0.3);
      rootGroup.current.position.x = THREE.MathUtils.lerp(rootGroup.current.position.x, mx, 0.05);
      rootGroup.current.position.y = THREE.MathUtils.lerp(rootGroup.current.position.y, my, 0.05);
    }
  });

  return (
    <group ref={rootGroup}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 5, 8]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[0, -5, -4]} intensity={0.6} color="#00f0ff" />

      {items.map((item, index) => {
        const layout = spatialPositions[index] || {
          pos: [0, 0, 0],
          rot: [0, 0, 0],
        };
        return (
          <FloatingImagePlane
            key={item.id}
            item={item}
            position={layout.pos}
            rotation={layout.rot}
            onSelect={onSelectItem}
          />
        );
      })}
    </group>
  );
};
