import { FC, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Pagination, Stack, Typography } from '@mui/material';

import type { Product, ProductsResponse } from '@/lib/axios/requests/schemas/product-schema';

import { CatalogItem } from '@/features/catalog/catalog-item/';
import { CatalogWrapper } from '@/features/catalog/catalog-wrapper';
import { CategoriesNavigation } from '@/features/catalog/categories-navigation';
import { buildQueryString, getFilteredProducts } from '@/lib/axios/requests/catalog/get-filtered-products';
import { getAllProducts } from '@/lib/axios/requests/get-products';
import { useTokenStore } from '@/stores/token-store';

const PAGE_LIMIT = 7;

const handleGetAllProducts = (
  token: string,
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  offset: number = 0,
): void => {
  getAllProducts(offset, token).then(
    (response: ProductsResponse) => {
      setProducts(response.results);
      setTotal(response.total);
    },
    (error) => {
      console.error(error);
    },
  );
};

const handleGetFilteredProducts = (
  token: string,
  setProducts: React.Dispatch<React.SetStateAction<Product[] | null>>,
  setTotal: React.Dispatch<React.SetStateAction<number>>,
  offset: number = 0,
  filtersQueryString: string,
): void => {
  getFilteredProducts(offset, token, filtersQueryString).then(
    (response: ProductsResponse) => {
      setProducts(response.results);
      setTotal(response.total);
    },
    (error) => {
      console.error(error);
    },
  );
};

const CatalogPage: FC = () => {
  const { token } = useTokenStore();
  const [products, setProducts] = useState<Product[] | null>(null);
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
    const offset = PAGE_LIMIT * (page - 1);
    if (!token) {
      throw new Error('Token expected');
    }
    if (filtersQueryString.length > 0) {
      handleGetFilteredProducts(token, setProducts, setTotal, offset, filtersQueryString);
    } else {
      handleGetAllProducts(token, setProducts, setTotal, offset);
    }
  }, [token, location.search, page]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number): void => {
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
              {products.map((product: Product) => {
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
