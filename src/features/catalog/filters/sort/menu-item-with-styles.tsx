import { FC } from 'react';

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { MenuItem } from '@mui/material';

export const MenuItemWithStyles: FC<{ iconType: 'down' | 'up'; name: string; value: string }> = ({
  iconType,
  name,
  value,
}) => {
  return (
    <MenuItem
      sx={{
        backgroundColor: 'primary.contrastText',
      }}
      value={value}
    >
      {name}
      {iconType === 'up' ? <ArrowUpward /> : <ArrowDownward />}
    </MenuItem>
  );
};
