// api/axiosInstance.ts
import axios from 'axios';
import { refreshAccessToken } from './utils/auth-api';
import { AuthState } from '../contexts/auth-context';

export function createAxiosInstance(auth: {
  state: AuthState;
  setAuth: (data: AuthState) => void;
  clearAuth: () => void;
}) {
  const instance = axios.create({
    baseURL: '/', // одинаково для моков и реального API
    headers: { 'Content-Type': 'application/json' },
  });

  instance.interceptors.request.use(async (config) => {
    const { token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt } = auth.state;
    const now = Date.now();
    const refreshThreshold = 30 * 1000; // обновляем за 30 сек до истечения

    let accessToken = token;

    if (!tokenExpiresAt || tokenExpiresAt <= now + refreshThreshold) {
      if (refreshToken && refreshTokenExpiresAt && refreshTokenExpiresAt > now) {
        try {
          const newAuth = await refreshAccessToken(refreshToken);
          auth.setAuth(newAuth);
          accessToken = newAuth.token;
        } catch (err) {
          console.error('Failed to refresh token', err);
          auth.clearAuth();
          return Promise.reject(err);
        }
      } else {
        auth.clearAuth();
        return Promise.reject(new Error('Unauthorized'));
      }
    }

    if (accessToken) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  });

  return instance;
}
