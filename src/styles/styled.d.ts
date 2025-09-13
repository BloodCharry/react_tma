import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      accent: string;
      destructive: string;
      success: string;
      warning?: string;
      neutral: string;
      bg: string;
      lightBg: string;
      text: string;
      textSecondary: string;
      border: string;
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
