'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error:', error);
  }, [error]);

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
              background: 'rgba(239, 68, 68, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ef4444'
            }}
          >
            <AlertTriangle size={36} />
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1.2 }}>
            Something went wrong
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6 }}>
            An unexpected error occurred while loading this section. Please try again or return to the homepage.
          </p>

          <div style={{ display: 'flex', gap: '12px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => reset()}
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <RotateCcw size={16} /> Try Again
            </button>
            <Link href="/" className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Home size={16} /> Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
