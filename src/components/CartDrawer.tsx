'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { getCartWhatsAppUrl } from '@/utils/whatsapp';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check,
  MessageCircle,
  Truck
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    clearCart
  } = useCart();

  const { addToast } = useToast();
  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    const success = applyCoupon(couponInput);
    if (success) {
      addToast({
        type: 'success',
        title: 'Coupon Applied!',
        message: '10% instant discount applied to your cart.',
      });
      setCouponInput('');
    } else {
      addToast({
        type: 'error',
        title: 'Invalid Coupon',
        message: 'Try using EVO10 or GST18.',
      });
    }
  };

  const handleWhatsAppCartOrder = () => {
    const url = getCartWhatsAppUrl(
      cart,
      subtotal,
      discount,
      tax,
      shipping,
      total,
      appliedCoupon || undefined
    );
    window.open(url, '_blank', 'noopener,noreferrer');
    clearCart();
    setIsCartOpen(false);
    addToast({
      type: 'success',
      title: 'Order Sent on WhatsApp!',
      message: 'Cart cleared. We will confirm your order details on WhatsApp.',
    });
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1100,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)'
    }}>
      {/* Backdrop click */}
      <div style={{ position: 'absolute', inset: 0 }} onClick={() => setIsCartOpen(false)} />

      {/* Drawer Panel */}
      <div style={{
        position: 'relative',
        zIndex: 1101,
        width: '100%',
        maxWidth: '440px',
        height: '100%',
        backgroundColor: '#0b1120',
        borderLeft: '1px solid rgba(6, 182, 212, 0.3)',
        boxShadow: '-20px 0 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(6, 182, 212, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(15, 23, 42, 0.9)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8'
            }}>
              <ShoppingBag size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>Your Shopping Cart</h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{
          padding: '10px 24px',
          background: 'rgba(6, 182, 212, 0.1)',
          borderBottom: '1px solid rgba(6, 182, 212, 0.2)',
          fontSize: '0.78rem',
          color: '#38bdf8',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontWeight: 700
        }}>
          <Truck size={15} color="#38bdf8" />
          <span>You qualify for FREE Express Shipping & Transit Insurance!</span>
        </div>

        {/* Cart Item List */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {cart.length === 0 ? (
            <div style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              color: '#64748b',
              gap: '16px'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px dashed rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <ShoppingBag size={32} />
              </div>
              <div>
                <h4 style={{ color: '#f8fafc', fontSize: '1.1rem', fontWeight: 700 }}>Your cart is empty</h4>
                <p style={{ fontSize: '0.85rem', marginTop: '6px', maxWidth: '260px' }}>
                  Explore our AI laptops, GPUs, servers and accessories.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="btn-primary"
                style={{ fontSize: '0.88rem', padding: '10px 20px' }}
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.product.id}
                style={{
                  display: 'flex',
                  gap: '14px',
                  padding: '14px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '10px', background: '#000' }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#f8fafc',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {item.product.name}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                    SKU: {item.product.sku}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#06b6d4' }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>

                    {/* Quantity controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: 'rgba(0, 0, 0, 0.5)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      overflow: 'hidden'
                    }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#94a3b8',
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        <Minus size={13} />
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800, padding: '0 8px', color: '#fff' }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#94a3b8',
                          padding: '4px 8px',
                          cursor: 'pointer'
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#f43f5e',
                        cursor: 'pointer',
                        padding: '4px'
                      }}
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Direct WhatsApp Order */}
        {cart.length > 0 && (
          <div style={{
            padding: '20px 24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(15, 23, 42, 0.95)'
          }}>
            {/* Price Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ color: '#f8fafc', fontWeight: 600 }}>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>GST (18% IT Tax Included)</span>
                <span style={{ color: '#f8fafc' }}>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Shipping</span>
                <span style={{ color: '#34d399', fontWeight: 700 }}>FREE</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '1.15rem',
                fontWeight: 800,
                color: '#ffffff',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '10px',
                marginTop: '4px'
              }}>
                <span>Grand Total</span>
                <span className="text-gradient">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Direct Order Actions - WhatsApp Only */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={handleWhatsAppCartOrder}
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '16px',
                  fontSize: '1.02rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.45)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <MessageCircle size={22} />
                Order via WhatsApp (Instant Checkout)
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.72rem', color: '#64748b', marginTop: '12px' }}>
              <ShieldCheck size={14} color="#10b981" /> 100% Genuine Manufacturer Warranty & GST Bill
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
