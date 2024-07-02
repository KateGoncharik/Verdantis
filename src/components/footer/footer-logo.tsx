import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Icon, Link, Stack } from '@mui/material';

import logo from '@/assets/img/Verdantis-small.png';

export const FooterLogo: FC = () => {
  return (
    <Stack
      alignItems="center"
      borderRadius={20}
      display="flex"
      justifyContent="center"
      width={{ lg: '30%', md: '40%', sm: '50%' }}
    >
      <Link component={RouterLink} to="/">
        <Icon alt="logo" className="h-full w-full" component={'img'} src={logo} />
      </Link>
    </Stack>
  );
};
