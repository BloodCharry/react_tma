import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import App from './app/App';

// Создаём экземпляр QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Функция старта приложения
const startApp = () => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <GlobalStyle />
          <App />
          {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

// Если dev-режим — подключаем MSW перед рендером
if (import.meta.env.DEV) {
  import('./mocks/browser')
    .then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' }))
    .then(startApp)
    .catch((err) => {
      console.error('⚠️ Failed to start MSW worker:', err);
      startApp();
    })
    .catch((error) => {
      console.error('⚠️ Failed to start MSW worker:', error);
      startApp(); // даже если воркер не стартовал — рендерим
    });
} else {
  startApp();
}
