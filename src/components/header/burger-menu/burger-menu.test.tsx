import { MemoryRouter } from 'react-router-dom';

import { fireEvent, render, screen } from '@testing-library/react';
import { Mock, describe, expect, it, vi } from 'vitest';

import { useCartStore } from '@/stores/cart-store';

import { BurgerMenu } from './burger-menu';

vi.mock('@/stores/cart-store', () => ({
  useCartStore: vi.fn(),
}));

vi.mock('@/stores/cart-store', () => ({
  useCartStore: vi.fn(),
}));

describe('Burger menu', () => {
  it('toggles open and close correctly', () => {
    render(
      <MemoryRouter>
        <BurgerMenu />
      </MemoryRouter>,
    );

    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
  });
  it('should render cart icon if section name is cart', () => {
    render(
      <MemoryRouter>
        <BurgerMenu />
      </MemoryRouter>,
    );
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    const cartIcon = screen.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
  });
  it('should render cart items count', () => {
    const mockCart = {
      lineItems: [
        { addedAt: 'not-now', productId: '1', quantity: 1 },
        { addedAt: 'now', productId: '2', quantity: 1 },
      ],
    };
    (useCartStore as unknown as Mock).mockReturnValue(mockCart);
    render(
      <MemoryRouter>
        <BurgerMenu />
      </MemoryRouter>,
    );
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    const itemsCounter = screen.getByTestId('cart-items-count');
    expect(itemsCounter.textContent).toEqual(`${mockCart.lineItems.length}`);
  });
});
