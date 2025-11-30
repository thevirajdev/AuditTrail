"use client";

import Link from "next/link";

export default function DetailsPage() {
  return (
    <main>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '10px 12px', border: '1px solid #22314d', borderRadius: 10, background: 'linear-gradient(180deg, rgba(31,41,55,0.5) 0%, rgba(15,23,42,0.5) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#ef4444' }} />
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#f59e0b' }} />
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#22c55e' }} />
          <h1 style={{ fontSize: 18, margin: 0, marginLeft: 8, color: '#e6edf3' }}>audit-trail — details</h1>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <Link href="/" style={{ color: '#9fb2c8' }}>Home</Link>
        </div>
      </header>

      {/* Project Details (editor-styled) */}
      <section>
        <h2 style={{ fontSize: 16, margin: '0 0 8px 0', color: '#9fb2c8' }}>Project Details</h2>
        <div style={{ border: '1px solid #22314d', borderRadius: 10, overflow: 'hidden', background: '#0f172a', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr' }}>
            <div style={{ background: '#0b1220', borderRight: '1px solid #22314d', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
              <div style={{ padding: '8px 6px' }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} style={{ lineHeight: '1.6em', fontSize: 12 }}>{i + 1}</div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(34,49,77,0.25) 1px, transparent 1px)', backgroundSize: '100% 1.6em' }} />
              <div style={{ padding: '12px 14px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: '#e6edf3' }}>
                <div>// Owner</div>
                <div>Priyvart Prakash</div>
                <div style={{ height: 8 }} />
                <div>// Emails</div>
                <div>viajsingh1316mp@gmail.com</div>
                <div>thevirajdeveloper@gmail.com</div>
                <div style={{ height: 8 }} />
                <div>// Contact</div>
                <div>8092363881</div>
                <div style={{ height: 8 }} />
                <div>// Overview</div>
                <div>Mini Audit Trail Generator records and visualizes word-level changes over time.</div>
                <div>Each version contains timestamp, added/removed words, and length deltas.</div>
                <div>Per-user data storage on Supabase. Server-side encryption available.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section>
        <h2 style={{ fontSize: 16, margin: '0 0 8px 0', color: '#9fb2c8' }}>Features</h2>
        <div style={{ border: '1px solid #22314d', borderRadius: 10, overflow: 'hidden', background: '#0f172a', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr' }}>
            <div style={{ background: '#0b1220', borderRight: '1px solid #22314d', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
              <div style={{ padding: '8px 6px' }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <div key={i} style={{ lineHeight: '1.6em', fontSize: 12 }}>{i + 1}</div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(34,49,77,0.25) 1px, transparent 1px)', backgroundSize: '100% 1.6em' }} />
              <div style={{ padding: '12px 14px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: '#e6edf3' }}>
                <div>• Editor with line numbers and grid background</div>
                <div>• Word-level diff: added/removed tokens</div>
                <div>• Version history: timestamp, length delta</div>
                <div>• Supabase auth: email/password, Google</div>
                <div>• Terminal-themed auth experience</div>
                <div>• Server-side AES-256-GCM encryption (enc2:...)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section>
        <h2 style={{ fontSize: 16, margin: '0 0 8px 0', color: '#9fb2c8' }}>Tech Stack</h2>
        <div style={{ border: '1px solid #22314d', borderRadius: 10, overflow: 'hidden', background: '#0f172a', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr' }}>
            <div style={{ background: '#0b1220', borderRight: '1px solid #22314d', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
              <div style={{ padding: '8px 6px' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} style={{ lineHeight: '1.6em', fontSize: 12 }}>{i + 1}</div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(34,49,77,0.25) 1px, transparent 1px)', backgroundSize: '100% 1.6em' }} />
              <div style={{ padding: '12px 14px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: '#e6edf3' }}>
                <div>• Next.js 14 (App Router, TypeScript)</div>
                <div>• Supabase (Auth + Postgres + RLS)</div>
                <div>• Node crypto (AES-256-GCM at rest)</div>
                <div>• Vercel (Hosting)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section>
        <h2 style={{ fontSize: 16, margin: '0 0 8px 0', color: '#9fb2c8' }}>Security</h2>
        <div style={{ border: '1px solid #22314d', borderRadius: 10, overflow: 'hidden', background: '#0f172a', marginBottom: 16 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr' }}>
            <div style={{ background: '#0b1220', borderRight: '1px solid #22314d', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
              <div style={{ padding: '8px 6px' }}>
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} style={{ lineHeight: '1.6em', fontSize: 12 }}>{i + 1}</div>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(34,49,77,0.25) 1px, transparent 1px)', backgroundSize: '100% 1.6em' }} />
              <div style={{ padding: '12px 14px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: '#e6edf3' }}>
                <div>• RLS policies limit data access per user</div>
                <div>• API uses authenticated session context</div>
                <div>• No service role key on client</div>
                <div>• DATA_ENC_KEY enables at-rest encryption</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
