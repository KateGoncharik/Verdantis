import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CircularProgress } from '@mui/material';

import { RootLayout } from '@/components/root-layout';
import ErrorPage from '@/pages/error-page';

import { About, Catalog, Main, NotFound, Product } from './lazy-loading';

export const routes = [
  {
    children: [
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Main />
          </Suspense>
        ),
        index: true,
      },
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <NotFound />
          </Suspense>
        ),
        path: '*',
      },
      {
        children: [{ children: [{ element: <></>, path: ':subcategory' }], element: <></>, path: ':categoryName' }],
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Catalog />
          </Suspense>
        ),
        path: '/catalog',
      },

      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <ErrorBoundary FallbackComponent={ErrorPage}>
              <Product />
            </ErrorBoundary>
          </Suspense>
        ),
        path: 'catalog/product/:id',
      },
      {
        element: (
          <Suspense fallback={<CircularProgress />}>
            <About />
          </Suspense>
        ),
        path: '/about',
      },
    ],
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <RootLayout />
      </ErrorBoundary>
    ),
    path: '/',
  },
];
