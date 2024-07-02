import { FC, ReactNode } from 'react';

import { Stack } from '@mui/system';

export const AddressWrapper: FC<{
  children?: ReactNode;
}> = ({ children }) => {
  return (
    <Stack
      direction="column"
      justifyContent={'space-between'}
      padding={{ lg: '0 10%', md: '0 7%', sm: '0 4%', xs: '0 2%' }}
    >
      {children}
    </Stack>
  );
};
