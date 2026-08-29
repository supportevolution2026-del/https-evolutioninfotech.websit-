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
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '20px',
        padding: '16px',
        height: '100%',
        boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(37, 99, 235, 0.4)';
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(37, 99, 235, 0.15), 0 4px 16px -2px rgba(15, 23, 42, 0.05)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#e2e8f0';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px -2px rgba(15, 23, 42, 0.05)';
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
            background: '#fef3c7',
            color: '#b45309',
            border: '1px solid #fde68a',
            fontSize: '0.72rem',
            fontWeight: 800,
            padding: '3px 8px',
            borderRadius: '6px',
            textTransform: 'uppercase',
            letterSpacing: '0.4px'
          }}>
            Best Seller
          </span>
        )}
        {product.discountPercent > 0 && (
          <span style={{
            background: '#e0f2fe',
            color: '#0369a1',
            border: '1px solid #bae6fd',
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
          zIndex: 10,
          width: '38px',
          height: '38px',
          borderRadius: '50%',
          background: inWishlist ? '#fdf2f8' : '#ffffff',
          border: inWishlist ? '1.5px solid #f472b6' : '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: inWishlist ? '#db2777' : '#94a3b8',
          boxShadow: inWishlist ? '0 2px 8px rgba(219, 39, 119, 0.25)' : '0 2px 6px rgba(0, 0, 0, 0.05)',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'auto'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        aria-label="Toggle Wishlist"
      >
        <Heart size={18} fill={inWishlist ? '#db2777' : 'none'} color={inWishlist ? '#db2777' : '#94a3b8'} />
      </button>

      {/* Image Container with Quick View */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '200px',
        borderRadius: '14px',
        overflow: 'hidden',
        background: '#f8fafc',
        border: '1px solid #f1f5f9',
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
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid #e2e8f0',
            color: '#2563eb',
            padding: '5px 12px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)'
          }}
        >
          <Eye size={13} /> Quick View
        </button>
      </div>

      {/* Product Information */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {product.brand}
        </div>

        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{
            fontSize: '0.98rem',
            fontWeight: 800,
            color: '#0f172a',
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
          <div style={{ display: 'flex', alignItems: 'center', color: '#f59e0b', gap: '2px' }}>
            <Star size={13} fill="#f59e0b" />
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>
              {product.rating}
            </span>
          </div>
          <span style={{ fontSize: '0.74rem', color: '#64748b' }}>
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Short description */}
        <p style={{
          fontSize: '0.78rem',
          color: '#64748b',
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
          borderTop: '1px solid #f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
              ₹{product.price.toLocaleString('en-IN')}
            </div>
            {product.originalPrice > product.price && (
              <div style={{ fontSize: '0.74rem', color: '#94a3b8', textDecoration: 'line-through' }}>
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
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)',
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
                background: inCart ? '#10b981' : 'linear-gradient(135deg, #0284c7, #2563eb)',
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
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)',
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
