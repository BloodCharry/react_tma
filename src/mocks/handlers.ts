import { http, HttpResponse } from 'msw';

const API_URL = '/auth/auth_with_webapp';

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: 'bearer';
  expires_in_access_token: number;
  expires_in_refresh_token: number;
  active_role: {
    id: string;
    name: string;
  };
  need_role_selection: boolean;
  roles: { id: string; name: string }[];
  active_company: {
    id: string;
    name: string;
  };
  companies: { id: string; name: string }[];
  need_company_selection: boolean;
}

type RoleName = 'employee' | 'manager' | 'warehouse' | 'contractor';
const ROLES: RoleName[] = ['employee', 'manager', 'warehouse', 'contractor'];

const ROLE_KEY = 'mock_active_role';
const STATE_KEY_PREFIX = 'mock_state_';

// Генератор ответа под конкретную роль
const makeAuthResponse = (
  roleName: RoleName,
  expiresInAccess: number,
  expiresInRefresh: number
): AuthResponse => ({
  access_token: `mock-token-${roleName}-${Date.now()}`, // timestamp для наглядности
  refresh_token: `mock-refresh-${roleName}-${Date.now()}`,
  token_type: 'bearer',
  expires_in_access_token: expiresInAccess,
  expires_in_refresh_token: expiresInRefresh,
  active_role: {
    id: `${roleName}-id`,
    name: roleName,
  },
  need_role_selection: false,
  roles: ROLES.map(r => ({ id: `${r}-id`, name: r })),
  active_company: {
    id: 'company-1',
    name: 'Mock Company',
  },
  companies: [
    {
      id: 'company-1',
      name: 'Mock Company',
    },
  ],
  need_company_selection: false,
});

// Получаем текущую роль
function getCurrentRole(): RoleName {
  const saved = localStorage.getItem(ROLE_KEY) as RoleName | null;
  return saved && ROLES.includes(saved) ? saved : 'manager';
}

// Сохраняем текущую роль
function setCurrentRole(role: RoleName) {
  localStorage.setItem(ROLE_KEY, role);
}

// Получаем сохранённое состояние пользователя для роли
function getRoleState(role: RoleName): AuthResponse | null {
  const saved = localStorage.getItem(STATE_KEY_PREFIX + role);
  return saved ? (JSON.parse(saved) as AuthResponse) : null;
}

// Сохраняем состояние пользователя для роли
function setRoleState(role: RoleName, state: AuthResponse) {
  localStorage.setItem(STATE_KEY_PREFIX + role, JSON.stringify(state));
}

export const handlers = [
  // Первичная авторизация — токен живёт 5 секунд
  http.post(API_URL, async ({ request }) => {
    const url = new URL(request.url, window.location.origin);
    const roleParam = url.searchParams.get('role') as RoleName | null;
    let role = getCurrentRole();

    if (roleParam && ROLES.includes(roleParam)) {
      role = roleParam;
      setCurrentRole(role);
    }

    let state = getRoleState(role);

    // Если нет сохранённого состояния — создаём с коротким сроком жизни
    if (!state) {
      state = makeAuthResponse(role, 5, 86400); // access_token 5 сек, refresh_token сутки
      setRoleState(role, state);
    }

    console.log('Mock /auth_with_webapp issued token:', state.access_token);

    return HttpResponse.json(state, { status: 200 });
  }),

  // Обновление токена — токен живёт 1 час
  http.post('/auth/refresh_token', async ({ request }) => {
    const body = await request.json();
    console.log('Mock /refresh_token called with', body);

    const role = getCurrentRole();
    const state = makeAuthResponse(role, 3600, 86400); // access_token 1 час, refresh_token сутки
    setRoleState(role, state);

    console.log('Mock /refresh_token issued new token:', state.access_token);

    return HttpResponse.json(state, { status: 200 });
  }),
];
