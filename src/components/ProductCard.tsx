'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { getProductWhatsAppUrl } from '@/utils/whatsapp';
import {
  ShoppingCart,
  Heart,
  Eye,
  Star,
  Check,
  MessageCircle
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, cart, setIsCartOpen } = useCart();
  const inWishlist = isInWishlist(product.id);
  const inCart = cart.some((item) => item.product.id === product.id);

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const url = getProductWhatsAppUrl(product, 1);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleAddClick = () => {
    addToCart(product, 1);
    setIsCartOpen(true);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: '#0f172a',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        borderRadius: '18px',
        padding: '16px',
        height: '100%',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.5)';
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(6, 182, 212, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.09)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.6)';
      }}
    >
      {/* Top Badges */}
      <div style={{
        position: 'absolute',
        top: '14px',
        left: '14px',
        zIndex: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        {product.isBestSeller && (
          <span style={{
            background: 'rgba(245, 158, 11, 0.95)',
            color: '#000000',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Best Seller
          </span>
        )}
        {product.discountPercent > 0 && (
          <span style={{
            background: 'rgba(6, 182, 212, 0.95)',
            color: '#000000',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '6px'
          }}>
            {product.discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          zIndex: 50,
          width: '42px',
          height: '42px',
          borderRadius: '50%',
          background: inWishlist ? '#ec4899' : 'rgba(15, 23, 42, 0.95)',
          border: inWishlist ? '2px solid #ffffff' : '1px solid rgba(255, 255, 255, 0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: inWishlist ? '#ffffff' : '#cbd5e1',
          boxShadow: inWishlist ? '0 0 20px rgba(236, 72, 153, 0.9)' : '0 4px 12px rgba(0, 0, 0, 0.6)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'auto'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        onMouseDown={(e) => (e.currentTarget.style.transform = 'scale(0.9)')}
        onMouseUp={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-label="Toggle Wishlist"
      >
        <Heart size={20} fill={inWishlist ? '#ffffff' : 'none'} color={inWishlist ? '#ffffff' : '#cbd5e1'} />
      </button>

      {/* Image Container with Quick View */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: '#020617',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        marginBottom: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />

        {/* Quick View Button */}
        <button
          onClick={() => setQuickViewProduct(product)}
          style={{
            position: 'absolute',
            bottom: '8px',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            color: '#38bdf8',
            padding: '5px 12px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer'
          }}
        >
          <Eye size={13} /> Quick View
        </button>
      </div>

      {/* Product Information */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {product.brand}
        </div>

        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontSize: '0.98rem',
            fontWeight: 800,
            color: '#ffffff',
            marginTop: '4px',
            lineHeight: 1.35,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '2.7em'
          }}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', color: '#fbbf24', gap: '2px' }}>
            <Star size={13} fill="#fbbf24" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#f8fafc' }}>
              {product.rating}
            </span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Short description */}
        <p style={{
          fontSize: '0.78rem',
          color: '#94a3b8',
          marginTop: '8px',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          lineHeight: 1.4,
          flex: 1
        }}>
          {product.shortDesc}
        </p>

        {/* Price & Action Buttons */}
        <div style={{
          marginTop: '14px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ffffff' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice > product.price && (
              <div style={{ fontSize: '0.72rem', color: '#64748b', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Direct WhatsApp Order */}
            <button
              onClick={handleWhatsAppOrder}
              title="Order on WhatsApp"
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                border: 'none',
                color: '#ffffff',
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(16, 185, 129, 0.35)',
                transition: 'transform 0.2s ease',
                flexShrink: 0
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <MessageCircle size={18} />
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddClick}
              style={{
                background: inCart ? '#06b6d4' : 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                color: '#ffffff',
                border: 'none',
                borderRadius: '10px',
                padding: '9px 14px',
                fontSize: '0.82rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(6, 182, 212, 0.35)',
                transition: 'all 0.2s ease'
              }}
            >
              {inCart ? (
                <>
                  <Check size={14} /> Added
                </>
              ) : (
                <>
                  <ShoppingCart size={14} /> Add
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
