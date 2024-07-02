import { RegistrationAddress } from '@/features/registration-form/registration-form-types';

export type ChangeEmail = {
  action: 'changeEmail';
  email: string;
};

export type ChangeFirstName = {
  action: 'setFirstName';
  firstName: string;
};

export type ChangeLastName = {
  action: 'setLastName';
  lastName: string;
};

export type ChangeDateOfBirth = {
  action: 'setDateOfBirth';
  dateOfBirth: string;
};

export type ChangeAddress = {
  action: 'changeAddress';
  address: RegistrationAddress;
  addressId: string;
};

export type Action = ChangeAddress | ChangeDateOfBirth | ChangeEmail | ChangeFirstName | ChangeLastName;
