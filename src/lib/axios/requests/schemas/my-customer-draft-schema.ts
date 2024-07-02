import { z } from 'zod';

export const myCustomerDraftSchema = z.object({
  addresses: z.array(z.unknown()).optional(),
  billingAddresses: z.unknown().optional(),
  companyName: z.string().optional(),
  dateOfBirth: z.string().optional(),
  defaultBillingAddress: z.number().optional(),
  defaultShippingAddress: z.number().optional(),
  email: z.string(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  locale: z.string().optional(),
  middleName: z.string().optional(),
  password: z.string(),
  salutation: z.string().optional(),
  shippingAddresses: z.unknown().optional(),
  stores: z.unknown().optional(),
  title: z.string().optional(),
  vatId: z.string().optional(),
});

export type MyCustomerDraft = z.infer<typeof myCustomerDraftSchema>;
