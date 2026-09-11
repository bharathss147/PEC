import { VigiloxProduct, HotspotItem, SecurityEvent, CommandFeed, AiDetectionTarget } from '../types/vigilox';

export const VIGILOX_PRODUCTS: VigiloxProduct[] = [
  {
    id: 'core',
    name: 'VIGILOX CORE',
    tagline: 'Autonomous AI Dome with Dual-NPU Neural Tracking',
    category: 'FLAGSHIP COMMERCIAL',
    formFactor: 'Aerospace Cast Aluminum Dome',
    sensor: '1/1.2" Starlight Back-Illuminated CMOS',
    resolution: '4K Ultra HD (3840 × 2160) @ 60 FPS',
    opticalReach: '2.8mm - 12mm Motorized Optical Zoom',
    fov: '114° - 35° Ultra-Wide Variable',
    nightVision: 'Dual-Spectrum Starlight Color + 850nm Stealth IR (60m)',
    aiFeatures: ['Kinematic Skeleton Tracking', 'Multi-Class Edge Classification', 'Zero-Trust Encryption', 'Tamper Deflection'],
    weatherRating: 'IP67 Submersible & IK10 Vandal-Proof',
    price: 1890,
    description: 'Engineered as the definitive standard for corporate campuses, data centers, and critical infrastructure. Houses twin neural processing units capable of executing 32 simultaneous deep learning inferences per video frame.',
    specs: [
      { label: 'Sensor Array', value: '1/1.2" Back-Illuminated Sony Starvis 2' },
      { label: 'Max Resolution', value: '4K (3840 × 2160) @ 60 FPS' },
      { label: 'Dynamic Range', value: '144 dB Super WDR' },
      { label: 'Optical Zoom', value: '4.3x Precision Motorized' },
      { label: 'AI Compute', value: '16.8 TOPS Dual Hexa-Core NPU' },
      { label: 'Enclosure', value: 'Hard-anodized billet aluminum (IK10 rated)' },
      { label: 'Operating Temp', value: '-40°C to +65°C (-40°F to 149°F)' },
      { label: 'Connectivity', value: 'PoE++ (802.3bt), Fiber SFP+, Dual 1GbE' }
    ]
  },
  {
    id: 'ptz',
    name: 'VIGILOX PTZ 360',
    tagline: 'Continuous High-Speed 360° Slew with 40x Laser Telephoto',
    category: 'LONG-RANGE PERIMETER',
    formFactor: 'Gyroscopic Aerodynamic Pod',
    sensor: '1/1.8" Low-Noise Ultra Starlight Sensor',
    resolution: '4K Ultra HD @ 60 FPS HDR',
    opticalReach: '40x Optical Telephoto (6.25mm - 250mm)',
    fov: '65.2° to 1.8° Narrow Intercept',
    nightVision: 'Laser-Assisted Infrared 500m Illumination',
    aiFeatures: ['Auto-Tracking Radar Lock', 'Flight Path Tracking', 'Perimeter Breach Geofence', 'Speed Slew 450°/sec'],
    weatherRating: 'IP68 Military Seal & De-Icing Heating Element',
    price: 3450,
    description: 'Designed for vast airfields, maritime ports, and border perimeters. Features zero-backlash harmonic drives enabling instant 450°/second pan acceleration with sub-millimeter tracking accuracy.',
    specs: [
      { label: 'Pan / Tilt Range', value: '360° Endless Continuous / -20° to 90°' },
      { label: 'Slew Velocity', value: '0.1°/s to 450°/s Precision Slew' },
      { label: 'Optical Zoom', value: '40x Optical Zoom + 16x Digital' },
      { label: 'Night Range', value: '500m (1,640 ft) Smart Laser IR' },
      { label: 'Stabilization', value: 'Electronic + Gyro 2-Axis Gimbal' },
      { label: 'Heater / Wiper', value: 'Integrated Hydrophobic Wiper Blade' },
      { label: 'Power', value: 'Hi-PoE 90W or 24V AC' },
      { label: 'Audio', value: 'High-SPL 115dB Strobe & Hail Siren' }
    ]
  },
  {
    id: 'dome',
    name: 'VIGILOX DOME ARCHITECTURAL',
    tagline: 'Tamper-Proof Flush Architectural Profile with Zero Blind Spots',
    category: 'INTERIOR & ATRIUM',
    formFactor: 'Low-Profile Recessed Flush Dome',
    sensor: '1/2.8" PurePixel Sensor',
    resolution: '4K @ 30 FPS HDR',
    opticalReach: '3.2mm Fixed Ultra-Wide',
    fov: '128° Panoramic Coverage',
    nightVision: 'Hidden Black-Glass 940nm Stealth IR (30m)',
    aiFeatures: ['Facial Vector Tokenization', 'Crowd Density Analytics', 'Loitering Alert', 'Audio Panic Event Detect'],
    weatherRating: 'IP66 & IK10+',
    price: 1250,
    description: 'Flawlessly integrates into executive offices, luxury retail flagships, and museums without visual disruption. The optically transparent smoked glass masks internal turret orientation completely.',
    specs: [
      { label: 'Profile Height', value: '48mm (1.89 in) Ultra-Low Silhouette' },
      { label: 'Lens', value: 'F1.2 Aspherical Ultra-Wide' },
      { label: 'Stealth Tech', value: '940nm Invisible Infrared (No Red Glow)' },
      { label: 'Microphones', value: '3D MEMS Directional Acoustic Array' },
      { label: 'Privacy Shutter', value: 'Electrochromic Smart Privacy Glass' },
      { label: 'Certifications', value: 'NDAA, TAA, SOC2, GDPR Compliant' }
    ]
  },
  {
    id: 'bullet',
    name: 'VIGILOX BULLET APEX',
    tagline: 'Tactical Kinetic Defense with Dual Matrix Strobes',
    category: 'EXTERIOR DEFENSE',
    formFactor: 'Reinforced Titanium & Polymer Chassis',
    sensor: '1/1.5" High-Dynamic Starlight CMOS',
    resolution: '4K UHD @ 60 FPS HDR',
    opticalReach: '8mm - 32mm Telephoto Varifocal',
    fov: '48° - 15° Tight Corridor Focus',
    nightVision: 'TrueColor Night Vision + Dual 1200-Lumen Deterrent Strobes',
    aiFeatures: ['Active Intruder Intercept', 'License Plate OCR at 140 km/h', 'Gunshot Acoustic Triangulation'],
    weatherRating: 'IP67 & NEMA 4X Marine Grade',
    price: 2100,
    description: 'Autonomous deterrence camera engineered to stop crimes before they occur. Equipped with dual pulse LED blinding spotlights, 110dB directional speaker, and license plate reading algorithms.',
    specs: [
      { label: 'Deterrence Lights', value: '2x 1,200 Lumen Warning Flashers' },
      { label: 'Siren Output', value: '110 dB Acoustic Deterrent Horn' },
      { label: 'ANPR / LPR', value: 'Real-Time License Plate OCR to 140 km/h' },
      { label: 'IR Throw', value: '80m (260 ft) Adaptive Matrix' },
      { label: 'Mounting', value: 'Triple-Axis Heavy Duty Junction Box' },
      { label: 'Heater', value: 'Active defroster for snow & sub-zero ice' }
    ]
  },
  {
    id: 'mini',
    name: 'VIGILOX MICRO SENTRY',
    tagline: 'Discreet Nano-Footprint with Uncompromised AI Power',
    category: 'TACTICAL DISCREET',
    formFactor: 'Compact 55mm Monobloc Housing',
    sensor: '1/3" High-Definition Sensor',
    resolution: '2.5K QHD @ 30 FPS',
    opticalReach: '2.4mm Fixed Wide-Angle',
    fov: '135° Ultra-Wide Field',
    nightVision: 'Micro-IR LED (15m)',
    aiFeatures: ['Personnel Count', 'Thermal Heatmap', 'Unattended Baggage Alert'],
    weatherRating: 'IP65 Water-Resistant',
    price: 790,
    description: 'Discreet covert sensor designed for elevators, server rack aisles, ATM kiosks, and luxury residential entryways. Weighs only 180 grams while packing edge neural classification.',
    specs: [
      { label: 'Dimensions', value: '55mm × 55mm × 38mm' },
      { label: 'Weight', value: '180 g (6.3 oz)' },
      { label: 'Resolution', value: '2560 × 1440 @ 30 FPS' },
      { label: 'Connectivity', value: 'Standard PoE (802.3af) or Wi-Fi 6E' },
      { label: 'Local Cache', value: 'Internal 512GB eMMC Solid-State' }
    ]
  }
];

