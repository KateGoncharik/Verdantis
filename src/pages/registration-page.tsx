import { FC, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Stack, Typography } from '@mui/material';

import { RegistrationForm } from '@/features/registration-form';

const RegistrationPage: FC<{
  children?: ReactNode;
}> = () => {
  return (
    <div id="registration-page">
      <Typography component={'h1'} sx={{ fontSize: { lg: 50, md: 42, sm: 38 } }} textAlign={'center'}>
        Registration
      </Typography>
      <RegistrationForm />
      <Stack alignItems="center" borderRadius={20} justifyContent="center" width={'100%'}>
        <Link component={RouterLink} to="/login">
          Already have an account? Login
        </Link>
      </Stack>
      <Link component={RouterLink} to="/">
        <Button>Back to main</Button>
      </Link>
    </div>
  );
};

export default RegistrationPage;
