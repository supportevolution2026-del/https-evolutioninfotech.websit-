'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { getProductWhatsAppUrl } from '@/utils/whatsapp';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);
  const images = quickViewProduct.images && quickViewProduct.images.length > 0
    ? quickViewProduct.images
    : [quickViewProduct.image];

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div
        style={{ position: 'absolute', inset: 0 }}
        onClick={() => setQuickViewProduct(null)}
      />

      <div style={{
        position: 'relative',
        zIndex: 1101,
        width: '100%',
        maxWidth: '850px',
        maxHeight: '90vh',
        overflowY: 'auto',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.18)',
        padding: '32px',
      }}>
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'start'
        }}>
          {/* Gallery */}
          <div>
            <div style={{
              width: '100%',
              height: '300px',
              borderRadius: '16px',
              overflow: 'hidden',
              background: '#f8fafc',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e2e8f0'
            }}>
              <img
                src={images[selectedImage] || quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Thumbnail dots/images */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '10px',
                      overflow: 'hidden',
                      border: selectedImage === idx ? '2px solid #2563eb' : '1px solid #e2e8f0',
                      padding: 0,
                      background: '#ffffff',
                      cursor: 'pointer'
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 800, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {quickViewProduct.brand} &bull; SKU: {quickViewProduct.sku}
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', lineHeight: 1.3 }}>
              {quickViewProduct.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b' }}>
                <Star size={16} fill="#f59e0b" />
                <span style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a' }}>{quickViewProduct.rating}</span>
              </div>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>({quickViewProduct.reviewCount} customer ratings)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0f172a' }}>
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <span style={{ fontSize: '1.1rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="badge badge-cyan">
                Save ₹{(quickViewProduct.originalPrice - quickViewProduct.price).toLocaleString('en-IN')}
              </span>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5 }}>
              {quickViewProduct.description}
            </p>

            {/* Highlights */}
            {quickViewProduct.highlights && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {quickViewProduct.highlights.slice(0, 3).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#334155', fontWeight: 500 }}>
                    <CheckCircle2 size={14} color="#10b981" /> {item}
                  </div>
                ))}
              </div>
            )}

            {/* Quantity & CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '10px', flexWrap: 'wrap' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f1f5f9',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                padding: '4px'
              }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ background: 'none', border: 'none', color: '#0f172a', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 700 }}
                >
                  -
                </button>
                <span style={{ width: '32px', textAlign: 'center', fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ background: 'none', border: 'none', color: '#0f172a', width: '28px', height: '28px', cursor: 'pointer', fontWeight: 700 }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ padding: '12px 18px', fontSize: '0.88rem' }}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              <button
                onClick={() => {
                  const url = getProductWhatsAppUrl(quickViewProduct, quantity);
                  window.open(url, '_blank', 'noopener,noreferrer');
                }}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 18px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
                }}
              >
                <MessageCircle size={18} /> Order on WhatsApp
              </button>

              <button
                type="button"
                onClick={() => toggleWishlist(quickViewProduct.id)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: inWishlist ? '#fdf2f8' : '#ffffff',
                  border: inWishlist ? '1.5px solid #f472b6' : '1px solid #e2e8f0',
                  color: inWishlist ? '#db2777' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
                title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Toggle Wishlist"
              >
                <Heart size={20} fill={inWishlist ? '#db2777' : 'none'} color={inWishlist ? '#db2777' : '#94a3b8'} />
              </button>
            </div>

            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748b' }}>
                <ShieldCheck size={14} color="#10b981" /> {quickViewProduct.warranty}
              </div>
              <Link
                href={`/products/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                style={{ color: '#2563eb', fontSize: '0.84rem', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                Full Product Page <ExternalLink size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
