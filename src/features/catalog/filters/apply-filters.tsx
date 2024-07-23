import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@mui/material';

import { FilterValues } from './filters';
import { formatFilters } from './format-filters';

export const ApplyFilters: FC<{ values: FilterValues }> = ({ values }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onClick = (): void => {
    const filters = formatFilters(values);
    Object.entries(filters).forEach(([key, value]) => {
      if (key) {
        searchParams.set(key, value);
      }
    });
    setSearchParams(searchParams);
  };
  return (
    <Button
      className="w-48"
      onClick={onClick}
      sx={{ ':hover': { bgcolor: 'primary.light', transition: '2s' }, transition: '2s' }}
      variant="contained"
    >
      Apply filters
    </Button>
  );
};
