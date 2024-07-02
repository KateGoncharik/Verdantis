import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { TotalPriceProps } from './total-price-block.types';

export const TotalPricesBlock: FC<TotalPriceProps> = ({ discountOnTotalPrice, totalPrice }) => {
  if (!totalPrice) {
    return <Typography variant="body1">Total: 0</Typography>;
  }
  const formatPrice = (amount: number, currencyCode: string, fractionDigits: number): string => {
    return new Intl.NumberFormat('en-US', {
      currency: currencyCode,
      minimumFractionDigits: fractionDigits,
      style: 'currency',
    }).format(amount / Math.pow(10, fractionDigits));
  };

  const cartPrice = formatPrice(totalPrice.centAmount, totalPrice.currencyCode, totalPrice.fractionDigits);

  return discountOnTotalPrice?.discountedAmount.centAmount ? (
    <Box className="flex gap-px">
      <Typography variant="body1">Total:</Typography>
      <Typography className="line-through" variant="body1">
        {formatPrice(
          discountOnTotalPrice.discountedAmount.centAmount + totalPrice.centAmount,
          totalPrice.currencyCode,
          totalPrice.fractionDigits,
        )}
      </Typography>
      <Typography variant="body1">{cartPrice}</Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="body1">Total: {cartPrice}</Typography>
    </Box>
  );
};
