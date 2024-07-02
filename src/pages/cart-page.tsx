import { FC, useRef } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { BackTo } from '@/components/back-to/back-to';
import { TotalPricesBlock } from '@/components/total-price-block/total-price-block';
import { CartItem } from '@/features/cart';
import { ClearCart } from '@/features/cart/clear-cart/clear-cart';
import { PromocodeForm } from '@/features/promocod-form/promocode-form';
import { LineItem } from '@/lib/axios/requests/schemas/line-item-schema';
import { useCartStore } from '@/stores/cart-store';

export type AddedProductData = {
  lineItem: LineItem;
};

const CartPage: FC = () => {
  const { cart, setCart } = useCartStore();
  const setterForCartRef = useRef(setCart);
  const products = cart?.lineItems;

  return (
    <Stack className="flex-col items-center justify-between">
      <Typography component="h1" variant="h2">
        Cart
      </Typography>
      <ClearCart setterForCartRef={setterForCartRef} />
      {products && products.length > 0 ? (
        <>
          <Stack className="mb-auto flex w-3/4 flex-row flex-wrap justify-center gap-2">
            {products.map((addedProduct: LineItem) => {
              return <CartItem key={addedProduct.id} lineItem={addedProduct} setterForCartRef={setterForCartRef} />;
            })}
          </Stack>
          <PromocodeForm />
          <TotalPricesBlock discountOnTotalPrice={cart?.discountOnTotalPrice} totalPrice={cart?.totalPrice} />
          <Button className="my-auto block" variant="contained">
            Checkout
          </Button>
        </>
      ) : (
        <>
          <Typography className="mx-0 my-auto " component="h3" variant="h4">
            No products added.
          </Typography>
          <BackTo dest="catalog" path="/catalog" />
        </>
      )}
    </Stack>
  );
};

export default CartPage;
