import axios from 'axios';
import { setToken } from '../setToken/index.js';
import { ILoginEmail } from '../types/index.js';
import { getUserIp } from '../utils/getUserIp.js';

export const loginEmail = async ({ NEYRA_AI_API, name, password, email }: ILoginEmail) => {
  try {
    const userIp = await getUserIp();

    const response = await axios.put(
      `${NEYRA_AI_API}/auth/identity/connect_userv8`,
      {
        provider: 'email',
        first_name: name,
        password,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Real-IP': userIp,
        },
      }
    );
    if (response.data.data) {
      const access_token = response.data.data.access_token;
      const refresh_token = response.data.data.refresh_token;
      setToken(response, access_token, refresh_token);
      return response.data;
    } else {
      throw new Error(response.data);
    }
  } catch (error) {
    throw error;
  }
};
