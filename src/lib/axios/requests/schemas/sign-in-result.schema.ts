import { z } from 'zod';

import { cartResponseSchema } from './cart-schema';
import { customerSchema } from './customer.schema';

export const signInResultSchema = z.object({
  cart: cartResponseSchema.optional(),
  customer: customerSchema,
});

export type SignInResult = z.infer<typeof signInResultSchema>;
