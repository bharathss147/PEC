export type ServiceDivision = 'construction' | 'renovation' | 'maintenance' | 'security' | 'commercial';

export interface ServiceTrade {
  id: string;
  name: string;
  division: ServiceDivision;
  category: 'construction_renovation' | 'security_technology';
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  applications: string[];
  certifications?: string[];
  featured?: boolean;
}

export interface ProductCategorySummary {
  id: string;
  name: string;
  description: string;
  supportedBrands: string[];
  keySpecs: string[];
  iconName: string;
}

export interface CompanyContact {
  legalName: string;
  tradeName: string;
  regNumber?: string;
  headquarters: string;
  country: string;
  phone: string;
  whatsapp?: string;
  email: string;
  businessHours: string;
  emergencySupport?: string;
}

export interface ProjectReferenceSummary {
  id: string;
  title: string;
  category: 'commercial' | 'industrial' | 'retail' | 'residential';
  location: string;
  scope: string[];
  servicesRendered: string[];
  completedYear: string;
}

export interface UniversalQuoteRequest {
  serviceType: 'cctv_security' | 'renovation' | 'construction' | 'maintenance' | 'multiple';
  cctvDetails?: {
    cameraCount?: number;
    preferredBrand?: string;
    environment?: 'indoor' | 'outdoor' | 'both';
    storageDays?: number;
    requiresAccessControl?: boolean;
  };
  renovationDetails?: {
    propertyType?: string;
    approxAreaSqFt?: number;
    tradesNeeded?: string[];
  };
  siteLocation: string;
  targetTimeline: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  notes?: string;
}
