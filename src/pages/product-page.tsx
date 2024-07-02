import { ReactNode, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';

import { Box, Container, Dialog } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { BackTo } from '@/components/back-to/back-to';
import { LoadingBackdrop } from '@/components/backdrop/backdrop';
import { CloseButton } from '@/components/close-button/close-button';
import { ProductPaper } from '@/components/product-paper';
import { handleRemoveProduct } from '@/features/cart/cart-item/handle-remove-product';
import { SetterForCartRef } from '@/features/cart/clear-cart';
import { getProductById } from '@/lib/axios/requests/get-product-by-id';
import { CartResponse } from '@/lib/axios/requests/schemas/cart-schema';
import { updateCart } from '@/lib/axios/requests/update-cart/update-request';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

import { iconStyles, imgStyles, sliderSettingsEnlargedImage } from './product-page.constants';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ProductPage(): ReactNode {
  const { token } = useTokenStore();
  const { id } = useParams<{ id: string }>();
  const { cart, setCart } = useCartStore();
  const setterForCartRef = useRef(setCart);
  const [curImgIdx, setCurImgIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const handleModalClose = (): void => setOpen(false);
  const handleImageClick = (index: number): void => {
    setCurImgIdx(index);
    setOpen(true);
  };
  if (!id) {
    throw new Error('No product ID');
  }
  const { data, isPending } = useQuery({
    queryFn: () => getProductById(id, token),
    queryKey: ['product', id, token],
    throwOnError: true,
  });

  const isDisabled = Boolean(cart?.lineItems.some((item) => item.productId === id));

  return isPending ? (
    <LoadingBackdrop open={isPending} />
  ) : (
    <Container>
      <Container maxWidth="md">
        <ProductPaper
          {...{
            data,
            isDisabled,
            onButtonClick: () => void handleAddProduct({ cart, id, setCart, token }),
            onImageClick: handleImageClick,
            onRemoveClick: () => handleRemove({ cart, id, setterForCartRef, token }),
          }}
        />
        <Dialog maxWidth="lg" onClose={handleModalClose} open={open}>
          <CloseButton callback={handleModalClose} styles={iconStyles} />
          <Box sx={{ padding: '40px' }}>
            <Slider {...sliderSettingsEnlargedImage} afterChange={(i) => setCurImgIdx(i)} initialSlide={curImgIdx}>
              {data?.images.map((image, index) => (
                <Box key={index}>
                  <img alt={`big${index}`} src={image.url} style={imgStyles} />
                </Box>
              ))}
            </Slider>
          </Box>
        </Dialog>
      </Container>

      <BackTo dest="catalog" path="/catalog" />
    </Container>
  );
}

const handleAddProduct = async ({
  cart,
  id,
  setCart,
  token,
}: {
  cart: CartResponse | null;
  id: string;
  setCart: (cart: CartResponse) => void;
  token: null | string;
}): Promise<void> => {
  if (!cart || !token) {
    throw new Error('Missing data to add product');
  }
  const response = await updateCart(cart.id, cart.version, [{ action: 'addLineItem', productId: id }], token);
  setCart(response);
};

const handleRemove = ({
  cart,
  id,
  setterForCartRef,
  token,
}: {
  cart: CartResponse | null;
  id: string;
  setterForCartRef: SetterForCartRef;
  token: null | string;
}): void => {
  if (!token) {
    throw new Error('Token expected');
  }
  if (!cart) {
    throw new Error('Cart expected');
  }
  const lineItemId = cart?.lineItems.find((lineItem) => lineItem.productId === id)?.id;
  if (!lineItemId) {
    throw new Error(`No lineItem with id ${id} exists in cart`);
  }
  handleRemoveProduct(token, cart, lineItemId, setterForCartRef);
};
