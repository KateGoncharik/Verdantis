import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Stack } from '@mui/material';

import { headerButtonsStyles, sectionsLabels } from '../navigation.constants';

export const Sections: FC = () => {
  return (
    <Stack className="gap-2" direction={'row'} sx={{ color: 'primary.contrastText' }}>
      {sectionsLabels.map((label) => (
        <Button component={RouterLink} key={label} sx={headerButtonsStyles} to={label}>
          {label}
        </Button>
      ))}
    </Stack>
  );
};
