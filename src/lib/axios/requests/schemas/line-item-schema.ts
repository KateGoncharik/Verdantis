import { z } from 'zod';

import { MasterVariantSchema, priceSchema, valueSchema } from './product-schema';

const variantIdSchema = z.number().int();
const skuSchema = z.string();
const quantitySchema = z.number().int().default(1);
const addedAtSchema = z.unknown();
const moneySchema = z.object({
  centAmount: z.number().int(),
  currencyCode: z.string(),
});
const externalLineItemTotalPriceSchema = z.object({
  price: moneySchema,
  totalPrice: moneySchema,
});
const externalTaxRateDraftSchema = z.object({
  amount: z.number(),
  includedInPrice: z.boolean(),
  name: z.string(),
});
const methodExternalTaxRateDraftSchema = z.object({
  externalTaxRate: externalTaxRateDraftSchema,
  shippingMethodId: z.string(),
});
const inventoryModeSchema = z.enum(['tracked', 'reserved', 'not_specified']);
const itemShippingDetailsDraftSchema = z.unknown();
const customFieldsDraftSchema = z.record(z.unknown());

export const lineItemSchema = z.object({
  addedAt: addedAtSchema.optional(),
  custom: customFieldsDraftSchema.optional(),
  externalPrice: moneySchema.optional(),
  externalTaxRate: externalTaxRateDraftSchema.optional(),
  externalTotalPrice: externalLineItemTotalPriceSchema.optional(),
  id: z.string(),
  inventoryMode: inventoryModeSchema.optional(),
  key: z.string().optional(),
  name: z.record(z.string(), z.string()),
  perMethodExternalTaxRate: z.array(methodExternalTaxRateDraftSchema).optional(),
  price: priceSchema,
  productId: z.string().optional(),
  productType: z.unknown(),
  quantity: quantitySchema,
  shippingDetails: itemShippingDetailsDraftSchema.optional(),
  sku: skuSchema.optional(),
  totalPrice: valueSchema,
  variant: MasterVariantSchema,
  variantId: variantIdSchema.optional(),
});
export type LineItem = z.infer<typeof lineItemSchema>;
