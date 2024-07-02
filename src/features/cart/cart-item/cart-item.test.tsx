import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { mockLineItem, mockSetterForCartRef } from '@/test/mocks/mock-line-item';
import { ReactQueryProvider } from '@/test/utils/react-query-provider';

import { CartItem } from './cart-item';

describe('CartItem', () => {
  it('should render', () => {
    render(
      <ReactQueryProvider>
        <MemoryRouter>
          <CartItem lineItem={mockLineItem} setterForCartRef={mockSetterForCartRef} />
        </MemoryRouter>
      </ReactQueryProvider>,
    );

    const productName = screen.getByText('test-name');
    const productQuantity = screen.getByText('1');

    expect(productName).toBeInTheDocument();
    expect(productQuantity).toBeInTheDocument();
  });
});
