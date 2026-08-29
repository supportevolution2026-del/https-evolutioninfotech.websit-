'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { WHATSAPP_PHONE_NUMBER, COMPANY_NAME } from '@/utils/whatsapp';
import {
  X,
  Send,
  Wrench,
  CheckCircle2,
  Mail,
  Phone,
  User,
  MessageCircle
} from 'lucide-react';

interface ServiceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function ServiceInquiryModal({
  isOpen,
  onClose,
  initialService = 'Computer Repair'
}: ServiceInquiryModalProps) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceType: initialService,
    preferredTime: 'Anytime (10 AM - 8 PM)',
    city: 'Ahmedabad / Surat / Gujarat',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Sync serviceType if initialService changes
  React.useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceType: initialService }));
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleSubmitWeb = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      addToast({
        type: 'success',
        title: 'Service Inquiry Received!',
        message: 'Our certified IT & Software engineer will contact you shortly.',
      });
    }, 1000);
  };

  const handleSendWhatsApp = () => {
    const text = 
`*NEW SERVICE & SOFTWARE INQUIRY - ${COMPANY_NAME}*

*Customer Name:* ${formData.name || 'N/A'}
*Phone Number:* ${formData.phone || 'N/A'}
*Email:* ${formData.email || 'N/A'}
*Location / City:* ${formData.city}
*Service Requested:* ${formData.serviceType}
*Preferred Time:* ${formData.preferredTime}
*Problem / Requirements:* ${formData.notes || 'Please connect for service scheduling and quotation.'}

Please connect with me regarding service estimation and dispatch.`;

    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1250,
      backgroundColor: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ position: 'absolute', inset: 0 }} onClick={handleClose} />

      <div style={{
        position: 'relative',
        zIndex: 1251,
        width: '100%',
        maxWidth: '560px',
        backgroundColor: '#ffffff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 25px 60px -12px rgba(15, 23, 42, 0.18)',
        padding: '32px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '30px 10px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#ecfdf5',
              border: '1px solid #a7f3d0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981',
              margin: '0 auto 16px auto'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '8px' }}>
              Inquiry Submitted Successfully!
            </h3>
            <p style={{ color: '#475569', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '420px', margin: '0 auto 24px auto' }}>
              Thank you {formData.name}. Our IT & Software support team will reach out to you at {formData.phone || 'your number'} within 30 minutes.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={handleSendWhatsApp}
                style={{
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
                }}
              >
                <MessageCircle size={18} /> Chat on WhatsApp Live
              </button>
              <button onClick={handleClose} className="btn-secondary" style={{ padding: '12px 20px' }}>
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '14px',
                background: '#eff6ff',
                border: '1px solid #bfdbfe',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#2563eb'
              }}>
                <Wrench size={24} />
              </div>
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a' }}>
                  Service & Software Inquiry
                </h2>
                <p style={{ fontSize: '0.82rem', color: '#64748b' }}>
                  Evolution Infotech &bull; 24/7 Support Desk
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmitWeb} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '4px', display: 'block', fontWeight: 700, textTransform: 'uppercase' }}>
                  Select Service Required *
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                  className="form-input"
                  style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb', background: '#ffffff' }}
                >
                  <option value="Web Application / Website">Web Application / Website</option>
                  <option value="Mobile Application (iOS & Android)">Mobile Application (iOS & Android)</option>
                  <option value="Desktop Application">Desktop Application</option>
                  <option value="E-commerce Website / Application">E-commerce Website / Application</option>
                  <option value="Computer / Laptop Repair">Computer / Laptop Repair & Hardware</option>
                  <option value="Yearly AMC Support">Yearly AMC Support & Maintenance</option>
                  <option value="Networking & CCTV">Networking, WiFi & CCTV Setup</option>
                  <option value="Other / General Inquiry">Other / General Inquiry</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '4px', display: 'block', fontWeight: 700 }}>
                    Your Name *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                      style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '4px', display: 'block', fontWeight: 700 }}>
                    Phone / WhatsApp *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Phone size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="form-input"
                      style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '4px', display: 'block', fontWeight: 700 }}>
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '4px', display: 'block', fontWeight: 700 }}>
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="Ahmedabad / Surat / Nearby"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#475569', marginBottom: '4px', display: 'block', fontWeight: 700 }}>
                  Describe the Issue or Software Project Requirements
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Laptop not turning on / Need a billing software / 8 Camera CCTV setup for shop..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="form-input"
                  style={{ fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  style={{
                    width: '100%',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '13px',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
                  }}
                >
                  <MessageCircle size={18} />
                  Send Inquiry on WhatsApp (Instant Response)
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.92rem' }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry Form'} <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
