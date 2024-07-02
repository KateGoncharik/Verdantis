import axios from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

export const authInstance = axios.create({
  baseURL: envVariables.AUTH_URL,
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
});

export const apiInstance = axios.create({
  baseURL: envVariables.API_URL,
  headers: { 'Content-Type': 'application/json' },
});
