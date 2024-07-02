import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email address must be properly formatted'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .regex(/[A-Z]+/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]+/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]+/, 'Password must contain at least one number')
    .regex(/^\S+.+\S+$/, 'Password must not contain leading or trailing whitespace.'),
});

export type LoginInfo = z.infer<typeof loginSchema>;
