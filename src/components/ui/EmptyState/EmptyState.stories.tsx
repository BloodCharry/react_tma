import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { EmptyState, EmptyStateProps } from './EmptyState';
import Icon from '../Icon/Icon';

export default {
  title: 'UI/EmptyState',
  component: EmptyState,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof EmptyState>;

const Template: StoryFn<typeof EmptyState> = (args: EmptyStateProps) => <EmptyState {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Нет данных',
  description: 'Здесь пока ничего нет',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon: <Icon name="package" size={48} />,
  title: 'Пусто',
  description: 'Начните добавлять элементы',
};

export const WithAction = Template.bind({});
WithAction.args = {
  title: 'Нет результатов',
  description: 'Попробуйте изменить параметры поиска',
  actionText: 'Сбросить фильтры',
  onAction: () => console.log('Сбросить фильтры'),
};

export const AllProps = Template.bind({});
AllProps.args = {
  icon: <Icon name="tool" size={48} />,
  title: 'Инструменты не найдены',
  description: 'Добавьте первый инструмент в каталог',
  actionText: 'Добавить инструмент',
  onAction: () => console.log('Добавить инструмент'),
};