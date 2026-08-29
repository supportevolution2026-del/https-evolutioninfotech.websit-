'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { WHATSAPP_PHONE_NUMBER, COMPANY_NAME } from '@/utils/whatsapp';
import {
  X,
  Building2,
  Cpu,
  Mail,
  Phone,
  User,
  MessageCircle,
  IndianRupee,
  PackageCheck
} from 'lucide-react';

interface B2BQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function B2BQuoteModal({ isOpen, onClose }: B2BQuoteModalProps) {
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    requirementType: '',
    estimatedBudget: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.contactName.trim() && !formData.companyName.trim()) {
      addToast({
        type: 'error',
        title: 'Details Required',
        message: 'Please enter your name or company name.',
      });
      return;
    }

    if (!formData.phone.trim()) {
      addToast({
        type: 'error',
        title: 'Phone Required',
        message: 'Please enter your contact phone / WhatsApp number.',
      });
      return;
    }

    const text = 
`*B2B CORPORATE & BULK QUOTE INQUIRY - ${COMPANY_NAME}*

*Company / Org:* ${formData.companyName || 'N/A'}
*Contact Person:* ${formData.contactName || 'N/A'}
*Phone / WhatsApp:* ${formData.phone || 'N/A'}
*Official Email:* ${formData.email || 'N/A'}
*Items / Requirement:* ${formData.requirementType || 'N/A'}
*Estimated Budget:* ${formData.estimatedBudget || 'N/A'}
*Detailed Specs / Notes:* ${formData.notes || 'Please share official wholesale quotation with GST invoice.'}

Please connect with our corporate procurement desk.`;

    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1200,
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(14px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{ position: 'absolute', inset: 0 }} onClick={onClose} />

      <div style={{
        position: 'relative',
        zIndex: 1201,
        width: '100%',
        maxWidth: '580px',
        backgroundColor: '#0b1120',
        borderRadius: '24px',
        border: '1px solid rgba(6, 182, 212, 0.35)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(6, 182, 212, 0.2)',
        padding: '30px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))',
              border: '1px solid rgba(6, 182, 212, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#38bdf8'
            }}>
              <Building2 size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                B2B Corporate & Bulk Quote
              </h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                {COMPANY_NAME} &bull; GST Invoicing & Wholesale Corporate Discounts
              </p>
            </div>
          </div>

          <form onSubmit={handleSendWhatsApp} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                  Company / Organization
                </label>
                <div style={{ position: 'relative' }}>
                  <Building2 size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="text"
                    placeholder="e.g. Infotech Solutions Ltd"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                  Contact Person *
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                  Official Email
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                  Phone / WhatsApp *
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
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

            {/* Manual Requirement & Manual Budget (No dropdowns) */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                  Requirement / Products Needed
                </label>
                <div style={{ position: 'relative' }}>
                  <PackageCheck size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="text"
                    placeholder="e.g. 20 Laptops / 5 Server Racks..."
                    value={formData.requirementType}
                    onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                  Estimated Budget
                </label>
                <div style={{ position: 'relative' }}>
                  <IndianRupee size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                  <input
                    type="text"
                    placeholder="e.g. ₹2,00,000 / Flexible"
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                Detailed Specifications / Model Requirements
              </label>
              <textarea
                rows={3}
                placeholder="Specify exact model numbers, quantities, RAM/SSD configs, delivery location or custom software needs..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="form-input"
                style={{ fontSize: '0.85rem', resize: 'vertical' }}
              />
            </div>

            {/* Single Full-Width Direct WhatsApp Button */}
            <div style={{ marginTop: '8px' }}>
              <button
                type="submit"
                style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '14px',
                  padding: '15px',
                  fontSize: '1rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(16, 185, 129, 0.45)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <MessageCircle size={20} />
                Send Quote Request via WhatsApp (Instant Quote)
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
