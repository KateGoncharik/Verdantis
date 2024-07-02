import { z } from 'zod';

import { CanadaPostalCodeFormatRegularExpression } from '../registration-form/registration-form-constants';

export const editAddressSchema = z.object({
  city: z
    .string()
    .min(1)
    .regex(/^[a-zA-Z]+$/, 'Must contain only alphabetic characters'),
  country: z.string(),
  id: z.string().optional(),
  isBilling: z.boolean(),
  isDefaultBilling: z.boolean(),
  isDefaultShipping: z.boolean(),
  isShipping: z.boolean(),
  postalCode: z.string().regex(CanadaPostalCodeFormatRegularExpression),
  region: z.string().optional(),
  streetName: z.string().min(1),
});

export type EditAddress = z.infer<typeof editAddressSchema>;
