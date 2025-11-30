"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
  return createClientComponentClient({ supabaseUrl, supabaseKey });
}
