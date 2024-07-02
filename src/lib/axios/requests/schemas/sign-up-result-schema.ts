import { z } from 'zod';

import type { RegistrationAddress } from '@/features/registration-form/registration-form-types';

const RegistrationAddressSchema = z.object({
  city: z.string(),
  country: z.string(),
  postalCode: z.string(),
  region: z.string().optional(),
  streetName: z.string(),
});

export type RegistrationResponse = {
  customer: {
    addresses: Array<RegistrationAddress>;
    authenticationMode: string;
    createdAt: string;
    email: string;
    firstName: string;
    id: string;
    isEmailVerified: false;
    lastModifiedAt: string;
    lastName: string;
    password: string;
    stores: [];
    version: number;
  };
};

const customerSchema = z.object({
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
  firstName: z.string(),
  id: z.string(),
  isEmailVerified: z.boolean(),
  key: z.string().optional(),
  lastModifiedAt: z.string(),
  lastName: z.string(),
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

export const signUpResultSchema = z.object({
  customer: customerSchema,
});

export type SignUpResult = z.infer<typeof signUpResultSchema>;
