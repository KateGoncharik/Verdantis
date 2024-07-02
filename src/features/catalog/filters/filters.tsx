import { FC, useState } from 'react';

import { Stack, Typography } from '@mui/material';

import { Search } from '@/features/catalog/filters/search';

import { ApplyFilters } from './apply-filters';
import { ColorFilters } from './color-filters';
import { ResetFilters } from './reset-filters';
import { SizeSelect } from './size-select';
import { SortBySelect } from './sort-by-select';

export type ColorFilter = Record<string, boolean>;

export type FilterValues = { color: ColorFilter; size: string; sort: string };

export const Filters: FC = () => {
  const [filtersValues, setFiltersValues] = useState<FilterValues>({
    color: { blue: false, green: false, pink: false, white: false, yellow: false },
    size: '',
    sort: '',
  });

  const setterForSize = (value: string): void => {
    setFiltersValues({ ...filtersValues, size: value });
  };

  const setterForSort = (value: string): void => {
    setFiltersValues({ ...filtersValues, sort: value });
  };

  const setterForColor = (value: ColorFilter): void => {
    setFiltersValues((prevValues) => ({
      ...prevValues,
      color: {
        ...value,
      },
    }));
  };

  return (
    <Stack
      className="flex "
      sx={{
        alignItems: 'center',
        backgroundColor: 'primary.light',
        color: 'primary.contrastText',
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: '1%',
      }}
    >
      <Typography className="mx-5 my-auto text-center" color="background.paper" component={'h3'} variant="h4">
        Filters
      </Typography>
      <Stack flexDirection={'row'} flexWrap={'wrap'}>
        <Stack flexDirection={'column'}>
          <Stack flexDirection={'row'}>
            <SizeSelect setter={setterForSize} />
            <SortBySelect setter={setterForSort} />
          </Stack>
          <ColorFilters setter={setterForColor} />
        </Stack>
        <Search />
      </Stack>

      <Stack>
        <ApplyFilters values={filtersValues} />
        <ResetFilters />
      </Stack>
    </Stack>
  );
};
