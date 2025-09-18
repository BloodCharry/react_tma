import { IconName } from '../../ui/Icon/Icon';
import type { Role } from '../../../types/types';

export interface TabItem {
  label: string;
  icon: IconName;
  path: string;
}

export const tabsByRole: Record<Role, TabItem[]> = {
  manager: [
    { label: 'Инструменты', icon: 'tools', path: '/tools' },
    { label: 'Заявки', icon: 'orders', path: '/requests' },
    { label: 'Склад', icon: 'warehouse', path: '/warehouse' },
    { label: 'Профиль', icon: 'user', path: '/profile' },
  ],
  employee: [
    { label: 'Инструменты', icon: 'tools', path: '/tools' },
    { label: 'Заявки', icon: 'orders', path: '/requests' },
    { label: 'Профиль', icon: 'user', path: '/profile' },
  ],
  warehouse: [
    { label: 'Склад', icon: 'warehouse', path: '/warehouse' },
    { label: 'Инструменты', icon: 'tools', path: '/tools' },
    { label: 'Профиль', icon: 'user', path: '/profile' },
  ],
  contractor: [
    { label: 'Инструменты', icon: 'tools', path: '/tools' },
    { label: 'Профиль', icon: 'user', path: '/profile' },
  ],
};
