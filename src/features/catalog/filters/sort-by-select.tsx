import { FC, useState } from 'react';

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

export const SortBySelect: FC<{ setter: (value: string) => void }> = ({ setter }) => {
  const [sortValue, setSortValue] = useState('');

  const handleChange = (event: SelectChangeEvent): void => {
    setSortValue(event.target.value);
    setter(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sorting-option">Sort by</InputLabel>
        <Select
          id="sorting-option"
          label="sortBy"
          labelId="sorting-option-label"
          onChange={handleChange}
          sx={{ ':hover': { bgcolor: 'primary.light', transition: '2s' }, backgroundColor: 'primary.contrastText' }}
          value={sortValue}
        >
          <MenuItem
            sx={{
              backgroundColor: 'primary.contrastText',
            }}
            value={'price-asc'}
          >
            Price
            <ArrowUpward />
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: 'primary.contrastText',
            }}
            value={'price-desc'}
          >
            Price
            <ArrowDownward />
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: 'primary.contrastText',
            }}
            value={'name.en-asc'}
          >
            Name
            <ArrowUpward />
          </MenuItem>
          <MenuItem
            sx={{
              backgroundColor: 'primary.contrastText',
            }}
            value={'name.en-desc'}
          >
            Name
            <ArrowDownward />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
