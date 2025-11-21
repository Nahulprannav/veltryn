export async function hashPassword(password: string): Promise<string> {
  if (!password) return '';
  // Use Web Crypto API (available in browser) to compute SHA-256
  const enc = new TextEncoder();
  const data = enc.encode(password);
  const hashBuffer = await (globalThis.crypto || (window as any).crypto).subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export function isHashedPassword(pw: string | undefined): boolean {
  if (!pw) return false;
  return /^[a-f0-9]{64}$/.test(pw);
}
