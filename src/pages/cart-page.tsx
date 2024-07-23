import { FC, useRef } from 'react';

import { Button, Stack, Typography } from '@mui/material';

import { BackTo } from '@/components/back-to/back-to';
import { CartItem } from '@/features/cart/cart-item/cart-item';
import { ClearCart } from '@/features/cart/clear-cart';
import { PromocodeForm } from '@/features/promo-code-form';
import { Product } from '@/lib/axios/schemas/product-schema';
import { useCartStore } from '@/stores/cart-store';

const CartPage: FC = () => {
  const { cart, setCart } = useCartStore();
  const setterForCartRef = useRef(setCart);
  return (
    <Stack className="flex-col items-center justify-between">
      <Typography component="h1" variant="h2">
        Cart
      </Typography>
      <ClearCart setterForCartRef={setterForCartRef} />
      {cart?.products && cart.products.length > 0 ? (
        <>
          {/* <Stack className="mb-auto flex w-3/4 flex-row flex-wrap justify-center gap-2"> */}
          {cart.products.map((addedProduct: Product) => {
            return <CartItem key={addedProduct.id} product={addedProduct} setterForCartRef={setterForCartRef} />;
          })}
          {/* </Stack> */}
          <PromocodeForm />
          {/* <TotalPricesBlock discountOnTotalPrice={cart?.discountOnTotalPrice} totalPrice={cart?.totalPrice} /> */}
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
