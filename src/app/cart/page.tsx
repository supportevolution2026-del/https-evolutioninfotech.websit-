'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  Truck,
  ArrowLeft,
  Sparkles
} from 'lucide-react';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    tax,
    shipping,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 0 60px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              CHECKOUT PREPARATION
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
              Your Shopping Cart ({cart.length} Items)
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="glass-panel" style={{
              padding: '60px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px',
              background: '#ffffff',
              border: '1px solid #e2e8f0'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: '#f1f5f9',
                border: '1px dashed #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#64748b'
              }}>
                <ShoppingBag size={36} />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a' }}>Your cart is currently empty</h2>
              <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '380px' }}>
                Discover ultra-performance computing hardware, RTX GPUs, server systems, and cloud software.
              </p>
              <Link href="/products" className="btn-primary" style={{ marginTop: '10px' }}>
                Explore Products Catalog <ArrowRight size={16} />
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 380px',
              gap: '30px',
              alignItems: 'start'
            }}>
              {/* Items List */}
              <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  background: '#f0fdf4',
                  borderRadius: '12px',
                  border: '1px solid #bbf7d0',
                  fontSize: '0.88rem',
                  color: '#15803d'
                }}>
                  <Truck size={18} />
                  {subtotal >= 5000 ? (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={16} color="#16a34a" />
                      <span>Your order qualifies for <strong>FREE Pan-India Express Delivery</strong>!</span>
                    </span>
                  ) : (
                    <span>Add <strong>₹{(5000 - subtotal).toLocaleString('en-IN')}</strong> more for Free Shipping!</span>
                  )}
                </div>

                {cart.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '90px 1fr auto',
                      gap: '20px',
                      padding: '16px 0',
                      borderBottom: '1px solid #f1f5f9',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0' }}
                    />

                    <div>
                      <div style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 700, textTransform: 'uppercase' }}>{item.product.brand}</div>
                      <Link href={`/products/${item.product.slug}`} style={{ color: '#0f172a', textDecoration: 'none', fontWeight: 800, fontSize: '1rem' }}>
                        {item.product.name}
                      </Link>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                        SKU: {item.product.sku} &bull; {item.product.warranty}
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: '#f1f5f9',
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          padding: '2px'
                        }}>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            style={{ background: 'none', border: 'none', color: '#0f172a', padding: '6px 10px', cursor: 'pointer', fontWeight: 700 }}
                          >
                            <Minus size={14} />
                          </button>
                          <span style={{ padding: '0 12px', fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            style={{ background: 'none', border: 'none', color: '#0f172a', padding: '6px 10px', cursor: 'pointer', fontWeight: 700 }}
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#f43f5e',
                            fontSize: '0.82rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          <Trash2 size={15} /> Remove
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>
                        ₹{item.product.price.toLocaleString('en-IN')} each
                      </div>
                    </div>
                  </div>
                ))}

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px' }}>
                  <Link href="/products" style={{ color: '#2563eb', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', fontWeight: 700 }}>
                    <ArrowLeft size={16} /> Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>
                  Order Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyCoupon}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'block' }}>
                    Discount / Promotional Code
                  </label>
                  {appliedCoupon ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: '#ecfdf5',
                      border: '1px solid #a7f3d0',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      color: '#15803d'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                        <Tag size={16} /> {appliedCoupon} (-₹{discount.toLocaleString('en-IN')})
                      </div>
                      <button
                        type="button"
                        onClick={removeCoupon}
                        style={{ background: 'none', border: 'none', color: '#f43f5e', cursor: 'pointer', fontWeight: 700, fontSize: '0.78rem' }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="e.g. EVO10"
                        value={inputCoupon}
                        onChange={(e) => setInputCoupon(e.target.value)}
                        className="form-input"
                        style={{ fontSize: '0.85rem' }}
                      />
                      <button type="submit" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                        Apply
                      </button>
                    </div>
                  )}
                </form>

                {/* Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem', color: '#64748b' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span style={{ color: '#0f172a', fontWeight: 700 }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a', fontWeight: 700 }}>
                      <span>Discount Savings</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GST (18% IT Tax)</span>
                    <span style={{ color: '#0f172a' }}>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Pan-India Shipping</span>
                    <span style={{ color: shipping === 0 ? '#16a34a' : '#0f172a', fontWeight: shipping === 0 ? 800 : 600 }}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>

                  <div style={{
                    borderTop: '1px solid #f1f5f9',
                    paddingTop: '14px',
                    marginTop: '6px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                  }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a' }}>Grand Total</span>
                    <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#2563eb' }}>
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="btn-primary"
                  style={{ width: '100%', padding: '14px', fontSize: '1.05rem' }}
                >
                  Proceed to Secure Checkout <ArrowRight size={18} />
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', color: '#64748b' }}>
                  <ShieldCheck size={16} color="#10b981" /> 256-Bit SSL Encrypted & GST Tax Invoiced
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
