import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
`;

const SkeletonWrapper = styled.div<{
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  variant?: 'circle' | 'rect' | 'text';
}>`
  background-color: ${({ theme }) => theme.colors.lightBg};
  border-radius: ${({ borderRadius, variant }) =>
    borderRadius || (variant === 'circle' ? '50%' : '4px')};
  width: ${({ width }) =>
    typeof width === 'number' ? `${width}px` : width || '100%'};
  height: ${({ height }) =>
    typeof height === 'number' ? `${height}px` : height || '16px'};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  variant?: 'circle' | 'rect' | 'text';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  variant = 'rect',
  ...rest
}) => {
  return (
    <SkeletonWrapper
      width={width}
      height={height}
      borderRadius={borderRadius}
      variant={variant}
      {...rest} // сюда попадёт style, className и т.д.
    />
  );
};

export default Skeleton;
