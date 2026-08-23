'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { products } from '@/data/products';
import {
  ShoppingBag,
  Heart,
  Search,
  Menu,
  X,
  Cpu,
  Laptop,
  Server,
  PhoneCall,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Truck
} from 'lucide-react';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export default function Navbar({ onOpenQuoteModal }: NavbarProps) {
  const router = useRouter();
  const { totalItems, wishlist, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState(products);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
    } else {
      const q = searchQuery.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  // Click outside to close search dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchFocused(false);
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, width: '100%' }}>
      {/* Top Notification Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '6px 0',
        fontSize: '0.8rem',
        color: '#94a3b8',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8' }}>
              <Sparkles size={14} /> Official Domain: evolutioninfotech.in
            </span>
            <span className="desktop-inline" style={{ color: '#64748b' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Truck size={14} color="#10b981" /> Free Express Delivery on Orders &gt; ₹5,000
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/track-order" style={{ color: '#cbd5e1', textDecoration: 'none', transition: 'color 0.2s' }}>
              Track Order
            </Link>
            <span style={{ color: '#64748b' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#cbd5e1' }}>
              <ShieldCheck size={14} color="#10b981" /> 100% Genuine Hardware
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className="glass-nav" style={{ padding: '14px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(6, 182, 212, 0.4)'
            }}>
              <Cpu size={24} color="#ffffff" />
            </div>
            <div>
              <div style={{
                fontSize: '1.25rem',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                color: '#ffffff',
                lineHeight: 1.1,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                EVOLUTION <span style={{ color: '#06b6d4' }}>INFOTECH</span>
              </div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', letterSpacing: '1.5px', fontWeight: 600 }}>
                NEXT-GEN IT & HARDWARE
              </div>
            </div>
          </Link>

          {/* Search Bar with Autocomplete */}
          <div ref={searchRef} className="desktop-only" style={{ position: 'relative', flex: 1, maxWidth: '480px' }}>
            <form onSubmit={handleSearchSubmit} style={{ width: '100%' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={18} color="#64748b" style={{ position: 'absolute', left: '14px' }} />
                <input
                  type="text"
                  placeholder="Search RTX 4090, Laptops, Servers, Crucial SSD..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  className="form-input"
                  style={{
                    paddingLeft: '42px',
                    paddingRight: '36px',
                    borderRadius: '9999px',
                    height: '42px',
                    fontSize: '0.88rem',
                    background: 'rgba(15, 23, 42, 0.8)',
                    borderColor: isSearchFocused ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)'
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      background: 'none',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </form>

            {/* Live Search Results Dropdown */}
            {isSearchFocused && searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '48px',
                left: 0,
                right: 0,
                background: 'rgba(15, 23, 42, 0.98)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(6, 182, 212, 0.3)',
                borderRadius: '14px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.8)',
                padding: '8px',
                zIndex: 100,
                maxHeight: '380px',
                overflowY: 'auto'
              }}>
                <div style={{ padding: '6px 12px', fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>
                  MATCHING PRODUCTS ({searchResults.length})
                </div>
                {searchResults.map((item) => (
                  <Link
                    key={item.id}
                    href={`/products/${item.slug}`}
                    onClick={() => setIsSearchFocused(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      color: '#f8fafc',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 700 }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <ChevronRight size={16} color="#64748b" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* B2B Quote Button */}
            {onOpenQuoteModal && (
              <button
                onClick={onOpenQuoteModal}
                className="btn-outline-cyan desktop-only"
                style={{ fontSize: '0.85rem', padding: '8px 16px' }}
              >
                <PhoneCall size={15} /> B2B Quote
              </button>
            )}

            {/* Wishlist Link */}
            <Link
              href="/products?wishlist=true"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                color: wishlist.length > 0 ? '#ec4899' : '#94a3b8',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <Heart size={20} fill={wishlist.length > 0 ? '#ec4899' : 'none'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#ec4899',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.15))',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                color: '#38bdf8',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.2s ease'
              }}
            >
              <ShoppingBag size={20} color="#38bdf8" />
              <span className="desktop-inline">Cart</span>
              <span style={{
                background: '#06b6d4',
                color: '#080c14',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '2px 7px',
                borderRadius: '9999px',
                minWidth: '20px',
                textAlign: 'center'
              }}>
                {totalItems}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-only"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '40px',
                height: '40px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Navigation Categories Row */}
        <div className="container" style={{ marginTop: '10px', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', gap: '20px', scrollbarWidth: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link href="/products" style={{ color: '#f8fafc', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={16} color="#06b6d4" /> All Products
              </Link>
              <Link href="/products?category=laptops-desktops" style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none' }}>
                Laptops & Workstations
              </Link>
              <Link href="/products?category=pc-components" style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none' }}>
                PC Components & GPU
              </Link>
              <Link href="/products?category=networking-servers" style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none' }}>
                Networking & Servers
              </Link>
              <Link href="/products?category=peripherals-accessories" style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none' }}>
                Displays & Peripherals
              </Link>
              <Link href="/products?category=software-cloud" style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none' }}>
                Software & Cloud
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <Link href="/services" style={{ color: '#38bdf8', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>
                IT Services
              </Link>
              <Link href="/contact" style={{ color: '#94a3b8', fontSize: '0.88rem', fontWeight: 500, textDecoration: 'none' }}>
                Support & Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: 'rgba(8, 12, 20, 0.98)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
              />
            </form>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#fff', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              Home
            </Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} style={{ color: '#38bdf8', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              All Products Catalog
            </Link>
            <Link href="/products?category=laptops-desktops" onClick={() => setMobileMenuOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', padding: '8px 0' }}>
              Laptops & Workstations
            </Link>
            <Link href="/products?category=pc-components" onClick={() => setMobileMenuOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', padding: '8px 0' }}>
              PC Components & GPU
            </Link>
            <Link href="/products?category=networking-servers" onClick={() => setMobileMenuOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', padding: '8px 0' }}>
              Networking & Servers
            </Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', padding: '8px 0' }}>
              IT Services & Solutions
            </Link>
            <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', padding: '8px 0' }}>
              Track My Order
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', padding: '8px 0' }}>
              Contact Us
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
