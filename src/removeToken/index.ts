import { getMainDomain } from '../utils/getMainDomain.js';

export const removeFromCookies = (type) => {
  let cookieString = type + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';

  if (window.location.hostname !== 'localhost') {
    const domain = getMainDomain();
    cookieString += '; domain=' + `.${domain}`;
  }

  document.cookie = cookieString;
};

export const removeToken = () => {
  removeFromCookies('access_token');
  removeFromCookies('refresh_token');
};
