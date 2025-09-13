import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
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
      options: ['primary', 'secondary', 'outline', 'destructive'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Сохранить',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Отмена',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    children: 'Подробнее',
  },
};

export const Destructive: Story = {
  args: {
    variant: 'destructive',
    children: 'Удалить',
  },
};