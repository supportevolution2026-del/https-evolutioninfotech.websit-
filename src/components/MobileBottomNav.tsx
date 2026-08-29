'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { WHATSAPP_PHONE_NUMBER, getCustomWhatsAppUrl } from '@/utils/whatsapp';
import {
  Home,
  ShoppingBag,
  Wrench,
  PhoneCall,
  MessageCircle
} from 'lucide-react';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const servicesWhatsAppUrl = getCustomWhatsAppUrl(
    'IT Services & Computer Repair Inquiry',
    'Hello Evolution Infotech! I want to inquire about IT Services, Laptop / PC Repair, and AMC Maintenance.'
  );

  const navItems = [
    { label: 'Home', href: '/', icon: Home, isExternal: false },
    { label: 'Store', href: '/products', icon: ShoppingBag, isExternal: false },
    { label: 'Services', href: servicesWhatsAppUrl, icon: Wrench, isExternal: true },
    { label: 'Contact', href: '/contact', icon: PhoneCall, isExternal: false },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1050,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: '1px solid #e2e8f0',
        padding: '8px 12px 10px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.06)'
      }}
      className="mobile-only"
    >
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = !item.isExternal && (pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href)));

        if (item.isExternal) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                color: '#2563eb',
                gap: '4px',
                padding: '6px 10px',
                borderRadius: '12px',
                transition: 'all 0.2s ease',
                flex: 1,
                textAlign: 'center'
              }}
            >
              <Icon size={20} color="#2563eb" />
              <span style={{ fontSize: '0.74rem', fontWeight: 700 }}>
                {item.label}
              </span>
            </a>
          );
        }

        return (
          <Link
            key={item.label}
            href={item.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: isActive ? '#2563eb' : '#64748b',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: '12px',
              background: isActive ? '#eff6ff' : 'transparent',
              transition: 'all 0.2s ease',
              flex: 1,
              textAlign: 'center'
            }}
          >
            <Icon size={20} color={isActive ? '#2563eb' : '#64748b'} />
            <span style={{ fontSize: '0.74rem', fontWeight: isActive ? 800 : 600 }}>
              {item.label}
            </span>
          </Link>
        );
      })}

      {/* WhatsApp Quick Action Tab */}
      <a
        href={`https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hello%20Evolution%20Infotech!%20I%20have%20an%20inquiry.`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          color: '#16a34a',
          gap: '4px',
          padding: '6px 10px',
          borderRadius: '12px',
          transition: 'all 0.2s ease',
          flex: 1,
          textAlign: 'center'
        }}
      >
        <MessageCircle size={20} color="#16a34a" />
        <span style={{ fontSize: '0.74rem', fontWeight: 700 }}>
          WhatsApp
        </span>
      </a>
    </div>
  );
}
