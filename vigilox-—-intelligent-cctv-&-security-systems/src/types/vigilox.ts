export type DeviceQualityTier = 'high' | 'medium' | 'low' | 'very-low';

export interface DeviceCapabilities {
  tier: DeviceQualityTier;
  pixelRatio: number;
  isMobile: boolean;
  isTouch: boolean;
  hasWebGPU: boolean;
  hasWebGL2: boolean;
  reducedMotion: boolean;
  maxTextureSize: number;
}

export type VigiloxModelId = 'core' | 'ptz' | 'dome' | 'bullet' | 'mini';

export interface VigiloxProduct {
  id: VigiloxModelId;
  name: string;
  tagline: string;
  category: string;
  formFactor: string;
  sensor: string;
  resolution: string;
  opticalReach: string;
  fov: string;
  nightVision: string;
  aiFeatures: string[];
  weatherRating: string;
  price: number;
  description: string;
  specs: { label: string; value: string }[];
}

export interface HotspotItem {
  id: string;
  name: string;
  label: string;
  title: string;
  category: string;
  description: string;
  position: [number, number, number];
  specs: { label: string; value: string }[];
}

export type AiDetectionClass = 'person' | 'vehicle' | 'face' | 'motion' | 'perimeter';

export interface AiDetectionTarget {
  id: string;
  classType: AiDetectionClass;
  label: string;
  confidence: number;
  box: { x: number; y: number; width: number; height: number }; // percentages 0-100
  metadata: string;
  status: 'authorized' | 'alert' | 'tracking' | 'analyzed';
  trajectory?: { x: number; y: number }[];
}

export interface SecurityEvent {
  id: string;
  code: string;
  timestamp: string;
  cameraName: string;
  location: string;
  type: 'PERSON' | 'UNAUTHORIZED ENTRY' | 'VEHICLE' | 'MOTION' | 'OBJECT';
  severity: 'low' | 'medium' | 'high' | 'critical';
  summary: string;
  streamUrl: string;
  coordinates: { x: number; y: number };
}

export interface CommandFeed {
  id: string;
  code: string;
  name: string;
  zone: string;
  status: 'ONLINE' | 'ACTIVE_ALERT' | 'RECORDING' | 'AI_TRACKING';
  resolution: string;
  fps: number;
  bitrate: string;
  streamPoster: string;
  fovAngle: number;
  threatLevel: number; // 0 to 100
}

export interface DeploymentQuoteConfig {
  facilityType: 'enterprise' | 'datacenter' | 'logistics' | 'retail' | 'infrastructure';
  areaSqFt: number;
  cameraCount: number;
  aiPackages: {
    perimeterDefense: boolean;
    biometricsAccess: boolean;
    fleetRecognition: boolean;
    thermalAnomaly: boolean;
  };
  retentionDays: 30 | 90 | 180 | 365;
  cloudSync: boolean;
}
