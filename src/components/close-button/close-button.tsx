import { FC } from 'react';

import { Close as CloseIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export const CloseButton: FC<{ callback: () => void; styles: Record<string, number | string> }> = ({
  callback,
  styles,
}) => {
  return (
    <IconButton aria-label="close" onClick={callback} sx={styles}>
      <CloseIcon sx={{ scale: '1.3' }} />
    </IconButton>
  );
};
