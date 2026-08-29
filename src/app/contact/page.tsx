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
  FileText,
  Building2
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
`👋 *NEW CONTACT INQUIRY - ${COMPANY_NAME}* 👋

👤 *Name:* ${formData.name || 'Not Provided'}
📱 *Phone:* ${formData.phone || 'Not Provided'}
📧 *Email:* ${formData.email || 'Not Provided'}
📌 *Subject:* ${formData.subject}
📝 *Message:* ${formData.message || 'I would like to get in touch with Evolution Infotech.'}

Please connect with me.`;

    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '36px 0 70px 0' }}>
        <div className="container">
          
          {/* Header Hero Section */}
          <div style={{
            borderRadius: '24px',
            background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15), rgba(15, 23, 42, 0.95))',
            border: '1px solid rgba(6, 182, 212, 0.25)',
            padding: '40px 30px',
            textAlign: 'center',
            marginBottom: '40px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              borderRadius: '9999px',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: '#38bdf8',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '14px'
            }}>
              <Sparkles size={14} /> 24/7 CUSTOMER SUPPORT & HARDWARE DESK
            </div>

            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#ffffff', lineHeight: 1.15 }}>
              Get in Touch with <span className="text-gradient">Evolution Infotech</span>
            </h1>

            <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '640px', margin: '12px auto 26px auto', lineHeight: 1.6 }}>
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
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid rgba(6, 182, 212, 0.4)',
                  color: '#38bdf8',
                  padding: '11px 22px',
                  borderRadius: '12px',
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
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
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
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
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#10b981'
                  }}>
                    <Phone size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Direct Connect</h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Voice Call & WhatsApp Support</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Phone / WhatsApp Box */}
                  <div style={{
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '16px 18px',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        PHONE & WHATSAPP
                      </div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                        {WHATSAPP_DISPLAY_PHONE}
                      </div>
                    </div>

                    <a
                      href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hello%20Evolution%20Infotech!`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: 'rgba(16, 185, 129, 0.18)',
                        border: '1px solid #10b981',
                        color: '#34d399',
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
                    background: 'rgba(0, 0, 0, 0.4)',
                    padding: '16px 18px',
                    borderRadius: '14px',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        OFFICIAL EMAIL
                      </div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#38bdf8', marginTop: '2px', wordBreak: 'break-all' }}>
                        {SUPPORT_EMAIL}
                      </div>
                    </div>
                    <Mail size={20} color="#38bdf8" />
                  </div>
                </div>
              </div>

              {/* Store Location Card */}
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(6, 182, 212, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#06b6d4'
                  }}>
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Store Location</h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Walk-in Service & Hardware Center</p>
                  </div>
                </div>

                <div style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '18px 20px',
                  borderRadius: '14px',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      AHMEDABAD HEADQUARTERS
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#f8fafc', marginTop: '4px', lineHeight: 1.5 }}>
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
                      background: 'rgba(6, 182, 212, 0.12)',
                      border: '1px solid rgba(6, 182, 212, 0.4)',
                      color: '#38bdf8',
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
              <div className="glass-panel" style={{ padding: '28px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    background: 'rgba(245, 158, 11, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f59e0b'
                  }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Working Hours</h3>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Support & Repair Timings</p>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Monday - Friday:</span>
                    <span style={{ color: '#38bdf8', fontWeight: 800 }}>10:00 AM - 8:00 PM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Saturday:</span>
                    <span style={{ color: '#38bdf8', fontWeight: 800 }}>10:00 AM - 8:00 PM</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 600 }}>Sunday:</span>
                    <span style={{ color: '#fbbf24', fontWeight: 800 }}>10:00 AM - 2:00 PM</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Send Us an Inquiry Form */}
            <div className="glass-panel" style={{ padding: '36px', borderRadius: '24px' }}>
              <div style={{ marginBottom: '22px' }}>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
                  Send an Inquiry
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '4px' }}>
                  Provide your requirements below and submit directly via WhatsApp or web form.
                </p>
              </div>

              {submitted ? (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  background: 'rgba(16, 185, 129, 0.1)',
                  borderRadius: '16px',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }}>
                  <CheckCircle2 size={46} color="#10b981" style={{ margin: '0 auto 14px auto' }} />
                  <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>Message Received!</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '6px' }}>
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
                    <label style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                      <User size={14} color="#06b6d4" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                      style={{ borderRadius: '10px' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                        <Phone size={14} color="#10b981" /> Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 9876543210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="form-input"
                        style={{ borderRadius: '10px' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                        <Mail size={14} color="#3b82f6" /> Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                        style={{ borderRadius: '10px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                      <HelpCircle size={14} color="#f59e0b" /> Service / Inquiry Topic
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Laptop Repair, Server Quote, Software Development"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="form-input"
                      style={{ borderRadius: '10px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                      <FileText size={14} color="#a855f7" /> Message / Specific Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Describe the hardware configuration, issue, or software features you need..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="form-input"
                      style={{ resize: 'vertical', borderRadius: '10px' }}
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
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.4)',
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
                      style={{
                        width: '100%',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        color: '#cbd5e1',
                        borderRadius: '12px',
                        padding: '12px',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.currentTarget.style.color = '#cbd5e1';
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
