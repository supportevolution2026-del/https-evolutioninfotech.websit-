'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ShieldCheck, FileCheck, Truck, RotateCcw, ArrowLeft, Wrench, CheckCircle2 } from 'lucide-react';
import { COMPANY_NAME, OFFICIAL_STORE_ADDRESS } from '@/utils/whatsapp';

export default function TermsOfServicePage() {
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
            <span style={{ color: '#94a3b8' }}>Terms of Service</span>
          </div>

          {/* Header Card */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.8))',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '20px',
            padding: '36px',
            marginBottom: '32px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              <FileCheck size={16} /> TERMS & CONDITIONS
            </div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#ffffff', marginTop: '8px', lineHeight: 1.2 }}>
              Terms of Service
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginTop: '10px' }}>
              Effective: August 2026 &bull; Evolution Infotech ({COMPANY_NAME})
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
                <CheckCircle2 size={18} color="#10b981" /> 1. Genuine Hardware & Pricing
              </h2>
              <p>
                All products listed on <strong>{COMPANY_NAME}</strong> (including Laptops, Custom PC Desktops, NVIDIA RTX GPUs, Dell PowerEdge Servers, and Networking Racks) are 100% brand new, authentic, and sourced directly through authorized manufacturer channels.
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Prices are displayed in Indian National Rupees (INR ₹) inclusive of applicable taxes.</li>
                <li>Official GST Input Invoices are provided with every retail and corporate purchase.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={18} color="#06b6d4" /> 2. Delivery & Transit Protection
              </h2>
              <p>
                We provide express insured transit across Gujarat and Pan-India:
              </p>
              <ul style={{ paddingLeft: '20px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>Same-day / 24-hour dispatch for in-stock components and workstations.</li>
                <li>All shipments are foam-padded and insured against accidental in-transit damage.</li>
              </ul>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Wrench size={18} color="#f59e0b" /> 3. IT Support, AMC & Repair Services
              </h2>
              <p>
                Computer repairs, chip-level motherboard servicing, and Yearly AMC contracts executed at our Bapunagar service center ({OFFICIAL_STORE_ADDRESS}) are backed by our 30-day post-service warranty on replaced genuine parts.
              </p>
            </section>

            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <RotateCcw size={18} color="#ec4899" /> 4. Replacement & Return Policy
              </h2>
              <p>
                In the rare event of a dead-on-arrival (DOA) hardware unit or transit defect, customers may request a brand-new replacement within 7 days of delivery with the original packaging and serial number intact.
              </p>
            </section>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
