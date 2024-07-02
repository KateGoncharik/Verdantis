import { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { GeneralPriceWithTotalProps } from './prices-block.types';

export const GeneralPriceWithTotal: FC<GeneralPriceWithTotalProps> = ({
  formatPrice,
  stylePrice,
  totalPrice,
  value,
}) => {
  if (!stylePrice) {
    throw new Error('Styles expected');
  }
  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Typography color={stylePrice} variant="body1">
        {formatPrice(value.centAmount, value.currencyCode, value.fractionDigits)}
      </Typography>
      <Typography color={stylePrice} variant="body1">
        Total:
        {totalPrice ? formatPrice(totalPrice.centAmount, totalPrice.currencyCode, totalPrice.fractionDigits) : ''}
      </Typography>
    </Box>
  );
};
