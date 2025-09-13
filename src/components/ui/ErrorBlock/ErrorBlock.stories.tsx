import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { ErrorBlock, ErrorBlockProps } from './ErrorBlock';

export default {
  title: 'UI/ErrorBlock',
  component: ErrorBlock,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof ErrorBlock>;

const Template: StoryFn<typeof ErrorBlock> = (args: ErrorBlockProps) => <ErrorBlock {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Что-то пошло не так',
  description: 'Произошла ошибка при загрузке данных',
};

export const CustomMessage = Template.bind({});
CustomMessage.args = {
  title: 'Сервер недоступен',
  description: 'Проверьте подключение к интернету и попробуйте позже',
};

export const WithRetry = Template.bind({});
WithRetry.args = {
  title: 'Ошибка загрузки',
  description: 'Не удалось загрузить данные',
  retryText: 'Повторить попытку',
  onRetry: () => console.log('Повторная попытка'),
};

export const AllProps = Template.bind({});
AllProps.args = {
  title: 'Критическая ошибка',
  description: 'Произошла непредвиденная ошибка в приложении',
  retryText: 'Перезагрузить',
  onRetry: () => console.log('Перезагрузка'),
};