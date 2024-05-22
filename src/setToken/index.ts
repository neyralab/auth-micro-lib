import { path } from 'ramda';
import { getMainDomain } from '../utils/getMainDomain.js';

interface CookieOptions {
  path?: string;
  domain?: string;
}

const setToCookies = (token: string, type: string) => {
  if (token.length > 4096) {
    throw new Error('Token length exceeds maximum allowed.');
  }

  const options: CookieOptions = {
    path: '/',
    Secure: 'true', 
    SameSite: 'None'
  };

  if (window.location.hostname !== 'localhost') {
    const mainDomain = getMainDomain();
    options.domain = `.${mainDomain}`;
  }

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
