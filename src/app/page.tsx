'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import TechFeatures from '@/components/TechFeatures';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import B2BQuoteModal from '@/components/B2BQuoteModal';
import { products } from '@/data/products';
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
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const featuredProducts = products.filter((p) => p.isFeatured);
  const bestSellers = products.filter((p) => p.isBestSeller);
  const dealOfTheDay = products.find((p) => p.isDealOfTheDay) || products[0];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main style={{ flex: 1 }}>
        {/* Hero Showcase */}
        <Hero onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

        {/* Hardware Categories */}
        <CategoryBar />

        {/* Featured Hardware Section */}
        <section style={{ padding: '40px 0 60px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '30px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  <Sparkles size={16} /> TOP RECOMMENDED
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
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
                borderRadius: '24px',
                background: 'radial-gradient(ellipse at 80% 50%, rgba(6, 182, 212, 0.2), rgba(15, 23, 42, 0.95)), #0b1120',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                padding: '40px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '40px',
                alignItems: 'center',
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.15)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span className="badge badge-amber" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Flame size={14} /> DEAL OF THE DAY
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700 }}>
                      SAVE {dealOfTheDay.discountPercent}% TODAY
                    </span>
                  </div>

                  <h3 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.2 }}>
                    {dealOfTheDay.name}
                  </h3>

                  <p style={{ fontSize: '0.95rem', color: '#94a3b8', marginTop: '12px', lineHeight: 1.6 }}>
                    {dealOfTheDay.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginTop: '20px' }}>
                    <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#38bdf8' }}>
                      ₹{dealOfTheDay.price.toLocaleString('en-IN')}
                    </span>
                    <span style={{ fontSize: '1.2rem', color: '#64748b', textDecoration: 'line-through' }}>
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
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)'
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
                <div style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  POPULAR WITH DEVELOPERS & BUSINESSES
                </div>
                <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
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
          background: 'linear-gradient(180deg, rgba(8, 12, 20, 0) 0%, rgba(15, 23, 42, 0.6) 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div className="container">
            <div className="glass-panel" style={{
              padding: '40px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '30px',
              alignItems: 'center',
              border: '1px solid rgba(6, 182, 212, 0.25)'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#06b6d4', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase' }}>
                  <Server size={18} /> ENTERPRISE IT SOLUTIONS
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#f8fafc', marginTop: '8px', lineHeight: 1.3 }}>
                  Need Custom Enterprise Hardware or Turnkey IT Setup?
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.92rem', marginTop: '10px', lineHeight: 1.6 }}>
                  Evolution Infotech deploys end-to-end datacenter infrastructure, Cisco networking, multi-GPU AI servers, and Microsoft cloud licenses for businesses across India.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '0.9rem' }}>
                  <ShieldCheck size={18} color="#10b981" /> 100% Tax Deductible GST Invoicing
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '0.9rem' }}>
                  <Zap size={18} color="#06b6d4" /> Custom Rack & Blade Server Assembly
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#cbd5e1', fontSize: '0.9rem' }}>
                  <Code2 size={18} color="#8b5cf6" /> Annual IT Maintenance (AMC) Contracts
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
