'use client';

import React from 'react';

export default function CyberBackground() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: -1,
        overflow: 'hidden',
        background: '#f8fafc',
      }}
    >
      {/* Sky Blue Ambient Sphere */}
      <div
        style={{
          position: 'absolute',
          top: '-15%',
          left: '-10%',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(56, 189, 248, 0.18) 0%, rgba(240, 249, 255, 0) 70%)',
          animation: 'floatSlow 14s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />

      {/* Indigo Violet Ambient Sphere */}
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '-10%',
          width: '750px',
          height: '750px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167, 139, 250, 0.15) 0%, rgba(245, 243, 255, 0) 70%)',
          animation: 'floatSlow 18s ease-in-out infinite alternate-reverse',
          pointerEvents: 'none'
        }}
      />

      {/* Emerald Ambient Sphere at Bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          left: '20%',
          width: '650px',
          height: '650px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(110, 231, 183, 0.14) 0%, rgba(236, 253, 245, 0) 70%)',
          animation: 'floatSlow 16s ease-in-out infinite alternate',
          pointerEvents: 'none'
        }}
      />

      {/* High-Tech Ultra Subtle Micro-Dot Matrix */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            radial-gradient(rgba(148, 163, 184, 0.18) 1.2px, transparent 1.2px)
          `,
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 100%)',
        }}
      />
    </div>
  );
}
