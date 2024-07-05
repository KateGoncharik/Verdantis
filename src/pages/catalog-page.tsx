import { FC } from 'react';

import { Stack, Typography } from '@mui/material';

import { CatalogWrapper } from '@/features/catalog/catalog-wrapper';
import { CategoriesNavigation } from '@/features/catalog/categories-navigation';

const CatalogPage: FC = () => {
  return (
    <CatalogWrapper>
      <Stack
        className={'flex-row justify-between align-middle'}
        sx={{ margin: { lg: '2% 5%', md: '2% 4%', sm: '1% 2%', xs: '1%' } }}
      >
        <CategoriesNavigation />
        {
          <Typography className="p-5" component={'h2'} variant="h3">
            No data available. Try to reload the page
          </Typography>
        }
      </Stack>
    </CatalogWrapper>
  );
};

export default CatalogPage;
