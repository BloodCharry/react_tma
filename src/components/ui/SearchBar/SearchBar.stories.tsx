import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { SearchBar, SearchBarProps } from './SearchBar';
import {useState} from "react";

export default {
  title: 'UI/SearchBar',
  component: SearchBar,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof SearchBar>;

const Template: StoryFn<typeof SearchBar> = (args: SearchBarProps) => {
  const [value, setValue] = useState(args.value || '');
  return <SearchBar {...args} value={value} onChange={setValue} />;
};

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Поиск...',
};

export const WithValue = Template.bind({});
WithValue.args = {
  placeholder: 'Поиск...',
  value: 'react',
};

export const WithAddButton = Template.bind({});
WithAddButton.args = {
  placeholder: 'Поиск...',
  onAdd: () => console.log('Добавить'),
};