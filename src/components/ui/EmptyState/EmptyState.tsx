import styled from 'styled-components';
import Button from '../Button/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
`;

const IconWrapper = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.neutral};
`;

const Title = styled.h3`
  margin: 0 0 8px 0;
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin: 0 0 16px 0;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 15px;
`;

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
}) => {
  return (
    <Wrapper>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Wrapper>
  );
};

export default EmptyState;