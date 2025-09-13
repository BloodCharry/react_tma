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
  color: ${({ theme }) => theme.colors.destructive};
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

export interface ErrorBlockProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  retryText?: string;
}

export const ErrorBlock: React.FC<ErrorBlockProps> = ({
  title = 'Что-то пошло не так',
  description = 'Произошла ошибка при загрузке данных',
  onRetry,
  retryText = 'Попробовать снова',
}) => {
  return (
    <Wrapper>
      <IconWrapper>⚠️</IconWrapper>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          {retryText}
        </Button>
      )}
    </Wrapper>
  );
};

export default ErrorBlock;