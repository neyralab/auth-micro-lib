import axios from 'axios';
import { setToken, setTokenForApps } from '../setToken/index.js';
import { ILoginTelegram } from '../types/index.js';
import { redirectionAfterLogin } from '../utils/redirectionAfterLogin.js';

export const loginTelegram = async ({ telegramResponse, NEYRA_AI_API }: ILoginTelegram) => {
  try {
    const response = await axios.put(`${NEYRA_AI_API}/auth/identity/connect_userv8`, {
      ...telegramResponse,
      provider: 'telegram',
    });
    const access_token = response.data.data.access_token;
    const refresh_token = response.data.data.refresh_token;
    const isNewUser = response.data.message === 'Registration complete';

    setToken(response, access_token, refresh_token);
    setTokenForApps(access_token, refresh_token);

    redirectionAfterLogin(isNewUser);
  } catch (error) {
    throw error;
  }
};
