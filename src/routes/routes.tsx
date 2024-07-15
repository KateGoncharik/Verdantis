import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { CircularProgress } from '@mui/material';

import { RootLayout } from '@/components/root-layout';
// import { AuthProtectedRoute } from '@/components/route/auth-protected-route';
import ErrorPage from '@/pages/error-page';

import {
  // About, Cart,
  Catalog,
  Main,
  //  Login,
  NotFound,
  Product,
  //  Profile, Registration
} from './lazy-loading';

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
    ],
    element: (
      <ErrorBoundary FallbackComponent={ErrorPage}>
        <RootLayout />
      </ErrorBoundary>
    ),
    path: '/',
  },
];

// {
//   element: (
//     <Suspense fallback={<CircularProgress />}>
//       <Cart />
//     </Suspense>
//   ),
//   path: '/cart',
// },
// {
//   element: (
//     <Suspense fallback={<CircularProgress />}>
//       <About />
//     </Suspense>
//   ),
//   path: '/about',
// },

// {
//   element: (
//     <AuthProtectedRoute isForLoggedIn={false}>
//       <Suspense fallback={<CircularProgress />}>
//         <Login />
//       </Suspense>
//     </AuthProtectedRoute>
//   ),
//   path: '/login',
// },
// {
//   element: (
//     <AuthProtectedRoute isForLoggedIn={false}>
//       <Suspense fallback={<CircularProgress />}>
//         <Registration />
//       </Suspense>
//     </AuthProtectedRoute>
//   ),
//   path: '/registration',
// },

// {
//   element: (
//     <AuthProtectedRoute isForLoggedIn={true}>
//       <Suspense fallback={<CircularProgress />}>
//         <Profile />
//       </Suspense>
//     </AuthProtectedRoute>
//   ),
//   path: '/profile',
// },
