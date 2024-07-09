import { FC, useState } from 'react';

import { useMediaQuery } from '@mui/material';

import { theme } from '@/config/theme';

import { FiltersDesktop } from './filters-component/filters-desktop';
import { FiltersSmall } from './filters-component/filters-small';
export type ColorFilter = Record<string, boolean>;

export type FilterValues = { color: ColorFilter; size: string; sort: string };

export const Filters: FC = () => {
  const [filtersValues, setFiltersValues] = useState<FilterValues>({
    color: { blue: false, green: false, pink: false, white: false, yellow: false },
    size: '',
    sort: '',
  });
  const matches = useMediaQuery(theme.breakpoints.up('lg'));
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

  return matches ? (
    <FiltersDesktop setters={{ setterForColor, setterForSize, setterForSort }} values={filtersValues} />
  ) : (
    <FiltersSmall setters={{ setterForColor, setterForSize, setterForSort }} values={filtersValues} />
  );
};
