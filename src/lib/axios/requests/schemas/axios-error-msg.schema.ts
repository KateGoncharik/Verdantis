import { z } from 'zod';

export const axiosErrorMsgSchema = z
  .object({
    response: z.object({
      data: z.object({
        message: z.string(),
      }),
    }),
  })
  .transform((error) => error.response.data.message);
