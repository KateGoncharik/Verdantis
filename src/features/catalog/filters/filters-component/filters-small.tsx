import { FC, useState } from 'react';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import {
  Box,
  Button,
  //  Divider,
  Drawer,
  Stack,
} from '@mui/material';

import { ApplyFilters } from '../apply-filters';
import { ColorFilters } from '../color-filters';
import { ColorFilter, FilterValues } from '../filters';
import { ResetFilters } from '../reset-filters';
import { SizeSelect } from '../size-select';
import { SortBySelect } from '../sort';

export const FiltersSmall: FC<{
  setters: {
    setterForColor: (value: ColorFilter) => void;
    setterForSize: (value: string) => void;
    setterForSort: (value: string) => void;
  };
  values: FilterValues;
}> = ({ setters, values }) => {
  const { setterForColor, setterForSize, setterForSort } = setters;
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  return (
    <div>
      <Button onClick={toggleDrawer(true)} size="large">
        <FilterAltIcon />
      </Button>

      <Drawer anchor="top" onClose={toggleDrawer(false)} open={open}>
        <Box role="presentation" sx={{ backgroundColor: 'primary.light' }}>
          <Stack
            sx={{
              alignItems: 'center',
              color: 'primary.dark',
              display: 'flex',
              flexDirection: 'column',
              padding: '2%',
            }}
          >
            <Stack flexDirection="row">
              <Stack flexDirection="column">
                <Stack flexDirection="row">
                  <SizeSelect setter={setterForSize} />
                  <SortBySelect setter={setterForSort} />
                </Stack>
                <ColorFilters setter={setterForColor} />
              </Stack>
            </Stack>

            <Stack>
              <ApplyFilters values={values} />
              <ResetFilters />
            </Stack>
          </Stack>
        </Box>
      </Drawer>
    </div>
  );
};
