'use client';

import React from 'react';
import Link from 'next/link';
import {
  Cpu,
  Mail,
  Phone,
  MapPin,
  Code2,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import {
  WHATSAPP_PHONE_NUMBER,
  WHATSAPP_DISPLAY_PHONE,
  SUPPORT_EMAIL,
  COMPANY_NAME,
  STORE_ADDRESS,
  GOOGLE_MAPS_URL,
  getCustomWhatsAppUrl
} from '@/utils/whatsapp';
import BrandLogo from './BrandLogo';

export default function Footer() {
  return (
    <footer style={{
      background: '#070a10',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '45px',
      paddingBottom: '30px',
      marginTop: '60px'
    }}>
      <div className="container">

        {/* Main 4 Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '40px'
        }}>
          {/* Column 1: Brand Info & Contact */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <BrandLogo size="md" showSubtitle={true} />

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              Your trusted partner for genuine IT hardware, laptop & computer repairs, networking, and technology solutions in Ahmedabad.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="#10b981" />
                <strong style={{ color: '#ffffff' }}>{WHATSAPP_DISPLAY_PHONE}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="#06b6d4" />
                <span>{SUPPORT_EMAIL}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <MapPin size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#cbd5e1', textDecoration: 'none', lineHeight: 1.4 }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#cbd5e1')}
                >
                  {STORE_ADDRESS}
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Hardware Products */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Hardware Products
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <Link href="/products?category=laptop" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Laptop
              </Link>
              <Link href="/products?category=desktop" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Desktop
              </Link>
              <Link href="/products?category=printer" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Printer
              </Link>
              <Link href="/products?category=network" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Network
              </Link>
              <Link href="/products?category=cctv" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                CCTV
              </Link>
              <Link href="/products?category=accessories" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Accessories
              </Link>
            </div>
          </div>

          {/* Column 3: IT Services & AMC */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              IT Services & Repair
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <a
                href={getCustomWhatsAppUrl('Laptop Motherboard Chip Repair', 'Hello Evolution Infotech! I need laptop motherboard / chip repair service.')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Laptop Motherboard Chip Repair
              </a>
              <a
                href={getCustomWhatsAppUrl('Yearly AMC Maintenance Contract', 'Hello Evolution Infotech! I want a quote for corporate yearly AMC IT support.')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Yearly AMC Maintenance Contract
              </a>
              <a
                href={getCustomWhatsAppUrl('Office Networking & WiFi Setup', 'Hello Evolution Infotech! I need office networking, router & server rack setup.')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Office Networking & WiFi Setup
              </a>
              <a
                href={getCustomWhatsAppUrl('Printer Repair & Cartridge Refill', 'Hello Evolution Infotech! I need printer repair / toner refill service.')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Printer Repair & Cartridge Refill
              </a>
              <a
                href={getCustomWhatsAppUrl('Software & Windows Installation', 'Hello Evolution Infotech! I need licensed software / Windows OS installation.')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}
              >
                Software & Windows Installation
              </a>
            </div>
          </div>

          {/* Column 4: Software & Dev Inquiries (Clean Direct WhatsApp Action) */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Code2 size={16} /> Software & Dev Inquiries
            </h4>

            <a
              href={getCustomWhatsAppUrl('Software & Mobile App Project Inquiry', 'Hello Evolution Infotech! I want to consult and get a quote for custom software / website / mobile app development.')}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                padding: '13px 18px',
                fontSize: '0.92rem',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)',
                width: '100%',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <MessageCircle size={18} /> Inquire for Software
            </a>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '20px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>
            &copy; {new Date().getFullYear()} <strong>{COMPANY_NAME}</strong>. All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <Link href="/privacy-policy" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Privacy Policy</Link>
            <Link href="/terms-of-service" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
