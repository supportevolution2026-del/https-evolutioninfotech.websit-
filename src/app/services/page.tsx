'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceInquiryModal from '@/components/ServiceInquiryModal';
import B2BQuoteModal from '@/components/B2BQuoteModal';
import { getServiceBookingWhatsAppUrl, getCustomWhatsAppUrl } from '@/utils/whatsapp';
import {
  Monitor,
  ShieldCheck,
  Globe,
  Printer,
  Code2,
  Camera,
  Cpu,
  Server,
  ArrowRight,
  MessageCircle,
  Clock,
  CheckCircle2,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState<string>('Computer Repair');
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [isB2BModalOpen, setIsB2BModalOpen] = useState(false);

  const servicesList = [
    {
      id: 'computer-repair',
      title: 'Computer Repair',
      subtitle: 'Hardware • Software • Virus Removal',
      description: 'Comprehensive chip-level laptop & desktop motherboard repair, screen/keyboard replacement, thermal servicing, SSD speed-boost, and virus/malware eradication.',
      features: ['2-hour diagnostic turnaround', 'Genuine OEM replacement parts', 'Data safety & backup guarantee', 'On-site home & office pickup/drop'],
      icon: <Monitor size={30} color="#0284c7" />,
      colorBadge: '#f0f9ff',
      borderColor: '#e2e8f0'
    },
    {
      id: 'amc-support',
      title: 'AMC Support',
      subtitle: 'Yearly Maintenance Plan & Uptime SLA',
      description: 'Annual Maintenance Contracts for small businesses, schools, corporations, and institutions ensuring 99.9% uptime for all computers, printers, and network endpoints.',
      features: ['Scheduled monthly preventive checkups', 'Free standby replacement hardware', 'Unlimited emergency breakdown visits', 'Priority certified IT engineer assigned'],
      icon: <ShieldCheck size={30} color="#7c3aed" />,
      colorBadge: '#f5f3ff',
      borderColor: '#e2e8f0'
    },
    {
      id: 'networking',
      title: 'Networking Solutions',
      subtitle: 'WiFi • LAN • Router & Firewall Setup',
      description: 'High-speed structured Cat6A/Fiber optic cabling, enterprise WiFi 7 / Mesh access points, Ubiquiti / Cisco Layer-3 switches, and VPN firewall configurations.',
      features: ['Zero dead-zone mesh WiFi setup', 'Rack server & patch panel routing', 'Guest network & bandwidth throttling', 'Remote VPN & network security audit'],
      icon: <Globe size={30} color="#16a34a" />,
      colorBadge: '#f0fdf4',
      borderColor: '#e2e8f0'
    },
    {
      id: 'printer-service',
      title: 'Printer Service',
      subtitle: 'Repair • Refill • Tuning • Cartridge',
      description: 'Professional servicing of HP, Canon, Epson, and Brother LaserJet & InkTank printers. Precision roller replacement, printhead unclogging, and toner refills.',
      features: ['High-yield toner refills', 'Pick & drop service available', 'Logic card & SMPS repair', 'Genuine drum & cartridge replacements'],
      icon: <Printer size={30} color="#e11d48" />,
      colorBadge: '#fff1f2',
      borderColor: '#e2e8f0'
    },
    {
      id: 'software-install',
      title: 'Software Install',
      subtitle: 'Windows • Office • Antivirus • Drivers',
      description: 'Authorized Microsoft 365, Windows 11 Pro commercial licenses, QuickBooks/Tally Prime setup, QuickHeal/Kaspersky Antivirus, and custom ERP client deployment.',
      features: ['100% Genuine authorized license keys', 'Zero-downtime OS migration', 'Driver optimization & BIOS updates', 'GST Invoicing available'],
      icon: <Cpu size={30} color="#0284c7" />,
      colorBadge: '#eff6ff',
      borderColor: '#e2e8f0'
    },
    {
      id: 'cctv-setup',
      title: 'CCTV Setup',
      subtitle: 'Home • Office Security Surveillance',
      description: 'Turnkey deployment of Hikvision & CP Plus 4K IP / HD cameras, NVR recording servers, night-vision color imaging, and mobile live viewing configuration on phone/PC.',
      features: ['Mobile App live remote view setup', 'Hard drive storage calculation', 'Waterproof outdoor & PTZ dome cameras', 'Motion detection & siren alerts'],
      icon: <Camera size={30} color="#d97706" />,
      colorBadge: '#fffbeb',
      borderColor: '#e2e8f0'
    },
    {
      id: 'web-application',
      title: 'Web Application / Website',
      subtitle: 'Modern Websites, SaaS & Custom Web Portals',
      description: 'Custom responsive web design, corporate business websites, Next.js / React full-stack web applications, admin portals, and high-conversion landing pages.',
      features: ['Next.js, React & Node.js architecture', 'SEO-ready & ultra-fast loading speed', 'Custom responsive UI & smooth animations', 'Secure REST & GraphQL API integrations'],
      icon: <Globe size={30} color="#0284c7" />,
      colorBadge: '#f0f9ff',
      borderColor: '#e2e8f0'
    },
    {
      id: 'mobile-application',
      title: 'Mobile Application (iOS & Android)',
      subtitle: 'Native & Cross-Platform Mobile Apps',
      description: 'High-performance iOS and Android mobile apps with Flutter, React Native, and native SDKs. Push notifications, camera, geolocation, and payment gateways.',
      features: ['Flutter & React Native single codebase', 'App Store & Google Play publishing', 'Real-time database sync & push alerts', 'Biometric login & offline caching'],
      icon: <Cpu size={30} color="#7c3aed" />,
      colorBadge: '#f5f3ff',
      borderColor: '#e2e8f0'
    },
    {
      id: 'desktop-application',
      title: 'Desktop Application',
      subtitle: 'Windows & Cross-Platform Software',
      description: 'High-speed desktop software for offline POS billing, inventory management, ERP, hardware automation, and custom workflow utilities (Electron / .NET / C++).',
      features: ['High-speed offline-first database', 'Thermal printer & barcode scanner integration', 'Multi-user LAN networking support', 'Automatic auto-update engine'],
      icon: <Monitor size={30} color="#16a34a" />,
      colorBadge: '#f0fdf4',
      borderColor: '#e2e8f0'
    },
    {
      id: 'ecommerce-application',
      title: 'E-commerce Website / Application',
      subtitle: 'Online Stores, Multi-Vendor & Apps',
      description: 'Full-featured online shopping platforms with product catalog, cart/checkout, payment gateways (Razorpay/Stripe), coupon engine, and WhatsApp order alerts.',
      features: ['Instant WhatsApp checkout & invoicing', 'Payment gateway (UPI, Cards, NetBanking)', 'Order tracking & SMS status notifications', 'Real-time inventory & stock alerts'],
      icon: <Sparkles size={30} color="#e11d48" />,
      colorBadge: '#fff1f2',
      borderColor: '#e2e8f0'
    },
    {
      id: 'other-general-inquiry',
      title: 'Other / General Inquiry',
      subtitle: 'Custom Tech Consultation & Cloud Setup',
      description: 'Dedicated technology consulting, cloud hosting (AWS / Azure / Supabase), custom API development, database architecture, or tailored IT solutions.',
      features: ['Free 30-min technical consultation', 'Custom software scope & timeline estimation', 'Dedicated project manager assigned', 'Lifetime bug-free support guarantee'],
      icon: <Code2 size={30} color="#d97706" />,
      colorBadge: '#fffbeb',
      borderColor: '#e2e8f0'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar onOpenQuoteModal={() => setIsB2BModalOpen(true)} />

      <main style={{ flex: 1, padding: '30px 0 60px 0' }}>
        <div className="container">
          
          {/* Header Banner */}
          <div style={{
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 50%, #f0fdf4 100%)',
            border: '1.5px solid #bfdbfe',
            padding: '44px 30px',
            textAlign: 'center',
            marginBottom: '40px',
            boxShadow: '0 20px 48px -12px rgba(37, 99, 235, 0.12)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: '#e0f2fe', border: '1px solid #bae6fd', color: '#0284c7', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
              <Sparkles size={15} /> 24/7 PROFESSIONAL IT & SOFTWARE SOLUTIONS
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15 }}>
              Our Services & Development
            </h1>
            <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '650px', margin: '10px auto 20px auto', lineHeight: 1.6 }}>
              Professional IT Solutions, Hardware Repairs, Maintenance Contracts, and Custom Software Development for businesses & home users.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  const url = getCustomWhatsAppUrl('Software & Web App Project Inquiry', 'Hello Evolution Infotech! I want to consult and get a quotation for custom software / mobile app development.');
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  background: 'linear-gradient(135deg, #0284c7, #2563eb)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(37, 99, 235, 0.35)'
                }}
              >
                <Code2 size={18} /> Software Project Inquiry (WhatsApp)
              </button>

              <button
                onClick={() => {
                  const url = getCustomWhatsAppUrl('Immediate IT Support', 'Hello Evolution Infotech! I need immediate on-site / remote IT support.');
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
                }}
              >
                <MessageCircle size={18} /> Chat with Engineer on WhatsApp
              </button>
            </div>
          </div>

          {/* Services Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '50px'
          }}>
            {servicesList.map((service) => (
              <div
                key={service.id}
                className="glass-card"
                style={{
                  padding: '30px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '24px',
                  border: '1px solid #e2e8f0',
                  background: '#ffffff',
                  boxShadow: 'var(--shadow-sm)'
                }}
              >
                <div>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '18px',
                    background: service.colorBadge,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '18px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {service.icon}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', marginBottom: '4px' }}>
                    {service.title}
                  </h3>

                  <div style={{ fontSize: '0.84rem', color: '#2563eb', fontWeight: 800, marginBottom: '12px' }}>
                    {service.subtitle}
                  </div>

                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6, marginBottom: '18px' }}>
                    {service.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                    {service.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.84rem', color: '#334155', fontWeight: 500 }}>
                        <CheckCircle2 size={15} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ marginTop: '24px', paddingTop: '16px' }}>
                  <button
                    onClick={() => {
                      const url = getServiceBookingWhatsAppUrl(service.title, `Inquiry regarding ${service.subtitle}`);
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    style={{
                      width: '100%',
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '13px 18px',
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                  >
                    <MessageCircle size={18} />
                    <span>Enquire on WhatsApp</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Connect & Business Hours Info Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {/* Quick Connect Card */}
            <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#ecfdf5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981'
                }}>
                  <PhoneCall size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>Quick Connect</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Direct WhatsApp & Call line</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>WHATSAPP & CALL</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>+91 918401945508</div>
                  </div>
                  <a
                    href="https://wa.me/918401945508?text=Hello%20Evolution%20Infotech%20Support!"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      color: '#15803d',
                      padding: '8px 14px',
                      borderRadius: '8px',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <MessageCircle size={15} /> Chat Now
                  </a>
                </div>

                <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>EMAIL ADDRESS</div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#2563eb', marginTop: '2px' }}>support.evolution2026@gmail.com</div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#fffbeb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f59e0b'
                }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>Business Hours</h3>
                  <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Service & support availability</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>&bull; Monday - Friday:</span>
                  <span style={{ color: '#2563eb', fontWeight: 700 }}>10:00 AM - 8:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>&bull; Saturday:</span>
                  <span style={{ color: '#2563eb', fontWeight: 700 }}>10:00 AM - 8:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                  <span style={{ color: '#475569', fontWeight: 600 }}>&bull; Sunday:</span>
                  <span style={{ color: '#b45309', fontWeight: 700 }}>10:00 AM - 2:00 PM</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <ServiceInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialService={selectedService}
      />

      <B2BQuoteModal
        isOpen={isB2BModalOpen}
        onClose={() => setIsB2BModalOpen(false)}
      />
    </div>
  );
}
