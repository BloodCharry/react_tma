import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { Modal, ModalProps } from './Modal';
import Button from '../Button/Button';
import {useState} from "react";

export default {
  title: 'UI/Modal',
  component: Modal,
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
      options: ['sm', 'md', 'lg'],
    },
  },
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args: ModalProps) => {
  const [open, setOpen] = useState(args.open || false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Открыть модальное окно</Button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'Заголовок модального окна',
  children: <p>Содержимое модального окна</p>,
};

export const WithFooter = Template.bind({});
WithFooter.args = {
  title: 'Подтверждение действия',
  children: <p>Вы уверены, что хотите выполнить это действие?</p>,
  footer: (
    <>
      <Button variant="outline" onClick={() => {}}>
        Отмена
      </Button>
      <Button variant="primary" onClick={() => {}}>
        Подтвердить
      </Button>
    </>
  ),
};

export const LargeSize = Template.bind({});
LargeSize.args = {
  title: 'Большое модальное окно',
  size: 'lg',
  children: (
    <div>
      <p>Это большое модальное окно с большим содержимым.</p>
      <p>Много текста для демонстрации прокрутки.</p>
      <p>Много текста для демонстрации прокрутки.</p>
      <p>Много текста для демонстрации прокрутки.</p>
      <p>Много текста для демонстрации прокрутки.</p>
      <p>Много текста для демонстрации прокрутки.</p>
      <p>Много текста для демонстрации прокрутки.</p>
      <p>Много текста для демонстрации прокрутки.</p>
    </div>
  ),
};