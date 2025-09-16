import { createContext } from 'react';

export interface AuthState {
  token: string | null;
  role: string | null;
  companyId: string | null;
}

export interface AuthContextValue extends AuthState {
  setAuth: (data: AuthState) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
