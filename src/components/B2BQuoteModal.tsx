'use client';

import React, { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import {
  X,
  Send,
  Building2,
  CheckCircle2,
  FileSpreadsheet,
  Cpu,
  Mail,
  Phone,
  User
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
    requirementType: 'Bulk Hardware & Workstations',
    estimatedBudget: '₹1,00,000 - ₹5,00,000',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      addToast({
        type: 'success',
        title: 'Quote Request Received!',
        message: 'Our corporate IT sales team will contact you within 2 hours with wholesale pricing.',
      });
    }, 1200);
  };

  const handleClose = () => {
    setIsSuccess(false);
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
      <div style={{ position: 'absolute', inset: 0 }} onClick={handleClose} />

      <div style={{
        position: 'relative',
        zIndex: 1201,
        width: '100%',
        maxWidth: '580px',
        backgroundColor: '#0b1120',
        borderRadius: '20px',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(6, 182, 212, 0.2)',
        padding: '30px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
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
              background: 'rgba(16, 185, 129, 0.15)',
              border: '2px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto',
              color: '#10b981'
            }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>Corporate Inquiry Submitted</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '8px', lineHeight: 1.5 }}>
              Thank you, <strong>{formData.contactName}</strong>. Our enterprise IT hardware specialist will reach out to <strong>{formData.email}</strong> with customized pricing & GST invoice terms.
            </p>
            <button onClick={handleClose} className="btn-primary" style={{ marginTop: '24px', padding: '10px 24px' }}>
              Done
            </button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'rgba(6, 182, 212, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#06b6d4'
              }}>
                <Building2 size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f8fafc' }}>
                  B2B Corporate & Bulk Quote
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Evolution Infotech &bull; GST Input Tax Credit & Wholesale Discounts
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '18px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                    Company / Organization *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Building2 size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input
                      type="text"
                      required
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
                      placeholder="Your Name"
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
                    Official Email *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '14px' }} />
                    <input
                      type="email"
                      required
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

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                    Requirement Category
                  </label>
                  <select
                    value={formData.requirementType}
                    onChange={(e) => setFormData({ ...formData, requirementType: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <option value="Bulk Hardware & Workstations">Bulk Laptops & Workstations</option>
                    <option value="Server Stacks & Networking">Enterprise Servers & Networking</option>
                    <option value="Custom Gaming/AI Rigs">Custom AI Rig & GPU Server</option>
                    <option value="Software Licences">Microsoft / Enterprise Software</option>
                    <option value="Annual IT Maintenance">AMC & Managed IT Infrastructure</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                    Estimated Budget Range
                  </label>
                  <select
                    value={formData.estimatedBudget}
                    onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                    className="form-input"
                    style={{ fontSize: '0.85rem' }}
                  >
                    <option value="₹50,000 - ₹2,00,000">₹50,000 - ₹2,00,000</option>
                    <option value="₹2,00,000 - ₹10,00,000">₹2,00,000 - ₹10,00,000</option>
                    <option value="₹10,00,000 - ₹50,00,000">₹10,00,000 - ₹50,00,000</option>
                    <option value="₹50,00,000+">₹50,00,000+ Enterprise</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '4px', display: 'block', fontWeight: 600 }}>
                  Detailed Requirements / Model Numbers
                </label>
                <textarea
                  rows={3}
                  placeholder="Specify model numbers, quantities, RAM/SSD configurations, delivery location..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="form-input"
                  style={{ fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '0.95rem', marginTop: '6px' }}
              >
                {isSubmitting ? 'Submitting Quote Request...' : 'Submit Official RFP / Quote'} <Send size={16} />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
