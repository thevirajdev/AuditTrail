export function tokenizeWords(text: string): string[] {
  // Split by non-letter/number apostrophe/underscore, keep words in lowercase
  return (text.match(/[A-Za-z0-9_'’-]+/g) || []).map(w => w.toLowerCase());
}

export function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

export function wordDiff(oldText: string, newText: string) {
  const a = tokenizeWords(oldText);
  const b = tokenizeWords(newText);

  const count = (xs: string[]) => xs.reduce<Record<string, number>>((acc, x) => {
    acc[x] = (acc[x] || 0) + 1;
    return acc;
  }, {});

  const ca = count(a);
  const cb = count(b);

  const added: string[] = [];
  const removed: string[] = [];

  const keys = new Set([...Object.keys(ca), ...Object.keys(cb)]);
  for (const k of keys) {
    const da = ca[k] || 0;
    const db = cb[k] || 0;
    if (db > da) added.push(k);
    if (da > db) removed.push(k);
  }

  return {
    addedWords: unique(added).sort(),
    removedWords: unique(removed).sort(),
  };
}
