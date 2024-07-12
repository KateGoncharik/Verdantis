import { Dispatch, SetStateAction } from 'react';

import allProducts from '@/data/exported-products.json';
import { getFilteredByCategoryProducts } from '@/features/catalog/categories-navigation/requests';
import { getProductsForPage } from '@/features/pagination/get-products-for-pagination';

import { Product } from './schemas/product-schema';

export const getProducts = (
  params: URLSearchParams,
  setProducts: Dispatch<SetStateAction<Product[] | null>>,
  setTotal: Dispatch<SetStateAction<number>>,
  page: number,
): Product[] => {
  const color = params.get('color')?.split('-');
  const size = params.get('size');
  const category = params.get('category');

  let filtered: Product[] = allProducts;
  if (category) {
    filtered = getFilteredByCategoryProducts(category);
  }
  if (color) {
    console.log('color:', color);

    filtered = filtered.filter((product) => product.masterVariant.attributes.includes({ name: 'color', value: color }));
  }
  if (size) {
    console.log('size:', size);
    filtered = filtered.filter((product) => product.masterVariant.attributes.includes({ name: 'size', value: size }));
  }
  console.log(filtered);
  const products = filtered;
  const productsForPage = getProductsForPage(page, products);

  setProducts(productsForPage);
  setTotal(products.length);

  return filtered;
};
