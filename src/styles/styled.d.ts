import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      // Основные
      primary: string;
      primaryHover: string;
      primaryActive: string;

      accent: string;

      destructive: string;
      destructiveHover: string;
      destructiveActive: string;

      success: string;
      successHover: string;
      successActive: string;

      warning?: string;
      warningHover?: string;
      warningActive?: string;

      neutral: string;
      neutralHover: string;
      neutralActive: string;

      bg: string;
      lightBg: string;

      text: string;
      textSecondary: string;

      border: string;

      focus: string;
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
