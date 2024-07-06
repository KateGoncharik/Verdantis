import { FC } from 'react';

import { Button } from '@mui/material';

export const ChangeQuantityButton: FC<{
  action: '+' | '-';
  currentQuantity: number;
  productId: string;
}> = ({ action, currentQuantity, productId }) => {
  console.log(productId);
  console.log(currentQuantity);

  return <Button variant="contained">{action}</Button>;
};
