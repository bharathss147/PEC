import { ServiceTrade, ProductCategorySummary } from '../types/company';

export const CONSTRUCTION_RENOVATION_TRADES: ServiceTrade[] = [
  {
    id: 'electrical',
    name: 'Electrical Engineering & Power',
    division: 'renovation',
    category: 'construction_renovation',
    shortDesc: 'EMA-licensed electrical installations, single/three-phase distribution boards, industrial conduit wiring, and emergency lighting.',
    fullDesc: 'Comprehensive electrical contracting for commercial buildings, retail, and residential properties. All works adhere to Singapore SS CP5 and EMA safety standards.',
    iconName: 'Zap',
    deliverables: ['Main DB & Sub-Board Installation', 'Conduit & Trunking Routing', 'LED Architectural Lighting', 'Power Socket Distribution', 'Testing & Commissioning (EMA LEW)'],
    applications: ['Corporate Offices', 'Warehouses', 'Retail Malls', 'Landed Homes'],
    featured: true
  },
  {
    id: 'plumbing',
    name: 'Plumbing & Sanitary Works',
    division: 'construction',
    category: 'construction_renovation',
    shortDesc: 'Licensed PUB sanitary piping, wastewater management, commercial drainage, and backflow prevention systems.',
    fullDesc: 'Certified sanitary and piping infrastructure for heavy-duty commercial kitchens, commercial restrooms, industrial facilities, and luxury residences.',
    iconName: 'Droplet',
    deliverables: ['Copper & PPR Pipe Fitting', 'Grease Trap Installation', 'High-Pressure Leak Rectification', 'Sanitary Ware Installation', 'PUB Endorsement Support'],
    applications: ['F&B Outlets', 'Commercial Restrooms', 'Factories', 'Condominiums']
  },
  {
    id: 'aircon',
    name: 'Air Conditioning & Mechanical Ventilation (ACMV)',
    division: 'maintenance',
    category: 'construction_renovation',
    shortDesc: 'Commercial VRV/VRF systems, ductwork fabrication, cassette units, and scheduled chemical wash maintenance.',
    fullDesc: 'Energy-efficient climate control and mechanical ventilation engineered for tropical Singapore conditions with BCA Green Mark considerations.',
    iconName: 'Wind',
    deliverables: ['VRV / Multi-Split Installation', 'Galvanized Duct Fabrication', 'Refrigerant Piping & Insulation', 'Preventive Maintenance Contracts', 'Diagnostic Balancing'],
    applications: ['Office Floors', 'Cleanrooms', 'Restaurants', 'Auditoriums'],
    featured: true
  },
  {
    id: 'carpentry',
    name: 'Custom Architectural Carpentry',
    division: 'renovation',
    category: 'construction_renovation',
    shortDesc: 'Factory-crafted casework, executive conference desks, feature walls, acoustic wall slats, and bespoke retail counters.',
    fullDesc: 'Bespoke joinery manufactured in our local workshop using premium laminates, solid timbers, and Blum soft-close architectural hardware.',
    iconName: 'Hammer',
    deliverables: ['Custom Reception Counters', 'Acoustic Timber Slat Wall Paneling', 'Executive Cabinetry & Shelving', 'Concealed Door Systems', 'Pantry & Island Fabrications'],
    applications: ['Corporate HQs', 'Luxury Residences', 'Boutique Retail', 'Clinics']
  },
  {
    id: 'partition-ceiling',
    name: 'Drywall Partition & False Ceilings',
    division: 'renovation',
    category: 'construction_renovation',
    shortDesc: 'Fire-rated acoustic drywall partitions, metal furring systems, and architectural plasterboard cove false ceilings.',
    fullDesc: 'Precision interior zoning with SCDF-certified fire-rated partitions (1-hour/2-hour) and seamless gypsum plasterboard false ceilings with integrated lighting troughs.',
    iconName: 'Layers',
    deliverables: ['SCDF Fire-Rated Drywall Partition', 'Acoustic Sound Insulation Batts', 'Plasterboard False Ceiling & Cove', 'Suspended Mineral Fiber Grid Ceiling', 'Demountable Glass Partitions'],
    applications: ['Office Meeting Rooms', 'Educational Centers', 'Retail Stores', 'Hospitals']
  },
  {
    id: 'flooring',
    name: 'Heavy-Duty Vinyl & Resilient Flooring',
    division: 'renovation',
    category: 'construction_renovation',
    shortDesc: 'Commercial-grade luxury vinyl tiles (LVT), stone plastic composite (SPC), and electrostatic-discharge (ESD) flooring.',
    fullDesc: 'High-traffic wear layers with water-resistant acoustic underlays, providing commercial longevity with rapid turnaround times.',
    iconName: 'Grid',
    deliverables: ['Sub-floor Screeding & Self-Leveling', 'Commercial 5mm SPC Click Tiles', 'Heavy-Duty Glue-Down LVT', 'Skirting & Transition Trims', 'Anti-Static Flooring Solutions'],
    applications: ['Offices', 'Clinics & Labs', 'Retail Showrooms', 'Apartments']
  },
  {
    id: 'tiling',
    name: 'Porcelain, Ceramic & Marble Tiling',
    division: 'construction',
    category: 'construction_renovation',
    shortDesc: 'Large-format porcelain slabs, non-slip exterior pavers, mosaic accents, and precision mitred tile edges.',
    fullDesc: 'Skilled tile craft for commercial lobbies, wet areas, building facades, and high-end residential interiors with waterproofing guarantees.',
    iconName: 'LayoutGrid',
    deliverables: ['Large-Format Slab Laying', 'Waterproofing Membrane Application', 'Epoxy Non-Stain Grouting', 'Honing & Chemical Tile Sealing', 'Outdoor Anti-Slip Pavers'],
    applications: ['Hotel Lobbies', 'Bathrooms & Wet Kitchens', 'Walkways', 'Shopping Malls']
  },
  {
    id: 'painting',
    name: 'Commercial & Residential Painting',
    division: 'renovation',
    category: 'construction_renovation',
    shortDesc: 'Odourless anti-bacterial coatings, exterior weather-shield protective systems, and specialty lime plaster finishes.',
    fullDesc: 'Professional multi-coat preparation using Singapore Green Label certified low-VOC paints from Nippon Paint and Dulux with durable finish coats.',
    iconName: 'Paintbrush',
    deliverables: ['Plaster Wall Skimming & Sanding', 'Moisture Sealer Primer Coat', 'Anti-Mould Anti-Bacterial Topcoats', 'Exterior Weather-Shield Application', 'Epoxy Floor Coatings'],
    applications: ['Condominiums', 'Industrial Buildings', 'Schools', 'Commercial Properties']
  },
  {
    id: 'metal-glass',
    name: 'Glass, Aluminium & Architectural Metalwork',
    division: 'construction',
    category: 'construction_renovation',
    shortDesc: 'Tempered glass shopfronts, frameless shower screens, aluminium window systems, and structural steel reinforcement.',
    fullDesc: 'Engineered metal and structural glazing installations compliant with Singapore Building & Construction Authority (BCA) specifications.',
    iconName: 'Maximize2',
    deliverables: ['12mm Tempered Glass Shopfronts', 'Aluminium Casement & Sliding Windows', 'Stainless Steel Railings & Balustrades', 'Structural Steel Framing (I-Beams)', 'Acoustic Double-Glazed Panels'],
    applications: ['Shopfronts', 'Balconies', 'Factory Extensions', 'Commercial Entrances']
  },
  {
    id: 'maintenance',
    name: 'Facilities Maintenance & Turnkey Rectification',
    division: 'maintenance',
    category: 'construction_renovation',
    shortDesc: 'Comprehensive scheduled preventive maintenance, water seepage rectification, reinstatement works, and 24/7 on-call dispatch.',
    fullDesc: 'Dedicated facility support for property managers, MCSTs, and commercial tenants, including tenancy lease end-of-term reinstatement.',
    iconName: 'Wrench',
    deliverables: ['Scheduled Preventive Maintenance', 'Office Reinstatement to Landlord Handover', 'PU Chemical Grouting Water Leak Repair', 'Emergency Electrical & Pipe Rectification', 'Annual Term Maintenance Agreements'],
    applications: ['MCST Condominiums', 'Business Parks', 'Retail Chains', 'Corporate Offices'],
    featured: true
  }
];

