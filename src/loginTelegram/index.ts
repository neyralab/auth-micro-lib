import axios from 'axios';
import { setToken } from '../setToken/index.js';
import { ILoginTelegram } from '../types/index.js';
import { redirectionAfterLogin } from '../utils/redirectionAfterLogin.js';
import { getUserIp } from '../utils/getUserIp.js';

export const loginTelegram = async ({
  telegramResponse,
  NEYRA_AI_API,
  autoRedirect = true,
  shouldSetToken = true,
}: ILoginTelegram) => {
  try {
    const userIp = await getUserIp();

    const response = await axios.put(
      `${NEYRA_AI_API}/auth/identity/connect_userv8`,
      {
        ...telegramResponse,
        provider: 'telegram',
      },
      {
        headers: {
          'X-Real-IP': userIp,
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
