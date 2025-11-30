import { NextRequest, NextResponse } from 'next/server';
import { saveVersion } from '@lib/storage';
import { createClient } from '@lib/supabase/server';

// POST /api/save-version
// Persists a new version entry for the current user. Expects a JSON payload
// containing: content, addedWords[], removedWords[], oldLength, newLength.
// Authentication is inferred from the request via Supabase helpers (RLS enforced).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // parse JSON body
    const payload = body; // trust shape from client-side editor
    const supabase = createClient(); // server-side supabase client bound to the request
    const { data: { user } } = await supabase.auth.getUser(); // authenticated user
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); // guard
    const entry = await saveVersion(user.id, payload); // write version row via storage lib
    return NextResponse.json(entry, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
