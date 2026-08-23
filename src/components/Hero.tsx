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
  Headphones
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
    <section style={{ position: 'relative', overflow: 'hidden', padding: '30px 0 50px 0' }}>
      {/* Glow Ambient Lights */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        left: '15%',
        width: '500px',
        height: '500px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6, 182, 212, 0.15), transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '10%',
        width: '450px',
        height: '450px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15), transparent 70%)',
        filter: 'blur(60px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Main Hero Card */}
        <div style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(8, 12, 20, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(6, 182, 212, 0.15)',
          padding: '40px 30px',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-cyan" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={14} /> {slide.badge}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 600 }}>
                  EVOLUTION INFOTECH PVT LTD
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 900,
                lineHeight: 1.15,
                letterSpacing: '-1px',
                color: '#ffffff'
              }}>
                {slide.title}
              </h1>

              <p style={{
                fontSize: '1.05rem',
                color: '#94a3b8',
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

              {/* Verified Domain Seal */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#64748b', marginTop: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                Verified Next-Gen Portal &bull; <strong>evolutioninfotech.in</strong>
              </div>
            </div>

            {/* Right Visual Image */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxWidth: '460px',
                height: '320px',
                borderRadius: '18px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(6, 182, 212, 0.3)'
              }}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(8, 12, 20, 0.8) 0%, transparent 60%)'
                }} />
              </div>
            </div>
          </div>

          {/* Slide Navigation Dots & Arrows */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)'
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
                    backgroundColor: currentSlide === idx ? '#06b6d4' : 'rgba(255, 255, 255, 0.2)',
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
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
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
          marginTop: '24px'
        }}>
          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4' }}>
              <Truck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>Express Delivery</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Free above ₹5,000 pan-India</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
              <ShieldCheck size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>100% Genuine Tech</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Direct manufacturer warranty</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
              <Server size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>Enterprise IT Stacks</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>B2B invoicing & GST credit</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
              <Headphones size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f8fafc' }}>24/7 Expert Support</div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Dedicated IT engineers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
