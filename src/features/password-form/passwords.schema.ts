import { z } from 'zod';

export const passwordsSchema = z.object({
  currentPassword: z
    .string()
    .min(8, 'must be at least 8 characters long')
    .regex(/[A-Z]+/, 'must contain at least one uppercase letter')
    .regex(/[a-z]+/, 'must contain at least one lowercase letter')
    .regex(/[0-9]+/, 'must contain at least one number')
    .regex(/^\S+.+\S+$/, 'must not contain leading or trailing whitespace.'),
  newPassword: z
    .string()
    .min(8, 'must be at least 8 characters long')
    .regex(/[A-Z]+/, 'must contain at least one uppercase letter')
    .regex(/[a-z]+/, 'must contain at least one lowercase letter')
    .regex(/[0-9]+/, 'must contain at least one number')
    .regex(/^\S+.+\S+$/, 'must not contain leading or trailing whitespace.'),
  repeatPassword: z.string(),
});

export type Passwords = z.infer<typeof passwordsSchema>;
