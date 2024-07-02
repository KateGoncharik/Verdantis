import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockProduct } from '@/test/mocks/mock-product';

import { CatalogItem } from './catalog-item';
describe('CatalogItem', () => {
  it('should render', () => {
    render(
      <MemoryRouter>
        <CatalogItem product={mockProduct} />
      </MemoryRouter>,
    );

    const itemName = screen.getByText(/some product/i);
    const itemDescription = screen.getByText(/some description/i);

    expect(itemName).toBeInTheDocument();
    expect(itemDescription).toBeInTheDocument();
  });
});
