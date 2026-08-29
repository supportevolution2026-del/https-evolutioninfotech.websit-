'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { getCartWhatsAppUrl, WHATSAPP_DISPLAY_PHONE } from '@/utils/whatsapp';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  ShoppingBag,
  User,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, subtotal, discount, tax, shipping, total, appliedCoupon, clearCart } = useCart();
  const { addToast } = useToast();

  // All fields are blank/empty for user to fill manually
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: 'Gujarat',
    pincode: '',
    isB2B: false,
    companyName: '',
    gstin: '',
    paymentMethod: 'Cash on Delivery / WhatsApp Confirmation',
    orderNotes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handlePlaceWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      addToast({
        type: 'error',
        title: 'Empty Cart',
        message: 'Please add items to your cart before proceeding.',
      });
      return;
    }

    if (!formData.fullName.trim()) {
      addToast({
        type: 'error',
        title: 'Name Required',
        message: 'Please enter your full name.',
      });
      return;
    }

    if (!formData.phone.trim()) {
      addToast({
        type: 'error',
        title: 'Phone Required',
        message: 'Please enter your WhatsApp / phone number.',
      });
      return;
    }

    if (!formData.address.trim() || !formData.city.trim()) {
      addToast({
        type: 'error',
        title: 'Address Required',
        message: 'Please enter your complete delivery address & city.',
      });
      return;
    }

    const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode} ${formData.isB2B ? `[B2B: ${formData.companyName} | GSTIN: ${formData.gstin}]` : ''}`;
    
    const url = getCartWhatsAppUrl(
      cart,
      subtotal,
      discount,
      tax,
      shipping,
      total,
      appliedCoupon || undefined,
      `${formData.fullName} (${formData.phone})`,
      fullAddress
    );

    window.open(url, '_blank', 'noopener,noreferrer');
    clearCart();
    router.push('/order-success');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '30px 0 60px 0' }}>
        <div className="container">
          
          {/* Top Breadcrumb & Title */}
          <div style={{ marginBottom: '24px' }}>
            <Link href="/products" style={{ color: '#06b6d4', textDecoration: 'none', fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <ArrowLeft size={14} /> Back to Catalog
            </Link>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff' }}>
              Checkout & Delivery Details
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
              Fill in your delivery address below to place your order directly via WhatsApp.
            </p>
          </div>

          <form onSubmit={handlePlaceWhatsAppOrder}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '30px',
              alignItems: 'start'
            }}>
              {/* Left Column: Delivery Form */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                
                {/* 1. Customer & Delivery Address */}
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
                      Customer & Shipping Details
                    </h3>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        Full Name *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <User size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                        <input
                          type="text"
                          name="fullName"
                          required
                          placeholder="e.g. Anand Patel"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="form-input"
                          style={{ paddingLeft: '36px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        WhatsApp / Phone Number *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                        <input
                          type="tel"
                          name="phone"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          style={{ paddingLeft: '36px' }}
                        />
                      </div>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        Email Address (for GST invoice)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                        <input
                          type="email"
                          name="email"
                          placeholder="yourname@gmail.com"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          style={{ paddingLeft: '36px' }}
                        />
                      </div>
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        Complete Street Address / Office / House No. *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <MapPin size={15} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                        <input
                          type="text"
                          name="address"
                          required
                          placeholder="House/Shop No., Street, Landmark, Area..."
                          value={formData.address}
                          onChange={handleInputChange}
                          className="form-input"
                          style={{ paddingLeft: '36px' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        placeholder="Ahmedabad / Surat / Nearby"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '6px', display: 'block' }}>
                        Pincode / Postal Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        placeholder="380015"
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

                {/* 2. Payment Method (Cash on Delivery / WhatsApp Order) */}
                <div className="glass-panel" style={{ padding: '28px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(16, 185, 129, 0.15)',
                      color: '#10b981',
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

                  <div style={{
                    padding: '20px',
                    borderRadius: '14px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1.5px solid #10b981',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px'
                  }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '10px',
                      background: 'rgba(16, 185, 129, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981',
                      flexShrink: 0
                    }}>
                      <Truck size={22} />
                    </div>

                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        Cash on Delivery (COD) / Pay on Delivery
                        <CheckCircle2 size={16} color="#10b981" />
                      </div>
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px', lineHeight: 1.5 }}>
                        Pay securely with Cash, UPI (GPay/PhonePe) or Card when your order arrives at your doorstep. Order confirmation will be sent directly to your WhatsApp.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Place Order */}
              <div className="glass-panel" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px', position: 'sticky', top: '90px' }}>
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
                      <span>Discount</span>
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
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>Total Payable (COD)</span>
                    <span style={{ fontSize: '1.6rem', fontWeight: 900 }} className="text-gradient">
                      ₹{total.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Only Single WhatsApp Order Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '14px',
                    padding: '16px',
                    fontSize: '1.05rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(16, 185, 129, 0.45)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                >
                  <MessageCircle size={22} />
                  Place Order via WhatsApp (Instant Order)
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.75rem', color: '#64748b' }}>
                  <Lock size={14} color="#10b981" /> 100% Genuine Hardware & Verified WhatsApp Fulfillment
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
