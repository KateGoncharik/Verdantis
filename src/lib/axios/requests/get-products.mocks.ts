const results = [
  {
    categories: [
      {
        id: 'b86a46f7-70a9-483f-b74b-a7b4ac95ddda',
        typeId: 'category',
      },
    ],
    categoryOrderHints: {},
    createdAt: '2024-05-23T05:54:46.722Z',
    description: {
      'en-US': 'A timeless bouquet featuring a dozen fresh red roses, elegantly arranged with greenery.',
    },
    hasStagedChanges: false,
    id: '5a2b875e-68f9-42c2-83f7-67f5418a55ca',
    key: 'classic_rose_bouquet',
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
    metaDescription: {},
    metaTitle: {},
    name: {
      en: 'Classic Rose Bouquet',
      'en-US': 'Classic Rose Bouquet',
    },
    priceMode: 'Embedded',
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
  },
  {
    categories: [
      {
        id: 'd1592da9-553f-44e2-924d-2288d6566f47',
        typeId: 'category',
      },
    ],
    categoryOrderHints: {},
    createdAt: '2024-05-23T06:31:28.786Z',
    description: {
      'en-US': 'A low-maintenance snake plant in a decorative pot, perfect for indoor spaces.',
    },
    hasStagedChanges: false,
    id: 'c5c10a45-c4e6-4c42-a8c3-57f4c5215a6b',
    key: 'snake_plant',
    lastModifiedAt: '2024-06-04T13:20:15.444Z',
    masterVariant: {
      attributes: [
        {
          name: 'color',
          value: ['green'],
        },
        {
          name: 'size',
          value: 'small',
        },
      ],
      id: 1,
      images: [
        {
          dimensions: {
            h: 1024,
            w: 1024,
          },
          url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/snake_plant_standard-VyOAw-L5.jpg',
        },
        {
          dimensions: {
            h: 1024,
            w: 1024,
          },
          url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/snake_plant_standard-ZNXsOES9.jpg',
        },
        {
          dimensions: {
            h: 1024,
            w: 1024,
          },
          url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/snake_plant_standard-_z_bhUnP.jpg',
        },
        {
          dimensions: {
            h: 1024,
            w: 1024,
          },
          url: 'https://images.cdn.us-central1.gcp.commercetools.com/0e9a8cb4-e1d4-4736-bb77-1646edd8e799/snake_plant_standard-xokoo0jC.jpg',
        },
      ],
      prices: [
        {
          id: '350cbbc6-70b2-4ef6-8b4b-072e70e7c449',
          key: 'snake_plant_standard_price',
          validFrom: '2024-05-30T21:00:00.000Z',
          validUntil: '2024-06-29T21:00:00.000Z',
          value: {
            centAmount: 1299,
            currencyCode: 'EUR',
            fractionDigits: 2,
            type: 'centPrecision',
          },
        },
      ],
    },
    metaDescription: {},
    metaTitle: {},
    name: {
      en: 'Snake Plant',
      'en-US': 'Snake Plant',
    },
    priceMode: 'Embedded',
    productType: {
      id: '79744707-8ee7-452e-ac68-dde481eba9da',
      typeId: 'product-type',
    },
    published: true,
    searchKeywords: {},
    slug: {
      'en-US': 'snake-plant',
    },
    variants: [],
    version: 23,
  },
];

const data = {
  count: 7,
  limit: 7,
  offset: 0,
  results: results,
  total: 30,
};

export { data, results };
