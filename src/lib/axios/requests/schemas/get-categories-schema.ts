import { z } from 'zod';

export type CategoriesRequestArguments = {
  expand?: unknown;
  limit?: number;
  offset?: number;
  sort?: unknown;
  where?: unknown;
  withTotal?: boolean;
};

export const categorySchema = z.object({
  ancestors: z.array(z.unknown()),
  assets: z.unknown().optional(),
  createdAt: z.string(),
  createdBy: z.unknown().optional(),
  custom: z.object({ fields: z.unknown(), type: z.unknown() }).optional(),
  description: z.record(z.string(), z.string()).optional(),
  externalId: z.string().optional(),
  id: z.string(),
  key: z.string().optional(),
  lastModifiedAt: z.string(),
  lastModifiedBy: z.unknown().optional(),
  metaDescription: z.record(z.string(), z.string()).optional(),
  metaTitle: z.record(z.string(), z.string()).optional(),
  name: z.record(z.string(), z.string()),
  orderHint: z.string().optional(),
  parent: z.unknown().optional(),
  slug: z.record(z.string(), z.string()),
  version: z.number(),
});
export type Category = z.infer<typeof categorySchema>;

export const categoriesResponseSchema = z.object({
  count: z.number(),
  limit: z.number(),
  offset: z.number(),
  results: z.array(categorySchema),
  total: z.number().optional(),
});

export type CategoriesResponse = z.infer<typeof categoriesResponseSchema>;
