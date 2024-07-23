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
  const isProducts = cart?.products && cart.products.length > 0;
  return (
    <Stack className="flex-col items-center justify-between gap-2 p-2">
      <Typography component="h1" variant="h2">
        Cart
      </Typography>
      <BackTo dest="catalog" path="/catalog" />
      {isProducts && <PromocodeForm />}

      <Stack className="flex w-1/2 flex-row justify-between">
        <Button className="my-auto block" disabled={!isProducts} variant="contained">
          Checkout
        </Button>
        <ClearCart setterForCartRef={setterForCartRef} />
      </Stack>

      {isProducts ? (
        <>
          <Stack className="mb-auto flex w-3/4 flex-row flex-wrap justify-center gap-2 p-2 ">
            {cart.products.map((addedProduct: Product) => {
              return <CartItem key={addedProduct.id} product={addedProduct} setterForCartRef={setterForCartRef} />;
            })}
          </Stack>
          {/* <TotalPricesBlock discountOnTotalPrice={cart?.discountOnTotalPrice} totalPrice={cart?.totalPrice} /> */}
        </>
      ) : (
        <>
          <Typography className="m-10" component="h3" variant="h4">
            No products added. Let&apos;s go get some!
          </Typography>
        </>
      )}
    </Stack>
  );
};

export default CartPage;
