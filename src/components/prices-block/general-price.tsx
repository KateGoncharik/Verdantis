import { FC } from 'react';

import { Typography } from '@mui/material';

import { GeneralPriceProps } from './prices-block.types';

export const GeneralPrice: FC<GeneralPriceProps> = ({ formatPrice, stylePrice, value }) => {
  if (!stylePrice) {
    throw new Error('Styles expected');
  }
  return (
    <Typography color={stylePrice} variant="body1">
      {formatPrice(value.centAmount, value.currencyCode, value.fractionDigits)}
    </Typography>
  );
};
