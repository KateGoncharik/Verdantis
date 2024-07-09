import { type Product } from '@/lib/axios/schemas/product-schema';
import { PAGE_LIMIT } from '@/pages/catalog-page-constants';

export const groupProducts = (products: Product[]): Array<Product[]> => {
  const paginationProducts: Array<Product[]> = [];
  for (let productIndex = 0; productIndex < products.length; productIndex += PAGE_LIMIT) {
    const chunk = products.slice(productIndex, productIndex + PAGE_LIMIT);
    paginationProducts.push(chunk);
  }
  return paginationProducts;
};

export const getProductsForPage = (page: number, products: Product[]): Product[] => {
  const groupedProducts = groupProducts(products);
  const productsGroupIndex = page - 1;
  return groupedProducts[productsGroupIndex] ? groupedProducts[productsGroupIndex] : [];
};
