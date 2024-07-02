import { type FC, ReactNode } from 'react';
import type { Control } from 'react-hook-form';

import { Typography } from '@mui/material';

import { ControllerComponent } from '@/components/controller-component';

import type { RegistrationFormFields } from '../../../lib/axios/requests/schemas/registration-form-schema';

import { AddressWrapper } from './address-wrapper';

export const BillingAddress: FC<{
  children?: ReactNode;
  control: Control<RegistrationFormFields>;
}> = ({ control }) => {
  return (
    <AddressWrapper>
      <Typography component={'h4'} sx={{ fontSize: { lg: 20, md: 15, sm: 15 } }} textAlign={'center'}>
        Billing
      </Typography>

      <ControllerComponent {...{ control, label: 'Set as default', name: 'setBillingAsDefault', type: 'checkbox' }} />
      <ControllerComponent {...{ control, label: 'street', name: 'streetBilling', type: 'text' }} />
      <ControllerComponent {...{ control, label: 'city', name: 'cityBilling', type: 'text' }} />
      <ControllerComponent {...{ control, label: 'country', name: 'countryBilling', select: 'select' }} />
      <ControllerComponent {...{ control, label: 'postal-code', name: 'postalCodeBilling', type: 'text' }} />
    </AddressWrapper>
  );
};
