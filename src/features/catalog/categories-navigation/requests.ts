import allCategories from '@/data/categories.json';
import allProducts from '@/data/exported-products.json';
import { Category } from '@/lib/axios/schemas/category-schema';
import { Product } from '@/lib/axios/schemas/product-schema';

export function getParentCategories(): Category[] {
  return allCategories.filter((category) => category.parentId === '');
}

export function getChildCategories(parentId: string): Category[] {
  return allCategories.filter((category) => category.parentId === parentId);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return allProducts.filter((product) => product.categories[0].id === categoryId);
}

export function getCategoryByKey(categoryKey: string): Category {
  const foundCategory = allCategories.find((category) => category.key === categoryKey);
  if (!foundCategory) {
    throw new Error(`Category with key:${categoryKey} does not exist`);
  }
  return foundCategory;
}
