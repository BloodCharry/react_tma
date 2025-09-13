import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon, {type IconProps} from '../ui/Icon/Icon';
import Badge from '../ui/Badge/Badge';

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: env(safe-area-inset-bottom);
  z-index: 100;
`;

const NavItem = styled.button<{ active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  background: none;
  border: none;
  color: ${({ active, theme }) => (active ? theme.colors.primary : theme.colors.textSecondary)};
  font-size: 12px;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 50%;
  transform: translateX(50%);
`;

interface Tab {
  path: string;
  label: string;
  icon: IconProps['name'];
  badge?: number;
}

const tabs: Tab[] = [
  { path: '/', label: 'Инструменты', icon: 'tool' },
  { path: '/warehouse', label: 'Склад', icon: 'package' },
  { path: '/orders', label: 'Заказы', icon: 'list' },
  { path: '/settings', label: 'Настройки', icon: 'settings' },
];

export const BottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Nav>
      {tabs.map((tab) => (
        <NavItem
          key={tab.path}
          active={location.pathname === tab.path}
          onClick={() => navigate(tab.path)}
        >
          <div style={{ position: 'relative' }}>
            <Icon name={tab.icon} size={24} />
            {tab.badge && tab.badge > 0 && (
              <BadgeWrapper>
                <Badge variant="destructive" count={tab.badge} />
              </BadgeWrapper>
            )}
          </div>
          <span>{tab.label}</span>
        </NavItem>
      ))}
    </Nav>
  );
};

export default BottomNav;