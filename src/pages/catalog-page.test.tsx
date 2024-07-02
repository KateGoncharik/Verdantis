import { RouterProvider, createMemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import * as tokenStoreModule from '@/stores/token-store';
import { ReactQueryProvider } from '@/test/utils/react-query-provider';

import CatalogPage from './catalog-page';

const router = createMemoryRouter(
  [
    {
      element: <CatalogPage />,
      path: '/catalog',
    },
  ],
  { initialEntries: ['/', '/catalog'], initialIndex: 1 },
);

describe('catalog component', () => {
  it('renders page without errors', () => {
    vi.spyOn(tokenStoreModule, 'useTokenStore').mockImplementation(() => ({ token: 'test-token' }));

    expect(() =>
      render(
        <ReactQueryProvider>
          <RouterProvider router={router} />
        </ReactQueryProvider>,
      ),
    ).not.toThrow();
  });
});
