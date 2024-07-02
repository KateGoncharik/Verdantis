import { FC } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button } from '@mui/material';

export const ResetFilters: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const onClick = (): void => {
    searchParams.set('size', '');
    searchParams.set('color', '');
    searchParams.set('sort', '');

    setSearchParams(searchParams);
  };
  return (
    <Button
      className="w-48"
      onClick={onClick}
      sx={{ ':hover': { backgroundColor: 'primary.light', transition: '2s' }, transition: '2s' }}
      variant="contained"
    >
      Reset filters
    </Button>
  );
};
