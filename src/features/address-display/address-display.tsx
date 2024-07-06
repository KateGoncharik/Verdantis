import type { FC } from 'react';

import { Box } from '@mui/material';

// import { AddressesContainer } from './addresses-container';
// import { getDefaultAddresses } from './get-default-addresses';

export const AddressDisplay: FC = () => {
  // const formattedAddresses = getDefaultAddresses(customer);
  return (
    <Box className="flex flex-col p-2">
      {/* <AddressesContainer
        {...{
          addressesToDisplay: formattedAddresses.billing,
          hasDefault: formattedAddresses.hasDefaultBilling,
          type: 'Billing',
        }}
      />
      <AddressesContainer
        {...{
          addressesToDisplay: formattedAddresses.shipping,
          hasDefault: formattedAddresses.hasDefaultShipping,
          type: 'Shipping',
        }}
      /> */}
    </Box>
  );
};
