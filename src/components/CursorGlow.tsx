'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CalmParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  hue: number;
  alpha: number;
  life: number;
  maxLife: number;
}

export default function CursorGlow() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: -200, y: -200 });
  const pos = useRef({ x: -200, y: -200 });
  const vel = useRef({ x: 0, y: 0 });
  const hueRef = useRef<number>(335); // Soothing Calm Rose/Pink

  const [hovered, setHovered] = useState(false);
  const [hoverText, setHoverText] = useState('');
  const [currentHue, setCurrentHue] = useState(335);

  useEffect(() => {
    // Only run on desktop devices with mouse cursor
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles: CalmParticle[] = [];

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.current.x;
      const dy = e.clientY - mouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Slow, calming, graceful hue shift (Shaant & soothing transition)
      hueRef.current = (hueRef.current + dist * 0.18) % 360;
      setCurrentHue(Math.round(hueRef.current));

      // Spawn soft, serene fluid aura droplets
      if (dist > 6) {
        const count = Math.min(Math.floor(dist / 16) + 1, 2);
        for (let i = 0; i < count; i++) {
          const spreadAngle = Math.random() * Math.PI * 2;
          const spreadSpeed = Math.random() * 0.8;
          const initialSize = 35 + Math.random() * 25;

          particles.push({
            x: e.clientX + (Math.random() - 0.5) * 8,
            y: e.clientY + (Math.random() - 0.5) * 8,
            vx: Math.cos(spreadAngle) * spreadSpeed + dx * 0.03,
            vy: Math.sin(spreadAngle) * spreadSpeed + dy * 0.03,
            radius: initialSize,
            hue: (hueRef.current + (Math.random() - 0.5) * 20 + 360) % 360,
            alpha: 0.32, // Soft, calm, non-distracting opacity
            life: 0,
            maxLife: 45 + Math.random() * 25 // Slower, peaceful fade
          });
        }
      }

      // Check hover
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, input, select, [role="button"], img, .cursor-hover, .glass-card, .btn-primary, .btn-secondary');

      if (interactive) {
        setHovered(true);
        const text = interactive.getAttribute('data-cursor-text');
        setHoverText(text || '');
      } else {
        setHovered(false);
        setHoverText('');
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Gentle calm ripple
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.3;
        const speed = 1.2 + Math.random() * 2;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 25 + Math.random() * 15,
          hue: (hueRef.current + i * 15) % 360,
          alpha: 0.45,
          life: 0,
          maxLife: 50
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });

    let frameId: number;

    // Peaceful 60/120 FPS Fluid Render Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render all Soft Calm Color Droplets
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96; // Smooth gentle glide
        p.vy *= 0.96;

        const progress = p.life / p.maxLife;
        const currentAlpha = p.alpha * Math.sin((1 - progress) * (Math.PI / 2));
        const currentRadius = p.radius * (1 + progress * 0.2); // Expands softly

        if (progress >= 1 || currentAlpha <= 0.005) {
          particles.splice(i, 1);
          continue;
        }

        // Calming Pastel HSL: 60% Saturation, 68% Lightness for shaant look
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, currentRadius);
        grad.addColorStop(0, `hsla(${p.hue}, 65%, 68%, ${currentAlpha * 0.85})`);
        grad.addColorStop(0.5, `hsla(${(p.hue + 15) % 360}, 60%, 72%, ${currentAlpha * 0.4})`);
        grad.addColorStop(1, `hsla(${(p.hue + 30) % 360}, 55%, 75%, 0)`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Gentle Liquid Spring Physics for Main Lead Blob
      const dx = mouse.current.x - pos.current.x;
      const dy = mouse.current.y - pos.current.y;

      vel.current.x += dx * 0.14; // Relaxed spring
      vel.current.y += dy * 0.14;

      vel.current.x *= 0.72; // Smooth dampening
      vel.current.y *= 0.72;

      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      // Gentle speed stretch
      const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
      const stretch = Math.min(speed * 0.01, 0.25);
      const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);

      if (blobRef.current) {
        blobRef.current.style.transform = `
          translate3d(${pos.current.x}px, ${pos.current.y}px, 0)
          translate(-50%, -50%)
          rotate(${angle}deg)
          scale(${1 + stretch}, ${1 - stretch * 0.5})
        `;
      }

      // 3. Center Indicator
      if (dotRef.current) {
        dotRef.current.style.transform = `
          translate3d(${mouse.current.x}px, ${mouse.current.y}px, 0)
          translate(-50%, -50%)
        `;
      }

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        overflow: 'hidden'
      }}
    >
      {/* 1. Calm Ambient Fullscreen Trail Canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          mixBlendMode: 'multiply'
        }}
      />

      {/* 2. Main Serene Lead Blob (Gentle Pastel Tone with Soft Blur) */}
      <div
        ref={blobRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: hovered ? '76px' : '54px',
          height: hovered ? '76px' : '54px',
          borderRadius: '50%',
          // Calm, elegant pastel gradient
          background: `radial-gradient(circle, 
            hsla(${currentHue}, 65%, 68%, 0.45) 0%, 
            hsla(${(currentHue + 25) % 360}, 60%, 72%, 0.28) 50%, 
            hsla(${(currentHue + 50) % 360}, 55%, 75%, 0.08) 80%, 
            transparent 100%)`,
          boxShadow: `0 0 30px hsla(${currentHue}, 65%, 70%, 0.25)`,
          filter: 'blur(8px)',
          mixBlendMode: 'multiply',
          willChange: 'transform, width, height',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1), height 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none'
        }}
      >
        {hoverText && (
          <span
            style={{
              fontSize: '10px',
              fontWeight: 800,
              color: '#334155',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              filter: 'none'
            }}
          >
            {hoverText}
          </span>
        )}
      </div>

      {/* 3. Subtle Gentle Center Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          backgroundColor: `hsla(${currentHue}, 75%, 60%, 0.7)`,
          boxShadow: `0 0 10px hsla(${currentHue}, 75%, 60%, 0.5)`,
          opacity: hovered ? 0 : 0.85,
          transition: 'opacity 0.2s ease',
          pointerEvents: 'none',
          willChange: 'transform'
        }}
      />
    </div>
  );
}