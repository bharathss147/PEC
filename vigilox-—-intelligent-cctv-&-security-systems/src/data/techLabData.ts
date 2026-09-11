import { TechComponentInfo } from '../types';

export const TECH_COMPONENTS: TechComponentInfo[] = [
  {
    id: 'sensor-core',
    name: '45.7MP STACKED SENSOR',
    metric: '14.8 STOPS DR / 4.35μm',
    summary: 'Direct copper-to-silicon bonding allows instantaneous line readout, eradicating rolling shutter distortion in cinema modes.',
    position: [0, 0.4, 0],
    color: '#00f0ff',
  },
  {
    id: 'processor-neural',
    name: 'QUANTUM IV NEURAL ENGINE',
    metric: '120 TOPS / 4nm',
    summary: 'Autonomous optical computing analyzing subject micro-movements, eye focus, and skin tones with zero latency.',
    position: [-1.4, -0.2, 0.5],
    color: '#3b82f6',
  },
  {
    id: 'cooling-graphene',
    name: 'GRAPHENE VAPOR MATRIX',
    metric: '35W DISSIPATION / <14dBA',
    summary: 'Multi-layer sintered vapor loop distributing thermal loads evenly to the outer magnesium monocoque.',
    position: [1.3, -0.3, 0.2],
    color: '#06b6d4',
  },
  {
    id: 'ibis-maglev',
    name: '5-AXIS MAGNETIC LEVITATION',
    metric: '8.5 STOPS / 10,000Hz',
    summary: 'Rare-earth neodymium electromagnets floating the sensor package freely in electromagnetic suspension.',
    position: [0.3, -0.8, -0.4],
    color: '#60a5fa',
  },
  {
    id: 'battery-solid',
    name: 'SOLID-HYBRID 28.5Wh CELL',
    metric: '3,800mAh / -20°C RATED',
    summary: 'Ultra-dense chemical architecture designed for sustained high current draw in continuous 8K 120fps recording.',
    position: [-0.8, 0.8, -0.3],
    color: '#38bdf8',
  },
];
