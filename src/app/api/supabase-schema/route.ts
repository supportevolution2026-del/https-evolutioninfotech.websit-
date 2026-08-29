import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Check 'products'
  const { data: products, error: pErr } = await supabase.from('products').select('*');
  
  // Check 'product'
  const { data: productSingle, error: psErr } = await supabase.from('product').select('*');

  // Check 'categories'
  const { data: categories, error: cErr } = await supabase.from('categories').select('*');

  return NextResponse.json({
    products: { count: products?.length || 0, data: products, error: pErr?.message },
    product: { count: productSingle?.length || 0, data: productSingle, error: psErr?.message },
    categories: { count: categories?.length || 0, data: categories, error: cErr?.message }
  });
}
