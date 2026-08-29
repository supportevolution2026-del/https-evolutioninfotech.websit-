import { Product } from '@/types';

export const products: Product[] = [];

export const heroSlides = [
  {
    id: 1,
    title: 'High-Performance Laptops, Desktops & Custom PCs',
    subtitle: 'Evolution Infotech — Your Trusted Technology & Hardware Solutions Partner in Ahmedabad',
    badge: '100% GENUINE HARDWARE STORE',
    ctaText: 'Explore Products',
    ctaLink: '/products',
    secondaryText: 'Inquire on WhatsApp',
    secondaryLink: '/contact',
    bgGradient: 'from-blue-900/40 via-cyan-950/30 to-black',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 2,
    title: 'High-Speed Networking & Security Surveillance',
    subtitle: 'Gigabit WiFi Routers, Enterprise Network Switches & HD CCTV Camera Setups',
    badge: 'NETWORK & CCTV INFRASTRUCTURE',
    ctaText: 'View Network Gear',
    ctaLink: '/products?category=network',
    secondaryText: 'Get Quote',
    secondaryLink: '/contact',
    bgGradient: 'from-indigo-900/40 via-purple-950/30 to-black',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    title: 'Laptops, Printers & Genuine Computer Accessories',
    subtitle: 'Top brand hardware with official warranty, GST billing and express delivery',
    badge: 'TOP SELLING HARDWARE',
    ctaText: 'Shop Laptops',
    ctaLink: '/products?category=laptop',
    secondaryText: 'Explore Accessories',
    secondaryLink: '/products?category=accessories',
    bgGradient: 'from-emerald-900/40 via-teal-950/30 to-black',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
  }
];
