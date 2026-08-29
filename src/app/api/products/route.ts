import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rusmmcemlubdvvxehfyi.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_BWIHjgRT5xWC77l0uKljZQ_yr8eZDe7';

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: 'Supabase credentials missing' }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  // Try selecting from 'products'
  const { data: productsData, error: productsError } = await supabase
    .from('products')
    .select('*');

  return NextResponse.json({
    supabaseUrl,
    productsData,
    productsCount: productsData?.length || 0,
    productsError
  });
}
