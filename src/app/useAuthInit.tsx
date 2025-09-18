// app/useAuthInit.ts
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { refreshAccessToken } from '../api/utils/auth-api';
import ErrorBlock from '../components/ui/ErrorBlock/ErrorBlock';

export function useAuthInit() {
  const { token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt, setAuth, clearAuth } = useAuth();
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');

  useEffect(() => {
    (async () => {
      try {
        // Если есть токен и он ещё жив
        if (token && tokenExpiresAt && tokenExpiresAt > Date.now()) {
          setStatus('ready');
          return;
        }

        // Если токен истёк, но refreshToken ещё жив
        if (refreshToken && refreshTokenExpiresAt && refreshTokenExpiresAt > Date.now()) {
          const newAuth = await refreshAccessToken(refreshToken);
          setAuth(newAuth);
          setStatus('ready');
          return;
        }

        // Иначе — пробуем получить токен с нуля
        const res = await fetch('/auth/auth_with_webapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ /* init_data */ }),
        });

        if (!res.ok) throw new Error('Auth failed');
        const data = await res.json();

        if (!data.access_token || !data.active_role?.name) {
          setStatus('error');
          return;
        }

        setAuth({
          token: data.access_token,
          refreshToken: data.refresh_token,
          tokenExpiresAt: Date.now() + data.expires_in_access_token * 1000,
          refreshTokenExpiresAt: Date.now() + data.expires_in_refresh_token * 1000,
          role: data.active_role.name,
          companyId: data.active_company?.id || null,
        });

        setStatus('ready');
      } catch {
        clearAuth();
        setStatus('error');
      }
    })();
  }, [token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt, setAuth, clearAuth]);

  if (status === 'loading') return { loading: true, error: false };
  if (status === 'error') return { loading: false, error: true, ErrorComponent: <ErrorBlock /> };
  return { loading: false, error: false };
}
