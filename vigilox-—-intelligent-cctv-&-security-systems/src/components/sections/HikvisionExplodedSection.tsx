import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import {
  Layers,
  Play,
  Pause,
  RotateCw,
  Eye,
  Sliders,
  Radio,
  Cpu,
  BatteryCharging,
  Maximize2,
  Terminal,
  Activity,
  CheckCircle,
  Volume2,
  VolumeX,
  Compass,
} from 'lucide-react';
import { HikvisionExplodedModel } from '../3d/HikvisionExplodedModel';
import { VigiloxStudioEnvironment } from '../3d/VigiloxStudioEnvironment';
import { useIntersection } from '../../hooks/useIntersection';
import { useQuality } from '../../hooks/useQuality';

interface ComponentDetail {
  id: string;
  name: string;
  category: string;
  highlight: string;
  specs: { label: string; value: string }[];
  description: string;
}

const COMPONENTS_DATA: Record<string, ComponentDetail> = {
  'display': {
    id: 'display',
    name: '3" ULTRA-BRIGHT CAPACITIVE TOUCH DISPLAY',
    category: 'TACTICAL OPERATOR INTERFACE',
    highlight: '1200 Nits Direct-Sunlight Sunlight Readable Glass',
    specs: [
      { label: 'RESOLUTION', value: '800 x 480 RGB IPS' },
      { label: 'BRIGHTNESS', value: '1,200 cd/m² Optical Bonded' },
      { label: 'REFRESH RATE', value: '60 Hz Zero-Tear' },
      { label: 'TOUCH MATRIX', value: 'Multi-Touch Wet & Glove Capable' },
    ],
    description:
      'Optically bonded Gorilla Glass 5 touchscreen providing zero-latency video playback from edge CCTV streams, Hikvision AcuSense target overlays, and on-site PTZ telemetry routing.',
  },
  'tactile-controls': {
    id: 'tactile-controls',
    name: 'TACTILE JOYSTICK & MIL-SPEC ROTARY DIAL',
    category: 'ERGONOMIC FIELD CONTROL',
    highlight: 'Instant Emergency Duress & Menu Navigation',
    specs: [
      { label: 'GREEN BUTTON', value: 'Tactical IP68 Momentary Push' },
      { label: 'ROTARY ENCODER', value: '24-Detent Optical Encoder + Click' },
      { label: 'MTBF LIFETIME', value: '1,000,000 Action Cycles' },
      { label: 'STATUS BACKLIGHT', value: 'Active Phosphor Micro-LED' },
    ],
    description:
      'Glove-friendly physical interface engineered for rapid field deployment. The high-visibility green button executes immediate site lockdown or silent distress signaling, while the knurled dial allows single-handed camera switching.',
  },
  'mainboard': {
    id: 'mainboard',
    name: 'EDGE NEURAL PROCESSING MOTHERBOARD',
    category: 'COMPUTE & RF MATRIX',
    highlight: 'Dual Hexa-Core NPU with 16.8 TOPS Hardware Acceleration',
    specs: [
      { label: 'NPU INFERENCE', value: '16.8 TOPS INT8 / FP16' },
      { label: 'MEMORY', value: '16 GB LPDDR5 ECC' },
      { label: 'WIRELESS', value: 'Wi-Fi 6E + Bluetooth 5.3 Mesh' },
      { label: 'CRYPTO ENGINE', value: 'FIPS 140-3 Hardware Root-of-Trust' },
    ],
    description:
      'Black aerospace-grade PCB mounting a heavy extruded aluminum heatsink. Autonomously processes concurrent 4K surveillance video, face biometric hashing, and vehicle license plate recognition without external cloud reliance.',
  },
  'antennas': {
    id: 'antennas',
    name: '3x INTERCHANGEABLE GOLD SMA ANTENNAS',
    category: 'HIGH-GAIN MIMO COMMUNICATIONS',
    highlight: 'Ultra-Long Range 5G Sub-6 & Mesh Relay',
    specs: [
      { label: 'FREQUENCY BANDS', value: '600 MHz – 6.0 GHz Multi-Band' },
      { label: 'GAIN', value: '+5.5 dBi Omnidirectional Dipole' },
      { label: 'CONNECTORS', value: 'Gold-Plated Brass SMA Female' },
      { label: 'LINK RANGE', value: 'Up to 4.8 km Line-of-Sight' },
    ],
    description:
      'Triple articulated dipole antennas supporting 3x3 MIMO spatial diversity. Allows the tactical CCTV node to operate as an ad-hoc mesh repeater in austere environments lacking cellular tower coverage.',
  },
  'carrier-board': {
    id: 'carrier-board',
    name: 'EXPANDABLE INDUSTRIAL GPIO & HIGH-SPEED M.2',
    category: 'PERIPHERAL & STORAGE EXPANSION',
    highlight: 'Modular NVMe Forensics & Dry-Contact Relay I/O',
    specs: [
      { label: 'GPIO HEADER', value: '16-Pin Angled 3.3V/5V/Relay Bus' },
      { label: 'M.2 SLOT', value: 'PCIe 4.0 x4 Key-M (Up to 4TB SSD)' },
      { label: 'PROTOCOLS', value: 'RS-485, Wiegand, CAN 2.0B, I2C' },
      { label: 'ISOLATION', value: '2.5 kV Galvanic Protection' },
    ],
    description:
      'Secondary carrier board featuring an angled industrial GPIO header for direct hardwiring into facility perimeter tripwires, automated gate solenoids, and external acoustic sensors, with an M.2 slot for forensic tamper-proof video archiving.',
  },
  'battery': {
    id: 'battery',
    name: 'HIGH-CAPACITY LiFePO4 BATTERY MODULE',
    category: 'TACTICAL POWER AUTONOMY',
    highlight: '24-Hour Continuous Untethered Field Operations',
    specs: [
      { label: 'CAPACITY', value: '14,800 mAh / 54.7 Wh' },
      { label: 'CHEMISTRY', value: 'Lithium Iron Phosphate (LiFePO4)' },
      { label: 'CYCLE LIFE', value: '> 3,500 Cycles to 80% Capacity' },
      { label: 'OPERATING TEMP', value: '-30°C to +65°C Extreme Thermal' },
    ],
    description:
      'Thermally shielded flat-cell battery pack with Kapton insulation barriers and integrated battery management system (BMS). Provides continuous power to onboard compute, display, and cellular transmitters during grid blackouts.',
  },
  'top-shell': {
    id: 'top-shell',
    name: 'MONOLITHIC CNC ANODIZED TOP ENCLOSURE',
    category: 'AEROSPACE CHASSIS',
    highlight: 'Milled from 6061-T6 Aircraft Aluminum Billet',
    specs: [
      { label: 'MATERIAL', value: '6061-T6 Monolithic Aluminum' },
      { label: 'FINISH', value: 'Mil-A-8625 Type III Hardcoat Anodizing' },
      { label: 'SEALING', value: 'IP67 Ingress & Chemical Resistant' },
      { label: 'IMPACT', value: 'IK10 Sledgehammer Kinetic Strike' },
    ],
    description:
      'Precision machined top chassis with chamfered ergonomics, cutouts for tactile controls, and high-tolerance O-ring perimeter sealing against heavy rain, dust, and explosive atmospheres.',
  },
  'bottom-shell': {
    id: 'bottom-shell',
    name: 'PRECISION CNC BOTTOM ENCLOSURE & STANDOFFS',
    category: 'STRUCTURAL HEAT SINK & MOUNTING',
    highlight: 'Integrated Thermal Dissipation & Rubber Shock Isolators',
    specs: [
      { label: 'FASTENERS', value: 'Stainless Steel Torx Standoffs' },
      { label: 'FEET', value: 'High-Friction Nitrile Rubber Dampers' },
      { label: 'COOLING', value: 'Passive Structural Thermal Conduction' },
      { label: 'COMPLIANCE', value: 'NDAA Section 889 / TAA' },
    ],
    description:
      'Houses internal grounding planes, thermal gap pads, and heavy-duty corner standoffs that mechanically secure the modular multi-board stack under high vibrational shock.',
  },
};

