import { HttpResponse, http } from 'msw';

import { envVariables } from '@/config/commerce-tools-api';

import { mockPasswordToken } from './mocks/mock-password-token';

export const handlers = [
  http.post(`${envVariables.AUTH_URL}/oauth/${envVariables.PROJECT_KEY}/customers/token`, () =>
    HttpResponse.json(mockPasswordToken),
  ),
];
