'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft, Mail, Phone, MapPin } from 'lucide-react';
import { COMPANY_NAME, WHATSAPP_PHONE_NUMBER, OFFICIAL_STORE_ADDRESS } from '@/utils/whatsapp';

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#020617' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '50px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', fontSize: '0.85rem' }}>
            <Link href="/" style={{ color: '#06b6d4', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ArrowLeft size={14} /> Home
            </Link>
            <span style={{ color: '#475569' }}>/</span>
            <span style={{ color: '#94a3b8' }}>Privacy Policy</span>
          </div>

          {/* Header Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.8))',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '20px',
            padding: '36px',
            marginBottom: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#06b6d4', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <ShieldCheck size={16} /> OFFICIAL PRIVACY POLICY
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#ffffff', marginTop: '8px', lineHeight: 1.2 }}>
              Privacy Policy & Data Protection
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginTop: '10px' }}>
              Last Updated: August 2026 &bull; Evolution Infotech ({COMPANY_NAME})
            </p>
          </div>

          {/* Content Body */}
          <div style={{
            background: '#0f172a',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '36px',
            display: 'flex',
            flexDirection: 'column',
            gap: '28px',
            color: '#cbd5e1',
            lineHeight: 1.7,
            fontSize: '0.95rem'
          }}>
            
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={18} color="#06b6d4" /> 1. Information We Collect
              </h2>
              <p>
                At <strong>{COMPANY_NAME}</strong>, we collect personal and business information necessary to fulfill hardware purchases, technical inquiries, and on-site repair services. This includes:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Personal Details:</strong> Full Name, Email Address, Phone / WhatsApp number.</li>
                <li><strong>Delivery & Billing:</strong> Shipping address, GST Number, and Business Name for tax-compliant invoicing.</li>
                <li><strong>Hardware Inquiries:</strong> Device serial numbers, specifications, and issue descriptions for computer repair services.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Lock size={18} color="#10b981" /> 2. How We Use Your Data
              </h2>
              <p>
                Your information is used strictly to deliver exceptional hardware products and IT solutions:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Processing and delivering orders for Laptops, Desktops, NVIDIA GPUs, Servers, and CCTV systems.</li>
                <li>Dispatching live order updates, tracking links, and GST invoices via WhatsApp and Email.</li>
                <li>Managing manufacturer warranty claims and express repair diagnostics.</li>
                <li>We <strong>never sell, rent, or trade</strong> your personal information to third-party advertisers.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color="#f59e0b" /> 3. Data Security & Storage
              </h2>
              <p>
                We implement industry-standard 256-bit SSL encryption for all data transmissions. Payment transactions are handled through secure, PCI-DSS certified payment gateways and direct bank channels. No credit card or UPI PINs are ever stored on our servers.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={18} color="#06b6d4" /> 4. Contact Our Data Privacy Team
              </h2>
              <p>
                For questions regarding your data or to request data removal, contact our official support desk:
              </p>
              <div style={{
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                marginTop: '12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.9rem'
              }}>
                <div><strong>Company:</strong> {COMPANY_NAME}</div>
                <div><strong>Address:</strong> {OFFICIAL_STORE_ADDRESS}</div>
                <div><strong>Email:</strong> support.evolution2026@gmail.com</div>
                <div><strong>WhatsApp Support:</strong> +91 918401945508</div>
              </div>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
