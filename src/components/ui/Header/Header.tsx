import styled from 'styled-components';
import Icon from '../Icon/Icon';

const Root = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Title = styled.h1`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.title};
  font-weight: 600;
`;

export interface HeaderProps {
  title: string;
  subtitle?: string;
  back?: boolean;
  onBack?: () => void;
  actions?: React.ReactNode;
  centerTitle?: boolean;
  showBotLabel?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  back,
  onBack,
  actions,
  centerTitle = false,
  showBotLabel = false,
}) => (
  <Root role="banner">
    <Left>
      {back && (
        <button onClick={onBack} aria-label="Назад">
          <Icon name="back" />
        </button>
      )}
      <div style={{ textAlign: centerTitle ? 'center' : 'left', flex: 1 }}>
        <Title>{title}</Title>
        {subtitle && (
          <div style={{ fontSize: '13px', color: '#6E6E73' }}>{subtitle}</div>
        )}
        {showBotLabel && (
          <div style={{ fontSize: '11px', color: '#8E8E93' }}>TMA bot</div>
        )}
      </div>
    </Left>
    <div>{actions}</div>
  </Root>
);

export default Header;