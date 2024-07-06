import { FC } from 'react';

import { Stack, Typography } from '@mui/material';

import { BackTo } from '@/components/back-to/back-to';

const CartPage: FC = () => {
  return (
    <Stack className="flex-col items-center justify-between">
      <Typography component="h1" variant="h2">
        Cart
      </Typography>

      <>
        <Typography className="mx-0 my-auto " component="h3" variant="h4">
          No products added.
        </Typography>
        <BackTo dest="catalog" path="/catalog" />
      </>
    </Stack>
  );
};

export default CartPage;
