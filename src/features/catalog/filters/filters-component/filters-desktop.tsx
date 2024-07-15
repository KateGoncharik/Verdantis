import { FC } from 'react';

import { Stack } from '@mui/material';

import { ApplyFilters } from '../apply-filters';
import { ColorFilters } from '../color-filters';
import { ColorFilter, FilterValues } from '../filters';
import { ResetFilters } from '../reset-filters';
import { SizeSelect } from '../size-select';
import { SortBySelect } from '../sort';

export const FiltersDesktop: FC<{
  setters: {
    setterForColor: (value: ColorFilter) => void;
    setterForSize: (value: string) => void;
    setterForSort: (value: string) => void;
  };
  values: FilterValues;
}> = ({ setters, values }) => {
  const { setterForColor, setterForSize, setterForSort } = setters;
  return (
    <Stack className="flex-column w-1/2 justify-center p-2">
      <Stack
        className="gap-2"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Stack flexDirection="row">
          <Stack flexDirection="row" justifyContent="space-between">
            <SizeSelect setter={setterForSize} />
            <SortBySelect setter={setterForSort} />
            <ColorFilters setter={setterForColor} />
          </Stack>
        </Stack>

        <Stack className="gap-2">
          <ApplyFilters values={values} />
          <ResetFilters />
        </Stack>
      </Stack>
    </Stack>
  );
};
