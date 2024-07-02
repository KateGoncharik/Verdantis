import { FC, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation, useSearchParams } from 'react-router-dom';

import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useQuery } from '@tanstack/react-query';

import { getCategoryByKey } from '@/lib/axios/requests/catalog/get-category-by-key';
import { useTokenStore } from '@/stores/token-store';

import { indexOfReceivedCategory, notSelectedCategoryValue } from '../constants';
import { formatCategoryKey } from './helper';

const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
  event.preventDefault();
};

export const BasicBreadcrumbs: FC = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const setSearchParamsRef = useRef(setSearchParams);
  const { token } = useTokenStore();

  const pathArray = location.pathname.split('/');
  const lastPath = pathArray[pathArray.length - 1];
  const decodedPath = decodeURIComponent(lastPath);
  const correctKey = formatCategoryKey(decodedPath);
  const { data } = useQuery({
    queryFn: async () => {
      if (!token) {
        throw new Error('Token expected');
      }
      return await getCategoryByKey(correctKey, token);
    },
    queryKey: ['category', correctKey, token],
    throwOnError: true,
  });
  useEffect(() => {
    const setSearchParams = setSearchParamsRef.current;
    searchParams.set('category', notSelectedCategoryValue);
    const startPathOfCatalog = 'catalog';
    if (lastPath === startPathOfCatalog) {
      setSearchParams(searchParams);
      return;
    }
    if (!data || data?.length === 0) {
      return;
    }
    const { id } = data[indexOfReceivedCategory];
    searchParams.set('category', id);
    setSearchParams(searchParams);
  }, [data, searchParams, lastPath]);

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
