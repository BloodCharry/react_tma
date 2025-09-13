import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Dropdown, DropdownProps } from './Dropdown';
import {useState} from "react";

export default {
  title: 'UI/Dropdown',
  component: Dropdown,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof Dropdown>;

const Template: StoryFn<typeof Dropdown> = (args: DropdownProps) => {
  const [value, setValue] = useState(args.value || '');
  return <Dropdown {...args} value={value} onChange={setValue} />;
};

const options = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' },
  { value: 'option4', label: 'Опция 4' },
];

export const Default = Template.bind({});
Default.args = {
  options,
  placeholder: 'Выберите опцию...',
};

export const WithSelectedValue = Template.bind({});
WithSelectedValue.args = {
  options,
  value: 'option2',
  placeholder: 'Выберите опцию...',
};

export const Disabled = Template.bind({});
Disabled.args = {
  options,
  placeholder: 'Недоступно...',
  disabled: true,
};