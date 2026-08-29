'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import B2BQuoteModal from '@/components/B2BQuoteModal';
import { useProducts } from '@/hooks/useProducts';
import { categories } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import { getCustomWhatsAppUrl } from '@/utils/whatsapp';
import {
  SlidersHorizontal,
  Search,
  RotateCcw,
  Sparkles,
  Heart,
  Grid,
  Check,
  X,
  Laptop,
  Cpu,
  Server,
  Monitor,
  HardDrive,
  Code2,
  ShieldCheck,
  Truck,
  MessageCircle,
  Filter
} from 'lucide-react';

function ProductsCatalogContent() {
  const { products, loading } = useProducts();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const wishlistParam = searchParams.get('wishlist');

  const { wishlist } = useCart();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParam || '');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(wishlistParam === 'true');

  // Keep state in sync with URL search params
  useEffect(() => {
    if (searchParam !== null) {
      setSearchQuery(searchParam);
    } else {
      setSearchQuery('');
    }
  }, [searchParam]);

  useEffect(() => {
    if (categoryParam !== null) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory('all');
    }
  }, [categoryParam]);

  useEffect(() => {
    if (wishlistParam === 'true') {
      setOnlyWishlist(true);
    } else {
      setOnlyWishlist(false);
    }
  }, [wishlistParam]);

  // Extract unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand)));
  }, [products]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category (Case-insensitive & trimmed)
        if (selectedCategory !== 'all') {
          const productCat = (p.category || '').trim().toLowerCase();
          const targetCat = selectedCategory.trim().toLowerCase();
          if (productCat !== targetCat && !productCat.includes(targetCat) && !targetCat.includes(productCat)) {
            return false;
          }
        }
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const match =
            p.name.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.shortDesc.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q);
          if (!match) return false;
        }
        // Brand
        if (selectedBrands.length > 0 && !selectedBrands.includes(p.brand)) {
          return false;
        }
        // Price
        if (p.price > maxPrice) {
          return false;
        }
        // In Stock
        if (inStockOnly && !p.inStock) {
          return false;
        }
        // Wishlist
        if (onlyWishlist && !wishlist.includes(p.id)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'discount') return b.discountPercent - a.discountPercent;
        return 0; // default / featured
      });
  }, [products, selectedCategory, searchQuery, selectedBrands, maxPrice, inStockOnly, onlyWishlist, sortBy, wishlist]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setSelectedBrands([]);
    setMaxPrice(500000);
    setInStockOnly(false);
    setOnlyWishlist(false);
    setSortBy('featured');
  };

  const getCategoryIcon = (slug: string) => {
    switch (slug) {
      case 'laptops-desktops':
        return <Laptop size={16} />;
      case 'pc-components':
        return <Cpu size={16} />;
      case 'networking-servers':
        return <Server size={16} />;
      case 'peripherals-accessories':
        return <Monitor size={16} />;
      case 'storage-memory':
        return <HardDrive size={16} />;
      case 'software-cloud':
        return <Code2 size={16} />;
      default:
        return <Grid size={16} />;
    }
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedBrands.length > 0 ||
    maxPrice < 500000 ||
    inStockOnly ||
    onlyWishlist;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main style={{ flex: 1, padding: '24px 0 60px 0' }}>
        <div className="container">
          
          {/* Store Banner Hero */}
          <div
            style={{
              borderRadius: '20px',
              background: 'radial-gradient(ellipse at 80% 50%, rgba(6, 182, 212, 0.2), rgba(15, 23, 42, 0.95)), #0b1120',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              padding: '30px',
              marginBottom: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#06b6d4', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> EVOLUTION INFOTECH OFFICIAL STORE
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
                  {onlyWishlist
                    ? 'Your Saved Wishlist'
                    : selectedCategory !== 'all'
                    ? categories.find((c) => c.slug.toLowerCase() === selectedCategory.toLowerCase())?.name || selectedCategory
                    : 'Evolution Infotech Store'}
                </h1>
                <p style={{ fontSize: '0.92rem', color: '#94a3b8', maxWidth: '680px', marginTop: '4px' }}>
                  {selectedCategory !== 'all'
                    ? `Explore our range of ${categories.find((c) => c.slug.toLowerCase() === selectedCategory.toLowerCase())?.name || selectedCategory} with genuine manufacturer warranty and instant WhatsApp ordering.`
                    : 'Explore high-performance Laptops, Desktops, Printers, Networking, CCTV, and Accessories with genuine warranty and GST Invoices.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-primary"
                  style={{ padding: '10px 18px', fontSize: '0.85rem' }}
                >
                  Request B2B Wholesale Quote
                </button>
              </div>
            </div>

            {/* Benefit Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', fontSize: '0.8rem', color: '#cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={16} color="#10b981" /> 100% Genuine Brand Warranty
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Truck size={16} color="#06b6d4" /> Fast Express Shipping Across India
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MessageCircle size={16} color="#25D366" /> Instant WhatsApp Ordering & Support
              </div>
            </div>
          </div>

          {/* Quick Category Chips Strip */}
          <div
            style={{
              display: 'flex',
              gap: '10px',
              overflowX: 'auto',
              paddingBottom: '16px',
              marginBottom: '20px',
              scrollbarWidth: 'none'
            }}
          >
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                background: selectedCategory === 'all' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'rgba(15, 23, 42, 0.7)',
                color: selectedCategory === 'all' ? '#ffffff' : '#94a3b8',
                border: selectedCategory === 'all' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '10px 18px',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                whiteSpace: 'nowrap',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCategory === 'all' ? '0 4px 15px rgba(6, 182, 212, 0.35)' : 'none'
              }}
            >
              <Grid size={15} /> All Products ({products.length})
            </button>

            {categories.map((cat) => {
              const count = products.filter((p) => {
                const productCat = (p.category || '').trim().toLowerCase();
                const targetCat = cat.slug.trim().toLowerCase();
                return productCat === targetCat || productCat.includes(targetCat) || targetCat.includes(productCat);
              }).length;
              const isSelected = selectedCategory.trim().toLowerCase() === cat.slug.trim().toLowerCase();
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.slug)}
                  style={{
                    background: isSelected ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'rgba(15, 23, 42, 0.7)',
                    color: isSelected ? '#ffffff' : '#cbd5e1',
                    border: isSelected ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '10px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 700 : 500,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 15px rgba(6, 182, 212, 0.35)' : 'none'
                  }}
                >
                  {getCategoryIcon(cat.slug)}
                  <span>{cat.name}</span>
                  <span style={{ opacity: 0.7, fontSize: '0.75rem' }}>({count})</span>
                </button>
              );
            })}
          </div>

          {/* Main Content Layout (Sidebar + Products Grid) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '28px',
            alignItems: 'start'
          }}>
            {/* Desktop Sidebar Filters */}
            <aside
              className="glass-panel desktop-only"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '22px',
                position: 'sticky',
                top: '90px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.05rem', color: '#f8fafc' }}>
                  <SlidersHorizontal size={18} color="#06b6d4" /> Filter Store
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#06b6d4',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <RotateCcw size={13} /> Reset All
                  </button>
                )}
              </div>

              {/* Search Inside Store */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                  Search Products
                </label>
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input
                    type="text"
                    placeholder="RTX 4090, Asus, Server..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Price Filter Slider */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    Max Price
                  </label>
                  <span style={{ fontSize: '0.9rem', fontWeight: 800, color: '#06b6d4' }}>
                    ₹{maxPrice.toLocaleString('en-IN')}
                  </span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="500000"
                  step="10000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#06b6d4', cursor: 'pointer' }}
                />
              </div>

              {/* Brand Filter */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>
                  Brand / Manufacturer
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {brands.map((b) => (
                    <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => handleBrandToggle(b)}
                        style={{ accentColor: '#06b6d4' }}
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock & Wishlist Toggles */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={onlyWishlist}
                    onChange={(e) => setOnlyWishlist(e.target.checked)}
                    style={{ accentColor: '#ec4899' }}
                  />
                  <Heart size={15} color="#ec4899" />
                  <span>Saved Wishlist ({wishlist.length})</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    style={{ accentColor: '#10b981' }}
                  />
                  <Check size={15} color="#10b981" />
                  <span>In Stock Items Only</span>
                </label>
              </div>
            </aside>

            {/* Products Main Grid Section */}
            <div>
              {/* Top Controls Bar */}
              <div className="glass-panel" style={{
                padding: '14px 20px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                    Showing <strong style={{ color: '#ffffff' }}>{filteredProducts.length}</strong> items
                  </div>

                  {/* Mobile filter button */}
                  <button
                    onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                    className="mobile-only btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                  >
                    <Filter size={14} /> Filter
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>SORT BY:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-input"
                    style={{ padding: '6px 12px', fontSize: '0.82rem', width: 'auto', background: '#0b1120' }}
                  >
                    <option value="featured">Featured / Best Sellers</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Customer Ratings</option>
                    <option value="discount">Highest Discount %</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Chips */}
              {hasActiveFilters && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 600 }}>Active Filters:</span>
                  {selectedCategory !== 'all' && (
                    <span className="badge badge-cyan" style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('all')}>
                      Category: {selectedCategory} <X size={12} />
                    </span>
                  )}
                  {searchQuery.trim() && (
                    <span className="badge badge-cyan" style={{ cursor: 'pointer' }} onClick={() => setSearchQuery('')}>
                      &quot;{searchQuery}&quot; <X size={12} />
                    </span>
                  )}
                  {selectedBrands.map((b) => (
                    <span key={b} className="badge badge-purple" style={{ cursor: 'pointer' }} onClick={() => handleBrandToggle(b)}>
                      {b} <X size={12} />
                    </span>
                  ))}
                  {maxPrice < 500000 && (
                    <span className="badge badge-amber" style={{ cursor: 'pointer' }} onClick={() => setMaxPrice(500000)}>
                      Under ₹{maxPrice.toLocaleString('en-IN')} <X size={12} />
                    </span>
                  )}
                  {onlyWishlist && (
                    <span className="badge badge-emerald" style={{ cursor: 'pointer' }} onClick={() => setOnlyWishlist(false)}>
                      Wishlist Only <X size={12} />
                    </span>
                  )}
                </div>
              )}

              {/* Grid of Product Cards */}
              {loading ? (
                <div className="glass-panel" style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '16px'
                }}>
                  <div className="spinner" style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid rgba(6, 182, 212, 0.2)',
                    borderTop: '3px solid #06b6d4',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Loading live hardware catalog from database...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="glass-panel" style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b'
                  }}>
                    <Search size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f8fafc' }}>No matching products found</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '360px' }}>
                    Try adjusting your filters or speak with our sales engineer for custom procurement.
                  </p>
                  <button onClick={handleResetFilters} className="btn-primary" style={{ marginTop: '8px' }}>
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '22px'
                }}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}

              {/* Bottom WhatsApp Hardware Concierge Banner */}
              <div
                className="glass-panel"
                style={{
                  marginTop: '40px',
                  padding: '30px',
                  background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.95))',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    <MessageCircle size={16} /> CUSTOM HARDWARE PROCUREMENT
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', marginTop: '4px' }}>
                    Need a specific Server Config, GPU Model or Bulk IT Pricing?
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem', marginTop: '4px', maxWidth: '600px' }}>
                    Our sales engineers configure custom rigs, provide GST Input tax invoices, and offer special corporate discounts.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      const url = getCustomWhatsAppUrl('Hardware Store Custom Request', 'Hello Evolution Infotech! I am looking for a custom hardware configuration / model not listed in the store.');
                      window.open(url, '_blank', 'noopener,noreferrer');
                    }}
                    style={{
                      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '12px',
                      padding: '12px 24px',
                      fontSize: '0.92rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                    }}
                  >
                    <MessageCircle size={18} /> Chat on WhatsApp Now
                  </button>

                  <button
                    onClick={() => setIsQuoteModalOpen(true)}
                    className="btn-primary"
                    style={{ padding: '12px 20px', fontSize: '0.92rem' }}
                  >
                    Request B2B Quote
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <B2BQuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#06b6d4' }}>Loading Catalog...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}
