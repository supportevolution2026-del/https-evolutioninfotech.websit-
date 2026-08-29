'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'light' | 'dark' | 'auto';
  showSubtitle?: boolean;
}

export default function BrandLogo({ size = 'md', variant = 'light', showSubtitle = true }: BrandLogoProps) {
  const sizes = {
    sm: { iconSize: 34, titleSize: '1.25rem', subtitleSize: '0.52rem', gap: 8 },
    md: { iconSize: 44, titleSize: '1.55rem', subtitleSize: '0.62rem', gap: 10 },
    lg: { iconSize: 56, titleSize: '1.95rem', subtitleSize: '0.74rem', gap: 12 },
  };

  const current = sizes[size];
  const isDarkTheme = variant === 'dark';

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${current.gap}px`,
        userSelect: 'none',
        textDecoration: 'none'
      }}
    >
      {/* 1. Official Orange WiFi Monitor Icon */}
      <img
        src="/images/logo-icon.png"
        alt="Evolution Infotech Logo Icon"
        style={{
          height: `${current.iconSize}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          flexShrink: 0,
          filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.3))'
        }}
      />

      {/* 2. Crystal Clear High-Contrast Typography */}
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
          <span
            style={{
              fontSize: current.titleSize,
              fontWeight: 900,
              color: '#ea580c', // Vibrant Orange
              fontStyle: 'italic',
              letterSpacing: '-0.5px'
            }}
          >
            Evolution
          </span>
          <span
            style={{
              fontSize: current.titleSize,
              fontWeight: 900,
              color: isDarkTheme ? '#ffffff' : '#0f172a', // Deep solid Black/Slate on light theme
              fontStyle: 'italic',
              letterSpacing: '-0.5px'
            }}
          >
            Infotech
          </span>
        </div>

        {/* Brand Horizontal Divider */}
        <div
          style={{
            height: '2px',
            width: '100%',
            background: 'linear-gradient(90deg, #ea580c 0%, #f97316 60%, rgba(249, 115, 22, 0.2) 100%)',
            margin: '2px 0 3px 0',
            borderRadius: '1px'
          }}
        />

        {/* Subtitle Slogan: SOLUTION OF TECHNOLOGIES */}
        {showSubtitle && (
          <span
            style={{
              fontSize: current.subtitleSize,
              fontWeight: 800,
              color: isDarkTheme ? '#cbd5e1' : '#475569', // Crisp readable gray
              letterSpacing: '2.2px',
              textTransform: 'uppercase'
            }}
          >
            SOLUTION OF TECHNOLOGIES
          </span>
        )}
      </div>
    </div>
  );
}
