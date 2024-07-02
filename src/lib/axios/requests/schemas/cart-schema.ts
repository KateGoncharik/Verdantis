import { z } from 'zod';

import { lineItemSchema } from './line-item-schema';

export type CartDraft = z.infer<typeof cartSchema>;
export type CartResponse = z.infer<typeof cartResponseSchema>;

const PriceSchema = z.object({
  centAmount: z.number(),
  currencyCode: z.string(),
  fractionDigits: z.number(),
  type: z.string(),
});

const DiscountSchema = z.object({
  id: z.string().uuid(),
  typeId: z.string(),
});

const IncludedDiscountSchema = z.object({
  discount: DiscountSchema,
  discountedAmount: PriceSchema,
});

const DiscountOnTotalPriceSchema = z.object({
  discountedAmount: PriceSchema,
  includedDiscounts: z.array(IncludedDiscountSchema),
});

export const cartSchema = z.object({
  currency: z.record(z.string(), z.string()),
  id: z.string().optional(),
  key: z.string().optional(),
});

export const cartResponseSchema = z.object({
  createdAt: z.string(),
  customerEmail: z.string().optional(),
  discountOnTotalPrice: DiscountOnTotalPriceSchema.optional(),
  id: z.string(),
  lastModifiedAt: z.string().optional(),
  lineItems: z.array(lineItemSchema),
  origin: z.string(),
  totalPrice: PriceSchema,
  version: z.number(),
});

export type DiscountOnTotalPrice = z.infer<typeof DiscountOnTotalPriceSchema>;