export const VIGILOX_HOTSPOTS: HotspotItem[] = [
  {
    id: 'sensor',
    name: '4K Starlight Sensor',
    label: '01 / SENSOR',
    title: '1/1.2" Back-Illuminated Sony Starvis 2',
    category: 'OPTICAL CORE',
    description: 'Gathers 380% more photons than traditional 1/2.8" security sensors. Captures crisp color details in lighting conditions down to 0.0003 Lux without requiring external white floodlights.',
    position: [0, 0.4, 0.95],
    specs: [
      { label: 'Photodiode Area', value: '2.9µm² Ultra-Large Pixel Pitch' },
      { label: 'Color Sensitivity', value: '0.0003 Lux @ F1.2' },
      { label: 'Signal-to-Noise', value: '> 58 dB High Dynamic Clean' }
    ]
  },
  {
    id: 'processor',
    name: 'Dual Hexa-Core NPU',
    label: '02 / AI COMPUTE',
    title: '16.8 TOPS Deep Learning Engine',
    category: 'NEURAL SYSTEM',
    description: 'On-device neural inference architecture that parses human kinematics, vehicle dimensions, and anomalous behaviors in real time without sending raw unencrypted frames across the network.',
    position: [0.65, 0.1, 0.2],
    specs: [
      { label: 'Inference Latency', value: '3.8 milliseconds' },
      { label: 'Simultaneous Targets', value: 'Up to 64 independent tracks' },
      { label: 'Privacy Standard', value: 'Edge hashing with zero biometric egress' }
    ]
  },
  {
    id: 'ptz-motor',
    name: 'Precision Harmonic Drive',
    label: '03 / 360° PTZ',
    title: 'Zero-Backlash Micro-Stepping Drive',
    category: 'KINETIC MECHANISM',
    description: 'Whisper-quiet magnetic encoders capable of 450° per second slew rate. Retains 0.01° positioning repeatability after over 10 million continuous pan cycles.',
    position: [0, -0.6, 0.1],
    specs: [
      { label: 'Max Slew Rate', value: '450° / second' },
      { label: 'Positioning Precision', value: '±0.01° Repeatability' },
      { label: 'Operating Lifespan', value: '> 10,000,000 cycles MTBF' }
    ]
  },
  {
    id: 'night-matrix',
    name: 'Dual-Spectrum IR Matrix',
    label: '04 / NIGHT VISION',
    title: '850nm High-Power + 940nm Covert Stealth',
    category: 'ILLUMINATION',
    description: 'Intelligent beam-shaping LED array automatically synchronizes beam angle with the optical zoom level, eradicating infrared overexposure hot spots on nearby subjects.',
    position: [-0.65, 0.35, 0.7],
    specs: [
      { label: 'Wavelengths', value: '850nm (High Distance) & 940nm (No Glow)' },
      { label: 'Illumination Throw', value: 'Up to 120 meters (393 ft)' },
      { label: 'Beam Angle', value: 'Adaptive 15° to 90° optical matched' }
    ]
  },
  {
    id: 'audio-array',
    name: 'Quad MEMS Acoustic Array',
    label: '05 / AUDIO INTERCOM',
    title: '3D Directional Spatial Listening',
    category: 'ACOUSTIC SYSTEM',
    description: 'Beamforming microphone ring filters out background industrial noise, wind turbulence, and vehicle rumble while isolating spoken words and triggering alerts on gunshots or breaking glass.',
    position: [0, -0.2, 0.85],
    specs: [
      { label: 'Acoustic Range', value: '25m (82 ft) Clear Voice Isolation' },
      { label: 'Sound Event AI', value: 'Gunshot, glass-break, distress shout' },
      { label: 'Two-Way Speaker', value: '105 dB High-Intelligibility Intercom' }
    ]
  },
  {
    id: 'enclosure',
    name: 'Aerospace Billet Enclosure',
    label: '06 / HARDENING',
    title: 'IP67 All-Weather & IK10 Impact Shield',
    category: 'STRUCTURAL INTEGRITY',
    description: 'CNC-machined from 6061-T6 aerospace aluminum with marine-grade fluoropolymer anti-corrosion coating. Defends against sledgehammer impacts, high-pressure salt spray, and extreme temperatures.',
    position: [0, 0.85, -0.3],
    specs: [
      { label: 'Impact Rating', value: 'IK10 (Resists 20 Joules kinetic impact)' },
      { label: 'Ingress Sealing', value: 'IP67 (Submersible 1m for 30 min)' },
      { label: 'Corrosion Shield', value: '1,000 hr ASTM-B117 Salt Fog Tested' }
    ]
  }
];

