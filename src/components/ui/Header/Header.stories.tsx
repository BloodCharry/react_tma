import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Header, HeaderProps } from './Header';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

export default {
  title: 'UI/Header',
  component: Header,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args: HeaderProps) => <Header {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок страницы',
};

export const WithBackButton = Template.bind({});
WithBackButton.args = {
  title: 'Детали',
  back: true,
  onBack: () => console.log('Назад'),
};

export const WithActions = Template.bind({});
WithActions.args = {
  title: 'Профиль',
  actions: (
    <Button variant="outline" size="sm">
      <Icon name="edit" />
    </Button>
  ),
};

export const WithSubtitle = Template.bind({});
WithSubtitle.args = {
  title: 'Настройки',
  subtitle: 'Управление аккаунтом',
};

export const CenteredTitle = Template.bind({});
CenteredTitle.args = {
  title: 'TMA Bot',
  centerTitle: true,
  showBotLabel: true,
  actions: (
    <Button variant="outline" size="sm">
      <Icon name="settings" />
    </Button>
  ),
};