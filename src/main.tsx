import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import App from './app/App';


// Создаем экземпляр QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Отключить автоматическое обновление при фокусе окна
      retry: 1, // Количество попыток повтора запроса при ошибке
    },
  },
});

// Инициализация MSW для разработки
// if (import.meta.env.DEV) {
//   import('./mocks/browser').then(({ worker }) => {
//     worker.start({ onUnhandledRequest: 'bypass' }); // Запуск MSW воркера
//   }).catch((error) => {
//     console.error('Failed to start MSW worker:', error);
//   });
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <App />
        {/* панель инструментов React Query для разработки */}
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
);