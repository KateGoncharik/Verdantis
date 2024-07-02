import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { DiscountedPriceWithTotalProps } from './prices-block.types';

export const DiscountedPriceWithTotal: FC<DiscountedPriceWithTotalProps> = ({
  discounted,
  formatPrice,
  styleDiscount,
  stylePrice,
  totalPrice,
  value,
}) => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Typography sx={styleDiscount} variant="body1">
      {formatPrice(value.centAmount, value.currencyCode, value.fractionDigits)}
    </Typography>
    <Typography color={stylePrice} variant="body1">
      {formatPrice(discounted.value.centAmount, discounted.value.currencyCode, discounted.value.fractionDigits)}
    </Typography>
    <Typography color={stylePrice} variant="body1">
      Total:
      {totalPrice ? formatPrice(totalPrice.centAmount, totalPrice.currencyCode, totalPrice.fractionDigits) : ''}
    </Typography>
  </Box>
);
