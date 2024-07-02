import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Link } from '@mui/material';

export const BackTo: FC<{ dest: string; path: string }> = ({ dest, path }) => {
  return (
    <Link className="mx-auto block p-2 text-center" component={RouterLink} sx={{ maxWidth: 'auto' }} to={path}>
      <Button variant="contained">Back to {dest}</Button>
    </Link>
  );
};
