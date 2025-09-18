import React, { useState, useEffect } from 'react';

type RoleName = 'employee' | 'manager' | 'warehouse' | 'contractor';

const ROLE_KEY = 'mock_active_role';
const STATE_KEY_PREFIX = 'mock_state_';
const ROLES: RoleName[] = ['employee', 'manager', 'warehouse', 'contractor'];

export const RoleSwitcher: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<RoleName>('manager');

  useEffect(() => {
    const saved = localStorage.getItem(ROLE_KEY) as RoleName | null;
    if (saved && ROLES.includes(saved)) {
      setCurrentRole(saved);
    }
  }, []);

  const handleChangeRole = (role: RoleName) => {
    localStorage.setItem(ROLE_KEY, role);
    setCurrentRole(role);
    // Перезагружаем страницу, чтобы мок отдал новые данные
    location.reload();
  };

  const handleResetState = (role: RoleName) => {
    localStorage.removeItem(STATE_KEY_PREFIX + role);
    if (role === currentRole) {
      location.reload();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 10,
        right: 10,
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: 6,
        padding: '8px 12px',
        fontSize: 14,
        zIndex: 9999,
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{ marginBottom: 6, fontWeight: 'bold' }}>Role Switcher (dev)</div>
      {ROLES.map((role) => (
        <div key={role} style={{ marginBottom: 4 }}>
          <button
            onClick={() => handleChangeRole(role)}
            style={{
              background: role === currentRole ? '#007bff' : '#f0f0f0',
              color: role === currentRole ? '#fff' : '#000',
              border: 'none',
              padding: '4px 8px',
              borderRadius: 4,
              cursor: 'pointer',
              marginRight: 6,
            }}
          >
            {role}
          </button>
          <button
            onClick={() => handleResetState(role)}
            style={{
              background: '#dc3545',
              color: '#fff',
              border: 'none',
              padding: '4px 6px',
              borderRadius: 4,
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      ))}
    </div>
  );
};
