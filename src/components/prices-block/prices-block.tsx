import { FC } from 'react';

import { Typography } from '@mui/material';

import { DiscountedPrice } from './discounted-price';
import { DiscountedPriceWithTotal } from './discounted-price-with-total';
import { GeneralPrice } from './general-price';
import { GeneralPriceWithTotal } from './general-price-with-total';
import { PriceBlockProps } from './prices-block.types';

export const PricesBlock: FC<PriceBlockProps> = ({ price, styleDiscount, stylePrice, totalPrice }) => {
  if (!price) {
    return <Typography variant="body1">Price unavailable</Typography>;
  }
  const { discounted, value } = price;
  const formatPrice = (amount: number, currencyCode: string, fractionDigits: number): string => {
    return new Intl.NumberFormat('en-US', {
      currency: currencyCode,
      minimumFractionDigits: fractionDigits,
      style: 'currency',
    }).format(amount / Math.pow(10, fractionDigits));
  };

  if (discounted) {
    if (totalPrice) {
      return (
        <DiscountedPriceWithTotal
          discounted={discounted}
          formatPrice={formatPrice}
          styleDiscount={styleDiscount}
          stylePrice={stylePrice}
          totalPrice={totalPrice}
          value={value}
        />
      );
    }
    return (
      <DiscountedPrice
        discounted={discounted}
        formatPrice={formatPrice}
        styleDiscount={styleDiscount}
        stylePrice={stylePrice}
        value={value}
      />
    );
  }

  if (totalPrice) {
    return (
      <GeneralPriceWithTotal
        formatPrice={formatPrice}
        styleDiscount={styleDiscount}
        stylePrice={stylePrice}
        totalPrice={totalPrice}
        value={value}
      />
    );
  }

  return <GeneralPrice formatPrice={formatPrice} stylePrice={stylePrice} value={value} />;
};
