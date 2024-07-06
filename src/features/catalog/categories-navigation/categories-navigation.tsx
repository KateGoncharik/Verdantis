import {
  FC,
  ReactNode,
  //  useState
} from 'react';

// import { List } from '@mui/material';

// import { getParentCategories } from '@/lib/axios/requests/catalog/get-parent-categories';
// import { getChildCategories } from '@/lib/axios/requests/get-child-categories';
// import { Category } from '@/lib/axios/requests/schemas/get-categories-schema';
// import { useTokenStore } from '@/stores/token-store';

// import { CategoryItem } from './category-item';

export type CategoryData = {
  // children: Category[];
  id: string;
  name: string;
};

export const CategoriesNavigation: FC<{
  children?: ReactNode;
}> = () => {
  // const [categories, setCategories] = useState<CategoryData[]>([]);
  // const { token } = useTokenStore();

  // useEffect(() => {
  //   if (!token) {
  //     throw new Error('Token expected');
  //   }
  //   getParentCategories(token).then(
  //     (parentCategoriesResponse) => {
  //       const childCategoryPromises = parentCategoriesResponse.map((category) =>
  //         getChildCategories(category.id, token),
  //       );

  //       Promise.all(childCategoryPromises).then(
  //         (childCategoriesResponse) => {
  //           const allCategoriesData = parentCategoriesResponse.map((childCategory, childCategoryIndex) => ({
  //             children: childCategoriesResponse[childCategoryIndex],
  //             id: childCategory.id,
  //             name: childCategory.name['en-US'],
  //           }));
  //           setCategories(allCategoriesData);
  //         },
  //         (err) => console.error(err),
  //       );
  //     },

  //     (err) => {
  //       console.error(err);
  //     },
  //   );
  // }, [token]);

  return <>no categories available</>;
};
