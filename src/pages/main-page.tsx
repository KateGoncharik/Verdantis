import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button } from '@mui/material';

import { PromoCodesWrapper } from '@/features/main-content/promo-codes-wrapper';

const MainPage: FC<{
  children?: ReactNode;
}> = () => {
  return (
    <>
      <Button component={RouterLink} to="/login">
        login
      </Button>
      <Button component={RouterLink} to="/registration">
        registration
      </Button>
      <PromoCodesWrapper />
    </>
  );
};

export default MainPage;
