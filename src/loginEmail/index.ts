import axios from 'axios';
import { setToken } from '../setToken';
import { ILoginEmail } from '../types';

export const loginEmail = async ({ NEIRA_AI_API, name, password, email }: ILoginEmail) => {
  try {
    const response = await axios.put(
      `${NEIRA_AI_API}/auth/identity/connect_userv8`,
      {
        provider: 'email',
        first_name: name,
        password,
        email,
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
