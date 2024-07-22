import { MutableRefObject } from 'react';

import { Box, Button, Card, Typography } from '@mui/material';

import { PricesBlock } from '@/components/prices-block/prices-block';
import {
  discountPriceStyleCatalog,
  firstVariantPrice,
  stylePriceCatalog,
} from '@/features/catalog/catalog-item/catalog-item.constants';
import { Product } from '@/lib/axios/schemas/product-schema';
import { Cart, useCartStore } from '@/stores/cart-store';

type AAA = {
  product: Product;
};

interface CartItemData extends AAA {
  setterForCartRef: MutableRefObject<(cart: Cart) => void>;
}

const cardStyles = {
  ':hover': { bgcolor: 'primary.light', transition: '2s' },
  backgroundColor: 'primary.contrastText',
  textDecoration: 'none',
  transition: '2s',
  width: { lg: '25%', md: '33%', sm: '70%', xs: '100%' },
};

export const CartItem = ({ product }: CartItemData): JSX.Element => {
  const { cart } = useCartStore();
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
      <img alt={enName} className={'align-self-start w-full '} src={image.url} />

      <Typography
        className="my-3  text-center"
        sx={{ fontSize: { lg: '20px', md: '18px', xs: '16px' }, fontWeight: 600 }}
      >
        {enName}
      </Typography>

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
          {1}
        </Typography>
      </Box>
      <Button
        onClick={() => {
          if (!cart) {
            throw new Error('Cart expected');
          }
          // handleRemoveProduct( cart, id, setterForCartRef);
        }}
      >
        remove product
      </Button>
    </Card>
  );
};
