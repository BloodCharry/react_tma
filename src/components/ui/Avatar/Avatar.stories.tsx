import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Avatar, AvatarProps } from './Avatar';

export default {
  title: 'UI/Avatar',
  component: Avatar,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'range', min: 24, max: 128, step: 8 },
    },
    status: {
      control: { type: 'radio' },
      options: [null, 'online', 'offline'],
    },
  },
} as Meta<typeof Avatar>;

const Template: StoryFn<typeof Avatar> = (args: AvatarProps) => <Avatar {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 48,
};

export const WithImage = Template.bind({});
WithImage.args = {
  src: 'https://via.placeholder.com/48',
  alt: 'Иван Иванов',
  size: 48,
};

export const WithFallback = Template.bind({});
WithFallback.args = {
  fallback: 'ИИ',
  size: 48,
};

export const WithOnlineStatus = Template.bind({});
WithOnlineStatus.args = {
  src: 'https://via.placeholder.com/48',
  alt: 'Мария Петрова',
  size: 48,
  status: 'online',
};

export const WithOfflineStatus = Template.bind({});
WithOfflineStatus.args = {
  src: 'https://via.placeholder.com/48',
  alt: 'Алексей Сидоров',
  size: 48,
  status: 'offline',
};

export const DifferentSizes = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
    <Avatar src="https://via.placeholder.com/24" size={24} />
    <Avatar src="https://via.placeholder.com/32" size={32} />
    <Avatar src="https://via.placeholder.com/48" size={48} />
    <Avatar src="https://via.placeholder.com/64" size={64} />
    <Avatar src="https://via.placeholder.com/96" size={96} />
  </div>
);