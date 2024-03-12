import { path } from 'ramda';
const setToCookies = (token, type) => {
  if (token.length > 4096) {
    throw new Error('Token length exceeds maximum allowed.');
  }

  const options = {};

  token = encodeURIComponent(token);
  document.cookie = `${type}=${token}; ${Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ')}`;
};

export const setToken = (res, access_token, refresh_token) => {
  const token = path(['data', 'access_token'], res) || '';
  const refreshToken = path(['data', 'refresh_token'], res) || '';
  console.log(access_token, refresh_token)

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
}
