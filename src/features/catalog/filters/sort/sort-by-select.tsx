import { FC, useEffect, useState } from 'react';

import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, useScrollTrigger } from '@mui/material';

import { filtersStyles } from '../filters-constants';

const iconTypes = ['up', 'down', 'up', 'down'];
const labels = ['Price', 'Price', 'Name', 'Name'];

const renderMenuItem = (value: string, valueIndex: number): JSX.Element => {
  return (
    <MenuItem key={value} value={value}>
      {labels[valueIndex]}
      {iconTypes[valueIndex] === 'up' ? <ArrowUpward /> : <ArrowDownward />}
    </MenuItem>
  );
};

export const SortBySelect: FC<{ setter: (value: string) => void }> = ({ setter }) => {
  const [sortValue, setSortValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent): void => {
    console.log('qQ');
    setSortValue(event.target.value);
    setter(event.target.value);
  };
  const trigger = useScrollTrigger();

  useEffect(() => {
    setIsOpen(false);
  }, [trigger]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="sorting-option">Sort by</InputLabel>
        <Select
          MenuProps={{ disableScrollLock: true }}
          id="sorting-option"
          label="sortBy"
          labelId="sorting-option-label"
          onChange={handleChange}
          onClose={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          open={isOpen}
          sx={filtersStyles}
          value={sortValue}
        >
          {['price-asc', 'price-desc', 'name.en-asc', 'name.en-desc'].map(renderMenuItem)}
        </Select>
      </FormControl>
    </Box>
  );
};