export const SECURITY_TECHNOLOGY_TRADES: ServiceTrade[] = [
  {
    id: 'cctv-surveillance',
    name: 'CCTV Surveillance & AI Video Analytics',
    division: 'security',
    category: 'security_technology',
    shortDesc: 'Enterprise 4K IP PoE surveillance, AcuSense AI person/vehicle classification, Starlight color night vision, and centralized NVR/VMS storage.',
    fullDesc: 'Full turnkey CCTV installation, structured network cabling, camera focusing, and secure multi-device remote viewing for commercial, industrial, and high-security residential sites.',
    iconName: 'Camera',
    deliverables: ['High-Def 4K PoE Camera Deployment', 'Edge AI Threat & Perimeter Classification', 'NVR Raid Storage & Offsite Cloud Backup', 'Cat6 Solid Copper Shielded Cabling', 'Mobile & Desktop Multi-Monitor Viewing Setup'],
    applications: ['Industrial Compounds', 'Retail Loss Prevention', 'Office Complexes', 'Residential Estates'],
    featured: true
  },
  {
    id: 'door-access',
    name: 'Biometric Facial Recognition & Door Access',
    division: 'security',
    category: 'security_technology',
    shortDesc: 'Contactless facial recognition terminals, RFID card readers, electromagnetic locks (EM locks), and cloud attendance tracking.',
    fullDesc: 'Sophisticated electronic access control systems restricting unauthorized access, logging staff attendance, and seamlessly integrating with fire alarm override triggers.',
    iconName: 'ShieldCheck',
    deliverables: ['Deep-Learning Face Terminals (<0.2s speed)', '600lbs / 1200lbs Fail-Safe EM Locks', 'Emergency Break-Glass Integration', 'Cloud/On-Prem Time Attendance Software', 'Turnstile & Barrier Integration'],
    applications: ['Server Rooms', 'Corporate Offices', 'Gyms & Co-Working', 'Gated Communities'],
    featured: true
  },
  {
    id: 'video-intercom',
    name: 'Commercial & Multi-Tenant Video Intercom',
    division: 'security',
    category: 'security_technology',
    shortDesc: 'IP video door stations with wide-angle cameras, touch indoor monitors, mobile app forwarding, and two-way crystal-clear audio.',
    fullDesc: 'Modern intercom solutions connecting visitors directly to reception desks or security guardhouses with remote door release capabilities.',
    iconName: 'Tv',
    deliverables: ['IP Weatherproof Outdoor Door Station', '7” / 10” Android Touch Indoor Stations', 'Mobile App Remote Unlock Forwarding', 'SIP Protocol PBX Integration', 'Multi-Door Central Management'],
    applications: ['Landed Homes', 'Commercial Towers', 'Factories', 'Gated Compounds']
  },
  {
    id: 'telephone-telephony',
    name: 'PABX Telephony & Structured Network Cabling',
    division: 'security',
    category: 'security_technology',
    shortDesc: 'Commercial IP-PBX phone systems, VoIP SIP extensions, server rack patching, and IMDA-compliant Cat6/Cat6A cabling.',
    fullDesc: 'Rock-solid telecommunications infrastructure keeping your corporate team connected with enterprise voice routing, IVR menus, and optical network backbone.',
    iconName: 'PhoneCall',
    deliverables: ['IP-PBX Server Provisioning', 'VoIP Desk Phone Hardware Setup', 'Patch Panel & Server Rack Dressing', 'IMDA Cabling Test Certification', 'Inter-Branch SIP Trunking'],
    applications: ['Corporate Headquarters', 'Call Centers', 'Warehouses', 'Retail Operations']
  }
];

