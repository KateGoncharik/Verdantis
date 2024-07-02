import { z } from 'zod';

export const registrationAddressSchema = z.object({
  city: z.string(),
  country: z.string(),
  id: z.string().optional(),
  postalCode: z.string(),
  region: z.string().optional(),
  streetName: z.string(),
});
export type RegistrationAddress = z.infer<typeof registrationAddressSchema>;

export type Countries = 'DE' | 'US';

export type RegistrationRequest = {
  addresses: Array<RegistrationAddress>;
  billingAddresses: Array<number>;
  dateOfBirth: string;
  defaultBillingAddress?: number;
  defaultShippingAddress?: number;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  salutation?: string;
  shippingAddress?: Array<number>;
  title?: string;
};
