import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { DiscountedPriceProps } from './prices-block.types';

export const DiscountedPrice: FC<DiscountedPriceProps> = ({
  discounted,
  formatPrice,
  styleDiscount,
  stylePrice,
  value,
}) => (
  <Box sx={{ display: 'flex', gap: 2 }}>
    <Typography sx={styleDiscount} variant="body1">
      {formatPrice(value.centAmount, value.currencyCode, value.fractionDigits)}
    </Typography>
    <Typography color={stylePrice} variant="body1">
      {formatPrice(discounted.value.centAmount, discounted.value.currencyCode, discounted.value.fractionDigits)}
    </Typography>
  </Box>
);
