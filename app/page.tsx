"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@lib/supabase/client";
import TerminalAuth from "./components/TerminalAuth";

export default function LandingPage() {
  const [showTerminal, setShowTerminal] = useState(false);
  // No auto-redirect on home. Users can open terminal via Get Started.

  return (
    <>
      <main>
        {/* Terminal-like title window */}
        <div style={{ border: '1px solid #22314d', borderRadius: 14, overflow: 'hidden', boxShadow: '0 12px 28px rgba(0,0,0,0.35)', marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#0f172a', borderBottom: '1px solid #22314d' }}>
            <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#ef4444' }} />
            <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#f59e0b' }} />
            <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#22c55e' }} />
            <span style={{ marginLeft: 8, color: '#9fb2c8' }}>terminal — run</span>
            <Link href="/details" style={{ marginLeft: 'auto', color: '#9fb2c8' }}>Details</Link>
          </div>
          <div style={{ padding: '28px 24px', background: 'linear-gradient(180deg, rgba(31,41,55,0.6) 0%, rgba(15,23,42,0.6) 100%)' }}>
            <div style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: '#e6edf3', fontSize: 42, fontWeight: 800, letterSpacing: 0.3 }}>
              $ Audit Trail
            </div>
            <div style={{ marginTop: 8, color: '#9fb2c8' }}>
              Track text changes with automatic version history. Word-level diffs, timestamps, and clean history.
            </div>
          </div>
        </div>

        {/* Editor-like details panel */}
        <section id="details">
          <div style={{ border: '1px solid #22314d', borderRadius: 12, overflow: 'hidden', background: '#0f172a' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr' }}>
              <div style={{ background: '#0b1220', borderRight: '1px solid #22314d', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
                <div style={{ padding: '8px 6px' }}>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div key={i} style={{ lineHeight: '1.8em', fontSize: 12 }}>{i + 1}</div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(34,49,77,0.22) 1px, transparent 1px)', backgroundSize: '100% 1.8em' }} />
                <div style={{ padding: '12px 14px', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', color: '#e6edf3' }}>
                  <div>// Description</div>
                  <div>• Save Version detects word-level diffs (added/removed).</div>
                  <div>• Version entry includes: id, timestamp, addedWords, removedWords, oldLength, newLength.</div>
                  <div>• Auth via Email/Google using Supabase. Data is per-user.</div>
                  <div>• Hosting on Vercel with a secure setup.</div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <button onClick={() => setShowTerminal(true)} style={{ background: '#22c55e', color: '#0b1220', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>Get Started</button>
          </div>
        </section>
      </main>
      {showTerminal && <TerminalAuth onClose={() => setShowTerminal(false)} />}
    </>
  );
}
