import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';

import { useCartStore } from '@/stores/cart-store';

import { Sections } from '..';

vi.mock('../navigation.constants', () => ({
  headerButtonsStyles: {
    '&:hover': { backgroundColor: 'primary.contrastText', color: 'primary.main', transition: '1s' },
    color: 'primary.contrastText',
    transition: '1s',
  },
  sectionsLabels: ['section1', 'section2', 'cart'],
}));

vi.mock('@/stores/cart-store', () => ({
  useCartStore: vi.fn(),
}));

describe('Sections component', () => {
  it('should render cart items count', () => {
    const mockCart = {
      lineItems: [
        { addedAt: 'not-now', productId: '1', quantity: 3 },
        { addedAt: 'now', productId: '2', quantity: 1 },
      ],
    };
    const totalItems = mockCart.lineItems.reduce((sum, item) => item.quantity + sum, 0);
    (useCartStore as unknown as Mock).mockReturnValue(mockCart);
    render(
      <MemoryRouter>
        <Sections />
      </MemoryRouter>,
    );
    const itemsCounter = screen.getByTestId('cart-items-count');
    expect(itemsCounter.textContent).toEqual(`${totalItems}`);
  });
  it('should render cart icon if section name cart is present', () => {
    render(
      <MemoryRouter>
        <Sections />
      </MemoryRouter>,
    );
    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
  });
});
