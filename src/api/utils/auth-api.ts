import { AuthState } from '../../contexts/auth-context';

export async function refreshAccessToken(refreshToken: string): Promise<AuthState> {
  const res = await fetch('/auth/refresh_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!res.ok) throw new Error('Failed to refresh token');

  const data = await res.json();

  return {
    token: data.access_token,
    refreshToken: data.refresh_token,
    tokenExpiresAt: Date.now() + data.expires_in_access_token * 1000,
    refreshTokenExpiresAt: Date.now() + data.expires_in_refresh_token * 1000,
    role: data.active_role?.name || null,
    companyId: data.active_company?.id || null,
  };
}
