import { z } from 'zod';

export const tokenInfoSchema = z.object({
  access_token: z.string(),
  expires_in: z.number(),
  refresh_token: z.string().optional(),
  scope: z.string(),
  token_type: z.string(),
});

export type TokenInfo = z.infer<typeof tokenInfoSchema>;
