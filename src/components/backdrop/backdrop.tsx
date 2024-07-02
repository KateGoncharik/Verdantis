import { FC } from 'react';

import { Backdrop, CircularProgress } from '@mui/material';

export const LoadingBackdrop: FC<{ open: boolean }> = ({ open }) => {
  return (
    <Backdrop data-testid="backdrop" open={open} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <CircularProgress data-testid="circular-progress" />;
    </Backdrop>
  );
};
