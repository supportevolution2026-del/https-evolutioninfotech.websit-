import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Product } from '@/types';
import { products as localProducts } from '@/data/products';

export function mapSupabaseToProduct(item: any): Product {
  // Parse Images with image_url prioritization
  const primaryImage = item.image_url || item.image || (Array.isArray(item.images) && item.images[0] && item.images[0] !== '/images/logo-icon.png' ? item.images[0] : null) || item.image_url || item.image || '/images/logo-icon.png';
  
  let imagesArray: string[] = [];
  if (Array.isArray(item.images) && item.images.length > 0 && item.images[0] !== '/images/logo-icon.png') {
    imagesArray = item.images;
  } else if (typeof item.images === 'string' && item.images.trim()) {
    try {
      const parsed = JSON.parse(item.images);
      imagesArray = Array.isArray(parsed) ? parsed : [item.images];
    } catch {
      imagesArray = [item.images];
    }
  }

  if (imagesArray.length === 0 || imagesArray[0] === '/images/logo-icon.png') {
    imagesArray = [primaryImage];
  }

  // Parse Specs
  let specsObj: Record<string, string> = {};
  if (typeof item.specs === 'object' && item.specs !== null && !Array.isArray(item.specs)) {
    specsObj = item.specs;
  } else if (typeof item.specs === 'string' && item.specs.trim()) {
    try {
      const parsed = JSON.parse(item.specs);
      if (typeof parsed === 'object' && parsed !== null) {
        specsObj = parsed;
      } else {
        specsObj = { 'Specifications': String(item.specs) };
      }
    } catch {
      specsObj = { 'Specifications': String(item.specs) };
    }
  }

  // Parse Highlights
  let highlightsArray: string[] = [];
  if (Array.isArray(item.highlights)) {
    highlightsArray = item.highlights;
  } else if (typeof item.highlights === 'string' && item.highlights.trim()) {
    try {
      const parsed = JSON.parse(item.highlights);
      highlightsArray = Array.isArray(parsed) ? parsed : [item.highlights];
    } catch {
      highlightsArray = item.highlights.split(',').map((s: string) => s.trim()).filter(Boolean);
    }
  }

  const priceNum = Number(item.price || 0);
  const origPriceNum = Number(item.original_price || item.originalPrice || priceNum);
  const discountPercentNum = Number(
    item.discount_percent ||
    item.discountPercent ||
    (origPriceNum > priceNum && priceNum > 0
      ? Math.round(((origPriceNum - priceNum) / origPriceNum) * 100)
      : 0)
  );

  const cleanCategory = (item.category || item.category_slug || 'laptop').trim().toLowerCase();
  const cleanName = (item.name || item.title || 'Product').trim();
  const cleanSlug = item.slug && item.slug.trim()
    ? item.slug.trim()
    : `${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}-${item.id}`;

  return {
    id: String(item.id || item._id || Date.now()),
    name: cleanName,
    slug: cleanSlug,
    category: cleanCategory,
    subCategory: item.sub_category || item.subCategory,
    brand: (item.brand || 'Evolution Infotech').trim(),
    price: priceNum,
    originalPrice: origPriceNum,
    discountPercent: discountPercentNum,
    rating: Number(item.rating || 4.9),
    reviewCount: Number(item.review_count || item.reviewCount || 12),
    inStock: item.in_stock !== undefined ? Boolean(item.in_stock) : (item.stock_count !== undefined ? Number(item.stock_count) > 0 : true),
    stockCount: Number(item.stock_count || item.stockCount || 10),
    isFeatured: item.is_featured !== undefined ? Boolean(item.is_featured) : true,
    isNewArrival: item.is_new_arrival !== undefined ? Boolean(item.is_new_arrival) : true,
    isBestSeller: Boolean(item.is_best_seller || item.isBestSeller),
    isDealOfTheDay: Boolean(item.is_deal_of_the_day || item.isDealOfTheDay),
    image: primaryImage,
    images: imagesArray,
    description: item.description || `${cleanName} - High performance hardware available at Evolution Infotech.`,
    shortDesc: item.short_desc || item.shortDesc || `${cleanName} - ₹${priceNum.toLocaleString('en-IN')}`,
    specs: specsObj,
    highlights: highlightsArray.length > 0 ? highlightsArray : ['100% Genuine Hardware', 'GST Invoice', 'Warranty Support'],
    warranty: item.warranty || '1 Year Official Warranty',
    sku: item.sku || `EVO-${String(item.id || '').slice(-5) || 'GEN'}`
  };
}

export async function fetchAllProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error:', error.message);
      return [];
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data.map(mapSupabaseToProduct);
  } catch (err) {
    console.error('Error connecting to Supabase:', err);
    return [];
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const all = await fetchAllProducts();
  return all.find((p) => p.slug === slug || p.id === slug) || null;
}
