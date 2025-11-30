import { wordDiff } from './diff';
import { createClient } from './supabase/server';
import * as NodeCrypto from 'crypto';

export type VersionEntry = {
  id: string;
  timestamp: string;
  addedWords: string[];
  removedWords: string[];
  oldLength: number;
  newLength: number;
};

export type Store = {
  content: string;
  versions: VersionEntry[];
};

function formatTimestamp(d = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const yyyy = d.getFullYear();
  const MM = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const HH = pad(d.getHours());
  const mm = pad(d.getMinutes());
  return `${yyyy}-${MM}-${dd} ${HH}:${mm}`;
}

export async function getVersions(userId: string): Promise<Store> {
  const supabase = createClient();
  const { data: state } = await supabase
    .from('user_state')
    .select('content')
    .eq('user_id', userId)
    .single();

  // Decrypt if server-side encryption is enabled and content is enc2:iv:cipher
  const K = process.env.DATA_ENC_KEY;
  let content = state?.content ?? '';
  if (K && content.startsWith('enc2:')) {
    try {
      const [, ivB64, cipherB64] = content.split(':');
      const iv = Buffer.from(ivB64, 'base64');
      const full = Buffer.from(cipherB64, 'base64');
      const keyObj = (NodeCrypto as any).createSecretKey((NodeCrypto as any).createHash('sha256').update(K).digest());
      const authTag = full.subarray(full.length - 16);
      const data = full.subarray(0, full.length - 16);
      const decipher = (NodeCrypto as any).createDecipheriv('aes-256-gcm', keyObj, iv);
      decipher.setAuthTag(authTag);
      const plain = Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
      content = plain;
    } catch {
      content = '';
    }
  }

  const { data: versions } = await supabase
    .from('audit_versions')
    .select('id, timestamp, added_words, removed_words, old_length, new_length')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  return {
    content,
    versions: (versions || []).map((v: any) => {
      const entryBase = {
        id: v.id,
        timestamp: v.timestamp,
        oldLength: v.old_length || 0,
        newLength: v.new_length || 0,
      } as Omit<VersionEntry, 'addedWords' | 'removedWords'>;

      const K2 = process.env.DATA_ENC_KEY;
      const aw = v.added_words || [];
      // If encrypted format: added_words is a single enc2 string with packed JSON
      if (K2 && Array.isArray(aw) && aw.length === 1 && typeof aw[0] === 'string' && (aw[0] as string).startsWith('enc2:')) {
        try {
          const packed = String(aw[0]);
          const [, ivB64, cipherB64] = packed.split(':');
          const iv = Buffer.from(ivB64, 'base64');
          const full = Buffer.from(cipherB64, 'base64');
          const keyObj = (NodeCrypto as any).createSecretKey((NodeCrypto as any).createHash('sha256').update(K2).digest());
          const authTag = full.subarray(full.length - 16);
          const data = full.subarray(0, full.length - 16);
          const decipher = (NodeCrypto as any).createDecipheriv('aes-256-gcm', keyObj, iv);
          decipher.setAuthTag(authTag);
          const json = Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8');
          const parsed = JSON.parse(json) as { addedWords: string[]; removedWords: string[] };
          return { ...entryBase, addedWords: parsed.addedWords || [], removedWords: parsed.removedWords || [] } as VersionEntry;
        } catch {
          // Fallback to legacy columns if decryption fails
        }
      }
      // Legacy plaintext arrays
      return {
        ...entryBase,
        addedWords: v.added_words || [],
        removedWords: v.removed_words || [],
      } as VersionEntry;
    }),
  };
}

export async function saveVersion(userId: string, payload: {
  contentStr?: string;
  content?: string;
  addedWords: string[];
  removedWords: string[];
  oldLength: number;
  newLength: number;
  timestamp?: string;
}): Promise<VersionEntry> {
  const supabase = createClient();

  const entry: VersionEntry = {
    id: crypto.randomUUID(),
    timestamp: payload.timestamp || formatTimestamp(new Date()),
    addedWords: payload.addedWords,
    removedWords: payload.removedWords,
    oldLength: payload.oldLength,
    newLength: payload.newLength,
  };

  const changed = entry.oldLength !== entry.newLength || entry.addedWords.length > 0 || entry.removedWords.length > 0;
  if (changed) {
    // Resolve content to persist
    let contentToStore = payload.contentStr ?? payload.content ?? '';

    // Server-side encryption if key set and content is not already marked as enc2
    const K = process.env.DATA_ENC_KEY;
    if (K && !contentToStore.startsWith('enc2:')) {
      const keyObj = (NodeCrypto as any).createSecretKey((NodeCrypto as any).createHash('sha256').update(K).digest());
      const iv = (NodeCrypto as any).randomBytes(12);
      const cipher = (NodeCrypto as any).createCipheriv('aes-256-gcm', keyObj, iv);
      const data = Buffer.concat([cipher.update(contentToStore, 'utf8'), cipher.final()]);
      const authTag = cipher.getAuthTag();
      const packed = Buffer.concat([data, authTag]).toString('base64');
      contentToStore = `enc2:${iv.toString('base64')}:${packed}`;
    }

    await supabase.from('user_state').upsert({ user_id: userId, content: contentToStore }, { onConflict: 'user_id' });

    // Prepare audit_versions payload. If encryption key exists, store a packed enc2 string in added_words.
    const payloadToInsert: any = {
      id: entry.id,
      user_id: userId,
      timestamp: entry.timestamp,
      old_length: entry.oldLength,
      new_length: entry.newLength,
    };

    if (K) {
      try {
        const pack = JSON.stringify({ addedWords: entry.addedWords, removedWords: entry.removedWords });
        const keyObj = (NodeCrypto as any).createSecretKey((NodeCrypto as any).createHash('sha256').update(K).digest());
        const iv = (NodeCrypto as any).randomBytes(12);
        const cipher = (NodeCrypto as any).createCipheriv('aes-256-gcm', keyObj, iv);
        const data = Buffer.concat([cipher.update(pack, 'utf8'), cipher.final()]);
        const authTag = cipher.getAuthTag();
        const packed = Buffer.concat([data, authTag]).toString('base64');
        const token = `enc2:${iv.toString('base64')}:${packed}`;
        payloadToInsert.added_words = [token];
        payloadToInsert.removed_words = [];
      } catch {
        // If packing fails, fall back to plaintext arrays
        payloadToInsert.added_words = entry.addedWords;
        payloadToInsert.removed_words = entry.removedWords;
      }
    } else {
      payloadToInsert.added_words = entry.addedWords;
      payloadToInsert.removed_words = entry.removedWords;
    }

    await supabase.from('audit_versions').insert(payloadToInsert);
  }

  return entry;
}
