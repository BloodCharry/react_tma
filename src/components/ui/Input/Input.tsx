import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div<{ hasError?: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.bg};
  border-radius: 8px;
  padding: 8px;
  border: 1px solid
    ${({ hasError, theme }) =>
      hasError ? theme.colors.destructive : theme.colors.border};
  transition: border-color 0.2s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const StyledInput = styled.input`
  border: 0;
  outline: none;
  flex: 1;
  font-size: ${({ theme }) => theme.fontSizes.body};
  background: transparent;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

const ErrorMessage = styled.div`
  color: ${({ theme }) => theme.colors.destructive};
  font-size: 12px;
  margin-top: 4px;
`;

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ iconLeft, iconRight, error, ...rest }, ref) => (
    <div>
      <InputWrapper hasError={!!error}>
        {iconLeft && <span style={{ marginRight: '8px' }}>{iconLeft}</span>}
        <StyledInput ref={ref} aria-invalid={!!error} {...rest} />
        {iconRight && <span style={{ marginLeft: '8px' }}>{iconRight}</span>}
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  )
);

Input.displayName = 'Input';

export default Input;