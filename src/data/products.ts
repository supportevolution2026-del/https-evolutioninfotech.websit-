import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'evo-lt-01',
    name: 'ASUS ROG Zephyrus G16 (2026 AI Edition)',
    slug: 'asus-rog-zephyrus-g16-ai',
    category: 'laptops-desktops',
    subCategory: 'Gaming & Creator Laptops',
    brand: 'ASUS',
    price: 184990,
    originalPrice: 219990,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 12,
    isFeatured: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=1000&q=80',
    ],
    shortDesc: 'Intel Core Ultra 9, 32GB LPDDR5X, 2TB PCIe Gen4 SSD, RTX 4080 12GB, 2.5K 240Hz OLED.',
    description: 'The ASUS ROG Zephyrus G16 is engineered for ultra-demanding creators and gamers. Powered by Intel Core Ultra 9 with dedicated NPU for AI acceleration and NVIDIA GeForce RTX 4080, it delivers groundbreaking framerates and instantaneous rendering in an ultra-sleek CNC aluminum chassis.',
    highlights: [
      'Intel Core Ultra 9 185H processor with AI Boost NPU',
      'NVIDIA GeForce RTX 4080 12GB GDDR6 (115W TGP)',
      '16" 2.5K (2560x1600) 240Hz ROG Nebula OLED display with 100% DCI-P3',
      '32GB LPDDR5X 7467MHz Dual Channel Memory',
      '2TB M.2 NVMe PCIe 4.0 Performance SSD',
      'Quad speakers with Dolby Atmos & 90Wh fast-charging battery'
    ],
    specs: {
      'Processor': 'Intel Core Ultra 9 185H (16 Cores, 22 Threads, up to 5.1GHz)',
      'Graphics': 'NVIDIA GeForce RTX 4080 Laptop GPU 12GB GDDR6',
      'Display': '16-inch 2.5K 240Hz 0.2ms OLED HDR True Black 500',
      'Memory': '32GB LPDDR5X 7467MHz',
      'Storage': '2TB PCIe 4.0 NVMe M.2 SSD',
      'Weight': '1.85 kg',
      'OS': 'Windows 11 Home + MS Office 2024 Home & Student'
    },
    warranty: '2 Years Manufacturer On-Site Warranty + 1 Year ADP',
    sku: 'EVO-NB-ROG-0916'
  },
  {
    id: 'evo-gpu-01',
    name: 'NVIDIA GeForce RTX 4090 OC 24GB GDDR6X',
    slug: 'nvidia-geforce-rtx-4090-oc-24gb',
    category: 'pc-components',
    subCategory: 'Graphics Cards',
    brand: 'NVIDIA',
    price: 199990,
    originalPrice: 225000,
    discountPercent: 11,
    rating: 5.0,
    reviewCount: 98,
    inStock: true,
    stockCount: 8,
    isFeatured: true,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: '24GB 384-Bit GDDR6X, 16384 CUDA Cores, DLSS 3.5, 3x DisplayPort 1.4a, 2x HDMI 2.1a.',
    description: 'The definitive GPU for AI computing, deep learning, 3D simulation and 4K max-settings gaming. Featuring 3rd Gen RT Cores, 4th Gen Tensor Cores, and massive 24GB VRAM for extreme multitasking and heavy AI neural workloads.',
    highlights: [
      'Ada Lovelace Architecture with 16,384 CUDA Cores',
      '24GB ultra-fast GDDR6X 384-bit memory bandwidth up to 1008 GB/s',
      'NVIDIA DLSS 3.5 Ray Reconstruction & AI frame generation',
      'Triple Axial-tech vapor chamber cooling design'
    ],
    specs: {
      'Memory': '24GB GDDR6X 384-bit',
      'Boost Clock': '2565 MHz (OC Mode)',
      'CUDA Cores': '16384',
      'Power Connector': '1 x 16-pin (12VHPWR)',
      'Recommended PSU': '1000W'
    },
    warranty: '3 Years Comprehensive Warranty',
    sku: 'EVO-GPU-RTX4090-24'
  },
  {
    id: 'evo-mon-01',
    name: 'Samsung Odyssey OLED G9 49" Curved Dual QHD',
    slug: 'samsung-odyssey-oled-g9-49',
    category: 'peripherals-accessories',
    subCategory: 'Monitors',
    brand: 'Samsung',
    price: 129990,
    originalPrice: 169990,
    discountPercent: 24,
    rating: 4.8,
    reviewCount: 67,
    inStock: true,
    stockCount: 6,
    isFeatured: true,
    isDealOfTheDay: true,
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: '49-inch 1800R Curved OLED, 240Hz, 0.03ms (GtG), 5120 x 1440 Dual QHD, Neo Quantum Processor Pro.',
    description: 'Immerse yourself in panoramic visuals with the Odyssey OLED G9. Powered by the Neo Quantum Processor Pro, every frame is analyzed and optimized for maximum brilliance, deep blacks, and boundless vividness.',
    highlights: [
      '49-inch 32:9 Super Ultra-Wide curved 1800R display',
      'Neo Quantum Processor Pro for AI picture tuning',
      '0.03ms response time with 240Hz refresh rate',
      'DisplayHDR True Black 400 & AMD FreeSync Premium Pro'
    ],
    specs: {
      'Resolution': '5,120 x 1,440 (Dual QHD)',
      'Aspect Ratio': '32:9',
      'Refresh Rate': '240Hz',
      'Response Time': '0.03ms(GTG)',
      'Ports': '1x DP 1.4, 1x HDMI 2.1, 1x Micro HDMI 2.1, USB Hub'
    },
    warranty: '3 Years On-site Brand Warranty',
    sku: 'EVO-DISP-SAM-G9'
  },
  {
    id: 'evo-srv-01',
    name: 'Dell PowerEdge R760 Rack Server Enterprise',
    slug: 'dell-poweredge-r760-rack-server',
    category: 'networking-servers',
    subCategory: 'Enterprise Rack Servers',
    brand: 'Dell Technologies',
    price: 489990,
    originalPrice: 550000,
    discountPercent: 11,
    rating: 5.0,
    reviewCount: 31,
    inStock: true,
    stockCount: 4,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Dual 4th Gen Intel Xeon Silver, 128GB DDR5 ECC, 8x 3.84TB NVMe SSD RAID, Redundant 1400W PSU.',
    description: 'The 2U Dell PowerEdge R760 delivers enterprise virtualization, database consolidation, high-density AI analytics, and maximum enterprise uptime with iDRAC9 Enterprise remote management.',
    highlights: [
      'Dual 4th Gen Intel Xeon Silver 4410Y (24 Cores total)',
      '128GB DDR5 4800MHz ECC Registered RDIMM (expandable to 8TB)',
      'PERC H755 Front SAS/SATA/NVMe Hardware RAID Controller',
      'Dual Hot-Plug Redundant 1400W Titanium Power Supplies'
    ],
    specs: {
      'Form Factor': '2U Rack Mountable',
      'Processors': '2x Intel Xeon Silver 4410Y (12C/24T, 2.0GHz base)',
      'RAM': '128GB DDR5 ECC (4x32GB)',
      'Drive Bays': 'Up to 24 x 2.5-inch SAS/SATA/NVMe SSDs',
      'Network': 'Quad-port 10GbE SFP+ / 1GbE Base-T OCP 3.0'
    },
    warranty: '5 Years Dell ProSupport Plus 24x7 Mission Critical',
    sku: 'EVO-SRV-DELL-R760'
  },
  {
    id: 'evo-ssd-01',
    name: 'Crucial T705 2TB PCIe Gen5 NVMe M.2 SSD with Heatsink',
    slug: 'crucial-t705-2tb-gen5-nvme-ssd',
    category: 'storage-memory',
    subCategory: 'Internal SSDs',
    brand: 'Crucial',
    price: 26490,
    originalPrice: 32990,
    discountPercent: 20,
    rating: 4.9,
    reviewCount: 84,
    inStock: true,
    stockCount: 22,
    isFeatured: false,
    isBestSeller: true,
    image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Read speeds up to 14,500 MB/s, Write speeds up to 12,700 MB/s, Micron 232-layer TLC NAND.',
    description: 'Blisteringly fast PCIe 5.0 speed for content creators, high-end workstations, and next-gen gaming. Integrated custom copper heatsink ensures sustained max throughput without thermal throttling.',
    highlights: [
      'Sequential reads up to 14,500 MB/s and writes up to 12,700 MB/s',
      'Built with premium Micron 232-layer 3D TLC NAND',
      'DirectStorage enabled for instantaneous game load times',
      'Premium custom aluminium/copper heatsink included'
    ],
    specs: {
      'Capacity': '2TB',
      'Interface': 'PCIe Gen 5.0 x4, NVMe 2.0',
      'Form Factor': 'M.2 2280',
      'TBW Endurance': '1200 TBW'
    },
    warranty: '5 Years Limited Warranty',
    sku: 'EVO-SSD-CRU-T705-2TB'
  },
  {
    id: 'evo-soft-01',
    name: 'Microsoft 365 Business Premium (1 Year Commercial License)',
    slug: 'microsoft-365-business-premium-1yr',
    category: 'software-cloud',
    subCategory: 'Productivity & Security',
    brand: 'Microsoft',
    price: 19800,
    originalPrice: 23500,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 210,
    inStock: true,
    stockCount: 999,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'Includes full Word, Excel, Teams, 1TB OneDrive, Microsoft Defender & Intune Enterprise Management.',
    description: 'All-in-one productivity suite with enterprise-grade threat protection, device management with Microsoft Intune, and 1TB cloud storage per user. Verified digital license delivered instantly.',
    highlights: [
      'Full desktop & web Office applications (Word, Excel, PowerPoint, Outlook)',
      '1TB OneDrive cloud storage & Exchange online business email (50GB mailbox)',
      'Advanced cyber threat protection against ransomware & phishing',
      'Device security management via Microsoft Intune'
    ],
    specs: {
      'License Type': 'Digital Electronic Software Delivery (ESD)',
      'Duration': '12 Months (1 Year)',
      'User Capacity': '1 User (Install on up to 5 PCs/Macs + 5 Mobile devices)',
      'Delivery': 'Instant Email / Dashboard Activation within 15 Minutes'
    },
    warranty: '100% Genuine Digital Certificate with Evolution Infotech 24x7 Support',
    sku: 'EVO-SW-MS365-BP'
  },
  {
    id: 'evo-kb-01',
    name: 'Keychron Q1 Max Custom Wireless Mechanical Keyboard',
    slug: 'keychron-q1-max-wireless-mechanical-keyboard',
    category: 'peripherals-accessories',
    subCategory: 'Keyboards',
    brand: 'Keychron',
    price: 18490,
    originalPrice: 21990,
    discountPercent: 16,
    rating: 4.9,
    reviewCount: 115,
    inStock: true,
    stockCount: 14,
    isFeatured: false,
    isNewArrival: true,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'CNC Machined Aluminum body, Double-Gasket mount, 2.4GHz Wireless / Bluetooth 5.1 / Type-C, QMK/VIA support.',
    description: 'The Keychron Q1 Max is a full metal 75% layout custom wireless mechanical keyboard with acoustic foams, Gateron Jupiter switches, PBT keycaps, and customizable RGB backlight.',
    highlights: [
      'Full CNC anodized aluminum unibody construction',
      '2.4GHz ultra-low latency wireless, Bluetooth 5.1 and wired mode',
      'Hot-swappable PCB supporting 3-pin and 5-pin MX switches',
      'Sound absorbing acoustic silicone and IXPE foam layers'
    ],
    specs: {
      'Layout': '75% (81 Keys)',
      'Connectivity': '2.4GHz / Bluetooth 5.1 / Type-C',
      'Battery': '4000mAh Rechargeable Li-polymer',
      'Weight': '1724g'
    },
    warranty: '1 Year Direct Replacement Warranty',
    sku: 'EVO-KB-KEY-Q1MAX'
  },
  {
    id: 'evo-net-01',
    name: 'Ubiquiti UniFi Dream Machine Special Edition (UDM-SE)',
    slug: 'ubiquiti-unifi-dream-machine-se',
    category: 'networking-servers',
    subCategory: 'Routers & Gateways',
    brand: 'Ubiquiti',
    price: 54990,
    originalPrice: 62000,
    discountPercent: 11,
    rating: 5.0,
    reviewCount: 52,
    inStock: true,
    stockCount: 7,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80',
    images: [
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1000&q=80'
    ],
    shortDesc: 'All-in-one Enterprise Router, 10G SFP+ WAN/LAN, Integrated 8-Port PoE+ Gigabit Switch, 128GB SSD.',
    description: 'Complete enterprise networking gateway featuring 3.5+ Gbps IPS/IDS routing, PoE+ ports to power access points and UniFi protect cameras, 10G SFP+ uplinks, and complete network visibility.',
    highlights: [
      'Dual-WAN routing with 1x 2.5GbE RJ45 & 1x 10G SFP+ WAN ports',
      'Integrated 8-port Gigabit switch with (2) PoE+ and (6) PoE ports',
      'Full UniFi OS application suite (Network, Protect, Access, Talk)',
      '1.3" touchscreen display for instant status monitoring'
    ],
    specs: {
      'Processor': 'Quad-Core ARM Cortex-A57 @ 1.7GHz',
      'System Memory': '4GB DDR4',
      'Internal Storage': '128GB Integrated SSD + 3.5" HDD Bay',
      'IDS/IPS Throughput': '3.5 Gbps'
    },
    warranty: '2 Years Manufacturer Warranty',
    sku: 'EVO-NET-UBI-UDMSE'
  }
];

