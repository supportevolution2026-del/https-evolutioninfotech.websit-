'use client';

import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { ChevronRight } from 'lucide-react';

export default function CategoryBar() {
  return (
    <section style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              HARDWARE CATEGORIES
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '4px' }}>
              Explore Technology Stacks
            </h2>
          </div>

          <Link href="/products" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: '#38bdf8',
            fontSize: '0.9rem',
            fontWeight: 600,
            textDecoration: 'none'
          }}>
            View All Categories <ChevronRight size={16} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category=${cat.slug}`}
              className="glass-card"
              style={{
                textDecoration: 'none',
                padding: '20px 16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div style={{
                position: 'relative',
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                overflow: 'hidden',
                marginBottom: '14px',
                border: '1px solid rgba(6, 182, 212, 0.3)'
              }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>
                {cat.name}
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 600 }}>
                {cat.itemCount}+ Products
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
