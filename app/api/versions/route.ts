import { NextResponse } from 'next/server';
import { getVersions } from '@lib/storage';
import { createClient } from '@lib/supabase/server';

// GET /api/versions
// Returns the current user's editor content and version history.
// Uses Supabase auth context from the request to identify the user (RLS enforced).
export async function GET() {
  const supabase = createClient(); // server-side supabase client bound to the request
  const { data: { user } } = await supabase.auth.getUser(); // read authenticated user
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // guard
  const store = await getVersions(user.id); // fetch content + versions for this user
  return NextResponse.json(store);
}
