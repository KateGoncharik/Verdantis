import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@mui/material';

import { FilterValues } from './filters';
import { formatFilters } from './format-filters';

export const ApplyFilters: FC<{ values: FilterValues }> = ({ values }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onClick = (): void => {
    const filters = formatFilters(values);
    searchParams.set('color', filters.color);
    searchParams.set('size', filters.size);
    searchParams.set('sort', filters.sort);
    setSearchParams(searchParams);
  };
  return (
    <Button
      className="w-48"
      onClick={onClick}
      sx={{ ':hover': { backgroundColor: 'primary.light', transition: '2s' }, transition: '2s' }}
      variant="contained"
    >
      Apply filters
    </Button>
  );
};
