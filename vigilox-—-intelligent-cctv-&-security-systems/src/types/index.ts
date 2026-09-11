export * from './vigilox';

// Legacy types preserved for clean type-checking
export type CameraColor = 'obsidian' | 'titanium';
export type GripType = 'standard' | 'performance';
export type LensType = '24mm' | '35mm' | '50mm' | '85mm' | '70-200mm';

export interface CameraConfiguration {
  bodyColor: CameraColor;
  grip: GripType;
  lens: LensType;
  cageAttached?: boolean;
}

export interface HotspotData {
  id: string;
  name: string;
  category: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
  position: [number, number, number];
}

export interface LensSpecification {
  id: LensType;
  name: string;
  aperture: string;
  apertureRange: [number, number];
  focalLength: string;
  filterDiameter: string;
  weight: string;
  elements: string;
  diaphragmBlades: number;
  description: string;
  mount: string;
  price: number;
  highlight: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'PORTRAIT' | 'STREET' | 'LANDSCAPE' | 'CINEMA' | 'ARCHITECTURE';
  photographer: string;
  location: string;
  shutterSpeed: string;
  aperture: string;
  iso: string;
  lensUsed: string;
  imageUrl: string;
  aspectRatio: string;
  description: string;
}

export interface TechComponentInfo {
  id: string;
  name: string;
  metric: string;
  summary: string;
  position: [number, number, number];
  color: string;
}
