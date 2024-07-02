import type { FC } from 'react';

import { Box, Typography } from '@mui/material';

import { RegistrationAddress } from '../registration-form/registration-form-types';
import { AddressesCards } from './addresses-cards';

export const AddressesContainer: FC<{
  addressesToDisplay: RegistrationAddress[];
  hasDefault: boolean;
  type: 'Billing' | 'Shipping';
}> = ({ addressesToDisplay, hasDefault, type }) => {
  return (
    <Box className="p-3">
      <Typography align="center">{type} addresses</Typography>
      <AddressesCards {...{ addresses: addressesToDisplay, hasDefault }} />
    </Box>
  );
};
