'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function BrandMarquee() {
  const brandList = [
    {
      name: 'NVIDIA RTX',
      color: '#76b900',
      logo: (
        <svg width="22" height="18" viewBox="0 0 24 24" fill="#76b900">
          <path d="M8.9 4C5.1 4.5 2 7.7 2 11.6c0 4.3 3.5 7.8 7.8 7.8 2.2 0 4.2-.9 5.6-2.4l-2.4-1.9c-.9 1-2 1.6-3.2 1.6-2.8 0-5.1-2.3-5.1-5.1 0-2.4 1.7-4.4 4-4.9l.2-2.7zm3.8 2.5c-2.4 0-4.3 1.9-4.3 4.3 0 1.6.9 3 2.2 3.8l1.4-1.9c-.4-.5-.6-1.1-.6-1.9 0-1.1.9-2 2-2 .8 0 1.5.5 1.8 1.2l2.3-.9c-.7-1.5-2.6-2.6-4.8-2.6zm3.9-3.2C14.7 3.1 12.8 3 10.7 3 5 3 .4 7.6.4 13.3c0 5.7 4.6 10.3 10.3 10.3 4.7 0 8.7-3.1 9.9-7.4l-3-1.6c-.8 2.6-3.2 4.5-6.1 4.5-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5c1.8 0 3.4.7 4.6 1.9l2.4-2.4c-1.8-1.7-4.1-2.8-6.7-2.8z" />
        </svg>
      )
    },
    {
      name: 'ASUS ROG',
      color: '#ff0033',
      logo: (
        <svg width="22" height="18" viewBox="0 0 24 24" fill="#ff0033">
          <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l-8-4v9l8 4 8-4v-9l-8 4z" />
        </svg>
      )
    },
    {
      name: 'DELL ENTERPRISE',
      color: '#007db8',
      logo: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#007db8" strokeWidth="2.5" />
          <text x="5" y="16" fill="#007db8" fontSize="11" fontWeight="900" fontFamily="sans-serif">DELL</text>
        </svg>
      )
    },
    {
      name: 'INTEL CORE ULTRA',
      color: '#0071c5',
      logo: (
        <svg width="22" height="18" viewBox="0 0 24 24" fill="#0071c5">
          <path d="M3 5h18v14H3V5zm2 2v10h14V7H5zm3 2h3v6H8V9zm5 0h3v6h-3V9z" />
        </svg>
      )
    },
    {
      name: 'UBIQUITI UNIFI',
      color: '#0559C9',
      logo: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="3" width="18" height="18" rx="4" fill="#0559C9" />
          <path d="M8 8v8h8V8H8zm2 2h4v4h-4v-4z" fill="#ffffff" />
        </svg>
      )
    },
    {
      name: 'MICROSOFT 365',
      color: '#00a4ef',
      logo: (
        <svg width="18" height="18" viewBox="0 0 24 24">
          <rect x="1" y="1" width="10" height="10" fill="#f25022" />
          <rect x="13" y="1" width="10" height="10" fill="#7fba00" />
          <rect x="1" y="13" width="10" height="10" fill="#00a4ef" />
          <rect x="13" y="13" width="10" height="10" fill="#ffb900" />
        </svg>
      )
    },
    {
      name: 'HP ENTERPRISE',
      color: '#0096D6',
      logo: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#0096D6" />
          <text x="6" y="16" fill="#ffffff" fontSize="11" fontWeight="900" fontFamily="sans-serif">hp</text>
        </svg>
      )
    },
    {
      name: 'SAMSUNG OLED',
      color: '#1428A0',
      logo: (
        <svg width="22" height="18" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="11" ry="7" stroke="#2563eb" strokeWidth="2" />
          <text x="3.5" y="15" fill="#2563eb" fontSize="8" fontWeight="800" fontFamily="sans-serif">SAMSUNG</text>
        </svg>
      )
    },
    {
      name: 'CISCO NETWORKING',
      color: '#1BA0D7',
      logo: (
        <svg width="22" height="18" viewBox="0 0 24 24" fill="#1BA0D7">
          <rect x="2" y="10" width="2" height="8" rx="1" />
          <rect x="6" y="6" width="2" height="12" rx="1" />
          <rect x="10" y="3" width="2" height="15" rx="1" />
          <rect x="14" y="6" width="2" height="12" rx="1" />
          <rect x="18" y="10" width="2" height="8" rx="1" />
        </svg>
      )
    },
    {
      name: 'CRUCIAL MICRON',
      color: '#00629B',
      logo: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect x="2" y="4" width="20" height="16" rx="3" fill="#00629B" />
          <text x="4" y="16" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif">crucial</text>
        </svg>
      )
    },
    {
      name: 'CP PLUS CCTV',
      color: '#E31E24',
      logo: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#E31E24" />
          <text x="5.5" y="15" fill="#ffffff" fontSize="9" fontWeight="900" fontFamily="sans-serif">CP+</text>
        </svg>
      )
    },
    {
      name: 'HIKVISION 4K',
      color: '#EE1C25',
      logo: (
        <svg width="22" height="18" viewBox="0 0 24 24" fill="#EE1C25">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm0-8c-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3-1.3-3-3-3z" />
        </svg>
      )
    }
  ];

  return (
    <section style={{
      padding: '24px 0',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
      background: '#ffffff'
    }}>
      <div className="container" style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={14} color="#0284c7" /> AUTHORIZED ENTERPRISE HARDWARE & OEM PARTNERS
        </span>
      </div>

      <div className="marquee-container">
        <div className="marquee-content">
          {brandList.map((brand, i) => (
            <div
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.9rem',
                fontWeight: 800,
                letterSpacing: '0.4px',
                color: '#0f172a',
                padding: '8px 20px',
                borderRadius: '9999px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: 'var(--shadow-sm)',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#93c5fd';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {brand.logo}
              </span>
              <span>{brand.name}</span>
            </div>
          ))}
        </div>

        <div className="marquee-content" aria-hidden="true">
          {brandList.map((brand, i) => (
            <div
              key={`dup-${i}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                fontSize: '0.9rem',
                fontWeight: 800,
                letterSpacing: '0.4px',
                color: '#0f172a',
                padding: '8px 20px',
                borderRadius: '9999px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: 'var(--shadow-sm)',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#93c5fd';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {brand.logo}
              </span>
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
