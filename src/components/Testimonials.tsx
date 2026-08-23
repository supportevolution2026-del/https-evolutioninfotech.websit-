'use client';

import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Rajesh Patel',
      role: 'CTO, CyberTech Dynamics (Ahmedabad)',
      content: 'Evolution Infotech delivered 15 high-spec Dell PowerEdge rack servers & Ubiquiti network setup ahead of our datacenter launch. 100% genuine components with GST invoice.',
      rating: 5,
      product: 'Dell PowerEdge R760'
    },
    {
      name: 'Ananya Sharma',
      role: 'Lead 3D Animator (Mumbai)',
      content: 'Ordered the ASUS ROG Zephyrus G16 AI laptop with RTX 4080. Rendering blender scenes in real-time is unbelievable. Next-day delivery with impeccable wooden crating packaging!',
      rating: 5,
      product: 'ASUS ROG Zephyrus G16'
    },
    {
      name: 'Vikram Joshi',
      role: 'Founder, CloudStream Solutions (Surat)',
      content: 'We source all our company hardware, NVMe storage and Microsoft 365 licensing from evolutioninfotech.in. Unmatched pricing and dedicated account manager support.',
      rating: 5,
      product: 'Microsoft 365 & NVMe Storage'
    }
  ];

  return (
    <section style={{ padding: '60px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            TESTIMONIALS & TRUST
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#f8fafc', marginTop: '6px' }}>
            Trusted by 5,000+ Enterprises & Tech Enthusiasts
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px', color: '#fbbf24' }}>
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" />
                    ))}
                  </div>
                  <Quote size={20} color="rgba(6, 182, 212, 0.3)" />
                </div>

                <p style={{ fontSize: '0.9rem', color: '#cbd5e1', lineHeight: 1.6, fontStyle: 'italic' }}>
                  &ldquo;{rev.content}&rdquo;
                </p>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>
                    {rev.name}
                  </div>
                  <span title="Verified Customer" style={{ display: 'inline-flex' }}>
                    <CheckCircle2 size={15} color="#10b981" />
                  </span>
                </div>

                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                  {rev.role}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#06b6d4', marginTop: '6px', fontWeight: 600 }}>
                  Verified Purchase: {rev.product}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
