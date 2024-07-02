import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { authInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { TokenInfo, tokenInfoSchema } from './schemas/token-info.schema';

export async function getAnonymousToken(): Promise<TokenInfo> {
  try {
    const tokenInfo = await authInstance.post(
      `/oauth/${envVariables.PROJECT_KEY}/anonymous/token`,
      {
        grant_type: 'client_credentials',
      },
      {
        auth: {
          password: envVariables.CLIENT_SECRET,
          username: envVariables.CLIENT_ID,
        },
      },
    );

    return tokenInfoSchema.parse(tokenInfo.data);
  } catch (e) {
    if (isAxiosError(e)) {
      const message = axiosErrorMsgSchema.catch(e.message).parse(e);
      throw new Error(message);
    }

    throw e;
  }
}
