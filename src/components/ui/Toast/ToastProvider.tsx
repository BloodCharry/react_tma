import React, { useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { Toast, ToastContext } from './ToastContext';

const toastAnimation = keyframes`
  0% { transform: translateY(100%); opacity: 0; }
  10% { transform: translateY(0); opacity: 1; }
  90% { transform: translateY(0); opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
`;

const ToastContainer = styled.div`
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ToastWrapper = styled.div<{ type: 'success' | 'error' | 'info' }>`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 8px;
  background: ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return theme.colors.success;
      case 'error':
        return theme.colors.destructive;
      default:
        return theme.colors.neutral;
    }
  }};
  color: white;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: ${toastAnimation} 3s ease forwards;
`;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const pushToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ pushToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <ToastWrapper key={toast.id} type={toast.type}>
            {toast.message}
          </ToastWrapper>
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
