'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '@/context/ToastContext';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Product } from '@/types';
import {
  ShieldCheck,
  Lock,
  Mail,
  X,
  Plus,
  Package,
  CheckCircle2,
  Trash2,
  Edit,
  Database,
  RefreshCw,
  LogOut,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Search,
  Check,
  AlertTriangle,
  Layers,
  SlidersHorizontal,
  DollarSign
} from 'lucide-react';

const ADMIN_EMAIL = 'support.evolution2026@gmail.com';
const ADMIN_PASS = 'evolution2026';

const CATEGORIES = [
  { id: 'all', label: 'All Categories' },
  { id: 'laptop', label: 'Laptops' },
  { id: 'desktop', label: 'Desktops & Workstations' },
  { id: 'gpu', label: 'NVIDIA GPUs' },
  { id: 'server', label: 'Servers' },
  { id: 'network', label: 'Networking & WiFi' },
  { id: 'cctv', label: 'CCTV Cameras' },
  { id: 'printer', label: 'Printers' },
  { id: 'accessories', label: 'Accessories' },
];

export default function AdminModal() {
  const { addToast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Admin View State
  const [activeTab, setActiveTab] = useState<'products' | 'add' | 'edit'>('products');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State (for both Add and Edit)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: 'laptop',
    brand: 'ASUS',
    price: '',
    originalPrice: '',
    image: '',
    description: '',
    shortDesc: '',
    inStock: true,
    isFeatured: true,
    isBestSeller: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Listen to 5-click logo trigger
  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      const auth = sessionStorage.getItem('evo_admin_session');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    };

    window.addEventListener('open-admin-portal', handleOpen);
    return () => window.removeEventListener('open-admin-portal', handleOpen);
  }, []);

  const loadAdminProducts = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (data) {
          setProductsList(data as any);
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Check localStorage fallback
    try {
      const saved = localStorage.getItem('evo_custom_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setProductsList(parsed);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    setProductsList([]);
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAdminProducts();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && password === ADMIN_PASS) {
      setIsAuthenticated(true);
      sessionStorage.setItem('evo_admin_session', 'true');
      setLoginError('');
      addToast({
        type: 'success',
        title: 'Admin Access Granted',
        message: 'Welcome back, Evolution Infotech Super Admin!'
      });
    } else {
      setLoginError('Invalid Admin Email or Password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('evo_admin_session');
    setEmail('');
    setPassword('');
    addToast({
      type: 'info',
      title: 'Logged Out',
      message: 'Admin session closed.'
    });
  };

  // Handle Image File Upload (converts to Base64 Data URL)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      addToast({
        type: 'error',
        title: 'File Too Large',
        message: 'Please upload an image smaller than 5MB.'
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({ ...prev, image: base64String }));
      addToast({
        type: 'success',
        title: 'Image Uploaded',
        message: 'Image preview is ready.'
      });
    };
    reader.readAsDataURL(file);
  };

  // Start Editing a product
  const startEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: String(product.price),
      originalPrice: String(product.originalPrice || product.price),
      image: product.image,
      description: product.description || '',
      shortDesc: product.shortDesc || '',
      inStock: product.inStock,
      isFeatured: Boolean(product.isFeatured),
      isBestSeller: Boolean(product.isBestSeller)
    });
    setActiveTab('edit');
  };

  // Delete Product
  const handleDeleteProduct = async (product: Product) => {
    if (!window.confirm(`Are you sure you want to delete "${product.name}"?`)) {
      return;
    }

    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('products').delete().eq('id', product.id);
        if (error) throw error;
      } catch (err: any) {
        console.error('Supabase delete error:', err);
      }
    }

    const updated = productsList.filter((p) => p.id !== product.id);
    setProductsList(updated);
    try {
      localStorage.setItem('evo_custom_products', JSON.stringify(updated));
    } catch (e) {}

    addToast({
      type: 'info',
      title: 'Product Deleted',
      message: `${product.name} removed from store.`
    });
  };

  // Save (Add or Edit)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      addToast({
        type: 'error',
        title: 'Required Fields Missing',
        message: 'Product name and price are required.'
      });
      return;
    }

    setIsSaving(true);
    const isEditMode = activeTab === 'edit' && editingProduct;
    const slug = formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const productPayload: Product = {
      id: isEditMode ? editingProduct.id : `prod_${Date.now()}`,
      name: formData.name,
      slug,
      category: formData.category,
      brand: formData.brand,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice || formData.price),
      discountPercent: Number(formData.originalPrice) > Number(formData.price)
        ? Math.round(((Number(formData.originalPrice) - Number(formData.price)) / Number(formData.originalPrice)) * 100)
        : 0,
      image: formData.image || '/images/logo-icon.png',
      images: [formData.image || '/images/logo-icon.png'],
      description: formData.description || `${formData.name} - Genuine product with manufacturer warranty.`,
      shortDesc: formData.shortDesc || formData.name,
      inStock: formData.inStock,
      stockCount: formData.inStock ? 15 : 0,
      isFeatured: formData.isFeatured,
      isBestSeller: formData.isBestSeller,
      rating: 4.9,
      reviewCount: 14,
      highlights: ['100% Genuine Hardware', 'GST Invoice Included', 'Manufacturer Warranty'],
      specs: { 'Brand': formData.brand, 'Category': formData.category },
      warranty: '1 Year Official Warranty',
      sku: `EVO-${Date.now().toString().slice(-5)}`
    };

    if (isSupabaseConfigured && supabase) {
      try {
        const generatedId = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `prod_${Date.now()}`;
        const payload: any = {
          id: generatedId,
          name: productPayload.name,
          slug: productPayload.slug,
          category: productPayload.category,
          brand: productPayload.brand,
          price: productPayload.price,
          original_price: productPayload.originalPrice,
          image: productPayload.image,
          images: productPayload.images,
          description: productPayload.description,
          short_desc: productPayload.shortDesc,
          in_stock: productPayload.inStock,
          is_featured: productPayload.isFeatured,
          is_best_seller: productPayload.isBestSeller
        };

        if (isEditMode) {
          const { id: _, ...updateFields } = payload;
          const { error } = await supabase
            .from('products')
            .update(updateFields)
            .eq('id', editingProduct.id);

          if (error) {
            console.error('Supabase update message:', error.message, error.details, error.hint);
            addToast({
              type: 'error',
              title: 'Supabase Update Error',
              message: `${error.message || 'Update failed'} (${error.details || error.code || ''})`
            });
          }
        } else {
          // Attempt insert with ID first
          let insertRes = await supabase.from('products').insert([payload]);

          // If failed due to auto-incrementing/custom id, retry without explicit ID
          if (insertRes.error) {
            const { id: _, ...payloadWithoutId } = payload;
            insertRes = await supabase.from('products').insert([payloadWithoutId]);
          }

          if (insertRes.error) {
            const err = insertRes.error;
            console.error('Supabase insert error details:', err.message, err.details, err.hint, err.code);
            addToast({
              type: 'error',
              title: 'Supabase Insert Error',
              message: `${err.message || 'Insert failed'} ${err.details ? '(' + err.details + ')' : ''}`
            });
          }
        }
      } catch (err: any) {
        console.error('Supabase save exception:', err);
        addToast({
          type: 'error',
          title: 'Supabase Error',
          message: err?.message || 'Connection error with Supabase.'
        });
      }
    }

    let updatedList: Product[] = [];
    if (isEditMode) {
      updatedList = productsList.map((p) => (p.id === editingProduct.id ? productPayload : p));
      addToast({
        type: 'success',
        title: 'Product Updated!',
        message: `${formData.name} updated successfully.`
      });
    } else {
      updatedList = [productPayload, ...productsList];
      addToast({
        type: 'success',
        title: 'Product Published!',
        message: `${formData.name} added to catalog.`
      });
    }

    setProductsList(updatedList);
    try {
      localStorage.setItem('evo_custom_products', JSON.stringify(updatedList));
    } catch (e) {}

    setIsSaving(false);
    setActiveTab('products');
    setEditingProduct(null);
  };

  // Filter products by category and search
  const filteredProducts = productsList.filter((p) => {
    const matchCategory = selectedCategoryFilter === 'all' || p.category === selectedCategoryFilter;
    const matchQuery = !searchQuery.trim() ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchQuery;
  });

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        backgroundColor: 'rgba(0, 0, 0, 0.88)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
    >
      <div
        style={{ position: 'absolute', inset: 0 }}
        onClick={() => setIsOpen(false)}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: isAuthenticated ? '980px' : '440px',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#0b1120',
          borderRadius: '24px',
          border: '1px solid rgba(6, 182, 212, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 40px rgba(6, 182, 212, 0.25)',
          padding: '28px'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {!isAuthenticated ? (
          /* Login Form */
          <div>
            <div style={{ textAlign: 'center', marginBottom: '26px' }}>
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '16px',
                  background: 'rgba(6, 182, 212, 0.15)',
                  border: '1px solid #06b6d4',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#38bdf8',
                  margin: '0 auto 14px auto'
                }}
              >
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff' }}>
                Secret Admin Portal
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '4px' }}>
                Evolution Infotech Store & Inventory Control
              </p>
            </div>

            {loginError && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.15)',
                  border: '1px solid #ef4444',
                  color: '#fca5a5',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  marginBottom: '18px',
                  textAlign: 'center'
                }}
              >
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <Mail size={14} color="#06b6d4" /> Admin Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="support.evolution2026@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                  <Lock size={14} color="#06b6d4" /> Master Password
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ borderRadius: '10px' }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', padding: '14px', marginTop: '10px', fontSize: '0.98rem' }}
              >
                <Lock size={16} /> Authenticate Admin
              </button>
            </form>
          </div>
        ) : (
          /* Admin Suite */
          <div>
            {/* Top Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#10b981', fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase' }}>
                  <Sparkles size={14} /> EVOLUTION INFOTECH &bull; SUPER ADMIN
                </div>
                <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                  Product & Inventory Management
                </h3>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  fontSize: '0.75rem',
                  padding: '5px 12px',
                  borderRadius: '9999px',
                  background: isSupabaseConfigured ? 'rgba(16, 185, 129, 0.15)' : 'rgba(245, 158, 11, 0.15)',
                  border: isSupabaseConfigured ? '1px solid #10b981' : '1px solid #f59e0b',
                  color: isSupabaseConfigured ? '#34d399' : '#fbbf24',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  <Database size={12} /> {isSupabaseConfigured ? 'Supabase Live Sync' : 'Local Storage Mode'}
                </span>

                <button
                  onClick={handleLogout}
                  style={{
                    background: 'rgba(239, 68, 68, 0.15)',
                    border: '1px solid #ef4444',
                    color: '#fca5a5',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={14} /> Logout
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px', marginBottom: '20px' }}>
              <button
                onClick={() => setActiveTab('products')}
                style={{
                  background: activeTab === 'products' ? 'rgba(6, 182, 212, 0.2)' : 'transparent',
                  border: activeTab === 'products' ? '1px solid #06b6d4' : '1px solid transparent',
                  color: activeTab === 'products' ? '#38bdf8' : '#94a3b8',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Package size={16} /> All Products ({productsList.length})
              </button>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setFormData({
                    id: '',
                    name: '',
                    category: 'laptop',
                    brand: 'ASUS',
                    price: '',
                    originalPrice: '',
                    image: '',
                    description: '',
                    shortDesc: '',
                    inStock: true,
                    isFeatured: true,
                    isBestSeller: false
                  });
                  setActiveTab('add');
                }}
                style={{
                  background: activeTab === 'add' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  border: activeTab === 'add' ? '1px solid #10b981' : '1px solid transparent',
                  color: activeTab === 'add' ? '#34d399' : '#94a3b8',
                  padding: '8px 18px',
                  borderRadius: '10px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} /> Add New Product
              </button>

              {activeTab === 'edit' && editingProduct && (
                <button
                  style={{
                    background: 'rgba(245, 158, 11, 0.2)',
                    border: '1px solid #f59e0b',
                    color: '#fbbf24',
                    padding: '8px 18px',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Edit size={16} /> Editing: {editingProduct.name.slice(0, 20)}...
                </button>
              )}
            </div>

            {/* Tab 1: Products Inventory List with Category Filtering & Search */}
            {activeTab === 'products' ? (
              <div>
                {/* Search and Category Filter Row */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
                    <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                    <input
                      type="text"
                      placeholder="Search products by title or brand..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="form-input"
                      style={{ paddingLeft: '38px', height: '40px', borderRadius: '10px' }}
                    />
                  </div>

                  <select
                    value={selectedCategoryFilter}
                    onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                    className="form-input"
                    style={{ background: '#0f172a', color: '#38bdf8', height: '40px', borderRadius: '10px', width: 'auto', fontWeight: 700 }}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                {/* Products List Table / Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '460px', overflowY: 'auto' }}>
                  {filteredProducts.length === 0 ? (
                    <div style={{ padding: '40px 20px', textAlign: 'center', color: '#94a3b8' }}>
                      No products found matching your filter.
                    </div>
                  ) : (
                    filteredProducts.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          background: 'rgba(15, 23, 42, 0.95)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '14px',
                          padding: '12px 16px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '14px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, minWidth: '240px' }}>
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover', background: '#020617' }}
                          />
                          <div>
                            <div style={{ fontSize: '0.72rem', color: '#06b6d4', fontWeight: 800, textTransform: 'uppercase' }}>
                              {p.brand} &bull; {p.category}
                            </div>
                            <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', marginTop: '2px' }}>
                              {p.name}
                            </div>
                          </div>
                        </div>

                        {/* Price & Stock info */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#38bdf8' }}>
                              ₹{p.price.toLocaleString('en-IN')}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: p.inStock ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                              {p.inStock ? '● In Stock' : '● Out of Stock'}
                            </div>
                          </div>

                          {/* Action Buttons (Edit & Delete) */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <button
                              onClick={() => startEditProduct(p)}
                              style={{
                                background: 'rgba(6, 182, 212, 0.15)',
                                border: '1px solid rgba(6, 182, 212, 0.4)',
                                color: '#38bdf8',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer'
                              }}
                              title="Edit product"
                            >
                              <Edit size={14} /> Edit
                            </button>

                            <button
                              onClick={() => handleDeleteProduct(p)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#f87171',
                                padding: '8px 12px',
                                borderRadius: '8px',
                                fontSize: '0.8rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px',
                                cursor: 'pointer'
                              }}
                              title="Delete product"
                            >
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : (
              /* Tab 2 & 3: Add / Edit Product Form */
              <form onSubmit={handleSaveProduct} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'block', fontWeight: 700 }}>
                      Product Title / Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ASUS ROG Zephyrus G16 (2026 AI Edition)"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'block', fontWeight: 700 }}>
                      Brand *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ASUS, NVIDIA, Dell, HP, Apple"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'block', fontWeight: 700 }}>
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="form-input"
                      style={{ background: '#0f172a', color: '#fff' }}
                    >
                      <option value="laptop">Laptops</option>
                      <option value="desktop">Desktops & Workstations</option>
                      <option value="gpu">NVIDIA GPUs</option>
                      <option value="server">Servers</option>
                      <option value="network">Networking & WiFi</option>
                      <option value="cctv">CCTV Cameras</option>
                      <option value="printer">Printers</option>
                      <option value="accessories">Accessories</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'block', fontWeight: 700 }}>
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 184990"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'block', fontWeight: 700 }}>
                      MRP / Original Price (₹)
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 219999"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Image Upload & URL Row with Live Thumbnail Preview */}
                <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <label style={{ fontSize: '0.82rem', color: '#38bdf8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}>
                    <ImageIcon size={15} /> Product Image (Upload File or Paste Image URL)
                  </label>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '240px' }}>
                      <input
                        type="text"
                        placeholder="https://... or click Upload Image button"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        className="form-input"
                      />
                    </div>

                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageFileUpload}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{
                        background: 'rgba(6, 182, 212, 0.15)',
                        border: '1px solid #06b6d4',
                        color: '#38bdf8',
                        padding: '10px 16px',
                        borderRadius: '10px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Upload size={15} /> Upload From PC
                    </button>

                    {/* Live Preview Thumbnail */}
                    {formData.image && (
                      <div style={{ width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', border: '1px solid #06b6d4', flexShrink: 0 }}>
                        <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'block', fontWeight: 700 }}>
                    Short Specs Summary
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Intel Core Ultra 9, 32GB RAM, 2TB SSD, RTX 4080..."
                    value={formData.shortDesc}
                    onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px', display: 'block', fontWeight: 700 }}>
                    Detailed Product Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter warranty, box contents, or detailed technical specifications..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="form-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', padding: '6px 0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.inStock}
                      onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                    />
                    Mark as In Stock
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                    />
                    Feature on Homepage Spotlight
                  </label>

                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.isBestSeller}
                      onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                    />
                    Mark as Best Seller Badge
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="btn-primary"
                    style={{ flex: 1, padding: '14px', fontSize: '0.98rem' }}
                  >
                    {activeTab === 'edit' ? (
                      <>
                        <Check size={18} /> {isSaving ? 'Updating...' : 'Save Product Changes'}
                      </>
                    ) : (
                      <>
                        <Plus size={18} /> {isSaving ? 'Publishing...' : 'Publish Product to Store & Supabase'}
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('products');
                      setEditingProduct(null);
                    }}
                    style={{
                      background: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      color: '#cbd5e1',
                      padding: '14px 20px',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
