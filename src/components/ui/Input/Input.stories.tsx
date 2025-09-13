import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Input, InputProps } from './Input';
import Icon from '../Icon/Icon';

export default {
  title: 'UI/Input',
  component: Input,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'number', 'date', 'tel', 'email', 'password'],
    },
  },
} as Meta<typeof Input>;

const Template: StoryFn<typeof Input> = (args: InputProps) => <Input {...args} />;

export const Default = Template.bind({});
Default.args = {
  placeholder: 'Введите текст...',
};

export const WithError = Template.bind({});
WithError.args = {
  placeholder: 'Введите email...',
  error: 'Неверный формат email',
};

export const WithIconLeft = Template.bind({});
WithIconLeft.args = {
  placeholder: 'Поиск...',
  iconLeft: <Icon name="search" />,
};

export const WithIconRight = Template.bind({});
WithIconRight.args = {
  placeholder: 'Введите телефон...',
  iconRight: <Icon name="phone" />,
};

export const Controlled = () => {
  const [value, setValue] = useState('');

  return (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Контролируемый input"
      />
      <p>Значение: {value}</p>
    </div>
  );
};