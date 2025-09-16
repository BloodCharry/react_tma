// app/useAuthInit.ts
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ErrorBlock from '../components/ui/ErrorBlock/ErrorBlock';

export function useAuthInit() {
  const { setAuth } = useAuth();
  const [status, setStatus] = useState<'loading' | 'error' | 'ready'>('loading');

  useEffect(() => {
    const saved = localStorage.getItem('auth');

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.token && parsed.role) {
          setAuth(parsed);
          setStatus('ready');
          return;
        }
      } catch (err) {console.error('Failed to parse saved auth', err);}
    }

    // Если нет сохранённых данных — идём в Telegram WebApp API
    (async () => {
      try {
        const res = await fetch('/auth/auth_with_webapp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ /* сюда данные от Telegram WebApp */ }),
        });

        if (!res.ok) throw new Error('Auth failed');
        const data = await res.json();

        if (!data.access_token || !data.active_role?.name) {
          setStatus('error');
          return;
        }

        setAuth({
          token: data.access_token,
          role: data.active_role.name,
          companyId: data.active_company?.id || null,
        });

        setStatus('ready');
      } catch {
        setStatus('error');
      }
    })();
  }, [setAuth]);

  if (status === 'loading') return { loading: true, error: false };
  if (status === 'error') return { loading: false, error: true, ErrorComponent: <ErrorBlock /> };
  return { loading: false, error: false };
}
