'use client';

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export default function BrandLogo({ size = 'md' }: BrandLogoProps) {
  const heights = {
    sm: 38,
    md: 48,
    lg: 60
  };

  const currentHeight = heights[size];

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', userSelect: 'none' }}>
      <img
        src="/images/logo-transparent.png"
        alt="Evolution Infotech - Solution of Technologies"
        style={{
          height: `${currentHeight}px`,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          filter: 'drop-shadow(0 2px 10px rgba(249, 115, 22, 0.25))'
        }}
      />
    </div>
  );
}
