import { ChangeEvent, FC, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

import { filtersStyles } from '../filters-constants';

export const Search: FC = () => {
  const [search, setSearch] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearch(event.target.value);
  };
  const handleSearch = (): void => {
    searchParams.set('q', search);
    setSearchParams(searchParams);
  };
  const handleResetSearch = (): void => {
    setSearch('');
    searchParams.set('q', '');
    setSearchParams(searchParams);
  };

  return (
    <Box sx={{ justifyContent: 'center', minWidth: 120 }}>
      <FormControl className="justify-center gap-2">
        <TextField
          className="w-36"
          id="search"
          label="Search"
          onChange={handleChange}
          sx={filtersStyles}
          value={search}
        />
        <Button
          onClick={handleSearch}
          sx={{ ':hover': { backgroundColor: 'primary.light', transition: '2s' }, transition: '2s' }}
          variant="contained"
        >
          Search
        </Button>
        <Button
          onClick={handleResetSearch}
          sx={{ ':hover': { backgroundColor: 'primary.light', transition: '2s' }, transition: '2s' }}
          variant="contained"
        >
          Clear search
        </Button>
      </FormControl>
    </Box>
  );
};
