import axios from 'axios';
import { setToken } from '../setToken/index.js';
import { ILoginGoogle } from '../types/index.js';
import { redirectionAfterLogin } from '../utils/redirectionAfterLogin.js';
import { getUserIp } from '../utils/getUserIp.js';

export const loginGoogle = async ({
  credential,
  NEYRA_AI_API,
  autoRedirect = true,
  shouldSetToken = true,
}: ILoginGoogle) => {
  try {
    const userIp = await getUserIp();

    const response = await axios.put(
      `${NEYRA_AI_API}/auth/identity/connect_userv8`,
      {
        provider: 'google',
        ...credential,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-User-IP': userIp,
        },
      }
    );
    const access_token = response.data.data.access_token;
    const refresh_token = response.data.data.refresh_token;
    const isNewUser = response.data.message === 'Registration complete';

    shouldSetToken && setToken(response, access_token, refresh_token);

    autoRedirect && redirectionAfterLogin(isNewUser);
    return { isNewUser, access_token, refresh_token };
  } catch (error) {
    throw error;
  }
};
