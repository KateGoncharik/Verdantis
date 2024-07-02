import type { PropsWithChildren, ReactNode } from 'react';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/material';

import { theme } from '@/config/theme';

export const ThemeProvider = ({ children }: PropsWithChildren): ReactNode => {
  return (
    <StyledEngineProvider injectFirst>
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </StyledEngineProvider>
  );
};
