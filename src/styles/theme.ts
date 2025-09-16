import { DefaultTheme } from 'styled-components';

export const theme: DefaultTheme = {
  colors: {
    // Базовые
    primary: '#007AFF',
    primaryHover: '#0066CC',       // hover для primary
    primaryActive: '#005BB5',      // active для primary

    accent: '#0A84FF',

    destructive: '#FF3B30',
    destructiveHover: '#E53935',   // hover для destructive
    destructiveActive: '#CC2E2A',  // active для destructive

    success: '#34C759',
    successHover: '#2EB94F',
    successActive: '#28A745',

    warning: '#FFC107',
    warningHover: '#E6AC00',
    warningActive: '#CC9900',

    neutral: '#8E8E93',
    neutralHover: '#7A7A7E',
    neutralActive: '#5C5C60',

    bg: '#FFFFFF',
    lightBg: '#F2F2F7',

    text: '#000000',
    textSecondary: '#6E6E73',

    border: '#D1D1D6',

    // Фокус для доступности
    focus: '#005BB5', // можно взять primaryActive или отдельный цвет
  },

  radii: {
    sm: '8px',
    md: '10px',
    round: '50%',
  },

  spacing: {
    xs: '6px',
    sm: '8px',
    md: '16px',
    lg: '24px',
  },

  fontSizes: {
    title: '17px',
    body: '15px',
    caption: '13px',
  },
};
