import { path } from 'ramda';

interface CookieOptions {
  path?: string;
}

const setToCookies = (token: string, type: string) => {
  if (token.length > 4096) {
    throw new Error('Token length exceeds maximum allowed.');
  }

  const options: CookieOptions = {
    path: '/',
  };

  token = encodeURIComponent(token);
  document.cookie = `${type}=${token}; ${Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')}`;
};

export const setToken = (res: any, access_token?: string, refresh_token?: string) => {
  const token = path(['data', 'access_token'], res) || '';
  const refreshToken = path(['data', 'refresh_token'], res) || '';

  if (access_token) {
    setToCookies(access_token, 'access_token');
  }
  if (refresh_token) {
    setToCookies(refresh_token, 'refresh_token');
  }

  if (token) {
    setToCookies(token, 'access_token');
  }
  if (refreshToken) {
    setToCookies(refreshToken, 'refresh_token');
  }
};
