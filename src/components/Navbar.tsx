'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/hooks/useProducts';
import { getCustomWhatsAppUrl } from '@/utils/whatsapp';
import BrandLogo from './BrandLogo';
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
  const { products } = useProducts();
  const { totalItems, wishlist, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof products>([]);
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
  }, [searchQuery, products]);

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
    <header style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%', background: '#ffffff', boxShadow: '0 4px 20px -2px rgba(15, 23, 42, 0.06)' }}>
      {/* Top Notification Bar */}
      <div style={{
        background: 'linear-gradient(90deg, #f8fafc 0%, #eff6ff 50%, #f8fafc 100%)',
        borderBottom: '1px solid #e2e8f0',
        padding: '7px 0',
        fontSize: '0.8rem',
        color: '#475569',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: 600 }}>
              <Sparkles size={14} /> Official Store & IT Solution Partner
            </span>
            <span className="desktop-inline" style={{ color: '#cbd5e1' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
              <Truck size={14} color="#10b981" /> Free Express Delivery on Orders &gt; ₹5,000
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/track-order" style={{ color: '#334155', textDecoration: 'none', fontWeight: 600, transition: 'color 0.2s' }}>
              Track Order
            </Link>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#15803d', fontWeight: 600 }}>
              <ShieldCheck size={14} color="#10b981" /> 100% Genuine Hardware
            </span>
          </div>
        </div>
      </div>

      {/* Main Glass Navbar */}
      <nav className="glass-nav" style={{ padding: '12px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>

          {/* Official Brand Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <BrandLogo size="md" showSubtitle={true} />
          </Link>

          {/* Search Bar with Autocomplete */}
          <div ref={searchRef} className="desktop-only" style={{ position: 'relative', flex: 1, maxWidth: '480px' }}>
            <form onSubmit={handleSearchSubmit} style={{ width: '100%' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px' }} />
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
                    background: '#f8fafc',
                    borderColor: isSearchFocused ? '#2563eb' : '#e2e8f0'
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
                      color: '#94a3b8',
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
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                boxShadow: '0 20px 48px -8px rgba(15, 23, 42, 0.15)',
                padding: '10px',
                zIndex: 100,
                maxHeight: '380px',
                overflowY: 'auto'
              }}>
                <div style={{ padding: '6px 12px', fontSize: '0.75rem', color: '#64748b', fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                  Matching Products ({searchResults.length})
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
                      borderRadius: '10px',
                      textDecoration: 'none',
                      color: '#0f172a',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f1f5f9')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '42px', height: '42px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#2563eb', fontWeight: 800 }}>
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                    <ChevronRight size={16} color="#94a3b8" />
                  </Link>
                ))}

                {/* View All Search Results in Catalog */}
                <Link
                  href={`/products?search=${encodeURIComponent(searchQuery.trim())}`}
                  onClick={() => setIsSearchFocused(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    padding: '10px',
                    marginTop: '8px',
                    borderRadius: '10px',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    color: '#2563eb',
                    textDecoration: 'none',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}
                >
                  <span>View all {searchResults.length} matching products</span>
                  <ChevronRight size={15} />
                </Link>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>

            {/* Wishlist Link */}
            <Link
              href="/products?wishlist=true"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                color: wishlist.length > 0 ? '#db2777' : '#64748b',
                textDecoration: 'none',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#fbcfe8';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Heart size={20} fill={wishlist.length > 0 ? '#db2777' : 'none'} />
              {wishlist.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: '#db2777',
                  color: '#fff',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 6px rgba(219, 39, 119, 0.4)'
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
                padding: '9px 16px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
                border: '1px solid #bfdbfe',
                color: '#1d4ed8',
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(37, 99, 235, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <ShoppingBag size={20} color="#2563eb" />
              <span className="desktop-inline">Cart</span>
              <span style={{
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '0.75rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '9999px',
                minWidth: '22px',
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
                width: '42px',
                height: '42px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                color: '#0f172a',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Navigation Categories Row */}
        <div className="container" style={{ marginTop: '10px', borderTop: '1px solid #f1f5f9', paddingTop: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', overflowX: 'auto', gap: '20px', scrollbarWidth: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <Link href="/products" style={{ color: '#0f172a', fontSize: '0.88rem', fontWeight: 800, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={16} color="#2563eb" /> Store
              </Link>
              <Link href="/products?category=laptop" style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}>
                Laptop
              </Link>
              <Link href="/products?category=desktop" style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}>
                Desktop
              </Link>
              <Link href="/products?category=printer" style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}>
                Printer
              </Link>
              <Link href="/products?category=network" style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}>
                Network
              </Link>
              <Link href="/products?category=cctv" style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}>
                CCTV
              </Link>
              <Link href="/products?category=accessories" style={{ color: '#475569', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none', transition: 'color 0.2s' }}>
                Accessories
              </Link>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Link
                href="/services"
                style={{ color: '#0284c7', fontSize: '0.88rem', fontWeight: 700, textDecoration: 'none' }}
              >
                IT & Software Services
              </Link>
              <Link href="/contact" style={{ color: '#64748b', fontSize: '0.88rem', fontWeight: 600, textDecoration: 'none' }}>
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div style={{
            background: '#ffffff',
            borderTop: '1px solid #e2e8f0',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)'
          }}>
            <form onSubmit={handleSearchSubmit} style={{ marginBottom: '6px' }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
              />
            </form>
            <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0f172a', fontWeight: 700, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              Home
            </Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} style={{ color: '#2563eb', fontWeight: 700, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              All Products Catalog
            </Link>
            <Link href="/services" onClick={() => setMobileMenuOpen(false)} style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              IT & Software Development Services
            </Link>
            <Link href="/products?category=laptop" onClick={() => setMobileMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', padding: '8px 0' }}>
              Laptops & Workstations
            </Link>
            <Link href="/products?category=desktop" onClick={() => setMobileMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', padding: '8px 0' }}>
              Desktops & Components
            </Link>
            <Link href="/products?category=network" onClick={() => setMobileMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', padding: '8px 0' }}>
              Networking & Servers
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={{ color: '#475569', textDecoration: 'none', padding: '8px 0' }}>
              Contact Us & Store Location
            </Link>
            <Link href="/track-order" onClick={() => setMobileMenuOpen(false)} style={{ color: '#64748b', textDecoration: 'none', padding: '8px 0' }}>
              Track My Order
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
