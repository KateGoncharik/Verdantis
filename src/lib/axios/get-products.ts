import { Dispatch, SetStateAction } from 'react';

import allProducts from '@/data/exported-products.json';
import { getFilteredByCategoryProducts } from '@/features/catalog/categories-navigation/requests';
import { sortingOptions } from '@/features/catalog/filters/filters-constants';
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
  const sort = params.get('sort');

  let filtered: Product[] = allProducts;
  if (category) {
    filtered = getFilteredByCategoryProducts(category);
  }
  if (allSelectedColors) {
    filtered = filtered.filter((product) => {
      const colorValue = product.masterVariant.attributes[0].value;
      if (Array.isArray(colorValue)) {
        return allSelectedColors.some((item) => colorValue.includes(item));
      }
    });
  }
  if (size) {
    filtered = filtered.filter((product) => product.masterVariant.attributes.includes({ name: 'size', value: size }));
  }
  if (sort) {
    if (sort === sortingOptions[0]) {
      filtered = filtered.sort((a, b) => {
        return a.masterVariant.prices[0].value.centAmount - b.masterVariant.prices[0].value.centAmount;
      });
    } else if (sort === sortingOptions[1]) {
      filtered = filtered.sort((a, b) => {
        return b.masterVariant.prices[0].value.centAmount - a.masterVariant.prices[0].value.centAmount;
      });
    } else if (sort === sortingOptions[2]) {
      filtered = filtered.sort((a, b) => a.name['en-US'].localeCompare(b.name['en-US']));
    } else if (sort === sortingOptions[3]) {
      filtered = filtered.sort((a, b) => a.name['en-US'].localeCompare(b.name['en-US'])).reverse();
    }
  }
  const products = filtered;
  const productsForPage = getProductsForPage(page, products);

  setProducts(productsForPage);
  setTotal(products.length);

  return filtered;
};
