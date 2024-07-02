import { Link as RouterLink, useSearchParams } from 'react-router-dom';

import { List, ListItemButton } from '@mui/material';

import type { CategoryData } from './categories-navigation';

export const CategoryItem = ({ category }: { category: CategoryData }): JSX.Element => {
  const { children, id, name } = category;
  const parentName = name;
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick: React.MouseEventHandler<HTMLElement> = (e): void => {
    const eventTarget = e.target;
    if (!eventTarget || !(eventTarget instanceof HTMLElement)) {
      throw new Error('Target with id expected');
    }
    const targetId = eventTarget.id;
    searchParams.set('category', targetId);
    setSearchParams(searchParams);
  };
  const handleParentClick: React.MouseEventHandler<HTMLElement> = (): void => {
    searchParams.set('category', id);
    setSearchParams(searchParams);
  };
  const parentLinkQuery = formatCategoryLinkQuery(id);
  return (
    <List
      aria-labelledby="nested-list-subheader"
      component="nav"
      subheader={
        <ListItemButton
          component={RouterLink}
          id={id}
          onClick={(e) => handleParentClick(e)}
          sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
          to={`${name.toLowerCase()}?${parentLinkQuery}`}
        >
          {name}
        </ListItemButton>
      }
      sx={{ bgcolor: 'primary.main', width: '100%' }}
    >
      {children.map((childCategory) => {
        const { id, key, name } = childCategory;
        const enChildName = name['en-US'];
        const childLinkQuery = formatCategoryLinkQuery(id);
        return (
          <ListItemButton
            component={RouterLink}
            id={id}
            key={key}
            onClick={(e) => handleClick(e)}
            sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}
            to={`${parentName.toLowerCase()}/${enChildName.toLowerCase()}?${childLinkQuery}`}
          >
            {enChildName}
          </ListItemButton>
        );
      })}
    </List>
  );
};

const formatCategoryLinkQuery = (id: string): string => {
  const urlSearchParams = new URLSearchParams(location.search);
  const allSearchParams = urlSearchParams.entries();
  const parentCategoryLink = [];
  for (const [key, value] of allSearchParams) {
    if (key === 'category' && value.length > 0) {
      parentCategoryLink.push(`category=${id}`);
    }
    if (key === 'size') {
      parentCategoryLink.push(`size=${value}`);
    }
  }
  return parentCategoryLink.join('&');
};
