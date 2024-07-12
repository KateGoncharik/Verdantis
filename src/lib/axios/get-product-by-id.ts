import { ProductInfo } from '@/components/product-paper/product-paper';
import allProducts from '@/data/exported-products.json';

export const getProductById = (id: string): ProductInfo => {
  const result = allProducts.find((product) => product.id === id);
  if (!result) {
    throw new Error(`No product was found with id:${id}`);
  }

  const prices = result.masterVariant.prices;
  const name = result.name['en-US'];
  const description = result.description['en-US'];
  const images = result.masterVariant.images;
  return { description, images, name, prices };
};
