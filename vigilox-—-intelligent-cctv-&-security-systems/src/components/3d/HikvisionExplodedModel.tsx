import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface HikvisionExplodedModelProps {
  explodeProgress: number; // 0 = fully assembled (Image 1), 1 = fully exploded (Image 2)
  selectedPartId: string | null;
  onSelectPart?: (partId: string) => void;
  showAnnotations?: boolean;
  screenFeedMode?: 'optical' | 'thermal' | 'telemetry';
  isButtonActive?: boolean;
}

export const HikvisionExplodedModel: React.FC<HikvisionExplodedModelProps> = ({
  explodeProgress,
  selectedPartId,
  onSelectPart,
  showAnnotations = true,
  screenFeedMode = 'optical',
  isButtonActive = false,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const rotaryRef = useRef<THREE.Mesh>(null);
  const antennaRef1 = useRef<THREE.Group>(null);
  const antennaRef2 = useRef<THREE.Group>(null);
  const antennaRef3 = useRef<THREE.Group>(null);

  // Dynamic canvas texture for the 3" touch display
  const screenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 384;
    const ctx = canvas.getContext('2d')!;

    // Initial draw
    ctx.fillStyle = '#06090e';
    ctx.fillRect(0, 0, 512, 384);

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    return { canvas, ctx, texture };
  }, []);

  // Frame loop for animated screen and smooth damping
  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle breathing rotation when assembled
    if (groupRef.current && explodeProgress < 0.05) {
      groupRef.current.position.y = Math.sin(t * 1.5) * 0.03;
    }

    // Rotate rotary dial knob slightly if active
    if (rotaryRef.current) {
      rotaryRef.current.rotation.y = Math.sin(t * 0.8) * 0.25;
    }

    // Update screen canvas texture in real-time
    const { ctx, canvas, texture } = screenTexture;
    ctx.fillStyle = screenFeedMode === 'thermal' ? '#180a24' : '#070c12';
    ctx.fillRect(0, 0, 512, 384);

    // Grid lines on screen
    ctx.strokeStyle = screenFeedMode === 'thermal' ? 'rgba(255, 60, 120, 0.25)' : 'rgba(0, 240, 255, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 512; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 384);
      ctx.stroke();
    }
    for (let y = 0; y < 384; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // Simulated CCTV surveillance object detection on screen
    const targetX = 256 + Math.sin(t * 1.2) * 80;
    const targetY = 192 + Math.cos(t * 0.9) * 40;

    ctx.strokeStyle = screenFeedMode === 'thermal' ? '#ff3b5c' : '#00f0ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(targetX - 45, targetY - 45, 90, 90);

    // Target label
    ctx.fillStyle = screenFeedMode === 'thermal' ? '#ff3b5c' : '#00f0ff';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('HIK-AI // PERSON 99.4%', targetX - 45, targetY - 52);

    // OSD Header
    ctx.fillStyle = '#ffffff';
    ctx.font = '13px monospace';
    ctx.fillText(`CAM-01 [REC]  ${new Date().toLocaleTimeString()}  60FPS`, 24, 32);
    ctx.fillStyle = '#00f0ff';
    ctx.fillText('HIKVISION ACUSENSE PRO // 4K 16.8 TOPS', 24, 52);

    // Reticle center
    ctx.beginPath();
    ctx.arc(256, 192, 12, 0, Math.PI * 2);
    ctx.stroke();

    texture.needsUpdate = true;
  });

  // Materials
  const materials = useMemo(() => {
    return {
      chassisMatte: new THREE.MeshStandardMaterial({
        color: '#0e1114',
        metalness: 0.85,
        roughness: 0.35,
      }),
      chassisInner: new THREE.MeshStandardMaterial({
        color: '#15191e',
        metalness: 0.9,
        roughness: 0.28,
      }),
      greenButton: new THREE.MeshStandardMaterial({
        color: '#34d399',
        emissive: '#10b981',
        emissiveIntensity: isButtonActive ? 0.9 : 0.35,
        roughness: 0.2,
      }),
      rotaryDial: new THREE.MeshStandardMaterial({
        color: '#1c2229',
        metalness: 0.92,
        roughness: 0.22,
      }),
      rotaryIconGlow: new THREE.MeshStandardMaterial({
        color: '#34d399',
        emissive: '#34d399',
        emissiveIntensity: 0.8,
      }),
      pcbSubstrate: new THREE.MeshStandardMaterial({
        color: '#11181f',
        roughness: 0.6,
        metalness: 0.4,
      }),
      goldBrass: new THREE.MeshStandardMaterial({
        color: '#d4af37',
        metalness: 0.95,
        roughness: 0.2,
      }),
      antennaRubber: new THREE.MeshStandardMaterial({
        color: '#1a1f24',
        roughness: 0.5,
        metalness: 0.3,
      }),
      heatsinkBlack: new THREE.MeshStandardMaterial({
        color: '#12161b',
        metalness: 0.9,
        roughness: 0.25,
      }),
      shieldCanSilver: new THREE.MeshStandardMaterial({
        color: '#d1d5db',
        metalness: 0.98,
        roughness: 0.15,
      }),
      batteryPouch: new THREE.MeshStandardMaterial({
        color: '#e5e7eb',
        roughness: 0.4,
        metalness: 0.3,
      }),
      batteryTapeGold: new THREE.MeshStandardMaterial({
        color: '#c09825',
        metalness: 0.6,
        roughness: 0.4,
      }),
      gpioPlasticGrey: new THREE.MeshStandardMaterial({
        color: '#6b7280',
        roughness: 0.6,
        metalness: 0.1,
      }),
      standoffHex: new THREE.MeshStandardMaterial({
        color: '#4b5563',
        metalness: 0.9,
        roughness: 0.2,
      }),
      lcdGlass: new THREE.MeshStandardMaterial({
        map: screenTexture.texture,
        roughness: 0.1,
        metalness: 0.05,
      }),
      highlightRing: new THREE.MeshBasicMaterial({
        color: '#00f0ff',
        wireframe: true,
      }),
    };
  }, [screenTexture, isButtonActive]);

  // LAYER OFFSETS CALCULATION BASED ON `explodeProgress`
  // Total vertical explosion travel multiplier
  const e = explodeProgress;

  const topShellY = 0.45 + e * 1.6;
  const buttonY = 0.65 + e * 2.2;
  const displayY = 0.4 + e * 1.05;
  const mainboardY = 0.15 + e * 0.45;
  const gpioBoardY = -0.12 - e * 0.35;
  const batteryY = -0.32 - e * 0.9;
  const bottomShellY = -0.45 - e * 1.6;

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0.45, -0.65, 0]}>
      {/* ========================================================================= */}
      {/* 1. TOP HOUSING CHASSIS (CNC Matte Black Aluminum)                          */}
      {/* ========================================================================= */}
      <group
        position={[0, topShellY, 0]}
        onClick={(ev) => {
          ev.stopPropagation();
          onSelectPart?.('top-shell');
        }}
      >
        {/* Main top plate frame with center screen cutout */}
        {/* Left bezel */}
        <mesh position={[-1.0, 0, 0]} material={materials.chassisMatte}>
          <boxGeometry args={[0.5, 0.28, 2.0]} />
        </mesh>
        {/* Right bezel */}
        <mesh position={[1.0, 0, 0]} material={materials.chassisMatte}>
          <boxGeometry args={[0.5, 0.28, 2.0]} />
        </mesh>
        {/* Rear bezel */}
        <mesh position={[0, 0, -0.8]} material={materials.chassisMatte}>
          <boxGeometry args={[1.5, 0.28, 0.4]} />
        </mesh>
        {/* Front bezel */}
        <mesh position={[0, 0, 0.8]} material={materials.chassisMatte}>
          <boxGeometry args={[1.5, 0.28, 0.4]} />
        </mesh>

        {/* Chamfered outer rim walls */}
        <mesh position={[0, -0.14, 0]} material={materials.chassisInner}>
          <boxGeometry args={[2.52, 0.04, 2.02]} />
        </mesh>

        {/* USB-C slot cutout detail on front */}
        <mesh position={[-0.4, -0.05, 1.01]}>
          <boxGeometry args={[0.22, 0.06, 0.02]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} />
        </mesh>

        {/* Side GPIO expansion access slot on right side (as seen in Image 1) */}
        <mesh position={[1.26, -0.05, 0.2]}>
          <boxGeometry args={[0.02, 0.12, 0.7]} />
          <meshStandardMaterial color="#1a1f26" />
        </mesh>

        {selectedPartId === 'top-shell' && (
          <mesh>
            <boxGeometry args={[2.6, 0.35, 2.1]} />
            <primitive object={materials.highlightRing} />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 2. TACTILE CONTROLS: GREEN BUTTON & ROTARY DIAL (Image 1 & 2)              */}
      {/* ========================================================================= */}
      <group position={[0, buttonY, 0]}>
        {/* Green Tactical Push Button (Front-Left) */}
        <group
          position={[-0.85, 0, 0.65]}
          onClick={(ev) => {
            ev.stopPropagation();
            onSelectPart?.('tactile-controls');
          }}
        >
          {/* Button Stem */}
          <mesh position={[0, -0.1, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.2, 24]} />
            <meshStandardMaterial color="#161b22" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Button Flanged Cap */}
          <mesh position={[0, 0.05, 0]} material={materials.greenButton}>
            <cylinderGeometry args={[0.18, 0.14, 0.12, 32]} />
          </mesh>

          {/* 3D Label Callout Line in exploded state */}
          {showAnnotations && e > 0.4 && (
            <Html position={[-0.8, 0.2, 0]} center distanceFactor={8}>
              <div className="flex items-center gap-2 pointer-events-none select-none">
                <div className="font-mono text-[11px] font-bold tracking-wider text-emerald-400 bg-black/85 px-2.5 py-1 border border-emerald-400/50 shadow-md whitespace-nowrap">
                  TACTILE JOYSTICK & BUTTON
                </div>
                <div className="w-12 h-[1px] bg-emerald-400" />
              </div>
            </Html>
          )}
        </group>

        {/* Rotary Dial Encoder / Power Knob (Front-Right) */}
        <group
          position={[0.75, 0, 0.65]}
          onClick={(ev) => {
            ev.stopPropagation();
            onSelectPart?.('tactile-controls');
          }}
        >
          {/* Knob Body with knurling */}
          <mesh ref={rotaryRef} position={[0, 0, 0]} material={materials.rotaryDial}>
            <cylinderGeometry args={[0.18, 0.18, 0.24, 32]} />
          </mesh>
          {/* Green Return/Power Icon ring on top */}
          <mesh position={[0, 0.125, 0]} rotation={[-Math.PI / 2, 0, 0]} material={materials.rotaryIconGlow}>
            <ringGeometry args={[0.07, 0.11, 24, 1, 0, Math.PI * 1.6]} />
          </mesh>
          {/* Center arrow notch */}
          <mesh position={[0.07, 0.125, 0.05]} material={materials.rotaryIconGlow}>
            <boxGeometry args={[0.04, 0.01, 0.04]} />
          </mesh>
        </group>
      </group>

      {/* ========================================================================= */}
      {/* 3. 3" ULTRA-BRIGHT TOUCH DISPLAY MODULE (Image 2)                           */}
      {/* ========================================================================= */}
      <group
        position={[0, displayY, 0]}
        onClick={(ev) => {
          ev.stopPropagation();
          onSelectPart?.('display');
        }}
      >
        {/* LCD Active Screen Face with Live Video / AI HUD */}
        <mesh position={[0, 0.02, -0.05]} rotation={[-Math.PI / 2, 0, 0]} material={materials.lcdGlass}>
          <planeGeometry args={[1.52, 1.2]} />
        </mesh>

        {/* Screen Bezel & Backplate */}
        <mesh position={[0, 0, -0.05]} material={materials.shieldCanSilver}>
          <boxGeometry args={[1.58, 0.03, 1.26]} />
        </mesh>

        {/* FPC Ribbon Cable trailing down */}
        <mesh position={[-0.4, -0.06, -0.55]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.55, 0.01, 0.4]} />
          <meshStandardMaterial color="#d4a373" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Callout Line for Display */}
        {showAnnotations && e > 0.4 && (
          <Html position={[-1.6, 0.1, -0.2]} center distanceFactor={8}>
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <div className="font-mono text-[11px] font-bold tracking-wider text-[#00f0ff] bg-black/85 px-2.5 py-1 border border-[#00f0ff]/50 shadow-md whitespace-nowrap">
                3" TOUCH DISPLAY
              </div>
              <div className="w-14 h-[1px] bg-[#00f0ff]" />
            </div>
          </Html>
        )}

        {selectedPartId === 'display' && (
          <mesh position={[0, 0, -0.05]}>
            <boxGeometry args={[1.65, 0.08, 1.35]} />
            <primitive object={materials.highlightRing} />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 4. MAINBOARD PCB & ANTENNAS (Neural Compute, RF Shields & 3 SMA Antennas) */}
      {/* ========================================================================= */}
      <group
        position={[0, mainboardY, 0]}
        onClick={(ev) => {
          ev.stopPropagation();
          onSelectPart?.('mainboard');
        }}
      >
        {/* Main Motherboard PCB */}
        <mesh position={[0, 0, 0]} material={materials.pcbSubstrate}>
          <boxGeometry args={[2.3, 0.04, 1.8]} />
        </mesh>

        {/* Center Neural Processor Aluminum Heatsink with Fins */}
        <group position={[0, 0.08, 0]}>
          {/* Heatsink Base */}
          <mesh material={materials.heatsinkBlack}>
            <boxGeometry args={[0.65, 0.06, 0.65]} />
          </mesh>
          {/* Cooling Fins */}
          {[-0.24, -0.16, -0.08, 0, 0.08, 0.16, 0.24].map((xOffset, i) => (
            <mesh key={i} position={[xOffset, 0.06, 0]} material={materials.heatsinkBlack}>
              <boxGeometry args={[0.03, 0.08, 0.62]} />
            </mesh>
          ))}
        </group>

        {/* Silver RF Shielding Can (Wi-Fi 6E / Sub-6 5G Modem) */}
        <mesh position={[0.65, 0.06, -0.1]} material={materials.shieldCanSilver}>
          <boxGeometry args={[0.5, 0.08, 0.5]} />
        </mesh>

        {/* Microchip ICs & Capacitors */}
        <mesh position={[-0.65, 0.04, -0.1]}>
          <boxGeometry args={[0.35, 0.04, 0.35]} />
          <meshStandardMaterial color="#222" metalness={0.7} roughness={0.4} />
        </mesh>
        {/* SMD components rows */}
        <mesh position={[-0.4, 0.03, 0.4]}>
          <boxGeometry args={[0.4, 0.03, 0.12]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* 3x GOLD BRASS SMA ANTENNA BULKHEAD CONNECTORS & ANTENNAS (protruding back) */}
        {[-0.6, 0.0, 0.6].map((xPos, idx) => (
          <group key={idx} position={[xPos, 0.02, -0.9]}>
            {/* Hexagonal Brass SMA Mount */}
            <mesh rotation={[Math.PI / 2, 0, 0]} material={materials.goldBrass}>
              <cylinderGeometry args={[0.12, 0.12, 0.2, 6]} />
            </mesh>
            {/* Knurled Connector Collar */}
            <mesh position={[0, 0, -0.15]} rotation={[Math.PI / 2, 0, 0]} material={materials.goldBrass}>
              <cylinderGeometry args={[0.1, 0.1, 0.14, 24]} />
            </mesh>
            {/* Articulated Antenna Knuckle joint */}
            <mesh position={[0, 0, -0.26]} rotation={[Math.PI / 2, 0, 0]} material={materials.antennaRubber}>
              <cylinderGeometry args={[0.11, 0.11, 0.1, 24]} />
            </mesh>
            {/* Black High-Gain Rubber Duck Dipole Antenna Barrel */}
            <mesh position={[0, 0, -0.9]} rotation={[Math.PI / 2, 0, 0]} material={materials.antennaRubber}>
              <cylinderGeometry args={[0.09, 0.09, 1.2, 24]} />
            </mesh>
            {/* Antenna Rounded Tip */}
            <mesh position={[0, 0, -1.5]} material={materials.antennaRubber}>
              <sphereGeometry args={[0.09, 16, 16]} />
            </mesh>
          </group>
        ))}

        {/* Callout Line for Antennas */}
        {showAnnotations && e > 0.4 && (
          <Html position={[1.4, 0.1, -1.1]} center distanceFactor={8}>
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <div className="w-14 h-[1px] bg-[#00f0ff]" />
              <div className="font-mono text-[11px] font-bold tracking-wider text-[#00f0ff] bg-black/85 px-2.5 py-1 border border-[#00f0ff]/50 shadow-md whitespace-nowrap">
                INTERCHANGEABLE SMA ANTENNAS
              </div>
            </div>
          </Html>
        )}

        {selectedPartId === 'mainboard' && (
          <mesh position={[0, 0.04, 0]}>
            <boxGeometry args={[2.4, 0.2, 1.9]} />
            <primitive object={materials.highlightRing} />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 5. CARRIER BOARD WITH EXPANDABLE GPIO & HIGH-SPEED M.2 SLOT (Image 2)     */}
      {/* ========================================================================= */}
      <group
        position={[0, gpioBoardY, 0]}
        onClick={(ev) => {
          ev.stopPropagation();
          onSelectPart?.('carrier-board');
        }}
      >
        {/* Carrier PCB */}
        <mesh material={materials.pcbSubstrate}>
          <boxGeometry args={[2.2, 0.04, 1.7]} />
        </mesh>

        {/* Industrial Dual-Row 16-Pin Angled GPIO Terminal (Grey connector from images) */}
        <group position={[0.65, 0.08, 0.2]}>
          <mesh material={materials.gpioPlasticGrey}>
            <boxGeometry args={[0.22, 0.14, 0.72]} />
          </mesh>
          {/* Socket holes */}
          {Array.from({ length: 8 }).map((_, i) => (
            <mesh key={i} position={[0.11, 0, -0.28 + i * 0.08]}>
              <boxGeometry args={[0.01, 0.04, 0.04]} />
              <meshStandardMaterial color="#111" />
            </mesh>
          ))}
        </group>

        {/* Callout Line for Expandable GPIO */}
        {showAnnotations && e > 0.4 && (
          <Html position={[1.4, 0.1, 0.2]} center distanceFactor={8}>
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <div className="w-14 h-[1px] bg-[#00f0ff]" />
              <div className="font-mono text-[11px] font-bold tracking-wider text-[#00f0ff] bg-black/85 px-2.5 py-1 border border-[#00f0ff]/50 shadow-md whitespace-nowrap">
                EXPANDABLE GPIO
              </div>
            </div>
          </Html>
        )}

        {/* High-Speed M.2 NVMe Slot (Right behind battery) */}
        <group position={[-0.45, 0.04, -0.3]}>
          {/* M.2 Socket connector */}
          <mesh position={[0, 0, -0.35]}>
            <boxGeometry args={[0.4, 0.04, 0.08]} />
            <meshStandardMaterial color="#1f2937" metalness={0.8} />
          </mesh>
          {/* M.2 SSD Card (Gold contacts, green PCB) */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.34, 0.02, 0.65]} />
            <meshStandardMaterial color="#14532d" roughness={0.4} />
          </mesh>
          {/* M.2 Standoff Screw */}
          <mesh position={[0, 0.03, 0.34]}>
            <cylinderGeometry args={[0.04, 0.04, 0.04, 16]} />
            <meshStandardMaterial color="#d1d5db" metalness={0.95} />
          </mesh>
        </group>

        {/* Callout Line for M.2 Slot */}
        {showAnnotations && e > 0.4 && (
          <Html position={[1.4, -0.1, -0.4]} center distanceFactor={8}>
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <div className="w-14 h-[1px] bg-[#00f0ff]" />
              <div className="font-mono text-[11px] font-bold tracking-wider text-[#00f0ff] bg-black/85 px-2.5 py-1 border border-[#00f0ff]/50 shadow-md whitespace-nowrap">
                HIGH-SPEED M.2 SLOT
              </div>
            </div>
          </Html>
        )}

        {selectedPartId === 'carrier-board' && (
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[2.3, 0.16, 1.8]} />
            <primitive object={materials.highlightRing} />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 6. HIGH-CAPACITY BATTERY PACK (Image 2)                                   */}
      {/* ========================================================================= */}
      <group
        position={[0, batteryY, 0]}
        onClick={(ev) => {
          ev.stopPropagation();
          onSelectPart?.('battery');
        }}
      >
        {/* Silver/White Li-ion Battery Pouch */}
        <mesh material={materials.batteryPouch}>
          <boxGeometry args={[1.6, 0.12, 1.1]} />
        </mesh>
        {/* Gold Kapton Insulating Tape on Edges */}
        <mesh position={[0.78, 0, 0]} material={materials.batteryTapeGold}>
          <boxGeometry args={[0.05, 0.125, 1.05]} />
        </mesh>
        <mesh position={[-0.78, 0, 0]} material={materials.batteryTapeGold}>
          <boxGeometry args={[0.05, 0.125, 1.05]} />
        </mesh>

        {/* Battery Telemetry Specification Markings */}
        <mesh position={[0, 0.065, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 0.7]} />
          <meshStandardMaterial color="#ffffff" roughness={0.8} />
        </mesh>

        {/* Callout Line for Battery */}
        {showAnnotations && e > 0.4 && (
          <Html position={[-1.5, 0.0, 0]} center distanceFactor={8}>
            <div className="flex items-center gap-2 pointer-events-none select-none">
              <div className="font-mono text-[11px] font-bold tracking-wider text-[#00f0ff] bg-black/85 px-2.5 py-1 border border-[#00f0ff]/50 shadow-md whitespace-nowrap">
                HIGH-CAPACITY BATTERY
              </div>
              <div className="w-14 h-[1px] bg-[#00f0ff]" />
            </div>
          </Html>
        )}

        {selectedPartId === 'battery' && (
          <mesh>
            <boxGeometry args={[1.7, 0.16, 1.2]} />
            <primitive object={materials.highlightRing} />
          </mesh>
        )}
      </group>

      {/* ========================================================================= */}
      {/* 7. HARDWARE CORNER STANDOFFS / STRUCTURAL SCREWS                           */}
      {/* ========================================================================= */}
      {[
        [-1.05, -0.75],
        [1.05, -0.75],
        [-1.05, 0.75],
        [1.05, 0.75],
      ].map(([x, z], i) => (
        <group key={i} position={[x, (topShellY + bottomShellY) / 2, z]}>
          {/* Standoff rod stretching along explosion height */}
          <mesh material={materials.standoffHex}>
            <cylinderGeometry args={[0.04, 0.04, Math.max(0.2, (topShellY - bottomShellY) * 0.85), 16]} />
          </mesh>
          {/* Top and bottom screw heads */}
          <mesh position={[0, (topShellY - bottomShellY) * 0.42, 0]} material={materials.standoffHex}>
            <cylinderGeometry args={[0.07, 0.07, 0.03, 16]} />
          </mesh>
          <mesh position={[0, -(topShellY - bottomShellY) * 0.42, 0]} material={materials.standoffHex}>
            <cylinderGeometry args={[0.07, 0.07, 0.03, 16]} />
          </mesh>
        </group>
      ))}

      {/* ========================================================================= */}
      {/* 8. BOTTOM HOUSING CHASSIS ENCLOSURE                                       */}
      {/* ========================================================================= */}
      <group
        position={[0, bottomShellY, 0]}
        onClick={(ev) => {
          ev.stopPropagation();
          onSelectPart?.('bottom-shell');
        }}
      >
        {/* Bottom Tub Chassis Box */}
        <mesh position={[0, 0, 0]} material={materials.chassisMatte}>
          <boxGeometry args={[2.5, 0.32, 2.0]} />
        </mesh>

        {/* Hollowed inside floor */}
        <mesh position={[0, 0.12, 0]} material={materials.chassisInner}>
          <boxGeometry args={[2.32, 0.1, 1.82]} />
        </mesh>

        {/* 4 Rubberized Non-Slip Base Feet */}
        {[
          [-0.95, -0.75],
          [0.95, -0.75],
          [-0.95, 0.75],
          [0.95, 0.75],
        ].map(([x, z], i) => (
          <mesh key={i} position={[x, -0.18, z]} material={materials.antennaRubber}>
            <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
          </mesh>
        ))}

        {/* Laser-etched Serial & Regulatory Compliance Matrix on Base */}
        <mesh position={[0, -0.165, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial color="#1a222a" roughness={0.9} />
        </mesh>

        {selectedPartId === 'bottom-shell' && (
          <mesh>
            <boxGeometry args={[2.6, 0.4, 2.1]} />
            <primitive object={materials.highlightRing} />
          </mesh>
        )}
      </group>
    </group>
  );
};
