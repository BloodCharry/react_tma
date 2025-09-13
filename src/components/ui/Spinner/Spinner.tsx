import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div<{ size: number }>`
  display: inline-block;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const SpinnerCircle = styled.div<{ size: number; color: string }>`
  width: 100%;
  height: 100%;
  border: 2px solid transparent;
  border-top-color: ${({ color }) => color};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export interface SpinnerProps {
  size?: number;
  color?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 24,
  color = '#007AFF',
}) => {
  return (
    <SpinnerWrapper size={size}>
      <SpinnerCircle size={size} color={color} />
    </SpinnerWrapper>
  );
};

export default Spinner;