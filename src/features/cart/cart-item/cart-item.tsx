import { MutableRefObject } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Card, CardActionArea, Typography } from '@mui/material';

import { PricesBlock } from '@/components/prices-block/prices-block';
import { RemoveProductButton } from '@/components/remove-product-button/remove-product-button';
import {
  discountPriceStyleCatalog,
  firstVariantPrice,
  stylePriceCatalog,
} from '@/features/catalog/catalog-item/catalog-item.constants';
import { Product } from '@/lib/axios/schemas/product-schema';
import { Cart, useCartStore } from '@/stores/cart-store';

type CartItemData = {
  product: Product;
  setterForCartRef: MutableRefObject<(cart: Cart) => void>;
};

const cardStyles = {
  ':hover': { bgcolor: 'primary.light', transition: '2s' },
  bgcolor: 'primary.contrastText',
  textDecoration: 'none',
  transition: '2s',
  width: { lg: '25%', md: '33%', sm: '70%', xs: '100%' },
};

export const CartItem = ({ product }: CartItemData): JSX.Element => {
  const { removeProduct } = useCartStore();
  const {
    id,
    masterVariant,
    name: { 'en-US': enName },
  } = product;
  const firstImageIndex = 0;
  const image = masterVariant.images[firstImageIndex];
  const { prices } = masterVariant;
  return (
    <Card className="flex flex-col justify-between p-5" id={id} sx={cardStyles} variant="outlined">
      <CardActionArea
        className="flex flex-1 flex-col justify-between"
        component={RouterLink}
        to={`/catalog/product/${id}`}
      >
        <img alt={enName} className={'align-self-start w-full '} src={image.url} />

        <Typography
          className="my-3  text-center"
          sx={{ fontSize: { lg: '20px', md: '18px', xs: '16px' }, fontWeight: 600 }}
        >
          {enName}
        </Typography>
      </CardActionArea>
      <PricesBlock
        price={prices[firstVariantPrice]}
        styleDiscount={discountPriceStyleCatalog}
        stylePrice={stylePriceCatalog}
        totalPrice={{ centAmount: 0, currencyCode: 'eur', fractionDigits: 0, type: '' }}
      />
      <Box className="flex flex-row items-center justify-between">
        <Typography
          className="my-3  text-center"
          sx={{ fontSize: { lg: '20px', md: '18px', xs: '16px' }, fontWeight: 600 }}
        >
          quantity: 1
        </Typography>
      </Box>
      <RemoveProductButton isDisabled={false} onclick={() => removeProduct(id)} />
    </Card>
  );
};
