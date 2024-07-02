import { ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link, Typography } from '@mui/material';

export default function NotFoundPage(): ReactNode {
  return (
    <>
      <Typography component={'h2'} sx={{ fontSize: { lg: 50, md: 42, sm: 38 } }} textAlign={'center'}>
        Oh, hi!
      </Typography>
      <Typography component={'h1'} sx={{ fontSize: { lg: 30, sm: 20 } }} textAlign={'center'}>
        Sorry, but here is nothing to do.
      </Typography>

      <Typography component={'h3'} sx={{ fontSize: { lg: 35, md: 30, sm: 25 } }} textAlign={'center'}>
        {`404 - Page ${window.location.pathname} was not found`}
      </Typography>
      <Link component={RouterLink} to="/">
        <Button>Back to main</Button>
      </Link>
    </>
  );
}
