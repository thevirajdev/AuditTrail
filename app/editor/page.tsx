"use client";

import { useEffect, useState } from "react";
import { createClient } from "@lib/supabase/client";
import Link from "next/link";
import { wordDiff } from "@lib/diff";

type VersionEntry = {
  id: string;
  timestamp: string;
  addedWords: string[];
  removedWords: string[];
  oldLength: number;
  newLength: number;
};

type VersionsResponse = {
  versions: VersionEntry[];
  content: string;
};

export default function EditorPage() {
  const supabase = createClient();
  const [userEmail, setUserEmail] = useState<string>("");
  const [content, setContent] = useState("");
  const [prevContentPlain, setPrevContentPlain] = useState("");
  const [versions, setVersions] = useState<VersionEntry[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<number>(18);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email ?? "");
    })();
  }, [supabase]);

  const load = async () => {
    try {
      const res = await fetch("/api/versions", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load versions");
      const data: VersionsResponse = await res.json();
      const c = data.content || "";
      setContent(c);
      setPrevContentPlain(c);
      setVersions(data.versions || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load versions");
    }
  };

  useEffect(() => {
    load();
  }, []);

  useEffect(() => {
    const calcRows = () => {
      const w = window.innerWidth;
      if (w < 360) return 9;
      if (w < 400) return 10;
      if (w < 480) return 12;
      if (w < 640) return 14;
      return 18;
    };
    const apply = () => setRows(calcRows());
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  const save = async () => {
    setSaving(true);
    setError(null);
    try {
      const oldText = prevContentPlain;
      const newText = content;
      const { addedWords, removedWords } = wordDiff(oldText, newText);
      const oldLength = oldText.length;
      const newLength = newText.length;

      const res = await fetch("/api/save-version", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newText,
          addedWords,
          removedWords,
          oldLength,
          newLength,
        }),
      });
      if (!res.ok) throw new Error("Save failed");
      const saved: VersionEntry = await res.json();
      setVersions((prev: VersionEntry[]) => [saved, ...prev]);
      setPrevContentPlain(newText);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setSaving(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <main>

      <header className="editor-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 16, padding: '10px 12px', border: '1px solid #22314d', borderRadius: 10, background: 'linear-gradient(180deg, rgba(31,41,55,0.5) 0%, rgba(15,23,42,0.5) 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#ef4444' }} />
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#f59e0b' }} />
          <div style={{ width: 10, height: 10, borderRadius: 9999, background: '#22c55e' }} />
          <h1 className="editor-title" style={{ fontSize: 18, margin: 0, marginLeft: 8, color: '#e6edf3', whiteSpace: 'nowrap' }}>audit-trail — editor</h1>
        </div>
        <div className="editor-header-actions" style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          {userEmail && <span className="editor-email" style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: '#9fb2c8', fontSize: 13, background: '#0f172a', padding: '6px 10px', borderRadius: 8, border: '1px solid #22314d' }}>{userEmail}</span>}
          <button onClick={signOut} style={{ background: '#0f172a', color: '#e6edf3', padding: '8px 12px', borderRadius: 8, border: '1px solid #22314d', cursor: 'pointer' }}>Logout</button>
          <Link href="/" style={{ color: '#9fb2c8' }}>Home</Link>
        </div>
      </header>


      <div className="editor-grid" style={{ gap: 24 }}>
        <section>
          <h2 style={{ fontSize: 16, margin: '0 0 8px 0', color: '#9fb2c8' }}>Content Editor</h2>
          <div style={{ border: '1px solid #22314d', borderRadius: 10, overflow: 'hidden', background: '#0f172a' }}>
            <div className="code-grid">
              <div style={{ background: '#0b1220', borderRight: '1px solid #22314d', color: '#64748b', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace' }}>
                <div style={{ padding: '8px 6px' }}>
                  {Array.from({ length: Math.max(16, content.split('\n').length) }).map((_, i) => (
                    <div key={i} style={{ lineHeight: '1.6em', fontSize: 12 }}>{i + 1}</div>
                  ))}
                </div>
              </div>
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none',
                  backgroundImage: 'linear-gradient(rgba(34,49,77,0.25) 1px, transparent 1px)',
                  backgroundSize: '100% 1.6em'
                }} />
                <textarea
                  value={content}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                  rows={rows}
                  style={{ width: '100%', padding: '8px 12px', border: 'none', outline: 'none', background: 'transparent', color: '#e6edf3', fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace', lineHeight: '1.6em', resize: 'vertical' }}
                  placeholder="Start typing..."
                />
              </div>
            </div>
          </div>
          <div className="actions-row" style={{ marginTop: 12, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button className="btn-responsive" onClick={save} disabled={saving} style={{ background: '#2563eb', color: 'white', padding: '10px 14px', borderRadius: 8, border: 'none', cursor: 'pointer' }}>
              {saving ? 'Saving...' : 'Save Version'}
            </button>
            <button className="btn-responsive" onClick={load} style={{ background: '#0f172a', color: 'white', padding: '10px 14px', borderRadius: 8, border: '1px solid #22314d', cursor: 'pointer' }}>
              Refresh
            </button>
            {error && <span style={{ color: '#fbbf24' }}>{error}</span>}
          </div>
        </section>

        <section>
          <h2 style={{ fontSize: 16, margin: '0 0 8px 0', color: '#9fb2c8' }}>Version History</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {versions.length === 0 && (
              <div style={{ color: '#9fb2c8' }}>No versions yet. Make an edit and save a version.</div>
            )}
            {versions.map((v) => (
              <div key={v.id} style={{ border: '1px solid #22314d', borderRadius: 10, padding: 12, background: '#0f172a', position: 'relative' }}>
                <div style={{ position: 'absolute', left: -8, top: 16, width: 4, height: 4, borderRadius: 9999, background: '#22c55e' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, alignItems: 'center' }}>
                  <strong style={{ fontSize: 13 }}>{v.timestamp}</strong>
                  <span style={{ color: '#9fb2c8', fontSize: 12 }}>Len: {v.oldLength} → {v.newLength}</span>
                </div>
                <div style={{ fontSize: 12, color: '#9fb2c8', marginBottom: 6, wordBreak: 'break-all' }}>ID: {v.id}</div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.35)', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>
                    + {v.addedWords.length > 0 ? v.addedWords.join(', ') : '—'}
                  </span>
                  <span style={{ background: 'rgba(248,113,113,0.12)', color: '#f87171', border: '1px solid rgba(248,113,113,0.35)', padding: '2px 6px', borderRadius: 6, fontSize: 12 }}>
                    - {v.removedWords.length > 0 ? v.removedWords.join(', ') : '—'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
