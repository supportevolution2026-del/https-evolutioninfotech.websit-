'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { heroSlides } from '@/data/products';
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Truck,
  Server,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Headphones,
  Sparkles
} from 'lucide-react';

export default function Hero({ onOpenQuoteModal }: { onOpenQuoteModal?: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <section style={{ position: 'relative', overflow: 'hidden', padding: '24px 0 40px 0' }}>
      {/* Subtle Ambient Radial Lighting */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '20%',
        width: '550px',
        height: '550px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(14, 165, 233, 0.12), transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '15%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1), transparent 70%)',
        filter: 'blur(50px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main Hero Card */}
        <div style={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #f0f9ff 100%)',
          border: '1px solid #e2e8f0',
          boxShadow: '0 20px 48px -12px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(0,0,0,0.05)',
          padding: '44px 36px',
          minHeight: '480px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}>
            {/* Left Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem' }}>
                  <Zap size={14} /> {slide.badge}
                </span>
                <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px' }}>
                  EVOLUTION INFOTECH PVT LTD
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-1px',
                color: '#0f172a'
              }}>
                {slide.title}
              </h1>

              <p style={{
                fontSize: '1.05rem',
                color: '#475569',
                lineHeight: 1.6,
                maxWidth: '520px'
              }}>
                {slide.subtitle}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '10px' }}>
                <Link href={slide.ctaLink} className="btn-primary" style={{ fontSize: '1rem', padding: '14px 28px' }}>
                  {slide.ctaText} <ArrowRight size={18} />
                </Link>

                {slide.secondaryLink === '/contact' && onOpenQuoteModal ? (
                  <button
                    onClick={onOpenQuoteModal}
                    className="btn-secondary"
                    style={{ fontSize: '1rem', padding: '14px 24px' }}
                  >
                    {slide.secondaryText}
                  </button>
                ) : (
                  <Link href={slide.secondaryLink} className="btn-secondary" style={{ fontSize: '1rem', padding: '14px 24px' }}>
                    {slide.secondaryText}
                  </Link>
                )}
              </div>
            </div>

            {/* Right Visual Image */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '480px',
                height: '320px',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.15)',
                border: '1px solid #e2e8f0',
                background: '#ffffff'
              }}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.25) 0%, transparent 60%)'
                }} />
              </div>
            </div>
          </div>

          {/* Slide Navigation Dots & Arrows */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '32px',
            paddingTop: '20px',
            borderTop: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              {heroSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  style={{
                    width: currentSlide === idx ? '32px' : '10px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: currentSlide === idx ? '#2563eb' : '#cbd5e1',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2563eb';
                  e.currentTarget.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.color = '#0f172a';
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#2563eb';
                  e.currentTarget.style.color = '#2563eb';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#e2e8f0';
                  e.currentTarget.style.color = '#0f172a';
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Badges Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginTop: '20px'
        }}>
          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb' }}>
              <Truck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>Express Delivery</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Free above ₹5,000 pan-India</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>100% Genuine Tech</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Direct manufacturer warranty</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
              <Server size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>Enterprise IT Stacks</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>B2B invoicing & GST credit</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <Headphones size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>24/7 Expert Support</div>
              <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Dedicated IT engineers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
