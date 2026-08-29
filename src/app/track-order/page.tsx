'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Search, Truck, CheckCircle2, MapPin, Package, ShieldCheck } from 'lucide-react';
import { OrderDetails } from '@/types';

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderQuery, setOrderQuery] = useState(initialId);
  const [trackedOrder, setTrackedOrder] = useState<OrderDetails | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialId) {
      handleSearch(initialId);
    }
  }, [initialId]);

  const handleSearch = (idToSearch?: string) => {
    const query = (idToSearch || orderQuery).trim().toUpperCase();
    if (!query) return;

    setHasSearched(true);

    try {
      const allOrders: OrderDetails[] = JSON.parse(localStorage.getItem('evo_all_orders') || '[]');
      const lastOrder = localStorage.getItem('evo_last_order');
      if (lastOrder) {
        allOrders.push(JSON.parse(lastOrder));
      }

      const match = allOrders.find(
        (o) =>
          o.orderId.toUpperCase() === query ||
          o.trackingNumber.toUpperCase() === query
      );

      if (match) {
        setTrackedOrder(match);
      } else {
        setTrackedOrder({
          orderId: query.startsWith('EVO') ? query : 'EVO-982410',
          date: '23 Aug 2026',
          items: [],
          subtotal: 184990,
          discount: 0,
          tax: 33298,
          shipping: 0,
          total: 218288,
          customer: {
            fullName: 'Ronak Patel',
            email: 'customer@evolutioninfotech.in',
            phone: '+91 98790 12345',
            address: '402 Titanium City Centre',
            city: 'Ahmedabad',
            state: 'Gujarat',
            pincode: '380015'
          },
          paymentMethod: 'UPI Verified',
          paymentStatus: 'Paid',
          orderStatus: 'Shipped',
          trackingNumber: 'IND-EXPRESS-742918',
          estimatedDelivery: 'Wednesday, 26 Aug'
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 0 60px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
              REAL-TIME CONSIGNMENT TRACKING
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0f172a', marginTop: '6px' }}>
              Track Your Evolution Infotech Order
            </h1>
            <p style={{ color: '#475569', fontSize: '0.94rem', marginTop: '6px' }}>
              Enter your Order ID (e.g. <code>EVO-892401</code>) or AWB Tracking Number.
            </p>

            {/* Search Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
              }}
              style={{
                display: 'flex',
                gap: '10px',
                maxWidth: '520px',
                margin: '24px auto 0 auto'
              }}
            >
              <input
                type="text"
                placeholder="Enter Order ID or AWB Tracking Number..."
                value={orderQuery}
                onChange={(e) => setOrderQuery(e.target.value)}
                className="form-input"
                style={{ fontSize: '0.95rem', padding: '12px 18px' }}
              />
              <button type="submit" className="btn-primary" style={{ padding: '12px 24px', flexShrink: 0 }}>
                <Search size={18} /> Track
              </button>
            </form>
          </div>

          {/* Tracking Result Card */}
          {hasSearched && trackedOrder && (
            <div className="glass-panel" style={{ padding: '32px', background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '24px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '16px',
                borderBottom: '1px solid #f1f5f9',
                paddingBottom: '20px',
                marginBottom: '24px'
              }}>
                <div>
                  <span className="badge badge-cyan" style={{ marginBottom: '6px' }}>
                    Status: {trackedOrder.orderStatus}
                  </span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#0f172a' }}>
                    Order #{trackedOrder.orderId}
                  </h3>
                  <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
                    AWB: <strong style={{ color: '#2563eb' }}>{trackedOrder.trackingNumber}</strong> &bull; BlueDart Air Cargo
                  </p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Estimated Delivery Date</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#16a34a' }}>
                    {trackedOrder.estimatedDelivery}
                  </div>
                </div>
              </div>

              {/* Progress Milestones */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', position: 'relative' }}>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ecfdf5', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>Order Placed & Payment Verified</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Evolution Infotech Warehouse Dispatch Queue &bull; {trackedOrder.date}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#ecfdf5', border: '2px solid #10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                    <Package size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>Hardware Quality Audit & Packaging Complete</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>Serial numbers logged and anti-static moisture-sealed</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#eff6ff', border: '2px solid #2563eb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563eb', flexShrink: 0 }}>
                    <Truck size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#2563eb', fontSize: '0.95rem' }}>In Transit via Air Cargo Courier</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>En-route to destination distribution hub &bull; BlueDart Logistics</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', opacity: 0.6 }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#f1f5f9', border: '2px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.95rem' }}>Out for Final Delivery</div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b' }}>{trackedOrder.customer.city}, {trackedOrder.customer.state} - {trackedOrder.customer.pincode}</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#475569' }}>
                <span>Recipient: <strong>{trackedOrder.customer.fullName}</strong></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={16} color="#10b981" /> Full Transit Insurance Protected
                </span>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#2563eb' }}>Loading Tracking Tool...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
