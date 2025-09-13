import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Spinner, SpinnerProps } from './Spinner';

export default {
  title: 'UI/Spinner',
  component: Spinner,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 64, step: 8 },
    },
    color: {
      control: 'color',
    },
  },
} as Meta<typeof Spinner>;

const Template: StoryFn<typeof Spinner> = (args: SpinnerProps) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 24,
  color: '#007AFF',
};

export const Large = Template.bind({});
Large.args = {
  size: 48,
  color: '#007AFF',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  size: 32,
  color: '#FF3B30',
};

export const DifferentSizes = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <Spinner size={16} color="#007AFF" />
    <Spinner size={24} color="#007AFF" />
    <Spinner size={32} color="#007AFF" />
    <Spinner size={48} color="#007AFF" />
  </div>
);

export const DifferentColors = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
    <Spinner size={32} color="#007AFF" />
    <Spinner size={32} color="#34C759" />
    <Spinner size={32} color="#FF3B30" />
    <Spinner size={32} color="#FF9500" />
  </div>
);