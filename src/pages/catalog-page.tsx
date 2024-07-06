import { Dispatch, FC, useEffect, useRef, useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { CatalogItem } from '@/features/catalog/catalog-item';
import { CatalogWrapper } from '@/features/catalog/catalog-wrapper';
import { CategoriesNavigation } from '@/features/catalog/categories-navigation';
import { getAllProducts } from '@/lib/axios/get-all-products';
import { buildQueryString } from '@/lib/axios/get-filtered-products';
import { Product } from '@/lib/axios/schemas/product-schema';

const handleGetAllProducts = (setProducts: Dispatch<React.SetStateAction<Product[] | null>>): void => {
  getAllProducts().then(
    (response: Product[]) => {
      setProducts(response);
    },
    (error) => {
      console.error(error);
    },
  );
};

const CatalogPage: FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const setterForProductsRef = useRef(setProducts);
  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);

    const allSearchParams = urlSearchParams.entries();
    const filtersQueryString = buildQueryString(allSearchParams);
    const setProducts = setterForProductsRef.current;
    if (filtersQueryString.length > 0) {
      console.log('we have some filters');
    } else {
      handleGetAllProducts(setProducts);
    }
  });
  return (
    <CatalogWrapper>
      <Stack
        className={'flex-row justify-between align-middle'}
        sx={{ margin: { lg: '2% 5%', md: '2% 4%', sm: '1% 2%', xs: '1%' } }}
      >
        <CategoriesNavigation />
        {products && products.length > 0 ? (
          <Stack className="mb-auto flex w-3/4 flex-col items-center">
            <Stack className="flex flex-row flex-wrap justify-center gap-2">
              {products.map((product) => {
                return <CatalogItem key={`${product.key}`} product={product} />;
              })}
            </Stack>
          </Stack>
        ) : (
          <Typography className="p-5" component={'h2'} variant="h3">
            No data available. Try to reload the page
          </Typography>
        )}
      </Stack>
    </CatalogWrapper>
  );
};

export default CatalogPage;
