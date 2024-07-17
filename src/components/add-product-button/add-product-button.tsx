import { FC } from 'react';

import { Button } from '@mui/material';

export const AddProductButton: FC<{ onclick: () => void }> = ({ onclick }) => {
  return (
    <Button className="mx-auto block" onClick={onclick} variant="contained">
      Add to cart
    </Button>
  );
};
