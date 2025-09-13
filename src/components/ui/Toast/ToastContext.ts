import { createContext } from 'react';

export interface Toast {
  id: number;
  type: 'success' | 'error' | 'info';
  message: string;
}

export interface ToastContextType {
  pushToast: (toast: Omit<Toast, 'id'>) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
