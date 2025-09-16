import styled, { css } from 'styled-components';
import type { DefaultTheme } from 'styled-components';
import React from "react";

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

const sizeStyles: Record<ButtonSize, ReturnType<typeof css>> = {
  sm: css`
    min-height: 32px;
    padding: 0 12px;
    font-size: 14px;
  `,
  md: css`
    min-height: 40px;
    padding: 0 16px;
    font-size: 15px;
  `,
  lg: css`
    min-height: 48px;
    padding: 0 20px;
    font-size: 16px;
  `,
};

const variantStyles = (variant: ButtonVariant, theme: DefaultTheme) => {
  switch (variant) {
    case 'primary':
      return css`
        background: ${theme.colors.primary};
        color: #fff;
        &:hover:not(:disabled) {
          background: ${theme.colors.primaryHover};
        }
        &:active:not(:disabled) {
          background: ${theme.colors.primaryActive};
        }
      `;
    case 'secondary':
      return css`
        background: ${theme.colors.bg};
        color: ${theme.colors.primary};
        border-color: ${theme.colors.primary};
        &:hover:not(:disabled) {
          background: rgba(0, 122, 255, 0.08);
        }
      `;
    case 'outline':
      return css`
        background: transparent;
        border-color: ${theme.colors.border};
        color: ${theme.colors.text};
        &:hover:not(:disabled) {
          background: ${theme.colors.lightBg};
        }
      `;
    case 'destructive':
      return css`
        background: ${theme.colors.destructive};
        color: #fff;
        &:hover:not(:disabled) {
          background: ${theme.colors.destructiveHover};
        }
      `;
  }
};

const Root = styled.button<{ variant: ButtonVariant; size: ButtonSize; loading?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: 600;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease, color 0.2s ease;
  ${({ size }) => sizeStyles[size]};

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }

  ${({ variant, theme }) => variantStyles(variant, theme)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.focus};
    outline-offset: 2px;
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
