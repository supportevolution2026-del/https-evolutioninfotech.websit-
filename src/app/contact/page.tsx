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
  Clock,
  CheckCircle2,
  Navigation,
  Sparkles,
  User,
  HelpCircle,
  FileText
} from 'lucide-react';
import {
  WHATSAPP_PHONE_NUMBER,
  WHATSAPP_DISPLAY_PHONE,
  SUPPORT_EMAIL,
  COMPANY_NAME,
  STORE_ADDRESS,
  GOOGLE_MAPS_URL
} from '@/utils/whatsapp';

export default function ContactPage() {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Hardware Inquiry & Quote',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      addToast({
        type: 'error',
        title: 'Required Fields Missing',
        message: 'Please provide your name and phone number.'
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      addToast({
        type: 'success',
        title: 'Message Sent Successfully!',
        message: 'Thank you for reaching out. An Evolution Infotech support engineer will reply shortly.'
      });
    }, 800);
  };

  const handleWhatsAppSend = () => {
    if (!formData.name.trim() && !formData.phone.trim() && !formData.message.trim()) {
      const defaultText = `Hello ${COMPANY_NAME}! I want to inquire about IT hardware, computer services or software development.`;
      window.open(`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(defaultText)}`, '_blank', 'noopener,noreferrer');
      return;
    }

    const text = 
`*NEW CONTACT INQUIRY - ${COMPANY_NAME}*

*Name:* ${formData.name || 'Not Provided'}
*Phone:* ${formData.phone || 'Not Provided'}
*Email:* ${formData.email || 'Not Provided'}
*Subject:* ${formData.subject}
*Message:* ${formData.message || 'I would like to get in touch with Evolution Infotech.'}

Please connect with me.`;

    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '36px 0 70px 0' }}>
        <div className="container">
          
          {/* Header Hero Section */}
          <div style={{
            borderRadius: '28px',
            background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 50%, #f0fdf4 100%)',
            border: '1.5px solid #bfdbfe',
            padding: '44px 30px',
            textAlign: 'center',
            marginBottom: '40px',
            boxShadow: '0 20px 48px -12px rgba(37, 99, 235, 0.12)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: '#e0f2fe',
              border: '1px solid #bae6fd',
              color: '#0284c7',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <Sparkles size={14} /> 24/7 CUSTOMER SUPPORT & HARDWARE DESK
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#0f172a', lineHeight: 1.15 }}>
              Get in Touch with Evolution Infotech
            </h1>

            <p style={{ color: '#475569', fontSize: '1.05rem', maxWidth: '640px', margin: '12px auto 26px auto', lineHeight: 1.6 }}>
              Have questions about hardware procurement, laptop repair, CCTV installations, or custom software projects? We are here to help.
            </p>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  color: '#0284c7',
                  padding: '11px 22px',
                  borderRadius: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Navigation size={17} /> Get Directions (Google Maps)
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hello%20Evolution%20Infotech!%20I%20need%20quick%20support.`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  border: 'none',
                  color: '#ffffff',
                  padding: '11px 22px',
                  borderRadius: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)',
                  transition: 'all 0.2s ease'
                }}
              >
                <MessageCircle size={18} /> WhatsApp Quick Connect
              </a>
            </div>
          </div>

          {/* Main 2-Column Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            alignItems: 'start'
          }}>
            {/* Left Column: Direct Info Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              
              {/* Quick Connect Card */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '24px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#ecfdf5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981'
                  }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>Direct Connect</h3>
                    <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Voice Call & WhatsApp Support</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Phone / WhatsApp Box */}
                  <div style={{
                    background: '#f8fafc',
                    padding: '16px 18px',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        PHONE & WHATSAPP
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0f172a', marginTop: '2px' }}>
                        {WHATSAPP_DISPLAY_PHONE}
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hello%20Evolution%20Infotech!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: '#ecfdf5',
                        border: '1px solid #a7f3d0',
                        color: '#15803d',
                        padding: '8px 14px',
                        borderRadius: '10px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <MessageCircle size={15} /> Chat
                    </a>
                  </div>

                  {/* Email Box */}
                  <div style={{
                    background: '#f8fafc',
                    padding: '16px 18px',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        OFFICIAL EMAIL
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#2563eb', marginTop: '2px', wordBreak: 'break-all' }}>
                        {SUPPORT_EMAIL}
                      </div>
                    </div>
                    <Mail size={20} color="#2563eb" />
                  </div>
                </div>
              </div>

              {/* Store Location Card */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '24px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#eff6ff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#2563eb'
                  }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>Store Location</h3>
                    <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Walk-in Service & Hardware Center</p>
                  </div>
                </div>

                <div style={{
                  background: '#f8fafc',
                  padding: '18px 20px',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      AHMEDABAD HEADQUARTERS
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginTop: '4px', lineHeight: 1.5 }}>
                      {STORE_ADDRESS}
                    </div>
                  </div>

                  <a
                    href={GOOGLE_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      color: '#2563eb',
                      padding: '10px 16px',
                      borderRadius: '10px',
                      fontSize: '0.85rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <Navigation size={15} /> Open in Google Maps
                  </a>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '24px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: '#fffbeb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f59e0b'
                  }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>Working Hours</h3>
                    <p style={{ fontSize: '0.82rem', color: '#64748b' }}>Support & Repair Timings</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#475569', fontWeight: 600 }}>Monday - Friday:</span>
                    <span style={{ color: '#2563eb', fontWeight: 800 }}>10:00 AM - 8:00 PM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                    <span style={{ color: '#475569', fontWeight: 600 }}>Saturday:</span>
                    <span style={{ color: '#2563eb', fontWeight: 800 }}>10:00 AM - 8:00 PM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ color: '#475569', fontWeight: 600 }}>Sunday:</span>
                    <span style={{ color: '#b45309', fontWeight: 800 }}>10:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Send Us an Inquiry Form */}
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px', background: '#ffffff', border: '1px solid #e2e8f0' }}>
              <div style={{ marginBottom: '22px' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 900, color: '#0f172a' }}>
                  Send an Inquiry
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', marginTop: '4px' }}>
                  Provide your requirements below and submit directly via WhatsApp or web form.
                </p>
              </div>

              {submitted ? (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  background: '#ecfdf5',
                  borderRadius: '18px',
                  border: '1px solid #a7f3d0'
                }}>
                  <CheckCircle2 size={46} color="#10b981" style={{ margin: '0 auto 14px auto' }} />
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>Message Received!</h4>
                  <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '6px' }}>
                    Thank you. We will contact you or reply on WhatsApp shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'Hardware Inquiry & Quote', message: '' });
                    }}
                    className="btn-primary"
                    style={{ marginTop: '20px', padding: '10px 22px' }}
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                      <User size={14} color="#0284c7" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                        <Phone size={14} color="#10b981" /> Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                        <Mail size={14} color="#2563eb" /> Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                      <HelpCircle size={14} color="#f59e0b" /> Service / Inquiry Topic
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Laptop Repair, Server Quote, Software Development"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#475569', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                      <FileText size={14} color="#7c3aed" /> Message / Specific Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe the hardware configuration, issue, or software features you need..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-input"
                      style={{ resize: 'vertical' }}
                    />
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
                    {/* Primary Instant WhatsApp Dispatch */}
                    <button
                      type="button"
                      onClick={handleWhatsAppSend}
                      style={{
                        width: '100%',
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '14px',
                        padding: '16px',
                        fontSize: '1rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.35)',
                        transition: 'transform 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                      <MessageCircle size={22} /> Send Inquiry via WhatsApp (Instant Connect)
                    </button>

                    {/* Secondary Web Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-secondary"
                      style={{
                        width: '100%',
                        padding: '12px',
                        fontSize: '0.88rem'
                      }}
                    >
                      <Send size={15} />
                      {isSubmitting ? 'Submitting...' : 'Submit as Web Inquiry'}
                    </button>
                  </div>
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
