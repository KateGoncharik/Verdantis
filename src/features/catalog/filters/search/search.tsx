import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
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

  const handleSearchMemo = useCallback(() => {
    searchParams.set('q', search);
    setSearchParams(searchParams);
  }, [search, searchParams, setSearchParams]);

  const handleResetSearch = (): void => {
    setSearch('');
    searchParams.set('q', '');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const handleEnterSearch = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        handleSearchMemo();
      }
    };
    document.addEventListener('keydown', handleEnterSearch);
    return () => {
      document.removeEventListener('keydown', handleEnterSearch);
    };
  }, [handleSearchMemo]);

  return (
    <Box sx={{ padding: '1%' }}>
      <FormControl className="flex-row gap-2">
        <TextField
          className="w-36"
          id="search"
          label="Search"
          onChange={handleChange}
          sx={{ ...filtersStyles, width: '90%' }}
          value={search}
        />
        <Button
          onClick={handleSearch}
          sx={{ ':hover': { backgroundColor: 'primary.light', transition: '2s' }, transition: '2s', width: '5%' }}
        >
          <SearchIcon />
        </Button>
        <Button
          onClick={handleResetSearch}
          sx={{ ':hover': { backgroundColor: 'primary.light', transition: '2s' }, transition: '2s', width: '5%' }}
        >
          <ClearIcon />
        </Button>
      </FormControl>
    </Box>
  );
};
