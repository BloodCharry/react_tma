import React from 'react';
import {
  FiSearch,
  FiPlus,
  FiChevronLeft,
  FiEdit2,
  FiPhone,
  FiTrash2,
  FiUser,
  FiTool,
  FiPackage,
  FiList,
  FiSettings
} from 'react-icons/fi';

import ToolsIcon from '../../../assets/icons/tools.svg?react';
import OrdersIcon from '../../../assets/icons/orders.svg?react';
import UsersIcon from '../../../assets/icons/users.svg?react';
import WarehouseIcon from '../../../assets/icons/warehouse.svg?react';

// 1. Типы для имён иконок
export type IconName =
  | 'search'
  | 'plus'
  | 'back'
  | 'edit'
  | 'phone'
  | 'trash'
  | 'user'
  | 'tool'
  | 'package'
  | 'list'
  | 'settings'
  | 'tools'
  | 'orders'
  | 'users'
  | 'warehouse';

// 2. Общий тип для всех иконок (react-icons + svg)
type IconComponent = React.FC<{
  size?: number;
  color?: string;
  'aria-hidden'?: boolean;
  'aria-label'?: string;
}>;

// 3. Карта иконок с точной типизацией
const map: Record<IconName, IconComponent> = {
  search: FiSearch,
  plus: FiPlus,
  back: FiChevronLeft,
  edit: FiEdit2,
  phone: FiPhone,
  trash: FiTrash2,
  user: FiUser,
  tool: FiTool,
  package: FiPackage,
  list: FiList,
  settings: FiSettings,
  tools: ToolsIcon,
  orders: OrdersIcon,
  users: UsersIcon,
  warehouse: WarehouseIcon,
};

// 4. Пропсы компонента Icon
export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  ariaLabel?: string;
}

// 5. Компонент Icon
export const Icon: React.FC<IconProps> = ({
  name,
  size = 18,
  color,
  ariaLabel
}) => {
  const C = map[name];
  return (
    <C
      size={size}
      color={color}
      aria-hidden={ariaLabel ? undefined : true}
      aria-label={ariaLabel}
    />
  );
};

export default Icon;