export const PRODUCT_CATEGORIES_PREVIEW: ProductCategorySummary[] = [
  {
    id: 'cctv',
    name: 'CCTV Surveillance Cameras',
    description: '4K IP PoE, Analog HD, Starlight ColorVu, and 360° PTZ camera systems.',
    supportedBrands: ['Hikvision', 'Dahua', 'TP-Link VIGI', 'EZVIZ', 'Tapo'],
    keySpecs: ['Up to 4K UHD 8MP', '0.0003 Lux Starlight Night Vision', 'AI Human & Vehicle Detection', 'IP67 Weatherproof / IK10 Vandal-Proof'],
    iconName: 'Camera'
  },
  {
    id: 'access-control',
    name: 'Access Control & Facial Recognition',
    description: 'Biometric face terminals, RFID card controllers, and fail-safe electromagnetic locks.',
    supportedBrands: ['Hikvision', 'Dahua', 'ZKTeco', 'Soxis'],
    keySpecs: ['<0.2s Face Verification', 'Mask & Liveness Anti-Spoofing', 'Up to 50,000 Card Capacity', 'Fire Alarm Auto-Release'],
    iconName: 'ShieldCheck'
  },
  {
    id: 'video-intercom',
    name: 'Video Intercom & Doorbell Systems',
    description: 'Smart IP door stations with two-way audio, touch monitors, and smartphone remote unlocking.',
    supportedBrands: ['Hikvision', 'Dahua', 'EZVIZ', 'Tapo'],
    keySpecs: ['Fisheye 180° FOV', 'Noise & Echo Cancellation', 'PoE Powered Simplicity', 'Remote Door Release via App'],
    iconName: 'Tv'
  },
  {
    id: 'network-storage',
    name: 'Network Video Recorders (NVR) & PoE Switches',
    description: 'Dedicated enterprise video recorders, surveillance-grade hard drives, and industrial PoE switches.',
    supportedBrands: ['Hikvision', 'Dahua', 'TP-Link', 'Seagate SkyHawk', 'Western Digital Purple'],
    keySpecs: ['4-Channel to 128-Channel NVRs', 'H.265+ High Efficiency Compression', '24/7 Continuous Surveillance HDDs', 'Gigabit PoE+ Power Budgeting'],
    iconName: 'HardDrive'
  }
];
