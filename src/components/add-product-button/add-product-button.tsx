import { FC } from 'react';

import { Button } from '@mui/material';

export const AddProductButton: FC<{ isDisabled: boolean; onclick: () => void }> = ({ isDisabled, onclick }) => {
  return (
    <Button className="mx-auto block" disabled={isDisabled} onClick={onclick} variant="contained">
      Add to cart
    </Button>
  );
};
