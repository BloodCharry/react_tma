import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Icon, IconProps } from './Icon';

export default {
  title: 'UI/Icon',
  component: Icon,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ['search', 'plus', 'back', 'edit', 'phone', 'trash', 'user', 'tool', 'package', 'list', 'settings'],
    },
    size: {
      control: { type: 'range', min: 12, max: 48, step: 4 },
    },
  },
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args: IconProps) => <Icon {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: 'tool',
  size: 24,
};

export const AllIcons = () => (
  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
    <Icon name="search" size={24} />
    <Icon name="plus" size={24} />
    <Icon name="back" size={24} />
    <Icon name="edit" size={24} />
    <Icon name="phone" size={24} />
    <Icon name="trash" size={24} />
    <Icon name="user" size={24} />
    <Icon name="tool" size={24} />
    <Icon name="package" size={24} />
    <Icon name="list" size={24} />
    <Icon name="settings" size={24} />
  </div>
);

export const DifferentSizes = () => (
  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px' }}>
    <Icon name="tool" size={16} />
    <Icon name="tool" size={24} />
    <Icon name="tool" size={32} />
    <Icon name="tool" size={48} />
  </div>
);

export const WithColor = Template.bind({});
WithColor.args = {
  name: 'tool',
  size: 24,
  color: '#FF3B30',
};