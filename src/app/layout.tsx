import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import ToastContainer from '@/components/ToastContainer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import MobileBottomNav from '@/components/MobileBottomNav';
import CyberBackground from '@/components/CyberBackground';
import CursorGlow from '@/components/CursorGlow';

export const metadata: Metadata = {
  title: 'Evolution Infotech',
  description:
    'Evolution Infotech (evolutioninfotech.in) - Official Store & IT Service Center in Bapunagar, Ahmedabad. Buy Laptops, Desktops, Printers, Networking, CCTV & get express computer repair.',
  keywords: [
    'Evolution Infotech',
    'evolutioninfotech.in',
    'Solution of Technologies',
    'Laptop Repair Ahmedabad',
    'Computer Store Ahmedabad',
    'Bapunagar Computer Shop',
    'CCTV & Networking Ahmedabad'
  ],
  authors: [{ name: 'Evolution Infotech' }],
  metadataBase: new URL('https://evolutioninfotech.in'),
  openGraph: {
    title: 'Evolution Infotech',
    description:
      'Laptops, Desktops, Printers, Networking, CCTV, Computer Repair & IT Solutions at Evolution Infotech Ahmedabad.',
    url: 'https://evolutioninfotech.in',
    siteName: 'Evolution Infotech',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/images/logo-icon.png',
    shortcut: '/images/logo-icon.png',
    apple: '/images/logo-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://evolutioninfotech.in/" />
      </head>
      <body>
        <CyberBackground />
        <CursorGlow />
        <ToastProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <QuickViewModal />
            <WhatsAppWidget />
            <MobileBottomNav />
            <ToastContainer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
