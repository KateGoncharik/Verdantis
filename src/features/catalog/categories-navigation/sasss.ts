import allCategories from '@/data/categories.json';
import { Category } from '@/lib/axios/schemas/category-schema';

export function getParentCategories(): Category[] {
  return allCategories.filter((category) => category.parentId === '');
}

export function getChildCategories(parentId: string): Category[] {
  return allCategories.filter((category) => category.parentId === parentId);
}

// export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
//   const queryArgs: ProductsRequestArguments = { limit: 7, offset };
//   const query = `/search?limit=${queryArgs.limit}&offset=${queryArgs.offset}&filter=categories.id: subtree("${categoryId}")`;
// }
