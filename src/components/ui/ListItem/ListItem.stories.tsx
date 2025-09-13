import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { ListItem, ListItemProps } from './ListItem';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

export default {
  title: 'UI/ListItem',
  component: ListItem,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof ListItem>;

const Template: StoryFn<typeof ListItem> = (args: ListItemProps) => <ListItem {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Иван Иванов',
  subtitle: 'Инженер',
};

export const WithAvatar = Template.bind({});
WithAvatar.args = {
  avatar: 'https://via.placeholder.com/48',
  title: 'Мария Петрова',
  subtitle: 'Дизайнер',
};

export const WithBadge = Template.bind({});
WithBadge.args = {
  title: 'Алексей Сидоров',
  subtitle: 'Менеджер',
  badge: 5,
};

export const WithRightActions = Template.bind({});
WithRightActions.args = {
  title: 'Сергей Кузнецов',
  subtitle: 'Разработчик',
  right: (
    <Button variant="outline" size="sm">
      <Icon name="edit" />
    </Button>
  ),
};

export const Selectable = Template.bind({});
Selectable.args = {
  title: 'Выбираемый элемент',
  subtitle: 'Кликните для выбора',
  selectable: true,
  onClick: () => console.log('Выбрано'),
};

export const Selected = Template.bind({});
Selected.args = {
  title: 'Выбранный элемент',
  subtitle: 'Этот элемент выбран',
  selectable: true,
  selected: true,
};