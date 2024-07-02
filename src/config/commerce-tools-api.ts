import { z } from 'zod';

const configSchema = z.object({
  API_URL: z.string(),
  AUTH_URL: z.string(),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  PROJECT_KEY: z.string(),
  SCOPES: z.string(),
});

const variables = {
  API_URL: import.meta.env.VITE_CTP_API_URL as unknown,
  AUTH_URL: import.meta.env.VITE_CTP_AUTH_URL as unknown,
  CLIENT_ID: import.meta.env.VITE_CTP_CLIENT_ID as unknown,
  CLIENT_SECRET: import.meta.env.VITE_CTP_CLIENT_SECRET as unknown,
  PROJECT_KEY: import.meta.env.VITE_CTP_PROJECT_KEY as unknown,
  SCOPES: import.meta.env.VITE_CTP_SCOPES as unknown,
};

export const envVariables = configSchema.parse(variables);
