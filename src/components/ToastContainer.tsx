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
      zIndex: 9999,
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
              borderRadius: '12px',
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(16px)',
              border: `1px solid ${
                isSuccess
                  ? 'rgba(16, 185, 129, 0.5)'
                  : isError
                  ? 'rgba(244, 63, 94, 0.5)'
                  : isWarning
                  ? 'rgba(245, 158, 11, 0.5)'
                  : 'rgba(6, 182, 212, 0.5)'
              }`,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.6)',
              animation: 'floatAnim 0.3s ease-out'
            }}
          >
            <div style={{ marginTop: '2px', flexShrink: 0 }}>
              {isSuccess && <CheckCircle2 size={20} color="#10b981" />}
              {isError && <XCircle size={20} color="#f43f5e" />}
              {isWarning && <AlertCircle size={20} color="#f59e0b" />}
              {!isSuccess && !isError && !isWarning && <Info size={20} color="#06b6d4" />}
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>
                {toast.title}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>
                {toast.message}
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#64748b',
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
