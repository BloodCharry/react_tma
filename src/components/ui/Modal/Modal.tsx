import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideIn = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.2s ease;
  z-index: 1000;
`;

const ModalWrapper = styled.div<{ size: 'sm' | 'md' | 'lg' | 'full' }>`
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 12px;
  max-width: ${({ size }) =>
    size === 'sm' ? '300px' : size === 'lg' ? '600px' : '520px'};
  width: ${({ size }) => (size === 'full' ? '95%' : '90%')};
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideIn} 0.2s ease;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Title = styled.h3`
  margin: 0;
  font-size: 17px;
  font-weight: 600;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const Content = styled.div`
  padding: 16px;
`;

const Footer = styled.div`
  padding: 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'full';
}

export const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'md',
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      // Блокируем скролл основного контента
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <Overlay role="dialog" aria-modal="true">
      <ModalWrapper ref={modalRef} size={size}>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onClose} aria-label="Закрыть">×</CloseButton>
        </Header>
        <Content>{children}</Content>
        {footer && <Footer>{footer}</Footer>}
      </ModalWrapper>
    </Overlay>
  );
};

export default Modal;