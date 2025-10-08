import { useCallback, useEffect, useMemo, useState } from 'react';
import { loadToken, saveToken, clearToken } from '@/features/auth/services/authStorage';
import { setAuthToken } from '@/services/api/client';

export function useAuth() {
  const [token, setTokenState] = useState<string | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const token = await loadToken();

      if (!alive) {
        return;
      }

      setTokenState(token);
      setAuthToken(token);
      setAuthenticated(Boolean(token));
    })();
    return () => {
      alive = false;
    };
  }, []);

  const setToken = useCallback(async (token: string | null) => {
    setTokenState(token);
    setAuthToken(token);
    setAuthenticated(Boolean(token));

    if (token) {
      await saveToken(token);
    } else {
      await clearToken();
    }
  }, []);

  return useMemo(() => ({ token, authenticated, setToken }), [token, authenticated, setToken]);
}
