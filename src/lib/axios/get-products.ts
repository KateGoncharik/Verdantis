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
  const allSelectedColors = params.get('color')?.split('-');
  const size = params.get('size');
  const category = params.get('category');

  let filtered: Product[] = allProducts;
  if (category) {
    filtered = getFilteredByCategoryProducts(category);
  }
  if (allSelectedColors) {
    console.log('color:', allSelectedColors);

    filtered = filtered.filter((product) => {
      const colorValue = product.masterVariant.attributes[0].value;
      if (Array.isArray(colorValue)) {
        return allSelectedColors.some((item) => colorValue.includes(item));
      }
    });
  }
  if (size) {
    console.log('size:', size);
    filtered = filtered.filter((product) => product.masterVariant.attributes.includes({ name: 'size', value: size }));
  }
  const products = filtered;
  const productsForPage = getProductsForPage(page, products);

  setProducts(productsForPage);
  setTotal(products.length);

  return filtered;
};
