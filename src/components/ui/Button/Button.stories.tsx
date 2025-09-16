import type { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Button, ButtonProps, ButtonVariant, ButtonSize } from './Button';
import Icon from '../Icon/Icon';

export default {
  title: 'UI/Button',
  component: Button,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline', 'destructive'] satisfies ButtonVariant[],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'] satisfies ButtonSize[],
    },
    iconPosition: {
      control: { type: 'radio' },
      options: ['left', 'right'],
    },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args: ButtonProps) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Сохранить',
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Отмена',
  variant: 'secondary',
};

export const Outline = Template.bind({});
Outline.args = {
  children: 'Подробнее',
  variant: 'outline',
};

export const Destructive = Template.bind({});
Destructive.args = {
  children: 'Удалить',
  variant: 'destructive',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  children: 'Добавить',
  variant: 'primary',
  icon: <Icon name="plus" />,
  iconPosition: 'left',
};

export const Loading = Template.bind({});
Loading.args = {
  children: 'Загрузка',
  variant: 'primary',
  loading: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Недоступно',
  variant: 'primary',
  disabled: true,
};

export const AllSizes = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Button size="sm">Маленькая</Button>
    <Button size="md">Средняя</Button>
    <Button size="lg">Большая</Button>
  </div>
);
