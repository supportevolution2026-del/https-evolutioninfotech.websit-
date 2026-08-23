'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import B2BQuoteModal from '@/components/B2BQuoteModal';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import {
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  PhoneCall,
  Share2,
  ChevronRight,
  Zap,
  Building2,
  Check
} from 'lucide-react';

export default function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.id as string;
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'highlights' | 'warranty' | 'reviews'>('specs');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const product = products.find((p) => p.slug === slug || p.id === slug);

  if (!product) {
    return notFound();
  }

  const inWishlist = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main style={{ flex: 1, padding: '30px 0 60px 0' }}>
        <div className="container">
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b', marginBottom: '24px' }}>
            <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" style={{ color: '#94a3b8', textDecoration: 'none' }}>Catalog</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#06b6d4', fontWeight: 600 }}>{product.name}</span>
          </div>

          {/* Top Product Hero Layout */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'start',
            marginBottom: '50px'
          }}>
            {/* Gallery Column */}
            <div>
              <div style={{
                width: '100%',
                height: '420px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: '#0b1120',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={images[selectedImage] || product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: selectedImage === idx ? '2px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.1)',
                        padding: 0,
                        background: '#0b1120',
                        cursor: 'pointer',
                        boxShadow: selectedImage === idx ? '0 0 15px rgba(6, 182, 212, 0.4)' : 'none'
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-cyan">{product.brand}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '10px' }}>
                    SKU: {product.sku}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={handleShare}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: isCopied ? '#10b981' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                    title="Copy Link"
                  >
                    {isCopied ? <Check size={16} /> : <Share2 size={16} />}
                  </button>

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: inWishlist ? '#ec4899' : '#94a3b8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <Heart size={18} fill={inWishlist ? '#ec4899' : 'none'} />
                  </button>
                </div>
              </div>

              <h1 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 800, color: '#ffffff', lineHeight: 1.25 }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#fbbf24" />
                  ))}
                  <span style={{ fontWeight: 700, color: '#ffffff', marginLeft: '4px', fontSize: '0.9rem' }}>
                    {product.rating}
                  </span>
                </div>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  ({product.reviewCount} Verified Buyer Ratings)
                </span>
                <span style={{ color: '#10b981', fontSize: '0.82rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={14} /> In Stock ({product.stockCount} units)
                </span>
              </div>

              {/* Price Row */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                padding: '16px 20px',
                borderRadius: '12px',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px'
              }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
                {product.originalPrice > product.price && (
                  <div style={{ fontSize: '1.2rem', color: '#64748b', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </div>
                )}
                <span className="badge badge-emerald">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercent}%)
                </span>
              </div>

              <p style={{ fontSize: '0.92rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                {product.description}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '10px' }}>
                {/* Quantity */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '6px'
                }}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ background: 'none', border: 'none', color: '#fff', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem' }}
                  >
                    -
                  </button>
                  <span style={{ width: '36px', textAlign: 'center', fontWeight: 800, fontSize: '1rem' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{ background: 'none', border: 'none', color: '#fff', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem' }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '14px 20px', fontSize: '1rem' }}
                >
                  <ShoppingCart size={20} color="#06b6d4" /> Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn-primary"
                  style={{ flex: 1, padding: '14px 24px', fontSize: '1rem' }}
                >
                  <Zap size={20} /> Buy Now
                </button>
              </div>

              {/* B2B Quote Prompt */}
              <div style={{
                marginTop: '10px',
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(6, 182, 212, 0.08)',
                border: '1px solid rgba(6, 182, 212, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1' }}>
                  <Building2 size={16} color="#06b6d4" /> Buying for business or in bulk?
                </div>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#38bdf8',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Get B2B GST Quote
                </button>
              </div>

              {/* Trust Icons */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '10px',
                marginTop: '8px',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <Truck size={16} color="#06b6d4" /> Express Dispatch
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <ShieldCheck size={16} color="#10b981" /> 100% Genuine Tech
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: '#94a3b8' }}>
                  <RotateCcw size={16} color="#8b5cf6" /> 7 Days Replacement
                </div>
              </div>
            </div>
          </div>

          {/* Deep Information Tabs */}
          <div className="glass-panel" style={{ padding: '32px', marginBottom: '50px' }}>
            <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', overflowX: 'auto' }}>
              <button
                onClick={() => setActiveTab('specs')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'specs' ? '#06b6d4' : '#94a3b8',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  paddingBottom: '8px',
                  borderBottom: activeTab === 'specs' ? '2px solid #06b6d4' : 'none'
                }}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('highlights')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'highlights' ? '#06b6d4' : '#94a3b8',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  paddingBottom: '8px',
                  borderBottom: activeTab === 'highlights' ? '2px solid #06b6d4' : 'none'
                }}
              >
                Key Features
              </button>
              <button
                onClick={() => setActiveTab('warranty')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'warranty' ? '#06b6d4' : '#94a3b8',
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  paddingBottom: '8px',
                  borderBottom: activeTab === 'warranty' ? '2px solid #06b6d4' : 'none'
                }}
              >
                Warranty & Support
              </button>
            </div>

            <div style={{ marginTop: '24px' }}>
              {activeTab === 'specs' && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }}>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '12px 16px',
                        background: 'rgba(0, 0, 0, 0.3)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.04)'
                      }}
                    >
                      <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
                        {key}
                      </span>
                      <span style={{ fontSize: '0.92rem', color: '#f8fafc', fontWeight: 600, marginTop: '2px' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'highlights' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {product.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: '#cbd5e1' }}>
                      <CheckCircle2 size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'warranty' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '600px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={28} color="#10b981" />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#ffffff' }}>Official Manufacturer Warranty</h4>
                      <p style={{ fontSize: '0.88rem', color: '#94a3b8' }}>{product.warranty}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.6 }}>
                    All products sold by Evolution Infotech are sourced directly through official brand distribution networks. In case of any hardware issue, you can reach out to our dedicated support desk at <strong>support@evolutioninfotech.in</strong> or visit any authorized service center nationwide.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Grid */}
          {relatedProducts.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff' }}>
                  Related Technology Hardware
                </h3>
                <Link href={`/products?category=${product.category}`} className="btn-outline-cyan" style={{ fontSize: '0.85rem' }}>
                  View More in Category
                </Link>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '24px'
              }}>
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <B2BQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}
