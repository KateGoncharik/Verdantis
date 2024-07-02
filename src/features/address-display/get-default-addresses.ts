import { Customer } from '@/lib/axios/requests/schemas/customer.schema';

import { RegistrationAddress } from '../registration-form/registration-form-types';

type AddressesObject = {
  billing: RegistrationAddress[];
  hasDefaultBilling: boolean;
  hasDefaultShipping: boolean;
  shipping: RegistrationAddress[];
};

const filterDefault =
  (defaultAddressId: string) =>
  (address: RegistrationAddress): boolean =>
    address.id === defaultAddressId;

export const getDefaultAddresses = ({
  addresses,
  billingAddressIds,
  defaultBillingAddressId,
  defaultShippingAddressId,
  shippingAddressIds,
}: Customer): AddressesObject => {
  const addressesObj: AddressesObject = {
    billing: [],
    hasDefaultBilling: Boolean(defaultBillingAddressId),
    hasDefaultShipping: Boolean(defaultShippingAddressId),
    shipping: [],
  };

  const addressIdMap: Map<string, RegistrationAddress> = new Map();

  if (defaultBillingAddressId) {
    addressesObj.billing.push(...addresses.filter(filterDefault(defaultBillingAddressId)));
  }

  if (defaultShippingAddressId) {
    addressesObj.shipping.push(...addresses.filter(filterDefault(defaultShippingAddressId)));
  }

  addresses.forEach((address) => {
    if (address.id) {
      addressIdMap.set(address.id, address);
    }
  });
  billingAddressIds?.forEach((id) => {
    const address = addressIdMap.get(id);
    if (address && address.id !== defaultBillingAddressId) {
      addressesObj.billing.push(address);
    }
  });
  shippingAddressIds?.forEach((id) => {
    const address = addressIdMap.get(id);
    if (address && address.id !== defaultShippingAddressId) {
      addressesObj.shipping.push(address);
    }
  });

  return addressesObj;
};
