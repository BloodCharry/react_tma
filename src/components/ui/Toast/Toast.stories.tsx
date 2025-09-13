import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { ToastProvider } from './ToastProvider';
import { useToast } from '../../../hooks/useToast';
import Button from '../Button/Button';

export default {
  title: 'UI/Toast',
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <Story />
        </ToastProvider>
      </ThemeProvider>
    ),
  ],
} as Meta;

// Компонент для демонстрации работы тостов
const ToastDemo: React.FC = () => {
  const { pushToast } = useToast();

  const showSuccessToast = () => {
    pushToast({
      type: 'success',
      message: 'Операция выполнена успешно!',
    });
  };

  const showErrorToast = () => {
    pushToast({
      type: 'error',
      message: 'Произошла ошибка. Попробуйте еще раз.',
    });
  };

  const showInfoToast = () => {
    pushToast({
      type: 'info',
      message: 'Это информационное сообщение.',
    });
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Button onClick={showSuccessToast}>Показать Success Toast</Button>
      <Button onClick={showErrorToast}>Показать Error Toast</Button>
      <Button onClick={showInfoToast}>Показать Info Toast</Button>
    </div>
  );
};

const Template: StoryFn = () => <ToastDemo />;

export const Default = Template.bind({});