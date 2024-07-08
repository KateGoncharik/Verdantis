import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Pagination, Stack, Typography } from '@mui/material';

import { CatalogItem } from '@/features/catalog/catalog-item';
import { CatalogWrapper } from '@/features/catalog/catalog-wrapper';
import { CategoriesNavigation } from '@/features/catalog/categories-navigation';
import { getProductsForPage } from '@/features/pagination/get-products-for-pagination';
import { buildQueryString } from '@/lib/axios/get-filtered-products';
import { Product } from '@/lib/axios/schemas/product-schema';

import { ALL_PRODUCTS_AMOUNT, PAGE_LIMIT } from './catalog-page-constants';

const handleGetAllProducts = (
  page: number,
  setProducts: Dispatch<SetStateAction<Product[] | null>>,
  setTotal: Dispatch<SetStateAction<number>>,
): void => {
  getProductsForPage(page).then(
    (data) => {
      setProducts(data);
      setTotal(ALL_PRODUCTS_AMOUNT);
    },
    () => {},
  );
};

const CatalogPage: FC = () => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const setterForProductsRef = useRef(setProducts);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const location = useLocation();

  useEffect(() => {
    setPage(1);
  }, [location]);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(location.search);
    const allSearchParams = urlSearchParams.entries();
    const filtersQueryString = buildQueryString(allSearchParams);
    const setProducts = setterForProductsRef.current;
    if (filtersQueryString.length > 0) {
      console.log('we have some filters');
    } else {
      handleGetAllProducts(page, setProducts, setTotal);
    }
  }, [location.search, page]);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };
  const pageCount = Math.ceil(total / PAGE_LIMIT);

  return (
    <CatalogWrapper>
      <Stack
        className={'flex-row justify-between align-middle'}
        sx={{ margin: { lg: '2% 5%', md: '2% 4%', sm: '1% 2%', xs: '1%' } }}
      >
        <CategoriesNavigation />
        {products && products.length > 0 ? (
          <Stack className="mb-auto flex w-3/4 flex-col items-center">
            {pageCount > 1 && (
              <Pagination className="p-4" color="primary" count={pageCount} onChange={handlePageChange} page={page} />
            )}
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
