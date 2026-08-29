'use client';

import { useState, useEffect } from 'react';
import { Product } from '@/types';
import { fetchAllProducts } from '@/services/productService';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// Global shared cache for instant 0ms access across components
let globalProducts: Product[] = [];
let isInitialFetched = false;
let isFetching = false;
const listeners = new Set<(items: Product[]) => void>();

async function fetchAndBroadcast(force = false) {
  if (isFetching && !force) return;
  isFetching = true;
  try {
    const items = await fetchAllProducts();
    globalProducts = items;
    isInitialFetched = true;
    listeners.forEach((listener) => listener(items));
  } catch (err) {
    console.warn('Failed to load products:', err);
  } finally {
    isFetching = false;
  }
}

// Global real-time subscription setup once
let isSubscribed = false;
function initRealtimeSubscription() {
  if (isSubscribed || !isSupabaseConfigured || !supabase) return;
  isSubscribed = true;
  supabase
    .channel('public:products')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'products' },
      () => {
        fetchAndBroadcast(true);
      }
    )
    .subscribe();
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(globalProducts);
  const [loading, setLoading] = useState<boolean>(!isInitialFetched);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Register listener for instantaneous cache updates
    const updateHandler = (newProducts: Product[]) => {
      setProducts(newProducts);
      setLoading(false);
    };

    listeners.add(updateHandler);

    if (!isInitialFetched) {
      fetchAndBroadcast().then(() => setLoading(false));
    } else {
      setLoading(false);
      setProducts(globalProducts);
    }

    initRealtimeSubscription();

    return () => {
      listeners.delete(updateHandler);
    };
  }, []);

  return {
    products,
    loading,
    error,
    refetch: () => fetchAndBroadcast(true)
  };
}
