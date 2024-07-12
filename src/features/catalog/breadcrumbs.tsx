import { FC, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation, useSearchParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { formatCategoryKey } from './catalog-wrapper/helper';
import { getCategoryByKey } from './categories-navigation/requests';
import { notSelectedCategoryValue } from './constants';

const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
  event.preventDefault();
};

export const BasicBreadcrumbs: FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchParamsRef = useRef(setSearchParams);

  const pathArray = location.pathname.split('/');
  const lastPath = pathArray[pathArray.length - 1];
  const decodedPath = decodeURIComponent(lastPath);
  const correctKey = formatCategoryKey(decodedPath);

  useEffect(() => {
    const setSearchParams = setSearchParamsRef.current;
    searchParams.set('category', notSelectedCategoryValue);
    const startPathOfCatalog = 'catalog';
    if (lastPath === startPathOfCatalog) {
      setSearchParams(searchParams);
      return;
    }
    const category = getCategoryByKey(correctKey);

    if (!category) {
      return;
    }
    const { id } = category;
    searchParams.set('category', id);
    setSearchParams(searchParams);
  }, [correctKey, searchParams, lastPath]);

  const crumbs = pathArray.map((path, index) => {
    const currentCategoryPath = index === pathArray.length - 1;
    const pathSegment = pathArray.slice(1, index + 1).join('/');
    const linkForBreadcrumb = `/${pathSegment}${location.search}`;

    return currentCategoryPath ? (
      <Typography color="inherit" component={'h3'} key={path} variant="h5">
        {decodeURIComponent(path)}
      </Typography>
    ) : (
      <div key={path} onClick={handleClick} role="presentation">
        <Link color="inherit" component={RouterLink} key={path} to={linkForBreadcrumb} underline="hover">
          {decodeURIComponent(path)}
        </Link>
      </div>
    );
  });

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      className="m-3"
      sx={{ fontSize: { lg: '22px', md: '22px', sm: '18px', xs: '15px' } }}
    >
      {...crumbs}
    </Breadcrumbs>
  );
};
