import allProducts from '@/data/exported-products.json';

import { Product } from './schemas/product-schema';

export const getProductById = (id: string): Product => {
  const result = allProducts.find((product) => product.id === id);
  if (!result) {
    throw new Error(`No product was found with id:${id}`);
  }

  return result;
};
