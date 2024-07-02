const data = {
  categories: [
    {
      id: 'b86a46f7-70a9-483f-b74b-a7b4ac95ddda',
      typeId: 'category',
    },
  ],
  createdAt: '2024-05-23T05:54:46.722Z',
  description: {
    'en-US': 'A timeless bouquet featuring a dozen fresh red roses, elegantly arranged with greenery.',
  },
  hasStagedChanges: false,
  id: '5a2b875e-68f9-42c2-83f7-67f5418a55ca',
  lastModifiedAt: '2024-06-04T13:20:15.329Z',
  masterVariant: {
    attributes: [
      {
        name: 'color',
        value: ['green', 'red'],
      },
      {
        name: 'size',
        value: 'medium',
      },
    ],
    id: 1,
    images: [
      {
        dimensions: {
          h: 1024,
          w: 1024,
        },
        url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/classic_rose_bouquet-oBl_4aEu.jpg',
      },
      {
        dimensions: {
          h: 1024,
          w: 1024,
        },
        url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/classic_rose_bouquet-gBL67E9D.jpg',
      },
      {
        dimensions: {
          h: 1024,
          w: 1024,
        },
        url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/classic_rose_bouquet-SVfPmFL7.jpg',
      },
      {
        dimensions: {
          h: 1024,
          w: 1024,
        },
        url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/classic_rose_bouquet-N496xh6R.jpg',
      },
    ],
    prices: [
      {
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
      },
    ],
  },
  name: {
    en: 'Classic Rose Bouquet',
    'en-US': 'Classic Rose Bouquet',
  },
  productType: {
    id: '8ca55f27-b8ef-4321-aa32-7313517e00ba',
    typeId: 'product-type',
  },
  published: true,
  searchKeywords: {},
  slug: {
    'en-US': 'classic-rose-bouquet',
  },
  variants: [],
  version: 25,
};

const expectedResult = {
  description: 'A timeless bouquet featuring a dozen fresh red roses, elegantly arranged with greenery.',
  images: [
    {
      dimensions: {
        h: 1024,
        w: 1024,
      },
      url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/classic_rose_bouquet-oBl_4aEu.jpg',
    },
    {
      dimensions: {
        h: 1024,
        w: 1024,
      },
      url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/classic_rose_bouquet-gBL67E9D.jpg',
    },
    {
      dimensions: {
        h: 1024,
        w: 1024,
      },
      url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/classic_rose_bouquet-SVfPmFL7.jpg',
    },
    {
      dimensions: {
        h: 1024,
        w: 1024,
      },
      url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/classic_rose_bouquet-N496xh6R.jpg',
    },
  ],
  name: 'Classic Rose Bouquet',
  prices: [
    {
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
    },
  ],
};

export { data, expectedResult };
