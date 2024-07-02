import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { AddressWrapper } from './address-wrapper';

describe('AddressWrapper', () => {
  it('should render', () => {
    render(<AddressWrapper>{<>Test child</>}</AddressWrapper>);

    const child = screen.getByText(/test child/i);

    expect(child).toBeInTheDocument();
  });
});
