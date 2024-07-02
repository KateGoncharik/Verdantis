import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { Price } from '@/lib/axios/requests/get-product-by-id.types';
import { stylePrice } from '@/pages/product-page.constants';

import { PricesBlock } from './prices-block';

describe('PricesBlock component', () => {
  it('should render "Price unavailable" if price was not provided', () => {
    render(<PricesBlock />);
    const priceUnavailable = screen.getByText(/price unavailable/i);
    expect(priceUnavailable).toBeTruthy();
  });
  it('should render normal price if normal price was provided and no discount price', () => {
    const price: Price = {
      id: '1df0bacc-adf1-4d3f-9dbd-8882def9f079',
      key: 'classic_rose_bouquet_standard_price',
      validFrom: '2024-05-30T21:00:00.000Z',
      validUntil: '2024-06-29T21:00:00.000Z',
      value: {
        centAmount: 2999,
        currencyCode: 'EUR',
        fractionDigits: 2,
        type: 'centPrecision',
      },
    };
    render(<PricesBlock price={price} stylePrice={stylePrice} />);
    const normalPrice = screen.getByText(/29.99/i);
    expect(normalPrice).toBeTruthy();
  });
  it('should render normal and discounted price if both were provided', () => {
    const price: Price = {
      discounted: {
        discount: {
          id: 'ff29af8a-b8fa-4e31-9b41-d6e7322c3aec',
          typeId: 'product-discount',
        },
        value: {
          centAmount: 15999,
          currencyCode: 'EUR',
          fractionDigits: 2,
          type: 'centPrecision',
        },
      },
      id: '82885822-b340-4af2-9bbb-b3c7ce5c4e7a',
      key: 'bridal_rose_cascade_standard_price',
      validFrom: '2024-05-30T21:00:00.000Z',
      validUntil: '2024-06-29T21:00:00.000Z',
      value: {
        centAmount: 19999,
        currencyCode: 'EUR',
        fractionDigits: 2,
        type: 'centPrecision',
      },
    };
    render(<PricesBlock price={price} />);
    const normalPrice = screen.getByText(/199.99/i);
    const discountPrice = screen.getByText(/159.99/i);
    expect(normalPrice).toBeTruthy();
    expect(discountPrice).toBeTruthy();
  });
});
