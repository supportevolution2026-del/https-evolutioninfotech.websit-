'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { OrderDetails } from '@/types';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, tax, shipping, total, appliedCoupon, clearCart } = useCart();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    fullName: 'Ronak Patel',
    email: 'ronak@example.com',
    phone: '+91 98790 54321',
    address: '402, Titanium City Centre, Anandnagar',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    isB2B: false,
    companyName: '',
    gstin: '',
    paymentMethod: 'UPI',
    upiId: 'ronakpatel@oksbi'
  });

  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      addToast({
        type: 'error',
        title: 'Empty Cart',
        message: 'Please add items to your cart before proceeding to checkout.',
      });
      return;
    }

    setIsProcessing(true);

    const generatedOrderId = `EVO-${Date.now().toString().slice(-6)}`;
    const trackingNumber = `IND-EXPRESS-${Math.floor(100000 + Math.random() * 900000)}`;

    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);

    const newOrder: OrderDetails = {
      orderId: generatedOrderId,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: [...cart],
      subtotal,
      discount,
      tax,
      shipping,
      total,
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode
      },
      paymentMethod: formData.paymentMethod,
      paymentStatus: 'Paid',
      orderStatus: 'Confirmed',
      trackingNumber,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })
    };

    setTimeout(() => {
      // Save recent order to localStorage
      try {
        localStorage.setItem('evo_last_order', JSON.stringify(newOrder));
        const allOrders = JSON.parse(localStorage.getItem('evo_all_orders') || '[]');
        allOrders.unshift(newOrder);
        localStorage.setItem('evo_all_orders', JSON.stringify(allOrders));
      } catch (err) {
        console.error('Failed to store order', err);
      }

      clearCart();
      setIsProcessing(false);
      router.push(`/order-success?orderId=${generatedOrderId}`);
    }, 1500);
  };

  if (cart.length === 0 && !isProcessing) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
          <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', maxWidth: '480px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Your Cart is Empty</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '8px', marginBottom: '20px' }}>
              Add items from our catalog to complete checkout.
            </p>
            <Link href="/products" className="btn-primary">Browse Catalog</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 0 60px 0' }}>
        <div className="container">
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              EVOLUTION INFOTECH &bull; 256-BIT SECURE CHECKOUT
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              Shipping & Payment Details
            </h1>
          </div>

          <form onSubmit={handlePlaceOrder}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 400px',
              gap: '30px',
              alignItems: 'start'
            }}>
              {/* Left Column: Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* 1. Customer & Shipping Info */}
                <div className="glass-panel" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(6, 182, 212, 0.15)',
                      color: '#06b6d4',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      1
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                      Delivery Address & Contact
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        Email Address (for GST invoice & tracking) *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        Street Address / Office Unit *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        Pincode / Postal Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* B2B Invoicing Checkbox */}
                  <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.88rem', color: '#cbd5e1' }}>
                      <input
                        type="checkbox"
                        name="isB2B"
                        checked={formData.isB2B}
                        onChange={handleInputChange}
                        style={{ accentColor: '#06b6d4' }}
                      />
                      <span>Claim GST Input Credit (B2B Purchase with Company GSTIN)</span>
                    </label>

                    {formData.isB2B && (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '14px' }}>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                            Company Name
                          </label>
                          <input
                            type="text"
                            name="companyName"
                            placeholder="Registered Business Name"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                            GSTIN (15 Digits)
                          </label>
                          <input
                            type="text"
                            name="gstin"
                            placeholder="24AAAAA0000A1Z5"
                            value={formData.gstin}
                            onChange={handleInputChange}
                            className="form-input"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* 2. Payment Method */}
                <div className="glass-panel" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(6, 182, 212, 0.15)',
                      color: '#06b6d4',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      2
                    </div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                      Payment Method
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                    {[
                      { id: 'UPI', label: 'Instant UPI / QR', icon: <QrCode size={18} /> },
                      { id: 'Card', label: 'Credit/Debit Card', icon: <CreditCard size={18} /> },
                      { id: 'NetBanking', label: 'Net Banking', icon: <Building size={18} /> },
                      { id: 'COD', label: 'Cash on Delivery', icon: <Truck size={18} /> },
                    ].map((method) => (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: method.id }))}
                        style={{
                          padding: '14px',
                          borderRadius: '12px',
                          background: formData.paymentMethod === method.id ? 'rgba(6, 182, 212, 0.15)' : 'rgba(0, 0, 0, 0.3)',
                          border: formData.paymentMethod === method.id ? '2px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.08)',
                          color: formData.paymentMethod === method.id ? '#38bdf8' : '#94a3b8',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.85rem'
                        }}
                      >
                        {method.icon}
                        <span>{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {formData.paymentMethod === 'UPI' && (
                    <div style={{
                      padding: '16px',
                      borderRadius: '12px',
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px'
                    }}>
                      <label style={{ fontSize: '0.82rem', color: '#cbd5e1', fontWeight: 600 }}>
                        Enter UPI ID (Google Pay, PhonePe, Paytm, BHIM)
                      </label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={formData.upiId}
                        onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                        className="form-input"
                      />
                      <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle2 size={13} /> Zero transaction fee on all UPI orders.
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'Card' && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div style={{ gridColumn: 'span 2' }}>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Card Number</label>
                        <input type="text" placeholder="4111 2222 3333 4444" className="form-input" defaultValue="4242 •••• •••• 4242" />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>Expiry (MM/YY)</label>
                        <input type="text" placeholder="12/28" className="form-input" defaultValue="08/28" />
                      </div>
                      <div>
                        <label style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>CVV</label>
                        <input type="password" placeholder="•••" maxLength={4} className="form-input" defaultValue="888" />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Summary & Place Order */}
              <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>
                  Review Order ({cart.length} Items)
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: '240px', overflowY: 'auto' }}>
                  {cart.map((item) => (
                    <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', fontSize: '0.85rem' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: '#f8fafc', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.product.name}
                        </div>
                        <div style={{ color: '#64748b', fontSize: '0.78rem' }}>
                          Qty: {item.quantity} &times; ₹{item.product.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div style={{ fontWeight: 700, color: '#38bdf8' }}>
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  fontSize: '0.88rem',
                  color: '#94a3b8'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span style={{ color: '#f8fafc' }}>₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {discount > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                      <span>Discount ({appliedCoupon})</span>
                      <span>-₹{discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>GST (18% IT Tax)</span>
                    <span style={{ color: '#f8fafc' }}>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Shipping</span>
                    <span style={{ color: shipping === 0 ? '#34d399' : '#f8fafc' }}>
                      {shipping === 0 ? 'FREE' : `₹${shipping}`}
                    </span>
                  </div>

                  <div style={{
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    paddingTop: '12px',
                    marginTop: '4px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'baseline'
                  }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Payable Amount</span>
                    <span style={{ fontSize: '1.6rem', fontWeight: 900 }} className="text-gradient">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary"
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem' }}
                >
                  {isProcessing ? 'Authorizing Payment...' : `Place Order (₹${total.toLocaleString('en-IN')})`}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748b' }}>
                  <Lock size={14} color="#10b981" /> 256-Bit Encrypted & Guaranteed Fulfillment
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
