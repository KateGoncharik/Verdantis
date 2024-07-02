import { Link as RouterLink } from 'react-router-dom';

import { Box, Card, CardActionArea, CardActions, Typography } from '@mui/material';

import { AddProductButton } from '@/components/add-product-button';
import { PricesBlock } from '@/components/prices-block/prices-block';
import { Product } from '@/lib/axios/requests/schemas/product-schema';
import { updateCart } from '@/lib/axios/requests/update-cart/update-request';
import { useCartStore } from '@/stores/cart-store';
import { useTokenStore } from '@/stores/token-store';

import { discountPriceStyleCatalog, firstVariantPrice, stylePriceCatalog } from './catalog-item.constants';

const cardStyles = {
  ':hover': { bgcolor: 'primary.light', transition: '2s' },
  backgroundColor: 'primary.contrastText',
  textDecoration: 'none',
  transition: '2s',
  width: { lg: '25%', md: '33%', sm: '70%', xs: '100%' },
};

export const CatalogItem = ({ product }: { product: Product }): JSX.Element => {
  const { token } = useTokenStore();
  const { cart, setCart } = useCartStore();
  const { description, id, masterVariant, name } = product;
  const enName = name['en-US'];
  const enDescription = description ? description['en-US'] : 'No description available';
  const image =
    masterVariant && masterVariant.images.length > 0 ? masterVariant.images[0] : { name: 'placeholder', url: '' };
  const { prices } = masterVariant;

  const handleAddProduct = async (): Promise<void> => {
    if (!cart || !token) {
      throw new Error('Missing data to add product');
    }
    const response = await updateCart(cart.id, cart.version, [{ action: 'addLineItem', productId: id }], token);
    setCart(response);
  };

  const isDisabled = Boolean(cart?.lineItems.some((item) => item.productId === id));
  return (
    <Card className="flex flex-col justify-between p-5" sx={cardStyles} variant="outlined">
      <CardActionArea
        className="flex flex-1 flex-col justify-between"
        component={RouterLink}
        to={`product/${product.id}`}
      >
        <Box>
          <img alt={enName} className={'align-self-start w-full '} src={image.url} />

          <Typography
            className="my-3  text-center"
            sx={{ fontSize: { lg: '20px', md: '18px', xs: '16px' }, fontWeight: 600 }}
          >
            {enName}
          </Typography>
          <Typography
            className="my-3"
            sx={{ color: 'primary.dark', fontSize: { lg: '18px', md: '16px', xs: '12px' }, fontWeight: 600 }}
          >
            {enDescription}
          </Typography>
        </Box>
        <Box>
          <PricesBlock
            price={prices[firstVariantPrice]}
            styleDiscount={discountPriceStyleCatalog}
            stylePrice={stylePriceCatalog}
          />
          <CardActions>
            <Typography className="text-center" component={'h3'}>
              Click to learn more
            </Typography>
          </CardActions>
        </Box>
      </CardActionArea>
      <AddProductButton isDisabled={isDisabled} onclick={() => void handleAddProduct()} />
    </Card>
  );
};
