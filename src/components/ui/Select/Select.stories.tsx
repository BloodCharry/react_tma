import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Select, SelectProps } from './Select';
import {useState} from "react";

export default {
  title: 'UI/Select',
  component: Select,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    multiple: {
      control: 'boolean',
    },
    searchable: {
      control: 'boolean',
    },
  },
} as Meta<typeof Select>;

const Template: StoryFn<typeof Select> = (args: SelectProps) => {
  const [value, setValue] = useState(args.value || (args.multiple ? [] : ''));
  return <Select {...args} value={value} onChange={setValue} />;
};

const options = [
  { value: 'option1', label: 'Опция 1' },
  { value: 'option2', label: 'Опция 2' },
  { value: 'option3', label: 'Опция 3' },
  { value: 'option4', label: 'Опция 4' },
  { value: 'option5', label: 'Опция 5' },
];

export const Default = Template.bind({});
Default.args = {
  options,
  placeholder: 'Выберите опцию...',
};

export const Searchable = Template.bind({});
Searchable.args = {
  options,
  placeholder: 'Поиск опций...',
  searchable: true,
};

export const Multiple = Template.bind({});
Multiple.args = {
  options,
  placeholder: 'Выберите несколько опций...',
  multiple: true,
};

export const MultipleSearchable = Template.bind({});
MultipleSearchable.args = {
  options,
  placeholder: 'Поиск и выбор нескольких опций...',
  multiple: true,
  searchable: true,
};

export const WithSelectedValue = Template.bind({});
WithSelectedValue.args = {
  options,
  value: 'option2',
  placeholder: 'Выберите опцию...',
};

export const MultipleWithSelectedValues = Template.bind({});
MultipleWithSelectedValues.args = {
  options,
  value: ['option1', 'option3'],
  placeholder: 'Выберите несколько опций...',
  multiple: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  options,
  placeholder: 'Недоступно...',
  disabled: true,
};