import 'styled-components';
import { theme } from './theme';

// Получаем тип нашей темы
type AppTheme = typeof theme;

// Расширяем DefaultTheme styled-components
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      accent: string;
      destructive: string;
      success: string;
      neutral: string;
      bg: string;
      lightBg: string;
      text: string;
      textSecondary: string;
    };
    radii: {
      sm: string;
      md: string;
      round: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
    };
    fontSizes: {
      title: string;
      body: string;
      caption: string;
    };
  }
}