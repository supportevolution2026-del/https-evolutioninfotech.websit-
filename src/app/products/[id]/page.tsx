'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import B2BQuoteModal from '@/components/B2BQuoteModal';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { getProductWhatsAppUrl } from '@/utils/whatsapp';
import {
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Share2,
  ChevronRight,
  Zap,
  Building2,
  Check,
  MessageCircle
} from 'lucide-react';

export default function ProductDetailPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { addToast } = useToast();
  const { products } = useProducts();
  const unwrappedParams = React.use(params);
  const clientParams = useParams();
  const rawId = unwrappedParams?.id || clientParams?.id;
  const slug = Array.isArray(rawId) ? rawId[0] : (rawId as string);
  const { addToCart, toggleWishlist, isInWishlist, setIsCartOpen } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'highlights' | 'warranty' | 'reviews'>('specs');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const product = products.find((p) => p.slug === slug || p.id === slug) || products[0];

  if (!product) {
    return notFound();
  }

  const inWishlist = isInWishlist(product.id);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push('/checkout');
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} | Evolution Infotech`,
          text: `Check out ${product.name} at Evolution Infotech!`,
          url: url
        });
        return;
      } catch (e) {
        // Fallback to clipboard
      }
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      addToast({
        type: 'success',
        title: 'Product Link Copied!',
        message: 'Direct product link copied to clipboard.'
      });
      setTimeout(() => setIsCopied(false), 2500);
    } catch (err) {
      addToast({
        type: 'info',
        title: 'Product URL',
        message: url
      });
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main style={{ flex: 1, padding: '30px 0 60px 0' }}>
        <div className="container">
          {/* Breadcrumbs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#64748b', marginBottom: '24px' }}>
            <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/products" style={{ color: '#64748b', textDecoration: 'none' }}>Catalog</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#2563eb', fontWeight: 700 }}>{product.name}</span>
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
                height: '440px',
                borderRadius: '24px',
                overflow: 'hidden',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px'
              }}>
                <img
                  src={images[selectedImage] || product.image}
                  alt={product.name}
                  style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
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
                        borderRadius: '14px',
                        overflow: 'hidden',
                        border: selectedImage === idx ? '2px solid #2563eb' : '1px solid #e2e8f0',
                        padding: '4px',
                        background: '#ffffff',
                        cursor: 'pointer',
                        boxShadow: selectedImage === idx ? '0 0 15px rgba(37, 99, 235, 0.25)' : 'none'
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '18px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <span className="badge badge-cyan">{product.brand}</span>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', marginLeft: '10px' }}>
                    SKU: {product.sku}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {/* Share Button */}
                  <button
                    onClick={handleShare}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: isCopied ? '#ecfdf5' : '#f8fafc',
                      border: isCopied ? '1px solid #a7f3d0' : '1px solid #e2e8f0',
                      color: isCopied ? '#15803d' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title={isCopied ? 'Link Copied!' : 'Share Product Link'}
                    aria-label="Share Product"
                  >
                    {isCopied ? <Check size={18} /> : <Share2 size={18} />}
                  </button>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: inWishlist ? '#fdf2f8' : '#f8fafc',
                      border: inWishlist ? '1px solid #fbcfe8' : '1px solid #e2e8f0',
                      color: inWishlist ? '#ec4899' : '#64748b',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    aria-label="Toggle Wishlist"
                  >
                    <Heart size={20} fill={inWishlist ? '#ec4899' : 'none'} />
                  </button>
                </div>
              </div>

              <h1 style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.25 }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="#f59e0b" />
                  ))}
                  <span style={{ fontWeight: 800, color: '#0f172a', marginLeft: '4px', fontSize: '0.9rem' }}>
                    {product.rating}
                  </span>
                </div>
                <span style={{ color: '#64748b', fontSize: '0.85rem' }}>
                  ({product.reviewCount} Verified Buyer Ratings)
                </span>
                <span style={{ color: '#16a34a', fontSize: '0.84rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={14} /> In Stock ({product.stockCount} units)
                </span>
              </div>

              {/* Price Row */}
              <div style={{
                background: '#f8fafc',
                padding: '18px 20px',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                display: 'flex',
                alignItems: 'baseline',
                gap: '16px'
              }}>
                <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a' }}>
                  ₹{product.price.toLocaleString('en-IN')}
                </div>
                {product.originalPrice > product.price && (
                  <div style={{ fontSize: '1.2rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </div>
                )}
                <span className="badge badge-emerald">
                  Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')} ({product.discountPercent}%)
                </span>
              </div>

              <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.6 }}>
                {product.description}
              </p>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '10px' }}>
                {/* Quantity */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  padding: '6px'
                }}>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    style={{ background: 'none', border: 'none', color: '#0f172a', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 800 }}
                  >
                    -
                  </button>
                  <span style={{ width: '36px', textAlign: 'center', fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    style={{ background: 'none', border: 'none', color: '#0f172a', width: '32px', height: '32px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 800 }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="btn-secondary"
                  style={{ flex: 1, padding: '14px 20px', fontSize: '0.95rem' }}
                >
                  <ShoppingCart size={20} color="#2563eb" /> Add to Cart
                </button>

                <button
                  onClick={handleBuyNow}
                  className="btn-primary"
                  style={{ flex: 1, padding: '14px 24px', fontSize: '0.95rem' }}
                >
                  <Zap size={20} /> Buy Now
                </button>
              </div>

              {/* Direct WhatsApp Instant Order Button */}
              <a
                href={getProductWhatsAppUrl(product, quantity)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '14px 24px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <MessageCircle size={22} />
                Order Directly on WhatsApp (Instant Order)
              </a>

              {/* B2B Quote Prompt */}
              <div style={{
                marginTop: '10px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.88rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#1e40af', fontWeight: 600 }}>
                  <Building2 size={16} color="#2563eb" /> Buying for business or in bulk?
                </div>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#2563eb',
                    fontWeight: 800,
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
                borderTop: '1px solid #f1f5f9',
                paddingTop: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                  <Truck size={16} color="#2563eb" /> Express Dispatch
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                  <ShieldCheck size={16} color="#16a34a" /> 100% Genuine Tech
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: '#475569', fontWeight: 600 }}>
                  <RotateCcw size={16} color="#7c3aed" /> 7 Days Replacement
                </div>
              </div>
            </div>
          </div>

          {/* Deep Information Tabs */}
          <div className="glass-panel" style={{ padding: '32px', marginBottom: '50px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px', overflowX: 'auto' }}>
              <button
                onClick={() => setActiveTab('specs')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'specs' ? '#2563eb' : '#64748b',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  paddingBottom: '8px',
                  borderBottom: activeTab === 'specs' ? '2px solid #2563eb' : 'none'
                }}
              >
                Technical Specifications
              </button>
              <button
                onClick={() => setActiveTab('highlights')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'highlights' ? '#2563eb' : '#64748b',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  paddingBottom: '8px',
                  borderBottom: activeTab === 'highlights' ? '2px solid #2563eb' : 'none'
                }}
              >
                Key Features
              </button>
              <button
                onClick={() => setActiveTab('warranty')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeTab === 'warranty' ? '#2563eb' : '#64748b',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  paddingBottom: '8px',
                  borderBottom: activeTab === 'warranty' ? '2px solid #2563eb' : 'none'
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
                        padding: '14px 18px',
                        background: '#f8fafc',
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0'
                      }}
                    >
                      <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700 }}>
                        {key}
                      </span>
                      <span style={{ fontSize: '0.94rem', color: '#0f172a', fontWeight: 700, marginTop: '2px' }}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'highlights' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {product.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: '#334155', fontWeight: 500 }}>
                      <CheckCircle2 size={18} color="#16a34a" style={{ flexShrink: 0, marginTop: '3px' }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'warranty' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '600px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <ShieldCheck size={28} color="#16a34a" />
                    <div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Official Manufacturer Warranty</h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b' }}>{product.warranty}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.6 }}>
                    All products sold by Evolution Infotech are sourced directly through official brand distribution networks. In case of any hardware issue, you can reach out to our dedicated support desk at <strong>support.evolution2026@gmail.com</strong> or visit any authorized service center nationwide.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Related Products Grid */}
          {relatedProducts.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#0f172a' }}>
                  Related Technology Hardware
                </h3>
                <Link href={`/products?category=${product.category}`} className="btn-secondary" style={{ fontSize: '0.85rem' }}>
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
