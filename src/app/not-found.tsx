'use client';

import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
        <div
          className="glass-panel"
          style={{
            maxWidth: '520px',
            width: '100%',
            padding: '40px 30px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '18px'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(6, 182, 212, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#06b6d4'
            }}
          >
            <Search size={36} />
          </div>

          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
            404
          </h1>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#f8fafc' }}>
            Page Not Found
          </h2>

          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
            The hardware product or page you are looking for might have been moved or is temporarily unavailable.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <Home size={16} /> Return Home
            </Link>
            <Link href="/products" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
              <ArrowLeft size={16} /> Browse Products
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
