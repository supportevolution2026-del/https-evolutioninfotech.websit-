import { Product } from '@/types';

// Live Supabase Product Catalog - Dummy products removed as per user request
export const products: Product[] = [];

export const heroSlides = [
  {
    id: 1,
    title: 'High-Performance Laptops, Desktops & Custom PCs',
    subtitle: 'Evolution Infotech — Your Trusted Technology & Hardware Solutions Partner in Ahmedabad',
    badge: '100% GENUINE HARDWARE STORE',
    ctaText: 'Explore Laptops & PCs',
    ctaLink: '/products?category=laptop',
    secondaryText: 'Inquire on WhatsApp',
    secondaryLink: '/contact',
    bgGradient: 'from-blue-900/40 via-cyan-950/30 to-black',
    image: '/images/hero-laptops-desktops.jpg',
  },
  {
    id: 2,
    title: 'Laptops, Printers & Genuine Computer Accessories',
    subtitle: 'Top brand hardware with official warranty, GST billing and express delivery across Gujarat',
    badge: 'TOP SELLING HARDWARE',
    ctaText: 'Explore Printers & Gear',
    ctaLink: '/products?category=printer',
    secondaryText: 'View Accessories',
    secondaryLink: '/products?category=accessories',
    bgGradient: 'from-emerald-900/40 via-teal-950/30 to-black',
    image: '/images/hero-laptops-printers.jpg',
  },
  {
    id: 3,
    title: 'High-Speed Networking & 4K CCTV Security Infrastructure',
    subtitle: 'Gigabit WiFi 6 Routers, Enterprise Network Switches & ColorVu HD CCTV Camera Setups',
    badge: 'NETWORK & CCTV INFRASTRUCTURE',
    ctaText: 'View Network Gear',
    ctaLink: '/products?category=network',
    secondaryText: 'Get Quote',
    secondaryLink: '/contact',
    bgGradient: 'from-indigo-900/40 via-purple-950/30 to-black',
    image: '/images/hero-network-cctv.jpg',
  }
];
