import React from 'react';
import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'outline' | 'destructive';
type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const sizeStyles = {
  sm: '6px 10px',
  md: '10px 14px',
  lg: '12px 18px'
};

const Root = styled.button<{ variant: Variant; size: Size; loading?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: ${(p) => p.theme.radii.md};
  padding: ${(p) => sizeStyles[p.size]};
  font-weight: 600;
  font-size: ${(p) => p.theme.fontSizes.body};
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  ${(p) =>
    p.variant === 'primary' &&
    css`
      background: ${p.theme.colors.primary};
      color: #fff;
    `}

  ${(p) =>
    p.variant === 'secondary' &&
    css`
      background: #fff;
      color: ${p.theme.colors.primary};
      border: 1px solid ${p.theme.colors.primary};
    `}

  ${(p) =>
    p.variant === 'outline' &&
    css`
      background: transparent;
      border: 1px solid ${p.theme.colors.border};
      color: ${p.theme.colors.text};
    `}

  ${(p) =>
    p.variant === 'destructive' &&
    css`
      background: ${p.theme.colors.destructive};
      color: #fff;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    opacity: 0.9;
  }

  &:not(:disabled):active {
    transform: translateY(1px);
  }
`;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      icon,
      iconPosition = 'left',
      variant = 'primary',
      size = 'md',
      loading = false,
      ...rest
    },
    ref
  ) => {
    return (
      <Root
        ref={ref}
        variant={variant}
        size={size}
        disabled={rest.disabled || loading}
        {...rest}
      >
        {icon && iconPosition === 'left' && icon}
        {loading ? 'Загрузка...' : children}
        {icon && iconPosition === 'right' && icon}
      </Root>
    );
  }
);

Button.displayName = 'Button';

export default Button;