export const HikvisionExplodedSection: React.FC = () => {
  const [containerRef, isVisible] = useIntersection<HTMLDivElement>({ threshold: 0.1 });
  const { tier, pixelRatio } = useQuality();

  const [explodeProgress, setExplodeProgress] = useState(0.85); // start nicely exploded like Image 2!
  const [isAutoAnimating, setIsAutoAnimating] = useState(false);
  const [selectedPartId, setSelectedPartId] = useState<string>('display');
  const [screenFeedMode, setScreenFeedMode] = useState<'optical' | 'thermal' | 'telemetry'>('optical');
  const [isButtonActive, setIsButtonActive] = useState(false);
  const [showAnnotations, setShowAnnotations] = useState(true);

  // Auto-explosion breathing loop
  useEffect(() => {
    if (!isAutoAnimating) return;

    let forward = true;
    const interval = setInterval(() => {
      setExplodeProgress((prev) => {
        if (forward) {
          if (prev >= 0.95) {
            forward = false;
            return 0.95;
          }
          return Math.min(0.95, prev + 0.015);
        } else {
          if (prev <= 0.05) {
            forward = true;
            return 0.05;
          }
          return Math.max(0.05, prev - 0.015);
        }
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isAutoAnimating]);

  const activePart = COMPONENTS_DATA[selectedPartId] || COMPONENTS_DATA['display'];

  return (
    <section
      ref={containerRef}
      id="hikvision-node"
      className="relative w-full min-h-screen bg-[#050607] text-[#F4F6F7] py-24 border-t border-white/8 overflow-hidden"
    >
      {/* Background Cybernetic Blueprint Security Grid */}
      <div className="absolute inset-0 bg-security-grid opacity-25 pointer-events-none" />

      {/* Large subtle background typography like in Image 1 */}
      <div className="absolute top-1/3 left-0 right-0 -translate-y-1/2 flex justify-center pointer-events-none select-none opacity-5 overflow-hidden">
        <span className="text-[18vw] font-display font-black tracking-tighter text-white whitespace-nowrap">
          HIKVISION
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-white/8 gap-4">
          <div>
            <div className="text-xs font-mono text-[#00f0ff] tracking-widest uppercase mb-1.5 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
              01-B // TACTICAL SURVEILLANCE HARDWARE ANATOMY
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold uppercase text-white tracking-tight">
              HIKVISION EDGE NODE.
            </h2>
          </div>
          <p className="text-sm font-mono text-[#9EA4A8] max-w-md">
            Interactive animated 3D exploded disassembly. Slide between the fully enclosed portable field node and layer-by-layer internal aerospace components.
          </p>
        </div>

        {/* Interactive Master Toolbar: Presets & Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-[#0a0d12]/90 border border-white/10 rounded-sm mb-6 font-mono text-xs backdrop-blur-md">
          {/* Quick Exploded Presets */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[#9EA4A8] text-[11px] uppercase mr-1">STATE:</span>
            <button
              type="button"
              onClick={() => {
                setIsAutoAnimating(false);
                setExplodeProgress(0);
              }}
              className={`px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
                explodeProgress < 0.1
                  ? 'bg-[#00f0ff] text-black font-bold border-[#00f0ff]'
                  : 'bg-[#101419] border-white/10 text-[#9EA4A8] hover:text-white'
              }`}
            >
              ASSEMBLED (IMAGE 1)
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAutoAnimating(false);
                setExplodeProgress(0.5);
              }}
              className={`px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
                explodeProgress >= 0.4 && explodeProgress <= 0.6
                  ? 'bg-[#00f0ff] text-black font-bold border-[#00f0ff]'
                  : 'bg-[#101419] border-white/10 text-[#9EA4A8] hover:text-white'
              }`}
            >
              50% EXPANDED
            </button>
            <button
              type="button"
              onClick={() => {
                setIsAutoAnimating(false);
                setExplodeProgress(0.95);
              }}
              className={`px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
                explodeProgress > 0.8
                  ? 'bg-[#00f0ff] text-black font-bold border-[#00f0ff]'
                  : 'bg-[#101419] border-white/10 text-[#9EA4A8] hover:text-white'
              }`}
            >
              FULLY EXPLODED (IMAGE 2)
            </button>
          </div>

          {/* Auto-Animate & Annotation Toggles */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsAutoAnimating(!isAutoAnimating)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
                isAutoAnimating
                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                  : 'bg-[#101419] border-white/10 text-[#9EA4A8] hover:text-white'
              }`}
            >
              {isAutoAnimating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoAnimating ? 'PAUSE ANIMATION' : 'AUTO-EXPLODE LOOP'}</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAnnotations(!showAnnotations)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-sm border transition-all cursor-pointer ${
                showAnnotations
                  ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-[#00f0ff]'
                  : 'bg-[#101419] border-white/10 text-[#9EA4A8] hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{showAnnotations ? 'CALLOUTS ON' : 'CALLOUTS OFF'}</span>
            </button>
          </div>
        </div>

        {/* Main 3D Canvas Stage */}
        <div className="relative w-full h-[620px] rounded-sm bg-[#07090c] border border-white/10 overflow-hidden shadow-2xl">
          {isVisible && (
            <Canvas
              dpr={pixelRatio}
              camera={{ position: [0, 2.2, 5.2], fov: 40 }}
              gl={{ antialias: tier === 'high' || tier === 'medium' }}
            >
              <Suspense fallback={null}>
                <VigiloxStudioEnvironment glowColor="#00f0ff" intensity={1.2} />
                <OrbitControls
                  enableZoom={true}
                  minDistance={2.8}
                  maxDistance={8.0}
                  autoRotate={false}
                  enablePan={false}
                />
                <HikvisionExplodedModel
                  explodeProgress={explodeProgress}
                  selectedPartId={selectedPartId}
                  onSelectPart={(partId) => setSelectedPartId(partId)}
                  showAnnotations={showAnnotations}
                  screenFeedMode={screenFeedMode}
                  isButtonActive={isButtonActive}
                />
              </Suspense>
            </Canvas>
          )}

          {/* Top Left OSD Live Status */}
          <div className="absolute top-4 left-4 z-20 font-mono text-xs bg-[#05080c]/85 border border-white/10 p-3 rounded-sm backdrop-blur-md space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-white font-bold">HIKVISION TACTICAL FIELD TERMINAL</span>
            </div>
            <div className="text-[11px] text-[#00f0ff]">
              EXPANSION RATIO: {Math.round(explodeProgress * 100)}% // 8 MODULAR LAYERS
            </div>
          </div>

          {/* Top Right Device Screen & Audio Controls */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2 font-mono text-xs">
            <button
              type="button"
              onClick={() => setIsButtonActive(!isButtonActive)}
              className={`px-3 py-1.5 rounded-sm border backdrop-blur-md transition-all cursor-pointer flex items-center gap-1.5 ${
                isButtonActive
                  ? 'bg-emerald-500 text-black font-bold border-emerald-400 shadow-[0_0_15px_#10b981]'
                  : 'bg-[#05080c]/80 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>{isButtonActive ? 'GREEN BUTTON DEPRESSED' : 'TRIGGER GREEN BUTTON'}</span>
            </button>

            <div className="flex bg-[#05080c]/80 border border-white/10 rounded-sm p-0.5 backdrop-blur-md">
              {(['optical', 'thermal'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setScreenFeedMode(m)}
                  className={`px-2 py-1 text-[10px] uppercase rounded-xs transition-colors cursor-pointer ${
                    screenFeedMode === m
                      ? 'bg-[#00f0ff] text-black font-bold'
                      : 'text-[#9EA4A8] hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Explosion Scrub Slider Control Overlay */}
          <div className="absolute bottom-4 left-4 right-4 z-20 bg-[#05080c]/90 border border-white/10 rounded-sm p-3.5 backdrop-blur-md font-mono text-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[#9EA4A8] flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>EXPLODED DISASSEMBLY PROGRESS:</span>
              </span>
              <span className="text-[#00f0ff] font-bold text-sm">
                {Math.round(explodeProgress * 100)}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={explodeProgress}
              onChange={(e) => {
                setIsAutoAnimating(false);
                setExplodeProgress(Number(e.target.value));
              }}
              className="w-full accent-[#00f0ff] cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-white/40 mt-1">
              <span>0% (FULLY ASSEMBLED CHASSIS)</span>
              <span>50% (EXPANDED STACK)</span>
              <span>100% (FULL ANATOMICAL SCHEMATIC)</span>
            </div>
          </div>
        </div>

        {/* Component Selector Tabs */}
        <div className="flex flex-wrap gap-2 my-6 font-mono text-xs">
          {Object.values(COMPONENTS_DATA).map((comp) => (
            <button
              key={comp.id}
              type="button"
              onClick={() => setSelectedPartId(comp.id)}
              className={`px-3 py-2 rounded-sm border transition-all cursor-pointer ${
                selectedPartId === comp.id
                  ? 'bg-[#00f0ff] text-black font-bold border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-[#0a0d12] border-white/10 text-[#9EA4A8] hover:border-white/30 hover:text-white'
              }`}
            >
              {comp.name.split(' ')[0]} {comp.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>

        {/* Selected Component Deep Dossier Card */}
        <div className="p-6 bg-[#0a0d12] border border-[#00f0ff]/40 rounded-sm font-mono shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-2 mb-4">
            <div>
              <div className="text-xs text-[#00f0ff] uppercase tracking-wider">{activePart.category}</div>
              <h3 className="text-xl sm:text-2xl font-display font-black text-white mt-0.5">
                {activePart.name}
              </h3>
            </div>
            <div className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 border border-emerald-500/30 rounded-xs self-start sm:self-auto">
              {activePart.highlight}
            </div>
          </div>

          <p className="text-xs text-[#9EA4A8] font-sans font-light leading-relaxed mb-6">
            {activePart.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {activePart.specs.map((s, idx) => (
              <div key={idx} className="p-3 bg-[#07090c] border border-white/5 rounded-sm">
                <span className="text-[10px] text-[#9EA4A8] block uppercase">{s.label}</span>
                <span className="text-white font-bold block mt-1 truncate">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
