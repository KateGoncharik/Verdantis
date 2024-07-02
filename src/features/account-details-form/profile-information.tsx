import { FC } from 'react';
import { Control } from 'react-hook-form';

import { Box } from '@mui/material';

import { UserInfo } from '@/components/profile/user-info';

import { AccountDetails } from './account-details.schema';

export const ProfileInfoContent: FC<{
  control: Control<AccountDetails>;
  isEditMode: boolean;
}> = ({ control, isEditMode }) => {
  return (
    <Box
      className="flex items-center justify-evenly p-2"
      sx={{ flexDirection: { lg: 'row', md: 'row', sm: 'column', xs: 'column' } }}
    >
      <UserInfo {...{ control, isEditMode }} />
    </Box>
  );
};
