'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BrandMarquee from '@/components/BrandMarquee';
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import TechFeatures from '@/components/TechFeatures';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import B2BQuoteModal from '@/components/B2BQuoteModal';
import { useProducts } from '@/hooks/useProducts';
import {
  ArrowRight,
  Flame,
  Sparkles,
  Zap,
  Cpu,
  ShieldCheck,
  Server,
  Code2
} from 'lucide-react';

export default function HomePage() {
  const { products, loading } = useProducts();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const featuredProducts = products;
  const bestSellers = products;
  const dealOfTheDay = products.length > 0 ? products[0] : null;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main style={{ flex: 1 }}>
        {/* Hero Showcase */}
        <Hero onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

        {/* Animated Brand Marquee */}
        <BrandMarquee />

        {/* Hardware Categories */}
        <CategoryBar />

        {/* Featured Hardware Section */}
        <section style={{ padding: '40px 0 60px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#0284c7', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  <Sparkles size={16} /> TOP RECOMMENDED
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
                  Featured AI & Enterprise Tech
                </h2>
              </div>

              <Link href="/products" className="btn-outline-cyan" style={{ fontSize: '0.88rem' }}>
                View All Catalog <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Deal of the Day Banner Spotlight */}
        {dealOfTheDay && (
          <section style={{ padding: '30px 0 60px 0' }}>
            <div className="container">
              <div style={{
                borderRadius: '28px',
                background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 50%, #f0fdf4 100%)',
                border: '1.5px solid #bfdbfe',
                padding: '44px 40px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '40px',
                alignItems: 'center',
                boxShadow: '0 20px 48px -12px rgba(37, 99, 235, 0.12), 0 4px 16px rgba(0,0,0,0.04)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Flame size={14} /> DEAL OF THE DAY
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#15803d', fontWeight: 800 }}>
                      SAVE {dealOfTheDay.discountPercent}% TODAY
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.2 }}>
                    {dealOfTheDay.name}
                  </h3>

                  <p style={{ fontSize: '0.98rem', color: '#475569', marginTop: '12px', lineHeight: 1.6 }}>
                    {dealOfTheDay.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginTop: '20px' }}>
                    <span style={{ fontSize: '2.4rem', fontWeight: 900, color: '#2563eb' }}>
                      ₹{dealOfTheDay.price.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '1.25rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                      ₹{dealOfTheDay.originalPrice.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '24px' }}>
                    <Link href={`/products/${dealOfTheDay.slug}`} className="btn-primary" style={{ padding: '12px 28px', fontSize: '1rem' }}>
                      Claim Exclusive Deal <ArrowRight size={18} />
                    </Link>
                    <button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="btn-secondary"
                      style={{ padding: '12px 20px', fontSize: '0.95rem' }}
                    >
                      Inquire Bulk Quantity
                    </button>
                  </div>
                </div>

                <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                  <div style={{
                    width: '100%',
                    maxWidth: '440px',
                    height: '300px',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid #e2e8f0',
                    boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.15)',
                    background: '#ffffff'
                  }}>
                    <img
                      src={dealOfTheDay.image}
                      alt={dealOfTheDay.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Best Sellers Grid */}
        <section style={{ padding: '20px 0 60px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: '#16a34a', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  POPULAR WITH DEVELOPERS & BUSINESSES
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
                  Best Selling Hardware & Components
                </h2>
              </div>

              <Link href="/products" className="btn-outline-cyan" style={{ fontSize: '0.88rem' }}>
                View All <ArrowRight size={16} />
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {bestSellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Enterprise Services Callout */}
        <section style={{
          padding: '60px 0',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div className="container">
            <div className="glass-panel" style={{
              padding: '40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              alignItems: 'center',
              background: '#ffffff',
              border: '1.5px solid #bfdbfe'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0284c7', fontWeight: 800, fontSize: '0.82rem', textTransform: 'uppercase' }}>
                  <Server size={18} /> ENTERPRISE IT SOLUTIONS
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a', marginTop: '8px', lineHeight: 1.3 }}>
                  Need Custom Enterprise Hardware or Turnkey IT Setup?
                </h3>
                <p style={{ color: '#475569', fontSize: '0.94rem', marginTop: '10px', lineHeight: 1.6 }}>
                  Evolution Infotech deploys end-to-end datacenter infrastructure, Cisco networking, multi-GPU AI servers, and Microsoft cloud licenses for businesses across India.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '0.92rem', fontWeight: 600 }}>
                  <ShieldCheck size={18} color="#10b981" /> 100% Tax Deductible GST Invoicing
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '0.92rem', fontWeight: 600 }}>
                  <Zap size={18} color="#0284c7" /> Custom Rack & Blade Server Assembly
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#334155', fontSize: '0.92rem', fontWeight: 600 }}>
                  <Code2 size={18} color="#7c3aed" /> Annual IT Maintenance (AMC) Contracts
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="btn-primary"
                    style={{ padding: '12px 24px', fontSize: '0.92rem' }}
                  >
                    Request Enterprise Quote
                  </button>
                  <Link href="/services" className="btn-secondary" style={{ padding: '12px 20px', fontSize: '0.92rem' }}>
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Proposition Features */}
        <TechFeatures />

        {/* Testimonials */}
        <Testimonials />
      </main>

      <Footer />

      {/* Corporate Quote Modal */}
      <B2BQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
