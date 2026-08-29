import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'laptop',
    name: 'Laptop',
    slug: 'laptop',
    description: 'High-performance AI laptops, business ultrabooks & gaming laptops',
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=800&q=80',
    itemCount: 28,
  },
  {
    id: 'desktop',
    name: 'Desktop',
    slug: 'desktop',
    description: 'Custom AI workstations, office PCs, developer rigs & gaming towers',
    icon: 'Monitor',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
    itemCount: 34,
  },
  {
    id: 'printer',
    name: 'Printer',
    slug: 'printer',
    description: 'LaserJet, InkTank, all-in-one commercial printers & cartridges',
    icon: 'Printer',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=80',
    itemCount: 16,
  },
  {
    id: 'network',
    name: 'Network',
    slug: 'network',
    description: 'Enterprise WiFi routers, Gigabit switches, LAN cabling & firewalls',
    icon: 'Server',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    itemCount: 22,
  },
  {
    id: 'cctv',
    name: 'CCTV',
    slug: 'cctv',
    description: 'HD IP security cameras, NVR/DVR setups & remote mobile surveillance',
    icon: 'Camera',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80',
    itemCount: 19,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Keyboards, mice, SSDs, RAM, cables, adapters & peripherals',
    icon: 'HardDrive',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    itemCount: 45,
  }
];
