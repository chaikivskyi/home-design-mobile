export const BASE_URL = process.env.EXPO_PUBLIC_API_BASE;

export let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

export async function apiFetch(path: string, init: RequestInit = {}) {
  const headers = new Headers(init.headers);
  headers.set('Content-Type', 'application/json');

  if (authToken) {
    headers.set('Authorization', `Bearer ${authToken}`);
  }

  const response = await fetch(`${BASE_URL}${path}`, { ...init, headers });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;

    try {
      const data = await response.json();

      if (data?.message) {
        message = data.message;
      }
    } catch {}
    throw new Error(message);
  }

  return response;
}
