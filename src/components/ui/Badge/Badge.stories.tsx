import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Badge, BadgeProps } from './Badge';

export default {
  title: 'UI/Badge',
  component: Badge,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['success', 'destructive', 'neutral'],
    },
  },
} as Meta<typeof Badge>;

const Template: StoryFn<typeof Badge> = (args: BadgeProps) => <Badge {...args} />;

export const Neutral = Template.bind({});
Neutral.args = {
  variant: 'neutral',
  children: 'Нейтральный',
};

export const Success = Template.bind({});
Success.args = {
  variant: 'success',
  children: 'Успех',
};

export const Destructive = Template.bind({});
Destructive.args = {
  variant: 'destructive',
  children: 'Ошибка',
};

export const WithCount = Template.bind({});
WithCount.args = {
  variant: 'destructive',
  count: 5,
};

export const AllVariants = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Badge variant="neutral">Нейтральный</Badge>
    <Badge variant="success">Успех</Badge>
    <Badge variant="destructive">Ошибка</Badge>
    <Badge variant="neutral" count={1} />
    <Badge variant="success" count={10} />
    <Badge variant="destructive" count={99} />
  </div>
);