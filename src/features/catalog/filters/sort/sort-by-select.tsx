import { FC, useEffect, useState } from 'react';

import { Box, FormControl, InputLabel, Select, SelectChangeEvent, useScrollTrigger } from '@mui/material';

import { filtersStyles } from '../filters-constants';
import { MenuItemWithStyles } from './menu-item-with-styles';

export const SortBySelect: FC<{ setter: (value: string) => void }> = ({ setter }) => {
  const [sortValue, setSortValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event: SelectChangeEvent): void => {
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
          <MenuItemWithStyles iconType="up" name="Price" value="price-asc" />
          <MenuItemWithStyles iconType="down" name="Price" value="price-desc" />
          <MenuItemWithStyles iconType="up" name="Name" value="name.en-asc" />
          <MenuItemWithStyles iconType="down" name="Name" value="name.en-desc" />
        </Select>
      </FormControl>
    </Box>
  );
};
