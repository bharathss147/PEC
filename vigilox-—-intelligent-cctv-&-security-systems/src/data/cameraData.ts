import { HotspotData, CameraConfiguration } from '../types';

export const DEFAULT_CAMERA_CONFIG: CameraConfiguration = {
  bodyColor: 'obsidian',
  grip: 'standard',
  lens: '50mm',
  cageAttached: false,
};

export const CAMERA_BASE_PRICE = 4499;

export const COLOR_OPTIONS = [
  {
    id: 'obsidian' as const,
    name: 'Obsidian Black',
    description: 'Matte ceramic micro-arc oxidation coating with deep light-absorbing finish',
    hex: '#121214',
    price: 0,
  },
  {
    id: 'titanium' as const,
    name: 'Titanium Silver',
    description: 'Grade 5 aerospace titanium alloy bezel with hand-brushed satin luster',
    hex: '#9ba1ab',
    price: 350,
  },
];

export const GRIP_OPTIONS = [
  {
    id: 'standard' as const,
    name: 'Standard Ergonomic',
    description: 'Textured silicone vulcanized leatherette for minimal footprint and street agility',
    price: 0,
  },
  {
    id: 'performance' as const,
    name: 'Performance Pro Grip',
    description: 'Extended contour with secondary front command dial, vertical shutter button & thermal port',
    price: 280,
  },
];

export const HOTSPOTS_DATA: HotspotData[] = [
  {
    id: 'sensor',
    name: 'SENSOR',
    category: 'OPTICAL CORE',
    title: '45.7 MP Back-Illuminated Stacked CMOS',
    description: 'Ultra-low noise stacked silicon with copper wiring layers delivering 14+ stops of usable dynamic range and instantaneous readout speeds.',
    position: [0, 0.25, 0.45],
    specs: [
      { label: 'Resolution', value: '45.7 Megapixels' },
      { label: 'Pixel Pitch', value: '4.35 μm' },
      { label: 'Dynamic Range', value: '14.8 Stops' },
      { label: 'Base ISO', value: '64 — 51,200' },
    ],
  },
  {
    id: 'processor',
    name: 'PROCESSOR',
    category: 'NEURAL COMPUTING',
    title: 'LUMORA Quantum Engine IV',
    description: 'Dual neural processing units executing 800 million AF calculations per second with deep-learning subject recognition and 16-bit uncompressed pipeline.',
    position: [0, 0.1, -0.2],
    specs: [
      { label: 'Architecture', value: 'Hexa-core 4nm' },
      { label: 'Processing Speed', value: '120 TOPS' },
      { label: 'Continuous Buffer', value: '1,000+ RAW frames' },
      { label: 'Color Depth', value: '16-bit A/D pipeline' },
    ],
  },
  {
    id: 'ibis',
    name: 'IBIS',
    category: 'STABILIZATION',
    title: '5-Axis Magnetic Levitation Stabilizer',
    description: 'High-frequency gyro sensors operating at 10kHz suspended by precision voice-coil actuators to deliver up to 8.5 stops of vibration compensation.',
    position: [0, 0.25, 0.05],
    specs: [
      { label: 'Correction', value: '8.5 Stops CIPA' },
      { label: 'Actuators', value: 'Quad Voice-Coil' },
      { label: 'Sampling Rate', value: '10,000 Hz' },
      { label: 'Pixel Shift', value: '180 MP Multi-Shot' },
    ],
  },
  {
    id: 'lens-mount',
    name: 'LENS MOUNT',
    category: 'OPTICAL INTERFACE',
    title: 'L-Infinity Stainless Steel Bayonet',
    description: '55mm inner throat diameter paired with an ultra-short 16mm flange focal distance. Features 12 gold-plated data pins for 10Gbps optical lens telemetry.',
    position: [0, 0.25, 1.05],
    specs: [
      { label: 'Throat Diameter', value: '55.0 mm' },
      { label: 'Flange Distance', value: '16.0 mm' },
      { label: 'Pin Interface', value: '12 Gold Contact Pins' },
      { label: 'Durability', value: 'Tested to 100,000 cycles' },
    ],
  },
  {
    id: 'cooling',
    name: 'COOLING',
    category: 'THERMAL REGULATION',
    title: 'Active Graphene Vapor Chamber',
    description: 'Patented whisper-quiet micro-centrifugal cooling channel transferring heat through layered graphene sheets for unlimited 8K/60p and 4K/120p recording.',
    position: [-0.65, 0.15, -0.1],
    specs: [
      { label: 'Dissipation', value: 'Up to 35 Watts' },
      { label: 'Noise Floor', value: '< 14 dBA (Silent Mode)' },
      { label: 'Continuous 8K', value: 'No thermal cutoff' },
      { label: 'Core Material', value: 'Vaporized Copper-Graphene' },
    ],
  },
  {
    id: 'battery',
    name: 'BATTERY',
    category: 'POWER ARCHITECTURE',
    title: 'Lumora Cell Pro 28.5Wh High-Density',
    description: 'Solid-state hybrid electrolyte cell engineered to retain high voltage throughput under sub-zero temperatures down to -20°C with PD 3.0 fast charging.',
    position: [0.75, -0.35, -0.05],
    specs: [
      { label: 'Capacity', value: '3,800 mAh / 28.5 Wh' },
      { label: 'Shots Per Charge', value: '820 (CIPA) / 1,450 (Eco)' },
      { label: 'Fast Charge', value: '80% in 35 min (USB-C PD)' },
      { label: 'Operating Temp', value: '-20°C to +45°C' },
    ],
  },
  {
    id: 'body',
    name: 'BODY',
    category: 'CHASSIS ENGINEERING',
    title: 'Monocoque Magnesium-Carbon Matrix',
    description: 'Precision CNC-milled from a single block of magnesium alloy with 74 weather-sealed gaskets for dust, moisture, and freeze-proof operational reliability.',
    position: [0.55, 0.45, 0.1],
    specs: [
      { label: 'Weight', value: '685 g (chassis & battery)' },
      { label: 'Weather Seals', value: '74 silicone O-rings' },
      { label: 'Shutter Life', value: '500,000 actuations' },
      { label: 'EVF Panel', value: '9.44M-dot 120Hz OLED' },
    ],
  },
];
