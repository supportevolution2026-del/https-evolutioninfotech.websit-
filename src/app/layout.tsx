import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import ToastContainer from '@/components/ToastContainer';
import CartDrawer from '@/components/CartDrawer';
import QuickViewModal from '@/components/QuickViewModal';

export const metadata: Metadata = {
  title: 'Evolution Infotech | Next-Gen IT Hardware, Enterprise Servers & Software Store',
  description:
    'Evolution Infotech (evolutioninfotech.in) is India’s premier enterprise IT solutions and hardware destination. Buy AI Laptops, NVIDIA RTX GPUs, Dell PowerEdge Servers, PCIe Gen5 NVMe, and licensed business software with genuine manufacturer warranty.',
  keywords: [
    'Evolution Infotech',
    'evolutioninfotech.in',
    'Next-Gen IT Hardware India',
    'Buy RTX 4090 India',
    'ASUS ROG AI Laptops',
    'Dell PowerEdge Servers',
    'Enterprise Networking IT Solutions',
    'Microsoft 365 Business License',
    'Custom Gaming PC India'
  ],
  authors: [{ name: 'Evolution Infotech' }],
  metadataBase: new URL('https://evolutioninfotech.in'),
  openGraph: {
    title: 'Evolution Infotech | Next-Gen IT Hardware & Enterprise Solutions',
    description:
      'Explore high-performance computing, enterprise server racks, workstations & digital IT solutions at Evolution Infotech.',
    url: 'https://evolutioninfotech.in',
    siteName: 'Evolution Infotech',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
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
        <ToastProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <QuickViewModal />
            <ToastContainer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
