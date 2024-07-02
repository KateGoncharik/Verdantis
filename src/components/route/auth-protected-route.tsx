import { FC, PropsWithChildren, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Backdrop, CircularProgress } from '@mui/material';

import { useTokenStore } from '@/stores/token-store';

export const AuthProtectedRoute: FC<PropsWithChildren<{ isForLoggedIn: boolean }>> = ({ children, isForLoggedIn }) => {
  const { type } = useTokenStore();
  const navigate = useNavigate();
  const isLoggedIn = type === 'password';

  useEffect(() => {
    if (isLoggedIn !== isForLoggedIn) {
      navigate('/');
    }
  }, [isForLoggedIn, isLoggedIn, navigate]);

  if (type === null || isLoggedIn !== isForLoggedIn) {
    return (
      <Backdrop className="bg-transparent" open>
        <CircularProgress />
      </Backdrop>
    );
  }

  return children;
};
