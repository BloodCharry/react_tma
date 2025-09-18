// app/AuthProvider.tsx
import { useState, useCallback } from 'react';
import { AuthContext, AuthState } from '../contexts/auth-context';

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  tokenExpiresAt: null,
  refreshTokenExpiresAt: null,
  role: null,
  companyId: null,
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const saved = localStorage.getItem('auth');
    if (saved) {
      try {
        return JSON.parse(saved) as AuthState;
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  const setAuth = useCallback((data: AuthState) => {
    setState(data);
    localStorage.setItem('auth', JSON.stringify(data));
  }, []);

  const clearAuth = useCallback(() => {
    setState(initialState);
    localStorage.removeItem('auth');
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
