import { MutableRefObject } from 'react';

import { Box, Button, Card, Typography } from '@mui/material';

import { ChangeQuantityButton } from '@/components/change-quantity-button/change-quantity-button';
import { PricesBlock } from '@/components/prices-block/prices-block';
import {
  discountPriceStyleCatalog,
  firstVariantPrice,
  stylePriceCatalog,
} from '@/features/catalog/catalog-item/catalog-item.constants';
import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { AddedProductData } from '@/pages/cart-page';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

import { handleRemoveProduct } from './handle-remove-product';

interface CartItemData extends AddedProductData {
  setterForCartRef: MutableRefObject<(cart: CartResponse) => void>;
}

const cardStyles = {
  ':hover': { bgcolor: 'primary.light', transition: '2s' },
  backgroundColor: 'primary.contrastText',
  textDecoration: 'none',
  transition: '2s',
  width: { lg: '25%', md: '33%', sm: '70%', xs: '100%' },
};

export const CartItem = ({ lineItem, setterForCartRef }: CartItemData): JSX.Element => {
  const { cart } = useCartStore();
  const { token } = useTokenStore();

  const {
    id,
    name: { 'en-US': enName },
    quantity,
    totalPrice,
    variant,
  } = lineItem;
  const firstImageIndex = 0;
  const image = variant ? variant.images[firstImageIndex] : { name: 'placeholder', url: '' };
  const { prices } = variant;

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
        totalPrice={totalPrice}
      />
      <Box className="flex flex-row items-center justify-between">
        <ChangeQuantityButton action="-" currentQuantity={quantity} productId={id} />
        <Typography
          className="my-3  text-center"
          sx={{ fontSize: { lg: '20px', md: '18px', xs: '16px' }, fontWeight: 600 }}
        >
          {quantity}
        </Typography>
        <ChangeQuantityButton action="+" currentQuantity={quantity} productId={id} />
      </Box>
      <Button
        onClick={() => {
          if (!token) {
            throw new Error('Token expected');
          }
          if (!cart) {
            throw new Error('Cart expected');
          }
          handleRemoveProduct(token, cart, id, setterForCartRef);
        }}
      >
        remove product
      </Button>
    </Card>
  );
};
