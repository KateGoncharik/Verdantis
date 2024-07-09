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

export const getFilteredProducts = (categoryId: string): Product[] => {
  // parents have to include children +
  const selectedCategory = allCategories.find((category) => category.id === categoryId);
  if (selectedCategory?.parentId === '') {
    const childCategories = getChildCategories(selectedCategory.externalId);
    const products: Product[] = childCategories.flatMap((childCategory) => {
      return getProductsByCategory(childCategory.id);
    });
    return products;
  }

  return getProductsByCategory(categoryId);
};

export function getProductsByCategory(categoryId: string): Product[] {
  // we need to  check all existing categories of  product to fit passed argument +

  const allProductsForCategory: Product[] = [];
  allProducts.forEach((product) => {
    product.categories.forEach((_, categoryIndex) => {
      if (product.categories[categoryIndex].id === categoryId) {
        allProductsForCategory.push(product);
      }
    });
  });
  return allProductsForCategory;
}

export function getCategoryByKey(categoryKey: string): Category {
  const foundCategory = allCategories.find((category) => category.key === categoryKey);
  if (!foundCategory) {
    throw new Error(`Category with key:${categoryKey} does not exist`);
  }
  return foundCategory;
}
