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
  Wrench,
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

  const handleOpenInquiry = (serviceName: string) => {
    setSelectedService(serviceName);
    setIsInquiryModalOpen(true);
  };

  const servicesList = [
    {
      id: 'computer-repair',
      title: 'Computer Repair',
      subtitle: 'Hardware • Software • Virus Removal',
      description: 'Comprehensive chip-level laptop & desktop motherboard repair, screen/keyboard replacement, thermal servicing, SSD speed-boost, and virus/malware eradication.',
      features: ['2-hour diagnostic turnaround', 'Genuine OEM replacement parts', 'Data safety & backup guarantee', 'On-site home & office pickup/drop'],
      icon: <Monitor size={32} color="#06b6d4" />,
      colorBadge: 'rgba(6, 182, 212, 0.15)',
      borderColor: 'rgba(6, 182, 212, 0.3)'
    },
    {
      id: 'amc-support',
      title: 'AMC Support',
      subtitle: 'Yearly Maintenance Plan & Uptime SLA',
      description: 'Annual Maintenance Contracts for small businesses, schools, corporations, and institutions ensuring 99.9% uptime for all computers, printers, and network endpoints.',
      features: ['Scheduled monthly preventive checkups', 'Free standby replacement hardware', 'Unlimited emergency breakdown visits', 'Priority certified IT engineer assigned'],
      icon: <ShieldCheck size={32} color="#8b5cf6" />,
      colorBadge: 'rgba(139, 92, 246, 0.15)',
      borderColor: 'rgba(139, 92, 246, 0.3)'
    },
    {
      id: 'networking',
      title: 'Networking Solutions',
      subtitle: 'WiFi • LAN • Router & Firewall Setup',
      description: 'High-speed structured Cat6A/Fiber optic cabling, enterprise WiFi 7 / Mesh access points, Ubiquiti / Cisco Layer-3 switches, and VPN firewall configurations.',
      features: ['Zero dead-zone mesh WiFi setup', 'Rack server & patch panel routing', 'Guest network & bandwidth throttling', 'Remote VPN & network security audit'],
      icon: <Globe size={32} color="#10b981" />,
      colorBadge: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.3)'
    },
    {
      id: 'printer-service',
      title: 'Printer Service',
      subtitle: 'Repair • Refill • Tuning • Cartridge',
      description: 'Professional servicing of HP, Canon, Epson, and Brother LaserJet & InkTank printers. Precision roller replacement, printhead unclogging, and toner refills.',
      features: ['High-yield toner refills', 'Pick & drop service available', 'Logic card & SMPS repair', 'Genuine drum & cartridge replacements'],
      icon: <Printer size={32} color="#f43f5e" />,
      colorBadge: 'rgba(244, 63, 94, 0.15)',
      borderColor: 'rgba(244, 63, 94, 0.3)'
    },
    {
      id: 'software-install',
      title: 'Software Install',
      subtitle: 'Windows • Office • Antivirus • Drivers',
      description: 'Authorized Microsoft 365, Windows 11 Pro commercial licenses, QuickBooks/Tally Prime setup, QuickHeal/Kaspersky Antivirus, and custom ERP client deployment.',
      features: ['100% Genuine authorized license keys', 'Zero-downtime OS migration', 'Driver optimization & BIOS updates', 'GST Invoicing available'],
      icon: <Cpu size={32} color="#38bdf8" />,
      colorBadge: 'rgba(56, 189, 248, 0.15)',
      borderColor: 'rgba(56, 189, 248, 0.3)'
    },
    {
      id: 'cctv-setup',
      title: 'CCTV Setup',
      subtitle: 'Home • Office Security Surveillance',
      description: 'Turnkey deployment of Hikvision & CP Plus 4K IP / HD cameras, NVR recording servers, night-vision color imaging, and mobile live viewing configuration on phone/PC.',
      features: ['Mobile App live remote view setup', 'Hard drive storage calculation', 'Waterproof outdoor & PTZ dome cameras', 'Motion detection & siren alerts'],
      icon: <Camera size={32} color="#f59e0b" />,
      colorBadge: 'rgba(245, 158, 11, 0.15)',
      borderColor: 'rgba(245, 158, 11, 0.3)'
    },
    {
      id: 'software-development',
      title: 'Software & Web Development',
      subtitle: 'Custom Web Apps • Mobile Apps • ERP/CRM',
      description: 'Modern, secure full-stack software development tailored to your business workflow. We build custom ERP systems, e-commerce stores, Android/iOS apps, and web portals.',
      features: ['React, Next.js, Node.js, Flutter tech stack', 'Custom business workflow automation', 'Payment gateway & SMS/WhatsApp APIs', 'Cloud hosting & lifetime bug warranty'],
      icon: <Code2 size={32} color="#06b6d4" />,
      colorBadge: 'rgba(6, 182, 212, 0.15)',
      borderColor: 'rgba(6, 182, 212, 0.3)'
    },
    {
      id: 'dedicated-developers',
      title: 'Dedicated Software Developers',
      subtitle: 'Hire Dedicated Developers on Demand',
      description: 'Scale your engineering team instantly with certified full-stack, frontend, and backend developers. Flexible hourly, monthly, or project-based engagement models.',
      features: ['Daily standups & Git tracking', 'Strict NDA & IP protection', 'Direct WhatsApp / Slack communication', 'Transparent milestone-based billing'],
      icon: <Server size={32} color="#a855f7" />,
      colorBadge: 'rgba(168, 85, 247, 0.15)',
      borderColor: 'rgba(168, 85, 247, 0.3)'
    }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenQuoteModal={() => setIsB2BModalOpen(true)} />

      <main style={{ flex: 1, padding: '30px 0 60px 0' }}>
        <div className="container">
          
          {/* Header Banner */}
          <div style={{
            borderRadius: '24px',
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.18), rgba(15, 23, 42, 0.95))',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            padding: '40px 30px',
            textAlign: 'center',
            marginBottom: '40px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 14px', borderRadius: '9999px', background: 'rgba(6, 182, 212, 0.15)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#38bdf8', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '12px' }}>
              <Sparkles size={15} /> 24/7 PROFESSIONAL IT & SOFTWARE SOLUTIONS
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.15 }}>
              Our Services & Development
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '650px', margin: '10px auto 20px auto', lineHeight: 1.6 }}>
              Professional IT Solutions, Hardware Repairs, Maintenance Contracts, and Custom Software Development for businesses & home users.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  const url = getCustomWhatsAppUrl('Software & Web App Project Inquiry', 'Hello Evolution Infotech! I want to consult and get a quotation for custom software / mobile app development.');
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
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
                  boxShadow: '0 4px 15px rgba(6, 182, 212, 0.4)'
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
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                }}
              >
                <MessageCircle size={18} /> Chat with Engineer on WhatsApp
              </button>
            </div>
          </div>

          {/* Services Grid (Matches user's mobile app layout) */}
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
                  border: `1px solid ${service.borderColor}`,
                  background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.85) 0%, rgba(8, 12, 20, 0.95) 100%)',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
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
                    border: `1px solid ${service.borderColor}`
                  }}>
                    {service.icon}
                  </div>

                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#ffffff', marginBottom: '4px' }}>
                    {service.title}
                  </h3>

                  <div style={{ fontSize: '0.82rem', color: '#06b6d4', fontWeight: 700, marginBottom: '12px' }}>
                    {service.subtitle}
                  </div>

                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '18px' }}>
                    {service.description}
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '16px' }}>
                    {service.features.map((feat, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
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
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
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

          {/* Quick Connect & Business Hours Info Grid (Matches Screenshot 3) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {/* Quick Connect Card */}
            <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#10b981'
                }}>
                  <PhoneCall size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Quick Connect</h3>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Direct WhatsApp & Call line</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>WHATSAPP & CALL</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>+91 918401945508</div>
                  </div>
                  <a
                    href="https://wa.me/918401945508?text=Hello%20Evolution%20Infotech%20Support!"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      background: 'rgba(16, 185, 129, 0.15)',
                      border: '1px solid #10b981',
                      color: '#34d399',
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

                <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>EMAIL ADDRESS</div>
                  <div style={{ fontSize: '0.98rem', fontWeight: 700, color: '#38bdf8', marginTop: '2px' }}>support.evolution2026@gmail.com</div>
                </div>
              </div>
            </div>

            {/* Business Hours Card */}
            <div className="glass-panel" style={{ padding: '30px', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: 'rgba(245, 158, 11, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#f59e0b'
                }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Business Hours</h3>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Service & support availability</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>&bull; Monday - Friday:</span>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>10:00 AM - 8:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>&bull; Saturday:</span>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>10:00 AM - 8:00 PM</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
                  <span style={{ color: '#cbd5e1', fontWeight: 600 }}>&bull; Sunday:</span>
                  <span style={{ color: '#fbbf24', fontWeight: 700 }}>10:00 AM - 2:00 PM</span>
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
