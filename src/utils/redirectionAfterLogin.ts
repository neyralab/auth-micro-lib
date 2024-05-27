export const redirectionAfterLogin = (isNewUser: boolean) => {
  const previousSpace = document.referrer.includes('space');
  const redirectPath = isNewUser ? '/welcome' : previousSpace ? '/neyra' : '/chat';
  const redirectHref = `${
    previousSpace ? removeTrailingSlash(document.referrer) : window.location.origin
  }${redirectPath}`;

  isNewUser && window.localStorage.setItem('connectNewUser', 'true');

  if (previousSpace && isNewUser) {
    window.localStorage.setItem('referrer', document.referrer);
  }
  window.location.href = redirectHref;
};

const removeTrailingSlash = (url: string) => {
  if (url.endsWith('/')) {
    return url.slice(0, -1);
  }
  return url;
};
