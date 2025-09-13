import styled from 'styled-components';

type Variant = 'success' | 'destructive' | 'neutral' | 'warning';

const BadgeWrapper = styled.span<{ variant: Variant }>`
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  min-width: 20px;
  background-color: ${({ variant, theme }) => {
    switch (variant) {
      case 'success':
        return theme.colors.success;
      case 'destructive':
        return theme.colors.destructive;
      case 'warning':
        return theme.colors.warning ?? theme.colors.accent;
      default:
        return theme.colors.neutral;
    }
  }};
  color: white;
`;

export interface BadgeProps {
  variant?: Variant;
  count?: number | string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', count, children }) => {
  return <BadgeWrapper variant={variant}>{count ?? children}</BadgeWrapper>;
};

export default Badge;
