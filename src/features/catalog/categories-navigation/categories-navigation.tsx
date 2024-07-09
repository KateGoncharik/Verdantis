import { FC, ReactNode, useEffect, useState } from 'react';

import { List } from '@mui/material';

import { Category } from '@/lib/axios/schemas/category-schema';

import { CategoryItem } from './category-item';
import { getChildCategories, getParentCategories } from './requests';

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
    const childCategories = parentCategories.map((category) => {
      if (!category.externalId) {
        throw new Error('ExternalId expected');
      }
      return getChildCategories(category.externalId);
    });
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
      {categories.map((category) => {
        return <CategoryItem category={category} key={category.id} />;
      })}
    </List>
  ) : (
    <>no categories available</>
  );
};
