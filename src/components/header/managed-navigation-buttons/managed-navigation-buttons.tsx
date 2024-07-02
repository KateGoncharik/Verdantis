import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@mui/material';

import { useTokenStore } from '@/stores/token-store';

import { LogoutButton, RegisterLoginButtons } from '..';
import { headerButtonsStyles } from '../navigation.constants';

export const ManagedNavigationButtons: FC = () => {
  const { type } = useTokenStore();
  const isLoggedIn = type === 'password';
  return isLoggedIn ? (
    <>
      <Button component={RouterLink} sx={headerButtonsStyles} to="/profile">
        Profile
      </Button>
      <LogoutButton />
    </>
  ) : (
    <RegisterLoginButtons />
  );
};
