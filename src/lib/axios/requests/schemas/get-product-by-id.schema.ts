import { z } from 'zod';

const LocalizedStringSchema = z.record(z.string());

const AttributeValueSchema = z.any();
const AttributeSchema = z.object({
  name: z.string(),
  value: AttributeValueSchema,
});

export const valueSchema = z.object({
  centAmount: z.number(),
  currencyCode: z.string(),
  fractionDigits: z.number(),
  type: z.string(),
});

const discountSchema = z.object({
  id: z.string(),
  typeId: z.string(),
});

export const discountedSchema = z.object({
  discount: discountSchema,
  value: valueSchema,
});

const priceSchema = z.object({
  discounted: discountedSchema.optional(),
  id: z.string(),
  key: z.string(),
  validFrom: z.string().datetime(),
  validUntil: z.string().datetime(),
  value: valueSchema,
});

const MasterVariantSchema = z.object({
  attributes: z.array(AttributeSchema),
  id: z.number(),
  images: z.array(
    z.object({
      dimensions: z.object({
        h: z.number(),
        w: z.number(),
      }),
      label: z.string().optional(),
      url: z.string(),
    }),
  ),
  prices: z.array(priceSchema),
});

const ProductTypeSchema = z.object({
  id: z.string().uuid(),
  typeId: z.string(),
});

const ProductSchema = z.object({
  categories: z.array(z.any()),
  createdAt: z.string().datetime(),
  description: z.record(z.string()),
  hasStagedChanges: z.boolean(),
  id: z.string().uuid(),
  lastModifiedAt: z.string().datetime(),
  masterVariant: MasterVariantSchema,
  name: LocalizedStringSchema,
  productType: ProductTypeSchema,
  published: z.boolean(),
  searchKeywords: z.record(z.any()),
  slug: LocalizedStringSchema,
  variants: z.array(z.any()),
  version: z.number(),
});

export { ProductSchema, priceSchema };
