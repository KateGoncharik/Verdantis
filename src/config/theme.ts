import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '@fontsource/raleway';

export const theme = createTheme({
  breakpoints: {
    values: {
      lg: 800,
      md: 600,
      sm: 320,
      xl: 1200,
      xs: 0,
    },
  },

  palette: {
    background: {
      default: '#2b3238',
      paper: '#3b4248',
    },
    error: {
      main: red.A400,
    },
    primary: {
      contrastText: 'white',
      dark: '#2a2d19',
      light: '#6fa45e',
      main: '#334c36',
    },
    secondary: {
      main: '#d9d9d9',
    },
  },
  typography: {
    fontFamily: 'Raleway',
  },
});
