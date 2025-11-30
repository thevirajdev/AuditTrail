# Mini Audit Trail Generator

A minimal, modern app that records a per-user audit trail of text changes. Email/Google auth powered by Supabase. Each version stores timestamp, word-level diffs, and length deltas. Built on Next.js 14 (App Router). Optional server-side encryption-at-rest.

## Features
- Per-user data isolation via Supabase Auth + RLS
- Terminal-themed landing auth flow (Get Started)
- Classic Login page with "Forgot password?" OTP flow
- Protected Editor with line numbers and version history
- Save Version computes word-level diffs (added/removed)
- Encryption-at-rest option using AES-256-GCM when `DATA_ENC_KEY` is set

## Tech Stack
- Next.js 14 (App Router, TypeScript)
- Supabase (Auth + Postgres + RLS)
- Vercel (Hosting)
- Node crypto (AES-256-GCM)

## Local Setup

1) Clone and install
```
npm install
```

2) Environment variables
Create `.env.local` with the following (never commit secrets):
```
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
# Optional: enable server-side encryption at rest
DATA_ENC_KEY=32_byte_hex_or_utf8_key
```

3) Supabase SQL (run in Supabase SQL Editor)
```
create table if not exists public.user_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  content text not null default '',
  updated_at timestamp with time zone not null default now()
);

create table if not exists public.audit_versions (
  id uuid primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  timestamp text not null,
  added_words text[] not null default '{}',
  removed_words text[] not null default '{}',
  old_length integer not null,
  new_length integer not null,
  created_at timestamp with time zone not null default now()
);

alter table public.user_state enable row level security;
alter table public.audit_versions enable row level security;

create policy "user can select own state" on public.user_state
for select using (auth.uid() = user_id);

create policy "user can upsert own state" on public.user_state
for insert with check (auth.uid() = user_id);

create policy "user can update own state" on public.user_state
for update using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "user can select own versions" on public.audit_versions
for select using (auth.uid() = user_id);

create policy "user can insert own versions" on public.audit_versions
for insert with check (auth.uid() = user_id);
```

4) Auth Providers
- In Supabase Dashboard → Auth → Providers → enable Google (optional but recommended)
- Add Redirect URLs:
  - Local: `http://localhost:3000/auth/callback`
  - Production: `https://YOUR_VERCEL_DOMAIN/auth/callback`

5) Run
```
npm run dev
```
Open http://localhost:3000 → Get Started → Login → Editor

## Routes
- `/` Landing (terminal-themed, opens auth modal)
- `/login` Classic login/signup + 6-digit OTP flows
- `/editor` Protected editor and version history
- `/details` Project details (separate page, editor-style layout)
- `POST /api/save-version` Save a version for the current user
- `GET /api/versions` Fetch content + versions for the current user

## Auth Flows
- Landing Get Started terminal modal supports:
  - Login, Signup, Google OAuth
  - Shortcuts (1/2/3 and aliases), focus retention, Ctrl+C cancel
  - 6-digit OTP for signup and password reset
- Classic `/login` supports:
  - Email/password, Google
  - Visible "Forgot password?" → Email → 6-digit OTP → New password

## Security Notes
- RLS ensures each user can only access their data.
- API handlers read the session via `@supabase/auth-helpers-nextjs`.
- No service role key on client.
- Encryption-at-rest: when `DATA_ENC_KEY` is set, audit version word diffs are stored as a single `enc2:...` ciphertext (AES-256-GCM) and transparently decrypted in reads.

## Project Structure
```
app/
  page.tsx                 # Landing (terminal UI, Get Started)
  login/page.tsx           # Classic auth UI (with Forgot password OTP)
  editor/page.tsx          # Protected editor (requires auth)
  details/page.tsx         # Project details (separate from editor)
  api/
    versions/route.ts      # GET per-user versions
    save-version/route.ts  # POST save version
lib/
  diff.ts                  # wordDiff logic
  storage.ts               # Supabase read/write + optional encryption
  supabase/
    client.ts              # client-side supabase
    server.ts              # server-side supabase for routes
middleware.ts              # protects /editor

## Development scripts
- `npm run dev` start dev server
- `npm run build` production build
- `npm run start` run production server

## Notes on Diff Algorithm
- Tokenize words case-insensitively, count occurrences.
- Increase = additions; decrease = removals.
- Simple and robust for word-level changes.

## Troubleshooting
- SWC on Windows: ensure `@next/swc-win32-x64-msvc` is installed (already included).
- If npm registry/network issues occur on Windows, prefer IPv4 and official registry.

## License
MIT
