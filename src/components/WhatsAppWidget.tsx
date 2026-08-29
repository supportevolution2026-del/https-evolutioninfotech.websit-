'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { WHATSAPP_PHONE_NUMBER, COMPANY_NAME } from '@/utils/whatsapp';

export default function WhatsAppWidget() {
  const handleOpenWhatsApp = () => {
    const text = `Hello ${COMPANY_NAME}! I want to inquire about IT hardware, computer services or software development.`;
    const url = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}
    >
      {/* Tooltip Badge on Desktop */}
      <div
        className="desktop-only"
        onClick={handleOpenWhatsApp}
        style={{
          background: '#ffffff',
          border: '1.5px solid #bbf7d0',
          borderRadius: '14px',
          padding: '8px 14px',
          boxShadow: '0 8px 24px -4px rgba(16, 185, 129, 0.2), 0 2px 6px rgba(0,0,0,0.04)',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          backdropFilter: 'blur(10px)'
        }}
      >
        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
          Chat with Us Live
        </span>
        <span style={{ fontSize: '0.72rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#16a34a', display: 'inline-block' }} />
          Online on WhatsApp
        </span>
      </div>

      {/* Glowing Floating WhatsApp Button */}
      <button
        onClick={handleOpenWhatsApp}
        aria-label="Direct WhatsApp Chat"
        className="sonar-pulse"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#ffffff',
          border: '2px solid #ffffff',
          boxShadow: '0 8px 25px rgba(16, 185, 129, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1) translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(16, 185, 129, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) translateY(0)';
          e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.45)';
        }}
      >
        <MessageCircle size={28} />
      </button>
    </div>
  );
}
