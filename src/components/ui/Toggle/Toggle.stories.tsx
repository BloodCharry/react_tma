import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Toggle, ToggleProps } from './Toggle';
import {useState} from "react";

export default {
  title: 'UI/Toggle',
  component: Toggle,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
  },
} as Meta<typeof Toggle>;

const Template: StoryFn<typeof Toggle> = (args: ToggleProps) => {
  const [checked, setChecked] = useState(args.checked || false);
  return <Toggle {...args} checked={checked} onChange={setChecked} />;
};

export const Default = Template.bind({});
Default.args = {
  checked: false,
};

export const Checked = Template.bind({});
Checked.args = {
  checked: true,
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  checked: false,
  label: 'Включить уведомления',
};

export const SmallSize = Template.bind({});
SmallSize.args = {
  checked: false,
  size: 'sm',
  label: 'Маленький переключатель',
};

export const Disabled = Template.bind({});
Disabled.args = {
  checked: true,
  disabled: true,
  label: 'Недоступно',
};