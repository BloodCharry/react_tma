// import { refreshAccessToken } from './auth-api';
// import { AuthState } from '../../contexts/auth-context';
//
// interface FetchWithAuthOptions extends RequestInit {
//   auth: {
//     state: AuthState;
//     setAuth: (data: AuthState) => void;
//     clearAuth: () => void;
//   };
//   refreshThresholdSeconds?: number; // за сколько секунд до истечения обновлять токен
// }
//
// export async function fetchWithAuth(
//   url: string,
//   options: FetchWithAuthOptions
// ): Promise<Response> {
//   const { state, setAuth, clearAuth } = options.auth;
//   const refreshThreshold = (options.refreshThresholdSeconds ?? 30) * 1000;
//
//   let { token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt } = state;
//
//   // Проверка: нужно ли обновить токен
//   const now = Date.now();
//   const tokenExpired = !tokenExpiresAt || tokenExpiresAt <= now + refreshThreshold;
//
//   if (tokenExpired) {
//     if (refreshToken && refreshTokenExpiresAt && refreshTokenExpiresAt > now) {
//       try {
//         const newAuth = await refreshAccessToken(refreshToken);
//         setAuth(newAuth);
//         token = newAuth.token;
//       } catch (err) {
//         console.error('Failed to refresh token', err);
//         clearAuth();
//         throw new Error('Unauthorized');
//       }
//     } else {
//       // refresh_token тоже истёк
//       clearAuth();
//       throw new Error('Unauthorized');
//     }
//   }
//
//   // Формируем заголовки
//   const headers = new Headers(options.headers || {});
//   if (token) {
//     headers.set('Authorization', `Bearer ${token}`);
//   }
//
//   // Выполняем запрос
//   return fetch(url, {
//     ...options,
//     headers,
//   });
// }
