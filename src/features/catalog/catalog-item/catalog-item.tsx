import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Card, CardActionArea, CardActions, Typography } from '@mui/material';

import { AddProductButton } from '@/components/add-product-button';
import { PricesBlock } from '@/components/prices-block/prices-block';
import { getProductById } from '@/lib/axios/get-product-by-id';
import { Product } from '@/lib/axios/schemas/product-schema';
import { useCartStore } from '@/stores/cart-store';

import { discountPriceStyleCatalog, firstVariantPrice, stylePriceCatalog } from './catalog-item.constants';

const cardStyles = {
  ':hover': { bgcolor: 'primary.light', transition: '2s' },
  bgcolor: 'primary.contrastText',
  textDecoration: 'none',
  transition: '2s',
  width: { lg: '25%', md: '33%', sm: '70%', xs: '100%' },
};

export const CatalogItem: FC<{ product: Product }> = ({ product }: { product: Product }) => {
  const { description, id, masterVariant, name } = product;
  const enName = name['en-US'];
  const enDescription = description ? description['en-US'] : 'No description available';
  const image =
    masterVariant && masterVariant.images.length > 0 ? masterVariant.images[0] : { name: 'placeholder', url: '' };
  const { prices } = masterVariant;
  const { cart, updateProducts } = useCartStore();
  const isDisabled = Boolean(cart?.products.some((item) => item.id === id));
  return (
    <Card className="flex flex-col justify-between p-5" sx={cardStyles} variant="outlined">
      <CardActionArea className="flex flex-1 flex-col justify-between" component={RouterLink} to={`product/${id}`}>
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
            sx={{ color: 'primary.dark', fontSize: { lg: '18px', md: '14px', sm: '12px', xs: '10px' } }}
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
      <AddProductButton
        isDisabled={isDisabled}
        onclick={() => {
          const product = getProductById(id);
          updateProducts([product]);
        }}
      />
    </Card>
  );
};
