import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Stack } from '@mui/material';

import { buttonsLabels, headerButtonsStyles } from '../navigation.constants';

export const RegisterLoginButtons: FC = () => {
  return (
    <Stack direction={'row'}>
      {buttonsLabels.map((label) => (
        <Button component={RouterLink} key={label} sx={headerButtonsStyles} to={label}>
          {label}
        </Button>
      ))}
    </Stack>
  );
};
