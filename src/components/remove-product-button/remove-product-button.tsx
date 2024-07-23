import { FC } from 'react';

import RemoveIcon from '@mui/icons-material/Remove';
import { Button } from '@mui/material';

export const RemoveProductButton: FC<{ isDisabled: boolean; onclick: () => void }> = ({ isDisabled, onclick }) => {
  return (
    <Button className="mx-auto block" disabled={isDisabled} onClick={onclick} variant="contained">
      <RemoveIcon />
    </Button>
  );
};
