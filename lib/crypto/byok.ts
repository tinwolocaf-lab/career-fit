const STORAGE_KEY = 'careerfit_byok_encrypted';
const SALT_KEY = 'careerfit_byok_salt';

async function deriveKey(passphrase: string, salt: Uint8Array): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passphrase),
    'PBKDF2',
    false,
    ['deriveKey']
  );

  return crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt.buffer as ArrayBuffer,
      iterations: 100000,
      hash: 'SHA-256',
    },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

export async function encryptApiKey(apiKey: string, passphrase: string): Promise<void> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await deriveKey(passphrase, salt);

  const encoder = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
    key,
    encoder.encode(apiKey)
  );

  const combined = new Uint8Array(iv.length + encrypted.byteLength);
  combined.set(iv);
  combined.set(new Uint8Array(encrypted), iv.length);

  localStorage.setItem(STORAGE_KEY, btoa(String.fromCharCode(...combined)));
  localStorage.setItem(SALT_KEY, btoa(String.fromCharCode(...salt)));
}

export async function decryptApiKey(passphrase: string): Promise<string | null> {
  const encryptedB64 = localStorage.getItem(STORAGE_KEY);
  const saltB64 = localStorage.getItem(SALT_KEY);

  if (!encryptedB64 || !saltB64) {
    return null;
  }

  try {
    const combined = new Uint8Array(
      atob(encryptedB64).split('').map((c) => c.charCodeAt(0))
    );
    const salt = new Uint8Array(
      atob(saltB64).split('').map((c) => c.charCodeAt(0))
    );

    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const key = await deriveKey(passphrase, salt);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv.buffer as ArrayBuffer },
      key,
      encrypted.buffer as ArrayBuffer
    );

    const decoder = new TextDecoder();
    return decoder.decode(decrypted);
  } catch {
    return null;
  }
}

export function hasStoredKey(): boolean {
  return localStorage.getItem(STORAGE_KEY) !== null;
}

export function removeStoredKey(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(SALT_KEY);
}

export async function testGeminiKey(apiKey: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Say "OK" and nothing else.' }] }],
          generationConfig: { maxOutputTokens: 10 },
        }),
      }
    );
    return response.ok;
  } catch {
    return false;
  }
}
