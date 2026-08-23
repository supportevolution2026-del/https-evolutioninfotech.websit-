'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '@/types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  wishlist: string[];
  addToCart: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  couponCode: string;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  tax: number;
  shipping: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { addToast } = useToast();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscountRate, setCouponDiscountRate] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('evo_cart');
      const savedWishlist = localStorage.getItem('evo_wishlist');
      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {
      console.error('Failed to load storage', e);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('evo_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('evo_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist', e);
    }
  }, [wishlist]);

  const addToCart = (product: Product, quantity = 1, selectedVariant?: string) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedVariant }];
    });

    addToast({
      type: 'success',
      title: 'Added to Cart',
      message: `${product.name} has been added to your shopping cart.`,
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast({
      type: 'info',
      title: 'Removed from Cart',
      message: 'Item has been removed from your cart.',
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setCouponDiscountRate(0);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        addToast({
          type: 'info',
          title: 'Removed from Wishlist',
          message: 'Item removed from your wishlist.',
        });
        return prev.filter((id) => id !== productId);
      } else {
        addToast({
          type: 'success',
          title: 'Added to Wishlist',
          message: 'Item saved to your wishlist.',
        });
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.includes(productId);
  };

  const applyCoupon = (code: string): boolean => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'EVO10' || cleanCode === 'EVOLUTION10') {
      setAppliedCoupon(cleanCode);
      setCouponDiscountRate(0.1); // 10% off
      addToast({
        type: 'success',
        title: 'Coupon Applied!',
        message: '10% discount applied successfully on your order.',
      });
      return true;
    } else if (cleanCode === 'WELCOME5' || cleanCode === 'FIRSTBUY') {
      setAppliedCoupon(cleanCode);
      setCouponDiscountRate(0.05); // 5% off
      addToast({
        type: 'success',
        title: 'Coupon Applied!',
        message: '5% Welcome discount applied successfully.',
      });
      return true;
    } else {
      addToast({
        type: 'error',
        title: 'Invalid Coupon Code',
        message: 'Please enter a valid promo code (e.g. EVO10 or WELCOME5).',
      });
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponDiscountRate(0);
    addToast({
      type: 'info',
      title: 'Coupon Removed',
      message: 'Discount coupon has been removed.',
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = Math.round(subtotal * couponDiscountRate);
  const taxableAmount = subtotal - discount;
  const tax = Math.round(taxableAmount * 0.18); // 18% GST standard IT hardware
  const shipping = subtotal > 5000 || cart.length === 0 ? 0 : 499; // Free shipping above Rs 5,000
  const total = subtotal - discount + tax + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        totalItems,
        subtotal,
        discount,
        couponCode,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        tax,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
