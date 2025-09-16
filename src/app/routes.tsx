// app/routes.tsx
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import MainLayout from '../components/layouts/MainLayout';
import ToolsPage from '../pages/Tools/ToolsPage';
import OrdersPage from '../pages/Orders/OrdersPage';
import EmployeesPage from '../pages/Employees/EmployeesPage';
import WarehousesPage from '../pages/Warehouse/WarehousePage';
import UsersPage from '../pages/Users/UsersPage';
import CompanySelectPage from '../pages/CompanySelect/CompanySelectPage';
import type { Role, TabKey } from '../types/types';

export const routesByRole: Record<Role, `/${TabKey}`[]> = {
  employee: ['/tools', '/orders'],
  manager: ['/tools', '/orders', '/employees', '/warehouses', '/users'],
  warehouse: ['/tools', '/orders', '/warehouses'],
  contractor: ['/tools', '/orders'],
};

export function createAppRouter(role: Role) {
  const allowed = routesByRole[role];

  const children: RouteObject[] = [];

  if (allowed.includes('/tools')) {
    children.push({ path: 'tools', element: <ToolsPage /> });
  }
  if (allowed.includes('/orders')) {
    children.push({ path: 'orders', element: <OrdersPage /> });
  }
  if (allowed.includes('/employees')) {
    children.push({ path: 'employees', element: <EmployeesPage /> });
  }
  if (allowed.includes('/warehouses')) {
    children.push({ path: 'warehouses', element: <WarehousesPage /> });
  }
  if (allowed.includes('/users')) {
    children.push({ path: 'users', element: <UsersPage /> });
  }

  // редирект на первый доступный маршрут или на корень
  children.push({ path: '*', element: <Navigate to={allowed[0] ?? '/'} replace /> });

  return createBrowserRouter([
    { path: '/', element: <CompanySelectPage /> },
    {
      path: '/',
      element: <MainLayout role={role} />,
      children,
    },
  ]);
}
