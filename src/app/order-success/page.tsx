'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { OrderDetails } from '@/types';
import {
  CheckCircle2,
  Truck,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti not available', e);
    }

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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 0 60px 0' }}>
        <div className="container" style={{ maxWidth: '850px' }}>
          {/* Success Banner */}
          <div className="glass-panel" style={{
            padding: '40px',
            textAlign: 'center',
            marginBottom: '30px',
            border: '1.5px solid #a7f3d0',
            background: 'linear-gradient(135deg, #ffffff 0%, #ecfdf5 100%)',
            borderRadius: '24px'
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: '#dcfce7',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
              margin: '0 auto 16px auto',
              boxShadow: '0 8px 20px rgba(16, 185, 129, 0.25)'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <div style={{ fontSize: '0.85rem', color: '#15803d', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              ORDER DISPATCHED ON WHATSAPP
            </div>

            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
              Thank you for your order!
            </h1>

            <p style={{ color: '#475569', fontSize: '0.95rem', marginTop: '8px', maxWidth: '520px', margin: '8px auto 0 auto' }}>
              Your order <strong style={{ color: '#2563eb' }}>#{order?.orderId || orderId || 'EVO-892401'}</strong> has been registered with Evolution Infotech. Our dispatch manager will verify and confirm tracking via WhatsApp.
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
          <div className="glass-panel" style={{ padding: '28px', marginBottom: '30px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', marginBottom: '20px' }}>
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
                    background: step.status === 'done' || step.status === 'active' ? '#2563eb' : '#f1f5f9',
                    color: step.status === 'done' || step.status === 'active' ? '#ffffff' : '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 800,
                    fontSize: '0.85rem'
                  }}>
                    {idx + 1}
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: step.status === 'pending' ? '#64748b' : '#0f172a' }}>
                    {step.label}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#2563eb', fontWeight: 700 }}>
                    {step.date}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem', color: '#475569' }}>
              <span>Courier Partner: <strong>BlueDart / Delhivery Air Cargo</strong></span>
              <span>AWB Airway Bill: <strong style={{ color: '#2563eb' }}>{order?.trackingNumber || 'IND-EXPRESS-928412'}</strong></span>
            </div>
          </div>

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
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#2563eb' }}>Loading Order Status...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
