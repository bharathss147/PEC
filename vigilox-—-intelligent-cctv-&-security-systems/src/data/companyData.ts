import { CompanyContact } from '../types/company';

export const COMPANY_PROFILE = {
  legalName: 'PARADISE ELITE CONSTRUCTION PTE. LTD.',
  shortName: 'PARADISE ELITE',
  tagline: 'BUILDING SPACES. SECURING WHAT MATTERS.',
  mission: 'Delivering end-to-end architectural construction, commercial renovation, and mission-critical electronic security systems across Singapore.',
  overview: 'Paradise Elite Construction Pte. Ltd. is a premier Singapore multidisciplinary builder integrating civil construction, interior turnkey fitting, facilities maintenance, and intelligent electronic security infrastructure.',
  capabilities: [
    'General Construction & Structural Works',
    'Commercial & Residential Turnkey Renovation',
    'Integrated M&E Building Maintenance',
    'Enterprise Starlight AI CCTV & Surveillance',
    'Biometric Facial Recognition & Access Control',
    'Commercial Video Intercom & PBX Telephony',
    'Data Structured Cabling & Optical Networking'
  ],
  pillars: [
    { title: 'BUILD', subtitle: 'Structural & Architectural Excellence' },
    { title: 'RENOVATE', subtitle: 'Turnkey Interior Transformation' },
    { title: 'SECURE', subtitle: 'High-Precision CCTV & Access Tech' },
    { title: 'MAINTAIN', subtitle: '24/7 Facility & M&E Rectification' }
  ],
  stats: [
    { label: 'Integrated Trades', value: '14+' },
    { label: 'Singapore Projects', value: '350+' },
    { label: 'Security Uptime', value: '99.98%' },
    { label: 'Certified Workmanship', value: 'BCA Standard' }
  ]
};

export const COMPANY_CONTACT: CompanyContact = {
  legalName: 'PARADISE ELITE CONSTRUCTION PTE. LTD.',
  tradeName: 'Paradise Elite Construction',
  headquarters: 'Singapore (HQ & Commercial Operations Hub)',
  country: 'Singapore',
  phone: '+65 6789 1234', // Singapore business line format
  whatsapp: '+65 9123 4567',
  email: 'enquiry@paradiseelite.com.sg',
  businessHours: 'Monday – Friday: 08:30 – 18:00 | Saturday: 09:00 – 13:00 (SGT)',
  emergencySupport: '24/7 Rapid Response for Enterprise Security & Critical M&E Maintenance'
};

export const SUPPORTED_SECURITY_BRANDS = [
  { name: 'Hikvision', type: 'Enterprise AI & AcuSense IP Video' },
  { name: 'Dahua', type: 'WizMind & Full-Color Security' },
  { name: 'TP-Link VIGI', type: 'Commercial PoE Surveillance' },
  { name: 'EZVIZ', type: 'Cloud Wi-Fi & Smart Intercom' },
  { name: 'Tapo', type: 'Residential & Light Commercial Tech' }
];

export const CORE_SECTORS = [
  'Commercial Offices & Corporate Towers',
  'Industrial Warehouses & Logistics Parks',
  'Retail Outlets & F&B Chains',
  'Strata Landed & Condominium Developments',
  'Educational & Healthcare Facilities'
];
