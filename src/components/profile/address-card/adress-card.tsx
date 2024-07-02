import type { FC } from 'react';

import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

import { RegistrationAddress } from '@/features/registration-form/registration-form-types';

export const AddressCard: FC<{ addressInfo: RegistrationAddress; isDefault: boolean }> = ({
  addressInfo,
  isDefault,
}) => {
  const { city, country, postalCode, streetName } = addressInfo;
  return (
    <Box
      className={`${isDefault ? 'bg-green-50' : 'bg-gray-50'} w-fit rounded-md border border-solid  border-[#6fa45e]`}
      data-testid="address-outer"
    >
      <Typography align="center">{isDefault ? 'Default' : ''}</Typography>
      <List className="p-0">
        <ListItem>
          <ListItemText primary={`Country: ${country}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`City: ${city}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Street: ${streetName}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Postal code: ${postalCode}`} />
        </ListItem>
      </List>
    </Box>
  );
};
