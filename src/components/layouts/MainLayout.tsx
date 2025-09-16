// components/layouts/MainLayout.tsx
import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import Icon from '../ui/Icon/Icon';
import { routesByRole } from '../../app/routes';
import type { Role, TabKey, IconName } from '../../types/types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
`;

const TabBar = styled.nav`
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
`;

const TabItem = styled(NavLink)`
  flex: 1;
  padding: 8px 0;
  text-align: center;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textSecondary};

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

type TabDef = { to: `/${TabKey}`; icon: IconName; label: string };

const tabsConfig: Record<TabKey, TabDef> = {
  tools: { to: '/tools', icon: 'tools', label: 'Инструменты' },
  orders: { to: '/orders', icon: 'orders', label: 'Заказы' },
  employees: { to: '/employees', icon: 'users', label: 'Сотрудники' },
  warehouses: { to: '/warehouses', icon: 'warehouse', label: 'Склад' },
  users: { to: '/users', icon: 'user', label: 'Пользователи' },
};

export default function MainLayout({ role }: { role: Role }) {
  const allowedRoutes = routesByRole[role]; // тип: `/${TabKey}`[]

  return (
    <Wrapper>
      <Content>
        <Outlet />
      </Content>
      <TabBar>
        {allowedRoutes.map((path) => {
          const key = path.slice(1) as TabKey; // '/tools' -> 'tools'
          const tab = tabsConfig[key];

          return (
            <TabItem key={tab.to} to={tab.to}>
              <Icon name={tab.icon} />
              <div>{tab.label}</div>
            </TabItem>
          );
        })}
      </TabBar>
    </Wrapper>
  );
}
