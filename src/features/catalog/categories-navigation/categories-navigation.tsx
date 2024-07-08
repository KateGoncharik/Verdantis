import { FC, ReactNode, useEffect, useState } from 'react';

import { List } from '@mui/material';

import { Category } from '@/lib/axios/schemas/category-schema';

import { CategoryItem } from './category-item';
import { getChildCategories, getParentCategories } from './sasss';

export type CategoryData = {
  children: Category[];
  id: string;
  name: string;
};

export const CategoriesNavigation: FC<{
  children?: ReactNode;
}> = () => {
  const [categories, setCategories] = useState<CategoryData[]>([]);

  useEffect(() => {
    const parentCategories = getParentCategories();
    const childCategories = parentCategories.map((category) => getChildCategories(category.id));
    console.log('parent cat', parentCategories);
    const allCategoriesData = parentCategories.map((childCategory, childCategoryIndex) => ({
      children: childCategories[childCategoryIndex],
      id: childCategory.id,
      name: childCategory.name,
    }));
    setCategories(allCategoriesData);
  }, []);

  return categories.length > 0 ? (
    <List
      aria-labelledby="nested-list-subheader"
      component="nav"
      sx={{ width: { lg: '20%', md: '30%', sm: '35%', xs: '45%' } }}
    >
      {categories.map((fetchedCategory) => {
        return <CategoryItem category={fetchedCategory} key={fetchedCategory.id} />;
      })}
    </List>
  ) : (
    <>no categories available</>
  );
};
