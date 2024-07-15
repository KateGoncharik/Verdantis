import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { Pagination, Stack, Typography } from '@mui/material';

import { CatalogItem } from '@/features/catalog/catalog-item';
import { CatalogWrapper } from '@/features/catalog/catalog-wrapper';
import { CategoriesNavigation } from '@/features/catalog/categories-navigation';
import { Filters } from '@/features/catalog/filters/filters';
import { Search } from '@/features/catalog/filters/search';
import { getProducts } from '@/lib/axios/get-products';
import { Product } from '@/lib/axios/schemas/product-schema';

import { PAGE_LIMIT } from './catalog-page-constants';

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
    const setProducts = setterForProductsRef.current;
    getProducts(urlSearchParams, setProducts, setTotal, page);
  }, [location.search, page]);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number): void => {
    setPage(value);
  };
  const pageCount = Math.ceil(total / PAGE_LIMIT);

  return (
    <CatalogWrapper>
      <Stack className={'flex-row '}>
        <CategoriesNavigation />

        <Stack>
          <Stack className="items-center gap-2">
            <Filters />
            <Search />
          </Stack>

          <Stack className="flex items-center" sx={{ padding: { lg: '2% 5%', md: '2% 4%', sm: '1% 2%', xs: '1%' } }}>
            {products && products.length > 0 ? (
              <Stack className="mb-auto flex w-3/4 flex-col items-center justify-center">
                {pageCount > 1 && (
                  <Pagination
                    className="p-4"
                    color="primary"
                    count={pageCount}
                    onChange={handlePageChange}
                    page={page}
                  />
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
        </Stack>
      </Stack>
    </CatalogWrapper>
  );
};

export default CatalogPage;
