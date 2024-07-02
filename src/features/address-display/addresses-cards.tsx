import type { FC } from 'react';

import { AddressCard } from '@/components/profile/address-card';

import { RegistrationAddress } from '../registration-form/registration-form-types';

export const AddressesCards: FC<{
  addresses: RegistrationAddress[];
  hasDefault: boolean;
}> = ({ addresses, hasDefault }) => {
  const cards = addresses.map((address, i) => {
    if (i === 0) {
      return <AddressCard key={address.id} {...{ addressInfo: address, isDefault: hasDefault }} />;
    }
    return <AddressCard key={address.id} {...{ addressInfo: address, isDefault: false }} />;
  });
  return <>{cards}</>;
};
