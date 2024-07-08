import { getAllProducts } from '@/lib/axios/get-all-products';
import { type Product } from '@/lib/axios/schemas/product-schema';
import { PAGE_LIMIT } from '@/pages/catalog-page-constants';

export const groupProducts = async (): Promise<Array<Product[]>> => {
  const allProducts = await getAllProducts();
  const paginationProducts: Array<Product[]> = [];
  for (let productIndex = 0; productIndex < allProducts.length; productIndex += PAGE_LIMIT) {
    const chunk = allProducts.slice(productIndex, productIndex + PAGE_LIMIT);
    paginationProducts.push(chunk);
  }
  return paginationProducts;
};

export const getProductsForPage = async (page: number): Promise<Product[]> => {
  const groupedProducts = await groupProducts();
  const productsGroupIndex = page - 1;
  return groupedProducts[productsGroupIndex] ? groupedProducts[productsGroupIndex] : [];
};
