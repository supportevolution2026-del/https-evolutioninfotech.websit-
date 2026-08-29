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
        // Category
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
        return 0;
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
      case 'laptop':
        return <Laptop size={16} />;
      case 'pc-components':
      case 'desktop':
        return <Cpu size={16} />;
      case 'networking-servers':
      case 'network':
        return <Server size={16} />;
      case 'peripherals-accessories':
      case 'accessories':
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f8fafc' }}>
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main style={{ flex: 1, padding: '24px 0 60px 0' }}>
        <div className="container">
          
          {/* Store Banner Hero */}
          <div
            style={{
              borderRadius: '24px',
              background: 'linear-gradient(135deg, #ffffff 0%, #eff6ff 50%, #f0fdf4 100%)',
              border: '1.5px solid #bfdbfe',
              padding: '32px',
              marginBottom: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              boxShadow: '0 12px 32px -4px rgba(15, 23, 42, 0.06)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#0284c7', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sparkles size={14} /> EVOLUTION INFOTECH OFFICIAL STORE
                </div>
                <h1 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
                  {onlyWishlist
                    ? 'Your Saved Wishlist'
                    : selectedCategory !== 'all'
                    ? categories.find((c) => c.slug.toLowerCase() === selectedCategory.toLowerCase())?.name || selectedCategory
                    : 'Evolution Infotech Store'}
                </h1>
                <p style={{ fontSize: '0.94rem', color: '#475569', maxWidth: '680px', marginTop: '4px' }}>
                  {selectedCategory !== 'all'
                    ? `Explore our range of ${categories.find((c) => c.slug.toLowerCase() === selectedCategory.toLowerCase())?.name || selectedCategory} with genuine manufacturer warranty and instant WhatsApp ordering.`
                    : 'Explore high-performance Laptops, Desktops, Printers, Networking, CCTV, and Accessories with genuine warranty and GST Invoices.'}
                </p>
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="btn-primary"
                  style={{ padding: '11px 20px', fontSize: '0.88rem' }}
                >
                  Request B2B Wholesale Quote
                </button>
              </div>
            </div>

            {/* Benefit Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', borderTop: '1px solid #e2e8f0', paddingTop: '16px', fontSize: '0.84rem', color: '#334155' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <ShieldCheck size={16} color="#10b981" /> 100% Genuine Brand Warranty
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <Truck size={16} color="#0284c7" /> Fast Express Shipping Across India
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
                <MessageCircle size={16} color="#16a34a" /> Instant WhatsApp Ordering & Support
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
                background: selectedCategory === 'all' ? 'linear-gradient(135deg, #0284c7, #2563eb)' : '#ffffff',
                color: selectedCategory === 'all' ? '#ffffff' : '#475569',
                border: selectedCategory === 'all' ? 'none' : '1px solid #e2e8f0',
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
                boxShadow: selectedCategory === 'all' ? '0 4px 15px rgba(37, 99, 235, 0.3)' : 'var(--shadow-sm)'
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
                    background: isSelected ? 'linear-gradient(135deg, #0284c7, #2563eb)' : '#ffffff',
                    color: isSelected ? '#ffffff' : '#475569',
                    border: isSelected ? 'none' : '1px solid #e2e8f0',
                    padding: '10px 18px',
                    borderRadius: '9999px',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 700 : 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    whiteSpace: 'nowrap',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: isSelected ? '0 4px 15px rgba(37, 99, 235, 0.3)' : 'var(--shadow-sm)'
                  }}
                >
                  {getCategoryIcon(cat.slug)}
                  <span>{cat.name}</span>
                  <span style={{ opacity: 0.75, fontSize: '0.75rem' }}>({count})</span>
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
                top: '90px',
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '20px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
                  <SlidersHorizontal size={18} color="#2563eb" /> Filter Store
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={handleResetFilters}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#2563eb',
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
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                  Search Products
                </label>
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '13px' }} />
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
                  <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase' }}>
                    Max Price
                  </label>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#2563eb' }}>
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
                  style={{ width: '100%', accentColor: '#2563eb', cursor: 'pointer' }}
                />
              </div>

              {/* Brand Filter */}
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>
                  Brand / Manufacturer
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                  {brands.map((b) => (
                    <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#334155', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => handleBrandToggle(b)}
                        style={{ accentColor: '#2563eb' }}
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock & Wishlist Toggles */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#334155', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={onlyWishlist}
                    onChange={(e) => setOnlyWishlist(e.target.checked)}
                    style={{ accentColor: '#db2777' }}
                  />
                  <Heart size={15} color="#db2777" />
                  <span>Saved Wishlist ({wishlist.length})</span>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem', color: '#334155', cursor: 'pointer' }}>
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
                gap: '12px',
                background: '#ffffff',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ fontSize: '0.9rem', color: '#475569' }}>
                    Showing <strong style={{ color: '#0f172a' }}>{filteredProducts.length}</strong> items
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
                    style={{ padding: '6px 12px', fontSize: '0.84rem', width: 'auto', background: '#ffffff' }}
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
                  <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>Active Filters:</span>
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
                  gap: '16px',
                  background: '#ffffff'
                }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '3px solid #e2e8f0',
                    borderTop: '3px solid #2563eb',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }} />
                  <p style={{ color: '#64748b', fontSize: '0.9rem' }}>Loading live hardware catalog...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="glass-panel" style={{
                  padding: '60px 20px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '14px',
                  background: '#ffffff'
                }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: '#f1f5f9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#64748b'
                  }}>
                    <Search size={28} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>No matching products found</h3>
                  <p style={{ fontSize: '0.88rem', color: '#64748b', maxWidth: '360px' }}>
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
                  padding: '32px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0fdf4 100%)',
                  border: '1.5px solid #bbf7d0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '20px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontSize: '0.82rem', fontWeight: 800, textTransform: 'uppercase' }}>
                    <MessageCircle size={16} /> CUSTOM HARDWARE PROCUREMENT
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#0f172a', marginTop: '4px' }}>
                    Need a specific Server Config, GPU Model or Bulk IT Pricing?
                  </h3>
                  <p style={{ color: '#475569', fontSize: '0.9rem', marginTop: '4px', maxWidth: '600px' }}>
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
                      boxShadow: '0 4px 15px rgba(16, 185, 129, 0.35)'
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
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center', color: '#2563eb' }}>Loading Catalog...</div>}>
      <ProductsCatalogContent />
    </Suspense>
  );
}