export const SECURITY_EVENTS: SecurityEvent[] = [
  {
    id: 'evt-01',
    code: 'SEC-8921',
    timestamp: '14:28:09 UTC',
    cameraName: 'CAM-04 (EAST PERIMETER PTZ)',
    location: 'Zone 2 — Outer Logistics Fence',
    type: 'PERSON',
    severity: 'high',
    summary: 'Subject identified climbing perimeter barrier. Kinematic AI classified unauthorized trespasser with 99.4% confidence. Automated strobe deterrence activated.',
    streamUrl: 'https://images.unsplash.com/photo-1579548122080-c35fd6820ecb?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 78, y: 34 }
  },
  {
    id: 'evt-02',
    code: 'SEC-8922',
    timestamp: '14:31:45 UTC',
    cameraName: 'CAM-11 (SERVER VAULT ALPHA)',
    location: 'Zone 1 — Hyperscale Data Center Pod 3',
    type: 'UNAUTHORIZED ENTRY',
    severity: 'critical',
    summary: 'Biometric mismatch at high-security biometric airlock. Subject card cloned; facial biometric geometry token invalid. Airlock sealed automatically.',
    streamUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 42, y: 62 }
  },
  {
    id: 'evt-03',
    code: 'SEC-8923',
    timestamp: '14:35:12 UTC',
    cameraName: 'CAM-01 (MAIN INGRESS GATE 4)',
    location: 'Zone 3 — Heavy Freight Port Gate',
    type: 'VEHICLE',
    severity: 'low',
    summary: 'Heavy autonomous transport truck plate [TX-882-KC] scanned and cross-referenced with pre-cleared manifest. Automated gate barrier raised.',
    streamUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 22, y: 48 }
  },
  {
    id: 'evt-04',
    code: 'SEC-8924',
    timestamp: '14:39:02 UTC',
    cameraName: 'CAM-07 (ATRIUM CONCOURSE)',
    location: 'Zone 1 — Public Executive Lobby',
    type: 'OBJECT',
    severity: 'medium',
    summary: 'Unattended metallic suitcase identified stationary for >300 seconds without associated owner in 5-meter proximity. Security personnel dispatched.',
    streamUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    coordinates: { x: 60, y: 75 }
  }
];

