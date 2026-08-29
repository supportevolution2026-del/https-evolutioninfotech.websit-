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
        return <Laptop size={30} color="#06b6d4" />;
      case 'desktop':
        return <Monitor size={30} color="#3b82f6" />;
      case 'printer':
        return <Printer size={30} color="#f43f5e" />;
      case 'network':
        return <Globe size={30} color="#10b981" />;
      case 'cctv':
        return <Camera size={30} color="#f59e0b" />;
      case 'accessories':
        return <Wrench size={30} color="#8b5cf6" />;
      default:
        return <Laptop size={30} color="#06b6d4" />;
    }
  };

  return (
    <section style={{ padding: '36px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#06b6d4', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              HARDWARE CATEGORIES
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '4px' }}>
              Shop by Category
            </h2>
          </div>

          <Link href="/products" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#38bdf8',
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
                background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.8) 0%, rgba(8, 12, 20, 0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '12px',
                boxShadow: '0 8px 20px rgba(0, 0, 0, 0.3)'
              }}>
                {getCategoryIcon(cat.slug)}
              </div>

              <h3 style={{ fontSize: '1.02rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