export const heroSlides = [
  {
    id: 1,
    title: 'Next-Gen IT Infrastructure & Gaming Supercomputers',
    subtitle: 'Evolution Infotech — Your Trusted Technology & Enterprise Solutions Partner',
    badge: 'NEW 2026 AI HARDWARE CATALOG',
    ctaText: 'Explore Products',
    ctaLink: '/products',
    secondaryText: 'Request Corporate Quote',
    secondaryLink: '/contact',
    bgGradient: 'from-blue-900/40 via-cyan-950/30 to-black',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'Enterprise Server Stacks & Ultra-Fast Cloud Networking',
    subtitle: 'Custom Rackmount Servers, High-Speed NVMe Arrays & Cisco/Ubiquiti Infrastructure',
    badge: 'ENTERPRISE SOLUTIONS',
    ctaText: 'View Enterprise Hardware',
    ctaLink: '/products?category=networking-servers',
    secondaryText: 'Speak with Engineer',
    secondaryLink: '/contact',
    bgGradient: 'from-indigo-900/40 via-purple-950/30 to-black',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Premium AI Laptops, OLED Displays & Studio Peripherals',
    subtitle: 'Uncompromising performance for software engineers, 3D animators & gamers',
    badge: 'UP TO 25% OFF SPECIALS',
    ctaText: 'Shop Laptops',
    ctaLink: '/products?category=laptops-desktops',
    secondaryText: 'Deal of the Day',
    secondaryLink: '/products/samsung-odyssey-oled-g9-49',
    bgGradient: 'from-emerald-900/40 via-teal-950/30 to-black',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
  }
];
