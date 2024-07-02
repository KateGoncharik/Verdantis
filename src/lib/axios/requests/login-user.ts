import { getToken } from '@/lib/axios/requests/get-token';
import { signInCustomer } from '@/lib/axios/requests/sign-in-customer';

import { SignInResult } from './schemas/sign-in-result.schema';
import { TokenInfo } from './schemas/token-info.schema';

export async function loginUser({
  password,
  username,
}: {
  password: string;
  username: string;
}): Promise<[TokenInfo, SignInResult]> {
  const tokenInfo = await getToken({ password, username });
  const customerInfo = await signInCustomer({ email: username, password }, tokenInfo.access_token);
  return [tokenInfo, customerInfo];
}
