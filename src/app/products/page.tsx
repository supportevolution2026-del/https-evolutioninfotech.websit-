'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import B2BQuoteModal from '@/components/B2BQuoteModal';
import { products } from '@/data/products';
import { categories } from '@/data/categories';
import { useCart } from '@/context/CartContext';
import {
  SlidersHorizontal,
  Search,
  RotateCcw,
  Sparkles,
  Heart,
  Grid,
  Check
} from 'lucide-react';

function ProductsCatalogContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchParam = searchParams.get('search');
  const wishlistParam = searchParams.get('wishlist');

  const { wishlist } = useCart();
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState<string>(searchParam || '');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(wishlistParam === 'true');

  // Extract unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.brand)));
  }, []);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
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
  }, [selectedCategory, searchQuery, selectedBrands, maxPrice, inStockOnly, onlyWishlist, sortBy, wishlist]);

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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />

      <main style={{ flex: 1, padding: '30px 0 60px 0' }}>
        <div className="container">
          {/* Breadcrumb & Header */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
              EVOLUTION INFOTECH &bull; HARDWARE CATALOG
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', marginTop: '4px' }}>
              {onlyWishlist
                ? 'Your Saved Wishlist'
                : selectedCategory !== 'all'
                ? categories.find((c) => c.slug === selectedCategory)?.name || 'IT Products'
                : 'All Technology & Enterprise Hardware'}
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginTop: '6px' }}>
              Showing {filteredProducts.length} verified products with direct warranty and pan-India express dispatch.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '30px',
            alignItems: 'start'
          }}>
            {/* Sidebar Filters */}
            <aside className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '1rem', color: '#f8fafc' }}>
                  <SlidersHorizontal size={18} color="#06b6d4" /> Filters
                </div>
                <button
                  onClick={handleResetFilters}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#06b6d4',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <RotateCcw size={13} /> Reset
                </button>
              </div>

              {/* Search Inside Catalog */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px', display: 'block' }}>
                  Search Catalog
                </label>
                <div style={{ position: 'relative' }}>
                  <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '13px' }} />
                  <input
                    type="text"
                    placeholder="Keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '36px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Categories Filter */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>
                  Categories
                </label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <button
                    onClick={() => setSelectedCategory('all')}
                    style={{
                      textAlign: 'left',
                      background: selectedCategory === 'all' ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                      border: selectedCategory === 'all' ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                      color: selectedCategory === 'all' ? '#38bdf8' : '#cbd5e1',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      fontWeight: selectedCategory === 'all' ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    All Categories ({products.length})
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCategory(c.slug)}
                      style={{
                        textAlign: 'left',
                        background: selectedCategory === c.slug ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
                        border: selectedCategory === c.slug ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
                        color: selectedCategory === c.slug ? '#38bdf8' : '#94a3b8',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: selectedCategory === c.slug ? 700 : 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>
                    Max Price
                  </label>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#06b6d4' }}>
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
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '10px', display: 'block' }}>
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

              {/* Wishlist only checkbox */}
              <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#cbd5e1', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={onlyWishlist}
                    onChange={(e) => setOnlyWishlist(e.target.checked)}
                    style={{ accentColor: '#ec4899' }}
                  />
                  <Heart size={16} color="#ec4899" />
                  <span>Show Wishlist Items ({wishlist.length})</span>
                </label>
              </div>
            </aside>

            {/* Products Main Grid Area */}
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
                <div style={{ fontSize: '0.88rem', color: '#94a3b8' }}>
                  Showing <strong style={{ color: '#ffffff' }}>{filteredProducts.length}</strong> items
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600 }}>SORT BY:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="form-input"
                    style={{ padding: '6px 12px', fontSize: '0.85rem', width: 'auto', background: '#0b1120' }}
                  >
                    <option value="featured">Featured / Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Customer Ratings</option>
                    <option value="discount">Highest Discount</option>
                  </select>
                </div>
              </div>

              {/* Grid of Product Cards */}
              {filteredProducts.length === 0 ? (
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
                    Try adjusting your filters or price range, or speak with our sales engineer for custom procurement.
                  </p>
                  <button onClick={handleResetFilters} className="btn-primary" style={{ marginTop: '8px' }}>
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: '20px'
                }}>
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
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
