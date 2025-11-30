"use client";

// Client-side AES-GCM helpers for encrypting/decrypting editor content
// Key derived from passphrase using PBKDF2. Salt is stored locally (per device).

const TEXT = new TextEncoder();
const DECODE = new TextDecoder();

function toBase64(bytes: ArrayBuffer): string {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin);
}

function fromBase64(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes.buffer;
}

export function getOrCreateSalt(): string {
  const k = "at_salt";
  let salt = localStorage.getItem(k);
  if (!salt) {
    const buf = crypto.getRandomValues(new Uint8Array(16));
    salt = toBase64(buf.buffer);
    localStorage.setItem(k, salt);
  }
  return salt;
}

async function deriveKey(passphrase: string, saltB64: string): Promise<CryptoKey> {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    TEXT.encode(passphrase),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );
  const salt = fromBase64(saltB64);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptText(passphrase: string, plaintext: string) {
  const saltB64 = getOrCreateSalt();
  const key = await deriveKey(passphrase, saltB64);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    TEXT.encode(plaintext)
  );
  return { ciphertextB64: toBase64(cipher), ivB64: toBase64(iv.buffer), saltB64 };
}

export async function decryptText(passphrase: string, ciphertextB64: string, ivB64: string, saltB64: string): Promise<string> {
  const key = await deriveKey(passphrase, saltB64);
  const cipher = fromBase64(ciphertextB64);
  const iv = new Uint8Array(fromBase64(ivB64));
  const plain = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    cipher
  );
  return DECODE.decode(plain);
}
