import allProducts from '@/data/exported-products.json';
import { type Product } from '@/lib/axios/schemas/product-schema';
import { PAGE_LIMIT } from '@/pages/catalog-page-constants';

export const groupProducts = (): Array<Product[]> => {
  const paginationProducts: Array<Product[]> = [];
  for (let productIndex = 0; productIndex < allProducts.length; productIndex += PAGE_LIMIT) {
    const chunk = allProducts.slice(productIndex, productIndex + PAGE_LIMIT);
    paginationProducts.push(chunk);
  }
  return paginationProducts;
};

export const getProductsForPage = (page: number): Product[] => {
  const groupedProducts = groupProducts();
  const productsGroupIndex = page - 1;
  return groupedProducts[productsGroupIndex] ? groupedProducts[productsGroupIndex] : [];
};
