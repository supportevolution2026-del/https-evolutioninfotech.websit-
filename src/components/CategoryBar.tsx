'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import {
  ChevronRight,
  Laptop,
  Monitor,
  Printer,
  Globe,
  Camera,
  Wrench
} from 'lucide-react';

export default function CategoryBar() {
  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'laptop':
        return <Laptop size={28} color="#0284c7" />;
      case 'desktop':
        return <Monitor size={28} color="#2563eb" />;
      case 'printer':
        return <Printer size={28} color="#e11d48" />;
      case 'network':
        return <Globe size={28} color="#16a34a" />;
      case 'cctv':
        return <Camera size={28} color="#d97706" />;
      case 'accessories':
        return <Wrench size={28} color="#7c3aed" />;
      default:
        return <Laptop size={28} color="#0284c7" />;
    }
  };

  const getCategoryBg = (slug: string) => {
    switch (slug) {
      case 'laptop':
        return '#f0f9ff';
      case 'desktop':
        return '#eff6ff';
      case 'printer':
        return '#fff1f2';
      case 'network':
        return '#f0fdf4';
      case 'cctv':
        return '#fffbeb';
      case 'accessories':
        return '#f5f3ff';
      default:
        return '#f8fafc';
    }
  };

  return (
    <section style={{ padding: '36px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              HARDWARE CATEGORIES
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
              Shop by Category
            </h2>
          </div>

          <Link href="/products" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#2563eb',
            fontSize: '0.88rem',
            fontWeight: 700,
            textDecoration: 'none'
          }}>
            View All Hardware <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '16px'
        }}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="glass-card"
              style={{
                textDecoration: 'none',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '20px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: getCategoryBg(cat.slug),
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.3s ease'
              }}>
                {getCategoryIcon(cat.slug)}
              </div>

              <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
