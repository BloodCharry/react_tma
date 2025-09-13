import { Meta, StoryFn } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../../styles/theme';
import { ProductCard, ProductCardProps } from './ProductCard';

export default {
  title: 'UI/ProductCard',
  component: ProductCard,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta<typeof ProductCard>;

const Template: StoryFn<typeof ProductCard> = (args: ProductCardProps) => <ProductCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Дрель ударная',
  code: 'DR-1234',
  description: 'Мощная ударная дрель для профессионального использования',
  imageUrl: 'https://via.placeholder.com/100',
  onPrimaryAction: () => console.log('Выдать инструмент'),
};

export const WithStatus = Template.bind({});
WithStatus.args = {
  title: 'Отвертка крестовая',
  code: 'OT-5678',
  description: 'Комплект отверток для точной работы',
  imageUrl: 'https://via.placeholder.com/100',
  status: 'available',
  onPrimaryAction: () => console.log('Выдать инструмент'),
};

export const WithCustomButtonText = Template.bind({});
WithCustomButtonText.args = {
  title: 'Молоток',
  code: 'MH-9012',
  description: 'Стальной молоток 500г',
  imageUrl: 'https://via.placeholder.com/100',
  primaryText: 'Забрать',
  onPrimaryAction: () => console.log('Забрать инструмент'),
};