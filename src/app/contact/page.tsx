'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/context/ToastContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Globe,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Hardware Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast({
        type: 'success',
        title: 'Message Sent Successfully!',
        message: 'Thank you for reaching out. An Evolution Infotech support engineer will reply shortly.',
      });
      setFormData({ name: '', email: '', phone: '', subject: 'Hardware Inquiry', message: '' });
    }, 1000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '40px 0 60px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              REACH OUR IT EXPERTS
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#ffffff', marginTop: '6px' }}>
              Get in Touch with Evolution Infotech
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1rem', maxWidth: '600px', margin: '8px auto 0 auto' }}>
              Whether you need hardware recommendations, custom server sizing, or quotation for bulk purchases, our team is ready to assist you.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'start'
          }}>
            {/* Contact Details & Info Card */}
            <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>
                  Headquarters & Sales Desk
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '4px' }}>
                  Evolution Infotech Private Limited
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#06b6d4', flexShrink: 0 }}>
                    <Globe size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>OFFICIAL PORTAL</div>
                    <a href="https://evolutioninfotech.in" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'none', fontWeight: 700 }}>
                      https://evolutioninfotech.in
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981', flexShrink: 0 }}>
                    <Mail size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>EMAIL INQUIRIES</div>
                    <div style={{ color: '#ffffff', fontWeight: 600 }}>sales@evolutioninfotech.in</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>support@evolutioninfotech.in</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6', flexShrink: 0 }}>
                    <Phone size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>TELEPHONE & TOLL FREE</div>
                    <div style={{ color: '#ffffff', fontWeight: 600 }}>+91 98790 12345</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>+91 (0261) 2233445 (Mon - Sat, 10am - 8pm)</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b', flexShrink: 0 }}>
                    <MapPin size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>PHYSICAL LOCATION</div>
                    <div style={{ color: '#ffffff', fontWeight: 600 }}>Infotech Tower, Ring Road</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.82rem' }}>Surat / Ahmedabad, Gujarat, India - 380015</div>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action Button */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '20px' }}>
                <a
                  href="https://wa.me/919879012345?text=Hello%20Evolution%20Infotech,%20I%20have%20an%20inquiry%20regarding%20IT%20hardware%20procurement"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    padding: '14px',
                    fontSize: '0.95rem'
                  }}
                >
                  <MessageCircle size={20} /> Chat on WhatsApp Live
                </a>
              </div>
            </div>

            {/* Inquiry Form */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '8px' }}>
                Send Us a Message
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px' }}>
                Fill out the form below and an engineer will respond within 30 minutes.
              </p>

              {submitted ? (
                <div style={{
                  padding: '30px 20px',
                  textAlign: 'center',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '14px',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <CheckCircle2 size={40} color="#10b981" style={{ margin: '0 auto 12px auto' }} />
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#ffffff' }}>Message Sent!</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '6px' }}>
                    Thank you! We will reach back out to you promptly.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-secondary" style={{ marginTop: '16px', fontSize: '0.85rem' }}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px', display: 'block' }}>
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px', display: 'block' }}>
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px', display: 'block' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px', display: 'block' }}>
                      Inquiry Subject
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-input"
                    >
                      <option value="Hardware Inquiry">Hardware Purchase / Quotation</option>
                      <option value="Server / Datacenter Setup">Server / Datacenter Infrastructure</option>
                      <option value="Microsoft 365 Cloud">Microsoft 365 Cloud & Licenses</option>
                      <option value="Corporate GST Purchase">Corporate B2B GST Billing</option>
                      <option value="Warranty & Support">Technical Support / Warranty</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '4px', display: 'block' }}>
                      Message / Specifications *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Please let us know your requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                    style={{ width: '100%', padding: '14px', fontSize: '1rem', marginTop: '6px' }}
                  >
                    {isSubmitting ? 'Transmitting Message...' : 'Send Message to Sales Team'} <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
