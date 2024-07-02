import { MyCustomerDraft } from '@/lib/axios/requests/sign-up-customer';

import { RegistrationFormFields } from '../../lib/axios/requests/schemas/registration-form-schema';

export const getRegistrationData = (data: RegistrationFormFields): MyCustomerDraft => {
  const registrationData: MyCustomerDraft = {
    addresses: [],
    dateOfBirth: data.dateOfBirth,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  };

  const shippingAddress = {
    city: data.cityShipping,
    country: data.countryShipping,
    postalCode: data.postalCodeShipping,
    streetName: data.streetShipping,
  };

  registrationData.addresses?.push(shippingAddress);

  if (!data.isSingleAddress) {
    const billingAddress = {
      city: data.cityBilling,
      country: data.countryBilling,
      postalCode: data.postalCodeBilling,
      streetName: data.streetBilling,
    };
    registrationData.addresses?.push(billingAddress);
  }

  const defaultShippingAddressIndex = 0;
  const defaultBillingAddressIndex = data.isSingleAddress ? defaultShippingAddressIndex : 1;
  registrationData.billingAddresses = [data.isSingleAddress ? defaultShippingAddressIndex : 1];
  registrationData.shippingAddresses = [0];

  if (data.setShippingAsDefault) {
    registrationData.defaultShippingAddress = defaultShippingAddressIndex;
  }
  const isBillingAddressDefault = data.setBillingAsDefault || (data.isSingleAddress && data.setShippingAsDefault);
  if (isBillingAddressDefault) {
    registrationData.defaultBillingAddress = defaultBillingAddressIndex;
  }

  return registrationData;
};
