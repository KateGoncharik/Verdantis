import { FC } from 'react';

import { Stack, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import { ManagedNavigationButtons, Sections } from '.';
import { BurgerMenu } from './burger-menu/burger-menu';

export const Navigation: FC = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
  return matches ? (
    <Stack className="gap-2" direction={'row'}>
      <Sections />
      <ManagedNavigationButtons />
    </Stack>
  ) : (
    <BurgerMenu />
  );
};
