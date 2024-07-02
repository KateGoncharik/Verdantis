import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';

import { useTokenStore } from '@/stores/token-store';

import { headerButtonsStyles } from '../navigation.constants';

export const LogoutButton: FC = () => {
  const navigate = useNavigate();
  const { resetStore } = useTokenStore();
  const handleLogout = (): void => {
    void resetStore();
    navigate('/');
  };
  return (
    <Button onClick={handleLogout} sx={headerButtonsStyles}>
      Logout
    </Button>
  );
};
