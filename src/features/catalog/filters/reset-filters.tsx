import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@mui/material';

export const ResetFilters: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onClick = (): void => {
    searchParams.delete('size');
    searchParams.delete('color');
    searchParams.delete('sort');

    setSearchParams(searchParams);
  };
  return (
    <Button
      className="w-48"
      onClick={onClick}
      sx={{ ':hover': { bgcolor: 'primary.light', transition: '2s' }, transition: '2s' }}
      variant="contained"
    >
      Reset filters
    </Button>
  );
};
