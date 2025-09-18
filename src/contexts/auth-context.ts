import { createContext } from 'react';

export interface AuthState {
  token: string | null; // access_token
  refreshToken: string | null;
  tokenExpiresAt: number | null; // timestamp в ms
  refreshTokenExpiresAt: number | null;
  role: string | null;
  companyId: string | null;
}

export interface AuthContextValue extends AuthState {
  setAuth: (data: AuthState) => void;
  clearAuth: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
