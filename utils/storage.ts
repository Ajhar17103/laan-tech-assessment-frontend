export function getSessionStorage(key: string): string | null {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem(key);
  }
  return null;
}

export function setSessionStorage(key: string, value: string) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, value);
  }
}

export function removeSessionStorage(key: string) {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem(key);
  }
}
