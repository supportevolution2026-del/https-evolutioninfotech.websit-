'use client';

import React from 'react';
import { useToast } from '@/context/ToastContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 99999,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      maxWidth: '380px',
      width: '100%'
    }}>
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isError = toast.type === 'error';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              padding: '14px 16px',
              borderRadius: '16px',
              background: '#ffffff',
              border: `1px solid ${
                isSuccess
                  ? '#a7f3d0'
                  : isError
                  ? '#fecdd3'
                  : isWarning
                  ? '#fde68a'
                  : '#bfdbfe'
              }`,
              boxShadow: '0 12px 30px -4px rgba(15, 23, 42, 0.15)',
              animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            <div style={{ marginTop: '2px', flexShrink: 0 }}>
              {isSuccess && <CheckCircle2 size={20} color="#16a34a" />}
              {isError && <XCircle size={20} color="#e11d48" />}
              {isWarning && <AlertCircle size={20} color="#d97706" />}
              {!isSuccess && !isError && !isWarning && <Info size={20} color="#2563eb" />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0f172a' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#475569', marginTop: '2px' }}>
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
