import { FC, ReactNode } from 'react';

import { Stack, Typography } from '@mui/material';

import { Filters } from '../filters/filters';
import { BasicBreadcrumbs } from './breadcrumbs';

export const CatalogWrapper: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <Stack className="flex flex-wrap" sx={{ padding: { lg: '0 2%', xs: '0 1%' } }}>
      <BasicBreadcrumbs />
      <Typography
        className="mx-5 my-auto text-center"
        sx={{ fontSize: { lg: '0 10%', md: '0 7%', sm: '32px', xs: '26px' } }}
        variant="h3"
      >
        Catalog
      </Typography>

      <Filters />

      {children}
    </Stack>
  );
};
