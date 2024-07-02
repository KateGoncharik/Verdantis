import { FC } from 'react';
import type { Control } from 'react-hook-form';

import { Collapse, Stack } from '@mui/material';

import { ControlledCheckbox } from '@/components/controller-component/controller-checkbox';

import { RegistrationFormFields } from '../../../lib/axios/requests/schemas/registration-form-schema';
import { BillingAddress } from './billing';
import { ShippingAddress } from './shipping';

export type DefaultAddress = 'billing' | 'none' | 'shipping';

export const AddressControlPanel: FC<{
  control: Control<RegistrationFormFields>;
  isSingleAddress: boolean;
}> = ({ control, isSingleAddress }) => {
  return (
    <Stack sx={{ flexDirection: 'column' }} width={'100%'}>
      <ShippingAddress control={control} />
      <ControlledCheckbox
        {...{
          control,
          label: 'Use also as a billing address',
          name: 'isSingleAddress',
        }}
      />
      <Collapse in={isSingleAddress}>
        <BillingAddress control={control} />
      </Collapse>
    </Stack>
  );
};
