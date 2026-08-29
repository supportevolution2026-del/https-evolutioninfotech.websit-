'use client';

import React from 'react';
import {
  Award,
  Truck,
  CreditCard,
  Building
} from 'lucide-react';

export default function TechFeatures() {
  const features = [
    {
      icon: <Award size={26} color="#0284c7" />,
      bg: '#f0f9ff',
      title: 'Authorized Channel Partner',
      desc: 'Direct partner for ASUS ROG, Dell, NVIDIA, Intel, Samsung & Ubiquiti.'
    },
    {
      icon: <Truck size={26} color="#10b981" />,
      bg: '#ecfdf5',
      title: 'Pan-India Express Logistics',
      desc: 'Secure foam-cushioned transit with full transit insurance coverage.'
    },
    {
      icon: <CreditCard size={26} color="#7c3aed" />,
      bg: '#f5f3ff',
      title: 'Flexible & Secure Payments',
      desc: 'UPI, Credit Cards, NetBanking, No-Cost EMI & Corporate Net-30 Terms.'
    },
    {
      icon: <Building size={26} color="#f59e0b" />,
      bg: '#fffbeb',
      title: 'GST Input Tax Invoicing',
      desc: 'Claim up to 18% GST input credit on all corporate & business hardware purchases.'
    }
  ];

  return (
    <section style={{ padding: '40px 0', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', background: '#ffffff' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '24px'
        }}>
          {features.map((item, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '24px 20px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                boxShadow: 'var(--shadow-sm)'
              }}
            >
              <div style={{
                width: '52px',
                height: '52px',
                borderRadius: '14px',
                background: item.bg,
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
