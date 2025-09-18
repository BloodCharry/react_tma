import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { tabsByRole, TabItem } from './config';
import { Icon } from '../../ui/Icon/Icon';
import type { Role } from '../../../types/types';

const Bar = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: ${({ theme }) => theme.colors.bg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 1000;
`;

const TabButton = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-decoration: none;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const BottomTabBar: React.FC = () => {
  const { role } = useAuth();
  const location = useLocation();

  if (!role) return null;

  // Проверяем, что role — это действительно Role
  if (!Object.keys(tabsByRole).includes(role)) {
    return null;
  }

  const tabs = tabsByRole[role as Role];

  return (
    <Bar>
      {tabs.map((tab: TabItem) => (
        <TabButton
          key={tab.path}
          to={tab.path}
          className={({ isActive }) => (isActive ? 'active' : '')}
        >
          <Icon
            name={tab.icon}
            size={22}
            color={
              location.pathname.startsWith(tab.path)
                ? '#007bff'
                : undefined
            }
          />
          {tab.label}
        </TabButton>
      ))}
    </Bar>
  );
};
