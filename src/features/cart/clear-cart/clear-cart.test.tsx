import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { mockSetterForCartRef } from '@/test/mocks/mock-line-item';

import { ClearCart } from '.';

describe('ClearCart', () => {
  it('should render', () => {
    render(<ClearCart setterForCartRef={mockSetterForCartRef} />);
    const clearButton = screen.getByRole('button');

    expect(clearButton).toBeInTheDocument();
    expect(clearButton).toHaveTextContent(/clear cart/i);
  });

  it('should open dialog upon click', async () => {
    const user = userEvent.setup();
    render(<ClearCart setterForCartRef={mockSetterForCartRef} />);

    await user.click(screen.getByRole('button', { name: /clear cart/i }));

    const confirmText = screen.getByText(/are you sure?/i);
    expect(confirmText).toBeInTheDocument();
  });
});
