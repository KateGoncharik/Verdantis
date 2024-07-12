import { z } from 'zod';

import { priceSchema } from './schemas/get-product-by-id.schema';

export type ProductImages = ProductImage[];

type ProductImage = {
  dimensions: {
    h: number;
    w: number;
  };
  label?: string;
  url: string;
};

export type Price = z.infer<typeof priceSchema>;
