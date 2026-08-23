'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  X,
  Star,
  ShoppingCart,
  Heart,
  ShieldCheck,
  Truck,
  CheckCircle2,
  ExternalLink
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
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(12px)',
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
        backgroundColor: '#0f172a',
        borderRadius: '20px',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 30px rgba(6, 182, 212, 0.2)',
        padding: '28px',
      }}>
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={20} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          alignItems: 'start'
        }}>
          {/* Gallery */}
          <div>
            <div style={{
              width: '100%',
              height: '300px',
              borderRadius: '14px',
              overflow: 'hidden',
              background: '#080c14',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.08)'
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
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: selectedImage === idx ? '2px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.1)',
                      padding: 0,
                      background: 'none',
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
            <div style={{ fontSize: '0.78rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              {quickViewProduct.brand} &bull; SKU: {quickViewProduct.sku}
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', lineHeight: 1.3 }}>
              {quickViewProduct.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24' }}>
                <Star size={16} fill="#fbbf24" />
                <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{quickViewProduct.rating}</span>
              </div>
              <span style={{ color: '#64748b', fontSize: '0.85rem' }}>({quickViewProduct.reviewCount} customer ratings)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff' }}>
                ₹{quickViewProduct.price.toLocaleString('en-IN')}
              </span>
              {quickViewProduct.originalPrice > quickViewProduct.price && (
                <span style={{ fontSize: '1.1rem', color: '#64748b', textDecoration: 'line-through' }}>
                  ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="badge badge-cyan">
                Save ₹{(quickViewProduct.originalPrice - quickViewProduct.price).toLocaleString('en-IN')}
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.5 }}>
              {quickViewProduct.description}
            </p>

            {/* Highlights */}
            {quickViewProduct.highlights && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {quickViewProduct.highlights.slice(0, 3).map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#cbd5e1' }}>
                    <CheckCircle2 size={14} color="#10b981" /> {item}
                  </div>
                ))}
              </div>
            )}

            {/* Quantity & CTA */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(0, 0, 0, 0.4)',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '4px'
              }}>
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ background: 'none', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer' }}
                >
                  -
                </button>
                <span style={{ width: '32px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ background: 'none', border: 'none', color: '#fff', width: '28px', height: '28px', cursor: 'pointer' }}
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, padding: '12px 20px' }}
              >
                <ShoppingCart size={18} /> Add to Cart
              </button>

              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: inWishlist ? '#ec4899' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <Heart size={20} fill={inWishlist ? '#ec4899' : 'none'} />
              </button>
            </div>

            <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#94a3b8' }}>
                <ShieldCheck size={14} color="#10b981" /> {quickViewProduct.warranty}
              </div>
              <Link
                href={`/products/${quickViewProduct.slug}`}
                onClick={() => setQuickViewProduct(null)}
                style={{ color: '#06b6d4', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
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
