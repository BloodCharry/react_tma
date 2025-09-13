import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Skeleton, SkeletonProps } from './Skeleton';

export default {
  title: 'UI/Skeleton',
  component: Skeleton,
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
      options: ['rect', 'circle', 'text'],
    },
    width: {
      control: { type: 'text' },
    },
    height: {
      control: { type: 'text' },
    },
  },
} as Meta<typeof Skeleton>;

const Template: StoryFn<typeof Skeleton> = (args: SkeletonProps) => <Skeleton {...args} />;

export const Rectangle = Template.bind({});
Rectangle.args = {
  width: 200,
  height: 100,
};

export const Circle = Template.bind({});
Circle.args = {
  variant: 'circle',
  width: 50,
  height: 50,
};

export const Text = Template.bind({});
Text.args = {
  variant: 'text',
  width: 150,
  height: 20,
};

export const CustomBorderRadius = Template.bind({});
CustomBorderRadius.args = {
  width: 200,
  height: 50,
  borderRadius: '20px',
};

export const ListSkeleton = () => (
  <div style={{ width: 300 }}>
    <Skeleton variant="circle" width={40} height={40} />
    <Skeleton variant="text" width="60%" height={20} style={{ marginTop: 8 }} />
    <Skeleton variant="text" width="80%" height={16} style={{ marginTop: 4 }} />

    <div style={{ marginTop: 16 }}>
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton variant="text" width="70%" height={20} style={{ marginTop: 8 }} />
      <Skeleton variant="text" width="90%" height={16} style={{ marginTop: 4 }} />
    </div>

    <div style={{ marginTop: 16 }}>
      <Skeleton variant="circle" width={40} height={40} />
      <Skeleton variant="text" width="50%" height={20} style={{ marginTop: 8 }} />
      <Skeleton variant="text" width="70%" height={16} style={{ marginTop: 4 }} />
    </div>
  </div>
);