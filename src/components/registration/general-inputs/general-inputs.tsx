import { FC, ReactNode } from 'react';
import type { Control } from 'react-hook-form';

import { ControllerComponent } from '@/components/controller-component';

import type { RegistrationFormFields } from '../../../lib/axios/requests/schemas/registration-form-schema';

export const GeneralInputs: FC<{
  children?: ReactNode;
  control: Control<RegistrationFormFields>;
}> = ({ control }) => {
  return (
    <>
      <ControllerComponent {...{ control, label: 'Email', name: 'email', type: 'email' }} />
      <ControllerComponent {...{ control, label: 'Password', name: 'password', type: 'password' }} />
      <ControllerComponent {...{ control, label: 'First Name', name: 'firstName', type: 'text' }} />
      <ControllerComponent {...{ control, label: 'Last Name', name: 'lastName', type: 'text' }} />
      <ControllerComponent {...{ control, label: 'Birthday', name: 'dateOfBirth', type: 'date' }} />
    </>
  );
};
