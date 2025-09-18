import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { createAppRouter } from './routes';
import { AuthProvider } from './AuthProvider';
import { useAuth } from '../hooks/useAuth';
import { useAuthInit } from './useAuthInit';
import type { Role } from '../types/types';
import { RoleSwitcher } from '../components/dev/RoleSwitcher';

function AppContent() {
  const { role } = useAuth();
  const { loading, error, ErrorComponent } = useAuthInit();

  if (loading) return <div>Загрузка...</div>;
  if (error) return ErrorComponent;
  if (!role) return <div>Нет роли</div>;

  return <RouterProvider router={createAppRouter(role as Role)} />;
}

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </ThemeProvider>

      {import.meta.env.DEV && <RoleSwitcher />}
    </>
  );
}