export const COMMAND_FEEDS: CommandFeed[] = [
  {
    id: 'feed-1',
    code: 'FEED-01',
    name: 'NORTH HELIPAD & PERIMETER',
    zone: 'Exterior Sector Alpha',
    status: 'AI_TRACKING',
    resolution: '4K (3840×2160)',
    fps: 60,
    bitrate: '14.2 Mbps (H.265+)',
    streamPoster: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80',
    fovAngle: 94,
    threatLevel: 8
  },
  {
    id: 'feed-2',
    code: 'FEED-02',
    name: 'DATA CENTER SERVER BAY 07',
    zone: 'Interior Red Zone',
    status: 'RECORDING',
    resolution: '4K (3840×2160)',
    fps: 60,
    bitrate: '12.8 Mbps (H.265+)',
    streamPoster: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    fovAngle: 114,
    threatLevel: 2
  },
  {
    id: 'feed-3',
    code: 'FEED-03',
    name: 'AUTOMATED CARGO DOCK 4',
    zone: 'Logistics Terminal',
    status: 'ACTIVE_ALERT',
    resolution: '4K (3840×2160)',
    fps: 60,
    bitrate: '16.5 Mbps (H.265+)',
    streamPoster: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    fovAngle: 82,
    threatLevel: 74
  },
  {
    id: 'feed-4',
    code: 'FEED-04',
    name: 'EXECUTIVE ATRIUM & MEZZANINE',
    zone: 'HQ Public Concourse',
    status: 'ONLINE',
    resolution: '4K (3840×2160)',
    fps: 30,
    bitrate: '8.4 Mbps (H.265+)',
    streamPoster: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    fovAngle: 128,
    threatLevel: 14
  }
];

