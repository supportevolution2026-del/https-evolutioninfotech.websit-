'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { OrderDetails } from '@/types';
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  FileText,
  Printer,
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Fire celebratory confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti not available', e);
    }

    // Retrieve order
    try {
      const saved = localStorage.getItem('evo_last_order');
      if (saved) {
        setOrder(JSON.parse(saved));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 0 60px 0' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          {/* Success Banner */}
          <div className="glass-panel" style={{
            padding: '36px',
            textAlign: 'center',
            marginBottom: '30px',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.1), rgba(15, 23, 42, 0.9))'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
              margin: '0 auto 16px auto',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.4)'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <div style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              PAYMENT & ORDER CONFIRMED
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>
              Thank you for your order!
            </h1>

            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginTop: '8px', maxWidth: '520px', margin: '8px auto 0 auto' }}>
              Your order <strong style={{ color: '#06b6d4' }}>#{order?.orderId || orderId || 'EVO-892401'}</strong> has been registered with Evolution Infotech. A confirmation email and tax invoice have been dispatched.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginTop: '24px' }}>
              <button onClick={handlePrint} className="btn-secondary" style={{ padding: '10px 20px', fontSize: '0.88rem' }}>
                <Printer size={16} /> Print GST Invoice
              </button>
              <Link href={`/track-order?id=${order?.orderId || orderId}`} className="btn-primary" style={{ padding: '10px 24px', fontSize: '0.88rem' }}>
                <Truck size={16} /> Track Consignment
              </Link>
            </div>
          </div>

          {/* Tracking Progress Timeline */}
          <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff', marginBottom: '20px' }}>
              Consignment Shipment Progress
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center', position: 'relative' }}>
              {[
                { label: 'Order Confirmed', status: 'done', date: 'Today' },
                { label: 'Hardware QA & Packing', status: 'done', date: 'Today' },
                { label: 'Express Transit', status: 'active', date: 'Tomorrow' },
                { label: 'Delivered', status: 'pending', date: order?.estimatedDelivery || 'In 3 Days' }
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: step.status === 'done' || step.status === 'active' ? '#06b6d4' : 'rgba(255, 255, 255, 0.08)',
                    color: step.status === 'done' || step.status === 'active' ? '#080c14' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: step.status === 'pending' ? '#64748b' : '#f8fafc' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#06b6d4' }}>
                    {step.date}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: '#94a3b8' }}>
              <span>Courier Partner: <strong>BlueDart / Delhivery Air Cargo</strong></span>
              <span>AWB Airway Bill: <strong style={{ color: '#38bdf8' }}>{order?.trackingNumber || 'IND-EXPRESS-928412'}</strong></span>
            </div>
          </div>

          {/* Invoice Summary Box */}
          {order && (
            <div className="glass-panel" style={{ padding: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700 }}>TAX INVOICE DETAILS</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>Order #{order.orderId}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.82rem', color: '#94a3b8' }}>
                  <div>Date: {order.date}</div>
                  <div>Payment: {order.paymentMethod} (Paid)</div>
                </div>
              </div>

              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                {order.items.map((item) => (
                  <div key={item.product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={item.product.image} alt="" style={{ width: '45px', height: '45px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ color: '#ffffff', fontWeight: 600 }}>{item.product.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Qty: {item.quantity} &bull; {item.product.warranty}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700, color: '#38bdf8' }}>
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#94a3b8' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal:</span>
                  <span>₹{order.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {order.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#34d399' }}>
                    <span>Discount:</span>
                    <span>-₹{order.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>GST (18% IT Tax):</span>
                  <span>₹{order.tax.toLocaleString('en-IN')}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 800, color: '#ffffff', borderTop: '1px solid rgba(255, 255, 255, 0.1)', paddingTop: '10px', marginTop: '6px' }}>
                  <span>Total Amount Paid:</span>
                  <span className="text-gradient">₹{order.total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Delivery Address */}
              <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: '10px', fontSize: '0.85rem', color: '#cbd5e1' }}>
                <div style={{ fontWeight: 700, color: '#06b6d4', marginBottom: '4px' }}>Shipping Address:</div>
                <div>{order.customer.fullName} &bull; {order.customer.phone}</div>
                <div>{order.customer.address}, {order.customer.city}, {order.customer.state} - {order.customer.pincode}</div>
              </div>
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <Link href="/" className="btn-secondary" style={{ padding: '12px 24px' }}>
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#06b6d4' }}>Loading Order Status...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
