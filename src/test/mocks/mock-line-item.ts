import { vi } from 'vitest';

const mockSetterFn = vi.fn();

export const mockSetterForCartRef = {
  current: mockSetterFn,
};

export const mockLineItem = {
  id: 'test-id',
  images: [
    {
      dimensions: {
        h: 1400,
        w: 1400,
      },
      url: 'https://commercetools.com/cli/data/253245821_1.jpg',
    },
  ],
  name: { 'en-US': 'test-name' },
  price: {
    id: 'test-price-id',
    key: 'test-key',
    validFrom: '00-00-1900',
    validUntil: '00-00-1900',
    value: {
      centAmount: 0,
      currencyCode: 'EUR',
      fractionDigits: 0,
      type: 'no-type',
    },
  },
  productId: 'test-product-id',
  productType: 'no-type',
  quantity: 1,
  totalPrice: { centAmount: 0, currencyCode: 'EUR', fractionDigits: 0, type: 'no-type' },
  variant: {
    attributes: [
      {
        name: 'Size',
        value: {
          name: 'Color',
          value: 'Blue',
        },
      },
    ],
    id: 123,
    images: [
      {
        dimensions: {
          h: 200,
          w: 300,
        },
        label: 'Product Image',
        url: 'https://example.com/product-image.jpg',
      },
    ],
    prices: [
      {
        discounted: {
          discount: {
            id: 'discount-id',
            typeId: '',
          },
          value: {
            centAmount: 0,
            currencyCode: 'EUR',
            fractionDigits: 0,
            type: 'no-type',
          },
        },
        id: 'price_123',
        key: 'price_key',
        validFrom: '2022-01-01T00:00:00Z',
        validUntil: '2022-12-31T23:59:59Z',
        value: {
          centAmount: 0,
          currencyCode: 'EUR',
          fractionDigits: 0,
          type: 'no-type',
        },
      },
    ],
  },
};
