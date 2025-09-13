import React from 'react';
import styled, { css } from 'styled-components';

type Variant = 'primary' | 'secondary' | 'outline' | 'destructive';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: Variant;
  icon?: React.ReactNode;
}

const variantStyles = {
  primary: css`
    background: ${({theme}) => theme.colors.primary};
    color: #fff;
    border: none;
  `,
  secondary: css`
    background: #fff;
    color: ${({theme}) => theme.colors.primary};
    border: 1px solid ${({theme}) => theme.colors.primary};
  `,
  outline: css`
    background: transparent;
    color: ${({theme}) => theme.colors.primary};
    border: 1px solid ${({theme}) => theme.colors.neutral};
  `,
  destructive: css`
    background: ${({theme}) => theme.colors.destructive};
    color: #fff;
    border: none;
  `
};

const Root = styled.button<{variant: Variant}>`
  display:inline-flex;
  align-items:center;
  gap:8px;
  padding:10px 16px;
  font-weight:600;
  font-size: ${({theme}) => theme.fontSizes.body};
  border-radius: ${({theme}) => theme.radii.md};
  cursor:pointer;
  transition: opacity .12s ease;
  &:active{ transform: translateY(1px); }
  &:disabled{ opacity:.5; cursor:not-allowed; }
  ${({variant}) => variantStyles[variant]}
`;

export const Button: React.FC<Props> = ({children, variant='primary', icon, ...rest}) => {
  return (
    <Root variant={variant} {...rest}>
      {icon && <span aria-hidden>{icon}</span>}
      <span>{children}</span>
    </Root>
  );
};

export default Button;
