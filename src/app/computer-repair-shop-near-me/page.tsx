'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ServiceInquiryModal from '@/components/ServiceInquiryModal';
import {
  WHATSAPP_PHONE_NUMBER,
  WHATSAPP_DISPLAY_PHONE,
  COMPANY_NAME,
  STORE_ADDRESS,
  GOOGLE_MAPS_URL
} from '@/utils/whatsapp';
import {
  Monitor,
  Laptop,
  Cpu,
  HardDrive,
  ShieldCheck,
  Wrench,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  CheckCircle2,
  Star,
  Sparkles,
  Award,
  Truck,
  Zap,
  Navigation,
  ChevronDown,
  ChevronUp,
  ArrowRight
} from 'lucide-react';

export default function ComputerRepairShopNearMePage() {
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('Computer & Laptop Repair');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const repairServices = [
    {
      title: 'Chip-Level Motherboard Repair',
      desc: 'Expert micro-soldering, short-circuit diagnostics, power IC replacement, and liquid damage restoration for all laptop & desktop motherboards.',
      turnaround: 'Same Day / 24 Hours',
      badge: 'Advanced Lab'
    },
    {
      title: 'Laptop Screen & Hinge Replacement',
      desc: '100% Genuine FHD / 2K / 4K / 144Hz OLED and IPS replacement displays with broken body hinge rebuild and bezel replacement.',
      turnaround: 'Within 2 Hours',
      badge: 'OEM Genuine'
    },
    {
      title: 'High-Speed NVMe SSD & RAM Upgrade',
      desc: 'Transform slow or freezing computers into superfast workstations with PCIe Gen4/Gen5 NVMe SSDs and DDR4/DDR5 RAM upgrades with zero data loss.',
      turnaround: '30 Minutes',
      badge: '5x Speed Boost'
    },
    {
      title: 'Windows 11 OS Installation & Virus Cleanup',
      desc: 'Genuine Windows OS setup, driver optimizations, MS Office activation, deep malware/ransomware eradication, and secure system tuning.',
      turnaround: 'Within 1 Hour',
      badge: '100% Clean'
    },
    {
      title: 'Hard Disk & SSD Data Recovery',
      desc: 'Cleanroom recovery for corrupted, clicking, formatted, or dead HDDs, external drives, and SSDs with strict enterprise privacy NDA.',
      turnaround: '1 - 2 Days',
      badge: 'High Success Rate'
    },
    {
      title: 'Custom Gaming PC & Workstation Repair',
      desc: 'Thermal throttling fixes, liquid cooler coolant refills, GPU artifact diagnostics, power supply testing, and cable management.',
      turnaround: 'Same Day',
      badge: 'Pro Gamers'
    },
  ];

  const localAreas = [
    'Bapunagar',
    'Shyam Shikhar',
    'Shayona Arcade',
    'Nikol',
    'Naroda',
    'Odhav',
    'Vastral',
    'Krishnanagar',
    'India Colony',
    'Maninagar',
    'Ghanshyam Nagar',
    'Virat Nagar',
    'Amraiwadi',
    'Memnagar',
    'SG Highway',
    'Ahmedabad East & West'
  ];

  const faqs = [
    {
      q: 'Where is your computer repair shop located near me?',
      a: `Our official store and service center is centrally located at **${STORE_ADDRESS}**. You can walk in directly or request doorstep pickup across Ahmedabad.`
    },
    {
      q: 'Do you offer doorstep computer and laptop repair in Ahmedabad?',
      a: 'Yes! We provide on-site doorstep visits for both homes and offices in Bapunagar, Nikol, Naroda, Odhav, Vastral, and all surrounding areas of Ahmedabad.'
    },
    {
      q: 'How long does a laptop repair or SSD upgrade take?',
      a: 'Most common repairs like SSD upgrades, RAM installations, OS installations, and screen replacements are completed in 30 to 90 minutes. Chip-level motherboard repairs usually take between 4 to 24 hours.'
    },
    {
      q: 'Which laptop and computer brands do you repair?',
      a: 'We service all major brands including ASUS (ROG & TUF), Dell (Inspiron, XPS, Alienware), HP (Pavilion, Omen, Envy), Lenovo (ThinkPad, Legion), Acer, Apple MacBook, MSI, and custom-assembled desktop PCs.'
    },
    {
      q: 'Is there any warranty on repair and replacement parts?',
      a: 'Yes! We provide up to 90 days service warranty on motherboard repair, and up to 3 to 5 years manufacturer warranty on new replacement parts like SSDs, RAM, and power supplies.'
    },
    {
      q: 'What are your computer repair store working hours?',
      a: 'We are open Monday to Saturday from 10:00 AM to 8:00 PM, and on Sunday from 10:00 AM to 2:00 PM.'
    }
  ];

  const handleWhatsAppBooking = (serviceName: string) => {
    const text = `Hello Evolution Infotech!\nI need to book *${serviceName}* for my computer/laptop.\n\nMy Area/Location in Ahmedabad: `;
    window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* Local SEO Schema Structured Data JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'Evolution Infotech - Computer & Laptop Repair Shop Ahmedabad',
              image: 'https://evolutioninfotech.in/images/logo-transparent.png',
              '@id': 'https://evolutioninfotech.in/computer-repair-shop-near-me',
              url: 'https://evolutioninfotech.in/computer-repair-shop-near-me',
              telephone: '+91918401945508',
              priceRange: '₹₹',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '116, Shayona Arcade, Shyam Shikhar',
                addressLocality: 'Bapunagar, Ahmedabad',
                addressRegion: 'Gujarat',
                postalCode: '380024',
                addressCountry: 'IN'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 23.0385,
                longitude: 72.6315
              },
              openingHoursSpecification: [
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                  opens: '10:00',
                  closes: '20:00'
                },
                {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: 'Sunday',
                  opens: '10:00',
                  closes: '14:00'
                }
              ],
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '248'
              }
            })
          }}
        />

        {/* Hero Section */}
        <section style={{
          padding: '50px 0 60px 0',
          background: 'radial-gradient(ellipse at top, rgba(6, 182, 212, 0.15), rgba(8, 12, 20, 0.95))',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div className="container">
            <div style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
              
              {/* Trust Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 16px',
                borderRadius: '9999px',
                background: 'rgba(6, 182, 212, 0.12)',
                border: '1px solid rgba(6, 182, 212, 0.35)',
                color: '#38bdf8',
                fontSize: '0.82rem',
                fontWeight: 800,
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
                marginBottom: '18px'
              }}>
                <Sparkles size={15} /> #1 RATED COMPUTER REPAIR SHOP IN AHMEDABAD
              </div>

              {/* Main H1 SEO Title */}
              <h1 style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.18,
                letterSpacing: '-0.5px'
              }}>
                Fast, Reliable <span className="text-gradient">Computer Repair Shop Near You</span> in Ahmedabad
              </h1>

              {/* High-Intent SEO Subtitle */}
              <p style={{
                fontSize: '1.1rem',
                color: '#94a3b8',
                marginTop: '16px',
                lineHeight: 1.6
              }}>
                Looking for professional **laptop repair, chip-level motherboard fixing, SSD upgrades, or doorstep PC service**? Visit **Evolution Infotech** at Shyam Shikhar, Bapunagar, Ahmedabad or get instant doorstep assistance.
              </p>

              {/* Key Selling Badges */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '12px',
                marginTop: '24px'
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid #10b981', color: '#34d399', padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700 }}>
                  <CheckCircle2 size={15} /> Same-Day 30 Min Express Service
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(59, 130, 246, 0.12)', border: '1px solid #3b82f6', color: '#60a5fa', padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700 }}>
                  <ShieldCheck size={15} /> 100% Genuine Replacement Parts
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid #f59e0b', color: '#fbbf24', padding: '6px 14px', borderRadius: '8px', fontSize: '0.82rem', fontWeight: 700 }}>
                  <Star size={15} fill="#fbbf24" /> 4.9/5 Star Rating (248+ Reviews)
                </span>
              </div>

              {/* Call to Actions */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                marginTop: '32px'
              }}>
                <button
                  onClick={() => handleWhatsAppBooking('Emergency Computer / Laptop Repair')}
                  style={{
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '14px 28px',
                    fontSize: '1rem',
                    fontWeight: 800,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.4)',
                    transition: 'transform 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <MessageCircle size={22} /> Book Repair on WhatsApp (Instant)
                </button>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(6, 182, 212, 0.4)',
                    color: '#38bdf8',
                    borderRadius: '14px',
                    padding: '14px 24px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  <Navigation size={18} /> Open Store Location in Google Maps
                </a>
              </div>

            </div>
          </div>
        </section>

        {/* Quick Contact & Store Banner */}
        <section style={{ padding: '24px 0', background: '#0b1120', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="container">
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                    STORE & REPAIR WORKSHOP
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                    {STORE_ADDRESS}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase' }}>
                    DIRECT HELPLINE
                  </div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#10b981', marginTop: '2px' }}>
                    {WHATSAPP_DISPLAY_PHONE}
                  </div>
                </div>

                <a
                  href={`tel:${WHATSAPP_PHONE_NUMBER}`}
                  style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#ffffff',
                    padding: '10px 18px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Phone size={16} /> Call Now
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Repair Services Grid */}
        <section style={{ padding: '60px 0' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ fontSize: '0.82rem', color: '#06b6d4', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                COMPLETE HARDWARE & SOFTWARE SOLUTIONS
              </div>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>
                Our Specialized Computer & Laptop Repair Services
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '10px auto 0 auto' }}>
                We repair all computer issues from simple software formatting to microscopic motherboard chip-level reballing.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {repairServices.map((srv, idx) => (
                <div
                  key={idx}
                  style={{
                    background: '#0f172a',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '20px',
                    padding: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                      <span style={{
                        background: 'rgba(6, 182, 212, 0.15)',
                        border: '1px solid rgba(6, 182, 212, 0.3)',
                        color: '#38bdf8',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: 800
                      }}>
                        {srv.badge}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#94a3b8', fontSize: '0.78rem' }}>
                        <Clock size={14} color="#10b981" /> {srv.turnaround}
                      </div>
                    </div>

                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', lineHeight: 1.3 }}>
                      {srv.title}
                    </h3>

                    <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '10px', lineHeight: 1.6 }}>
                      {srv.desc}
                    </p>
                  </div>

                  <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <button
                      onClick={() => handleWhatsAppBooking(srv.title)}
                      style={{
                        width: '100%',
                        background: 'rgba(6, 182, 212, 0.12)',
                        border: '1px solid rgba(6, 182, 212, 0.35)',
                        color: '#38bdf8',
                        borderRadius: '10px',
                        padding: '10px',
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, #06b6d4, #3b82f6)';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(6, 182, 212, 0.12)';
                        e.currentTarget.style.color = '#38bdf8';
                      }}
                    >
                      <Wrench size={16} /> Book This Repair <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Local Areas Coverage Section (For Rank #1 Local Search) */}
        <section style={{ padding: '50px 0', background: '#0b1120', borderTop: '1px solid rgba(255, 255, 255, 0.06)', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                Areas We Serve in Ahmedabad (Doorstep & Walk-In)
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '6px' }}>
                Our service engineers cover the entire Ahmedabad region for urgent on-site PC & laptop support:
              </p>
            </div>

            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              justifyContent: 'center',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {localAreas.map((area, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#e2e8f0',
                    padding: '8px 16px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <MapPin size={13} color="#06b6d4" /> {area}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section style={{ padding: '60px 0' }}>
          <div className="container">
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                <h3 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff' }}>
                  Frequently Asked Questions (FAQ)
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '6px' }}>
                  Everything you need to know about our computer repair process, pricing, and warranties.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      style={{
                        background: '#0f172a',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        borderRadius: '16px',
                        overflow: 'hidden'
                      }}
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        style={{
                          width: '100%',
                          padding: '18px 22px',
                          background: 'transparent',
                          border: 'none',
                          color: '#ffffff',
                          fontSize: '1.02rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textAlign: 'left',
                          cursor: 'pointer'
                        }}
                      >
                        <span>{faq.q}</span>
                        {isOpen ? <ChevronUp size={18} color="#06b6d4" /> : <ChevronDown size={18} color="#94a3b8" />}
                      </button>

                      {isOpen && (
                        <div style={{
                          padding: '0 22px 18px 22px',
                          color: '#94a3b8',
                          fontSize: '0.92rem',
                          lineHeight: 1.6,
                          borderTop: '1px solid rgba(255, 255, 255, 0.04)',
                          paddingTop: '14px'
                        }}>
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Emergency Banner */}
              <div style={{
                marginTop: '40px',
                padding: '30px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(16, 185, 129, 0.15))',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                textAlign: 'center'
              }}>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                  Need Immediate Computer or Laptop Repair?
                </h4>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginTop: '6px' }}>
                  Speak directly with our senior engineer now for a quick diagnosis & estimate.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '18px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handleWhatsAppBooking('Emergency Urgent PC Repair')}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      border: 'none',
                      padding: '12px 24px',
                      borderRadius: '12px',
                      fontSize: '0.95rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <MessageCircle size={18} /> WhatsApp Hotline: {WHATSAPP_DISPLAY_PHONE}
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

      </main>

      <Footer />

      {isInquiryModalOpen && (
        <ServiceInquiryModal
          isOpen={isInquiryModalOpen}
          onClose={() => setIsInquiryModalOpen(false)}
          initialService={selectedService}
        />
      )}
    </div>
  );
}
