import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { RegistrationAddress } from '@/features/registration-form/registration-form-types';

import { AddressCard } from '.';

describe('Address-card component', () => {
  const addressInfo: RegistrationAddress = {
    city: 'New York',
    country: 'USA',
    postalCode: '10012',
    streetName: 'Broadway',
  };
  it('should render city, country, postalCode, streetName', () => {
    render(<AddressCard addressInfo={addressInfo} isDefault={false} />);
    expect(screen.getByText(new RegExp(addressInfo.city, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(addressInfo.country, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(addressInfo.postalCode, 'i'))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(addressInfo.streetName, 'i'))).toBeInTheDocument();
  });
  it('should have class bg-gray-50 if address is not default', () => {
    render(<AddressCard addressInfo={addressInfo} isDefault={false} />);
    const outerDiv = screen.getByTestId('address-outer');
    expect(outerDiv.classList.contains('bg-gray-50')).toBeTruthy();
  });
  it('should have class bg-green-50 if address is default', () => {
    render(<AddressCard addressInfo={addressInfo} isDefault={true} />);
    const outerDiv = screen.getByTestId('address-outer');
    expect(outerDiv.classList.contains('bg-green-50')).toBeTruthy();
  });
});
