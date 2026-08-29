import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Computer Repair Shop Near Me | #1 Laptop & PC Repair Ahmedabad - Evolution Infotech',
  description:
    'Best computer repair shop near me in Ahmedabad (116 Shayona Arcade, Shyam Shikhar, Bapunagar). Same-day laptop repair, motherboard chip-level repair, SSD upgrades, Windows OS setup, and doorstep service. Call +91 918401945508.',
  keywords: [
    'computer repair shop near me',
    'computer repairing Ahmedabad',
    'laptop repair shop near me Bapunagar',
    'PC repair service Shyam Shikhar Ahmedabad',
    'doorstep computer repair Ahmedabad',
    'best laptop motherboard repair chip level',
    'Evolution Infotech Ahmedabad',
    'laptop screen replacement Ahmedabad',
    'slow computer SSD upgrade Bapunagar',
    'hard disk data recovery Ahmedabad'
  ],
  alternates: {
    canonical: 'https://evolutioninfotech.in/computer-repair-shop-near-me',
  },
  openGraph: {
    title: 'Computer Repair Shop Near Me | #1 Laptop & PC Repairing in Ahmedabad',
    description:
      'Fast doorstep & walk-in computer repair at 116 Shayona Arcade, Shyam Shikhar, Bapunagar, Ahmedabad. 30-min express diagnostic, genuine parts & 4.9/5 top rating.',
    url: 'https://evolutioninfotech.in/computer-repair-shop-near-me',
    siteName: 'Evolution Infotech',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RepairLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
