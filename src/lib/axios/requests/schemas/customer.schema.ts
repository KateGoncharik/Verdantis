import { z } from 'zod';

const RegistrationAddressSchema = z.object({
  city: z.string(),
  country: z.string(),
  id: z.string().optional(),
  postalCode: z.string(),
  region: z.string().optional(),
  streetName: z.string(),
});

export const customerSchema = z.object({
  addresses: z.array(RegistrationAddressSchema),
  authenticationMode: z.string(),
  billingAddressIds: z.array(z.string()).optional(),
  companyName: z.string().optional(),
  createdAt: z.string(),
  customerGroup: z.unknown(),
  customerNumber: z.string().optional(),
  dateOfBirth: z.string().optional(),
  defaultBillingAddressId: z.string().optional(),
  defaultShippingAddressId: z.string().optional(),
  email: z.string(),
  externalId: z.string().optional(),
  firstName: z.string().optional(),
  id: z.string(),
  isEmailVerified: z.boolean(),
  key: z.string().optional(),
  lastModifiedAt: z.string(),
  lastName: z.string().optional(),
  locale: z.string().optional(),
  middleName: z.string().optional(),
  password: z.string().optional(),
  salutation: z.string().optional(),
  shippingAddressIds: z.array(z.string()).optional(),
  stores: z.unknown(),
  title: z.string().optional(),
  vatId: z.string().optional(),
  version: z.number(),
});

export type Customer = z.infer<typeof customerSchema>;
