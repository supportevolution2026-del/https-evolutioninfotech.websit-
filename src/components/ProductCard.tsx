'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import {
  ShoppingCart,
  Heart,
  Eye,
  Star,
  ShieldCheck,
  Check
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, cart } = useCart();
  const inWishlist = isInWishlist(product.id);
  const inCart = cart.some((item) => item.product.id === product.id);

  return (
    <div className="glass-card" style={{
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      padding: '16px',
      height: '100%',
    }}>
      {/* Badges */}
      <div style={{
        position: 'absolute',
        top: '16px',
        left: '16px',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
      }}>
        {product.isBestSeller && (
          <span className="badge badge-amber">Best Seller</span>
        )}
        {product.isDealOfTheDay && (
          <span className="badge badge-emerald">Special Deal</span>
        )}
        {product.isNewArrival && (
          <span className="badge badge-purple">2026 Edition</span>
        )}
        {product.discountPercent > 0 && (
          <span className="badge badge-cyan">{product.discountPercent}% OFF</span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => toggleWishlist(product.id)}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 2,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: inWishlist ? '#ec4899' : '#94a3b8',
          transition: 'all 0.2s ease',
        }}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <Heart size={18} fill={inWishlist ? '#ec4899' : 'none'} />
      </button>

      {/* Image Container with Quick View on hover */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '210px',
        borderRadius: '12px',
        overflow: 'hidden',
        background: 'rgba(0, 0, 0, 0.2)',
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
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />

        {/* Quick View Button Overlay */}
        <button
          onClick={() => setQuickViewProduct(product)}
          style={{
            position: 'absolute',
            bottom: '10px',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#fff',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.78rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
          }}
        >
          <Eye size={14} color="#06b6d4" /> Quick View
        </button>
      </div>

      {/* Product Info */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {product.brand}
        </div>

        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#f8fafc',
            marginTop: '4px',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '2.6em',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#38bdf8')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f8fafc')}
          >
            {product.name}
          </h3>
        </Link>

        {/* Rating and Reviews */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', color: '#fbbf24', gap: '2px' }}>
            <Star size={14} fill="#fbbf24" />
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }}>
              {product.rating}
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Short Specs Snippet */}
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

        {/* Price & Action Row */}
        <div style={{
          marginTop: '16px',
          paddingTop: '12px',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                ₹{product.price.toLocaleString('en-IN')}
              </span>
            </div>
            {product.originalPrice > product.price && (
              <div style={{ fontSize: '0.75rem', color: '#64748b', textDecoration: 'line-through' }}>
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </div>
            )}
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="btn-primary"
            style={{
              padding: '10px 14px',
              fontSize: '0.82rem',
              borderRadius: '10px',
              background: inCart ? 'linear-gradient(135deg, #10b981, #059669)' : undefined
            }}
          >
            {inCart ? (
              <>
                <Check size={16} /> Added
              </>
            ) : (
              <>
                <ShoppingCart size={16} /> Buy Now
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
