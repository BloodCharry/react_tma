import { useState } from 'react';
import { AuthContext, AuthState } from '../contexts/auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    token: null,
    role: null,
    companyId: null,
  });

  const setAuth = (data: AuthState) => {
    setState(data);
    localStorage.setItem('auth', JSON.stringify(data));
  };

  return (
    <AuthContext.Provider value={{ ...state, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
