import { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'laptop',
    name: 'Laptop',
    slug: 'laptop',
    description: 'High-performance AI laptops, ASUS ROG, Apple MacBook, Dell & Lenovo',
    icon: 'Laptop',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=85',
    itemCount: 18,
  },
  {
    id: 'desktop',
    name: 'Desktop',
    slug: 'desktop',
    description: 'Custom AI workstations, developer rigs, RTX 4090 gaming towers & all-in-one PCs',
    icon: 'Monitor',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=85',
    itemCount: 14,
  },
  {
    id: 'printer',
    name: 'Printer',
    slug: 'printer',
    description: 'HP Smart Tank, Epson EcoTank, Canon PIXMA & Brother commercial laser printers',
    icon: 'Printer',
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=800&q=85',
    itemCount: 12,
  },
  {
    id: 'network',
    name: 'Network',
    slug: 'network',
    description: 'Enterprise Wi-Fi 6 routers, Gigabit managed switches, Cat6A & rack servers',
    icon: 'Server',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=85',
    itemCount: 16,
  },
  {
    id: 'cctv',
    name: 'CCTV',
    slug: 'cctv',
    description: 'Hikvision & CP Plus 4K IP security cameras, NVR servers & mobile surveillance',
    icon: 'Camera',
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=85',
    itemCount: 15,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Logitech mice, mechanical keyboards, Samsung NVMe SSDs, DDR5 RAM & power supplies',
    icon: 'HardDrive',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=85',
    itemCount: 32,
  }
];
