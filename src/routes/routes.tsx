import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CircularProgress } from '@mui/material';

import { RootLayout } from '@/components/root-layout';
import { AuthProtectedRoute } from '@/components/route/auth-protected-route';
import ErrorPage from '@/pages/error-page';

import { About, Cart, Catalog, Login, Main, NotFound, Product, Profile, Registration } from './lazy-loading';

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
          <AuthProtectedRoute isForLoggedIn={false}>
            <Suspense fallback={<CircularProgress />}>
              <Login />
            </Suspense>
          </AuthProtectedRoute>
        ),
        path: '/login',
      },
      {
        element: (
          <AuthProtectedRoute isForLoggedIn={false}>
            <Suspense fallback={<CircularProgress />}>
              <Registration />
            </Suspense>
          </AuthProtectedRoute>
        ),
        path: '/registration',
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
          <ErrorBoundary FallbackComponent={ErrorPage}>
            <Product />
          </ErrorBoundary>
        ),
        path: 'catalog/product/:id',
      },
      {
        element: (
          <AuthProtectedRoute isForLoggedIn={true}>
            <Suspense fallback={<CircularProgress />}>
              <Profile />
            </Suspense>
          </AuthProtectedRoute>
        ),
        path: '/profile',
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
        element: (
          <Suspense fallback={<CircularProgress />}>
            <Cart />
          </Suspense>
        ),
        path: '/cart',
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
