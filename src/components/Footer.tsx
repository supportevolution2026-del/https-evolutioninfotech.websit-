'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';
import {
  Cpu,
  Mail,
  Phone,
  MapPin,
  Send,
  ShieldCheck,
  Globe,
  Heart
} from 'lucide-react';

export default function Footer() {
  const { addToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      addToast({
        type: 'success',
        title: 'Subscribed Successfully!',
        message: 'You have been enrolled in exclusive Evolution Infotech hardware deal alerts.',
      });
      setEmail('');
    }
  };

  return (
    <footer style={{
      background: '#070a10',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingTop: '60px',
      paddingBottom: '30px',
      marginTop: '60px'
    }}>
      <div className="container">
        {/* Main 4 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(6, 182, 212, 0.4)'
              }}>
                <Cpu size={20} color="#ffffff" />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                EVOLUTION <span style={{ color: '#06b6d4' }}>INFOTECH</span>
              </span>
            </div>

            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
              India&apos;s leading next-gen enterprise IT hardware, custom AI rigs, networking infrastructure and licensed software solutions provider.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Globe size={15} color="#06b6d4" />
                <a href="https://evolutioninfotech.in" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none' }}>
                  https://evolutioninfotech.in
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Mail size={15} color="#06b6d4" />
                <span>sales@evolutioninfotech.in</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Phone size={15} color="#06b6d4" />
                <span>+91 98790 12345 / +91 (0261) 2233445</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={15} color="#06b6d4" />
                <span>Infotech Tower, Ring Road, Gujarat, India</span>
              </div>
            </div>
          </div>

          {/* Quick Hardware Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Hardware Catalog
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <Link href="/products?category=laptops-desktops" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                AI Laptops & Workstations
              </Link>
              <Link href="/products?category=pc-components" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                NVIDIA GeForce RTX GPUs
              </Link>
              <Link href="/products?category=networking-servers" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                Enterprise Dell & HP Servers
              </Link>
              <Link href="/products?category=storage-memory" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                PCIe Gen5 NVMe Storage
              </Link>
              <Link href="/products?category=peripherals-accessories" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }}>
                4K OLED Curved Displays
              </Link>
            </div>
          </div>

          {/* Corporate & Services */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Corporate & IT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
              <Link href="/services" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Corporate IT Infrastructure
              </Link>
              <Link href="/services" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Datacenter & Server Setup
              </Link>
              <Link href="/services" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Microsoft 365 & Cloud Migration
              </Link>
              <Link href="/track-order" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                Track Order & Consignment
              </Link>
              <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>
                GST Invoicing & B2B Purchase
              </Link>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div>
            <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Tech Intelligence & Deals
            </h4>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '12px', lineHeight: 1.5 }}>
              Subscribe to receive instant notifications on next-gen hardware drops and wholesale corporate offers.
            </p>

            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                style={{ fontSize: '0.82rem', padding: '10px 12px' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '10px 16px', flexShrink: 0 }}>
                <Send size={16} />
              </button>
            </form>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: '#64748b', marginTop: '10px' }}>
              <ShieldCheck size={14} color="#10b981" /> No spam. Unsubscribe anytime.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          fontSize: '0.8rem',
          color: '#64748b'
        }}>
          <div>
            &copy; {new Date().getFullYear()} <strong>Evolution Infotech</strong> (evolutioninfotech.in). All Rights Reserved.
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</Link>
            <Link href="/contact" style={{ color: '#94a3b8', textDecoration: 'none' }}>Warranty & Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