export const AI_TARGETS: AiDetectionTarget[] = [
  {
    id: 'target-01',
    classType: 'person',
    label: 'PERSON #409',
    confidence: 99.4,
    box: { x: 28, y: 32, width: 14, height: 42 },
    metadata: 'GAIT: NORMAL | VELOCITY: 1.4 m/s | POSTURE: UPRIGHT',
    status: 'tracking',
    trajectory: [
      { x: 22, y: 48 },
      { x: 24, y: 44 },
      { x: 26, y: 38 },
      { x: 28, y: 32 }
    ]
  },
  {
    id: 'target-02',
    classType: 'face',
    label: 'ID: MARCUS V.',
    confidence: 98.7,
    box: { x: 31, y: 34, width: 8, height: 10 },
    metadata: 'AUTH: CLEARED (LEVEL 4) | GEO-HASH: 8f92a10',
    status: 'authorized'
  },
  {
    id: 'target-03',
    classType: 'vehicle',
    label: 'VEHICLE #18',
    confidence: 99.1,
    box: { x: 62, y: 44, width: 26, height: 34 },
    metadata: 'MODEL: LOGISTICS VAN | SPEED: 22 KM/H | PLATE: [7X-9104]',
    status: 'analyzed'
  },
  {
    id: 'target-04',
    classType: 'perimeter',
    label: 'PERIMETER FENCE A',
    confidence: 99.9,
    box: { x: 10, y: 15, width: 80, height: 4 },
    metadata: 'STATUS: ARMED | TRIPWIRE: ACTIVE | ZERO DEFECT',
    status: 'authorized'
  }
];

export const TECH_METRICS = [
  {
    stat: '4K',
    unit: 'UHD 60FPS',
    label: 'ULTRA HD RESOLUTION',
    description: 'Crisp forensic clarity capturing fine license plates and facial vectors even at extreme zoom distances.'
  },
  {
    stat: '16.8',
    unit: 'TOPS NPU',
    label: 'EDGE NEURAL PROCESSING',
    description: 'On-device machine learning executing 32 simultaneous deep inference pipelines with sub-4ms response time.'
  },
  {
    stat: '450°',
    unit: '/ SEC SPEED',
    label: 'HIGH-SPEED PAN-TILT-ZOOM',
    description: 'Zero-backlash harmonic drive motors for rapid target intercept across complete 360° hemispherical zones.'
  },
  {
    stat: '0.0003',
    unit: 'LUX COLOR',
    label: 'STARLIGHT NIGHT VISION',
    description: 'TrueColor sensory matrix revealing vivid color details in ambient darkness where human eyes see pitch black.'
  },
  {
    stat: '100%',
    unit: 'ZERO-TRUST',
    label: 'MILITARY-GRADE ENCRYPTION',
    description: 'AES-256 GCM hardware encryption with TPM 2.0 cryptographic chip. NDAA and TAA strictly compliant.'
  },
  {
    stat: 'IP67',
    unit: '& IK10 IMPACT',
    label: 'EXTREME HARDENING',
    description: 'Machined aerospace aluminum housing resistant to hurricane rains, sandstorms, and sledgehammer impacts.'
  }
];
