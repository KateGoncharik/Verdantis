import { isAxiosError } from 'axios';

import { envVariables } from '@/config/commerce-tools-api';

import { authInstance } from '../axios-instances';
import { axiosErrorMsgSchema } from './schemas/axios-error-msg.schema';
import { TokenInfo, tokenInfoSchema } from './schemas/token-info.schema';

export async function getToken({ password, username }: { password: string; username: string }): Promise<TokenInfo> {
  try {
    const tokenInfo = await authInstance.post(
      `/oauth/${envVariables.PROJECT_KEY}/customers/token`,
      {
        grant_type: 'password',
        password,
        username,
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
