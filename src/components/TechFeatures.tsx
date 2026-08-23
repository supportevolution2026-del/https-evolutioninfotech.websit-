'use client';

import React from 'react';
import {
  ShieldCheck,
  Cpu,
  Truck,
  RotateCcw,
  Headphones,
  Award,
  CreditCard,
  Building
} from 'lucide-react';

export default function TechFeatures() {
  const features = [
    {
      icon: <Award size={26} color="#06b6d4" />,
      title: 'Authorized Channel Partner',
      desc: 'Direct partner for ASUS ROG, Dell, NVIDIA, Intel, Samsung & Ubiquiti.'
    },
    {
      icon: <Truck size={26} color="#10b981" />,
      title: 'Pan-India Express Logistics',
      desc: 'Secure foam-cushioned transit with full transit insurance coverage.'
    },
    {
      icon: <CreditCard size={26} color="#8b5cf6" />,
      title: 'Flexible & Secure Payments',
      desc: 'UPI, Credit Cards, NetBanking, No-Cost EMI & Corporate Net-30 Terms.'
    },
    {
      icon: <Building size={26} color="#f59e0b" />,
      title: 'GST Input Tax Invoicing',
      desc: 'Claim up to 18% GST input credit on all corporate & business hardware purchases.'
    }
  ];

  return (
    <section style={{ padding: '40px 0', borderTop: '1px solid rgba(255, 255, 255, 0.05)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
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
                gap: '16px'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {item.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f8fafc', marginBottom: '6px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.5 }}>
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
